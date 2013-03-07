var fs = require('fs')
var tako = require('tako')
var app = tako()
var glob = require("glob")

var utils = require("./js/utils")

var config = require('config');

app.route('/config').json({
  dirImagesOut: config.dirRoot + '/' + config.dirImagesOut, 
  dirTextsIn: config.dirRoot + '/' + config.dirTextsIn, 
  dirPagesWork: config.dirRoot + '/' + config.dirPagesWork 
})


app.route('/images/in').json(function(req, resp) {
  glob(config.dirImagesIn + '/*.jp*g', function (e, files) {
   var f = files.map(function(item) {
     var el = item.split('/')
     item = el[el.length - 1]
     var columns = utils.pluckRandom([1,2,3]) 
     return {
       filepath : config.dirRoot + '/' + config.dirImagesIn + '/' + item,
       filepathThumbnails : config.dirRoot + '/' + config.dirImagesInThumbnails + '/' + item,
       targets: [
        {fileOut: utils.pluckRandom([2,3,4,5]) + '-' + utils.pluckRandom([1,2,3])}
       ]
     }
   })
   resp.end(f)
  })
})


app.route('/images/out').json(function(req, resp) {
  glob(config.dirImagesOut + '/*.tif*', function (e, files) {
   var f = files.map(function(item) {
     var el = item.split('/')
     item = el[el.length - 1]
     return {
       file : item,
       filepath : config.dirRoot + '/' + config.dirImagesOut + '/' + item,
       filepathThumbnails : config.dirRoot + '/' + config.dirImagesInThumbnails + '/' + item.replace('tif', 'jpg')
     }
   })
   resp.end(f)
  })
})


app.route('/texts').json(function(req, resp) {
  glob(config.dirTextsIn + '/*.rtf', function (e, files) {
   var f = files.map(function(item) {
     var el = item.split('/')
     item = el[el.length - 1]
     var parts = item.split('--')
     return {
       filepath : config.dirRoot + '/' + config.dirTextsIn + '/' + item,
       title: parts[0],
       id: parts[1].split('.')[0]
     }
   })
   resp.end(f)
  })
})

app.route('/pages/templates').json(function(req, resp) {
  glob(config.dirPagesTemplates + '/*.indt', function (e, files) {
   var f = files.map(function(item) {
     var el = item.split('/')
     item = el[el.length - 1]
     return {
       filepath : config.dirRoot + '/' + config.dirPagesTemplates + '/' + item,
       title: item.replace('.indt',''),
     }
   })
   resp.end(f)
  })
})

app.httpServer.listen(config.port)
