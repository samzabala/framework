

## Setting up for custom scripts
Wrap your script around with this

```
window.jQuery && jQuery.noConflict();
(function(_1p2.fw,$){
	
    console.log('do shiet');

}(_1p2.fw,jQuery));

```

The script relies on set css var properties by the framework properties so that it remains consistent with the styles of that jugagu, if you fuck with those css variables, it will have its own default values

That's all I can think of sharing for now because my brain is as fried as a chickenjoy right now

[Back to TOC](../../../readme.md)