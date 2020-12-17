(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("frameWork", [], factory);
	else if(typeof exports === 'object')
		exports["frameWork"] = factory();
	else
		root["fw"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => /* binding */ framework_webpack
});

// EXTERNAL MODULE: ./js/src/util/core.js
var core = __webpack_require__(6);
// EXTERNAL MODULE: ./js/src/util/initiator.js
var initiator = __webpack_require__(7);
// EXTERNAL MODULE: ./js/src/data-helper/event.js
var data_helper_event = __webpack_require__(8);
// EXTERNAL MODULE: ./js/src/data-helper/dom.js
var dom = __webpack_require__(10);
// EXTERNAL MODULE: ./js/src/data-helper/string.js
var string = __webpack_require__(11);
// EXTERNAL MODULE: ./js/src/classes/component.js
var component = __webpack_require__(12);
// EXTERNAL MODULE: ./js/src/util/ui.js
var ui = __webpack_require__(14);
;// CONCATENATED MODULE: ./js/src/util/breakpoint.js
var BrValue = {
  xxs: 0,
  xs: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fw-br-xs')) || 600,
  sm: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fw-br-sm')) || 1200,
  md: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fw-br-md')) || 1600,
  lg: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fw-br-lg')) || 1800,
  xl: 9999999
};
var BrTag = Object.keys(BrValue); // Br_to_loop =  ['xs','sm','md','lg'];

var BrMobileMax = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fw-br-mobile-max')) || 'sm';

var ValidateBr = function ValidateBr(breakpoint, mode) {
  mode = mode || 'below'; //below,within,above

  var currIndex = BrTag.indexOf(breakpoint);

  switch (mode) {
    case 'below':
      //max-width
      return document.documentElement.clientWidth <= BrValue[breakpoint];

    case 'within':
      return document.documentElement.clientWidth <= BrValue[breakpoint] && document.documentElement.clientWidth > BrValue[BrTag[currIndex - 1]];

    case 'above':
      return currIndex > 0 ? document.documentElement.clientWidth > BrValue[BrTag[currIndex - 1]] : document.documentElement.clientWidth > BrValue[BrTag[currIndex]];
  }
};
;// CONCATENATED MODULE: ./js/src/accordion.js
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }









var NAME = 'accordion';
var ARG_ATTRIBUTE_NAME = "" + NAME;
var TOGGLE_MODE = "" + NAME;
var COMPONENT_CLASS = "" + string.default.ToDashed(NAME);
var ACTIVATED_CLASS = "open";
var DATA_KEY = core.default.settings.prefix + "." + NAME;
var EVENT_KEY = "." + DATA_KEY;
var EVENT_CLICK = "click" + EVENT_KEY;
var EVENT_BEFORE_CLOSE = "before_close" + EVENT_KEY;
var EVENT_CLOSE = "close" + EVENT_KEY;
var EVENT_AFTER_CLOSE = "after_close" + EVENT_KEY;
var EVENT_BEFORE_OPEN = "before_open" + EVENT_KEY;
var EVENT_OPEN = "open" + EVENT_KEY;
var EVENT_AFTER_OPEN = "after_open" + EVENT_KEY;

var Accordion = /*#__PURE__*/function (_FwComponent) {
  _inheritsLoose(Accordion, _FwComponent);

  function Accordion(element, triggerer, args) {
    element = element || (0,ui.UiToggled)(TOGGLE_MODE) || false;
    return _FwComponent.call(this, element, {
      _triggerer: triggerer ? new dom.default(triggerer) : false,
      _customArgs: args || false
    }) || this;
  }

  var _proto = Accordion.prototype;

  _proto.dispose = function dispose() {
    _FwComponent.prototype.dispose.call(this);

    this._triggerer = null;
    this._customArgs = null;
  };

  _proto._siblicide = function _siblicide() {
    var _this = this;

    if (!this._isWithinGroupMultiple) {
      dom.default.RunFnForChildren(this.UiGroot, "[data-toggle=\"" + TOGGLE_MODE + "\"],." + COMPONENT_CLASS, "." + COMPONENT_CLASS + "-group", function (accBbies) {
        if (_this._triggerer && accBbies !== _this._triggerer && accBbies !== _FwComponent.prototype.UiEl.call(_this) || !_this._triggerer && accBbies !== _FwComponent.prototype.UiEl.call(_this)) {
          accBbies.classList.remove(ACTIVATED_CLASS);
        }
      });
    }
  } //which came first the accordion-gruoup or the accordiiinbsbob?? the actual bitch none of that accordion-group shit
  ;

  _proto.close = function close(elem, hashChangeOverride) {
    var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);

    if (!element) {
      return;
    }

    hashChangeOverride = hashChangeOverride || this.args.changeHash;

    if (this._isValidWithinQuery) {
      data_helper_event.default.trigger(element, EVENT_BEFORE_CLOSE); //is not within an accordion group that needs one of them open 

      if (!this.UiGroot || this._isWithinAllowNoActive) {
        if (this._triggerer) {
          this._triggerer.classList.remove(ACTIVATED_CLASS);
        } else {
          this._probablyToggle.forEach(function (toggle) {
            toggle.classList.remove(ACTIVATED_CLASS);
          });
        }

        data_helper_event.default.trigger(element, EVENT_CLOSE);
        element.classList.remove(ACTIVATED_CLASS);

        if (this.args.changeHash && this._id) {
          (0,ui.UiChangeHash)('');
        }

        data_helper_event.default.trigger(element, EVENT_AFTER_CLOSE);
      }
    }
  };

  _proto.open = function open(elem, hashChangeOverride) {
    var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);

    if (!element) {
      return;
    }

    hashChangeOverride = hashChangeOverride || this.args.changeHash;

    this._siblicide();

    if (this._isValidWithinQuery) {
      data_helper_event.default.trigger(element, EVENT_BEFORE_OPEN);

      if (this._triggerer) {
        this._triggerer.classList.add(ACTIVATED_CLASS);
      } else {
        this._probablyToggle.forEach(function (toggle) {
          toggle.classList.add(ACTIVATED_CLASS);
        });
      }

      data_helper_event.default.trigger(element, EVENT_OPEN);
      element.classList.add(ACTIVATED_CLASS);

      if (this.args.changeHash && this._id) {
        (0,ui.UiChangeHash)(this._id);
      }

      data_helper_event.default.trigger(element, EVENT_AFTER_OPEN);
    }
  };

  _proto.toggle = function toggle(elem, hashChangeOverride) {
    var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);

    if (!element) {
      return;
    }

    if (element.classList.contains(ACTIVATED_CLASS)) {
      this.close(elem, hashChangeOverride);
    } else {
      this.open(elem, hashChangeOverride);
    }
  };

  Accordion.handleToggler = function handleToggler() {
    return function (e) {
      e.preventDefault();

      if (!component.default.isDisabled(e.target)) {
        var accordion = new Accordion((0,ui.UiToggled)(TOGGLE_MODE, e.target), e.target);
        accordion.toggle();
      }
    };
  };

  Accordion.handleUniversal = function handleUniversal() {
    return function () {
      if (core.default.settings.initializeAccordion) {
        var accordion = new Accordion();
        accordion.open();
      }

      ;
    };
  };

  Accordion.initListeners = function initListeners() {
    data_helper_event.default.addListener(document, EVENT_CLICK, "*[data-toggle=\"" + TOGGLE_MODE + "\"]", Accordion.handleToggler());
    window.addEventListener('hashchange', Accordion.handleUniversal());
    initiator.FwFnsQ.on_ready = Accordion.handleUniversal();
  };

  _createClass(Accordion, [{
    key: "args",
    get: function get() {
      return component.default._parseArgs(this._customArgs ? this._customArgs : {
        changeHash: this._triggerer && this._triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-change-hash") || _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-change-hash")
      }, Accordion.configDefaults);
    }
  }, {
    key: "_isValidWithinQuery",
    get: function get() {
      return !(_FwComponent.prototype.UiEl.call(this).classList.contains(NAME + "-mobile") && !ValidateBr(BrMobileMax, 'below'));
    }
  }, {
    key: "_isWithinGroupMultiple",
    get: function get() {
      return this.UiGroot && this.UiGroot.classList.contains(NAME + "-group-multiple");
    }
  }, {
    key: "_isWithinAllowNoActive",
    get: function get() {
      return this.UiGroot && this.UiGroot.classList.contains(NAME + "-group-allow-no-active");
    }
  }, {
    key: "_probablyToggle",
    get: function get() {
      var toReturn = [];
      var selection = document.querySelectorAll("[data-toggle=\"" + TOGGLE_MODE + "\"][href=\"#" + this._id + "\"],\n\t\t\t[data-toggle=\"" + TOGGLE_MODE + "\"][data-href=\"#" + this._id + "\"]");

      if (selection.length) {
        toReturn = selection;
      }

      return toReturn;
    }
  }, {
    key: "_id",
    get: function get() {
      return _FwComponent.prototype.UiEl.call(this).hasAttribute('id') ? _FwComponent.prototype.UiEl.call(this).getAttribute('id') : false;
    }
  }, {
    key: "UiGroot",
    get: function get() {
      var toReturn = _FwComponent.prototype.UiEl.call(this).parentNode.closest("." + COMPONENT_CLASS + ",." + COMPONENT_CLASS + "-group"); //has to actually be accordion-group closest before accordion


      if (!toReturn || toReturn && !toReturn.matches("." + COMPONENT_CLASS + "-group") //***
      ) {
        toReturn = false;
      }

      return toReturn;
    }
  }], [{
    key: "DATA_KEY",
    get: function get() {
      return DATA_KEY;
    }
  }, {
    key: "configDefaults",
    get: function get() {
      return {
        changeHash: 'true'
      };
    }
  }]);

  return Accordion;
}(component.default);

/* harmony default export */ const accordion = (Accordion);
Accordion.initListeners();
;// CONCATENATED MODULE: ./js/src/alert.js
function alert_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function alert_createClass(Constructor, protoProps, staticProps) { if (protoProps) alert_defineProperties(Constructor.prototype, protoProps); if (staticProps) alert_defineProperties(Constructor, staticProps); return Constructor; }

function alert_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }







var alert_NAME = 'alert';
var alert_TOGGLE_MODE = alert_NAME + "-close";
var alert_COMPONENT_CLASS = "" + string.default.ToDashed(alert_NAME);
var alert_DATA_KEY = core.default.settings.prefix + "." + alert_NAME;
var alert_EVENT_KEY = "." + alert_DATA_KEY;
var alert_EVENT_CLICK = "click" + alert_EVENT_KEY;
var alert_EVENT_BEFORE_CLOSE = "before_close" + alert_EVENT_KEY;
var alert_EVENT_CLOSE = "close" + alert_EVENT_KEY;
var alert_EVENT_AFTER_CLOSE = "after_close" + alert_EVENT_KEY;

var Alert = /*#__PURE__*/function (_FwComponent) {
  alert_inheritsLoose(Alert, _FwComponent);

  function Alert() {
    return _FwComponent.apply(this, arguments) || this;
  }

  var _proto = Alert.prototype;

  _proto.close = function close(elem) {
    var element = elem ? _FwComponent.prototype.el.call(this, elem) : this._element;

    if (!element) {
      return;
    }

    data_helper_event.default.trigger(element, alert_EVENT_BEFORE_CLOSE);
    data_helper_event.default.trigger(element, alert_EVENT_CLOSE);
    element.parentNode.removeChild(element);
    data_helper_event.default.trigger(element, alert_EVENT_AFTER_CLOSE);
  };

  Alert.closeAll = function closeAll() {
    var selector = document.querySelectorAll("." + alert_COMPONENT_CLASS);

    if (selector.length) {
      selector.forEach(function (instance) {
        if (instance.querySelectorAll('[data-toggle="alert-close"]').length || instance.classList.contains(alert_NAME + "-closeable")) {
          var alertInstance = new Alert(instance);
          alertInstance.close();
        }
      });
    }
  };

  Alert.handleClose = function handleClose() {
    return function (e) {
      e.preventDefault();

      if (!component.default.isDisabled(e.target)) {
        var alert = new Alert((0,ui.UiToggled)(alert_TOGGLE_MODE, e.target));
        alert.close();
      }
    };
  };

  Alert.handleCloseAll = function handleCloseAll() {
    return function (e) {
      e.preventDefault();

      if (!component.default.isDisabled(e.target)) {
        Alert.closeAll();
      }
    };
  };

  Alert.initListeners = function initListeners() {
    data_helper_event.default.addListener(document, alert_EVENT_CLICK, "*[data-toggle=\"" + alert_TOGGLE_MODE + "\"]", Alert.handleClose());
    data_helper_event.default.addListener(document, alert_EVENT_CLICK, "*[data-toggle=\"" + alert_TOGGLE_MODE + "-all\"]", Alert.handleCloseAll());
  };

  alert_createClass(Alert, null, [{
    key: "DATA_KEY",
    get: function get() {
      return alert_DATA_KEY;
    }
  }]);

  return Alert;
}(component.default);

/* harmony default export */ const src_alert = (Alert);
Alert.initListeners();
;// CONCATENATED MODULE: ./js/src/button.js
function button_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function button_createClass(Constructor, protoProps, staticProps) { if (protoProps) button_defineProperties(Constructor.prototype, protoProps); if (staticProps) button_defineProperties(Constructor, staticProps); return Constructor; }

function button_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }







var button_NAME = 'btn';
var button_COMPONENT_CLASS = "" + string.default.ToDashed(button_NAME);
var button_DATA_KEY = core.default.settings.prefix + "." + button_NAME;
var button_EVENT_KEY = "." + button_DATA_KEY;
var button_EVENT_CLICK = "click" + button_EVENT_KEY;
var EVENT_BEFORE_TOGGLE = "before_toggle" + button_EVENT_KEY;
var EVENT_TOGGLE = "toggle" + button_EVENT_KEY;
var EVENT_AFTER_TOGGLE = "after_toggle" + button_EVENT_KEY;

