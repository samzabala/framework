# Modal

NOTE: only one instance of a modal (not counting trumbowyg modals) can be rendered a time because it makes managing the modal easier 

This is how to setup a basic modal


```html
<a
	data-toggle="modal" href="#modal-demo">Modal Toggle</a>
<div class="modal" id="modal-demo">
	<!-- Put ya content here -->
</div>
```


## Toggler


### **`[data-toggle=modal]`**


Elements with this attribute looks for a `.modal` to append its content to an actual poppo

This one looks for the `href` of the boi
```html
<a href="#bitch-ass-modal" data-toggle="modal">Open a bitch</a>
<div id="bitch-ass-modal" class="modal">
	Sup mofos, I'm an modal content
</div>
```

Another way but [data-toggle="modal"] looks for a `data-href` to go to because there's no `href`

```html
<span data-href="#bitch-ass-modal" data-toggle="modal">Open a bitch</span>
<div id="bitch-ass-modal" class="modal">
	Sup mofos, I'm an modal content
</div>
```

Another way but [data-toggle="modal"] looks for a sibling because there's no `href` or `data-href`

```html
<div class="container">
	<span data-toggle="modal">Open a bitch</span>
	<div class="modal">
		Sup mofos, I'm an modal content
	</div>
</div>
```

#### **`[data-toggle=modal-open]`** and **`[data-toggle=modal-close]`**

Unlike just `[data-toggle=modal]`, these attributes are more specific whether to close, or to open the modal

## Toggle Attributes

### **`data-modal-title`**

Dafaults to `''`

Title to add a modal

### **`data-modal-close`**

Dafaults to `true`

Adds a close button to the modal

### **`data-modal-disable-overlay`**

Dafaults to `true'`

Whether or not to allow clicking on the overlay to close the modal

### **`data-modal-max-width`**

Dafaults to nothing

Whether or not to add a max-width to the modal

```html
<a
data-toggle="modal"
data-modal-close="false"
data-modal-disable-overlay="false"
data-modal-max-width="800px"
data-modal-title="Look at this bitchboy going modal and shit"
data-href="#modal-demo">Modal boi with max width and no close butt <i class="symbol symbol-search"></i></a>

<div class="modal" id="modal-demo">
	<!-- content heeeere -->
</div>
```

![](../../images/modal.png)

# Advanced

## Modal markup

This is the markup our framework generates in case you need to make your own. 

```html
<!-- Wrapper and color overlay... adding .active shows the boi -->
<div class="modal-wrapper active" id="modal-demo">
	
	<!-- This goes around the background to allow closing the modal -->
	<a class="modal-close-overlay" href="#"></a>
	
	<!-- The popup itself -->
	<div class="modal-popup">
		<!-- duh -->
		<div class="modal-header">
			<!-- duh -->
			<h1 class="modal-title"></h1>
		</div>

		<!-- That cute close button -->
		<a class="modal-close" data-toggle="modal-close" href="#"><i class="symbol symbol-close"></i></a>

		<!-- duh -->
		<div class="modal-popup-content">
		<!-- Content here -->
		</div>

	</div>

</div>
```

NOTE add `.body-modal-active` to the body tag so scrolling doesnt conflict with the modal's scrolling capability


## Javascript

If a url's hash location matches an element with that id and it has an `modal` class, the modal will automatically open

to disable this write ya script


```js
(function(fw){
	fw.settings.initializeModal = false;
}(frameWork));
```

NOTE: this is useless if `frameWork.settings.dynamicHash` is set to `false`

### Functions

#### **`fw.createModal(triggerer)`**

Creates a modal

`triggerer` is the element that toggles the modal or [data-toggle="modal*"],

If empty, the framework looks for a hash in the current url and if it matches an element with a `.modal` class on it, them it makes the boi

#### **`fw.destroyModal()`**

Kills ya boi


[Back to TOC](../../../readme.md)