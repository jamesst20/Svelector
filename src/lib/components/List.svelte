<script context="module" lang="ts">
  import type { SvOption, SvOptionGroup } from "$lib/Svelector.svelte";

  export interface ListRenderProps {
    id: string;
    onItemSelect: (option: SvOption) => void;
    options: SvOptionGroup[];
    selectedItems: SvOption[];
  }

  type ListPosition = "bottom" | "fullscreen" | "top" | "unset";
</script>

<script lang="ts">
  import ListItem from "$lib/components/ListItem.svelte";
  import { isInViewport } from "$lib/helpers/dom";
  import { untrack } from "svelte";

  let { id, onItemSelect, options, selectedItems }: ListRenderProps = $props();

  let el: HTMLUListElement;
  let svControlHeight: number = $state(0);
  let listPosition: ListPosition = $state("unset");

  const isSelected = (option: SvOption) => selectedItems.some((item) => item.value === option.value);
  const itemSelected = (option: SvOption) => onItemSelect && onItemSelect(option);

  const visibilityHandler = () => {
    const listRect = el.getBoundingClientRect();
    const controlRect = el.closest(".sv-control")!.getBoundingClientRect();

    const isTopVisible = isInViewport({ bottom: controlRect.top, top: controlRect.top - listRect.height });
    const isBottomVisible = isInViewport({ bottom: controlRect.bottom + listRect.height, top: controlRect.bottom });

    if (isBottomVisible) {
      listPosition = "bottom";
    } else if (isTopVisible) {
      listPosition = "top";
    } else if (listPosition === "unset") {
      listPosition = "fullscreen";
    }

    svControlHeight = controlRect.height;
  };

  $effect(() => {
    return untrack(() => {
      window.addEventListener("resize", visibilityHandler);
      window.addEventListener("scroll", visibilityHandler, true);
      visibilityHandler();
      return () => {
        window.removeEventListener("resize", visibilityHandler);
        window.removeEventListener("scroll", visibilityHandler, true);
      };
    });
  });
</script>

<div class="sv-list-container" style:--offset-top={`${svControlHeight}px`}>
  <ul bind:this={el} class="sv-list sv-list-{listPosition}" {id}>
    {#each options as optionGroup}
      {#if optionGroup.text}
        <ListItem selected={false} text={optionGroup.text} />
      {/if}
      {#each optionGroup.options as option}
        <ListItem onItemSelect={itemSelected} {option} selected={isSelected(option)} text={option.text} />
      {/each}
    {/each}
  </ul>
</div>

<style lang="postcss">
  .sv-list-container {
    @apply relative;
  }
  .sv-list {
    @apply absolute left-0 right-0 z-10 max-h-[18rem] list-none overflow-y-scroll;
    @apply rounded border bg-white shadow-lg;

    &.sv-list-bottom {
      @apply top-full mt-0.5;
    }

    &.sv-list-top {
      @apply bottom-[calc(var(--offset-top))] mb-0.5;
    }

    &.sv-list-fullscreen {
      @apply fixed bottom-0 left-0 right-0 top-0 h-screen max-h-full w-screen;
    }
  }
</style>