var Button = /*#__PURE__*/function (_FwComponent) {
  button_inheritsLoose(Button, _FwComponent);

  function Button() {
    return _FwComponent.apply(this, arguments) || this;
  }

  var _proto = Button.prototype;

  _proto.toggle = function toggle(elem) {
    var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : this._element;

    if (!element) {
      return;
    }

    data_helper_event.default.trigger(element, EVENT_BEFORE_TOGGLE);
    data_helper_event.default.trigger(element, EVENT_TOGGLE);
    (0,ui.UiToggleGroup)(element, button_NAME);
    data_helper_event.default.trigger(element, EVENT_AFTER_TOGGLE);
  };

  Button.handleToggle = function handleToggle() {
    return function (e) {
      e.preventDefault();

      if (!component.default.isDisabled(e.target)) {
        var button = new Button(e.target);
        button.toggle();
      }
    };
  };

  Button.initListeners = function initListeners() {
    data_helper_event.default.addListener(document.documentElement, button_EVENT_CLICK, "." + button_COMPONENT_CLASS + "-group-toggle > ." + button_COMPONENT_CLASS, Button.handleToggle());
  };

  button_createClass(Button, null, [{
    key: "DATA_KEY",
    get: function get() {
      return button_DATA_KEY;
    }
  }]);

  return Button;
}(component.default);

/* harmony default export */ const src_button = (Button);
Button.initListeners();
// EXTERNAL MODULE: ./js/src/dropdown.js
var dropdown = __webpack_require__(15);
// EXTERNAL MODULE: ./js/src/form.js + 2 modules
var src_form = __webpack_require__(16);
;// CONCATENATED MODULE: ./js/framework.webpack.js
// import FwArrayay from './src/data-helper/array.js';
// import FwString from './src/data-helper/string.js';
// import FwDate from './src/data-helper/date.js';
// import FwDom from './src/data-helper/dom.js';





/* harmony default export */ const framework_webpack = ({
  Accordion: accordion,
  Alert: src_alert,
  Button: src_button,
  Dropdown: dropdown.default,
  Form: src_form.default
});

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var FwCore = {};

var _dataobj = function () {
  var storage = {};
  var id = 1;
  return {
    _set: function _set(element, key, data) {
      if (typeof element.fwKeys === 'undefined') {
        element.fwKeys = {
          key: key,
          id: id
        };
        id++;
      }

      storage[element.fwKeys.id] = data;
    },
    _get: function _get(element, key) {
      if (!element || typeof element.fwKeys === 'undefined') {
        return null;
      }

      var keyProperties = element.fwKeys;

      if (keyProperties.key === key) {
        return storage[keyProperties.id];
      }

      return null;
    },
    _remove: function _remove(element, key) {
      if (typeof element.fwKeys === 'undefined') {
        return;
      }

      var keyProperties = element.fwKeys;

      if (keyProperties.key === key) {
        delete storage[keyProperties.id];
        delete element.fwKeys;
      }
    }
  };
}();

FwCore.Data = {
  set: function set(elm, key, data) {
    _dataobj._set(elm, key, data);
  },
  get: function get(elm, key) {
    return _dataobj._get(elm, key);
  },
  remove: function remove(elm, key) {
    _dataobj._remove(elm, key);
  }
};
FwCore.settings = FwCore.settings || {};
FwCore.settings.prefix = 'fw';
FwCore.settings.lazyLoad = FwCore.settings.lazyLoad || true;
FwCore.settings.initializeModal = FwCore.settings.initializeModal || true;
FwCore.settings.initializeBoard = FwCore.settings.initializeBoard || true;
FwCore.settings.initializeAccordion = FwCore.settings.initializeAccordion || true;
FwCore.settings.dynamicHash = FwCore.settings.dynamicHash || true;
FwCore.settings.uiClass = FwCore.settings.uiClass || FwCore.settings.prefix + "-ui"; //for styles

FwCore.settings.uiJsClass = FwCore.settings.uiJsClass || FwCore.settings.uiClass.replace('-', '_'); // for scripting events and shit

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FwCore);

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FwFnsQ": () => /* binding */ FwFnsQ
/* harmony export */ });
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FwQueue = /*#__PURE__*/function () {
  function FwQueue() {
    this._on_load = [];
    this._on_ready = [];
    this._on_resize = [];
    this._on_scroll = [];
    this._on_rightAway = [];
    this._on_init = [];
  }

  _createClass(FwQueue, [{
    key: "on_load",
    get: function get() {
      return this._on_load;
    },
    set: function set(fn) {
      this._on_load.push(fn);
    }
  }, {
    key: "on_ready",
    get: function get() {
      return this._on_ready;
    },
    set: function set(fn) {
      this._on_ready.push(fn);
    }
  }, {
    key: "on_resize",
    get: function get() {
      return this._on_resize;
    },
    set: function set(fn) {
      this._on_resize.push(fn);
    }
  }, {
    key: "on_scroll",
    get: function get() {
      return this._on_scroll;
    },
    set: function set(fn) {
      this._on_scroll.push(fn);
    }
  }, {
    key: "on_rightAway",
    get: function get() {
      return this._on_rightAway;
    },
    set: function set(fn) {
      this._on_rightAway.push(fn);
    }
  }, {
    key: "on_init",
    get: function get() {
      return this._on_init;
    },
    set: function set(fn) {
      this._on_init.push(fn);
    }
  }]);

  return FwQueue;
}();

var FwFnsQ = new FwQueue();


var runFnsQ = function runFnsQ(fnsArray) {
  fnsArray.forEach(function (fn) {
    fn();
  });
};

var docReady = function docReady(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};

var FwInit = {};

FwInit.initEvents = function () {
  //component events
  runFnsQ(FwFnsQ.on_init); //window events

  window.addEventListener('resize', FwInit.runResize);
  window.addEventListener('scroll', FwInit.runScroll);
};

FwInit.runInit = function () {
  runFnsQ(FwFnsQ.on_rightAway);
};

FwInit.runReady = function () {
  runFnsQ(FwFnsQ.on_ready);
  FwInit.setCompleteState();
};

FwInit.runLoad = function () {
  runFnsQ(FwFnsQ.on_load);
};

var resizeTimerInternal;

FwInit.runResize = function () {
  clearTimeout(resizeTimerInternal);
  resizeTimerInternal = setTimeout(function () {
    runFnsQ(FwFnsQ.on_resize);
  }, 100);
};

var scrollTimerInternal;

FwInit.runScroll = function () {
  clearTimeout(scrollTimerInternal);
  scrollTimerInternal = setTimeout(function () {
    runFnsQ(FwFnsQ.on_scroll);
  }, 100);
};

FwInit.setState = function (mode) {
  mode = mode || 'complete';

  switch (mode) {
    case 'loading':
      document.body.classList.remove('body-loaded');
      document.body.classList.add('body-loading');
      break;

    case 'complete':
    default:
      setTimeout(function () {
        document.body.classList.remove('body-loading');
        document.body.classList.add('body-loaded');
      }, 100);
      break;
  }
};

FwInit.setLoadingState = function () {
  FwInit.setState('loading');
};

FwInit.setCompleteState = function () {
  FwInit.setState('complete');
};

FwInit.reInit = function () {
  FwInit.setLoadingState();
  FwInit.runInit();
  FwInit.runReady();
  FwInit.runLoad();
};

FwInit.runInit();
docReady(FwInit.runReady);
window.addEventListener('load', FwInit.runLoad);
FwInit.initEvents();
/*


FwEvent.addListener(
			document.documentElement,
			'click',
			'*',
			(e) => {
				const triggerer = e.target;

				if (FwInit.isDisabled(triggerer)) {
					e.preventDefault();
				} else {
					if(
						!triggerer.classList.contains(UiDynamicClass) //temp fix for ui elements not getting ancestry
					){
						
						//tooltip
						if (
							!triggerer.closest('[data-toggle="tooltip-click"]')
							&& !triggerer.closest('[data-toggle="tooltip-hover"]')
							&& !triggerer.closest('.tooltip.tooltip-allow-interaction')
						) {
							FwInit.destroyToolTip();
						}
			
						//dropdown
						if (
							!triggerer.closest('[data-toggle="dropdown"]')
							&& !triggerer.closest('.dropdown')
						) {
							FwInit.closeDropdowns(false);
						}

						//switch
						if (
							!triggerer.closest('[data-toggle="switch-off"]')
							&& !triggerer.closest('[data-toggle="switch-on"]')
							&& !triggerer.closest('.switch')
						){
							FwInit.initSwitch(false,'off')
						}
					}
				}
			}
		);

*/

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _util_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _classes_data_helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



var customEvents = [];
var NativeEvents = ['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'paste', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll'];

var FwEvent = /*#__PURE__*/function (_FwDataHelper) {
  _inheritsLoose(FwEvent, _FwDataHelper);

  function FwEvent() {
    return _FwDataHelper.apply(this, arguments) || this;
  }

  FwEvent.addListener = function addListener(parent, evt, selector, delegationFn, customEventOpts) {
    parent = parent || selector;
    var evtNoApi = evt.split("." + _util_core_js__WEBPACK_IMPORTED_MODULE_0__.default.settings.prefix)[0];
    var isNative = NativeEvents.includes(evt);
    customEventOpts = customEventOpts || {
      cancelable: true
    };
    customEventOpts.detail = customEventOpts.detail || {}; // parent.addEventListener(
    // 	evtNoApi,
    // 	(event) => {
    // 		console.log(evt,evtNoApi);
    // 		if (event.target.matches(selector + ', ' + selector + ' *')) {
    // 			// try {
    // 				delegationFn(event);
    // 				if(!isNative){
    // 					FwEvent.trigger(event.target,evt,customEventOpts);
    // 				}
    // 			// } catch(e) {}
    // 		}
    // 	},
    // 	true
    // );

    parent.addEventListener(evtNoApi, function (event) {
      if (event.target.matches(selector + ', ' + selector + ' *')) {
        // try {
        !isNative && FwEvent.trigger(event.target, evt, customEventOpts);
        delegationFn(event); // } catch(e) {}
      }
    }, true);
  };

  FwEvent.trigger = function trigger(el, evt, customEventOpts) {
    var event;
    el = el || document;

    if (NativeEvents.includes(evt)) {
      event = document.createEvent('HTMLEvents');
      event.initEvent(evt, true, false);
    } else {
      customEventOpts = customEventOpts || {};

      if (customEventOpts) {
        event = new CustomEvent(evt, customEventOpts);
      } else {
        event = new CustomEvent(evt);
      }
    }

    el.dispatchEvent(event); // return event;
  };

  _createClass(FwEvent, null, [{
    key: "cusEventOptsDef",
    get: function get() {
      return {
        bubbles: true,
        cancelable: true
      };
    }
  }]);

  return FwEvent;
}(_classes_data_helper_js__WEBPACK_IMPORTED_MODULE_1__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FwEvent);

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var FwDataHelper = /*#__PURE__*/function () {
  function FwDataHelper(data, dataParser) {
    if (!data) {
      return;
    }

    dataParser = dataParser || function (dat) {
      return dat;
    };

    this._FwData = dataParser(data);
    return this.getData();
  }

  var _proto = FwDataHelper.prototype;

  _proto.getData = function getData() {
    return this._FwData;
  };

  return FwDataHelper;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FwDataHelper);

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _classes_data_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



var FwDom = /*#__PURE__*/function (_FwDataHelper) {
  _inheritsLoose(FwDom, _FwDataHelper);

  function FwDom(data) {
    return _FwDataHelper.call(this, data, function (dat) {
      var toReturn;

      if (typeof dat === 'string') {
        // console.log('looks like a selector');
        var selection = document.querySelectorAll(dat);

        if (selection.length > 1) {
          toReturn = selection;
        } else {
          toReturn = document.querySelector(dat);
        }
      } else {
        // console.log('looks like a dom obj');
        toReturn = dat;
      }

      return toReturn;
    }) || this;
  }

  FwDom.slideDown = function slideDown(elem) {
    elem = elem || _FwDataHelper.getData.call(this);
    elem && (elem.style.display = 'block');
    return elem;
  };

  FwDom.slideUp = function slideUp(elem) {
    elem = elem || _FwDataHelper.getData.call(this);
    elem && (elem.style.display = 'none');
    return elem;
  };

  FwDom.getSiblings = function getSiblings(elem) {
    elem = elem || _FwDataHelper.getData.call(this);
    return Array.prototype.filter.call(elem.parentNode.children, function (child) {
      return child !== elem;
    });
  };

  FwDom.getAncestors = function getAncestors(elem, selector) {
    elem = elem || _FwDataHelper.getData.call(this);
    var parents = [];
    var firstChar;

    if (selector) {
      firstChar = selector.charAt(0);
    } // Get matches


    for (; elem && elem !== document; elem = elem.parentNode) {
      if (selector) {
        // If selector is a class
        if (firstChar === '.') {
          if (elem.classList.contains(selector.substr(1))) {
            parents.push(elem);
          }
        } // If selector is an ID


        if (firstChar === '#') {
          if (elem.id === selector.substr(1)) {
            parents.push(elem);
          }
        } // If selector is a data attribute


        if (firstChar === '[') {
          if (elem.hasAttribute(selector.substr(1, selector.length - 1))) {
            parents.push(elem);
          }
        } // If selector is a tag


        if (elem.tagName.toLowerCase() === selector) {
          parents.push(elem);
        }
      } else {
        parents.push(elem);
      }
    } // Return parents if any exist


    if (parents.length === 0) {
      return null;
    } else {
      return parents;
    }
  };

  FwDom.moveContents = function moveContents(elem, elementToMoveContentsTo) {
    elem = elem || _FwDataHelper.getData.call(this);
    var oldParent = elem;
    var newParent = new FwDom(elementToMoveContentsTo);

    if (newParent && newParent !== oldParent) {
      while (oldParent.childNodes.length > 0) {
        newParent.appendChild(oldParent.childNodes[0]);
      }
    }

    return elem;
  };

  FwDom.scrollToElem = function scrollToElem(elem, ToScrollTo, direction) {
    elem = elem || _FwDataHelper.getData.call(this);

    if (!ToScrollTo) {
      return;
    }

    direction = direction || 'y';
    var methods = direction == 'x' ? ['scrollLeft', 'left'] : ['scrollTop', 'top'];
    var scrollOpts = {};
    scrollOpts[methods[1]] = elem[methods[0]] - elem.getBoundingClientRect()[methods[1]] + ToScrollTo.getBoundingClientRect()[methods[1]];
    elem.scrollTo(scrollOpts);
    return elem;
  };

  FwDom.RunFnForChildren = function RunFnForChildren(ancestorElem, selector, parentSelector, fn) {
    //@TODO wtf
    if (ancestorElem && selector && parentSelector && fn) {
      var children = ancestorElem.querySelectorAll(selector);
      children.forEach(function (child) {
        if (child.closest(parentSelector) && ancestorElem.isSameNode(child.closest(parentSelector))) {
          fn(child);
        }
      });
      return ancestorElem;
    }
  };

  return FwDom;
}(_classes_data_helper_js__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FwDom);

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _classes_data_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



