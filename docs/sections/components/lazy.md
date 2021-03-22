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
  <source media="(min-width: 650px)" data-srcset="pichur-650px.jpg" />
  <source media="(min-width: 465px)" data-srcset="pichur-465px.jpg" />
  <img data-src="pichur.jpg" alt="bitch boi" style="width:auto;" />
</picture>
```

Lazyloading also supports replacement of img tag into the src's svg markup. As long as the image is an svg, it should work. I think.

```html
<img class="lazy" data-src="icoo.svg" alt="bitch boi" />
```

This way you can utilize [SVG Classes](#svg) to :')

## Classes

**`.fit-image`**

- Simulate a background-size: cover on an element containing an <img>;

```html
<div class="fit-image">
  <img data-src="pichur.jpg" alt="bitch boi" />
</div>
```

## Javascript

### Disable Lazyloading

To disable lazyload, do this to ya script

```js
(function (fw) {
  fw.Settings.modify('lazyLoad', false);
})(fw);
```

### Functions

#### **`fw.Lazy(element)`**

Make a new boi by going `const lazy = new fw.Lazy(element)`

`element` is the element itself. if blank, defaults to the window.location.hash matching block that has the element class

#### **`lazy.load(element)`**

duh

`element` is the element triggered. if left blank, this defaults to the element attached to the instance

#### **`lazy.loadSVG(element)`**

replaces element with src svg if qualified to do so

`element` is the element triggered. if left blank, this defaults to the element attached to the instance

#### **`lazy.readyLoaded(element)`**

adds class to element to sofnigy that yis it loaded the asset

#### **`fw.Lazy(.loadAll()`**

loads all images

### Events

- `before_init.fw.lazy` - happens on `document` before running functions to set up
- `init.fw.lazy` - happens on `document` when running functions to set up
- `after_init.fw.lazy` - happens on `document` after running functions to set up
- `before_svgconversion.fw.lazy` - happens on `element` before loadSVG runs
- `svgconversion.fw.lazy` - happens on `element` when loadSVG runs
- `after_svgconversion.fw.lazy` - happens on `element` after loadSVG runs
- `before_load.fw.lazy` - happens on `element` before load runs
- `load.fw.lazy` - happens on `element` when load runs
- `after_load.fw.lazy` - happens on `element` after load runs
