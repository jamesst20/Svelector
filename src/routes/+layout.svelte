<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<div class="flex flex-col grow h-screen">
  <header class="flex bg-white px-8 py-4 shadow-md">
    <span class="font-medium text-lg">Svelector</span>
  </header>
  <div class="flex grow">
    <div class="flex flex-col bg-slate-100 w-64 shrink-0 p-4 pt-10">
      <a class="p-2 bg-white hover:bg-slate-50 text-slate-800 rounded font-semibold" href="/"> Getting started </a>
    </div>

    <div class="flex flex-col grow p-5">
      {@render children()}
    </div>
  </div>
</div>
