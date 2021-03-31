# Accordion

You know what that bitch is.

```html
<a href="#bitch-ass-accordion" data-toggle-accordion>Open a bitch</a>
<div id="bitch-ass-accordion" class="accordion">
  Sup mofos, I'm an accordion content
</div>
```

## Toggler

### **`[data-toggle-accordion]`**

Elements with this attribute looks for an accordion to toggle

This one looks for the `href` of the boi

```html
<a href="#bitch-ass-accordion" data-toggle-accordion>Open a bitch</a>
<div id="bitch-ass-accordion" class="accordion">
  Sup mofos, I'm an accordion content
</div>
```

Another way but [data-toggle-accordion] looks for a `data-href` to go to because there's no `href`

```html
<span data-href="#bitch-ass-accordion" data-toggle-accordion>Open a bitch</span>
<div id="bitch-ass-accordion" class="accordion">
  Sup mofos, I'm an accordion content
</div>
```

Another way but [data-toggle-accordion] looks for a sibling because there's no `href` or `data-href`

```html
<div class="container">
  <span data-toggle-accordion>Open a bitch</span>
  <div class="accordion">Sup mofos, I'm an accordion content</div>
</div>
```

### Change hash

If you dont wish for the accordion to change the hashand shit addd an attribute of `data-accordion-change-hash="false"` to either the toffler or accordion and it should not do the thing. hopefully

## Accordion itself

### **`.accordion`**

The shit that opens and closes and it contains your boi

```html
<a href="#bitch-ass-accordion" data-toggle-accordion>Open a bitch</a>
<div id="bitch-ass-accordion" class="accordion">
  Sup mofos, I'm an accordion content
</div>
```

#### **`.accordion-mobile`**

