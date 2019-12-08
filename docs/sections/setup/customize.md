# Sass/CSS Customizations
## Setting up custom variables
- Set up The sass file that will be compiled into the stylesheet
- Framework sass variables can be customized by declaring custom variables fist before integrating the framework



You can refer to existing sass variables [here](../../../scss/import/_vars.scss)
Note: All sass fariables in the list are required for the stylesheet to properly compile
Example:
```scss
/*! 
Custom variables
****************************************************************************/

$brand-font-primary: 'Poppins','Helvetica Neue',Helvetica,Arial,sans-serif !default;
$brand-font-accent: $brand-font-primary !default;
$brand-font-monospace: 'Menlo', 'Monaco', 'Consolas', "Courier New", monospace;
$body-font-weight: 500;
$body-font-weight-bold:900;

/*! 
framework sass
****************************************************************************/
@import 'framework/framework.scss';


// ya custom css after

```

# Javascript


No conflict mode is enabled for the framework. set up your script like this:

```js
window.jQuery && jQuery.noConflict();
(function(fw,$){

	//ya code
    console.log('do shiet');

}(frameWork,jQuery));

```

[Back to TOC](../../../readme.md)