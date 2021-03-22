# Ratio

In case you want an video iframe or some shit to keep its aspect ratio consistent on all screen sizes, this bitch is for you

```html
<div class="ratio ratio-4-by-3">
  <iframe
    class="ratio-child-stretch"
    src="https://www.youtube.com/embed/kwEZRPkAAu8"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>

<div class="ratio ratio-16-by-9">
  <iframe
    class="ratio-child-stretch"
    src="https://www.youtube.com/embed/qlOTNtUvhe8"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
<div class="ratio ratio-1-by-1">
  <iframe
    class="ratio-child-stretch"
    src="https://www.youtube.com/embed/zHhg5hDs6Q8"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
```

## Parent Classes

### **`.ratio-1-by-1`**

square, parisukat, iskwer. good for vines... if vines never died #ripvine

### **`.ratio-16-by-9`**

Widescreen. good for movie trailers or whatever favorite music video you have. my favorite is a tie beteen Lemonade: A Film by Beyonce or Picha Pie by Parokya ni Edgar

### **`.ratio-4-by-3`**

Basic ass bitch rectangle for basic ass bitch iframes. like basic ass videos or google maps

## Child classes

I say child because if you put more than one bitch and you don't know what the fuck you are doing this boi will shit itself

### **`.ratio-child-contain`**

child element will be centered and will not take dimensions more than its parent

### **`.ratio-child-stretch`**

child element will stretch till it takes the exact amount of dimension. not good for `img` tags but good for iframes and shit

### **`.ratio-child-cover`**

child element will keep its aspect ratio while filling the smallest dimension. good for `img tags`

[Back to TOC](../../../readme.md)
