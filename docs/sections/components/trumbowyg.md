# Trumbowyg
The framework has its own styles for trumbowyg but also minimal script customizations to this plugin. A trumbowyg editor is like a subcousin of the forms/`.input` component and can be initialized by adding `.input-trumbowyg` class to a div or textarea field

```html
<textarea class="input-trumbowyg"></textarea>
```

If you want to initiate your own trumbowyg add `.input-trumbowyg-custom`


```html
<textarea id="custom-trumbo" class="input-trumbowyg input-trumbowyg-custom"></textarea>
```

and then script it as usual

```js
$('#custom-trumbo').trumbowyg({
    //custom settings
    btns: [['strong', 'em',], ['insertImage']],
    autogrow: true
});
```


The framework has its own settings for trumbowyg, to manipulate this, declare your custom settings for all trumbowygs' default settings, declare them like this in js:
```js
fw.trumbowyg.defaults = {
    //trumbo settings here
    btns: [['strong', 'em',], ['insertImage']],
    autogrow: true
}
```

[Trumbowyg documentation](https://alex-d.github.io/Trumbowyg/documentation/)

[Back to TOC](../../../readme.md)