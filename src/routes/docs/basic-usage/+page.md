---
sidebar: Basic usage
position: 2
---
<script lang="ts">

  import Svelector from "$lib";

  let basicValue;
  let mostBasicValue;
</script>

## Most basic usage

<div class="not-prose">
  <Svelector
    bind:value={mostBasicValue}
    options={[
      "One",
      "Two",
      "Three"
    ]} />
</div>

```svelte
<Svelector
  bind:value={value}
  options={[
    "One",
    "Two",
    "Three"
  ]} />
```

## Basic usage

<div class="not-prose">
  <Svelector
    bind:value={basicValue}
    options={[
      { text: "One", value: "1" },
      { text: "Two", value: "2" },
      { text: "Three", value: "3" }
    ]}
    textProperty="text"
    valueProperty="value" />
</div>

```svelte
<Svelector
  bind:value={value}
  options={[
    { text: "One", value: "1" },
    { text: "Two", value: "2" },
    { text: "Three", value: "3" }
  ]}
  textProperty="text"
  valueProperty="value" />
```
