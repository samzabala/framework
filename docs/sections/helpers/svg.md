
# SVG

## **`.svg-gradient-start`** and **`.svg-gradient-end`**

Classes to add on `<stop>` tags in a gradient element. whatever u set on `$gradient-start` and `$gradient-end`

```xml
<linearGradient id="theme-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="194.3924" y2="29">
	<stop offset="0" class="svg-gradient-start"></stop>
	<stop offset="1" class="svg-gradient-end"></stop>
</linearGradient>
```

## Fill and stroke

These helper classes follow the same setup as [color declaration helpers](../scaffolding/colors.md#helpers)

- **`.['fill' or 'stroke']-currentColor`**
- **`.['fill' or 'stroke']-none`**
- **`.['fill' or 'stroke']-{COLOR}`**
- **`.['fill' or 'stroke']-{COLOR}-{VARIATION-TAG}`**
- **`.['fill' or 'stroke']-{COLOR}-{CONDITION}`**
- **`.['fill' or 'stroke']-{COLOR}-{VARIATION-TAG}-{CONDITION}`**

```xml
<svg>
	<circle cx="20" cy="50" r="50" class="fill-primary stroke-neutral">
</svg>
```
For color syntax, view [color declarations](../scaffolding/colors.md#helpers)

[Back to TOC](../../../readme.md)