# Colors

The theme supports 14 colors and adds necessary variations of these colors as well (oh lordy)

## Main bois

### Styleguide

*	**Base `$color-brand-base`**

	darkest color, ususally for body color

*	**Background `$color-brand-background`**

	lightest color, usually for body background

Both schemes has an alt value for contrasting background instances. These values interchange on dark mode by default (eg: `$background-base-alt` )

*	**Primary `$brand-color-primary`**

	For elements worth highlighting or contrasting from the rest of the ui

*	**Accent `$brand-color-accent`**

	Other elements for highlighting and contrasting but not as important

### User feedback

*	**Success `$brand-color-success`**

	Duh

*	**Caution `$brand-color-caution`**

	A user feedback that isn't too fatal

*	**Error `$brand-color-error`**

	Fatal feedback


## Dependent schemes

These colors are dependent of custom palette [declared before them by default](../setup/customize.md).

### Gradient and Intensity

| Primary by default | Accent by default |
|--|--|
| `$brand-gradient-start` | `$brand-gradient-end` |
| `$brand-intensity-1` | `$brand-intensity-5` |

*	**Gradient Start and Gradient End `$brand-gradient-start` and `$brand-gradient-end`**

	Colors for gradient starts and stops for both css helpers and [svg classes](../scaffolding/images.md);

*	**Brand Intensity `$brand-intensity-[1 - 5]`**

	Colors for displaying intensity. by default, `$brand-intensity-[2-4]` are calculated based off from `$brand-intensity-1` and `$brand-intensity-5` 

### Scaffolding / Inverse Theme

*	**Global Color `$global-color`**

	body color. defaults to `$brand-color-base`.

	Defaults to `$brand-color-background` on inverse theme

*	**Global Color Contrast `$global-color-contrast`**

	slight variation of body color. defaults to `$brand-color-base-alt`.

	Defaults to `$brand-color-background-alt` on inverse theme

*	**Global Background `$global-background`**

	body background. defaults to `$brand-background-base`.

	Defaults to `$brand-color-base-alt` on inverse theme

*	**Global Color Contrast `$global-background-contrast`**

	slight variation of body background. defaults to `$brand-background-base-alt`.

	Defaults to `$brand-color-base` on inverse theme

Color and contrast palattes interchange on inverse theme by default. to see this effect, add `.body-inverse` to the body





[Back to TOC](../../../readme.md)