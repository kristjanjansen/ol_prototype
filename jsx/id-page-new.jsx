#targetengine "session";

#include '../vendor/Extendables/extendables.jsx';
#include 'utils.jsx';

var config = fetchJSON('127.0.0.1', 8000, 'config')
var templates = fetchJSON('127.0.0.1', 8000, 'pages/templates')

var w = new Window('palette');

var text_group = w.add('group');

text_group.add('statictext', undefined, 'From:');
var from = text_group.add('edittext', undefined, '');
from.characters = 2;

text_group.add('statictext', undefined, 'To:');
var to = text_group.add('edittext', undefined, '');
from.characters = 2;

var radio_group = w.add ('panel');
radio_group.alignChildren = 'left';

var i = 0
templates.forEach(function(item) {
  radio_group.add('radiobutton', undefined, templates[i++].title);
})
radio_group.children[0].value = true;


var ok = w.add('button', undefined, 'OK');
var cancel = w.add('button', undefined, 'Cancel');

// Set active field

from.active = true;

function getFilepath() {
  for (var i = 0; i < radio_group.children.length; i++) 
  if (radio_group.children[i].value == true) return templates[i].filepath; 
}

ok.onClick = function() {
  if (from.text > 0) {
    w.close()
    app.open(File(getFilepath()))
    app.activeDocument.save(new File(config.dirPagesWork + '/' + from.text + ((to.text > 0) ? '-' + to.text : '') + '.indd'));
  }
}

cancel.onClick = function () {
  w.close()
}

w.show()


