# Breakpoints

Breakpoints are where media queries separate. Declared values or maximums

**`xs`**

- framework var: `$br-xs`
- Larger Mobile Devices (767px by default)

**`sm`**

- framework var: `$br-sm`
- Tablet (1279px by default)

**`md`**

- framework var: `$br-md`
- Laptop (1799px by default)

## Special breakpoints

**`lg`**

- Mobile (+1 of md breakpoint value)
- For desktop elements. Since it's the largest breakpoint, it does not have a max value, instead it's minimum is based on md breakpoints value

**`xxs`**

- framework var: `$br-xxs`
- True Mobile (0px - 400px by default)
- UI Design may have elements designed too large for many mobile devices. use this to fix or tweak them. This breakpoint is for adding custom css for the framework and is not natively by the core framework's styles although used at some places by js bois.

## Mobile split

**`$mobile-br-max`**

- Defaults to `sm`
- Can't be used by shithole functionalities, but declares which breakpoint tag the mobile and nonmobile devices split. The set tag will be the maximum of the framework mobile styles

## Mixins

### **`on-breakpoint($device)`**

defaults to `nonmobile`. valid value is either `nonmobile` or `mobile`. generates media queries for styles

#### Third Party Sass Functions (All from shithole)

NOTE:Since the shithole library is built mobile first, Declared framework sass variable values are set as the maximum value of these breakpoints, but using their tags with shithole functionalities will be interpretted as the corresponding min value of the breakpoint.

If you use shithole mixins or functions and want to use these max values append `-max` to the tags

```scss
@include breakpoint(sm-max) {
  //styles for tablet and below heeere
}
```

##### `breakpoint($tag)`

create media queries

###### Parameters

- @param $br: () !default | (list / string) | breakpoint duh. accepts string of condition or breakpoint tag
- @param $media: '' !default | (list / string) | the mediatype
- @param $use-only: false !default | (boolean) | add `only` to the query
- @param $operator: and !default | (string) | operator to use between list $br
- @content: styles for the breakpoint
- @return: declared @content wrapped in breakpoint

Examples:

```scss
@include breakpoint(lg) {
  //styles for desktop and above
}
```

```scss
@include breakpoint(md, md-max) {
  //styles for desktop and above
}
```

##### `br($tag)`

shorter way of including `breakpoint()`

##### `media($mediaquerystring)`

Advanced cousin of `breakpoint`. Accepts other values aside from the breakpoints but also translates instances of breakpoint tags with it

Example:

```scss
@include media('md and md-max, max-width: 420px') {
  //styles for whatever breakpoint that is
}
```

[Back to TOC](../../../readme.md)