var FwString = /*#__PURE__*/function (_FwDataHelper) {
  _inheritsLoose(FwString, _FwDataHelper);

  function FwString(data) {
    return _FwDataHelper.call(this, data) || this;
  }

  FwString.GetFileExtension = function GetFileExtension(str) {
    return str.split('.').pop();
  };

  FwString.ToCamelCase = function ToCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/-|\s/g, '');
  };

  FwString.ToDashed = function ToDashed(str) {
    return FwString.ToCamelCase(str).replace(/([a-z]|[0-9])([A-Z])/g, '$1-$2').toLowerCase();
  };

  return FwString;
}(_classes_data_helper_js__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FwString);

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _util_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _util_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _data_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _util_ui_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);




/*
NAME
TOGGLE_MODE
DATA_KEY
CONTAINED_BY_NAME

	case 'dropdown':
	case 'modal':
	case 'board':
	case 'switch':
	case 'alert-close':

FwToggleMode

*/

var FwComponent = /*#__PURE__*/function () {
  function FwComponent(element, props) {
    if (!element) {
      return;
    }

    _util_core_js__WEBPACK_IMPORTED_MODULE_0__.default.Data.set(element, this.constructor.DATA_KEY, this);
    this._element = element;

    if (typeof props === 'object') {
      for (var key in props) {
        this[key] = props[key];
      }
    }
  }

  var _proto = FwComponent.prototype;

  _proto.dispose = function dispose() {
    _util_core_js__WEBPACK_IMPORTED_MODULE_0__.default.Data.delete(this._element, this.constructor.DATA_KEY, this);
    this._element = null;
  };

  FwComponent.getInstance = function getInstance(element) {
    return _util_core_js__WEBPACK_IMPORTED_MODULE_0__.default.Data.get(element, this.DATA_KEY);
  };

  _proto.UiEl = function UiEl() {
    return this._element;
  };

  _proto._runFn = function _runFn(callback) {
    if (callback) {
      var fn;

      try {
        fn = eval(/^[^(]+/.exec(callback)[0]);
      } catch (err) {
        console.error(err);
      }

      if (typeof fn === 'function') {
        eval(callback);
      }
    }
  };

  FwComponent._parseArgs = function _parseArgs(arr, defaults) {
    var args = {};

    for (var prop in defaults) {
      if (typeof defaults[prop] === 'object' && defaults[prop] !== null && arr[prop] !== '' && defaults[prop].hasOwnProperty('value')) {
        args[prop] = defaults[prop].value;
      } else {
        args[prop] = defaults[prop];
      }
    }

    for (var _prop in arr) {
      if (arr.hasOwnProperty(_prop) && arr[_prop] !== undefined && arr[_prop] !== null && arr[_prop] !== '') {
        // Push each value from `obj` into `extended`
        if (typeof defaults[_prop] === 'object' && defaults[_prop] !== null && defaults[_prop].hasOwnProperty('value') && defaults[_prop].hasOwnProperty('parser')) {
          args[_prop] = defaults[_prop].parser(arr[_prop]);
        } else {
          args[_prop] = arr[_prop];
        } // catch boolean


        if (args[_prop] == 'false' || args[_prop] == 'true') {
          args[_prop] = args[_prop] == 'true' ? true : false;
        }
      }
    }

    return args;
  };

  FwComponent.isDisabled = function isDisabled(elem) {
    if (!elem) {
      return;
    }

    var toReturn = false;

    if (elem.closest('[disabled]') || elem.matches(':disabled')) {
      toReturn = true;
    }

    _util_validation_js__WEBPACK_IMPORTED_MODULE_1__.DisableClasses.forEach(function (classString) {
      if (elem.closest("." + classString) && !toReturn) {
        toReturn = true;
      }
    });
    return toReturn;
  };

  FwComponent.isDynamic = function isDynamic(elem) {
    return elem.classList.contains(_util_ui_js__WEBPACK_IMPORTED_MODULE_3__.UiDynamicClass);
  };

  return FwComponent;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FwComponent);

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DisableClasses": () => /* binding */ DisableClasses,
/* harmony export */   "lookupResetToParentClass": () => /* binding */ lookupResetToParentClass,
/* harmony export */   "lookupResetFromClosestComponent": () => /* binding */ lookupResetFromClosestComponent,
/* harmony export */   "DateTimePreset": () => /* binding */ DateTimePreset,
/* harmony export */   "dayNames": () => /* binding */ dayNames,
/* harmony export */   "dayNamesShort": () => /* binding */ dayNamesShort,
/* harmony export */   "dayNamesShorter": () => /* binding */ dayNamesShorter,
/* harmony export */   "monthNames": () => /* binding */ monthNames,
/* harmony export */   "monthNamesShort": () => /* binding */ monthNamesShort,
/* harmony export */   "Palette": () => /* binding */ Palette
/* harmony export */ });
//valid shits
var DisableClasses = ['table-row-disabled', 'tab-disabled', 'btn-disabled', 'input-disabled', 'disabled'];
var lookupResetToParentClass = ['input-group', 'btn-grouop'];
var lookupResetFromClosestComponent = ['dropdown', 'modal', 'board', 'switch', 'alert'];
var DateTimePreset = {
  HumanDate: {
    placeholder: 'mm/dd/yyyy',
    pattern: /^\d{2}\/\d{2}\/\d{4}$/,
    template: 'mm/dd/yy'
  },
  HumanTime24: {
    placeholder: "hh:mm",
    pattern: "",
    template: "HH:MM"
  },
  HumanTime12: {
    placeholder: "hh:mm",
    pattern: "",
    template: "HH:MM"
  },
  Value: {
    placeholder: 'yyyy-mm-dd',
    pattern: /^\d{4}[-]\d{2}[-]\d{2}$/,
    template: 'yy-mm-dd'
  },
  ValueDateTimePreset: {
    placeholder: "yy-mm-ddThh:gg",
    pattern: "",
    template: "yy-mm-ddThh:gg"
  }
};
var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var dayNamesShorter = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var Palette = ['base', 'primary', 'secondary', 'accent', 'neutral', 'error', 'caution', 'success'];

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UiPrefix": () => /* binding */ UiPrefix,
/* harmony export */   "UiDynamicClass": () => /* binding */ UiDynamicClass,
/* harmony export */   "UiTriggerer": () => /* binding */ UiTriggerer,
/* harmony export */   "UiToggled": () => /* binding */ UiToggled,
/* harmony export */   "UiChangeHash": () => /* binding */ UiChangeHash,
/* harmony export */   "UiToggleGroup": () => /* binding */ UiToggleGroup
/* harmony export */ });
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _data_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);



var UiPrefix = function UiPrefix(componentName, noDash) {
  noDash = noDash || false;
  return noDash ? componentName + "-ui" : componentName + "-ui-";
};
var UiDynamicClass = _core_js__WEBPACK_IMPORTED_MODULE_0__.default.settings.uiJsClass + "_internal_toggle"; //this was the bitch that got clickied or hovered or wehatever

var UiTriggerer = function UiTriggerer(triggerer, isGroupable) {
  triggerer = triggerer || false;
  isGroupable = isGroupable || false;
  var toReturn;

  if (triggerer) {
    if (isGroupable) {
      return;
    } else if ( //calendar fix
    triggerer.closest("." + _core_js__WEBPACK_IMPORTED_MODULE_0__.default.settings.uiJsClass) && !triggerer.closest("." + UiDynamicClass)) {
      toReturn = triggerer.closest("." + _core_js__WEBPACK_IMPORTED_MODULE_0__.default.settings.uiJsClass);
    } else {
      toReturn = triggerer;
    }

    return toReturn;
  }
}; // case 'dropdown':
// 	case 'modal':
// 	case 'board':
// 	case 'switch':
// 	case 'alert-close':

var UiToggled = function UiToggled(toggleMode, triggerer) {
  triggerer = triggerer || false;
  toggleMode = toggleMode || false; // lookup_reset_to_parent
  // lookup_from_closest

  if (toggleMode) {
    var selector = "." + toggleMode,
        toggledClass = ("." + toggleMode).replace('-open', '').replace('-close', ''),
        componentClass = toggledClass ? toggledClass.replace('.', '') : null;
    var toReturn = null;

    if (triggerer) {
      //lookup by href
      if (triggerer.hasAttribute('href') && triggerer.getAttribute('href').startsWith('#') && triggerer.getAttribute('href') !== '#' && document.querySelector(triggerer.getAttribute('href')) && document.querySelector(triggerer.getAttribute('href')).classList.contains(componentClass)) {
        // console.warn('toggle found by href');
        toReturn = document.querySelector(triggerer.getAttribute('href')); //lookup by data-href
      } else if (triggerer.hasAttribute('data-href') && triggerer.getAttribute('data-href').startsWith('#') && triggerer.getAttribute('data-href') !== '#' && document.querySelector(triggerer.getAttribute('data-href')) && document.querySelector(triggerer.getAttribute('data-href')).classList.contains(componentClass)) {
        // console.warn('toggle found by data-href');
        toReturn = document.querySelector(triggerer.getAttribute('data-href')); //lookup by closest [data-toggle]
      } else if (toggleMode && triggerer.parentNode.closest("[data-toggle=\"" + toggleMode + "\"]")) {
        // console.warn('toggle searching closest data-toggle');
        toReturn = UiToggled(toggleMode, triggerer.parentNode.closest("[data-toggle=\"" + toggleMode + "\"]")); //look up by tag `lookup_reset_to_parent`
      } else if (toggleMode && _validation_js__WEBPACK_IMPORTED_MODULE_1__.lookupResetToParentClass.filter(function (i) {
        return triggerer.parentNode.classList.contains(i);
      }).length > 0) {
        // console.warn('toggle trigger was in input group');
        toReturn = UiToggled(toggleMode, triggerer.parentNode);
      } else {
        var possibleSiblings = triggerer.nextElementSibling;

        while (possibleSiblings) {
          if (possibleSiblings.matches(selector)) {
            // console.warn('toggle trigger anybody whos a sibling');
            return possibleSiblings;
          }

          possibleSiblings = possibleSiblings.nextElementSibling;
        }

        toReturn = possibleSiblings;
      }
    } else {
      if (window.location.hash !== '' && document.querySelector(window.location.hash) && document.querySelector(window.location.hash).classList.contains(componentClass)) {
        // console.warn('no trigger but found the hash is a matching toggle');
        toReturn = document.querySelector(window.location.hash);
      }
    }

    if (!toReturn && _validation_js__WEBPACK_IMPORTED_MODULE_1__.lookupResetFromClosestComponent.filter(function (i) {
      return i == componentClass;
    })) {
      //look if theres an ancestor it can toggle. last prioroty
      // console.warn('no trigger so looking for an ancestor');
      if (triggerer && toggleMode && triggerer.parentNode.closest(toggledClass)) {
        // console.warn('found ancestor');
        toReturn = triggerer.parentNode.closest(toggledClass);
      }
    }

    return toReturn;
  }
};
var UiChangeHash = function UiChangeHash(id) {
  id = id || '';

  if (_core_js__WEBPACK_IMPORTED_MODULE_0__.default.settings.dynamicHash) {
    var idToGoTo = id !== '' ? "#" + id : null;

    if (idToGoTo) {
      if (history.pushState) {
        history.pushState(null, null, idToGoTo);
      } else {
        location.hash = idToGoTo;
      }
    } else {
      var noHashURL = window.location.href.replace(/#.*$/, '');

      if (history.pushState) {
        window.history.pushState('', document.title, noHashURL);
      }

      location.hash = '';
    }
  }
};
var UiToggleGroup = function UiToggleGroup(element, prefix, activatedClass, siblingSelector, resetterClass, noActiveClass, multipleClass) {
  prefix = prefix || 'btn';
  siblingSelector = siblingSelector || "." + prefix;
  resetterClass = resetterClass || prefix + "-group-toggle-reset";
  noActiveClass = noActiveClass || prefix + "-group-toggle-allow-no-active";
  multipleClass = multipleClass || prefix + "-group-toggle-multiple";
  activatedClass = activatedClass || 'active';

  if (!element) {
    return;
  }

  if (element.closest(siblingSelector) && !element.classList.contains(prefix)) {
    element = element.closest(siblingSelector);
  }

  if (element) {
    //reset da resetti
    var resetter = _data_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.default.getSiblings(element).filter(function (butt) {
      return butt.classList.contains(resetterClass);
    });
    resetter.forEach(function (butt) {
      butt.classList.remove(activatedClass);
    }); //dem siblongs

    var selectorSiblings = _data_helper_dom_js__WEBPACK_IMPORTED_MODULE_2__.default.getSiblings(element).filter(function (sibling) {
      return sibling.matches(siblingSelector);
    });

    if (!element.closest("." + multipleClass) || element.classList.contains(resetterClass)) {
      selectorSiblings.forEach(function (sibling) {
        sibling.classList.remove(activatedClass);
      });
    }

    if (element.closest("." + multipleClass) && selectorSiblings.filter(function (butt) {
      return butt.classList.contains(activatedClass);
    }).length > 0 || element.closest(noActiveClass)) {
      element.classList.toggle(activatedClass);
    } else {
      element.classList.add(activatedClass);
    }
  }
};

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _util_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _util_initiator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _data_helper_event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _data_helper_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _data_helper_dom_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _classes_component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);
/* harmony import */ var _util_ui_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }








