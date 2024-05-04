import type { SvOption, SvOptionGroup } from "$lib/Svelector.svelte";
import type { SvValueTypes } from "$lib/types/Svelector";

import { extractValue } from "./items";

const extractText = (option: any, textProperty: ((option: any) => string) | string) => {
  if (typeof option === "object" && !(option === undefined || option === null)) {
    if (typeof textProperty === "string") {
      return String(option[textProperty]);
    } else if (typeof textProperty === "function") {
      return textProperty(option);
    } else {
      throw new Error("Invalid textProperty type. Expected string or function.");
    }
  } else {
    return String(option);
  }
};

const buildOption = (
  option: any,
  textProperty: ((option: any) => string) | string,
  valueProperty: ((option: any) => SvValueTypes) | string,
): SvOption => ({
  original: option,
  text: extractText(option, textProperty),
  value: extractValue(option, valueProperty),
});

const buildOptionGroup = (
  group: null | string,
  options: Array<any>,
  textProperty: ((option: any) => string) | string,
  valueProperty: ((option: any) => SvValueTypes) | string,
): SvOptionGroup => ({
  options: options.map((opt: any) => buildOption(opt, textProperty, valueProperty)),
  text: group,
});

export const mapOptions = (
  options: Array<any>,
  groupTextProperty: string,
  textProperty: ((option: any) => string) | string,
  valueProperty: ((option: any) => SvValueTypes) | string,
): SvOptionGroup[] => {
  if (!Array.isArray(options) || options.length === 0) return [];

  if (Object.hasOwn(options[0], "options") && Object.hasOwn(options[0], groupTextProperty)) {
    return options.map((optGroup) =>
      buildOptionGroup(optGroup[groupTextProperty], optGroup.options, textProperty, valueProperty),
    );
  } else {
    return [buildOptionGroup(null, options, textProperty, valueProperty)];
  }
};
