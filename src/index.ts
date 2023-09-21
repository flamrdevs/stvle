type StyleValue = { [key: string]: any };

type TransformKey<T extends PropertyKey> = T extends "true" ? true : T extends "false" ? false : Exclude<T, symbol>;

type VariantsSchema<SV extends StyleValue> = {
  [variant: string]: {
    [type: string]: SV;
  };
};

type StvleOptions<SV extends StyleValue, T extends VariantsSchema<SV>> = {
  base?: SV;
  variants: T;
  defaultVariants?: { [K in keyof T]?: TransformKey<keyof T[K]> };
  compoundVariants?: { variant: { [K in keyof T]?: TransformKey<keyof T[K]> }; style: SV }[];
};

type Stvle<SV extends StyleValue> = <T extends VariantsSchema<SV>>(
  options: StvleOptions<SV, T>
) => (props?: { [K in keyof T]?: TransformKey<keyof T[K]> }) => SV;

const getPropKey = <T extends VariantsSchema<StyleValue>[string]>(value?: TransformKey<keyof T>, defaultValue?: TransformKey<keyof T>) =>
  `${value ?? defaultValue}`;

const stvle: Stvle<StyleValue> = <T extends VariantsSchema<StyleValue>>(options: StvleOptions<StyleValue, T>) => {
  const {
    base = {} as StyleValue,
    variants,
    defaultVariants = {} as { [K in keyof T]?: TransformKey<keyof T[K]> },
    compoundVariants = [],
  } = options;

  const keyofVariants: (keyof T)[] = Object.keys(variants);

  return (props?: { [K in keyof T]?: TransformKey<keyof T[K]> }) => {
    let result = {
        ...base,
      } as StyleValue,
      key: string;

    for (const variant of keyofVariants) {
      if ((key = getPropKey(props?.[variant], defaultVariants[variant])) in variants[variant])
        Object.assign(result, variants[variant][key]);
    }

    for (const { variant, style } of compoundVariants) {
      let val: (typeof variant)[keyof typeof variant];
      if (
        Object.keys(variant).every(
          (key) => typeof (val = variant[key as keyof typeof variant]) !== "undefined" && (props?.[key] ?? defaultVariants[key]) === val
        )
      ) {
        Object.assign(result, style);
      }
    }

    return result;
  };
};

export type { Stvle };
export default stvle;
