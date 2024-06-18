---
sidebar: Getting started
position: 1
---

# Svelector

**Work in progress**: The library is still under development. Some API changes are to be expected and more features and customizations are coming soon.

Svelector is a flexible Select/Dropdown/AutoComplete component fully written from the ground up in Svelte 5. The component is also fully written in TypeScript giving the opportunity to warn developers about errors much faster.

## Installing

```
npm install --save @jamesst20/svelector
yarn add @jamesst20/svelector
pnpm add @jamesst20/svelector
```

## Features

* Single and multiple selection
* Remote data fetch using JSON
* Custom text extractor
* Custom value extractor
* Customizable value and text attribute
* Support simple items and object items
* Support using simple value and also the option as the value
* Can be disabled
* Smart list layout: automatically select the best position around the input to open the list. It can be top, bottom and even fullscreen depending on the scroll position and viewport size.

## Missing features

* Customizable styles (Altought it can be overriden by css)
* Customizable list item snippet
* Customizable placeholder snippet
* Customizable single/multiple option snippet
* Lazy rendering
* Search within options
* Search with data fetch
* Pagination with data fetch
* Use native select under the hood for regular form usage
* Sorting items with drag and drop
* Creating new items
* Better keyboard accessibility
* Cancelling updates with onChange event
* Limitating the maximum of selectable options
* Custom options resolver
* More props to customize the general behavior of the dropdown