var NAME = 'dropdown';
var ARG_ATTRIBUTE_NAME = "" + NAME;
var TOGGLE_MODE = "" + NAME;
var COMPONENT_CLASS = "" + _data_helper_string_js__WEBPACK_IMPORTED_MODULE_3__.default.ToDashed(NAME);
var ACTIVATED_CLASS = "open";
var NAV_ANCESTOR = "li, .nav-item";
var DATA_KEY = _util_core_js__WEBPACK_IMPORTED_MODULE_0__.default.settings.prefix + "." + NAME;
var EVENT_KEY = "." + DATA_KEY;
var EVENT_CLICK = "click" + EVENT_KEY;
var EVENT_FOCUS = "focus" + EVENT_KEY;
var EVENT_BLUR = "blur" + EVENT_KEY;
var EVENT_BEFORE_CLOSE = "before_close" + EVENT_KEY;
var EVENT_CLOSE = "close" + EVENT_KEY;
var EVENT_AFTER_CLOSE = "after_close" + EVENT_KEY;
var EVENT_BEFORE_OPEN = "before_open" + EVENT_KEY;
var EVENT_OPEN = "open" + EVENT_KEY;
var EVENT_AFTER_OPEN = "after_open" + EVENT_KEY;

var Dropdown = /*#__PURE__*/function (_FwComponent) {
  _inheritsLoose(Dropdown, _FwComponent);

  function Dropdown(element, triggerer, args) {
    return _FwComponent.call(this, element, {
      _triggerer: triggerer ? new _data_helper_dom_js__WEBPACK_IMPORTED_MODULE_4__.default(triggerer) : false,
      _customArgs: args || false
    }) || this;
  }

  var _proto = Dropdown.prototype;

  _proto.dispose = function dispose() {
    _FwComponent.prototype.dispose.call(this);

    this._triggerer = null;
    this._customArgs = null;
  };

  _proto.close = function close(elem, triggerer) {
    var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : this._element;

    if (element) {
      triggerer = triggerer || this._triggerer;
      _data_helper_event_js__WEBPACK_IMPORTED_MODULE_2__.default.trigger(element, EVENT_BEFORE_CLOSE);
      this.setDimensions(null, Dropdown.configDefaults);
      _data_helper_event_js__WEBPACK_IMPORTED_MODULE_2__.default.trigger(element, EVENT_CLOSE);
      element.classList.remove(ACTIVATED_CLASS);
      triggerer && triggerer.classList.remove(ACTIVATED_CLASS);
      this.UiElNavcestor && this.UiElNavcestor.classList.remove(ACTIVATED_CLASS);
      _data_helper_event_js__WEBPACK_IMPORTED_MODULE_2__.default.trigger(element, EVENT_AFTER_CLOSE);
    }
  };

  _proto.open = function open(elem, triggerer) {
    var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : this._element;

    if (!element) {
      return;
    }

    triggerer = triggerer || this._triggerer;
    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_2__.default.trigger(element, EVENT_BEFORE_OPEN);
    this.setDimensions();
    Dropdown.purgeToggles(triggerer);
    Dropdown.purge(element);
    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_2__.default.trigger(element, EVENT_OPEN);
    element.classList.add(ACTIVATED_CLASS);
    triggerer && triggerer.classList.add(ACTIVATED_CLASS);

    if (this.UiElUncles) {
      this.UiElUncles.forEach(function (uncle) {
        uncle.classList.remove(ACTIVATED_CLASS);
      });
    }

    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_2__.default.trigger(element, EVENT_AFTER_OPEN);
  };

  _proto.toggle = function toggle(elem, triggerer) {
    var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : this._element;

    if (!element) {
      return;
    }

    triggerer = triggerer || false;

    if (element.classList.contains(ACTIVATED_CLASS)) {
      this.close(elem, triggerer);
    } else {
      this.open(elem, triggerer);
    }
  };

  _proto.setDimensions = function setDimensions(elem, args) {
    var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : this._element;

    if (!element) {
      return;
    }

    args = args || this.args;

    if (args.width) {
      element.style.width = args.width;
    }

    if (args.maxHeight) {
      element.style.maxHeight = args.maxHeight;
    }
  };

  Dropdown._purger = function _purger(exempted, selector) {
    exempted = exempted || false;
    document.querySelectorAll(selector).forEach(function (doopdoop) {
      if (!exempted || exempted && doopdoop !== exempted && !doopdoop.contains(exempted)) {
        new Dropdown(doopdoop).close();
      }
    });
  };

  Dropdown.purge = function purge(exemptedDropdown) {
    Dropdown._purger(exemptedDropdown, "." + COMPONENT_CLASS);
  };

  Dropdown.purgeToggles = function purgeToggles(exemptedToggle) {
    Dropdown._purger(exemptedToggle, "*[data-toggle=\"" + TOGGLE_MODE + "\"]");
  };

  Dropdown.handleToggle = function handleToggle() {
    return function (e) {
      e.preventDefault();

      if (!_classes_component_js__WEBPACK_IMPORTED_MODULE_5__.default.isDisabled(e.target)) {
        var triggerer = (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_6__.UiTriggerer)(e.target);
        var dropdown = new Dropdown((0,_util_ui_js__WEBPACK_IMPORTED_MODULE_6__.UiToggled)(TOGGLE_MODE, triggerer), triggerer);
        dropdown.toggle();
      }
    };
  };

  Dropdown.handleFocusOpen = function handleFocusOpen(i) {
    return function (e) {
      if (_classes_component_js__WEBPACK_IMPORTED_MODULE_5__.default.isDisabled(e.target)) {
        e.target.blur();
      } else {
        var triggerer = (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_6__.UiTriggerer)(e.target);
        var dropdown = new Dropdown((0,_util_ui_js__WEBPACK_IMPORTED_MODULE_6__.UiToggled)(TOGGLE_MODE, triggerer), triggerer);
        dropdown.open();
        triggerer.classList.add('focus');
      }
    };
  };

  Dropdown.handleBlurClose = function handleBlurClose() {
    return function (e) {
      if (!_classes_component_js__WEBPACK_IMPORTED_MODULE_5__.default.isDisabled(e.target)) {
        var triggerer = (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_6__.UiTriggerer)(e.target);
        var dropdown = new Dropdown((0,_util_ui_js__WEBPACK_IMPORTED_MODULE_6__.UiToggled)(TOGGLE_MODE, triggerer), triggerer);
        setTimeout(function () {
          dropdown.close();
        }, 200);
        triggerer.classList.remove('focus');
      }
    };
  };

  Dropdown.handlerUniversal = function handlerUniversal() {
    return function (e) {
      if (_classes_component_js__WEBPACK_IMPORTED_MODULE_5__.default.isDisabled(e.target)) {
        e.preventDefault();
      } else if (!_classes_component_js__WEBPACK_IMPORTED_MODULE_5__.default.isDynamic(e.target)) {
        if (!e.target.closest("[data-toggle=\"" + TOGGLE_MODE + "\"]") && !e.target.closest("." + COMPONENT_CLASS)) {
          Dropdown.purge();
          Dropdown.purgeToggles();
        }
      }
    };
  };

  Dropdown.initListeners = function initListeners() {
    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_2__.default.addListener(document, EVENT_CLICK, "*[data-toggle=\"" + TOGGLE_MODE + "\"]:not(input):not([contenteditable]):not(." + _util_core_js__WEBPACK_IMPORTED_MODULE_0__.default.settings.uiJsClass + ")", Dropdown.handleToggle());
    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_2__.default.addListener(document, EVENT_FOCUS, "input[data-toggle=\"" + TOGGLE_MODE + "\"], *[contenteditable][data-toggle=\"" + TOGGLE_MODE + "\"], ." + _util_core_js__WEBPACK_IMPORTED_MODULE_0__.default.settings.uiJsClass + "[data-toggle=\"" + TOGGLE_MODE + "\"] [contenteditable]", Dropdown.handleFocusOpen());
    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_2__.default.addListener(document, EVENT_BLUR, "input[data-toggle=\"" + TOGGLE_MODE + "\"], *[contenteditable][data-toggle=\"" + TOGGLE_MODE + "\"], ." + _util_core_js__WEBPACK_IMPORTED_MODULE_0__.default.settings.uiJsClass + "[data-toggle=\"" + TOGGLE_MODE + "\"] [contenteditable]", Dropdown.handleBlurClose());
    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_2__.default.addListener(document, 'click', "*", Dropdown.handlerUniversal());
  };

  _createClass(Dropdown, [{
    key: "args",
    get: function get() {
      return _classes_component_js__WEBPACK_IMPORTED_MODULE_5__.default._parseArgs(this._customArgs ? this._customArgs : {
        width: this._triggerer && this._triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-width") || this._element.getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-width"),
        maxHeight: this._triggerer && this._triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-max-height") || this._element.getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-max-height")
      }, Dropdown.configDefaults);
    }
  }, {
    key: "UiElNavcestor",
    get: function get() {
      return this._element.closest(NAV_ANCESTOR);
    }
  }, {
    key: "UiElUncles",
    get: function get() {
      if (this.UiElNavcestor) {
        return _data_helper_dom_js__WEBPACK_IMPORTED_MODULE_4__.default.getSiblings(this.UiElNavcestor).filter(function (sibling) {
          return sibling.matches(NAV_ANCESTOR);
        });
      }
    }
  }], [{
    key: "configDefaults",
    get: function get() {
      return {
        width: null,
        maxHeight: null
      };
    }
  }, {
    key: "DATA_KEY",
    get: function get() {
      return DATA_KEY;
    }
  }]);

  return Dropdown;
}(_classes_component_js__WEBPACK_IMPORTED_MODULE_5__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dropdown);
Dropdown.initListeners();

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => /* binding */ src_form
});

// EXTERNAL MODULE: ./js/src/util/core.js
var core = __webpack_require__(6);
// EXTERNAL MODULE: ./js/src/util/initiator.js
var initiator = __webpack_require__(7);
// EXTERNAL MODULE: ./js/src/data-helper/event.js
var data_helper_event = __webpack_require__(8);
// EXTERNAL MODULE: ./js/src/data-helper/dom.js
var dom = __webpack_require__(10);
// EXTERNAL MODULE: ./js/src/classes/data-helper.js
var data_helper = __webpack_require__(9);
// EXTERNAL MODULE: ./js/src/util/validation.js
var validation = __webpack_require__(13);
;// CONCATENATED MODULE: ./js/src/data-helper/date.js
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }




