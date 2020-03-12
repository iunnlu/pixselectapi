//For streaming to rtsp links.
Stream = require('node-rtsp-stream')

function stream1(){
  //Create a new stream.
  stream = new Stream({
    name: 'stream1',
    streamUrl: 'rtsp://freja.hiof.no:1935/rtplive/definst/hessdalen03.stream',
    wsPort: 9998,  //Stream port
    ffmpegOptions: { 
      '-stats': '',
      '-r': 30
    }
  })
}

function stream2(){
  stream = new Stream({
    name: 'stream2',
    streamUrl: 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov',
    wsPort: 9999,
    ffmpegOptions: {
      '-stats': '',
      '-r': 30
    }
  })
}

module.exports = {
  stream1, stream2
}