The shit is a class to add along with `.accordion`.
It opens and closes but only on the set [mobile maximum](../scaffolding/breakpoint.md#mobile-split) breakpoint.

```html
<a href="#bitch-ass-accordion" data-toggle-accordion class="only-mobile"
  >Mobile accordio</a
>
<div id="bitch-ass-accordion" class="accordion accordion-mobile">
  Sup mofos, I'm an accordion content
</div>
```

## Accordion container

### **`.accordion-group`**

Accordion instances can be contained in this class to group them only only allow one accordion to display at a time

```html
<div class="accordion-group">
  <a href="#bitch-ass-accordion" data-toggle-accordion>Open a bitch</a>
  <div id="bitch-ass-accordion" class="accordion">
    Sup mofos, I'm an accordion content
  </div>

  <a href="#other-bitch-ass-accordion" data-toggle-accordion>Open the other bitch</a>
  <div id="other-bitch-ass-accordion" class="accordion">
    Sup mofos, I'm an the other accordion content
  </div>

  <a href="#another-bitch-ass-accordion" data-toggle-accordion>Open another bitch</a>
  <div id="another-bitch-ass-accordion" class="accordion">
    Sup mofos, I'm an accordion content
  </div>
</div>
```

#### **`.accordion-group-multiple`**

a class to add with `.accordion-group` if you want to allow multiple accordions at a time, or you know just put accordions separate from one another and risk jankiness whatever clears your floats

```html
<div class="accordion-group accordion-group-multiple">
  <a href="#bitch-ass-accordion" data-toggle-accordion>Open a bitch</a>
  <div id="bitch-ass-accordion" class="accordion">
    Sup mofos, I'm an accordion content
  </div>

  <a href="#other-bitch-ass-accordion" data-toggle-accordion>Open the other bitch</a>
  <div id="other-bitch-ass-accordion" class="accordion">
    Sup mofos, I'm an the other accordion content
  </div>

  <a href="#another-bitch-ass-accordion" data-toggle-accordion>Open another bitch</a>
  <div id="another-bitch-ass-accordion" class="accordion">
    Sup mofos, I'm an accordion content
  </div>
</div>
```

#### **`.accordion-group-no-close`**

a class to add with `.accordion-group` if you want to have at least one open accordion.

Note: It's recommended that one of the accordions must have an open class on initial load at least for this to be seamless. if not, that's fine too

```html
<div class="accordion-group accordion-group-no-close">
  <a href="#bitch-ass-accordion" data-toggle-accordion>Open a bitch</a>
  <div id="bitch-ass-accordion" class="accordion open">
    Sup mofos, I'm an accordion content
  </div>

  <a href="#other-bitch-ass-accordion" data-toggle-accordion>Open the other bitch</a>
  <div id="other-bitch-ass-accordion" class="accordion">
    Sup mofos, I'm an the other accordion content
  </div>

  <a href="#another-bitch-ass-accordion" data-toggle-accordion>Open another bitch</a>
  <div id="another-bitch-ass-accordion" class="accordion">
    Sup mofos, I'm an accordion content
  </div>
</div>
```

## Styling accordion setup

Note that all descentants of `[data-toggle-accordion]` has pointer-events none to allow the toggle to do its thing without being bugged out by its content

`.accordion` on the other hand is being styled with just a `display:none;` or `display:block;` depending on its status.

Also the width is full width.. of parent... like always.. because flex be a bitch sometimes

As long as you avoid these properties on each element ya good.

[Symbols toggle classes](../components/symbol.md#toggle-classes) change based on the status of the accordion as well as long as they are a direct children of either `[data-toggle-accordion]` or `.accordion`

```html
<div class="accordion-group">
  <h1 data-href="#bitch-ass-accordion" data-toggle-accordion>
    <i class="symbol symbol-arrow-down symbol-arrow-up-toggle"></i> Open a bitch
  </h1>
  <div id="bitch-ass-accordion" class="accordion">
    Sup mofos, I'm an accordion content
  </div>
</div>
```

`.symbol-arrow-down` will reverse direction to up when ya boi is open

Color based [Helper classes](../scaffolding/helpers.md#background-and-colors) as well by adding `.[color-helper or background-helper]-toggle`

```html
<div class="accordion-group accordion-group-multiple">
  <h1
    data-href="#bitch-ass-accordion"
    class="color-primary-toggle"
    data-toggle-accordion
  >
    Open a bitch
  </h1>
  <div id="bitch-ass-accordion" class="accordion">
    Sup mofos, I'm an accordion content
  </div>
</div>
```

This makes the `<h1>`'s color to the set primary one when the accordion is open

## Javascript

If a url's hash location matches an element with that id and it has an `accordion` class, the accordion will automatically open and scroll there

to disable this write ya script

```js
(function (fw) {
  fw.Settings.modify('initializeAccordion', false);
})(fw);
```

NOTE: this is useless if `fw.settings.get('dynamicHash')` is set to `false`

### Functions

#### **`fw.Accordion(element,triggerer,args)`**

Make a new boi by going `const accordion = new fw.Accordion(element,triggerer,args)`

`element` is the accordion itself. if blank, defaults to the window.location.hash matching block that has the accordion class

`triggerer` is the element that triggers the accordion. if left blank, it doesnt mess with any data-toggle-accordions

`args` is the opts available

```js
//defaults
{
	changeHash: 'true', //make the addressbar do the location change
}
```

#### **`accordion.toggle(element,triggerer)`**

toggles the accordion

`element` is the element triggered. if left blank, this defaults to the element attached to the instance

`triggerer` is the element interacted with to manipulate the element. if left blank, it should not destroy anything. if it does pls let sam know

#### **`accordion.open(element,triggerer)`**

duh

`element` is the element triggered. if left blank, this defaults to the element attached to the instance

`triggerer` is the element interacted with to manipulate the element. if left blank, it should not destroy anything. if it does pls let sam know

#### **`accordion.close(element,triggerer)`**

duh

`element` is the element triggered. if left blank, this defaults to the element attached to the instance

`triggerer` is the element interacted with to manipulate the element. if left blank, it should not destroy anything. if it does pls let sam know

#### **`fw.Accordion.configDefaults`**

returns obj with component arg defaults

#### **`fw.Accordion.initListeners()`**

initializes all event listeners

#### **`accordion.args`**

returns obj with component set args

### Events

- `click_fw_accordion` - happens on `triggerer`
- `hashchange_fw_accordion` - happens on `window` on hashchange
- `before_close_fw_accordion` - happens on `element` before closing
- `close_fw_accordion` - happens on `element` when closing
- `after_close_fw_accordion` - happens on `element` after closing
- `before_open_fw_accordion` - happens on `element` before opening
- `open_fw_accordion` - happens on `element` when opening
- `after_open_fw_accordion` - happens on `element` after opening

[Back to TOC](../../../readme.md)
