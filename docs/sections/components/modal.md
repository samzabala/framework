# Modal

NOTE: only one instance of a modal can be rendered a time because it makes managing the modal easier 

This is how to setup a basic modal


```html
<a
	data-toggle-modal-default href="#modal-demo">Modal Toggle</a>
<div class="modal modal-default" id="modal-demo">
	<!-- Put ya content here -->
</div>
```

on `modal` element add class `modal-{MODE}` to signify what subcomponent or mode the modal will render as or `modal-default`

on `[data-toggle-modal]` suffix it to `-{MODE}` to partner it with its matching modal

More on modes in a bit

## Toggler


### **`[data-toggle-modal-{MODE}]`**


Elements with this attribute looks for a `.modal` to append its content to an actual poppo

This one looks for the `href` of the boi
```html
<a href="#bitch-ass-modal" data-toggle-modal-default>Open a bitch</a>
<div id="bitch-ass-modal" class="modal modal-default">
	Sup mofos, I'm an modal content
</div>
```

Another way but [data-toggle-modal-{MODE}] looks for a `data-href` to go to because there's no `href`

```html
<span data-href="#bitch-ass-modal" data-toggle-modal-default>Open a bitch</span>
<div id="bitch-ass-modal" class="modal modal-default">
	Sup mofos, I'm an modal content
</div>
```

Another way but [data-toggle-modal-{MODE}] looks for a sibling because there's no `href` or `data-href`

```html
<div class="container">
	<span data-toggle-modal-default>Open a bitch</span>
	<div class="modal modal-default">
		Sup mofos, I'm an modal content
	</div>
</div>
```

#### **`[data-toggle-modal-{MODE}-open]`** and **`[data-toggle-modal-{MODE}-close]`**

Unlike just `[data-toggle-modal-{MODE}]`, these attributes are more specific whether to close, or to open the modal



## Toggle Attributes

These attributes can be embedded to either the `[data-toggle-modal-{MODE}]`, or the `.modal `itself, but will prioritize the attributes embedded on `[data-toggle-modal-{MODE}]`




### **`data-modal-change-hash`**

Dafaults to `true`

Whether or not to have the modal change the location.hash when enabled and then disabled



```html
<a
	data-modal-width="800px"
	href="#modal-demo">Modal boi with max width <i class="symbol symbol-search"></i></a>

<div class="modal modal-default" id="modal-demo">
	<!-- content heeeere -->
</div>
```

### **`data-modal-title`**

Dafaults to `''`

Title to add a modal. Adding this will add a header to ya modal

```html
<a
	data-modal-title="Look at this bitchboy going modal and shit"
	href="#modal-demo">Modal boi with titlet <i class="symbol symbol-search"></i></a>

<div class="modal modal-default" id="modal-demo">
	<!-- content heeeere -->
</div>
```


### **`data-modal-close`**

Defaults to `true`

Adds a close button to the modal


```html
<a
	data-toggle-modal-default
	data-modal-close="true"
	href="#modal-demo">Modal boi close butt <i class="symbol symbol-search"></i></a>

<div class="modal modal-default" id="modal-demo">
	<!-- content heeeere -->
</div>
```

### **`data-modal-disable-overlay`**

Dafaults to `true`

Whether or not to allow clicking on the overlay to close the modal


```html
<a
	data-modal-disable-overlay="true"
	href="#modal-demo">Modal boi but when you click on the backdrop it dies <i class="symbol symbol-search"></i></a>

<div class="modal modal-default" id="modal-demo">
	<!-- content heeeere -->
</div>
```


### **`data-modal-width`**

Dafaults to `null`

Whether or not to add a max-width to the modal. The modal is styled to be responsive. adding a max width can add limit to width



```html
<a
	data-modal-width="800px"
	href="#modal-demo">Modal boi with max width <i class="symbol symbol-search"></i></a>

<div class="modal modal-default" id="modal-demo">
	<!-- content heeeere -->
</div>
```


### **`data-modal-callback`**

Dafaults to `null`

Function to run after the modal is ready but before it's displays


