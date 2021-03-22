# Zone

The box that looks like you can drag something into it or it looks empty as shit idk

```html
<div class="zone zone-default">
  Sup motherfucker I'm an zone and I'm here to fuck up your life
</div>
```

Kick it up a notch byu adding an `input[type="file"]` in it

```html
<div class="zone zone-default">
  <input type="file" />
  <span class="zone-text"> Drag and drop attachments here </span>
</div>
```

## Classes

### `.zone`

duh

### `.zone-text`

duh. useful when you are implementing an input field. when there are files in the input field, this will be hidden in place of a file count for user feedback. don't wrap your text with this if you dont want it hiding

![zone](../../images/zone.png)

## Color classes

Other styles are available in the framework aside from `.zone-default`

These are valid color classes for your boi

- `.zone-primary`
- `.zone-secondary`
- `.zone-accent`
- `.zone-neutral`
- `.zone-error`
- `.zone-caution`
- `.zone-success`

![zone](../../images/zone-colors.png)

[More info on colors](../../sections/scaffolding/colors.md)

## Size classes

`.zone` supports sizes by adding `zone-large` or `zone-small` to its classes

[Back to TOC](../../../readme.md)