var FwDate = /*#__PURE__*/function (_FwDataHelper) {
  _inheritsLoose(FwDate, _FwDataHelper);

  function FwDate() {
    return _FwDataHelper.apply(this, arguments) || this;
  }

  FwDate.toParsed = function toParsed(d) {
    if (d) {
      var yr,
          mo,
          dy,
          hr,
          mn,
          dateArr = [],
          timeArr = [];

      if (Object.prototype.toString.call(d) === '[object Date]') {
        //make a new date out of its methods because js will think u are referring to the same date everythere and ur math becomes a hellhole... dont.. hOE
        yr = d.getFullYear() || null;
        mo = d.getMonth() || null;
        dy = d.getDate() || null;
        hr = d.getHours() || null;
        mn = d.getMinutes() || null;
      } else {
        var pattern = new RegExp(validation.DateTimePreset.Value.pattern);
        var isValid = pattern.test(d);

        if (isValid) {
          var DateTimePresetArr = d.split('T') || []; //date

          if (DateTimePresetArr[0]) {
            dateArr = DateTimePresetArr[0].split('-');
          } //time


          if (DateTimePresetArr[1]) {
            timeArr = DateTimePresetArr[1].split(':');
          }

          yr = parseInt(dateArr[0]) || null;
          mo = parseInt(dateArr[1] - 1) || null;
          dy = parseInt(dateArr[2]) || null;
          hr = parseInt(timeArr[0]) || null;
          mn = parseInt(timeArr[1]) || null;
        }
      }

      var toReturn = false;

      if (Object.prototype.toString.call(new Date(yr, mo, dy, hr, mn)) == '[object Date]') {
        toReturn = new Date(yr, mo, dy, hr, mn);
      }

      return toReturn;
    }
  };

  FwDate.toHuman = function toHuman(date, format) {
    var d = FwDate.toParsed(date);
    format = format || validation.DateTimePreset.HumanDate.template;

    if (d) {
      var iFormat,
          output = '',
          literal = false; // Check whether a format character is doubled

      var lookAhead = function lookAhead(match) {
        var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;

        if (matches) {
          iFormat++;
        }

        return matches;
      },
          // Format a number, with leading zero if necessary
      formatNumber = function formatNumber(match, value, len) {
        var num = '' + value;

        if (lookAhead(match)) {
          while (num.length < len) {
            num = '0' + num;
          }
        }

        return num;
      },
          // Format a name, short or long as requested
      formatName = function formatName(match, value, shortNames, longNames) {
        return lookAhead(match) ? longNames[value] : shortNames[value];
      };

      for (iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
            literal = false;
          } else {
            output += format.charAt(iFormat);
          }
        } else {
          switch (format.charAt(iFormat)) {
            case 'd':
              //date number
              output += formatNumber('d', d.getDate(), 2);
              break;

            case 'D':
              //day of the week
              output += formatName('D', d.getDay(), validation.dayNamesShort, validation.dayNames);
              break;

            case 'o':
              //day of year hmm
              output += formatNumber('o', Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000), 3);
              break;

            case 'm':
              //month
              output += formatNumber('m', d.getMonth() + 1, 2);
              break;

            case 'M':
              //month but name
              output += formatName('M', d.getMonth(), validation.monthNamesShort, validation.monthNames);
              break;

            case 'y':
              //year
              output += lookAhead('y') ? d.getFullYear() : (d.getFullYear() % 100 < 10 ? '0' : '') + d.getFullYear() % 100;
              break;

            case 'H':
              //12 hour
              output += formatNumber('H', d.getHours() % 12 || 12, 2);
              break;

            case 'h':
              //24 hour
              output += formatNumber('h', d.getHours(), 2);
              break;

            case 'i':
              //minute
              output += formatNumber('i', d.getMinutes(), 2);
              break;

            case 'a':
              //am /pm
              output += d.getHours() >= 12 ? 'pm' : 'am';
              break;

            case 'A':
              //AM/PM
              output += d.getHours() >= 12 ? 'PM' : 'AM';
              break;

            case "'":
              if (lookAhead("'")) {
                output += "'";
              } else {
                literal = true;
              }

              break;

            default:
              output += format.charAt(iFormat);
          }
        }
      }

      return output;
    } else {
      return false;
    }
  };

  FwDate.toVal = function toVal(date) {
    var d = FwDate.toParsed(date);

    if (d) {
      return this.toHuman(d, validation.DateTimePreset.Value.template);
    }
  };

  FwDate.adjacentMonth = function adjacentMonth(date, offsetByMonth, dateOverride) {
    var d = FwDate.toParsed(date);

    if (d) {
      dateOverride = dateOverride || null;

      var currMonth = d.getMonth(),
          currYear = d.getFullYear(),
          newMonth = function () {
        var toReturn;

        if ((currMonth + offsetByMonth) % 12 > 12) {
          toReturn = (currMonth + offsetByMonth) % 12 - 12;
        } else if ((currMonth + offsetByMonth) % 12 < 0) {
          toReturn = (currMonth + offsetByMonth) % 12 + 12;
        } else {
          toReturn = (currMonth + offsetByMonth) % 12;
        }

        return toReturn;
      }(),
          newYear = function () {
        var defOffset = parseInt(offsetByMonth / 12);
        var toReturn = currYear + defOffset; //offset to adjacent year

        if (offsetByMonth < 0 && currMonth + offsetByMonth % 12 < 0) {
          toReturn -= 1;
        } else if (offsetByMonth > 0 && currMonth + offsetByMonth % 12 > 11) {
          toReturn += 1;
        }

        return toReturn;
      }();

      d.setMonth(newMonth);
      d.setFullYear(newYear);

      if (dateOverride) {
        d.setDate(dateOverride);
      }

      return d;
    } else {
      return false;
    }
  };

  return FwDate;
}(data_helper.default);

/* harmony default export */ const data_helper_date = (FwDate);
// EXTERNAL MODULE: ./js/src/classes/component.js
var component = __webpack_require__(12);
// EXTERNAL MODULE: ./js/src/util/ui.js
var ui = __webpack_require__(14);
// EXTERNAL MODULE: ./js/src/dropdown.js
var src_dropdown = __webpack_require__(15);
;// CONCATENATED MODULE: ./js/src/form/form-calendar.js
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function form_calendar_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }










var NAME = 'formCalendar';
var ARG_ATTRIBUTE_NAME = 'calendar';
var COMPONENT_CLASS = "input-calendar";
var ACTIVATED_CLASS = "active";
var DATA_KEY = core.default.settings.prefix + "." + NAME;
var EVENT_KEY = "." + DATA_KEY;
var EVENT_CLICK = "click" + EVENT_KEY;
var EVENT_KEYUP = "keyup" + EVENT_KEY;
var EVENT_CHANGE = "change" + EVENT_KEY;
var EVENT_BEFORE_INIT = "before_init" + EVENT_KEY;
var EVENT_INIT = "init" + EVENT_KEY;
var EVENT_AFTER_INIT = "after_init" + EVENT_KEY;
var EVENT_BEFORE_CREATE = "before_create" + EVENT_KEY;
var EVENT_CREATE = "create" + EVENT_KEY;
var EVENT_AFTER_CREATE = "after_create" + EVENT_KEY;
var EVENT_BEFORE_UPDATE = "before_update" + EVENT_KEY;
var EVENT_UPDATE = "update" + EVENT_KEY;
var EVENT_AFTER_UPDATE = "after_update" + EVENT_KEY;

