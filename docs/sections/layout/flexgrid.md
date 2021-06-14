# Flex Grid

The framework has a grid setup using flex. No floats. because sadness. The columns are calculated by flex basis and spaces are setup by margins. As long as the box-sixing reset is not removed or reset from the framework. ya good.

[More info on flex](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

![](../../images/flex-grid.png)

```html
<div class="flex-grid">
  <div class="flex-col-12 flex-col-sm-6 flex-col-md-4 flex-col-lg-3">A column boi</div>
  <div class="flex-col-12 flex-col-sm-6 flex-col-md-8 flex-col-lg-9">A column boi</div>
  <div class="flex-col-12 flex-col-md-4">A column boi</div>
  <div class="flex-col-12 flex-col-md-4">A column boi</div>
  <div class="flex-col-12 flex-col-md-4">A column boi</div>
  <div class="flex-col-12 flex-col-md-4">A column boi</div>
</div>
```

## Container classes

### **`.flex-grid`**

Initiates grid setup for parent element

### Helper classes

#### **`.flex-grid-compact`** and **`.flex-grid-expanded`**

Modifies grid item spacing.

**`.flex-grid-compact`** makes it less spaced out

![](../../images/flex-grid-compact.png)

```html
<div class="flex-grid flex-grid-compact">
  <div class="flex-col-12 flex-col-sm-6 flex-col-md-4 flex-col-lg-3">
    A column boi but compact
  </div>
  <div class="flex-col-12 flex-col-sm-6 flex-col-md-8 flex-col-lg-9">
    A column boi but compact
  </div>
  <div class="flex-col-12 flex-col-md-4">A column boi but compact</div>
  <div class="flex-col-12 flex-col-md-4">A column boi but compact</div>
  <div class="flex-col-12 flex-col-md-4">A column boi but compact</div>
  <div class="flex-col-12 flex-col-md-4">A column boi but compact</div>
</div>
```

**`.flex-grid-expanded`** makes it mORE SPACED OUT HOHO

![](../../images/flex-grid-expanded.png)

```html
<div class="flex-grid flex-grid-expanded">
  <div class="flex-col-12 flex-col-sm-6 flex-col-md-4 flex-col-lg-3">
    A column boi but expanded
  </div>
  <div class="flex-col-12 flex-col-sm-6 flex-col-md-8 flex-col-lg-9">
    A column boi but expanded
  </div>
  <div class="flex-col-12 flex-col-md-4">A column boi but expanded</div>
  <div class="flex-col-12 flex-col-md-4">A column boi but expanded</div>
  <div class="flex-col-12 flex-col-md-4">A column boi but expanded</div>
  <div class="flex-col-12 flex-col-md-4">A column boi but expanded</div>
</div>
```

#### **`.flex-no-gutter`**, and **`.flex-grid-no-gutter-x`** or **`.flex-grid-no-gutter-y`**

Use classes to remove margins

**`.flex-grid-no-gutter`** removes all gaps

![](../../images/flex-grid-no-gutter.png)

```html
<div class="flex-grid flex-grid-no-gutter">
  <div class="flex-col-12 flex-col-sm-6 flex-col-md-4 flex-col-lg-3">
    A column boi but no gutter
  </div>
  <div class="flex-col-12 flex-col-sm-6 flex-col-md-8 flex-col-lg-9">
    A column boi but no gutter
  </div>
  <div class="flex-col-12 flex-col-md-4">A column boi but no gutter</div>
  <div class="flex-col-12 flex-col-md-4">A column boi but no gutter</div>
  <div class="flex-col-12 flex-col-md-4">A column boi but no gutter</div>
  <div class="flex-col-12 flex-col-md-4">A column boi but no gutter</div>
</div>
```

**`.flex-grid-no-gutter-x`** removes gaps horizontally

![](../../images/flex-grid-no-gutter-x.png)

```html
<div class="flex-grid flex-grid-no-gutter-x">
  <div class="flex-col-12 flex-col-sm-6 flex-col-md-4 flex-col-lg-3">
    A column boi but no gutter x
  </div>
  <div class="flex-col-12 flex-col-sm-6 flex-col-md-8 flex-col-lg-9">
    A column boi but no gutter x
  </div>
  <div class="flex-col-12 flex-col-md-4">A column boi but no gutter x</div>
  <div class="flex-col-12 flex-col-md-4">A column boi but no gutter x</div>
  <div class="flex-col-12 flex-col-md-4">A column boi but no gutter x</div>
  <div class="flex-col-12 flex-col-md-4">A column boi but no gutter x</div>
</div>
```

**`.flex-grid-no-gutter-y`** removes gaps vertically

![](../../images/flex-grid-no-gutter-y.png)

```html
<div class="flex-grid flex-grid-no-gutter-y">
  <div class="flex-col-12 flex-col-sm-6 flex-col-md-4 flex-col-lg-3">
    A column boi but no gutter y
  </div>
  <div class="flex-col-12 flex-col-sm-6 flex-col-md-8 flex-col-lg-9">
    A column boi but no gutter y
  </div>
  <div class="flex-col-12 flex-col-md-4">A column boi but no gutter y</div>
  <div class="flex-col-12 flex-col-md-4">A column boi but no gutter y</div>
  <div class="flex-col-12 flex-col-md-4">A column boi but no gutter y</div>
  <div class="flex-col-12 flex-col-md-4">A column boi but no gutter y</div>
</div>
```

### **`.flex-grid-fixed`**

By default flex grid items will grow and shrink depending on available blank space, to have a fixed column layout use that class up ther
![](../../images/flex-grid-fixed.png)

```html
<div class="flex-grid flex-grid-fixed">
  <div class="flex-col-12 flex-col-sm-6 flex-col-md-4 flex-col-lg-3">
    A column boi but fixed
  </div>
  <div class="flex-col-12 flex-col-sm-6 flex-col-md-8 flex-col-lg-9">
    A column boi but fixed
  </div>
  <div class="flex-col-12 flex-col-md-4">A column boi but fixed</div>
  <div class="flex-col-12 flex-col-md-4">A column boi but fixed</div>
  <div class="flex-col-12 flex-col-md-4">A column boi but fixed</div>
  <div class="flex-col-12 flex-col-md-4">A column boi but fixed</div>
</div>
```

### Other helpers

The container also supports the following helper classes

- [Justify Content](../helpers/justify.md#justify-content)
- [Align Items](../helpers/align.md#align-items)
- [Align Content](../helpers/align.md#align-content)
- [Flex wrap](../helpers/flex.md#flex-wrap)
- [Flex direction](../helpers/flex.md#flex-direction)

## Children classes

### **`.flex-col-[number]`** and **`.flex-col-[breakpoint]-[number]`**

#### Basic Layout

The number suffix of the class is based on the amount of space out of the set `$grid-units` will be taken

By default `$grid-units` is 12 (see [customize](../setup/customize.md));

so for example, if a class of `.flex-col-6` is declared, this column item will take 6/12 or 1/2 of the space

```html
<div class="flex-grid">
  <div class="flex-col-6">
    <div class="flex-col-6"></div>
  </div>
</div>
```

I have no graphic to show you because i'm an asshole

#### Breakpoint based layout

See [Breakpoints](../scaffolding/breakpoint.md)

To change the flex basis of the column item on certain breakpoints, **`.flex-col-[breakpoint]-[number]`** is the best class to add.

Note that the grid setup is made mobile first, so the `.flex-col` class will cascade unto larger breakpoints unless a class for one of the larger breakpoints than the declared.. is declared.. woah I can english :O

```html
<div class="flex-grid">
  <div class="flex-col-xs-12 flex-col-md-6">
    <div class="flex-col-xs-12 flex-col-md-6"></div>
  </div>
</div>
```

On this code, the column bois is set for full width on `xs` devices until `md` because on `md` they break into 2 columns now

#### **`.flex-child`**

Suppose you didn't want yuh flex items to be a set width or basis but rather shrink and or grow or not based on the content it has, but allow the usual grid spacing to happen, use `.flex-child`

![](../../images/flex-grid-flex-child.png)

```html
<div class="flex-grid">
  <div class="flex-col-6">A column boi but not really column</div>
  <div class="flex-col-6">A column boi but not really column</div>
  <div class="flex-col-3 flex-0-1">
    A column boi but not really column, just has the margin setup and shit A column boi
    but not really column, just has the margin setup and shit A column boi but not
    really column, just has the margin setup and shit A column boi but not really
    column, just has the margin setup and shit A column boi but not really column, just
    has the margin setup and shit A column boi but not really column, just has the
    margin setup and shit A column boi but not really column, just has the margin setup
    and shit A column boi but not really column, just has the margin setup and shit A
    column boi but not really column, just has the margin setup and shit
  </div>
  <div class="flex-child">A column boi but not really column</div>
  <div class="flex-child flex-1-1">
    A column boi but not really column, just has the margin setup and shit
  </div>
  <div class="flex-col-4">
    A column boi but not really column, just has the margin setup and shit
  </div>
  <div class="flex-col-4">
    A column boi but not really column, just has the margin setup and shit
  </div>
  <div class="flex-col-4">
    A column boi but not really column, just has the margin setup and shit
  </div>
</div>
```

Did I describe it right? idk, but that image should... clear up whatever I attempted to say

You can also use the grow and shrink helpers to dictate how much shrinkage and growage you want on them column bois

### Other helpers

The column bois also supports the following helper classes

- [Align Self](../helpers/align.md#align-self)
- [Grow and Shrink](../helpers/flex.md#grow-and-shrink)

[Back to TOC](../../../readme.md)
