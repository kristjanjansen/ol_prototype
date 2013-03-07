var fs  = require('fs')
var bogan = require('boganipsum')
var rtf = require('rtf')
var config = require('config');

var utils = require('../js/utils');

var prefix = utils.pluckRandom(config.textPrefixes)

for (var i=1; i < 3; i++) {

  var file = new rtf()
  var content = bogan()
  file.writeText(content)
  
  file.createDocument(function(err, output) {
    var filepath = config.dirTextsIn + '/' + prefix + content.split(' ')[0] + content.split(' ')[1] + '--' + i + '.rtf'
    fs.writeFileSync(filepath.toLowerCase(), output)
  })

};
