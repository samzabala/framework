# Modal

NOTE: only one instance of a modal can be rendered a time because it makes managing the modal easier 

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

These attributes can be embedded to either the `[data-toggle="modal"]`, or the `.modal `itself, but will prioritize the attributes embedded on `.modal`

### **`data-modal-title`**

Dafaults to `''`

Title to add a modal. Adding this will add a header to ya modal

```html
<a
	data-modal-title="Look at this bitchboy going modal and shit"
	href="#modal-demo">Modal boi with titlet <i class="symbol symbol-search"></i></a>

<div class="modal" id="modal-demo">
	<!-- content heeeere -->
</div>
```


### **`data-modal-close`**

Defaults to `true`

Adds a close button to the modal


```html
<a
	data-toggle="modal"
	data-modal-close="true"
	href="#modal-demo">Modal boi close butt <i class="symbol symbol-search"></i></a>

<div class="modal" id="modal-demo">
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

<div class="modal" id="modal-demo">
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

<div class="modal" id="modal-demo">
	<!-- content heeeere -->
</div>
```




### **`data-modal-change-hash`**

Dafaults to `true`

Whether or not to have the modal change the location.hash when enabled and then disabled



```html
<a
	data-modal-width="800px"
	href="#modal-demo">Modal boi with max width <i class="symbol symbol-search"></i></a>

<div class="modal" id="modal-demo">
	<!-- content heeeere -->
</div>
```

### **`data-modal-callback`**

Dafaults to `null`

Function to run after the modal is ready but before it's displays


```html
<a
	data-toggle="modal"
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
	data-toggle="modal"
	data-modal-classes="theme-inverse"
	href="#modal-demo">Modal boi with classes</a>
```

### All together now

```html
<a
data-toggle="modal"
data-modal-close="false"
data-modal-disable-overlay="false"
data-modal-width="800px"
data-modal-title="Bitch"
href="#modal-demo">Modal boi with max width and no close butt <i class="symbol symbol-search"></i></a>

<div class="modal" id="modal-demo">
	<!-- content heeeere -->
</div>
```

![](../../images/modal.png)

# Advanced

## Modal markup

This is the markup our framework generates in case you need to make your own. 

```js
let html = '';

	html += `<div id="fw-modal"
			class="${frameWork.settings.prefix}-modal-component
			${subcom}-wrapper
			${args.classes}
			${args.align ? `${subcom}-${args.align}` : ''}
		">`;

		//overlay
		html += `<a href="#"
				class="
					${subcom}-close-overlay"
					${
						args.disableOverlay == false
						? `data-toggle="${subcom}-close"`
						: ''
					}
			></a>`;

		//markup changes for a basic modal vs the board
		switch (subcom) {
			case 'board':
				html += `<div class="${subcom}-button-wrapper">`;
					if (args.close !== false) {
						html += `<a href="#"
							class="
								${subcom}-close ${subcom}-button
								${
									args.closeClasses
									? args.closeClasses
									: `${subcom}-button-default`}"
							data-toggle="${subcom}-close"
						>
							<i class="symbol symbol-close "></i>
						</a>`;
					}

					if (args.resize !== false && args.width) {
						html += `<a
							class="
								${subcom}-resize ${subcom}-button
								${
									args.resizeClasses
									? args.resizeClasses
									: `${subcom}-button-default`}"
							data-toggle="${subcom}-resize"
						>
							<i class="symbol symbol-arrow-tail-left "></i>
							<i class="symbol symbol-arrow-tail-right "></i>
						</a>`;
					}
				html += `</div>`;

				html += `<div class="${subcom}-popup">`;

					if (args.header) {
						html += `<div class="${subcom}-header">
								<h1 class="${subcom}-title">${decodeURIComponent(args.header)}</h1>
							</div>`;
					}

					html += `<div class="${subcom}-popup-content"></div>`;

				html += `</div>`;

				break;

			case 'modal':
				html += `<div class="${subcom}-popup">`;

				if (args.header) {
					html += `<div class="${subcom}-header">
							<h1 class="${subcom}-title">${decodeURIComponent(args.header)}</h1>
						</div>`;
				}

				if (args.close !== false) {
					html += `<a href="#"
							class="${subcom}-close ${args.closeClasses}"
							data-toggle="${subcom}-close"
						>
							<i class="symbol symbol-close "></i>
						</a>`;
				}

				html += `<div class="${subcom}-popup-content"></div>`;

				html += `</div>`;

				break;
		}

	html += `</div>`;
```

NOTE add `.body-modal-active` to the body tag so scrolling doesnt conflict with the modal's scrolling capability


## Styling a modal

lol good luck

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

#### **`fw.createModal(mode,triggerer)`**

Creates a modal

`mode` is the type of subcomponent of modal. defaults to `false` to render default modal,

`triggerer` is the element that toggles the modal or [data-toggle="modal*"],

If empty, the framework looks for a hash in the current url and if it matches an element with a `.modal` class on it, them it makes the boi

#### **`fw.destroyModal()`**

Kills ya boi


[Back to TOC](../../../readme.md)

# Sub-components

## Board

Same functions as modal except this looks different because the design says so biechhhh


```html
<a
	data-toggle="board" href="#board-demo">board Toggle</a>
<div class="board" id="board-demo">
	<!-- Put ya content here -->
</div>
```

halat ta igwa pa akong ilalaag igdi