<script lang="ts">
  import Svelector from "$lib";

  let options = [
    { text: "One", value: "1" },
    { text: "Two", value: "2" },
    { text: "Three", value: "3" },
    { text: "Four", value: "4" },
    { text: "Five", value: "5" },
    { text: "Six", value: "6" },
  ];

  let groupedOptions = [
    {
      options: [
        { text: "One", value: "1" },
        { text: "Two", value: "2" },
        { text: "Three", value: "3" },
      ],
      text: "Group 1",
    },
    {
      options: [
        { text: "Four", value: "4" },
        { text: "Five", value: "5" },
        { text: "Six", value: "6" },
      ],
      text: "Group 2",
    },
  ];

  let customOptions = [
    { id: 1, name: "John" },
    { id: 2, name: "Mary" },
    { id: 3, name: "Peter" },
    { id: 4, name: "Jane" },
    { id: 5, name: "Lisa" },
    { id: 6, name: "Linda" },
    { id: 7, name: "Kate" },
    { id: 8, name: "Mary" },
    { id: 9, name: "Peter" },
    { id: 10, name: "Jane" },
  ];

  let value = $state("1");
  let valueCustom = $state(1);
  let value2 = $state(groupedOptions[0].options[0].value);
  let value3 = $state(options[0]);
  let value4 = $state("1.00$");
  let value5 = $state(options[0]);
  let value6 = $state([options[0].value]);
  let value7 = $state([options[0]]);
  let value8 = $state(2);
</script>

<div class="flex flex-col gap-4">
  <div>
    Disabled:
    <Svelector disabled options={[]} />
  </div>

  <div>
    Basic:
    <Svelector bind:value {options} />
    <span>Selected value: {value}</span>
  </div>

  <div>
    Custom attributes:
    <Svelector bind:value={valueCustom} options={customOptions} textProperty="name" valueProperty="id" />
    <span>Selected value: {valueCustom}</span>
  </div>

  <div>
    Grouped options:
    <Svelector bind:value={value2} groupTextProperty="text" options={groupedOptions} />
    <span>Selected value: {value2}</span>
  </div>

  <div>
    Use the option as a value:
    <Svelector bind:value={value3} {options} valueAsObject={true} />
    <span>Selected value: {value3 ? JSON.stringify(value3) : value3}</span>
  </div>

  <div>
    Custom text and value parsing:
    <Svelector
      bind:value={value4}
      {options}
      textProperty={(opt) => `${opt.text} (Formatted)`}
      valueProperty={(opt) => `${opt.value}.00$`}
    />
    <span>Selected value: {value4}</span>
  </div>

  <div>
    Custom text and value parsing with valueAsObject=true:
    <Svelector bind:value={value5} {options} valueAsObject={true} />
    <span>Selected value: {value5 ? JSON.stringify(value5) : value5}</span>
  </div>

  <div>
    Multiple:
    <Svelector bind:value={value6} multiple={true} {options} />
    <span>Selected value: {value6}</span>
  </div>

  <div>
    Multiple with valueAsObject=true:
    <Svelector bind:value={value7} multiple={true} {options} valueAsObject={true} />
    <span>Selected value: {value7 ? JSON.stringify(value7) : value7}</span>
  </div>

  <div>
    Basic usage with API
    <Svelector bind:value={value8} fetchUrl={"/api/items"} />
    <span>Selected value: {value8}</span>
  </div>
</div>
