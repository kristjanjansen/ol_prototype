### Requirements

#### Image toolkits

##### On Debian/Ubuntu

```
apt-get install libexiv2 libexiv2-dev
apt-get install imagemagick
```

##### On OSX

```
brew install pkg-config exiv2
brew install imagemagick
```

For other systems see [exiv2](http://www.exiv2.org/download.html) and [imagemagick](http://www.imagemagick.org/script/binary-releases.php) download pages.

#### Node

You need NodeJS and npm installed

### Installation

```
npm install
```

### Configuration

Create file ```config/default.json``` with following contents (fill with your values):

```
{
  "port": "",
  "dirRoot": "",
  "dirImagesIn": "",
  "dirImagesOut": "",
  "dirImagesInThumbnails": "",
  "dirTextsIn": "",
  "dirPagesTemplates": "",
  "dirPagesWork": "",
  "thumbnailsExt": "",
  "spUrl": "",
  "spSessionId": "",
  "spMax": "",
  "spOffset": "",
  "flickrKey": "",  
  "flickrSecret": "",
  "flickrTags": "",
  "textPrefixes": ["""]
}
```

### Run server

```
node app
```

### Generate sample data

#### Sample images

Generate images via SP or Flickr (make sure you have correct keys in config):

```
node js/images-generate-sp.js
```
or
```
node js/images-generate-flickr.js
```

#### Sample texts

Run
```
node js/texts-generate.js
```

### Use with Adobe CS suite

Run various scripts from ```jsx``` directory.

