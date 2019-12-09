# Table
![bitch](../../images/table.png)

Yes we have that too.

## Helper Classes

### **.table-wrapper**
. tables may not be absolutely responsive depending on content. to allow horizontal scrolling without looking ugly, wrap yuh table in a div with this class

```html
<div class="table-wrapper">
	<table>
		<!-- shet -->
	</table>
</div>
```
 

### **.table**

Replicate a `<table>` element

```html
<div class="table">
</div>
```

### **.table-row**

Replicate a `<thead>`,`<tbody>`,`<tfoot>` or `<tr>` element


```html
<div class="table">
	<div class="table-row"></div>
</div>
```

#### Row classes

##### Colors 
The folloing classes style table rows to [framework colors](../scaffolding/colors.md)
*	**.table-row-base**
*	**.table-row-background**
*	**.table-row-primary**
*	**.table-row-accent**
*	**.table-row-neutral**
*	**.table-row-success**
*	**.table-row-caution**
*	**.table-row-error**
*	**.table-row-intensity-1**
*	**.table-row-intensity-2**
*	**.table-row-intensity-3**
*	**.table-row-intensity-4**
*	**.table-row-intensity-5**

```html
<table>
	<tr class="table-row table-row-success"></tr>
</table>
```

##### Disable
To add disabled styles, add **`.table-row-disabled`** to the row

### **.table-cell**

Replicate a `<td>` or `<tr>` element
```html
<div class="table">
	<div class="table-row">
		<div class="table-cell">
			CELL!
		</div>
	</div>
</div>
```

### **.table-cell-heading**

Style a `<td>` or `.table-cell` as a  `<tr>` element

```html
<div class="table">

	<div class="table-row">
		<div class="table-cell table-cell-heading">
			CELL!
		</div>
	</div>
	<div class="table-row">
		<div class="table-cell">
			CELL!
		</div>
	</div>
</div>
```

### **.table-cell-no-gutter**

Remove padding on table cell
```html
<div class="table-cell table-cell-no-gutter">
	CELL!
</div>
```


### **.table-cell-no-gutter**

[Back to TOC](../../../readme.md)