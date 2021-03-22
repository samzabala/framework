# Colors

The theme supports 14 colors and adds necessary variations of these colors as well (oh lordy)

## Main bois

### Styleguide

- **Base `$color-brand-base`**

  darkest color, ususally for body color

- **Background `$color-brand-background`**

  lightest color, usually for body background

_Both schemes has an alt value for contrasting background instances._

_These values interchange on dark mode by default (eg: `$background-base-alt` )_

- **Primary `$brand-color-primary`**

  For elements worth highlighting or contrasting from the rest of the ui

- **secondary `$brand-color-secondary`**

  Other elements for highlighting and contrasting but not as important

- **accent `$brand-color-accent`**

  For adding a little bit of pizzazzz

_Both schemes are used by [gradient and intensity](#gradient-and-intensity) palette variables by default_

### User feedback

- **Success `$brand-color-success`**

  Duh

- **Caution `$brand-color-caution`**

  A user feedback that isn't too fatal

- **Error `$brand-color-error`**

  Fatal feedback

## Dependent schemes

These colors are dependent of custom palette [declared before them by default](../setup/customize.md).

### Gradient and Intensity

| Primary by default      | secondary by default  |
| ----------------------- | --------------------- |
| `$brand-gradient-start` | `$brand-gradient-end` |
| `$brand-intensity-1`    | `$brand-intensity-5`  |

- **Gradient Start and Gradient End `$brand-gradient-start` and `$brand-gradient-end`**

  Colors for gradient starts and stops for both css helpers and [svg classes](../scaffolding/images.md#svg);

- **Brand Intensity `$brand-intensity-[1 - 5]`**

  Colors for displaying intensity. by default, `$brand-intensity-[2-4]` are calculated based off from `$brand-intensity-1` and `$brand-intensity-5`

### Scaffolding / Inverse Theme

- **Theme Color `$brand-theme-color`**

  body color. defaults to `$brand-color-base`.

  Defaults to `$brand-color-background` on inverse theme

- **Theme Color Contrast `$brand-theme-color-contrast`**

  slight variation of body color. defaults to `$brand-color-base-alt`.

  Defaults to `$brand-color-background-alt` on inverse theme

- **Theme Background `$brand-theme-background`**

  body background. defaults to `$brand-background-base`.

  Defaults to `$brand-color-base-alt` on inverse theme

- **Theme Color Contrast `$brand-theme-background-contrast`**

  slight variation of body background. defaults to `$brand-background-base-alt`.

  Defaults to `$brand-color-base` on inverse theme

Color and contrast palettes interchange on inverse theme by default. to see this effect, add `.theme-inverse` to the `<html>` tag

## Color tags

These are valid color tags for all javascript arguments or data attributes

- `primary`
- `secondary`
- `accent`
- `neutral`
- `error`
- `caution`
- `success`

These color tags are valid except for [btn](../components/button.md), [btn](../components/badges.md), [forms](../components/forms.md) and [alerts](../components/alert.md). basically anything that javascript has fucked, or the component has multiple color based setup, this bitch is never gonna happen

- `intensity-1`
- `intensity-2`
- `intensity-3`
- `intensity-4`
- `intensity-5`

## Background helper classes

See [Helpers](../scaffolding/helpers.md#background)

## Color helper classes

See [Helpers](../scaffolding/helpers.md#color)

## SVG Classes

See [Images](../scaffolding/images.md#svg)

[Back to TOC](../../../readme.md)
