<script context="module" lang="ts">
  import type { SvOption } from "$lib/Svelector.svelte";

  export interface PlaceholderProps {
    multiple: boolean;
    removeItem: (selectedItem: SvOption) => void;
    selectedItems: SvOption[];
    text: string;
  }
</script>

<script lang="ts">
  let { multiple, removeItem, selectedItems, text }: PlaceholderProps = $props();

  const hasSelectedValue = $derived(Array.isArray(selectedItems) && selectedItems.length > 0);
</script>

<span class="sv-selections-container">
  {#if !hasSelectedValue}
    <span class="sv-selection">
      <span class="sv-placeholder">
        {text}&nbsp;
      </span>
    </span>
  {/if}

  {#each selectedItems as item (item.value)}
    <div class="sv-selection" class:multiple>
      <span class="sv-label" class:multiple>
        {item.text}
      </span>
      {#if multiple}
        <button class="sv-delete" onclick={() => removeItem(item)}>x</button>
      {/if}
    </div>
  {/each}
</span>

<style lang="postcss">
  .sv-selections-container {
    @apply flex flex-wrap items-center text-gray-600 gap-1 px-3 py-1.5;

    .sv-selection {
      @apply flex items-center text-gray-600;

      &.multiple {
        @apply rounded bg-gray-100;

        .sv-label {
          @apply px-2;
        }
      }

      .sv-placeholder {
        @apply text-gray-400;
      }

      .sv-delete {
        @apply font-medium text-xs border-l-2 inline-block h-full px-1.5 py-1 hover:text-gray-400;
        @apply cursor-pointer;
      }
    }
  }
</style>
