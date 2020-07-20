# Tags

This is to display a tag bitch :)

```html
<span class="tag tag-default">#blessed</span>
```


## Colors

Aside from `.tag-default`. There are other color schemes available to color the tags, add `.tag-[color-tag]`

*	**`.tag-primary`**
*	**`.tag-secondary`**
*	**`.tag-accent`**
*	**`.tag-neutral`**
*	**`.tag-error`**
*	**`.tag-caution`**
*	**`.tag-success`**
*	**`.tag-intensity-1`**
*	**`.tag-intensity-2`**
*	**`.tag-intensity-3`**
*	**`.tag-intensity-4`**
*	**`.tag-intensity-5`**

![](../../images/tags.png)

More info on [color tags](../scaffolding/colors.md#color-tags)

The color can be customized by adding a background-color property to the tag

```html
<span class="tag" style="background-color:pink;">Custom</span> 
```
## Other sub classes

### `.tag-text`

tag to wrap text within the tag. Adds more wrapping capabilities maxing out characters to some extend and shit

```html
<span class="tag tag-default">
	<span class="tag-text">I'm gonna be so long but at least I won't break whatever layout you have that needs my bitch ass to be short and concise</span>
</span>
```

[Back to TOC](../../../readme.md)