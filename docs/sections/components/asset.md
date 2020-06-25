
# Asset

Markup to display files, or `figure`s but fancier

A typical setup could look like this

```html
<div class="asset">
	<div class="asset-thumbnail">
		<span class="asset-image asset-image-default"></span>
	</div>
	<a href="#" class="asset-delete btn btn-symbol btn-round btn-small btn-secondary">
		<i class="symbol symbol-close"></i>
	</a>
	<p class="asset-title">bitch-ass.probablyavirus</p>
	<p class="asset-caption">69kb</p>
</div>
```

# Classes

## `.asset`

Containing element


## `.asset-thumbnail`

Container of thumbnail. can contain either an `<img>` for a thumbnail or the helper class `.asset-image`


## `.asset-image`

helper that can display a css coded thumbnail for file types. append one of of the classes below to this to work:

### supported file tye classes:


| asset-image-class | file types suggested for.. |
|--|:--|
| `.asset-image-default` | anything duh |
| `.asset-image-audio` | wav,mp3,wma if that still exists, m4a etc. |
| `.asset-image-code` | json,css,html,xml etc |
| `.asset-image-doc` | doc,docx etc |
| `.asset-image-font` | otf,ttf eot etc |
| `.asset-image-img` | jpg,png,gif,tiff,bmp etc |
| `.asset-image-pdf` | duh |
| `.asset-image-table` | excel files, csv,tsv.. |
| `.asset-image-text` | txt or rich text idk |
| `.asset-image-video` | mp4, quicktime etc |
| `.asset-image-zip` | zip.. probably a rar file tooo idk |


## `.asset-delete` and `[data-toggle="asset-close"]`

add to  `.asset-delete` to a `.btn` inside the 	`.asset` that closes or deletes your boo so it appears fancy and shit.

add `[data-toggle="asset-close"]` to the button to actually remove it from the dom.

Note: you will still need some extra programming to have this actuallly delete ya boi


```html
<div class="asset">
	<div class="asset-thumbnail">
		<span class="asset-image asset-image-default"></span>
	</div>
	<a href="#" class="asset-delete btn btn-symbol btn-round btn-small btn-secondary">
		<i class="symbol symbol-close"></i>
	</a>
	<p class="asset-title">bitch-ass.probablyavirus</p>
	<p class="asset-caption">69kb</p>
</div>
```

## `.asset-title` and `.asset-caption`

duh


[Back to TOC](../../../readme.md)