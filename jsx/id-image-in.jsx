#targetengine "session"

#include '../vendor/Extendables/extendables.jsx';
#include 'utils.jsx';

var items = fetchJSON('127.0.0.1', 8000, 'images/out')

var w = new Window('palette');
var fileList = w.add('listbox');
for (var i = 0; i < items.length; i++) {
  fileList.add('item', items[i].file);
//  fileList.items[i].image = File(items[i].filepathThumbnails)
}
var ok = w.add('button', undefined, 'Open');
var cancel = w.add('button', undefined, 'Cancel');

ok.onClick = function () {
  w.close()
  placeImage(items[fileList.selection.index])  
}

cancel.onClick = function () {
  w.close()
}

w.show()

function placeImage(file) {
  var imageFrame = app.selection[0]
  imageFrame.place(File(file.filepath));
}
