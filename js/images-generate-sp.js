var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var each = require('each')
var config = require('config');

var utils = require('../js/utils');

var j = request.jar()
var cookie = request.cookie('PHPSESSID=' + config.spSessionId)
j.add(cookie)

var ids = []
for (var i = 1 + config.spOffset; i < config.spMax + 1 + config.spOffset; i++) {
  ids.push(i)
};

spSetup(function() {

  each(ids)
  .on('item', function(el, index, next) {
    spGetPic(el, function() {
      setTimeout(next, 100)
    })
  })  

});




function spSetup(callback) {

  var form = {
    ListOne: 10, // or 29
  }
  request.post({url: config.spUrl, jar: j, form: form}, function (e, r, b) {
    callback()
  })

}


function spGetPic(index, callback) {

  var form = {
    PicNum: index,
    ToPage: 0,
    ShowSel: 0,
    ListOne: 0,
    SelViewMode: 26,
    select: 1,
    SearchFrom: 0,
    SearchTo: 2,
    SessType: 'local',
    own_10: 1
  }

  request.post({url: config.spUrl, jar: j, form: form}, function (e, r, b) {
    if (e) throw e; 

    $ = cheerio.load(b);
  
    var url = $('#viewxframe img').first().attr('src')
    var file = $('#viewxframe div').eq(1).find('strong').parent().html().split('<br>')[2]
    var filepath = config.dirImagesIn + '/' + file
 
    request.post({url: url, jar: j}, function(err, r, b) {
      utils.generateThumbnail(filepath, config.dirImagesInThumbnails, config.thumbnailsExt, function() {
        callback()
      })
    }).pipe(fs.createWriteStream(filepath))
  
  })

}
