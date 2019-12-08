
## Setting up custom variables
- Set up The sass file that will be compiled into the stylesheet
- Framework sass variables can be customized by declaring custom variables fist before integrating the framework

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
@import 'framework/_framework';


// ya custom css after

```




[Back to TOC](../../../readme.md)