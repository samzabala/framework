# Helpers

## Background and Colors

All influenced by [color declarations](../scaffolding/colors.md)

###  Basic



#### Border Color

*   **`.border-color-base` (Not to be confused with theme-color)**
*   **`.border-color-background` (Not to be confused with theme-background)**
*   **`.border-color-primary`**
*   **`.border-color-secondary`**
*   **`.border-color-accent`**
*   **`.border-color-neutral`**
*   **`.border-color-success`**
*   **`.border-color-caution`**
*   **`.border-color-error`**
*   **`.border-color-intensity-1`**
*   **`.border-color-intensity-2`**
*   **`.border-color-intensity-3`**
*   **`.border-color-intensity-4`**
*   **`.border-color-intensity-5`**
*   **`.border-color-inherit`**
*   **`.border-color-transparent`**


#### Border Style

*   **`.border-style-none`**
*   **`.border-style-hidden`**
*   **`.border-style-dotted`**
*   **`.border-style-dashed`**
*   **`.border-style-solid`**
*   **`.border-style-double`**
*   **`.border-style-groove`**
*   **`.border-style-ridge`**
*   **`.border-style-inset`**
*   **`.border-style-outset`**

Can also be specific to a side. for example for `.border-style-solid`

*   **`.border-style-solid-left`**
*   **`.border-style-solid-bottom`**
*   **`.border-style-solid-right`**
*   **`.border-style-solid-top`**
*   **`.border-style-solid-x`**
*   **`.border-style-solid-y`**


#### Border Width

*   **`.border-width-thin`**
*   **`.border-width-medium`**
*   **`.border-width-thick`**


Can also be specific to a side. for example for `.border-width-thick`

*   **`.border-width-thick-left`**
*   **`.border-width-thick-bottom`**
*   **`.border-width-thick-right`**
*   **`.border-width-thick-top`**
*   **`.border-width-thick-x`**
*   **`.border-width-thick-y`**

