# Form and input fields

Please forgive me

## Form elements

Although styles are reset, To normalize or basically allow the framework to style them items add **`.input`** to your input bitch boy


```html
<input type="checkbox" class="input">
```

## Input helpers

### **`.input-single-line`**

![](../images/../../images/input-single-line.png)

This styles an input field as a field for single line input.... uuhhhhhh yea



### **`.input-multiple-line`**

![](../images/../../images/input-multiple-line.png)

This styles an input field as a field for multiple line input.... uuhhhhhh yea

### **`.input-inline`**

For inline shit like radio, checkbox, sliders and stuff


# Styling class support

I tried my best, but I guess my best wasn't good enough


| Element | `.input` | `.input-single-line` | `.input-multiple-line `| `.input-inline` |
| -- | -- | -- | -- | -- |
| `button` | no | NO | NOO | JUST USE FUCKiNG [`.btn`](../components/button.md) |
| `select` | no (if this is the only class present) | yes | yes( if [multiple] ) | no |
| `textarea` | no (if this is the only class present) | no | yes | no |
| datalist | no | no | no | no |


Input elements are messier


| `input[type*]` 	| `.input` 	| `.input-single-line` 	| `.input-multiple-line `	| `.input-inline` 	|
| -- | -- | -- | -- | -- |
|`submit`, `reset`,`button` | no | NO | NOO | JUST USE FUCKiNG [`.btn`](../components/button.md) |
| `checkbox` | yes | no | no | yes |
| `color` | yes | i guess | no | yes |
| `date`, `datetime-local`, `month`, `time`, `week` | yes | yes | no | no |
| `email` | yes | yes | no | no |
| `file` | yes | yes | no | no |
| `hidden` | no | no | NO | IT'S NOT USE IT'S HIDDEN |
| `image` | yes | yes | no | no |
| `number` | yes | yes | no | no |
| `password` | yes | yes | no | no |
| `radio` | yes | no | no | yes |
| `range` | yes | no | no | yes |
| `search` | yes | yes | no | no |
| `tel` | yes | yes | no | no |
| `text` | yes | yes | no | no |
| `url` | yes | yes | no | no |
| `list` | yes | yes | no | no |

```html
<!-- Bitches that can be setup -->
<input class="input input-inline" type="button" value="Bitch">
<input class="input input-inline" type="checkbox">
<input class="input input-single-line" type="color">
<input class="input input-single-line" type="date">
<input class="input input-single-line" type="datetime-local">
<input class="input input-single-line" type="email">
<input class="input input-single-line" type="file">
<input class="input input-single-line" type="hidden">
<input class="input input-single-line" type="image">
<input class="input input-single-line" type="month">
<input class="input input-single-line" type="number">
<input class="input input-single-line" type="password">
<input class="input input-inline" type="radio">
<input class="input input-inline" type="range">
<input class="input input-inline" type="reset">
<input class="input input-single-line" type="search">
<input class="input input-inline" type="submit">
<input class="input input-single-line" type="tel">
<input class="input input-single-line" type="text">
<input class="input input-single-line" type="time">
<input class="input input-single-line" type="url">
<input class="input input-single-line" type="week">
<input class="input input-single-line" list="browsers">
<datalist class="input" id="browsers">
	<option value="Internet Explorer">
	</option><option value="Firefox">
	</option><option value="Chrome">
	</option><option value="Opera">
	</option><option value="Safari">
</option></datalist>

<select class="input input-single-line" name="cars">
<option value="volvo">Volvo</option>
<option value="saab">Saab</option>
<option value="fiat">Fiat</option>
<option value="audi">Audi</option>
</select>


<select class="input input-multiple-line" name="cars" multiple>
<option value="volvo">Volvo</option>
<option value="saab">Saab</option>
<option value="fiat">Fiat</option>
<option value="audi">Audi</option>
</select>

<textarea class="input input-multiple-line" name="message" rows="10" cols="30">The cat was playing in the garden.</textarea>
```

## Trumbowyg

See [Trumbowyg](../components/trumbowyg.md)

[Back to TOC](../../../readme.md)