# Inline Flex

Apply inine flex or based on [breakpoint](../scaffolding/breakpoint.md)

- **`.inline-flex`**
- **`.inline-flex-xs`**
- **`.inline-flex-sm`**
- **`.inline-flex-md`**
- **`.inline-flex-lg`**

# Flex

[More info on flexin](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

Not to be confused with [Flex Grid](../layout/flexgrid.md) setup. However, you can still use the classes with the flex grid.

## Breakpoint based

Apply flex or based on [breakpoint](../scaffolding/breakpoint.md).

For simpler flex setups

- **`.flex`**
- **`.flex-xs`**
- **`.flex-sm`**
- **`.flex-md`**
- **`.flex-lg`**

## Flex Direction

- **`.flex-direction-row`**
- **`.flex-direction-row-reverse`**
- **`.flex-direction-column`**
- **`.flex-direction-column-reverse`**
- **`.flex-direction-inherit`**

## Flex Wrap

- **`.flex-wrap`**
- **`.flex-nowrap`**
- **`.flex-wrap-reverse`**
- **`.flex-wrap-inherit`**

## Grow and Shrink

The framework has classes for basic grow and shrink values, 0 and 3 (by default but can be changed if u change the value of `$flex-max`). You do that with **`.flex-[GROW]-[SHRINK]`**

Examples:

```html
<div class="flex-1-0"></div>
<div class="flex-0-2"></div>
<div class="flex-1-1"></div>
<div class="flex-3-0"></div>
```

[Back to TOC](../../../readme.md)