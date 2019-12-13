# Sass/CSS Customizations
## Setting up custom variables
- Set up The sass file that will be compiled into the stylesheet
- Framework sass variables can be customized by declaring custom variables fist before integrating the framework

EVRYTHING CAN BE CUSTOMIZED FIGHT ME

You can refer to existing sass variables [here](../../../scss/import/_vars.scss)

Although lengthy, most variables are values of what is described, if it don't make sense to you ask sam because she's the dumbass who built this

woah i'm sam

Note: All sass variables in the list are required for the stylesheet to properly compile
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

Note, some values especially font sizes are recalculated internally by the framework to create equivalent optimal values, if some variable customization looks weird, there's your answer
eg:

`$body-line-height`. If set as pixels, this will be converted to its unitless equivalent
```scss
$body-font-size: 16px;
$body-line-height: 24px; // will be outputted as 1.5 
```

If this causes issues or errors, feel free to hit me up and shit on me so I can troubleshootootoot

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