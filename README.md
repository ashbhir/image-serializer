# Image Serializer
A generic React component which lets the developer tweak the order in which the images on a page should load.

Features:
1. Gives control in developer's hand to decide the order in which the images should load.
2. Provides flexibility to add Placeholder image while the main image loads

# Why not Lazy Load?
There might be use cases where you'd want to lazy load images (loading images as and when they come into viewport). But the problem with lazy loading is that you waste that crucial seconds when user is ideal and not engaged in any activity (not scrolling). Images could have been loaded in that ideal time instead of waiting to come into viewport.

Also, personally it seems a bit absrubtive to me seeing a placeholder everytime I browse through an image.

If you don't know the order in which user might see images on your site (whether he scrolls down or slides through an image slider), I would recommend you go for lazy loading instead.

But if your site has linear scrolling with 1-2 odd sliders I would suggest you try serealizer instead!

Usage
-----

```javascript
import React, { Component } from 'react';
import ImageSerializer from 'imageSerializer';

class ImagesPage extends Component {
  render() {
    return (
        <div class="my-hero-image">
          <ImageSerializer src={{image1}} placeholder={{pImage1}} order="1"/>
        </div>
        <div class="my-list__container">
          <ImageSerializer src={{image2}} placeholder={{pImage1}} order="2"/>
          <ImageSerializer src={{image3}} placeholder={{pImage1}} order="2"/>
        </div>
        <div class="promotional-image">
          <ImageSerializer src={{image4}} placeholder={{pImage2}} order="3"/>
        </div>
    )
  }
}
```
