# Symbol

**`.symbol`** adds css built characters ready for your iconography

```html
<p>Edit <i class="color-primary symbol symbol-edit"></i></p>
```

You can make a symbol appear by appending a class of `symbol-{NAME}` to `.symbol`

## Valid Symbol Names

- `1p21`
- `play`
- `pause`
- `stop`
- `square`
- `square-outline`
- `checkbox`
- `checkbox-inverse`
- `addbox`
- `addbox-inverse`
- `grid`
- `list`
- `search`
- `plus`
- `minus`
- `check`
- `close`
- `thumbs-up`
- `thumbs-up-inverse`
- `thumbs-down`
- `thumbs-down-inverse`
- `star`
- `star-half`
- `star-stroke`
- `kebab-vertical`
- `kebab-horizontal`
- `upload`
- `download`
- `arrow-down`
- `arrow-up`
- `arrow-left`
- `arrow-right`
- `arrow-double-down`
- `arrow-double-up`
- `arrow-double-left`
- `arrow-double-right`
- `arrow-tail-down`
- `arrow-tail-up`
- `arrow-tail-left`
- `arrow-tail-right`
- `caret-down`
- `caret-up`
- `caret-left`
- `caret-right`
- `text-center`
- `text-left`
- `text-right`
- `text-justify`
- `map`
- `pin`
- `bell`
- `bell-active`
- `hyperlink`
- `dash`
- `caution`
- `error`
- `info`
- `success`
- `stack`
- `clap`
- `copy`
- `share`
- `filter`
- `chart`
- `segment`
- `user`
- `user-add`
- `user-remove`
- `expand`
- `collapse`
- `expand-alt`
- `collapse-alt`
- `burger`
- `fries`
- `waffle`
- `pencil`
- `edit`
- `delete`
- `robot`
- `file`
- `clipboard`
- `paperplane`
- `timer`
- `time`
- `caution-inverse`
- `error-inverse`
- `info-inverse`
- `success-inverse`
- `phone`
- `calendar`
- `calendar-alt`
- `paperclip`
- `envelope`
- `envelope-inverse`

![](../../images/symbol.png)

## Toggle classes

The symbols be toggled to another symbol class when a direct parent has a class of either `.active` or `.open` by just adding a class with the suffix `-toggle` to a symbol class (eg. `symbol-{NAME}-toggle`)

```html
<ul>
  <li>
    when this li is active,. the caret switchs from right to left O: &nbsp;<i
      class="color-primary symbol symbol-caret-right  symbol-caret-left-toggle"
    ></i>
  </li>
</ul>
```

[Back to TOC](../../../readme.md)
