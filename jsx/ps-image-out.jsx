#target 'PhotoShop'

#include '../vendor/Extendables/extendables.jsx';
#include 'utils.jsx';

var config = fetchJSON('127.0.0.1', 8000, 'config')
var target = JSON.parse(app.activeDocument.info.instructions).targets[0]

var file = File(config.dirImagesOut + '/' + target.fileOut)

tiffSaveOptions = new TiffSaveOptions();
tiffSaveOptions.byteOrder = ByteOrder.IBM;
tiffSaveOptions.embedColorProfile = true;
tiffSaveOptions.imageCompression = TIFFEncoding.TIFFLZW;
tiffSaveOptions.layers = false;
tiffSaveOptions.spotColors = false;
tiffSaveOptions.transparency = true;
tiffSaveOptions.alphaChannels = true;

app.activeDocument.saveAs(file, tiffSaveOptions, true, Extension.LOWERCASE);

alert(file + 'saved')

  