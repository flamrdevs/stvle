import { describe, expect, it } from "vitest";

import stvle from ".";

describe("stvle", () => {
  it("works", () => {
    const fn = stvle({
      base: {
        display: "inline-flex",
      },
      variants: {
        color: {
          red: {
            color: "red",
          },
          green: {
            color: "green",
          },
          blue: {
            color: "blue",
          },
        },
        size: {
          sm: {
            size: "sm",
          },
          md: {
            size: "md",
          },
          lg: {
            size: "lg",
          },
        },
        z: {
          0: {
            z: 0,
          },
          1: {
            z: 1,
          },
          2: {
            z: 2,
          },
        },
        disabled: {
          true: {
            disabled: true,
          },
        },
      },
      defaultVariants: {
        color: "green",
        size: "md",
      },
      compoundVariants: [
        {
          variant: {
            color: "red",
            disabled: true,
          },
          style: {
            "color-disabled": "red-true",
          },
        },
        {
          variant: {
            color: "green",
            disabled: true,
          },
          style: {
            "color-disabled": "green-true",
          },
        },
        {
          variant: {
            color: "blue",
            disabled: true,
          },
          style: {
            "color-disabled": "blue-true",
          },
        },
      ],
    });

    expect(fn()).toEqual({
      display: "inline-flex",
      color: "green",
      size: "md",
    });

    expect(fn({ color: "red" })).toEqual({
      display: "inline-flex",
      color: "red",
      size: "md",
    });

    expect(fn({ color: "blue" })).toEqual({
      display: "inline-flex",
      color: "blue",
      size: "md",
    });

    expect(fn({ size: "sm" })).toEqual({
      display: "inline-flex",
      color: "green",
      size: "sm",
    });

    expect(fn({ size: "lg" })).toEqual({
      display: "inline-flex",
      color: "green",
      size: "lg",
    });

    expect(fn({ z: 1 })).toEqual({
      display: "inline-flex",
      color: "green",
      size: "md",
      z: 1,
    });

    expect(fn({ disabled: true })).toEqual({
      display: "inline-flex",
      color: "green",
      size: "md",
      disabled: true,
      "color-disabled": "green-true",
    });
  });
});
