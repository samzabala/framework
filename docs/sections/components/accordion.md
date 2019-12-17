# Accordion

You know what that bitch is.

```html
<a href="#bitch-ass-accordion" data-toggle="accordion">Open a bitch</a>
<div id="bitch-ass-accordion" class="accordion">
	Sup mofos, I'm an accordion content
</div>
```

## Toggler

### **`[data-toggle=accordion]`**

Elements with this attribute looks for an accordion to toggle

This one looks for the `href` of the boi
```html
<a href="#bitch-ass-accordion" data-toggle="accordion">Open a bitch</a>
<div id="bitch-ass-accordion" class="accordion">
	Sup mofos, I'm an accordion content
</div>
```

Another way but [data-toggle="accordion"] looks for a `data-href` to go to because there's no `href`

```html
<span data-href="#bitch-ass-accordion" data-toggle="accordion">Open a bitch</span>
<div id="bitch-ass-accordion" class="accordion">
	Sup mofos, I'm an accordion content
</div>
```

Another way but [data-toggle="accordion"] looks for a sibling because there's no `href` or `data-href`

```html
<div class="container">
	<span data-toggle="accordion">Open a bitch</span>
	<div class="accordion">
		Sup mofos, I'm an accordion content
	</div>
</div>
```

## Accordion itself

### **`.accordion`**

The shit that opens and closes and it contains your boi

```html
<a href="#bitch-ass-accordion" data-toggle="accordion">Open a bitch</a>
<div id="bitch-ass-accordion" class="accordion">
	Sup mofos, I'm an accordion content
</div>
```

#### **`.accordion-mobile`**

The shit is a class to add along with `.accordion`.
It opens and closes but only on the set [mobile maximum](../scaffolding/breakpoint.md#mobile-split) breakpoint.

```html
<a href="#bitch-ass-accordion" data-toggle="accordion" class="only-mobile">Mobile accordio</a>
<div id="bitch-ass-accordion" class="accordion accordion-mobile">
	Sup mofos, I'm an accordion content
</div>
```

## Accordion container

### **`.accordion-group`**

Accordion instances can be contained in this class to group them only only allow one accordion to display at a time

```html
<div class="accordion-group">

	<a href="#bitch-ass-accordion" data-toggle="accordion">Open a bitch</a>
	<div id="bitch-ass-accordion" class="accordion">
		Sup mofos, I'm an accordion content
	</div>


	<a href="#other-bitch-ass-accordion" data-toggle="accordion">Open the other bitch</a>
	<div id="other-bitch-ass-accordion" class="accordion">
		Sup mofos, I'm an the other accordion content
	</div>


	<a href="#another-bitch-ass-accordion" data-toggle="accordion">Open another bitch</a>
	<div id="another-bitch-ass-accordion" class="accordion">
		Sup mofos, I'm an accordion content
	</div>
</div>
```

#### **`.accordion-group-multiple`**

a class to add with `.accordion-group` if you want to allow multiple accordions at a time, or you know just put accordions separate from one another and risk jankiness whatever clears your floats

```html
<div class="accordion-group accordion-group-multiple">

	<a href="#bitch-ass-accordion" data-toggle="accordion">Open a bitch</a>
	<div id="bitch-ass-accordion" class="accordion">
		Sup mofos, I'm an accordion content
	</div>


	<a href="#other-bitch-ass-accordion" data-toggle="accordion">Open the other bitch</a>
	<div id="other-bitch-ass-accordion" class="accordion">
		Sup mofos, I'm an the other accordion content
	</div>


	<a href="#another-bitch-ass-accordion" data-toggle="accordion">Open another bitch</a>
	<div id="another-bitch-ass-accordion" class="accordion">
		Sup mofos, I'm an accordion content
	</div>
</div>
```

## Styling accordion setup

Note that all descentants of `[data-toggle="accordion"]` has pointer-events none to allow the toggle to do its thing without being bugged out by its content

`.accordion` on the other hand is being styled with just a `display:none;` or `display:block;` depending on its status.

Also the width is full width.. of parent... like always.. BECAUSE

As long as you avoid these properties on each element ya good.

[Symbols toggle classes](../components/symbol.md#toggle-classes) change based on the status of the accordion as well as long as they are a direct children of either `[data-toggle="accordion"]` or `.accordion`

```html
<div class="accordion-group">

	<h1 data-href="#bitch-ass-accordion" data-toggle="accordion">
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

	<h1 data-href="#bitch-ass-accordion" class="color-primary-toggle" data-toggle="accordion">
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
(function(fw){
	frameWork.settings.initializeAccordion = false;
}(frameWork));
```
NOTE: this is useless if `frameWork.settings.dynamicHash` is set to `false`

[Back to TOC](../../../readme.md)