var FormCalendar = /*#__PURE__*/function (_FwComponent) {
  form_calendar_inheritsLoose(FormCalendar, _FwComponent);

  function FormCalendar(element, valueToRender, args) {
    var _this;

    _this = _FwComponent.call(this, element, {
      UiValue: valueToRender || false,
      _customArgs: args || false
    }) || this;

    _this._arrowHtml = function (buttonClass) {
      var symbolClass, arrowDate, disValid, arrowClass; //set a new date with no date because fuck that boi
      // console.warn(buttonClass,'hello i fucked up','\n',FwDate.toParsed(uiValue),'\n',this._calendar.startDate,'\n', new Date(this._calendar.year,this._calendar.month));

      switch (buttonClass) {
        case 'prev-month':
          symbolClass = 'symbol-arrow-left';
          arrowClass = 'month';
          arrowDate = data_helper_date.toVal(data_helper_date.adjacentMonth(_this._calendar.startDate, -1));
          disValid = _this.validates(new Date(_this._calendar.year, _this._calendar.month, 0), true);
          break;

        case 'prev-year':
          symbolClass = 'symbol-arrow-double-left';
          arrowClass = 'year';
          arrowDate = data_helper_date.toVal(data_helper_date.adjacentMonth(_this._calendar.startDate, -12));
          disValid = _this.validates(new Date(_this._calendar.year - 1, _this._calendar.month, 0), true);
          break;

        case 'next-month':
          symbolClass = 'symbol-arrow-right';
          arrowClass = 'month';
          arrowDate = data_helper_date.toVal(data_helper_date.adjacentMonth(_this._calendar.startDate, 1));
          disValid = _this.validates(new Date(_this._calendar.year, _this._calendar.month + 1, 1), true);
          break;

        case 'next-year':
          symbolClass = 'symbol-arrow-double-right';
          arrowClass = 'year';
          arrowDate = data_helper_date.toVal(data_helper_date.adjacentMonth(_this._calendar.startDate, 12));
          disValid = _this.validates(new Date(_this._calendar.year + 1, _this._calendar.month, 1), true);
          break;
      } //kung yung at least yung last day nang prev or first day ng next man lang ay valid pwidi sya ipindoot


      var htmlString = "<button type=\"button\" \n\t\t\tclass=\"\n\t\t\t\t" + (!disValid ? "disabled " : '') + "\n\t\t\t\t" + (0,ui.UiPrefix)(COMPONENT_CLASS) + "navigation\n\t\t\t\t" + (0,ui.UiPrefix)(COMPONENT_CLASS) + "button\n\t\t\t\t" + (0,ui.UiPrefix)(COMPONENT_CLASS) + arrowClass + "\n\t\t\t\t" + (0,ui.UiPrefix)(COMPONENT_CLASS) + buttonClass + "\" data-value=\"" + arrowDate + "\"\n\t\t\t>\n\t\t\t\t<i class=\"" + (0,ui.UiPrefix)(COMPONENT_CLASS) + "symbol symbol " + symbolClass + "\"></i>\n\t\t\t</button>";
      return htmlString;
    };

    _this._blockHtml = function (date, customClass) {
      customClass = customClass || '';
      return "<button type=\"button\" data-value=\"" + data_helper_date.toVal(date) + "\"\n\t\t\t\tclass=\"\n\t\t\t\t" + (0,ui.UiPrefix)(COMPONENT_CLASS) + "block\n\t\t\t\t" + (0,ui.UiPrefix)(COMPONENT_CLASS) + "button\n\t\t\t\t" + (0,ui.UiPrefix)(COMPONENT_CLASS) + "date\n\t\t\t\t" + customClass + "\n\t\t\t\">\n\t\t\t\t<span>" + date.getDate() + "</span>\n\t\t\t</button>";
    };

    return _this;
  }

  var _proto = FormCalendar.prototype;

  _proto.dispose = function dispose() {
    _FwComponent.prototype.dispose.call(this);

    this.UiValue = null;
    this._customArgs = null;
  };

  _proto.update = function update(newValue, valueToRender) {
    data_helper_event.default.trigger(_FwComponent.prototype.UiEl.call(this), EVENT_BEFORE_UPDATE);
    var theValue = data_helper_date.toVal(newValue) || this.theValue;
    var uiValue = data_helper_date.toVal(valueToRender) || theValue || this.renderValue;
    data_helper_event.default.trigger(_FwComponent.prototype.UiEl.call(this), EVENT_UPDATE); //set up calendar

    if (this.validates(theValue) || !theValue) {
      this.theValue = data_helper_date.toVal(theValue, false);
      this.renderValue = uiValue;

      this._createUi();
    } //user visual feedback if it has a valid bitch


    if (this.validates(theValue)) {
      this.UiRoot.classList.remove('input-error');
    } else {
      this.UiRoot.classList.add('input-error');
    }

    if (this.theValue) {
      this.UiDates.forEach(function (date) {
        if (date.getAttribute('data-value') == theValue) {
          date.classList.add(ACTIVATED_CLASS);
        } else {
          date.classList.remove(ACTIVATED_CLASS);
        }
      });

      if (this.UiInput) {
        this.UiInputValue = theValue;
      }
    }

    data_helper_event.default.trigger(_FwComponent.prototype.UiEl.call(this), EVENT_AFTER_UPDATE);
  };

  _proto.validates = function validates(date, rangeOnly) {
    date = date || this.theValue;
    rangeOnly = rangeOnly || false; //range,spot

    var d = data_helper_date.toParsed(date),
        checkAgainst = this.args.disabledDates.split(',');
    var toReturn = true;

    if (!rangeOnly) {
      //if in disabled dates
      if (checkAgainst.includes(data_helper_date.toVal(d))) {
        // console.warn('value is declared disabled specifically || ',FwDate.toVal(d));
        toReturn = false;
      } //weekend


      if (checkAgainst.includes('weekends') && (d.getDay() == 0 || d.getDay() == 6)) {
        // console.warn('value was a weekend || ',FwDate.toVal(d),FwDate.toVal(d));
        toReturn = false;
      }
    } //in the past


    var dateNow = new Date();
    dateNow.setHours(0, 0, 0, 0);

    if (checkAgainst.includes('past') && d < dateNow) {
      // console.warn('value was in the past || ',FwDate.toVal(d),'\nversus ',FwDate.toVal(dateNow));
      toReturn = false;
    }

    if (checkAgainst.includes('future') && d > dateNow) {
      // console.warn('value was in the future || ',FwDate.toVal(date),'\nversus ',FwDate.toVal(dateNow));
      toReturn = false;
    } //if  in range of min or max


    if (data_helper_date.toParsed(this.args.max) && data_helper_date.toParsed(this.args.max) < d || data_helper_date.toParsed(this.args.min) && d < data_helper_date.toParsed(this.args.min)) {
      // console.warn('value not in max and width || ',FwDate.toVal(d));;
      toReturn = false;
    } //check if values are actually legit dates
    //month
    //date


    return toReturn;
  };

  _proto._createUi = function _createUi(elem, uiValue) {
    var _this2 = this;

    var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);
    data_helper_event.default.trigger(element, EVENT_BEFORE_CREATE);
    uiValue = uiValue || this.renderValue;
    this.renderValue = uiValue;
    var theUi = {};
    data_helper_event.default.trigger(element, EVENT_CREATE);
    theUi.container = this.UiRoot;

    if (!theUi.container) {
      theUi.container = document.createElement('div');
      element.parentNode.insertBefore(theUi.container, element);
      theUi.container.appendChild(element);
      theUi.container.setAttribute('class', core.default.settings.uiClass + "\n\t\t\t\t" + core.default.settings.uiJsClass + "\n\t\t\t\t" + element.getAttribute('class').toString().replace(COMPONENT_CLASS, (0,ui.UiPrefix)(COMPONENT_CLASS, true)));
    }

    theUi.inputWrapper = theUi.container.querySelector("." + (0,ui.UiPrefix)(COMPONENT_CLASS) + "input");
    var components = dom.default.getSiblings(element);
    components.forEach(function (component) {
      if (component !== theUi.inputWrapper) {
        component.parentNode.removeChild(component);
      }
    }); //input

    if (this.args.textInput) {
      if (!theUi.inputWrapper) {
        theUi.inputWrapper = document.createElement('div');
        theUi.container.appendChild(theUi.inputWrapper);
        theUi.inputWrapper.setAttribute('class', (0,ui.UiPrefix)(COMPONENT_CLASS) + "input");
        theUi.inputWrapper.innerHTML = '<input class="input input-single-line" type="text" maxlength="10" placeholder="MM/DD/YYYY" />';
      }
    } //date 4 u
    //heading


    theUi.heading = document.createElement('div');
    theUi.container.appendChild(theUi.heading);
    theUi.heading.setAttribute('class', (0,ui.UiPrefix)(COMPONENT_CLASS) + "heading"); //arrowz

    var butts = ['prev-year', 'prev-month', 'next-month', 'next-year'];
    butts.forEach(function (butt) {
      if (_this2.args.yearSkip && (butt == 'prev-year' || butt == 'next-year') || _this2.args.monthSkip && (butt == 'prev-month' || butt == 'next-month')) {
        theUi.heading.innerHTML += _this2._arrowHtml(butt);
      }
    }); //title

    theUi.title = document.createElement('div');
    theUi.heading.appendChild(theUi.title);
    theUi.title.setAttribute('class', (0,ui.UiPrefix)(COMPONENT_CLASS) + "title " + (0,ui.UiPrefix)(COMPONENT_CLASS) + "dropdown-toggle\n\t\t\t\t" + ui.UiDynamicClass //NEED THIS AT ALL TIMES IF U DONT WANNA DIE
    );
    theUi.title.setAttribute('data-toggle', 'dropdown');
    theUi.title.innerHTML = "<span\n\t\t\t\tclass=\"" + (0,ui.UiPrefix)(COMPONENT_CLASS) + "month-text\">\n\t\t\t\t\t" + validation.monthNamesShort[this._calendar.month] + "\n\t\t\t\t</span>\n\t\t\t\t<span class=\"" + (0,ui.UiPrefix)(COMPONENT_CLASS) + "year-text\">\n\t\t\t\t\t" + this._calendar.year + "\n\t\t\t\t</span>\n\t\t\t\t<i class=\"" + (0,ui.UiPrefix)(COMPONENT_CLASS) + "symbol symbol symbol-caret-down no-margin-x\"></i>"; //dropdown

    var dropdown = document.createElement('ul');
    theUi.heading.appendChild(dropdown);
    dropdown.setAttribute('data-dropdown-width', '100%');
    dropdown.setAttribute('class', (0,ui.UiPrefix)(COMPONENT_CLASS) + "dropdown dropdown dropdown-center-x dropdown-top-flush text-align-center");
    dropdown.innerHTML += "<li \n\t\t\t\t\tclass=\"" + (0,ui.UiPrefix)(COMPONENT_CLASS) + "current-month-year active\"\n\t\t\t\t>\n\t\t\t\t\t<a href=\"#\"\n\t\t\t\t\t\tclass=\"" + (0,ui.UiPrefix)(COMPONENT_CLASS) + "month\"\n\t\t\t\t\t\tdata-value=\"" + data_helper_date.toVal(this._calendar.startDate) + "\"\n\t\t\t\t\t>\n\t\t\t\t\t\t" + validation.monthNamesShort[this._calendar.month] + " " + this._calendar.year + "\n\t\t\t\t\t</a>\n\t\t\t\t</li>\n\t\t\t\t<li><hr class=\"dropdown-separator\"></li>";
    theUi.dropdown = new src_dropdown.default(dropdown, theUi.title).UiEl();
    var dropdownInit, dropdownLimit;

    if (this.args.yearSpan == 0) {
      dropdownInit = this._calendar.startDate.getMonth() * -1;
      dropdownLimit = 11 - this._calendar.startDate.getMonth();
    } else {
      dropdownInit = parseInt(-12 * parseInt(this.args.yearSpan));
      dropdownLimit = parseInt(12 * parseInt(this.args.yearSpan));
    } //update dropdown


    var _loop = function _loop(i) {
      var listItemDate = data_helper_date.adjacentMonth(_this2._calendar.startDate, i);

      var dateForValidation = function () {
        var toReturn;

        if (i >= 0) {
          //first day of month
          toReturn = new Date(listItemDate.getFullYear(), listItemDate.getMonth(), 1);
        } else {
          //last day of month
          toReturn = new Date(listItemDate.getFullYear(), listItemDate.getMonth() + 1, 0);
        }

        return toReturn;
      }();

      if (_this2.validates(dateForValidation, true)) {
        var currClass = i == 0 ? 'active' : '',
            listItem = "<li class=\"" + currClass + "\">\n\t\t\t\t\t\t\t<a href=\"#\"\n\t\t\t\t\t\t\t\tclass=\"" + (0,ui.UiPrefix)(COMPONENT_CLASS) + "month\"\n\t\t\t\t\t\t\t\tdata-value=\"" + data_helper_date.toVal(listItemDate) + "\">\n\t\t\t\t\t\t\t\t\t" + validation.monthNamesShort[listItemDate.getMonth()] + " " + listItemDate.getFullYear() + "\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t" + (listItemDate.getMonth() == 11 && i !== dropdownLimit ? "</li><li><hr class=\"dropdown-separator\">" : '') + "\n\t\t\t\t\t\t</li>";
        theUi.dropdown.innerHTML += listItem;
      }
    };

    for (var i = dropdownInit; i <= dropdownLimit; i++) {
      _loop(i);
    } //generate grid


    theUi.grid = document.createElement('div');
    theUi.container.append(theUi.grid);
    theUi.grid.setAttribute('class', (0,ui.UiPrefix)(COMPONENT_CLASS) + "grid"); //days heading

    theUi.days = document.createElement('div');
    theUi.grid.append(theUi.days);
    theUi.days.setAttribute('class', (0,ui.UiPrefix)(COMPONENT_CLASS) + "days");
    var daysHTML = '',
        dayToRetrieve = parseInt(this.args.startDay);

    for (var _i = 0; _i < 7; _i++) {
      if (dayToRetrieve > 6) {
        dayToRetrieve -= 7;
      }

      daysHTML += "<div\n\t\t\t\t\t\tclass=\"" + (0,ui.UiPrefix)(COMPONENT_CLASS) + "block\n\t\t\t\t\t\t" + (0,ui.UiPrefix)(COMPONENT_CLASS) + "day\"\n\t\t\t\t\t>\n\t\t\t\t\t\t" + validation.dayNamesShorter[dayToRetrieve] + "\n\t\t\t\t\t</div>";
      dayToRetrieve++;
    }

    theUi.days.innerHTML = daysHTML; //days

    theUi.dates = document.createElement('div');
    theUi.grid.append(theUi.dates);
    theUi.dates.setAttribute('class', (0,ui.UiPrefix)(COMPONENT_CLASS) + "dates"); //previous month

    var freeGridSpacePrev = (this._calendar.startDate.getDay() - parseInt(this.args.startDay) + 7) % 7,
        calendarPrevDayStart = this._calendar.prevDay == 6 ? 0 : this._calendar.prevDay + 1;

    if (calendarPrevDayStart !== parseInt(this.args.startDay)) {
      //if it doenst take its own row of shit
      // i = 0; i <= freeGridSpacePrev; i++
      // @TODO AAAAAAAAAAAA FIGURE OUT THE MATH
      // for( dayLoopI = this._calendar.prevDay; dayLoopI >= (parseInt(this.args.startDay)); dayLoopI--){
      // for(let i = 0; i < 7; i++){
      for (var _i2 = 0; _i2 < freeGridSpacePrev; _i2++) {
        var offset = this._calendar.prevDate.getDate() - _i2;

        var loopDatePrev = new Date(this._calendar.prevDate.getFullYear(), this._calendar.prevDate.getMonth(), offset);

        var dateBlockPrev = this._blockHtml(loopDatePrev, (0,ui.UiPrefix)(COMPONENT_CLASS) + "block-adjacent\n\t\t\t\t\t\t\t" + (!this.validates(loopDatePrev) ? 'disabled' : '')); //prepend because we loopped this bitch in reverse


        theUi.dates.innerHTML += dateBlockPrev;
      }
    } //curr month


    for (var _i3 = 1; _i3 <= this._calendar.lastDate.getDate(); _i3++) {
      var dateBlockCurr = this._blockHtml(new Date(this._calendar.year, this._calendar.month, _i3), !this.validates(new Date(this._calendar.year, this._calendar.month, _i3)) ? 'disabled' : '');

      theUi.dates.innerHTML += dateBlockCurr;
    } //next month just fill the shit


    var currNextFirstDay = new Date(this._calendar.year, this._calendar.month + 1, 1).getDay(),
        freeGridSpaceNext = (7 - currNextFirstDay + parseInt(this.args.startDay)) % 7;

    if (currNextFirstDay !== parseInt(this.args.startDay)) {
      for (var _i4 = 1; _i4 <= freeGridSpaceNext; _i4++) {
        var loopDateNext = new Date(this._calendar.year, this._calendar.month + 1, _i4);

        var dateBlockNext = this._blockHtml(loopDateNext, (0,ui.UiPrefix)(COMPONENT_CLASS) + 'block-adjacent ' + (!this.validates(loopDateNext) ? 'disabled' : ''));

        theUi.dates.innerHTML += dateBlockNext;
      }
    }

    data_helper_event.default.trigger(element, EVENT_AFTER_CREATE);
  };

  _proto._render = function _render() {
    this.update();
  };

  FormCalendar.renderAll = function renderAll() {
    data_helper_event.default.trigger(document, EVENT_BEFORE_INIT);
    var calendars = document.querySelectorAll("." + COMPONENT_CLASS);
    data_helper_event.default.trigger(document, EVENT_INIT);
    calendars.forEach(function (calendar) {
      var cal = new FormCalendar(calendar);

      cal._render();
    });
    data_helper_event.default.trigger(document, EVENT_AFTER_INIT);
  };

  FormCalendar.handleChange = function handleChange() {
    return function (e) {
      var calendar = new FormCalendar(e.target);
      calendar.update();
    };
  };

  FormCalendar.handleUpdateKeyup = function handleUpdateKeyup() {
    return function (e) {
      if (component.default.isDisabled(e.target)) {
        e.preventDefault();
      } else {
        var calendar = new FormCalendar(e.target.closest("." + (0,ui.UiPrefix)(COMPONENT_CLASS, true)).querySelector("." + COMPONENT_CLASS));
        var uiInput = e.target.value;

        if (uiInput.match(/^\d{2}$/) !== null) {
          e.target.value = uiInput + "/";
        } else if (uiInput.match(/^\d{2}\/\d{2}$/) !== null) {
          e.target.value = uiInput + "/";
        }

        var pattern = new RegExp(validation.DateTimePreset.HumanDate.pattern);
        var isValid = pattern.test(uiInput);

        if (calendar && isValid) {
          var theValue = uiInput.split('/');
          var y = theValue[2] || '';
          var m = theValue[0] || '';
          var d = theValue[1] || '';
          var preParsedVal = y + "-" + m + "-" + d;
          calendar.update(preParsedVal);
        }
      }
    };
  };

  FormCalendar.handleUpdateClick = function handleUpdateClick() {
    return function (e) {
      e.preventDefault();

      if (!component.default.isDisabled(e.target)) {
        var calendar = new FormCalendar(e.target.closest("." + (0,ui.UiPrefix)(COMPONENT_CLASS, true)).querySelector("." + COMPONENT_CLASS));
        calendar.update(e.target.getAttribute('data-value'));
      }
    };
  };

  FormCalendar.handleRenderClick = function handleRenderClick() {
    return function (e) {
      e.preventDefault();

      if (!component.default.isDisabled(e.target)) {
        var calendar = new FormCalendar(e.target.closest("." + (0,ui.UiPrefix)(COMPONENT_CLASS, true)).querySelector("." + COMPONENT_CLASS));
        calendar.update(null, e.target.getAttribute('data-value'));
      }
    };
  };

  FormCalendar.initListeners = function initListeners() {
    data_helper_event.default.addListener(document, EVENT_CHANGE, COMPONENT_CLASS, FormCalendar.handleChange());
    data_helper_event.default.addListener(document, EVENT_KEYUP, "." + (0,ui.UiPrefix)(COMPONENT_CLASS) + "input input", FormCalendar.handleUpdateKeyup());
    data_helper_event.default.addListener(document, EVENT_CLICK, "." + (0,ui.UiPrefix)(COMPONENT_CLASS) + "date", FormCalendar.handleUpdateClick());
    data_helper_event.default.addListener(document, EVENT_CLICK, "." + (0,ui.UiPrefix)(COMPONENT_CLASS) + "month, ." + (0,ui.UiPrefix)(COMPONENT_CLASS) + "year", FormCalendar.handleRenderClick());
    initiator.FwFnsQ.on_ready = FormCalendar.renderAll;
  };

  _createClass(FormCalendar, [{
    key: "theValue",
    get: function get() {
      return _FwComponent.prototype.UiEl.call(this).value ? data_helper_date.toVal(_FwComponent.prototype.UiEl.call(this).value) : false;
    },
    set: function set(theValue) {
      if (theValue) {
        _FwComponent.prototype.UiEl.call(this).setAttribute('value', data_helper_date.toVal(theValue));

        _FwComponent.prototype.UiEl.call(this).value = data_helper_date.toVal(theValue);
      }
    }
  }, {
    key: "renderValue",
    get: function get() {
      var theRenderDate = this.UiValue ? this.UiValue : this.theValue ? this.theValue : new Date();
      return data_helper_date.toVal(theRenderDate);
    },
    set: function set(renderDate) {
      this.UiValue = renderDate;
    }
  }, {
    key: "UiInputValue",
    get: function get() {
      return this.UiInput && data_helper_date.toVal(this.UiInput.value);
    },
    set: function set(uiValue) {
      if (uiValue) {
        this.UiInput.setAttribute('value', data_helper_date.toHuman(uiValue));
        this.UiInput.value = data_helper_date.toHuman(uiValue);
      }
    }
  }, {
    key: "UiRoot",
    get: function get() {
      return _FwComponent.prototype.UiEl.call(this).closest("." + (0,ui.UiPrefix)(COMPONENT_CLASS, true));
    }
  }, {
    key: "UiDates",
    get: function get() {
      return this.UiRoot && this.UiRoot.querySelectorAll("." + (0,ui.UiPrefix)(COMPONENT_CLASS) + "date");
    }
  }, {
    key: "UiInput",
    get: function get() {
      return this.UiRoot.querySelector("." + (0,ui.UiPrefix)(COMPONENT_CLASS) + "input input");
    }
  }, {
    key: "args",
    get: function get() {
      return component.default._parseArgs(this._customArgs ? this._customArgs : {
        "class": _FwComponent.prototype.UiEl.call(this).getAttribute('class'),
        startDay: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-start-day"),
        // 0,1,2,3,4,5,6
        min: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-min") || _FwComponent.prototype.UiEl.call(this).getAttribute('min'),
        max: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-max") || _FwComponent.prototype.UiEl.call(this).getAttribute('max'),
        yearSpan: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-year-span"),
        disabledDates: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-disabled-dates"),
        textInput: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-text-input"),
        monthSkip: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-month-skip"),
        yearSkip: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-year-skip")
      }, FormCalendar.configDefaults);
    }
  }, {
    key: "_calendar",
    get: function get() {
      var renderDate = this.renderValue;
      var toReturn = {
        year: data_helper_date.toParsed(renderDate).getFullYear(),
        month: data_helper_date.toParsed(renderDate).getMonth()
      };
      toReturn.startDate = new Date(toReturn.year, toReturn.month, 1);
      toReturn.lastDate = new Date(toReturn.year, toReturn.month + 1, 0);
      toReturn.prevDate = new Date(toReturn.year, toReturn.month, 0);
      toReturn.prevDay = toReturn.prevDate.getDay();
      return toReturn;
    }
  }], [{
    key: "configDefaults",
    get: function get() {
      return {
        "class": '',
        startDay: {
          value: 0,
          parser: function parser(value) {
            return parseInt(value) % 7;
          }
        },
        // su,mo,tu,we,th,fr,sa,
        min: null,
        max: null,
        yearSpan: {
          value: 0,
          parser: function parser(value) {
            if (parseInt(value) <= 0) {
              value = 0;
            }

            return value;
          }
        },
        disabledDates: '',
        //yyyy-mm-dd,weekends,past,future
        textInput: false,
        monthSkip: true,
        yearSkip: false
      };
    }
  }, {
    key: "DATA_KEY",
    get: function get() {
      return DATA_KEY;
    }
  }]);

  return FormCalendar;
}(component.default);

