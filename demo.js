var tts = require('./')

document.body.style.background = '#E74C3C'

trigger()
function trigger () {
  tts({
    background: '#E74C3C',
    foreground: '#ECF0F1',
    accent: '#E74C3C',
    skip: false
  }, function () {
    setTimeout(trigger, 1500)
  })
}
