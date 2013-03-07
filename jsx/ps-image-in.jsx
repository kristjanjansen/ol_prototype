#target 'PhotoShop'

#include '../vendor/Extendables/extendables.jsx';
#include 'utils.jsx';

var items = fetchJSON('127.0.0.1', 8000, 'images/in')

var w = new Window('dialog');
var fileList = w.add('listbox');
for (var i = 0; i < items.length; i++) {
  fileList.add('item', i);
  fileList.items[i].image = File(items[i].filepathThumbnails)
}
var ok = w.add('button', undefined, 'Open');
var cancel = w.add('button', undefined, 'Cancel');

ok.onClick = function () {
  if (fileList.selection) {
  var doc = open(File(items[fileList.selection].filepath))
  doc.info.instructions = JSON.stringify({
    targets: items[fileList.selection].targets
  })
  w.close()
  }
}

cancel.onClick = function () {
  w.close()
}

w.show()


