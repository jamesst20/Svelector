export type SvValueTypes = boolean | number | string;

declare namespace SvelectorProps {
  type TextExtrator<Opt> = ((option: Opt) => string) | string;
  type ValueExtrator<Opt> = ((option: Opt) => SvValueTypes) | string;

  type TextProperty<TKey> = TKey extends string ? { [K in TKey]: string } : Record<string, unknown>;
  type ValueProperty<VKey> = VKey extends string ? { [K in VKey]: SvValueTypes } : Record<string, unknown>;
  type Option<TKey, VKey> = ({ [key: string]: unknown } & TextProperty<TKey> & ValueProperty<VKey>) | SvValueTypes;

  type GroupedOption<Opt, GTKey extends string> = { [K in GTKey]: string } & { options: Opt[] };

  type Options<Opt, GTKey extends string> = Array<GroupedOption<Opt, GTKey>> | Array<Opt>;

  type Value<Opt extends Option<TKey, VKey>, VObj extends boolean, M extends boolean, TKey, VKey> = M extends true
    ? VObj extends true
      ? Opt extends object
        ? Array<Opt>
        : never
      : Opt extends object
        ? TKey extends string
          ? Opt[TKey] extends SvValueTypes
            ? Array<Opt[TKey]>
            : never
          : Array<SvValueTypes>
        : Opt extends SvValueTypes
          ? Array<Opt>
          : never
    : VObj extends true
      ? Opt extends object
        ? Opt
        : never
      : Opt extends SvValueTypes
        ? Opt
        : Opt extends object
          ? VKey extends string
            ? Opt[VKey] extends SvValueTypes
              ? Opt[VKey]
              : never
            : SvValueTypes
          : never;
}

/**
 * Definitions for the Svelector component.
 */
export interface SvelectorProps<
  Opt extends SvelectorProps.Option<TKey, VKey>,
  TKey extends SvelectorProps.TextExtrator<Opt>,
  VKey extends SvelectorProps.ValueExtrator<Opt>,
  GTKey extends string = "text",
  VObj extends boolean = false,
  M extends boolean = false,
> {
  disabled?: boolean;
  fetchUrl?: string;
  groupTextProperty?: GTKey;
  id?: string;
  multiple?: M;
  name?: string;
  onChange?: (value: SvelectorProps.Value<Opt, VObj, M, TKey, VKey> | null) => void;
  options?: SvelectorProps.Options<Opt, GTKey extends "options" ? never : GTKey>; // Not sure why Typescript GTKey is "options" | "text" by default.
  placeholder?: string;
  textProperty?: TKey;
  value?: SvelectorProps.Value<Opt, VObj, M, TKey, VKey> | null | undefined;
  valueAsObject?: VObj;
  valueProperty?: VKey;
}
