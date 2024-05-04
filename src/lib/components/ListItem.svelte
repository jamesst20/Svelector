<script context="module" lang="ts">
  import type { SvOption } from "$lib/Svelector.svelte";

  export interface ListItemProps {
    onItemSelect?: (option: SvOption) => void;
    option?: SvOption;
    selected: boolean;
    text: string;
  }
</script>

<script lang="ts">
  import { stopPropagation } from "$lib/helpers/svelte";

  let { onItemSelect, option, selected, text }: ListItemProps = $props();

  let group = $derived(!option);

  const keyDown = (e: KeyboardEvent) => {
    e.stopPropagation();

    if (option && (e.key === "Enter" || e.key === " ")) {
      onItemSelect?.(option);
    }
  };

  const itemClick = (e: MouseEvent) => {
    e.stopPropagation();

    if (!option) return;

    onItemSelect?.(option);
  };
</script>

<li
  class="sv-list-item"
  class:group-item={group}
  class:selected
  class:text-item={!group}
  onclick={itemClick}
  onkeydown={stopPropagation(keyDown)}
  role="menuitem"
  tabindex={group ? -1 : 0}
>
  {text}
</li>

<style lang="postcss">
  .sv-list-item {
    @apply hover:bg-slate-100 px-2 py-1;
    @apply cursor-pointer select-none;

    &.group-item {
      @apply text-black font-semibold border-y border-gray-200 bg-gray-50 cursor-default;
    }

    &.text-item {
      @apply text-gray-700;
    }

    &.selected {
      @apply bg-slate-200;
    }
  }
</style>
