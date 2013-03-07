function fetchJSON(host, port, path) {
  var conn = new Socket;
  if (conn.open(host + ':' + port)) {
      conn.write('GET /' + path + ' HTTP/1.0\n\n');
      var reply = conn.read(999999);
      conn.close();
      var body = reply.toString().split('\n\n')[1]
      return JSON.parse(body)
  } else {
    alert(conn.error)
    return {}
  }
}


function addFramePhotoAuthor(frame, height, width) {
  var source = frame.geometricBounds
  var gb = [
    source[0] - height,
    source[3] - width,
    source[0],
    source[3]
    ]
  var page = app.activeDocument.pages.item(0);
  var frame = page.textFrames.add({
    geometricBounds: gb, 
    contents: frame.images[0].itemLink.linkXmp.author, 
  });
}