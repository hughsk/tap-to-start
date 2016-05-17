(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./":2}],2:[function(require,module,exports){
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

  document.body.appendChild(container)

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

},{"domify":4,"eases/circ-out":5,"eases/expo-in-out":6,"raf":7,"svg-create-element":9}],3:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){

/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Tests for browser support.
 */

var innerHTMLBug = false;
var bugTestDiv;
if (typeof document !== 'undefined') {
  bugTestDiv = document.createElement('div');
  // Setup
  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
  // Make sure that link elements get serialized correctly by innerHTML
  // This requires a wrapper element in IE
  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
  bugTestDiv = undefined;
}

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  // for script/link/style tags to work in IE6-8, you have to wrap
  // in a div with a non-whitespace character in front, ha!
  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
};

map.td =
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option =
map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead =
map.tbody =
map.colgroup =
map.caption =
map.tfoot = [1, '<table>', '</table>'];

map.polyline =
map.ellipse =
map.polygon =
map.circle =
map.text =
map.line =
map.path =
map.rect =
map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

/**
 * Parse `html` and return a DOM Node instance, which could be a TextNode,
 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
 * instance, depending on the contents of the `html` string.
 *
 * @param {String} html - HTML string to "domify"
 * @param {Document} doc - The `document` instance to create the Node for
 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
 * @api private
 */

function parse(html, doc) {
  if ('string' != typeof html) throw new TypeError('String expected');

  // default to the global `document` object
  if (!doc) doc = document;

  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) return doc.createTextNode(html);

  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = doc.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = doc.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  // one element
  if (el.firstChild == el.lastChild) {
    return el.removeChild(el.firstChild);
  }

  // several elements
  var fragment = doc.createDocumentFragment();
  while (el.firstChild) {
    fragment.appendChild(el.removeChild(el.firstChild));
  }

  return fragment;
}

},{}],5:[function(require,module,exports){
function circOut(t) {
  return Math.sqrt(1 - ( --t * t ))
}

module.exports = circOut
},{}],6:[function(require,module,exports){
function expoInOut(t) {
  return (t === 0.0 || t === 1.0)
    ? t
    : t < 0.5
      ? +0.5 * Math.pow(2.0, (20.0 * t) - 10.0)
      : -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0
}

module.exports = expoInOut
},{}],7:[function(require,module,exports){
(function (global){
var now = require('performance-now')
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function() {
  root.requestAnimationFrame = raf
  root.cancelAnimationFrame = caf
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"performance-now":8}],8:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.7.1
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

}).call(this,require('_process'))
},{"_process":3}],9:[function(require,module,exports){
var has = require('has');

module.exports = function (name, attr) {
    var elem = document.createElementNS('http://www.w3.org/2000/svg', name);
    if (!attr) return elem;
    for (var key in attr) {
        if (!has(attr, key)) continue;
        var nkey = key.replace(/([a-z])([A-Z])/g, function (_, a, b) {
            return a + '-' + b.toLowerCase();
        });
        elem.setAttribute(nkey, attr[key]);
    }
    return elem;
}

},{"has":10}],10:[function(require,module,exports){
var hasOwn = Object.prototype.hasOwnProperty;


module.exports = function has(obj, property) {
  return hasOwn.call(obj, property);
};

},{}]},{},[1]);
