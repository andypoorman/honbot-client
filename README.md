HonBot-Client [![devDependency Status](https://david-dm.org/scttcper/honbot-client/dev-status.svg)](https://david-dm.org/scttcper/honbot-client#info=devDependencies)
=============
HonBot is a [Heroes of Newerth (HoN)](http://www.heroesofnewerth.com/) statistics website for the [HoN API](http://api.heroesofnewerth.com/).
This repo contains the frontend for honbot.com. The backend can be found in [honbot-server](https://github.com/scttcper/honbot-server).

##Installation
```bash
npm install gulp -g
npm install bower -g
npm install
bower install
gulp serve
```

##Helper Scripts
These are used to update images
#### large_hero
Run this to download all large image cutouts for the homepage. Will output a txt file with paths to images. Place this in largeHero.js.
Also downloads hero icons and creates and object of hero names. Using pngquant to squash the images never hurts.
```bash
find . -name '*.png' -print0 | xargs -0 -P8 -L1 pngquant --ext .png --force 256
```

#### item_setup
downloads icon images and creates json object in items.txt. Place in itemlist.js