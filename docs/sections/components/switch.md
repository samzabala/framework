# Switch

No. it's not the nintendo switch

Suppose you wanna have two blocks appear when the other disappears, this boi is for you

```html
<div class="switch" id="switch-boi">
  <div class="switch-off">
    <h1>Title</h1>
    <button class="btn btn-link" data-toggle-switch-on href="#switch-boi">
      Click to edit me
    </button>
  </div>
  <div class="switch-on">
    <div class="input-group input-large input-block input-group-horizontal">
      <input type="text" class="input input-single-line" />
      <button data-toggle-switch-off href="#switch-boi" class="btn btn-primary">
        Save
      </button>
    </div>
  </div>
</div>
```

## Classes

### **`.switch`**

Wrapper of the blocks that will toggle each other. By default, javascript will set this to off with the class `switch-to-off`. If you want this to default to on by default, add `switch-to-on` to the block. if it doesn't work, Sam's programming is shit and feel free to tell her so.

If yopu dont want it to automatically off itself when ckiclity clack awei, add class `switch-idle`
If you want it top be on its on state on initial page load,, add class `switch-to-on`

### **`.switch-on`**

The block to show when the switch is "on"

### **`.switch-off`**

The block to show when the switch is "off"

## Toggle Attributes

### **`[data-toggle-switch-on]`**

Toggle to enable the on state of a switch. will look for the matching href, data-href, or closest `.switch` ancestor to toggle

### **`[data-toggle-switch-off]`**

Toggle to enable the off state of a switch. will look for the matching href, data-href, or closest `.switch` ancestor to toggle

### **`[data-toggle-switch]`**

If u want this toggle to be the all powerful god that can do both


## Javascript

### Functions

#### **`fw.Switch(element,trigger)`**

Make a new boi by going `const switchElement = new fw.Switch(element)`

`element` is the switchElement itself. if blank, does nothing

#### **`switchElement.init(element)`**

turns off the switch as initial state, unless it was deliberately turned on in the first place

`element` is the element triggered. if left blank, this defaults to the element attached to the instance

#### **`switchElement.turnOff(element)`**

duh

`element` is the element triggered. if left blank, this defaults to the element attached to the instance

#### **`switchElement.turnOn(element)`**

duh

`element` is the element triggered. if left blank, this defaults to the element attached to the instance

#### **`switchElement.toggle(element)`**

duh

`element` is the element triggered. if left blank, this defaults to the element attached to the instance

#### **`fw.Switch.purge(exemptedSwitchElement)`**

turns off all switches

`exemptedSwitchElement` is DOMElement of dropdown to exempt from the purge

#### **`fw.Switch.configDefaults`**

returns obj with component arg defaults

#### **`fw.Switch.initListeners()`**

initializes all event listeners

#### **`switchElement.args`**

returns obj with component set args

### Events

- `click_fw_switch` - happens on `triggerer`
- `click_fw_switch_purge` - happens on elements that qualify closing switchElement components
- `before_init_fw_switch` - happens on `document` before running functions to set up
- `init_fw_switch` - happens on `document` when running functions to set up
- `after_init_fw_switch` - happens on `document` after running functions to set up
- `before_on_fw_switch` - happens on `element` before turning it on
- `on_fw_switch` - happens on `element` when turning it on
- `after_on_fw_switch` - happens on `element` after turning it on
- `before_off_fw_switch` - happens on `element` before turning it off
- `off_fw_switch` - happens on `element` when turning it off
- `after_off_fw_switch` - happens on `element` after turning it off

[Back to TOC](../../../readme.md)
