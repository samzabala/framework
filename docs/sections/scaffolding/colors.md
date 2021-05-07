# Colors

The theme supports 14 colors and adds necessary variations of these colors as well (oh lordy)

It's got it's opwn syntax with classes and shit so u better pay attention... or slap me if im not making sense because i wrote this

## Main bois

### Styleguide

- **Base `$color-brand-base`**

  darkest color, ususally for body color. not to be confused with the set theme values

- **Background `$color-brand-background`**

  lightest color, usually for body background. not to be confused with the set theme values

_Both schemes has an alt value for contrasting background instances._

_These values interchange on dark mode by default (eg: `$background-base-alt` )_

- **Primary `$brand-color-primary`**

  For elements worth highlighting or contrasting from the rest of the ui

- **Secondary `$brand-color-secondary`**

  Other elements for highlighting and contrasting but not as important

- **Accent `$brand-color-accent`**

  For adding a little bit of pizzazzz

- **Neutral `$brand-color-neutral`**

  For stuff that are there but not that important so it shouldnt stand out as much

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

- **Brand Intensity `$brand-intensity-[1 - 5]`**

  Colors for displaying intensity. by default, `$brand-intensity-[2-4]` are calculated based off from `$brand-intensity-1` and `$brand-intensity-5`

| Primary by default      | secondary by default  |
| ----------------------- | --------------------- |
| `$brand-gradient-start` | `$brand-gradient-end` |
| `$brand-intensity-1`    | `$brand-intensity-5`  |