/* harmony default export */ const form_calendar = (FormCalendar);
FormCalendar.initListeners();
// EXTERNAL MODULE: ./js/src/form/form-tags.js
var form_tags = __webpack_require__(17);
;// CONCATENATED MODULE: ./js/src/form.js


var Form = {
  FormCalendar: form_calendar,
  FormTags: form_tags.default
};
/* harmony default export */ const src_form = (Form);

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _util_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _util_initiator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _util_modifiers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var _data_helper_event_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _data_helper_array_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19);
/* harmony import */ var _data_helper_dom_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _classes_component_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12);
/* harmony import */ var _util_ui_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(14);
/* harmony import */ var _form_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(16);
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }










var NAME = 'formTags';
var ARG_ATTRIBUTE_NAME = 'tags';
var COMPONENT_CLASS = "input-tags";
var FOCUS_CLASS = "focus";
var DATA_KEY = _util_core_js__WEBPACK_IMPORTED_MODULE_0__.default.settings.prefix + "." + NAME;
var EVENT_KEY = "." + DATA_KEY;
var EVENT_CLICK = "click" + EVENT_KEY;
var EVENT_KEYDOWN = "keydown" + EVENT_KEY;
var EVENT_BLUR = "blur" + EVENT_KEY;
var EVENT_PASTE = "paste" + EVENT_KEY;
var EVENT_CHANGE = "change" + EVENT_KEY;
var EVENT_BEFORE_INIT = "before_init" + EVENT_KEY;
var EVENT_INIT = "init" + EVENT_KEY;
var EVENT_AFTER_INIT = "after_init" + EVENT_KEY;
var EVENT_BEFORE_CREATE = "before_create" + EVENT_KEY;
var EVENT_CREATE = "create" + EVENT_KEY;
var EVENT_AFTER_CREATE = "after_create" + EVENT_KEY;
var EVENT_BEFORE_UPDATE = "before_update" + EVENT_KEY;
var EVENT_UPDATE = "update" + EVENT_KEY;
var EVENT_AFTER_UPDATE = "after_update" + EVENT_KEY;
var INPUT_STRING = "__fw_input__";

