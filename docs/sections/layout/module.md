# Modules

These are boxes that hold content and can be rearranged in css grid

![Module](../../images/module.png)

Container of modules. To allow css grid setup, declare css grid properties as data attributes

```html
<div class="module-grid" data-template-rows="50% 20px 1fr">

    <div class="module">
        <div class="module-header">
            <h3 class="module-title">Title</h3>
        </div>
        <div class="module-content">
            <p>Hi I'm a piece of content
        </div>
        <div class="module-footer">
            <p>Whatever footers have</p>
        </div>


    </div>

</div>
```



### `.module-grid`

![Module](../../images/module-grid.png)
#### Grid setup

```html
<div class="module-grid" data-template-rows="50% 20px 1fr" data-gri>

    <div class="module"></div>

</div>
```

[More information on available css grid parent properties](https://css-tricks.com/snippets/css/complete-guide-grid/)

#### Data Attributes


### `.modules-grid`
container of a box
### `.module`
THE BOIS

## Functions



[Back to TOC](../../../readme.md)