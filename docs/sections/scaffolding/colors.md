# Colors

The theme supports 14 colors and adds necessary variations of these colors as well (oh lordy)

It's got it's opwn syntax with classes and shit so u better pay attention... or slap me if im not making sense because i wrote this

## Main bois

### Styleguide

- **Base `$color-brand-base`**

  darkest color, ususally for body color. not to be confused with the set theme values

- **Background `$color-brand-background`**

  lightest color, usually for body background. not to be confused with the set theme values

_Both schemes has an alt value for contrasting background instances. More on it in a lil bit_

_These values interchange on dark mode by default (eg: `$background-base-alt` )_

- **Primary `$brand-color-primary`**

  For elements worth highlighting or contrasting from the rest of the ui

- **Secondary `$brand-color-secondary`**

  Other elements for highlighting and contrasting but not as important

- **Accent `$brand-color-accent`**

  For adding a little bit of pizzazzz

- **Neutral `$brand-color-neutral`**

  For stuff that are there but not that important so it shouldnt stand out as much

_Both Primary and Secondary are used by [gradient and intensity](#gradient-and-intensity) palette variables by default_

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
-
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



# Summary

Shouldve just prolly made it to a table godammit

```html
<div class="{HELPER}-{COLOR} {HELPER}-{COLOR}-{CONDITION}">Boxy boi</div>

<div class="{HELPER}-{COLOR}-{VARIATION} {HELPER}-{COLOR}-{VARIATION}-{CONDITION}">Boxy boi</div>

<div class="{HELPER}-{COLOR}-{VARIATION} {HELPER}-{COLOR}-{CONDITION}">Boxy boi</div>

<div class="{HELPER}-{COLOR} {HELPER}-{COLOR}-{VARIATION}-{CONDITION}">Boxy boi</div>
```
<table>
  <thead>
    <tr>
      <th><code>COLOR</code></th>
      <th colspan="3"><code>VARIATION</code> - Offset or Opacity or Angles</th>
      <th><code>CONDITION</code> (append)</th>
      <th><code>HELPER</code> (prepend)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th><code>background</code></th>
      <td rowspan="2">
          <p><code>alt</code></p>
      </td>
      <td rowspan="14">
          <p><code>alpha-1</code></p>
          <p><code>alpha-2</code></p>
          <p><code>alpha-3</code></p>
          <p><code>alpha-4</code></p>
          <p><code>alpha-5</code></p>
          <p><code>alpha-6</code></p>
          <p><code>alpha-7</code></p>
          <p><code>alpha-8</code></p>
          <p><code>alpha-9</code></p>
      </td>
      <td rowspan="18">N/A</td>
      <td rowspan="19">
          <p><code>hover</code></p>
          <p><code>focus</code></p>
          <p><code>active</code></p>
          <p><code>toggle</code></p>
          <p><code>inverse</code></p>
          <p><code>default</code></p>
      </td>
      <td rowspan="18">
          <p><code>`.backrground-*`</code></p>
          <p><code>`.border-color-*`</code></p>
          <p><code>`.fill-*`</code></p>
          <p><code>`.stroke-*`</code></p>
          <p><code>`.color-*`</code></p>
      </td>
    </tr>
    <tr>
      <th><code>base</code></th>
    </tr>
    <tr>
      <th><code>primary</code></th>
      <td rowspan="12">
          <p><code>lightest</code></p>
          <p><code>lighter</code></p>
          <p><code>light</code></p>
          <p><code>dark</code></p>
          <p><code>darker</code></p>
          <p><code>darkest</code></p>
      </td>
    </tr>
    <tr>
      <th><code>secondary</code></th>
    </tr>
    <tr>
      <th><code>accent</code></th>
    </tr>
    <tr>
      <th><code>neutral</code></th>
    </tr>
    <tr>
      <th><code>error</code></th>
    </tr>
    <tr>
      <th><code>caution</code></th>
    </tr>
    <tr>
      <th><code>success</code></th>
    </tr>
    <tr>
      <th><code>intensity-1</code></th>
    </tr>
    <tr>
      <th><code>intensity-2</code></th>
    </tr>
    <tr>
      <th><code>intensity-3</code></th>
    </tr>
    <tr>
      <th><code>intensity-4</code></th>
    </tr>
    <tr>
      <th><code>intensity-5</code></th>
    </tr>
    <tr>
      <th><code>theme</code></th>
      <td rowspan="5"> N/A</td>
      <td rowspan="5"> N/A</td>
    </tr>
    <tr>
      <th><code>theme-contrast</code></th>
    </tr>
    <tr>
      <th><code>theme-polar</code></th>
    </tr>
    <tr>
      <th><code>theme-polar-contrast</code></th>
    </tr>
    <tr>
      <th><code>gradient</code></th>
      <td>
          <p><code>45</code></p>
          <p><code>90</code></p>
          <p><code>135</code></p>
          <p><code>180</code></p>
          <p><code>225</code></p>
          <p><code>270</code></p>
          <p><code>315</code></p>
      </td>
      <td>
          <p><code>`.backrground-*`</code></p>
      </td>
    </tr>
  </tbody>
</table>

See [Buttons](../components/button.md)

[Back to TOC](../../../readme.md)
