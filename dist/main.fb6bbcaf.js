// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/PricingComponent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PricingComponent = /*#__PURE__*/function () {
  function PricingComponent() {
    _classCallCheck(this, PricingComponent);

    // dom caching 
    this.app = document.querySelector(".card");
    this.numberOfViews = this.app.querySelector(".card__heading-digit");
    this.price = this.app.querySelector(".card__pricing-digit");
    this.pricingMode = this.app.querySelector(".card__heading-interval");
    this.sliderInput = this.app.querySelector(".card__slider-input");
    this.sliderBar = this.app.querySelector(".card__slider-bar");
    this.sliderBarBg = this.app.querySelector(".card__slider-bar-inner");
    this.toggleBg = this.app.querySelector(".card__toggle-background"); // toggle 

    this.toggleInputRight = this.app.querySelector(".card__toggle-input--right");
    this.toggleInputLeft = this.app.querySelector(".card__toggle-input--left");
    this.toggleSwitch = this.app.querySelector(".card__toggle-switch");
    this.toggleRightLabel = this.app.querySelector(".card__toggle-title--right");
    this.toggleLeftLabel = this.app.querySelector(".card__toggle-title--left"); // booleans

    this.yearlyBilling = false; //render 

    this.render();
  } // binding events 


  _createClass(PricingComponent, [{
    key: "bindEventListner",
    value: function bindEventListner() {
      var _this = this;

      // slider related events 
      this.sliderInput.addEventListener("change", function (event) {
        _this.updateSlider(event);

        console.log(event);
      }); // toggle functionality 

      this.toggleInputLeft.addEventListener("click", function () {
        _this.toggleLeft();

        _this.updatePrice(_this.fliterPriceInput());
      });
      this.toggleInputRight.addEventListener("click", function () {
        _this.toggleRight();

        _this.updatePrice(_this.fliterPriceInput());
      });
    } // render 

  }, {
    key: "render",
    value: function render() {
      this.bindEventListner();
    } // updating the slider  

  }, {
    key: "updateSlider",
    value: function updateSlider(event) {
      var value = this.sliderInput.value;
      this.sliderInput.setAttribute("value", value);
      this.updateRangeBg();
      this.updatePrice(this.fliterPriceInput());
      this.updatePageView(this.adjustNumberOfviews(this.fliterPriceInput()));
    } // toggling 

  }, {
    key: "toggleLeft",
    value: function toggleLeft() {
      this.yearlyBilling = false;
      this.toggleSwitch.classList.remove("card__toggle-switch--active");
      this.toggleLeftLabel.classList.add("underline");
      this.toggleRightLabel.classList.remove("underline");
      this.toggleBg.classList.remove("card__toggle-background--active");
    }
  }, {
    key: "toggleRight",
    value: function toggleRight() {
      this.yearlyBilling = true;
      this.toggleSwitch.classList.add("card__toggle-switch--active");
      this.toggleRightLabel.classList.add("underline");
      this.toggleLeftLabel.classList.remove("underline");
      this.toggleBg.classList.add("card__toggle-background--active");
    } // update range backgorund 

  }, {
    key: "updateRangeBg",
    value: function updateRangeBg() {
      this.sliderBarBg.style.width = "".concat((this.sliderInput.value - 8) / (36 - 8) * 100, "%");
    } // adjusting the number of views 

  }, {
    key: "adjustNumberOfviews",
    value: function adjustNumberOfviews(value) {
      switch (parseInt(value)) {
        case 8:
          return 10;

        case 12:
          return 50;

        case 16:
          return 100;

        case 20:
          return 500;

        case 24:
          return 500;

        case 28:
          return 1000;

        case 32:
          return 1000;

        case 36:
          return 1000;

        default:
          throw Error("No mach was found for the value ".concat(value));
      }
    } // filter the values of the range input to match the custom format

  }, {
    key: "fliterPriceInput",
    value: function fliterPriceInput() {
      var rangeValue = parseInt((this.sliderInput.value - 8) / (36 - 8) * 100);

      if (0 < rangeValue && rangeValue < 10) {
        return 8;
      } else if (10 <= rangeValue && rangeValue <= 20) {
        return 12;
      } else if (20 <= rangeValue && rangeValue <= 30) {
        return 16;
      } else if (30 <= rangeValue && rangeValue <= 60) {
        return 24;
      } else if (60 <= rangeValue && rangeValue <= 100) {
        return 36;
      } else {
        throw Error("value ".concat(rangeValue, " is not supported."));
      }
    } // set pageview

  }, {
    key: "updatePageView",
    value: function updatePageView() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var prefix;
      value >= 1000 ? (prefix = "M", value /= 1000) : prefix = 'K';
      value ? this.numberOfViews.textContent = "".concat(value + prefix) : "";
    } // set price

  }, {
    key: "updatePrice",
    value: function updatePrice() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.yearlyBilling ? value *= 0.75 : "";
      value ? this.price.textContent = "$".concat(value, ".00") : "";
    }
  }]);

  return PricingComponent;
}();

exports.default = PricingComponent;
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

var _PricingComponent = _interopRequireDefault(require("./PricingComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function () {
  document.addEventListener("DOMContentLoaded", function () {
    var pricingComponent = new _PricingComponent.default();
  });
}();
},{"./PricingComponent":"js/PricingComponent.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54355" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map