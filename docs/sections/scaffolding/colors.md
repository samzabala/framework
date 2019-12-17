# Colors

The theme supports 14 colors and adds necessary variations of these colors as well (oh lordy)

## Main bois

### Styleguide

*	**Base `$color-brand-base`**

	darkest color, ususally for body color

*	**Background `$color-brand-background`**

	lightest color, usually for body background

*Both schemes has an alt value for contrasting background instances.*

*These values interchange on dark mode by default (eg: `$background-base-alt` )*

*	**Primary `$brand-color-primary`**

	For elements worth highlighting or contrasting from the rest of the ui

*	**Accent `$brand-color-accent`**

	Other elements for highlighting and contrasting but not as important
	
*Both schemes are used by [gradient and intensity](#gradient-and-intensity) palette variables by default*


### User feedback

*	**Success `$brand-color-success`**

	Duh

*	**Caution `$brand-color-caution`**

	A user feedback that isn't too fatal

*	**Error `$brand-color-error`**

	Fatal feedback

*	**Accent `$brand-color-neutral`**

	Other elements that shouldnt be hightlighted but has to be there


## Dependent schemes

These colors are dependent of custom palette [declared before them by default](../setup/customize.md).

### Gradient and Intensity

| Primary by default 		| Accent by default 	|
| -- 						| -- 					|
| `$brand-gradient-start` 	| `$brand-gradient-end` |
| `$brand-intensity-1` 		| `$brand-intensity-5` 	|

*	**Gradient Start and Gradient End `$brand-gradient-start` and `$brand-gradient-end`**

	Colors for gradient starts and stops for both css helpers and [svg classes](../scaffolding/images.md#svg);

*	**Brand Intensity `$brand-intensity-[1 - 5]`**

	Colors for displaying intensity. by default, `$brand-intensity-[2-4]` are calculated based off from `$brand-intensity-1` and `$brand-intensity-5` 

### Scaffolding / Inverse Theme

*	**Theme Color `$theme-color`**

	body color. defaults to `$brand-color-base`.

	Defaults to `$brand-color-background` on inverse theme

*	**Theme Color Contrast `$theme-color-contrast`**

	slight variation of body color. defaults to `$brand-color-base-alt`.

	Defaults to `$brand-color-background-alt` on inverse theme

*	**Theme Background `$theme-background`**

	body background. defaults to `$brand-background-base`.

	Defaults to `$brand-color-base-alt` on inverse theme

*	**Theme Color Contrast `$theme-background-contrast`**

	slight variation of body background. defaults to `$brand-background-base-alt`.

	Defaults to `$brand-color-base` on inverse theme

Color and contrast palettes interchange on inverse theme by default. to see this effect, add `.theme-inverse` to the `<html>` tag



## Color tags
These are valid color tags for all javascript arguments or data attributes
*	`primary`
*	`accent`
*	`neutral`
*	`error`
*	`caution`
*	`success`

These color tags are valid except for [btn](../components/button.md) and [forms](../components/forms.md)
*	`intensity-1`
*	`intensity-2`
*	`intensity-3`
*	`intensity-4`
*	`intensity-5`

See [Tooltip](../components/tooltip.md)

## Background helper classes

See [Helpers](../scaffolding/helpers.md#background)

## Color helper classes

See [Helpers](../scaffolding/helpers.md#color)


## SVG Classes
See [Images](../scaffolding/images.md#svg)

[Back to TOC](../../../readme.md)