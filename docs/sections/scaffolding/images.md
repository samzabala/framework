# Images and SVGs

It do things on images too

## Lazyloading

The framework lazyloads any `<img>`,`<picture>`, or any element with the data-attribute of `data-src` or `data-srcset`

```html
<!-- Loads as a background image for ya div boi -->
<div data-src="pichur.jpg" alt="bitch boi"></div>

<!-- Loads img src -->
<img data-src="pichur.jpg" alt="bitch boi" />

<!-- Loads srcset too  -->
<img data-src="pichur.jpg" alt="bitch boi" data-srcset="pichur-320w.jpg 320w" />


<!-- Lazyload steroids boi -->
<picture>
  <source media="(min-width: 650px)" data-srcset="pichur-650px.jpg">
  <source media="(min-width: 465px)" data-srcset="pichur-465px.jpg">
  <img data-src="pichur.jpg" alt="bitch boi" style="width:auto;">
</picture>
```

Lazyloading also supports replacement of img tag into the src's svg markup. As long as the image is an svg, it should work. I think. Add a class of `.svg` to the lazy-loaded image

```html
<img class="svg" data-src="icoo.svg" alt="bitch boi" />
```

This way you can utilize [SVG Classes](#svg) tto :')

### Disable Lazyloading
To disable lazyload, do this to ya script
```js
(function(fw){
	frameWork.lazyLoad = false;
}(frameWork));
```

## Classes
**`.fit-image`**

*	Simulate a background-size: cover on an element containing an <img>;

```html
<div class="fit-image">
	<img data-src="pichur.jpg" alt="bitch boi" />
</div>
```

### SVG
####	**`.svg-gradient-start`** and **`.svg-gradient-end`** 

Classes to add on `<stop>` tags in a gradient element

```html
<linearGradient id="theme-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="194.3924" y2="29">
	<stop offset="0" class="svg-gradient-start"></stop>
	<stop offset="1" class="svg-gradient-end"></stop>
</linearGradient>
```


#### Fill and stroke

##### Basic

###### Absolute values
*   **`.['fill' or 'stroke']-base` (Not to be confused with theme-color)**
*   **`.['fill' or 'stroke']-primary`**
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
| **`.['fill' or 'stroke']-theme`**			| `$theme-color` 				| `$theme-color-inverse`				|
| **`.['fill' or 'stroke']-theme-contrast`** 	| `$theme-color-contrast`		| `$theme-color-contrast-inverse`		|
| **`.['fill' or 'stroke']-polar`** 			| `$theme-background`			| `$theme-background-inverse`			|
| **`.['fill' or 'stroke']-polar-contrast`** 	| `$theme-background-contrast` 	| `$theme-background-contrast-inverse` 	|


###### Pseudo/Toggle Based

| Appendage | Condition when the color is applied |
| -- | -- |
| **.['fill' or 'stroke']-[color]-hover** | &:hover |
| **.['fill' or 'stroke']-[color]-focus** | &:focus,&.focus |
| **.['fill' or 'stroke']-[color]-active** | &:active |
| **.['fill' or 'stroke']-[color]-toggle** | &.open,&.active |




[Back to TOC](../../../readme.md)