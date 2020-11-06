

## Setting up for custom scripts
Wrap your script around with this

```
window.jQuery && jQuery.noConflict();
(function(_1p2.fw,$){
	
    console.log('do shiet');

}(_1p2.fw,jQuery));

```

The script relies on set css var properties by the framework properties so that it remains consistent with the styles of that jugagu, if you fuck with those css variables, it will have its own default values

# Components that have Javascript up on its shits

| component | events listener themselves/within dom/ |  events listener sub/add on helpers  | html markup/attribute manipulation for styling (toggling classes, etc.) | html markup/attribute manipulation for creating complete/part of UI design purely with js | 
| -- | -- | -- |  -- |
| .accordion |  | x | x |  |
| .alert |  | x | x |  |
| .switch |  | x | x |  |
| .btn-group-toggle / .list-group-toggle | x | x | x |  |
| .dropdown+ |  | x |x  |  |
| .input-tags*+ | x |  |  | x |
| .input-date*+ | x |  | x | x |
| .modal/ .board*+ | x | x | x | x |
| .tabs/ .nav | x | x | x |  |
| [data-toggle*=tooltip]* | x |  |  | x |
| .zone | x |  |  | x |

* Visible UI's HTML is completely rendered by js and element containing mentioned component attribute is simply hidden
+ element containing mentioned component attribute is simply hidden

That's all I can think of sharing for now because my brain is as fried as a chickenjoy right now

[Back to TOC](../../../readme.md)