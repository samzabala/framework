# Installation

include the following files:

css/sass

- [framework.scss](../../../scss/framework.scss)
  - If you want to be a basic bitch just [framework.css](../../../dist/framework.css) is super cool too :)

js files (in order)

- Dependencies
  - [jQuery](https://jquery.com/) (for plugged version)
- Optional
  - ~[Trumbowyg](https://alex-d.github.io/Trumbowyg/)~ Bye felicia
- [framework.js](../../../dist/framework.min.js)
  - If full on jQuery dependency is preferred, [framework.plugged.js](../../../dist/framework.plugged.js)

## File structure

- Put this bitch boy wherever the fuq u want. 69/10 recommend the root folder

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
	<body class="body-loading"">

		<!-- blahblahblah -->

		<!-- jquery setup -->
			<!-- jquery if you need it-->
				<script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
			<!-- framework w/ jquery -->
				<script src="framework/dist/framework.plugged.js"></script>

		<!-- no dependencies setup -->
			<!-- framework no jquery -->
				<script src="framework/dist/framework.js"></script>

		<!-- ya custom js -->
			<script src="/site.js"></script>
	</body>
</html>


```

and done

# Body Classes

There are classes for our bod to be aware of

## **`.body-loading`**

While javascript is initialized. some modules are at opacity: 0; while this is there. Add this to your html so shit can happen

## **`.body-loaded`**

When bitch is ready. JS adds this shit, you don't have to fuck with it

## **`.body-modal-active`**

Disables overflow scroll on the bod so user can focus on the active [modal](../components/modal.md). JS adds this shit, you don't have to fuck with it

## **`.body-nav-sticky-offset`**

Offsets the body to the set height of the [nav](../components/nav.md)

# Theme Classes

Can be applied to the body or whatever

element

## **`.theme-default`**

Applies default background-color and color properties

## **`.theme-inverse`**

This switches color or background properties to allow inverse mode. good for supporting light and dark preferences

[Back to TOC](../../../readme.md)