To reset brder- widths view [Reset Borders](#reset-borders)

#### Background

*   **`.background-base` (Not to be confused with theme-color)**
*   **`.background-background` (Not to be confused with theme-background)**
*   **`.background-primary`**
*   **`.background-secondary`**
*   **`.background-accent`**
*   **`.background-neutral`**
*   **`.background-success`**
*   **`.background-caution`**
*   **`.background-error`**
*   **`.background-intensity-1`**
*   **`.background-intensity-2`**
*   **`.background-intensity-3`**
*   **`.background-intensity-4`**
*   **`.background-intensity-5`**
*   **`.background-inherit`**
*   **`.background-transparent`**

##### Background Gradient

This will add gradient colors. By default, the gradient will be at angle 0deg, appending -#{$angle} will angle otherwise. **Valid angles are 45,90,135,180,225,270, and 315**

*   **`.background-gradient`** (0deg)
*   **`.background-gradient-45`** (45deg)
*   **`.background-gradient-90`** (90deg)
*   **`.background-gradient-135`** (135deg)
*   **`.background-gradient-180`** (180deg)
*   **`.background-gradient-225`** (225deg)
*   **`.background-gradient-270`** (270deg)
*   **`.background-gradient-315`** (315deg)


#### Color

*   **`.color-base` (Not to be confused with theme-color)**
*   **`.color-background` (Not to be confused with theme-background)**
*   **`.color-primary`**
*   **`.color-secondary`**
*   **`.color-accent`**
*   **`.color-neutral`**
*   **`.color-success`**
*   **`.color-caution`**
*   **`.color-error`**
*   **`.color-intensity-1`**
*   **`.color-intensity-2`**
*   **`.color-intensity-3`**
*   **`.color-intensity-4`**
*   **`.color-intensity-5`**
*   **`.color-inherit`**


### Theme Based

These classes will set the proper color based off of html tag having the `.theme-inverse` class


#### Background

| Class 							| Set color | Set color when `.theme-inverse is active` 				|
| --								| --		| --														|
| **`.background-theme`** 			| `$theme-background`			| `$theme-background-inverse` 			|
| **`.background-theme-contrast`** 	| `$theme-background-contrast`	| `$theme-background-contrast-inverse`	|
| **`.background-theme-polar`** 			| `$theme-color`				| `$theme-color-inverse`				|
| **`.background-theme-polar-contrast`** 	| `$theme-color-contrast`		| `$theme-color-contrast-inverse`		|

To set any background classes only on pseudo classes or interactive conditions, append whichever is needed


#### Color

These classes will set the proper color based off of html tag having the `.theme-inverse` class

| Class							 | Set color | Set color when `.theme-inverse is active`				|
| --							| --		| --														|
| **`.color-theme`**			| `$theme-color` 				| `$theme-color-inverse`				|
| **`.color-theme-contrast`** 	| `$theme-color-contrast`		| `$theme-color-contrast-inverse`		|
| **`.color-theme-polar`** 			| `$theme-background`			| `$theme-background-inverse`			|
| **`.color-theme-polar-contrast`** 	| `$theme-background-contrast` 	| `$theme-background-contrast-inverse` 	|


#### Border color

These classes will set the proper color based off of html tag having the `.theme-inverse` class

| Class							 | Set color | Set color when `.theme-inverse is active`				|
| --							| --		| --														|
| **`.border-color-theme`**			| `$theme-color` 				| `$theme-color-inverse`				|
| **`.border-color-theme-contrast`** 	| `$theme-color-contrast`		| `$theme-color-contrast-inverse`		|
| **`.border-color-theme-polar`** 			| `$theme-background`			| `$theme-background-inverse`			|
| **`.border-color-theme-polar-contrast`** 	| `$theme-background-contrast` 	| `$theme-background-contrast-inverse` 	|



### Pseudo/Toggle Based

#### Background

| Appendage | Condition when the color is applied |
| -- | -- |
| **.background-[color-tag]-hover** | &:hover |
| **.background-[color-tag]-focus** | &:focus,&.focus |
| **.background-[color-tag]-active** | &:active |
| **.background-[color-tag]-toggle** | &.open,&.active |
| **.background-[color-tag]-inverse** | .theme-inverse & |



eg: `.background-primary-hover` applies $brand-color-primary on :hover


#### Color

| Appendage | Condition when the color is applied |
| -- | -- |
| **.color-[color-tag]-hover** | &:hover |
| **.color-[color-tag]-focus** | &:focus,&.focus |
| **.color-[color-tag]-active** | &:active |
| **.color-[color-tag]-toggle** | &.open,&.active |
| **.color-[color-tag]-inverse** | .theme-inverse & |

#### Border Color

| Appendage | Condition when the color is applied |
| -- | -- |
| **.border-color-[color-tag]-hover** | &:hover |
| **.border-color-[color-tag]-focus** | &:focus,&.focus |
| **.border-color-[color-tag]-active** | &:active |
| **.border-color-[color-tag]-toggle** | &.open,&.active |
| **.border-color-[color-tag]-inverse** | .theme-inverse & |



## Fill and Stroke
[See SVGs](../scaffolding/images.md#svg);


## Font classes

### Family

*   **`.font-family-primary`**
	
	Set font-family to set `$brand-font-primary`;

*   **`.font-family-secondary`**
	
	Set font-family to set `$brand-font-secondary`;

*   **`.font-family-accent`**

	Set font-family to set `$brand-font-accent`;

*   **`.font-family-monospace`**
	
	Set font-family to set `$brand-font-monospace`;

*   **`.font-family-inherit`**

	Inherit font family

[More info on the css property](https://www.w3schools.com/cssref/pr_font_font-family.asp)

### Size

*   **`.font-size-large`**
	
	Set font size to set `$body-font-size-large`;

*   **`.font-size-small`**

	Set font size  to set `$body-font-size-large`;

*   **`.font-size-normalize`**

	Set font size  to set `$body-font-size`;

*   **`.font-size-inherit`**

	Inherit font size

[More info on the css property](https://www.w3schools.com/cssref/pr_font_font-size.asp)

### Weight

Set to whatever font weight ya need boi

*   **`.font-weight-100`**
*   **`.font-weight-200`**
*   **`.font-weight-300`**
*   **`.font-weight-400`**
*   **`.font-weight-500`**
*   **`.font-weight-600`**
*   **`.font-weight-700`**
*   **`.font-weight-800`**
*   **`.font-weight-900`**
*   **`.font-weight-inherit`**


[More info on the css property](https://www.w3schools.com/cssref/pr_font_font-weight.asp)

### Style

Set to whatever font weight ya need boi

*   **`.font-style-italic`**
*   **`.font-style-oblique`**
*   **`.font-style-normal`**
*   **`.font-style-inherit`**

[More info on the css property](https://www.w3schools.com/cssref/pr_font_font-style.asp)

## Display
*   **`.display-block`**
*   **`.display-inline-block`**
*   **`.display-inline`**
*   **`.display-none`**

[More info on the css property](https://www.w3schools.com/css/css_display_visibility.asp)

# Text

## Leading

*	**`.text-leading-compact`**

	Shrinks line-height to `$body-line-height` multiplied by `$body-line-height-compact-factor`. .75 or 18px by default

*	**`.text-leading-expanded`**

	expands line-height to `$body-line-height` multiplied by `$body-line-height-expanded-factor`. 1.5 or 35px by default

*	**`.text-leading-normalize`**

	Resets line-height to `$body-line-height`. 24px by default

*	**`.text-leading-inherit`**

	line-height is set to inherit line-height.

*	**`.text-leading-whole`**

	line-height is set to 1. which means no line-height. just the same height as the font.

[More info on the css property](https://www.w3schools.com/cssref/pr_dim_line-height.asp)

## Align

*   **`.text-align-center`**
*   **`.text-align-right`**
*   **`.text-align-left`**
*   **`.text-align-justify`**
*   **`.text-align-inherit`**

[More info on the css property](https://www.w3schools.com/cssref/pr_text_text-align.asp)

## Transform

*   **`.text-transform-uppercase`**
*   **`.text-transform-lowercase`**
*   **`.text-transform-capitalize`**
*   **`.text-transform-inherit`**
*   **`.text-transform-none`**

[More info on the css property](https://www.w3schools.com/cssref/pr_text_text-transform.asp)

## Vertical align

*   **`.text-vertical-align-middle`**
*   **`.text-vertical-align-baseline`**
*   **`.text-vertical-align-top`**
*   **`.text-vertical-align-bottom`**
*   **`.text-vertical-align-text-top`**
*   **`.text-vertical-align-text-bottom`**
*   **`.text-vertical-align-sub`**
*   **`.text-vertical-align-super`**
*   **`.text-vertical-align-inherit`**

[More info on the css property](https://www.w3schools.com/cssref/pr_pos_vertical-align.asp)


## Wrap

*   **`.text-wrap`**

	Wrap text

*   **`.text-wrap-nowrap`**

    Don't wrap the text AT ALL

*   **`.text-wrap-break`**

    Wrap text but allow superduperfuckingshitshitbitchinlongfu 

	king words to break

*   **`.text-wrap-ellipsis`**

	Single line of text that cuts off any overflow with a an ellipsis

	[More info](https://css-tricks.com/snippets/css/truncate-string-with-ellipsis/)

*   **`.text-wrap-ellipsis-multiple`**

	Allows multiple lines based on given `$body-ellipsis-multiple-factor`. 2 by default

## Clip Background

*   **`.text-clip-background`**

	Create knockout text effect. useful with [.bacgkround-gradient](#gradient) classes
	
	[More info](https://css-tricks.com/how-to-do-knockout-text/)

# Scaffolding Margins


*   **`.p`**

	Adds margins to element as if it were a `<p>` tag


# Reset Margins

*   **`.no-margin`**

	No margin on all sides

*   **`.no-margin-x`**

	No margin on left and right sides

*   **`.no-margin-y`**

	No margin on top and bottom sides

*   **`.no-margin-top`**

	No margin on the top

*   **`.no-margin-bottom`**

	No margin on the bottom

*   **`.no-margin-left`**

	No margin on the left

*   **`.no-margin-right`**

	No margin on the right




# Auto Margins

*   **`.margin-auto`**

	`margin:auto` on all sides

*   **`.margin-auto-x`**

	`margin:auto` on left and right sides

*   **`.margin-auto-y`**

	`margin:auto` on top and bottom sides

*   **`.margin-auto-top`**

	`margin:auto` on the top

*   **`.margin-auto-bottom`**

	`margin:auto` on the bottom

*   **`.margin-auto-left`**

	`margin:auto` on the left

*   **`.margin-auto-right`**

	`margin:auto` on the right

[More info on the css property](https://www.w3schools.com/css/css_margin.asp)



# Reset borders

*   **`.no-border`**

	No border on all sides

*   **`.no-border-x`**

	No border on left and right sides

*   **`.no-border-y`**

	No border on top and bottom sides

*   **`.no-border-top`**

	No border on the top

*   **`.no-border-bottom`**

	No border on the bottom

*   **`.no-border-left`**

	No border on the left

*   **`.no-border-right`**

	No border on the right

[More info on the css property](https://www.w3schools.com/css/css_border.asp)


# Reset Padding

*   **`.no-padding`**

	No padding on all sides

*   **`.no-padding-x`**

	No padding on left and right sides

*   **`.no-padding-y`**

	No padding on top and bottom sides

*   **`.no-padding-top`**

	No padding on the top

*   **`.no-padding-bottom`**

	No padding on the bottom

*   **`.no-padding-left`**

	No padding on the left

*   **`.no-padding-right`**

	No padding on the right

[More info on the css property](https://www.w3schools.com/css/css_padding.asp)

# Overflow

## Both ways

*   **`.overflow-visible`**
*   **`.overflow-hidden`**
*   **`.overflow-scroll`**
*   **`.overflow-overlay`**
*   **`.overflow-auto`**

## X Only

*   **`.overflow-x-visible`**
*   **`.overflow-x-hidden`**
*   **`.overflow-x-scroll`**
*   **`.overflow-x-overlay`**
*   **`.overflow-x-auto`**
*   
## Y Only

*   **`.overflow-y-visible`**
*   **`.overflow-y-hidden`**
*   **`.overflow-y-scroll`**
*   **`.overflow-y-overlay`**
*   **`.overflow-y-auto`**

[More info on the css property](https://www.w3schools.com/css/css_overflow.asp)

# Position

*   **`.position-relative`**
*   **`.position-static`**
*   **`.position-absolute`**
*   **`.position-fixed`**
*   **`.position-sticky`**
  
[More info on the css property](https://www.w3schools.com/css/css_positioning.asp)

# Float

*   **`.float-left`**
*   **`.float-right`**
*   **`.float-none`**
*   **`.float-inherit`**

[More info on the css property](https://www.w3schools.com/css/css_float.asp)

# Clear

*   **`.clear-left`**
*   **`.clear-right`**
*   **`.clear-both`**
*   **`.clear-none`**
*   **`.clear-inherit`**

[More info on the css property](https://www.w3schools.com/css/css_float.asp)

# Justify Content

*   **`.justify-content-start`**
*   **`.justify-content-end`**
*   **`.justify-content-flex-start`**
*   **`.justify-content-flex-end`**
*   **`.justify-content-left`**
*   **`.justify-content-right`**
*   **`.justify-content-center`**
*   **`.justify-content-stretch`**
*   **`.justify-content-normal`**
*   **`.justify-content-space-between`**
*   **`.justify-content-space-around`**
*   **`.justify-content-space-evenly`**
*   **`.justify-content-inherit`**

[More info on the css property](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)

# Justify Items

*   **`.justify-items-start`**
*   **`.justify-items-end`**
*   **`.justify-items-flex-start`**
*   **`.justify-items-flex-end`**
*   **`.justify-items-self-start`**
*   **`.justify-items-self-end`**
*   **`.justify-items-left`**
*   **`.justify-items-right`**
*   **`.justify-items-center`**
*   **`.justify-items-baseline`**
*   **`.justify-items-stretch`**
*   **`.justify-items-normal`**
*   **`.justify-items-inherit`**
*   
[More info on the css property](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items)

# Justify Self

*   **`.justify-self-start`**
*   **`.justify-self-end`**
*   **`.justify-self-flex-start`**
*   **`.justify-self-flex-end`**
*   **`.justify-self-self-start`**
*   **`.justify-self-self-end`**
*   **`.justify-self-left`**
*   **`.justify-self-right`**
*   **`.justify-self-center`**
*   **`.justify-self-baseline`**
*   **`.justify-self-stretch`**
*   **`.justify-self-normal`**
*   **`.justify-self-inherit`**
*   
[More info on the css property](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self)

# Align Content

*   **`.align-content-start`**
*   **`.align-content-end`**
*   **`.align-content-flex-start`**
*   **`.align-content-flex-end`**
*   **`.align-content-center`**
*   **`.align-content-stretch`**
*   **`.align-content-normal`**
*   **`.align-content-space-between`**
*   **`.align-content-space-around`**
*   **`.align-content-space-evenly`**
*   **`.align-content-inherit`**

[More info on the css property](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content)

# Align Items

*   **`.align-items-start`**
*   **`.align-items-end`**
*   **`.align-items-flex-start`**
*   **`.align-items-flex-end`**
*   **`.align-items-self-start`**
*   **`.align-items-self-end`**
*   **`.align-items-center`**
*   **`.align-items-baseline`**
*   **`.align-items-stretch`**
*   **`.align-items-normal`**
*   **`.align-items-inherit`**
*   
[More info on the css property](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)

# Align Self

*   **`.align-self-start`**
*   **`.align-self-end`**
*   **`.align-self-flex-start`**
*   **`.align-self-flex-end`**
*   **`.align-self-self-start`**
*   **`.align-self-self-end`**
*   **`.align-self-center`**
*   **`.align-self-baseline`**
*   **`.align-self-stretch`**
*   **`.align-self-normal`**
*   **`.align-self-inherit`**
*   
[More info on the css property](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self)

# Inline Flex

 Apply inine flex or based on [breakpoint](../scaffolding/breakpoint.md)

*   **`.inline-flex`**
*   **`.inline-flex-xs`**
*   **`.inline-flex-sm`**
*   **`.inline-flex-md`**
*   **`.inline-flex-lg`**
*   
# Flex 

[More info on flexin](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

Not to be confused with  [Flex Grid](../layout/flexgrid.md) setup. However, you can still use the classes with the flex grid.

## Breakpoint based

Apply flex or based on [breakpoint](../scaffolding/breakpoint.md).

For simpler flex setups

*   **`.flex`**
*   **`.flex-xs`**
*   **`.flex-sm`**
*   **`.flex-md`**
*   **`.flex-lg`**

## Flex Direction

*   **`.flex-direction-row`**
*   **`.flex-direction-row-reverse`**
*   **`.flex-direction-column`**
*   **`.flex-direction-column-reverse`**
*   **`.flex-direction-inherit`**

## Flex Wrap

*   **`.flex-wrap`**
*   **`.flex-nowrap`**
*   **`.flex-wrap-reverse`**
*   **`.flex-wrap-inherit`**

## Grow and Shrink

The framework has classes for basic grow and shrink values, 0 and 1 or **`.flex-[GROW]-[SHRINK]`**

 Example:

```html
<div class="flex-1-0"></div>
<div class="flex-0-1"></div>
<div class="flex-1-1"></div>
<div class="flex-0-0"></div>
```

# Hide and only classes

These are classes for breakpoint tags and mobile,nonmobile split.
see [breakpoints](../scaffolding/breakpoint.md) for reference god i hate words

## Hide

Hide on breakpoint or device

*   **`.hide-xs`**
*   **`.hide-sm`**
*   **`.hide-md`**
*   **`.hide-lg`**
*   **`.hide-mobile`**
*   **`.hide-nonmobile`**



Hide on certain ineractions of parent

*   **`.hide-hover`** (hide when on hover)
*   **`.hide-not-hover`** (hide when not on hover)
*   **`.hide-focus`** (hide when on focus)
*   **`.hide-not-focus`** (hide when not on focus)
*   **`.hide-active`** (hide when on active)
*   **`.hide-not-active`** (hide when not on active)
*   **`.hide-toggle`** (hide when classed as `open` or `active`)
*   **`.hide-not-toggle`** (hide when not classed as `open` or `active`)

## Only

Show only on breakpoint or device

*   **`.only-xs`**
*   **`.only-sm`**
*   **`.only-md`**
*   **`.only-lg`**
*   **`.only-mobile`**
*   **`.only-nonmobile`**

Show on certain ineractions of parent

*   **`.only-hover`** (only when on hover)
*   **`.only-not-hover`** (only when not on hover)
*   **`.only-focus`** (only when on focus)
*   **`.only-not-focus`** (only when not on focus)
*   **`.only-active`** (only when on active)
*   **`.only-not-active`** (only when not on active)
*   **`.only-toggle`** (only when classed as `open` or `active`)
*   **`.only-not-toggle`** (only when not classed as `open` or `active`)

By default, the this works based on the pointer interactions on parent element. If styles based on a different ancestor is desired, Add `.pointer-reference` to that ancestor

# Screen reader only

**`.sr-only`**

Yea boi


# Clearfix

**`.cf`**


# Round corners

*   **`.radius`** - all corners
*   **`.round-ellipse`** - all corners but all the way to create an ellipse (for a circle combine with `.ratio-1-by-1`)
*   **`.radius-top`**
*   **`.radius-bottom`**
*   **`.radius-left`**
*   **`.radius-right`**
*   **`.radius-top-left`**
*   **`.radius-bottom-left`**
*   **`.radius-top-right`**
*   **`.radius-bottom-right`**

### Smaller radius

*   **`.radius-small`** - all corners
*   **`.radius-top-small`**
*   **`.radius-bottom-small`**
*   **`.radius-left-small`**
*   **`.radius-right-small`**
*   **`.radius-top-left-small`**
*   **`.radius-bottom-left-small`**
*   **`.radius-top-right-small`**
*   **`.radius-bottom-right-small`**



### Larger radius

*   **`.radius-large`** - all corners
*   **`.radius-top-large`**
*   **`.radius-bottom-large`**
*   **`.radius-left-large`**
*   **`.radius-right-large`**
*   **`.radius-top-left-large`**
*   **`.radius-bottom-left-large`**
*   **`.radius-top-right-large`**
*   **`.radius-bottom-right-large`**

### Resets



*   **`.no-radius`** - all corners
*   **`.no-radius-top`**
*   **`.no-radius-bottom`**
*   **`.no-radius-left`**
*   **`.no-radius-right`**
*   **`.no-radius-top-left`**
*   **`.no-radius-bottom-left`**
*   **`.no-radius-top-right`**
*   **`.no-radius-bottom-right`**


[Back to TOC](../../../readme.md)