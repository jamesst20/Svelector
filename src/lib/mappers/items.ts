import type { SvOption, SvOptionGroup } from "$lib/Svelector.svelte";
import type { SvValueTypes } from "$lib/types/Svelector";

const normalizeValue = (value: any, multiple: boolean) => {
  if (Array.isArray(value) && !multiple) {
    value = value[0];
  } else if (!Array.isArray(value) && multiple) {
    if (value !== undefined && value !== null) {
      value = [value];
    } else {
      value = [];
    }
  }

  return value;
};

export const extractValue = (value: any, valueProperty: ((option: any) => SvValueTypes) | string): SvValueTypes => {
  // Don't check for valueAsObject here, because this method is also used for extracting values from options.
  // Don't check for value.constructor === Object here, because it doesn't work for proxy.
  if (typeof value === "object" && !(value === undefined || value === null)) {
    if (typeof valueProperty === "string" && Object.hasOwn(value, valueProperty)) {
      return value[valueProperty];
    } else if (typeof valueProperty === "function") {
      return valueProperty(value);
    } else {
      throw new Error("Failed to extract value from given value(s) or option(s).");
    }
  } else {
    return value;
  }
};

export const mapValues = (
  value: any,
  multiple: boolean,
  valueProperty: ((option: any) => SvValueTypes) | string,
): SvValueTypes[] => {
  value = normalizeValue(value, multiple);

  return (Array.isArray(value) ? value : [value])
    .map((val: any) => extractValue(val, valueProperty))
    .filter((val: any) => val !== undefined && val !== null);
};

export const mapSelected = (optionsGroups: SvOptionGroup[], values: SvValueTypes[]): SvOption[] =>
  optionsGroups.flatMap((group) => group.options.filter((opt) => values.includes(opt.value)));

export const filterInvalidValue = (
  value: any,
  options: SvOption[],
  valueProperty: ((option: any) => SvValueTypes) | string,
): any => {
  const filtered = (Array.isArray(value) ? value : [value]).filter((val) => {
    const extracted = extractValue(val, valueProperty);
    const opt = options.find((opt) => opt.value === extracted);
    if (!opt) console.warn("Failed to find matching option for value:", extracted);
    return !!opt;
  });
  return Array.isArray(value) ? filtered : filtered[0] || null;
};

export const toggleValue = (
  value: any,
  toggle: SvOption,
  multiple: boolean,
  valueAsObject: boolean,
  valueProperty: ((option: any) => SvValueTypes) | string,
): any => {
  const valueToToggle = valueAsObject ? toggle.original : toggle.value;

  value = normalizeValue(value, multiple);

  if (multiple) {
    if (!Array.isArray(value)) value = [];
    const index = value.findIndex((value: any) => extractValue(value, valueProperty) === toggle.value);
    if (index === -1) {
      return value.concat([valueToToggle]);
    } else {
      return [...value.slice(0, index), ...value.slice(index + 1)];
    }
  } else {
    if (extractValue(value, valueProperty) === toggle.value) return null;
    else return valueToToggle;
  }
};
