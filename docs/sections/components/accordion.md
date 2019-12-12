# Accordion

You know what that bitch is

```html
<a href="#bitch-ass-accordion" data-toggle="accordion">Open a bitch</a>
<div id="bitch-ass-accordion" class="accordion">
	Sup mofos, I'm an accordion content
</div>
```

## Toggler

### **`[data-toggle=accordion]`**

Elements with this attribute looks for an accordion to toggle

This one looks for the ID of the boi
```html
<a href="#bitch-ass-accordion" data-toggle="accordion">Open a bitch</a>
<div id="bitch-ass-accordion" class="accordion">
	Sup mofos, I'm an accordion content
</div>
```

Another way but [data-toggle="accordion"] looks for a data-href to go to because there's no href

```html
<span data-href="#bitch-ass-accordion" data-toggle="accordion">Open a bitch</span>
<div id="bitch-ass-accordion" class="accordion">
	Sup mofos, I'm an accordion content
</div>
```

Another way but [data-toggle="accordion"] looks for a sibling because there's no href

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

The shit that opens and closes that contains your boi

### **`.accordion-mobile`**




[Back to TOC](../../../readme.md)