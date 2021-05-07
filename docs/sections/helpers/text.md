

#### Color

**`.border-color-inherit`**
**`.border-color-transparent`**
**`.border-color-{COLOR}`**
**`.border-color-{COLOR}-{VARIATION-TAG}`**
**`.border-color-{COLOR}-{CONDITION}`**

For color syntax, view [color declarations](../scaffolding/colors.md#helpers)



# Text

## Leading

- **`.text-leading-compact`**

  Shrinks line-height to `$body-line-height` multiplied by `$body-line-height-compact-factor`. .75 or 18px by default

- **`.text-leading-expanded`**

  expands line-height to `$body-line-height` multiplied by `$body-line-height-expanded-factor`. 1.5 or 35px by default

- **`.text-leading-normalize`**

  Resets line-height to `$body-line-height`. 24px by default

- **`.text-leading-inherit`**

  line-height is set to inherit line-height.

- **`.text-leading-whole`**

  line-height is set to 1. which means no line-height. just the same height as the font.

[More info on the css property](https://www.w3schools.com/cssref/pr_dim_line-height.asp)

## Align

- **`.text-align-center`**
- **`.text-align-right`**
- **`.text-align-left`**
- **`.text-align-justify`**
- **`.text-align-inherit`**

[More info on the css property](https://www.w3schools.com/cssref/pr_text_text-align.asp)

## Transform

- **`.text-transform-uppercase`**
- **`.text-transform-lowercase`**
- **`.text-transform-capitalize`**
- **`.text-transform-inherit`**
- **`.text-transform-none`**

[More info on the css property](https://www.w3schools.com/cssref/pr_text_text-transform.asp)

## Vertical align

- **`.text-vertical-align-middle`**
- **`.text-vertical-align-baseline`**
- **`.text-vertical-align-top`**
- **`.text-vertical-align-bottom`**
- **`.text-vertical-align-text-top`**
- **`.text-vertical-align-text-bottom`**
- **`.text-vertical-align-sub`**
- **`.text-vertical-align-super`**
- **`.text-vertical-align-inherit`**

[More info on the css property](https://www.w3schools.com/cssref/pr_pos_vertical-align.asp)

## Wrap

- **`.text-hyphens-auto`**

    autuomatically hyphenate

- **`.text-hyphens-manual`**

    manually hyphenate

- **`.text-hyphens-none`**

    nope

## Wrap

- **`.text-wrap`**

  Wrap text

- **`.text-wrap-nowrap`**

  Don't wrap the text AT ALL

- **`.text-wrap-break`**

  Wrap text but allow superduperfuckingshitshitbitchinlongfu

  king words to break

- **`.text-wrap-ellipsis`**

  Single line of text that cuts off any overflow with a an ellipsis

  [More info](https://css-tricks.com/snippets/css/truncate-string-with-ellipsis/)

- **`.text-wrap-ellipsis-multiple`**

  Allows multiple lines based on given `$body-ellipsis-multiple-factor`. 2 by default

## Clip Background

- **`.text-clip-background`**

  Create knockout text effect. useful with [.bacgkround-gradient](#gradient) classes

  [More info](https://css-tricks.com/how-to-do-knockout-text/)

# Scaffolding Margins

- **`.p`**

  Adds margins to element as if it were a `<p>` tag