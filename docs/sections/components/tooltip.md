# Tooltip


Oh shit we have tooltis too. This dipshit can be toglled wether on click with **`[data-toggle="tooltip-click"]`** or hover with **`[data-toggle="tooltip-hover"]`** 

NOTE: The toggler for the tooltip mus not be a `position:fixed;` or a descendant of an element with that property unless you want your tooltip to dIE... or position itself like shit

Example tooltip that toggles on click

```html
<a href="#" class="btn btn-primary"
	data-toggle="tooltip-click"
	data-tooltip-placement="top"
	data-tooltip-content="<strong>YEET</strong>">
	Bitch boi on the top
</a>
```

A bitch boy toggled on hover

```html
<a href="#" class="btn btn-primary"
	data-toggle="tooltip-hover"
	data-tooltip-placement="top"
	data-tooltip-content="<strong>YEET</strong>">
	Bitch boi on the top
</a>
```


![](../../images/tooltip.png)


# Toggler

**`[data-toggle="tooltip-click"]`** or **`[data-toggle="tooltip-hover"]`** depending on how the fuck you want it to appear. This shit makes it happen. Add this to the element you need to hava a tooltip on

```html
<span data-toggle="tooltip-hover"></span>
```

This makes a tooltip, but there's nothing in it yet because you need...

# Other Attributes

## **`data-tooltip-placement`**

defaults to `left`

It places the boi somewhere you want

Other Available parameters: `top`,`bottom`,`right`,

## **`data-tooltip-badge`**

defaults to false

Whether or not you want the tooltip's pointy boi have a [badge](../components/badge.md) element on it

## **`data-tooltip-badge-background`**

defaults to `'primary'`

This sets a color on the badge boi

Only useful if `data-tooltip-badge` is true. It accepts valid [color tags](../scaffolding/colors.md#color-tags) values or valid `background-color` value

## **`data-tooltip-badge-size`**

defaults to `''`

How big do you want the boi?

Other Available parameters: `small`,`big`

## **`data-tooltip-content`**

defaults to `''`

This is the content for the tooltip

## **`data-tooltip-classes`**

Idk this is how you add classes or [helper classes](../scaffolding/helpers.md) to the tooltip content but you have to be careful because some css may not work on the tooltip

## **`data-tooltip-center-x`**

By default tooltips attaches the tip by the edge, enable this to center the tooltips tail or badge if enabled horizontally. NOTE: will not work if `data-tooltip-x` is set

## **`data-tooltip-center-y`**

By default tooltips attaches the tip by the edge, enable this to center the tooltips tail or badge if enabled vertically. NOTE: will not work if `data-tooltip-y` is set

![](../../images/tooltip-with-center.png)

## **`data-tooltip-x`**

Custom x offset. has to be a number,

NOTE: the tooltip is appended to the body so position ofset will be calculated based on the body

## **`data-tooltip-y`**

Custom y offset. has to be a number,

NOTE: the tooltip is appended to the body so position ofset will be calculated based on the body

## **`data-tooltip-width`**

duh

## **`data-tooltip-allow-interaction`**

defaults to false. tooltips are disabled for pointer interactions so it doesn't get in the way of the clickiness of elements in the page. set to tru so you can interact with things in it

# Advanced

## Modal markup

This is the markup our framework generates in case you need to make your own. 

```html
<!-- Wrapper and color overlay... adding .active shows the boi.. tooltip-[position] styles the tooltip tail's position -->
<div class="tooltip tooltip-top active">

	<div class="tooltip-content">
		<!-- content here -->
	</div>

</div>
```



## Styling a tooltip

you can try but be careful


## Javascript


### Functions

#### **`fw.createTooltip(triggerer)`**

Creates a boi

`triggerer` is the element that toggles the modal or [data-toggle="modal*"],

the parameter is required

#### **`fw.destroyTooltip()`**

Kills ya boi. This function is ran first thing in `fw.createTooltip(triggerer)` too


#### **`fw.positionToolTip( x:number, y:number )`**

Positions ya boi. You can only run this if a tooltip is triggered and active.

NOTE: offset is calculated based on position offset from body


[Back to TOC](../../../readme.md)