- **Gradient Start and Gradient End `$brand-gradient-start` and `$brand-gradient-end`**

  Colors for gradient starts and stops for both css helpers and [svg classes](../scaffolding/images.md#svg);

## Scaffolding / Inverse Theme

- **Theme Color `$brand-theme-color`**

  body color. defaults to `$brand-color-base` on default theme

  Defaults to `$brand-color-background` on inverse theme

- **Theme Color Contrast `$brand-theme-color-contrast`**

  slight variation of body color. defaults to `$brand-color-base-alt` on default theme

  Defaults to `$brand-color-background-alt` on inverse theme

- **Theme Background `$brand-theme-background`**

  body background. defaults to `$brand-background-base` on default theme

  Defaults to `$brand-color-base-alt` on inverse theme

- **Theme Color Contrast `$brand-theme-background-contrast`**

  slight variation of body background. defaults to `$brand-background-base-alt` on default theme

  Defaults to `$brand-color-base` on inverse theme

Color and contrast palettes interchange on inverse theme by default. to see this effect, add `.theme-inverse` or `theme-default` to any component

# Color tags

These are valid color tags for all javascript arguments or data attributes

- `background`
- `base`
- `primary`
- `secondary`
- `accent`
- `neutral`
- `error`
- `caution`
- `success`

These color tags are valid for css helpers and most components. just not for [btn](../components/button.md), [btn](../components/badges.md), [forms](../components/forms.md) and [alerts](../components/alert.md). basically anything that javascript has fucked, or the component has multiple color based setup, this bitch is never gonna happen

- `intensity-1`
- `intensity-2`
- `intensity-3`
- `intensity-4`
- `intensity-5`
- `theme`
- `theme-contrast`
- `theme-polar`
- `theme-polar-contrast`
- `gradient`


# Variations

tags syntac means it look like this `{COLOR-TAG}-{VARIATION-TAG}`

Javascript doesn support this

## Simple Offset - `alt`

A single variation of the color.

#### Example:

`{COLOR-TAG}-alt`

#### Supports

- `background`
- `base`

## Complex Offset - `light` ,`lighter` ,`lightest` ,`dark` ,`darker` ,`darkest`

lots of variations of the color. because.

#### Examples:

- `{COLOR-TAG}-light`
- `{COLOR-TAG}-lighter`
- `{COLOR-TAG}-lightest`
- `{COLOR-TAG}-dark`
- `{COLOR-TAG}-darker`
- `{COLOR-TAG}-darkest`

#### Supports

- `primary`
- `secondary`
- `accent`
- `neutral`
- `error`
- `caution`
- `success`
- `intensity-1`
- `intensity-2`
- `intensity-3`
- `intensity-4`
- `intensity-5`

## Opacity - `alpha-{1-9}`

opacities because ooOOoo fancy goes from 1 through 9. if you want 0 or less u dumb that's transparent. 1 is just the color without variation

#### Examples:

- `{COLOR-TAG}-alpha-1`
- `{COLOR-TAG}-alpha-2`
- `{COLOR-TAG}-alpha-3`
- `{COLOR-TAG}-alpha-4`
- `{COLOR-TAG}-alpha-5`
- `{COLOR-TAG}-alpha-6`
- `{COLOR-TAG}-alpha-7`
- `{COLOR-TAG}-alpha-8`
- `{COLOR-TAG}-alpha-9`

#### Supports

- `primary`
- `secondary`
- `accent`
- `neutral`
- `error`
- `caution`
- `success`
- `intensity-1`
- `intensity-2`
- `intensity-3`
- `intensity-4`
- `intensity-5`

## Gradient Angle - `45`, `90`, `135`, `180`, `225`, `270`, `315`

linear gradient angles

#### Examples:

- `{COLOR-TAG}-45`
- `{COLOR-TAG}-90`
- `{COLOR-TAG}-135`
- `{COLOR-TAG}-180`
- `{COLOR-TAG}-225`
- `{COLOR-TAG}-270`
- `{COLOR-TAG}-315`

#### Supports

- `gradient`

# Helpers

color naming and tagging conventions supports the following helpers:

@TODO update
- [`.fill-*`](../helpers/svg.md#fill)
- [`.stroke-*`](../helpers//svg.md#stroke)
- [`.background-*`](../helpers/background.md#background-color)
- [`.color-*`](../helpers/text.md#color)
- [`.border-color-*`](../helpers/helper)

Appending the setup mentioned above with helpers they're formatted like dis:

NOTE: `gradient` color tag only supports `background because no shit`

**`{HELPER}-{COLOR}`**
**`{HELPER}-{COLOR}-{VARIATION-TAG}`**
**`{HELPER}-{COLOR}-{CONDITION}`**

what's them conditions about?? well...

## Conditional helpers

| Class                                                               | Condition when the color is applied |
| ------------------------------------------------------------------- | ----------------------------------- |
| **`{HELPER}-{COLOR-TAG or COLOR-TAG +'-'+ VARIATION-TAG}-hover`**   | &:hover                             |
| **`{HELPER}-{COLOR-TAG or COLOR-TAG +'-'+ VARIATION-TAG}-focus`**   | &:focus,&.focus                     |
| **`{HELPER}-{COLOR-TAG or COLOR-TAG +'-'+ VARIATION-TAG}-active`**  | &:active                            |
| **`{HELPER}-{COLOR-TAG or COLOR-TAG +'-'+ VARIATION-TAG}-toggle`**  | &.open,&.active                     |
| **`{HELPER}-{COLOR-TAG or COLOR-TAG +'-'+ VARIATION-TAG}-inverse`** | .theme-inverse &                    |
| **`{HELPER}-{COLOR-TAG or COLOR-TAG +'-'+ VARIATION-TAG}-default`** | .theme-default &                    |

@TODO findreplace
## Background helper classes

See [Helpers](../helpers/background.md)

## Color helper classes

See [Helpers](../helpers/color.md)

## SVG Classes

See [Images](../helpers/images.md#svg)

## Theme Specific

Depends on the color tags too so...

#### Color basis helpers
These helpers' values are set as the `theme-[color|color-contrast]`:

- `.color-*`
- `.border-color-*`

| Class                                           | Set by default (or when `.theme-default is active`) | Set color when `.theme-inverse is active`  |
| ------------------------------------------------| --------------------------------------------------- | ------------------------------------------ |
| **`{HELPER}-theme(-CONDITION)`**                | `$brand-theme-color`                                | `$brand-theme-color-inverse`               |
| **`{HELPER}-theme-contrast(-CONDITION)`**       | `$brand-theme-color-contrast`                       | `$brand-theme-color-contrast-inverse`      |
| **`{HELPER}-theme-polar(-CONDITION)`**          | `$brand-theme-background`                           | `$brand-theme-background-inverse`          |
| **`{HELPER}-theme-polar-contrast(-CONDITION)`** | `$brand-theme-background-contrast`                  | `$brand-theme-background-contrast-inverse` |


#### Background basis helpers

These helpers' values are set as the `theme-[background|background-contrast]`:

- `.fill-*`
- `.stroke-*`
- `.background-*`

| Class                                           | Set by default (or when `.theme-default is active`) | Set color when `.theme-inverse is active`  |
| ------------------------------------------------| --------------------------------------------------- | ------------------------------------------ |
| **`{HELPER}-theme(-CONDITION)`**                | `$brand-theme-background`                           | `$brand-theme-background-inverse`          |
| **`{HELPER}-theme-contrast(-CONDITION)`**       | `$brand-theme-background-contrast`                  | `$brand-theme-background-contrast-inverse` |
| **`{HELPER}-theme-polar(-CONDITION)`**          | `$brand-theme-color`                                | `$brand-theme-color-inverse`               |
| **`{HELPER}-theme-polar-contrast(-CONDITION)`** | `$brand-theme-color-contrast`                       | `$brand-theme-color-contrast-inverse`      |

#### Others

Components that suport this set up too

- `.btn-{COLOR-TAG}`
- `.btn-{COLOR-TAG}-outline`

See [Buttons](../components/button.md)

[Back to TOC](../../../readme.md)
