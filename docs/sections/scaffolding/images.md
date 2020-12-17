# Images and SVGs

It do things on images too

## Lazyloading

[Here](../components/lazy.md)

### SVG
####	**`.svg-gradient-start`** and **`.svg-gradient-end`** 

Classes to add on `<stop>` tags in a gradient element

```xml
<linearGradient id="theme-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="194.3924" y2="29">
	<stop offset="0" class="svg-gradient-start"></stop>
	<stop offset="1" class="svg-gradient-end"></stop>
</linearGradient>
```


#### Fill and stroke

These helper classes follow the same setup as [background and color helpers](../scaffolding/helpers.md#background-and-colors)

##### Basic

###### Absolute values

*   **`.['fill' or 'stroke']-primary`**
*   **`.['fill' or 'stroke']-secondary`**
*   **`.['fill' or 'stroke']-accent`**
*   **`.['fill' or 'stroke']-neutral`**
*   **`.['fill' or 'stroke']-success`**
*   **`.['fill' or 'stroke']-caution`**
*   **`.['fill' or 'stroke']-error`**
*   **`.['fill' or 'stroke']-intensity-1`**
*   **`.['fill' or 'stroke']-intensity-2`**
*   **`.['fill' or 'stroke']-intensity-3`**
*   **`.['fill' or 'stroke']-intensity-4`**
*   **`.['fill' or 'stroke']-intensity-5`**
*   **`.['fill' or 'stroke']-currentColor`**
*   **`.['fill' or 'stroke']-none`**


```xml
<svg>
	<circle cx="20" cy="50" r="50" class="fill-primary stroke-neutral">
</svg>
```

###### Theme Based

These classes will set the proper color based off of html tag having the `.theme-inverse` class

| Class							 | Set color | Set color when `.theme-inverse is active`				|
| --							| --		| --														|
| **`.['fill' or 'stroke']-theme`**			| `$brand-theme-color` 				| `$brand-theme-color-inverse`				|
| **`.['fill' or 'stroke']-theme-contrast`** 	| `$brand-theme-color-contrast`		| `$brand-theme-color-contrast-inverse`		|
| **`.['fill' or 'stroke']-polar`** 			| `$brand-theme-background`			| `$brand-theme-background-inverse`			|
| **`.['fill' or 'stroke']-polar-contrast`** 	| `$brand-theme-background-contrast` 	| `$brand-theme-background-contrast-inverse` 	|


###### Pseudo/Toggle Based

| Appendage | Condition when the color is applied |
| -- | -- |
| **.['fill' or 'stroke']-[color]-hover** | &:hover |
| **.['fill' or 'stroke']-[color]-focus** | &:focus,&.focus |
| **.['fill' or 'stroke']-[color]-active** | &:active |
| **.['fill' or 'stroke']-[color]-toggle** | &.open,&.active |



[Back to TOC](../../../readme.md)