```html
<a
	data-toggle-modal-default
	data-modal-callback="fuckinModalCallback()"
	href="#modal-demo">Modal boi with a callback</a>


<script>
	var fuckinModalCallback =  function() {
		//js code to run here
		console.log('RUN');
	}
</script>
```





### **`data-modal-classes`**

Dafaults to `null`

classes to add to the generated modal or `#fw-modal`


```html
<a
	data-toggle-modal-default
	data-modal-classes="theme-inverse"
	href="#modal-demo">Modal boi with classes</a>
```

### **`data-close-classes`**

Dafaults to `null`

classes to add to the generated `.modal-ui-close`


```html
<a
	data-toggle-modal-default
	data-close-classes="theme-inverse"
	href="#modal-demo">Modal boi with classes</a>
```


### All together now

```html
<a
data-toggle-modal-default
data-modal-close="false"
data-modal-disable-overlay="false"
data-modal-width="800px"
data-modal-title="Bitch"
href="#modal-demo">Modal boi with max width and no close butt <i class="symbol symbol-search"></i></a>

<div class="modal modal-default" id="modal-demo">
	<!-- content heeeere -->
</div>
```

![](../../images/modal.png)


NOTE add `.body-no-scroll` to the body tag so scrolling doesnt conflict with the modal's scrolling capability


## Styling a modal

lol good luck

## Javascript

If a url's hash location matches an element with that id and it has an valid `modal-{MODE}` class and, the modal will automatically open it

to disable this write ya script

```js
(function(fw){
	fw.Settings.modify('initializeModal',false);
}(fw));
```
NOTE: this is useless if `fw.settings.get('dynamicHash')` is set to `false`
### Functions

#### **`fw.Modal(element)`**

Make a new boi by going `const modal = new fw.Modal(element,triggerer,args)`


`element` is the element itself. if blank, does nothing

`triggerer` is the element that triggers the element. if left blank, it doesnt mess with any data-toggle-elements

`args` is the opts available
```js
//defaults
{
	width: null,
	maxHeight: null
}
```


#### **`modal.create(element)`**

duh

`element` is the element triggered. if left blank, this defaults to the element attached to the instance

#### **`modal.update(element)`**

updates utility button classes to match the state of the viewport or whatever the fuck thats going on that ya boi depends on

`element` is the element triggered. if left blank, this defaults to currently active modal matching the current instance's mode

#### **`modal.resize(width)`**

updates utility button classes to match the state of the viewport or whatever the fuck thats going on that ya boi depends on

`width` is the width property u want the modal to be set at

#### **`modal.destroy(element)`**

destroys any active uis for the element

`element` is the element triggered. if left blank, this defaults to currently active modal matching the current instance's mode

#### **`fw.Modal.current(mode)`**

returns obj with active modals on screen
`mode` is the mode of the modal u wanna get. if left blank, this returns all instances of modal modes

#### **`fw.Modal.configDefaults`**

returns obj with component arg defaults

#### **`fw.Modal.initListeners()`**

initializes all event listeners

#### **`modal.args`**

returns obj with component set args

### Events

* `click.fw.modal` - happens on `triggerer`
* `hashchange.fw.modal` - happens on `window` on hashchange

* `before_create.fw.modal` - happens on `element` before create
* `create.fw.modal` - happens on `element` when create
* `after_create.fw.modal` - happens on `element` after create

* `before_destroy.fw.modal` - happens on `element` before destroy
* `destroy.fw.modal` - happens on `element` when destroy
* `after_destroy.fw.modal` - happens on `element` after destroy

* `before_update.fw.modal` - happens on `element` before update
* `update.fw.modal` - happens on `element` when update
* `after_update.fw.modal` - happens on `element` after update

* `before_resize.fw.modal` - happens on `element` before resize
* `resize.fw.modal` - happens on `element` when resize
* `after_resize.fw.modal` - happens on `element` after resize

[Back to TOC](../../../readme.md)

# Modes

These are valid names for modes that will setup the styles and functionalities valid for the modal that depends on that mode i cant make english correctly right now but you get the idea

* `default`
* `board`
* `full` (coming soon) maybe

halat ta igwa pa akong ilalaag igdi