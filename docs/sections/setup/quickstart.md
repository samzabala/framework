
# Installation
include the following files:

css/sass
*	[framework scss files](../../../scss/framework/)

js files (in order)
*	[jQuery](https://jquery.com/) (for trumbowyg support. sad. This will be expendable soon)
*	[Trumbowyg](https://alex-d.github.io/Trumbowyg/)
*	[framework.plugged.js](../../../js/framework.js) 
	*	Note: This script uses jQuery only for trumbowyg, the reset are vanilla. will be updated once vanilla trumbowyg version is released.
	*	If full on jQuery dependency is preferred, [framework.js](../../../js/framework.plugged.js)

## File structure
*	Keep framework in the root folder

## HTML setup

...must look like this
```html

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Title</title>

	<!-- styles -->
		<!-- framework -->
			<link href="framework/dist/framework.css" rel="stylesheet">
		<!-- your styles -->
			<link href="/style.css" rel="stylesheet">
	</head>
<body>

	<!-- blahblahblah -->


	<!-- jquery -->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<!-- trumboboi -->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.19.1/trumbowyg.min.js"></script>
		
	<!-- framework -->
		<script src="framework/dist/framework.js"></script>

	<!-- ya custom js -->
		<script src="/site.js"></script>
</body>
</html>


```

and done



[Back to TOC](../../../readme.md)