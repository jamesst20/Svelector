<script lang="ts">
  import { type Snippet } from "svelte";

  let { children } = $props<{ children: Snippet }>();
</script>

<div class="prose">
  {@render children()}
</div>

<style lang="postcss">
  :global(.shiki) {
    @apply rounded px-3 py-2;
  }

  :global(.prose) {
    @apply !max-w-full;
  }
</style>
