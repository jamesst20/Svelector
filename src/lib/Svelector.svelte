<script context="module" lang="ts">
  import type { SvValueTypes, SvelectorProps } from "$lib/types/Svelector";
  export type SvOption = { original: any; text: string; value: SvValueTypes };
  export type SvOptionGroup = { options: Array<SvOption>; text: null | string };
</script>

<script
  generics="
    Opt extends SvelectorProps.Option<TKey, VKey>,
    TKey extends SvelectorProps.TextExtrator<Opt> | 'text',
    VKey extends SvelectorProps.ValueExtrator<Opt>,
    GTKey extends string = 'text',
    VObj extends boolean = false,
    M extends boolean = false,
  "
  lang="ts"
>
  import List from "$lib/components/List.svelte";
  import Placeholder from "$lib/components/Placeholder.svelte";
  import { untrack } from "svelte";

  import { fetchApi } from "./helpers/api";
  import { stopPropagation } from "./helpers/svelte";
  import "./lib.css";
  import { filterInvalidValue, mapSelected, mapValues, toggleValue } from "./mappers/items";
  import { mapOptions } from "./mappers/options";

  let {
    disabled = false,
    fetchUrl,
    groupTextProperty = "text" as GTKey,
    id,
    multiple = false as M,
    onChange,
    options: optionsProp = [] as Array<Opt>,
    placeholder = "Select an option",
    textProperty = "text" as TKey,
    value: valueProp = $bindable(),
    valueAsObject = false as VObj,
    valueProperty = "value" as VKey,
  }: SvelectorProps<Opt, TKey, VKey, GTKey, VObj, M> = $props();

  let open = $state(false);

  let elementId = $derived(id || `sv-select-${Date.now().toString(36) + Math.random().toString(36).slice(2)}`);
  let listId = $derived(`${elementId}-list`);

  let loading = $state(!!fetchUrl);
  let options: SvOptionGroup[] = $derived(mapOptions(optionsProp, groupTextProperty, textProperty, valueProperty));
  let values: SvValueTypes[] = $derived(mapValues(valueProp, multiple, valueProperty));
  let selectedItems: SvOption[] = $derived(mapSelected(options, values));

  let selectEl: HTMLDivElement;

  const onListItemClick = (option: SvOption) => {
    open = false;
    valueProp = toggleValue(valueProp as any[], option, multiple, valueAsObject, valueProperty);
    onChange?.(valueProp || null);
  };

  $effect(() => {
    if (!fetchUrl) return;
    untrack(async () => {
      loading = true;
      optionsProp = await fetchApi(fetchUrl);
      loading = false;
    });
  });

  $effect(() => {
    if (loading || !valueProp) return;
    if (selectedItems.length === values.length) return;

    untrack(() => (valueProp = filterInvalidValue(valueProp, selectedItems, valueProperty)));
  });
</script>

<svelte:document onclick={(e) => (selectEl).contains(e.target as Node) || (open = false)} />

<div
  aria-controls={listId}
  aria-expanded={open}
  bind:this={selectEl}
  class="sv-control"
  class:disabled
  id={elementId}
  onclick={() => (open = !open)}
  onkeydown={stopPropagation((e) => (e.key === "Enter" || e.key === " ") && (open = !open))}
  role="combobox"
  tabindex="0"
>
  <Placeholder {multiple} removeItem={(item) => onListItemClick(item)} {selectedItems} text={placeholder} />
  {#if open}
    <List id={listId} onItemSelect={(option) => onListItemClick(option)} {options} {selectedItems} />
  {/if}
</div>

<style lang="postcss">
  .sv-control {
    @apply relative w-full cursor-pointer rounded border border-gray-200 text-left;

    &.disabled {
      @apply pointer-events-none bg-gray-200;
    }
  }
</style>
