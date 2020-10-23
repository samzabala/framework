# Switch

No. it's not the nintendo switch

Suppose you wanna have two blocks appear when the other disappears, this boi is for you

```html

<div class="switch" id="switch-boi">
	<div class="switch-off">
		<h1>Title</h1>
		<button class="btn btn-link" data-toggle="switch-on" href="#switch-boi">Click to edit me </button>
		
	</div>
	<div class="switch-on">
		<div class="input-group input-large input-block input-group-horizontal">
			<input type="text" class="input input-single-line">
			<button data-toggle="switch-off" href="#switch-boi" class="btn btn-primary">Save</button>
		</div>
	</div>
</div>
```

## Classes

### **`.switch`** 

Wrapper of the blocks that will toggle each other. By default, javascript will set this to off with the class `switch-to-off`. If you want this to default to on by default, add `switch-to-on` to the block. if it doesn't work, Sam's programming is shit and feel free to tell her so.

If yopu dont want it to automatically off itself when ckiclity clack awei, add class `switch-idle`

### **`.switch-on`** 

The block to show when the switch is "on"

### **`.switch-off`** 

The block to show when the switch is "off"

## Toggle Attributes


### **`[data-toggle="switch-on"]`** 

Toggle to enable the on state of a switch. will look for the matching href, data-href, or closest `.switch` ancestor to toggle


### **`[data-toggle="switch-off"]`** 

Toggle to enable the off state of a switch. will look for the matching href, data-href, or closest `.switch` ancestor to toggle