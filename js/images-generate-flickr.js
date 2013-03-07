var fs = require('fs');
var each = require('each');
var request = require('request');
var ex = require('exiv2');
var im = require('imagemagick');
var config = require('config');

var utils = require('../js/utils');

flickr = require('flickr').Flickr;
client = new flickr(config.flickrKey, config.flickrSecret);

var rows = []
client.executeAPIRequest("flickr.photos.search",{tags: config.flickrTags, per_page: 3, extras: 'owner_name,url_m'}, false, function(e, r, b) {
 
  each(r.photos.photo)
  .on('item', function(item, index, next) {
      var file = item.id + '.jpg'
      var filepath = config.dirImagesIn + '/' + file
      
      // Fetch the image
      
      request(item.url_m, function(e, r, b) {
        
        // Set author name
        
        var author = item.ownername.split(' ')[0] ? item.ownername.split(' ')[0] : ''
        author +=  item.ownername.split(' ')[1] ? ' ' + item.ownername.split(' ')[1] : ''
      
        ex.setImageTags(filepath, {'Iptc.Application2.Byline' : author.toUpperCase()}, function(err) {
        
          // Generate thumbnail
          utils.generateThumbnail(filepath, config.dirImagesInThumbnails, config.thumbnailsExt, function() {
            setTimeout(next, 0)
          })

        });        
    
      }) 
      .pipe(fs.createWriteStream(filepath))
  })

})

