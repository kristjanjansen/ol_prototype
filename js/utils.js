path = require('path')
var im = require('imagemagick');

exports.pluckRandom = function(array) {
   return array[Math.floor(Math.random() * array.length)];
}

exports.generateThumbnail = function(filePath, thumbPath, thumbExt, callback) {
  var file = path.basename(filePath)
  var thumbFilePath = thumbPath + '/' + file.replace(path.extname(filePath), '.' + thumbExt)
  console.log(filePath)
  console.log(thumbFilePath)
  im.convert([filePath, '-resize', '100x100^', '-gravity', 'center', '-crop', '100x100+0+0', thumbFilePath], function(e, so, se) {
    callback()
  });       
}