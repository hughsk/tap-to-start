module.exports = tapToStart

var domify = require('domify')
var circ = require('eases/circ-out')
var expo = require('eases/expo-in-out')
var SVG = require('svg-create-element')
var raf = require('raf')

function tapToStart (options, done) {
  options = options || {}

  var bgColor = options.background || 'transparent'
  var fgColor = options.foreground || '#000'
  var acColor = options.accent || options.background || '#fff'
  var parentEl = options.parent || document.body
  if (options.skip) return raf(done)

  var container = SVG('svg')
  var pulser = container.appendChild(SVG('circle'))
  var circle = container.appendChild(SVG('circle'))
  var start = Date.now()
  var touchTime = null

  container.style.position = 'absolute'
  container.style.width = '100%'
  container.style.height = '100%'
  container.style.left = 0
  container.style.top = 0
  container.style.background = bgColor
  container.style.cursor = 'pointer'

  circle.setAttribute('r', 50)
  circle.setAttribute('fill', fgColor)
  pulser.setAttribute('fill', fgColor)

  // Thanks for the icon Nick Bluth!
  // https://thenounproject.com/npbluth/collection/cursors/?oq=cursor&cidx=1&i=415116
  var icon = domify('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><g><path d="M72.3,43.2c-1.1-0.1-2.1,0.1-3,0.5c-0.9-2.5-3.1-4.4-5.9-4.5c-1.3-0.1-2.5,0.2-3.6,0.8c-1.1-1.9-3.1-3.2-5.3-3.4   c-0.9-0.1-1.8,0.1-2.6,0.4v-6.5c0-3.7-2.8-6.7-6.3-6.9c-1.8-0.1-3.6,0.5-4.9,1.8c-1.3,1.2-2.1,3-2.1,4.8v24.6l-1.9-1.7   c-3.1-2.5-5.9-3-8.4-1.6c-1.5,0.9-2.6,2.4-3,4.2c-0.4,1.8-0.1,3.8,1,5.4l15.6,23.5v6.2c0,1.2,1,2.2,2.2,2.2h26.7   c1.2,0,2.2-1,2.2-2.2v-8.3l4.5-8.3c0.8-1.4,1.1-2.9,1.1-4.5V50C78.6,46.4,75.8,43.4,72.3,43.2z M74.6,61.1l-0.4,8.7   c0,0.9-0.2,1.7-0.6,2.4L68.8,81c-0.2,0.3-0.3,0.7-0.3,1v6.7H46.2V84c0-0.4-0.1-0.8-0.4-1.2l-16-24c-0.4-0.6-0.5-1.3-0.4-2   c0.1-0.3,0.3-1,1-1.4c0.4-0.2,1.2-0.7,3.5,1.1l3.7,3.2c0.6,0.6,1,1.4,1,2.2v1.4c0,1.2,1,2.2,2.2,2.2s2.2-1,2.2-2.2v-3.7V57V30.3   c0-0.6,0.3-1.2,0.7-1.7c0.5-0.4,1.1-0.7,1.7-0.6c1.2,0.1,2.2,1.2,2.2,2.5v7.8v4.9v10.1c0,1.2,1,2.2,2.2,2.2c1.2,0,2.2-1,2.2-2.2   v-10c0-0.6,0.3-1.2,0.7-1.7c0.4-0.4,1.1-0.7,1.7-0.6c1.2,0.1,2.2,1.2,2.2,2.5v0.6v1.7v7.6c0,1.2,1,2.2,2.2,2.2c1.2,0,2.2-1,2.2-2.2   v-7.6c0-0.6,0.3-1.2,0.7-1.7c0.5-0.4,1.1-0.6,1.7-0.6c1.2,0.1,2.2,1.2,2.2,2.5v1v2.7v6.5c0,1.2,1,2.2,2.2,2.2c1.2,0,2.2-1,2.2-2.2   v-6.5c0-0.6,0.3-1.2,0.7-1.7c0.5-0.4,1.1-0.6,1.7-0.6c1.2,0.1,2.2,1.2,2.2,2.5V61.1z"></path><path d="M45,18.5c1.1,0,2-0.9,2-1.9V7.8c0-1.1-0.9-2-2-2s-2,0.9-2,2v8.7C43,17.6,43.9,18.5,45,18.5z"></path><path d="M53.9,21.2c0.5,0,1-0.2,1.4-0.6l6.2-6.2c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0l-6.2,6.2c-0.8,0.8-0.8,2,0,2.8   C52.9,21,53.4,21.2,53.9,21.2z"></path><path d="M34.7,20.6c0.4,0.4,0.9,0.6,1.4,0.6s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8l-6.2-6.2c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L34.7,20.6z"></path><path d="M34.3,27.1c0-1.1-0.9-2-2-2h-8.8c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h8.8C33.4,29.1,34.3,28.2,34.3,27.1z"></path><path d="M55.5,27.1c0,1.1,0.9,2,2,2h8.8c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2h-8.8C56.4,25.1,55.5,26,55.5,27.1z"></path></g></svg>')
    .querySelector('g')

  var iconPaths = icon.querySelectorAll('path')
  for (var i = 0; i < iconPaths.length; i++) {
    iconPaths[i].setAttribute('fill', acColor)
  }
  container.appendChild(icon)
  icon.setAttribute('opacity', 0.9)

  render()
  resize()

  parentEl.appendChild(container)

  window.addEventListener('resize', resize, false)
  window.addEventListener('touchstart', tap, false)
  window.addEventListener('mousedown', tap, false)

  function tap (e) {
    window.removeEventListener('touchstart', tap, false)
    window.removeEventListener('mousedown', tap, false)
    touchTime = Date.now()
    done()
    e && e.preventDefault()
    return false
  }

  function render () {
    var currTime = Date.now()
    if (touchTime && currTime - touchTime > 800) return cleanup()
    raf(render)

    var tp = circ(((currTime - start - 350) / 1500) % 1) || 0
    var tt = expo(Math.max(0, (currTime - touchTime) / 800)) || 0
    var ts = expo(Math.min(1, (currTime - start) / 500)) || 0

    if (touchTime !== null) {
      var tt1 = Math.min(1, tt * 2)
      var tt2 = Math.max(0, tt * 2 - 1)

      circle.setAttribute('r', 50 * (1 - tt))
      icon.setAttribute('opacity', 1 - tt1)
      container.style.opacity = 1 - tt2
    } else {
      tt = 0
      circle.setAttribute('r', 50 * ts)
      icon.setAttribute('opacity', ts)
    }

    pulser.setAttribute('opacity', ts * (1 - tp) * 0.5 * (1 - tt))
    pulser.setAttribute('r', 50 + tp * 70)
  }

  function cleanup () {
    window.removeEventListener('resize', resize, false)
    document.body.removeChild(container)
  }

  function resize () {
    circle.setAttribute('cx', window.innerWidth / 2)
    circle.setAttribute('cy', window.innerHeight / 2)
    pulser.setAttribute('cx', window.innerWidth / 2)
    pulser.setAttribute('cy', window.innerHeight / 2)

    var ix = window.innerWidth / 2 - 37
    var iy = window.innerHeight / 2 - 36
    icon.setAttribute('transform', 'translate(' + ix + ',' + iy + ') scale(0.7)')
  }
}
