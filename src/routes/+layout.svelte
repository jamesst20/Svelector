<script lang="ts">
  import "../app.css";

  let { children, data } = $props();
</script>

<div class="flex h-screen grow flex-col">
  <header class="flex bg-white px-8 py-4 shadow-md">
    <span class="text-lg font-medium">Svelector</span>
  </header>

  <div class="flex grow">
    <div class="flex w-64 shrink-0 flex-col gap-2 bg-slate-100 p-4 pt-10">
      {#each data.sidebarItems as sidebarItem}
        <a class="rounded bg-white p-2 font-semibold text-slate-800 hover:bg-slate-50" href={sidebarItem.path}>
          {sidebarItem.text}
        </a>
      {/each}
    </div>

    <div class="flex grow flex-col p-5">
      {@render children()}
    </div>
  </div>
</div>

<style lang="postcss">
  :global(.shiki) {
    @apply rounded px-3 py-2;
  }
</style>
