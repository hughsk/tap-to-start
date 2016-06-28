# tap-to-start

A simple fullscreen button to prompt the user to tap/click. Useful for audio/video demos, where mobile devices require playback to be triggered in response to user input.

[![](http://i.imgur.com/Xex2wpJ.png)](http://hughsk.io/tap-to-start/)

[**view demo**](http://hughsk.io/tap-to-start/)

## Usage

### `tapToStart(options, done)`

Creates a new `tap-to-start` overlay. Accepts the following options:

* `foreground`: the color of the foreground circle. Defaults to `#000`.
* `background`: the color of the background. Defaults to `transparent`.
* `accent`: the color of the tap icon. Defaults to `background`, or `#fff` if not specified.
* `skip`: if truthy, skip the UI and call `done` in the next frame. Useful if you only want the UI to be visible if user input is required to continue.
* `parent`: optional, defaults to `document.body`. Set the element the button is attached to

`done` is called when the UI is tapped/clicked and begins to transition out.

``` javascript
const tts = require('tap-to-start')
const audio = document.createElement('audio')

audio.src = 'song.mp3'
audio.load()

tts({
  background: '#000',
  foreground: '#fff'
}, function () {
  audio.play()
})
```

## License

MIT, see [LICENSE.md](LICENSE.md) for details.
