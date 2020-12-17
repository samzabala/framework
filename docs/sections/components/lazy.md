# Lazyloading

The framework lazyloads any `<img>`,`<picture>`, or any element with class of `lazy` and the data-attribute of `data-src` or `data-srcset`

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

Lazyloading also supports replacement of img tag into the src's svg markup. As long as the image is an svg, it should work. I think.

```html
<img class="lazy" data-src="icoo.svg" alt="bitch boi" />
```

This way you can utilize [SVG Classes](#svg) to :')

### Disable Lazyloading
To disable lazyload, do this to ya script
```js
(function(fw){
	fw.settings.lazyLoad = false;
}(frameWork));
```



### Functions for Lazyloading or loading images

As longas yuh image tags vae either `data-src` or `data-srcset` this should be able to work. hopefullly.

`fw.loadImage(imgELEMENT)` - load just one boi
`fw.loadImages(multipleImages)` - load nultiple bois

## Classes
**`.fit-image`**

*	Simulate a background-size: cover on an element containing an <img>;

```html
<div class="fit-image">
	<img data-src="pichur.jpg" alt="bitch boi" />
</div>
```