var FormTags = /*#__PURE__*/function (_FwComponent) {
  _inheritsLoose(FormTags, _FwComponent);

  function FormTags(element, valueToRender, args) {
    return _FwComponent.call(this, element, {
      UiValue: valueToRender || false,
      _customArgs: args || false
    }) || this;
  }

  var _proto = FormTags.prototype;

  _proto.dispose = function dispose() {
    _FwComponent.prototype.dispose.call(this);

    this.UiValue = null;
    this._customArgs = null;
  };

  _proto._scrollToUiInput = function _scrollToUiInput() {
    if (this.args.multipleLines || !this.UiInput) {
      return;
    }

    if (this.UiRoot.scrollLeft > this.UiInput.offsetLeft + this.UiInput.offsetWidth || this.UiRoot.scrollLeft + this.UiRoot.clientWidth < this.UiInput.offsetLeft + this.UiInput.offsetWidth) {
      _data_helper_dom_js__WEBPACK_IMPORTED_MODULE_5__.default.scrollToElem(this.UiRoot, this.UiInput, 'x');
      _data_helper_dom_js__WEBPACK_IMPORTED_MODULE_5__.default.scrollToElem(this.UiRoot, this.UiInput, 'y');
    }
  };

  FormTags.toArr = function toArr(value, returnsWithInput) {
    returnsWithInput = returnsWithInput !== false || returnsWithInput == true;
    var toReturn = Array.isArray(value) ? value : typeof value == 'string' ? value.split(',') : []; //remove duplicates

    toReturn = toReturn.reduce(function (acc, tag) {
      if (!acc.includes(tag) && tag !== '') {
        acc.push(tag);
      }

      return acc;
    }, []); //check for ya boi

    toReturn.forEach(function (tag, i) {
      if (!tag || tag == '' || tag === FormTags.__is && !returnsWithInput) {
        toReturn.splice(i, 1);
      }
    });

    if (returnsWithInput && toReturn.indexOf(FormTags.__is) < 0) {
      toReturn.push(FormTags.__is);
    }

    return toReturn;
  };

  FormTags.toVal = function toVal(value, returnsWithInput) {
    return FormTags.toArr(value, returnsWithInput).join(',');
  };

  _proto.filterValue = function filterValue(custFn) {
    var _this = this;

    var fnToFilter, applyFilter;

    try {
      fnToFilter = custFn || eval(this.args.filter);
    } catch (err) {}

    if (typeof fnToFilter === 'function') {
      applyFilter = function applyFilter(valueToFilter, filterFnName) {
        var noInputValueToFilter = function () {
          return FormTags.toVal(valueToFilter, false);
        }(); // turn to array ya bopi without the input tag string


        var toReturn = FormTags.toArr(eval(filterFnName + "(\"" + noInputValueToFilter + "\")"), false); // console.log(
        // 	'index of input\n',inputIndex,
        // 	'\n\n\nfiltered and ready for splice\n',toReturn,
        // 	'\n\n\npassed to the fil;ter\n'FormTags.toVal(valueToFilter,false),
        // 	'\n\n\nrar array\n'FormTags.toArr(valueToFilter),
        // 	'\n\n\n no input field\n',noInputValueToFilter,FormTags.toVal(valueToFilter,false),
        // 	'\n\n\n no input fieldas array\n'FormTags.toArr(valueToFilter,false),
        // 	'\n\n\n string for eval\n', ( filterFnName +'("'+ noInputValueToFilter +'")'),
        // 	'\n\n\neval\n',  eval(filterFnName +'("'+ noInputValueToFilter +'")'),
        // 	'whAT ETHE FUCK'
        // );

        if (_this.UiInputIdx > -1) {
          toReturn.splice(_this.UiInputIdx < FormTags.toArr(valueToFilter).length - 1 ? _this.UiInputIdx : toReturn.length, 0, FormTags.__is);
        }

        return FormTags.toVal(toReturn);
      };

      this.theValue = applyFilter(this.theValue, this.args.filter);
      this.renderValue = applyFilter(this.renderValue, this.args.filter);
    }
  };

  _proto.update = function update(newValue, allowFilter, valueToRender, inputText) {
    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_3__.default.trigger(_FwComponent.prototype.UiEl.call(this), EVENT_BEFORE_UPDATE);
    var theValue = newValue || this.theValue || '';
    var uiValue = valueToRender || theValue || this.renderValue || '';
    allowFilter = allowFilter != false || allowFilter == true;
    inputText = inputText || false;
    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_3__.default.trigger(_FwComponent.prototype.UiEl.call(this), EVENT_UPDATE);
    this.theValue = theValue;
    this.renderValue = uiValue;

    if (this.args.filter && allowFilter) {
      this.filterValue();
    }

    this._createUi();

    if (inputText) {
      this.UiInputValue = inputText;
      this.focus();
    }

    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_3__.default.trigger(_FwComponent.prototype.UiEl.call(this), EVENT_AFTER_UPDATE);
  };

  _proto._createUi = function _createUi(elem) {
    var _this2 = this;

    var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);

    if (!element) {
      return;
    }

    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_3__.default.trigger(element, EVENT_BEFORE_CREATE);
    var theUi = {};
    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_3__.default.trigger(element, EVENT_CREATE);
    theUi.container = this.UiRoot;

    if (!theUi.container) {
      theUi.container = document.createElement('div');
      element.parentNode.insertBefore(theUi.container, element);
      theUi.container.appendChild(element);
      theUi.container.classList.add('input');
      theUi.container.setAttribute('class', _util_core_js__WEBPACK_IMPORTED_MODULE_0__.default.settings.uiClass + "\n\t\t\t\t" + _util_core_js__WEBPACK_IMPORTED_MODULE_0__.default.settings.uiJsClass + "\n\t\t\t\t" + element.getAttribute('class').toString().replace(COMPONENT_CLASS, (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS, true)));
      theUi.container.classList.add(this.args.multipleLines ? (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "multiple" : (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "single");
    }

    if (this.args.width) {
      theUi.container.style = this.args.width;
    } //idk it never exists on initial so we dont have to do weird div wraping catches here


    theUi.wrapper = theUi.container.querySelector("." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "wrapper");

    if (!theUi.wrapper) {
      theUi.wrapper = document.createElement('div');
      theUi.container.appendChild(theUi.wrapper);
      theUi.wrapper.setAttribute('class', (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "wrapper");
      theUi.wrapper = theUi.container.querySelector("." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "wrapper");
    }

    theUi.input = this.UiInput;

    if (!theUi.input) {
      theUi.input = document.createElement('span');
      theUi.wrapper.appendChild(theUi.input);
      theUi.input.setAttribute('class', (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "input");
      theUi.input.contentEditable = true;
      theUi.input = theUi.wrapper.querySelector("." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "input");

      if (element.hasAttribute('placeholder')) {
        theUi.input.setAttribute('data-placeholder', element.getAttribute('placeholder'));
      } //nearest fw-ui parent will actually do tgoggl for bby because baby cant stand up on its own


      if (element.hasAttribute('data-toggle')) {
        theUi.input.setAttribute('data-toggle', element.getAttribute('data-toggle'));
      }

      if (_classes_component_js__WEBPACK_IMPORTED_MODULE_6__.default.isDisabled(element)) {
        theUi.input.classList.add('disabled');
      } //bitch


      if (this.args.onKeyUp) {
        theUi.input.addEventListener('keyup', function (event) {
          var keyUpScript = eval(_this2.args.onKeyUp);

          if (keyUpScript) {
            keyUpScript();
          }

          ;
        });
      }
    } //updoot tags


    var oldTags = theUi.wrapper.querySelectorAll("." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "tag");
    oldTags.forEach(function (tag) {
      tag.parentNode.removeChild(tag);
    });
    var valArr = FormTags.toArr(this.renderValue, true);
    theUi.input.setAttribute('data-ui-i', this.UiInputIdx); //validate tags
    // valArr = valArr.reduce((acc, tag) => {
    // 	if (!acc.includes(tag)) {
    // 		acc.push(tag);
    // 	}
    // 	return acc;
    // }, []);

    valArr.forEach(function (tag, i) {
      //get index of input
      if (tag !== FormTags.__is) {
        var tagHtml = document.createElement('span');

        if (i < _this2.UiInputIdx) {
          theUi.input.insertAdjacentElement('beforebegin', tagHtml);
        } else {
          theUi.wrapper.appendChild(tagHtml);
        }

        tagHtml.setAttribute('class', (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "tag");
        tagHtml.innerHTML = "<button\n\t\t\t\t\t\tdata-ui-i=\"" + i + "\"\n\t\t\t\t\t\tclass=\"" + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "tag-text " + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "tag-button\"\n\t\t\t\t\t\ttype=\"button\"\n\t\t\t\t\t>\n\t\t\t\t\t\t" + tag + "\n\t\t\t\t\t</button>\n\t\t\t\t\t<button data-ui-i=\"" + i + "\" class=\"" + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "tag-close " + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "tag-button\" type=\"button\">\n\t\t\t\t\t\t<i class=\"symbol symbol-close\"></i>\n\t\t\t\t\t</button>";
      }
    }); //attribues

    for (var i = 0; i < element.attributes.length; i++) {
      var attr = element.attributes[i];

      if (attr.specified) {
        if (attr.name.includes('data') && !attr.name.includes('data-tags') && !attr.name.includes('data-toggle') && !attr.name.includes('data-value-ui')) {
          theUi.container.setAttribute(attr.name, attr.value);
        }
      }
    }

    element.setAttribute('data-value-ui', this.renderValue); //keep that shoit bisibol

    this._scrollToUiInput();

    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_3__.default.trigger(element, EVENT_AFTER_CREATE);
  };

  _proto.focus = function focus(disableNative) {
    disableNative = disableNative || false;
    var self = this;
    !disableNative && setTimeout(function () {
      // console.log('poku','naAAANDATAAAOOOO');
      self.UiInput.focus();
    }, 0);
    self.UiRoot.classList.add(FOCUS_CLASS);

    self._scrollToUiInput();
  };

  _proto.blur = function blur(disableNative) {
    disableNative = disableNative || false;
    var self = this;
    !disableNative && setTimeout(function () {
      // console.log('bru','naAAANDATAAAOOOO');
      self.UiInput.blur();
    }, 0);
    self.UiRoot.classList.remove(FOCUS_CLASS);
  };

  _proto._render = function _render() {
    this.update();
  };

  FormTags.renderAll = function renderAll() {
    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_3__.default.trigger(document, EVENT_BEFORE_INIT);
    var tagsInputs = document.querySelectorAll("." + COMPONENT_CLASS);
    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_3__.default.trigger(document, EVENT_INIT);
    tagsInputs.forEach(function (poot) {
      var tagsInput = new FormTags(poot);

      tagsInput._render();
    });
    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_3__.default.trigger(document, EVENT_AFTER_INIT);
  };

  FormTags.handleChange = function handleChange() {
    return function (e) {
      var tagsInput = new FormTags(e.target);
      tagsInput.update();
    };
  };

  FormTags.handleEditablePaste = function handleEditablePaste() {
    return function (e) {
      e.preventDefault();

      if (!_classes_component_js__WEBPACK_IMPORTED_MODULE_6__.default.isDisabled(e.target)) {
        var tagsInput = new FormTags(e.target.closest("." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS, true)).querySelector("." + COMPONENT_CLASS));
        var pasted = e.clipboardData || window.clipboardData || e.originalEvent.clipboardData;
        tagsInput.UiInputValue += pasted.getData('text');
        tagsInput.blur();
      }
    };
  };

  FormTags.handleEditableFocus = function handleEditableFocus() {
    return function (e) {
      e.preventDefault();

      if (!_classes_component_js__WEBPACK_IMPORTED_MODULE_6__.default.isDisabled(e.target)) {
        var tagsInput = new FormTags(e.target);
        tagsInput.focus();
      }
    };
  };

  FormTags.handleEditableBlur = function handleEditableBlur() {
    return function (e) {
      if (!_classes_component_js__WEBPACK_IMPORTED_MODULE_6__.default.isDisabled(e.target)) {
        var tagsInput = new FormTags(e.target.closest("." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS, true)).querySelector("." + COMPONENT_CLASS)); //value para mareset ta kung hain si buloy

        var currValue = FormTags.toArr(tagsInput.theValue);

        if (tagsInput.UiInputValue) {
          currValue.splice(tagsInput.UiInputIdx, 0, tagsInput.UiInputValue.replace(',', ''));
        }

        tagsInput.UiInputValue = '';
        tagsInput.update(FormTags.toVal(currValue, false), true);
        tagsInput.blur(true);
      }
    };
  };

  FormTags.handleEditableKeydown = function handleEditableKeydown() {
    return function (e) {
      if (_classes_component_js__WEBPACK_IMPORTED_MODULE_6__.default.isDisabled(e.target)) {
        e.preventDefault();
      } else {
        var tagsInput = new FormTags(e.target.closest("." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS, true)).querySelector("." + COMPONENT_CLASS));
        var currUiValue = FormTags.toArr(tagsInput.renderValue),
            newValue,
            allowFilter = false;

        switch (e.key) {
          //enter
          case 'Enter':
            e.preventDefault();
            tagsInput.blur();
            break;
          //comma

          case ',':
            if (!_util_modifiers_js__WEBPACK_IMPORTED_MODULE_2__.default.hasActive()) {
              allowFilter = true;
              e.preventDefault();
              currUiValue.splice(tagsInput.UiInputIdx, 0, tagsInput.UiInputValue.replace(',', ''));
              tagsInput.UiInputValue = '';
            } // currUiValue.splice()


            break;
          //left

          case 'ArrowLeft':
            if (!tagsInput.UiInputValue) {
              e.preventDefault();
              currUiValue = _data_helper_array_js__WEBPACK_IMPORTED_MODULE_4__.default.moveItem(currUiValue, tagsInput.UiInputIdx, tagsInput.UiInputIdx > 0 ? tagsInput.UiInputIdx - 1 : 0);
            }

            break;
          //right

          case 'ArrowRight':
            if (!tagsInput.UiInputValue) {
              e.preventDefault();
              currUiValue = _data_helper_array_js__WEBPACK_IMPORTED_MODULE_4__.default.moveItem(currUiValue, tagsInput.UiInputIdx, tagsInput.UiInputIdx < currUiValue.length ? tagsInput.UiInputIdx + 1 : currUiValue.length - 1); // tagsInput._scrollToUiInput();
            }

            break;
          //up

          case 'ArrowUp':
            if (!tagsInput.UiInputValue) {
              e.preventDefault();
              currUiValue = _data_helper_array_js__WEBPACK_IMPORTED_MODULE_4__.default.moveItem(currUiValue, tagsInput.UiInputIdx, 0);
            }

            break;
          //down

          case 'ArrowDown':
            if (!tagsInput.UiInputValue) {
              e.preventDefault();
              currUiValue = _data_helper_array_js__WEBPACK_IMPORTED_MODULE_4__.default.moveItem(currUiValue, tagsInput.UiInputIdx, currUiValue.length - 1); // tagsInput._scrollToUiInput();
            }

            break;
          //backspace

          case 'Backspace':
            if (!tagsInput.UiInputValue) {
              e.preventDefault();
              allowFilter = true;
              currUiValue.splice(tagsInput.UiInputIdx - 1, 1);
            }

            break;
          //delete

          case 'Delete':
            if (!tagsInput.UiInputValue) {
              e.preventDefault();
              allowFilter = true;
              currUiValue.splice(tagsInput.UiInputIdx + 1, 1);
            }

            break;
        }

        newValue = FormTags.toVal(currUiValue); // tagsInput._scrollToUiInput();

        tagsInput.update(newValue, allowFilter);
      }
    };
  };

  FormTags.handleDelete = function handleDelete() {
    return function (e) {
      e.preventDefault();

      if (!_classes_component_js__WEBPACK_IMPORTED_MODULE_6__.default.isDisabled(e.target)) {
        var tagsInput = new FormTags(e.target.closest("." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS, true)).querySelector("." + COMPONENT_CLASS));
        var tagToRemove = parseInt(e.target.getAttribute('data-ui-i'));
        var currValue = FormTags.toArr(tagsInput.theValue);
        currValue.splice(parseInt(tagToRemove), 1);
        var newValue = FormTags.toVal(currValue);
        tagsInput.update(newValue, true);
      }
    };
  };

  FormTags.handleEdit = function handleEdit() {
    return function (e) {
      var triggerer = e.target;
      e.preventDefault();

      if (!_classes_component_js__WEBPACK_IMPORTED_MODULE_6__.default.isDisabled(triggerer)) {
        var tagsInput = new FormTags(e.target.closest("." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS, true)).querySelector("." + COMPONENT_CLASS));
        var tagToEdit = parseInt(e.target.getAttribute('data-ui-i'));
        var currValue = FormTags.toArr(tagsInput.theValue, false);
        currValue.splice(tagToEdit, 1, FormTags.__is);
        var newUiValue = FormTags.toVal(currValue);
        tagsInput.update(null, false, newUiValue, e.target.innerText);
      }
    };
  };

  FormTags.initListeners = function initListeners() {
    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_3__.default.addListener(document, EVENT_CHANGE, COMPONENT_CLASS, FormTags.handleChange());
    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_3__.default.addListener(document, EVENT_PASTE, "." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS, true) + " ." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "input", FormTags.handleEditablePaste());
    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_3__.default.addListener(document, EVENT_CLICK, "." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS, true) + " ." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "input", FormTags.handleEditableFocus());
    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_3__.default.addListener(document, EVENT_BLUR, "." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS, true) + " ." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "input", FormTags.handleEditableBlur());
    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_3__.default.addListener(document, EVENT_KEYDOWN, "." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS, true) + " ." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "input", FormTags.handleEditableKeydown());
    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_3__.default.addListener(document, EVENT_CLICK, "." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS, true) + " ." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "tag-close", FormTags.handleDelete());
    _data_helper_event_js__WEBPACK_IMPORTED_MODULE_3__.default.addListener(document, EVENT_CLICK, "." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS, true) + " ." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "tag-text", FormTags.handleEdit());
    _util_initiator_js__WEBPACK_IMPORTED_MODULE_1__.FwFnsQ.on_ready = FormTags.renderAll;
    _util_initiator_js__WEBPACK_IMPORTED_MODULE_1__.FwFnsQ.on_resize = FormTags.renderAll;
  };

  _createClass(FormTags, [{
    key: "theValue",
    get: function get() {
      return _FwComponent.prototype.UiEl.call(this).value;
      ;
    },
    set: function set(theValue) {
      if (theValue) {
        _FwComponent.prototype.UiEl.call(this).setAttribute('value', FormTags.toVal(theValue, false));

        _FwComponent.prototype.UiEl.call(this).value = FormTags.toVal(theValue, false);
      }
    }
  }, {
    key: "renderValue",
    get: function get() {
      var renderTags = this.UiValue ? this.UiValue : _FwComponent.prototype.UiEl.call(this).hasAttribute('data-value-ui') ? _FwComponent.prototype.UiEl.call(this).getAttribute('data-value-ui') : this.theValue;
      return renderTags;
    },
    set: function set(renderTags) {
      this.UiValue = FormTags.toVal(renderTags);
    }
  }, {
    key: "UiRoot",
    get: function get() {
      return _FwComponent.prototype.UiEl.call(this).closest("." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS, true));
    }
  }, {
    key: "UiInput",
    get: function get() {
      return this.UiRoot && this.UiRoot.querySelector("." + (0,_util_ui_js__WEBPACK_IMPORTED_MODULE_7__.UiPrefix)(COMPONENT_CLASS) + "input");
    }
  }, {
    key: "UiInputValue",
    get: function get() {
      return this.UiInput.innerText;
    },
    set: function set(inputValue) {
      this.UiInput.innerText = inputValue.toString().replace(/\n|\r/g, '\\n');
    }
  }, {
    key: "UiInputIdx",
    get: function get() {
      var toReturn = FormTags.toArr(this.renderValue).indexOf(FormTags.__is);

      if (toReturn < 0) {
        FormTags.toArr(this.renderValue).length > 0 ? FormTags.toArr(this.renderValue).length - 1 : 0;
      }

      return toReturn; // (
      // 	this.UiInput
      // 	&& parseInt(this.UiInput.getAttribute('data-ui-i'))
      // )
      // || FormTags.toArr(this.renderValue).indexOf(FormTags.__is)
      // || FormTags.toArr(this.theValue).length;
    }
  }, {
    key: "args",
    get: function get() {
      return _classes_component_js__WEBPACK_IMPORTED_MODULE_6__.default._parseArgs(this._customArgs ? this._customArgs : {
        width: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-width"),
        callback: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-callback"),
        onKeyUp: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-on-keyup"),
        filter: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-filter"),
        multipleLines: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-multiple-lines")
      }, FormTags.configDefaults);
    }
  }], [{
    key: "DATA_KEY",
    get: function get() {
      return DATA_KEY;
    }
  }, {
    key: "__is",
    get: function get() {
      return INPUT_STRING;
    }
  }, {
    key: "configDefaults",
    get: function get() {
      return {
        width: null,
        callback: null,
        filter: null,
        onKeyUp: null,
        multipleLines: false
      };
    }
  }]);

  return FormTags;
}(_classes_component_js__WEBPACK_IMPORTED_MODULE_6__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormTags);
FormTags.initListeners();

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var Modifiers = {
  keys: {
    ctrl: false,
    shift: false,
    alt: false,
    meta: false
  },
  hasActive: function hasActive(key) {
    key = key || false;

    if (key && this.keys.hasOwnProperty(key)) {
      return this.keys[key];
    } else {
      return this.keys.ctrl || this.keys.shift || this.keys.alt || this.keys.meta;
    }
  },
  update: function update(event) {
    this.keys.shift = event.shiftKey;
    this.keys.ctrl = event.ctrlKey;
    this.keys.alt = event.altKey;
    this.keys.meta = event.metaKey;
  }
}; //key events

document.documentElement.addEventListener('keydown', function (e) {
  Modifiers.update(e);
});
document.documentElement.addEventListener('keyup', function (e) {
  setTimeout(function () {
    Modifiers.update(e);
  }, 100);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modifiers);

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _classes_data_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



var FwArrayay = /*#__PURE__*/function (_FwDataHelper) {
  _inheritsLoose(FwArrayay, _FwDataHelper);

  function FwArrayay() {
    return _FwDataHelper.apply(this, arguments) || this;
  }

  FwArrayay.moveItem = function moveItem(arr, oi, ni) {
    while (oi < 0) {
      oi += arr.length;
    }

    while (ni < 0) {
      ni += arr.length;
    }

    if (ni >= arr.length) {
      var k = ni - arr.length;

      while (k-- + 1) {
        arr.push(undefined);
      }
    }

    arr.splice(ni, 0, arr.splice(oi, 1)[0]);
    return arr;
  };

  FwArrayay.reverse = function reverse(arr) {
    var newArray = [];

    for (var i = arr.length - 1; i >= 0; i--) {
      newArray.push(arr[i]);
    }

    return newArray;
  };

  return FwArrayay;
}(_classes_data_helper_js__WEBPACK_IMPORTED_MODULE_0__.default);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FwArrayay);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(5);
/******/ })()
.default;
});
//# sourceMappingURL=framework.webpack.js.map