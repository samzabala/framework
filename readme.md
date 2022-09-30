# Framework Documentation

A framework for your appy dashboardy needs :')

Works with Dart Sass

Dependencies:

- @babel/cli ^7.12.1"
- @babel/core ^7.13.10"
- @babel/plugin-proposal-class-properties ^7.13.0
- @babel/plugin-proposal-private-methods ^7.13.0
- @babel/preset-env ^7.13.10
- dart-sass ^1.25.0
- sass ^1.33.0

## Setup

- [Quick Start](docs/sections/setup/quickstart.md)
- [Customize](docs/sections/setup/customize.md)

## Scaffolding

- [Typography](docs/sections/scaffolding/typography.md)
- [Images & SVGs](docs/sections/scaffolding/images.md)
- [Tables](docs/sections/scaffolding/table.md)
- [Breakpoints](docs/sections/scaffolding/breakpoint.md)
- [Colors](docs/sections/scaffolding/colors.md)

## Layout

- [Flex Grid](docs/sections/layout/flexgrid.md)
- [Container](docs/sections/layout/container.md)

## Helpers (o lawd)

- [Align](docs/sections/helpers/align.md)
- [Background](docs/sections/helpers/background.md)
- [Border](docs/sections/helpers/border.md)
- [Disable](docs/sections/helpers/disable.md)
- [Display](docs/sections/helpers/display.md)
- [Flex](docs/sections/helpers/flex.md)
- [Float](docs/sections/helpers/float.md)
- [Font](docs/sections/helpers/font.md)
- [Image](docs/sections/helpers/image.md)
- [Justify](docs/sections/helpers/justify.md)
- [Margin](docs/sections/helpers/margin.md)
- [Overflow](docs/sections/helpers/overflow.md)
- [Padding](docs/sections/helpers/padding.md)
- [Position](docs/sections/helpers/position.md)
- [Radius](docs/sections/helpers/radius.md)
- [Shadow](docs/sections/helpers/shadow.md)
- [Svg](docs/sections/helpers/svg.md)
- [Text](docs/sections/helpers/text.md)
- [Visibility](docs/sections/helpers/visibility.md)

## Components (OO LAAAWD)

- [Accordions](docs/sections/components/accordion.md)
- [Alerts](docs/sections/components/alert.md)
- [Assets](docs/sections/components/asset.md)
- [Badges](docs/sections/components/badge.md)
- [Buttons](docs/sections/components/button.md)
- [Dropdown](docs/sections/components/dropdown.md)
- [Form and input fields](docs/sections/components/form.md)
- [Highlights](docs/sections/components/highlight.md)
- [Lazy Loading (Images and SVG)](docs/sections/components/lazy.md)
- [Legends](docs/sections/components/legend.md)
- [List group](docs/sections/components/list-group.md)
- [Modal](docs/sections/components/modal.md)
- [Module](docs/sections/components/module.md)
- [Nav](docs/sections/components/nav.md)
- [Progress](docs/sections/components/progress.md)
- [Ratio](docs/sections/components/ratio.md)
- [Scroller](docs/sections/components/scroller.md)
- [Switches](docs/sections/components/switch.md)
- [Symbols](docs/sections/components/symbol.md)
- [Tabs](docs/sections/components/tabs.md)
- [Tags](docs/sections/components/tag.md)
- [Tooltip](docs/sections/components/tooltip.md)
- [Toolbar](docs/sections/components/toolbar.md)
- [Thumbnails](docs/sections/components/thumbnail.md)
- [Well](docs/sections/components/well.md)
- [Zone](docs/sections/components/zone.md)

## Other Obscure things

- [Script](docs/sections/other/script.md)

### Supports:

- Edge 16+
- Firefox 31+
- Chrome 49+
- Safari 9.1+
- iOS Safari 36+

### Not supporting

- IE... like at all.

### Available features

- Modules
  Create nice css grid layouts for app modules
- Inverse theme support
  Ability to toggle to a darker theme through adding a class of `theme-inverse` to the bod so its easy on the eyes
- Supports up to 35+ colors
  Yes. performance has left the group chat. calm your titties this framework is for dashboard shits
- Flex-based grid builds
  It could be a sweet dream or a beautiful nightmare
- Tooltips, Modals, Accordions,
- Not optimized
  Gotta make ya shit pretty bro this is not meant to look sexy to google. I mean this bitch is 6x larger than bootstrap tho for real

# To Do

- convert shitty sass vars into native css vars + cleanup ya boi so compilation doesnt take 84 years

- find and replace for fw3

will be ready
*-no-gutter => *-constricted
flex-child => flex-grid-child
text-leading-whole => text-leading-constricted
zone-small => zone-compact
zone-large => zone-expanded
zone-large => zone-expanded


other clases na hindi ba handa sa kajugaguhan na to
if it doesnt need constricted in it do not convert small to compact and large to expanded
do micro tho

- cleanup modal styles because wtf did i do

- escape on keydown closes modals too

- variablize the kwan
- ano
- scrollbar shits

- tooltip on mobile mousedown? eh


- input calendar borked too wtf