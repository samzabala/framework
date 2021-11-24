# Asset

Markup to display files, or `figure`s but fancier

A typical setup could look like this

```html
<div class="asset">
  <div class="asset-thumbnail">
    <span class="asset-image asset-image-default"></span>
  </div>
  <a href="#" class="asset-delete btn btn-symbo btn-small btn-secondary">
    <i class="symbol symbol-close"></i>
  </a>
  <p class="asset-title">bitch-ass.probablyavirus</p>
  <p class="asset-caption">69kb</p>
</div>
```

![Ass...ets](../../images/assets.png)

# Classes

## `.asset`

Containing element

## `.asset-thumbnail`

Container of thumbnail. can contain either an `<img>` for a thumbnail or the helper class `.asset-image`

## `.asset-image`

helper that can display a css coded thumbnail for file types. append one of of the classes below to this to work:

### supported file type classes:

<table>
  <thead>
    <tr>
      <th>asset-image-class</th>
      <th>file types suggested for..</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>.asset-image-default</code></td>
      <td>anything duh</td>
    </tr>
    <tr>
      <td><code>.asset-image-audio</code></td>
      <td>wav,mp3,wma if that still exists, m4a etc.</td>
    </tr>
    <tr>
      <td><code>.asset-image-code</code></td>
      <td>json,css,html,xml etc</td>
    </tr>
    <tr>
      <td><code>.asset-image-text</code></td>
      <td>txt or rich text idk</td>
    </tr>
    <tr>
      <td><code>.asset-image-doc</code></td>
      <td>doc,docx etc</td>
    </tr>
    <tr>
      <td><code>.asset-image-font</code></td>
      <td>otf,ttf eot etc</td>
    </tr>
    <tr>
      <td><code>.asset-image-img</code></td>
      <td>jpg,png,gif,tiff,bmp etc</td>
    </tr>
    <tr>
      <td><code>.asset-image-ps</code></td>
      <td>psd,psb,raw,pxr</td>
    </tr>
    <tr>
      <td><code>.asset-image-ai</code></td>
      <td>ai</td>
    </tr>
    <tr>
      <td><code>.asset-image-xd</code></td>
      <td>xd</td>
    </tr>
    <tr>
      <td><code>.asset-image-pdf</code></td>
      <td>duh</td>
    </tr>
    <tr>
      <td><code>.asset-image-id</code></td>
      <td>indd,indb,idml,indl,indt,xqx,pmd,inx</td>
    </tr>
    <tr>
      <td><code>.asset-image-table</code></td>
      <td>excel files, csv,tsv..</td>
    </tr>
    <tr>
      <td><code>.asset-image-video</code></td>
      <td>mp4, quicktime etc</td>
    </tr>
    <tr>
      <td><code>.asset-image-zip</code></td>
      <td>zip.. probably a rar file tooo idk</td>
    </tr>
  </tbody>
</table>

Also if you wanna use some of these styles but then don't like the extension, you can override it with `[data-asset-extension]`


```html
<div class="asset">
  <div class="asset-thumbnail">
    <span data-asset-extension="CSV" class="asset-image asset-image-table"></span>
  </div>
</div>
```

## `.asset-delete` and `[data-toggle="asset-close"]`

Bitches been deprecated. never use it again

## `.asset-functions` and `.asset-function`

`.asset-functions` is used to style and contain functionalities you want an asset to have.

wrap form controllers or buttons innit with `.asset-function`

```html
<div class="asset">
  <div class="asset-thumbnail">
    <span class="asset-image asset-image-default"></span>
  </div>
  <div class="asset-functions">
    <!-- Delete -->
    <div class="asset-function">
      <a href="#" class="btn btn-symbol btn-round btn-small btn-secondary">
        <i class="symbol symbol-delete"></i>
      </a>
    </div>
    <!-- Edit -->
    <div class="asset-function">
      <a href="#" class="btn btn-symbol btn-round btn-small btn-secondary">
        <i class="symbol symbol-edit"></i>
      </a>
    </div>
  </div>
  <p class="asset-title">bitch-ass.probablyavirus</p>
  <p class="asset-caption">69kb</p>
</div>
```

## `.asset-title` and `.asset-caption`

duh

[Back to TOC](../../../readme.md)
