(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.fw = factory());
}(this, (function () { 'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var id = 0;

  function _classPrivateFieldLooseKey(name) {
    return "__private_" + id++ + "_" + name;
  }

  function _classPrivateFieldLooseBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }

    return receiver;
  }

  var CORE_SETTINGS = {};
  CORE_SETTINGS.prefix = 'fw';
  CORE_SETTINGS.lazyLoad = true;
  CORE_SETTINGS.initializeModal = true;
  CORE_SETTINGS.initializeAccordion = true;
  CORE_SETTINGS.initializeForm = true;
  CORE_SETTINGS.dynamicHash = true;
  CORE_SETTINGS.uiClass = CORE_SETTINGS.prefix + "-ui"; //for styles

  CORE_SETTINGS.uiJsClass = CORE_SETTINGS.uiClass.replace('-', '_'); // for scripting events and shit

  var Settings = /*#__PURE__*/function () {
    function Settings() {}

    Settings.modify = function modify(key, value) {
      if (this.hasOwnProperty(key)) {
        CORE_SETTINGS[key] = value;
      }
    };

    Settings.get = function get(key) {
      var toReturn = {
        prefix: CORE_SETTINGS.prefix,
        lazyLoad: CORE_SETTINGS.lazyLoad,
        initializeModal: CORE_SETTINGS.initializeModal,
        initializeAccordion: CORE_SETTINGS.initializeAccordion,
        initializeForm: CORE_SETTINGS.initializeForm,
        dynamicHash: CORE_SETTINGS.dynamicHash,
        uiClass: CORE_SETTINGS.uiClass,
        uiJsClass: CORE_SETTINGS.uiJsClass
      };

      if (key) {
        return toReturn[key];
      } else {
        return toReturn;
      }
    };

    return Settings;
  }();

  //valid shits
  var DisableClasses = ['table-row-disabled', 'tab-disabled', 'btn-disabled', 'input-disabled', 'disabled']; // @TODO push instead of hard coding to arrays because

  var lookupResetToParentClass = ['input-group', 'btn-group'];
  var lookupResetFromClosestComponent = ['dropdown', // 'modal-default',
  // 'modal-board',
  'switch', 'alert'];
  var lookupResetFromClosestComponentUi = [//root component name, subcomponent mods
  'modal-default', 'modal-board', 'input-calendar', 'input-tags'];
  var DateTimePreset = {
    HumanDate: {
      placeholder: 'mm/dd/yyyy',
      pattern: /^\d{2}\/\d{2}\/\d{4}$/,
      template: 'mm/dd/yy'
    },
    HumanTime24: {
      placeholder: 'hh:mm',
      pattern: '',
      template: 'HH:MM'
    },
    HumanTime12: {
      placeholder: 'hh:mm',
      pattern: '',
      template: 'HH:MM'
    },
    Value: {
      placeholder: 'yyyy-mm-dd',
      pattern: /^\d{4}[-]\d{2}[-]\d{2}$/,
      template: 'yy-mm-dd'
    },
    ValueDateTimePreset: {
      placeholder: 'yy-mm-ddThh:gg',
      pattern: '',
      template: 'yy-mm-ddThh:gg'
    }
  };
  var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var dayNamesShorter = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var Palette = ['base', 'primary', 'secondary', 'accent', 'neutral', 'error', 'caution', 'success'];

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

    FwDom.isDescendant = function isDescendant(parent, child) {
      var node = child.parentNode;

      while (node != null) {
        if (node == parent) {
          return true;
        }

        node = node.parentNode;
      }

      return false;
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

      if (!elem && !elementToMoveContentsTo) {
        return;
      }

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
  }(FwDataHelper);

  var FwString = /*#__PURE__*/function (_FwDataHelper) {
    _inheritsLoose(FwString, _FwDataHelper);

    function FwString(data) {
      return _FwDataHelper.call(this, data) || this;
    }

    FwString.GetFileExtension = function GetFileExtension(str) {
      str = str.toString();
      return str.split('.').pop();
    };

    FwString.ToCamelCase = function ToCamelCase(str) {
      str = str.toString();
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
      }).replace(/-|\s/g, '');
    };

    FwString.ToDashed = function ToDashed(str) {
      str = str.toString();
      return FwString.ToCamelCase(str).replace(/([a-z]|[0-9])([A-Z])/g, '$1-$2').toLowerCase();
    };

    return FwString;
  }(FwDataHelper);

  var UIPrefix = function UIPrefix(componentName) {
    return componentName + "-ui";
  };
  var UIDynamicClass = Settings.get('uiJsClass') + "_internal_toggle";
  var UIBodyClass = {
    noScroll: "body-no-scroll",
    onDrag: "body-on-drag",
    loading: "body-loading",
    loaded: "body-loaded"
  }; //convert toggler if it's a dynamic chu so no sadness

  var UITriggerer = function UITriggerer(triggerer, isGroupable) {
    triggerer = triggerer || false;
    isGroupable = isGroupable || false;
    var toReturn;

    if (triggerer) {
      if (isGroupable) {
        return;
      } else if ( //calendar fix
      triggerer.closest("." + Settings.get('uiJsClass')) && !triggerer.closest("." + UIDynamicClass)) {
        toReturn = triggerer.closest("." + Settings.get('uiJsClass'));
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

  var UIToggled = function UIToggled(toggleMode, triggerer, selector) {
    triggerer = triggerer || false;
    toggleMode = toggleMode || false;
    selector = selector || false;
    var componentClass = "" + FwString.ToDashed(toggleMode.replace('-open', '').replace('-close', ''));

    if (!toggleMode) {
      return;
    }

    var selectorToMatch = selector ? selector : "." + componentClass; // lookup_reset_to_parent
    // lookup_from_closest

    var toReturn = null;

    if (triggerer) {
      //lookup by href
      if (triggerer.hasAttribute('href') && triggerer.getAttribute('href').startsWith('#') && triggerer.getAttribute('href') !== '#' && document.querySelector(triggerer.getAttribute('href')) && document.querySelector(triggerer.getAttribute('href')).matches(selectorToMatch)) {
        // console.warn('toggle found by href');
        toReturn = document.querySelector(triggerer.getAttribute('href')); //lookup by data-href
      } else if (triggerer.hasAttribute('data-href') && triggerer.getAttribute('data-href').startsWith('#') && triggerer.getAttribute('data-href') !== '#' && document.querySelector(triggerer.getAttribute('data-href')) && document.querySelector(triggerer.getAttribute('data-href')).matches(selectorToMatch)) {
        // console.warn('toggle found by data-href');
        toReturn = document.querySelector(triggerer.getAttribute('data-href')); //lookup by closest [data-toggle]
      } else if (toggleMode && triggerer.parentNode.closest("[data-toggle-" + toggleMode + "]")) {
        // console.warn('toggle searching closest data-toggle');
        toReturn = UIToggled(toggleMode, triggerer.parentNode.closest("[data-toggle-" + toggleMode + "]")); //look up by tag `lookup_reset_to_parent`
      } else if (toggleMode && lookupResetToParentClass.filter(function (i) {
        return triggerer.parentNode.matches("." + i);
      }).length > 0) {
        // console.warn('toggle trigger was in group');
        toReturn = UIToggled(toggleMode, triggerer.parentNode);
      } else {
        // console.warn('toggle trigger anybody whos a sibling',selectorToMatch);
        var possibleSiblings = triggerer.nextElementSibling;

        while (possibleSiblings) {
          if (possibleSiblings.matches(selectorToMatch) && !toReturn) {
            toReturn = possibleSiblings;
          }

          possibleSiblings = possibleSiblings.nextElementSibling;
        }
      }
    } // console.warn(toReturn);


    if (!toReturn && triggerer && toggleMode && lookupResetFromClosestComponent.filter(function (i) {
      return i == componentClass;
    })) {
      //look if theres an ancestor it can toggle. last prioroty
      // console.warn('has a ttrigger, looking for closest compopnent',componentClass);
      if (lookupResetFromClosestComponentUi.filter(function (i) {
        return triggerer.parentNode.matches("." + i);
      }).length > 0 && triggerer.parentNode.closest("." + UIPrefix(componentClass))) {
        // console.warn('found for a ui ancestor');
        toReturn = triggerer.parentNode.closest("." + componentClass);
      } else if (triggerer.parentNode.closest(selectorToMatch)) {
        // console.warn('found for an ancestor');
        toReturn = triggerer.parentNode.closest(selectorToMatch);
      }
    }

    if (!toReturn) {
      // console.warn( window.location.hash,'looking for by this hash',selectorToMatch);
      if (window.location.hash !== '' && document.querySelector(window.location.hash) && document.querySelector(window.location.hash).matches(selectorToMatch)) {
        // console.warn(document.querySelector(window.location.hash),'no trigger but found the hash is a matching toggle');
        toReturn = document.querySelector(window.location.hash);
      }
    } // console.warn('idiot',toReturn);


    return toReturn;
  };
  var UIChangeHash = function UIChangeHash(id) {
    id = id || '';

    if (Settings.get('dynamicHash')) {
      var idToGoTo = id !== '' ? "#" + id : null;

      if (idToGoTo) {
        if (window.history.pushState) {
          window.history.pushState(null, null, idToGoTo);
        } else {
          window.location.hash = idToGoTo;
        }
      } else {
        var scrollV, scrollH;
        if (window.history.pushState) window.history.pushState('', document.title, window.location.pathname + window.location.search);else {
          // Prevent scrolling by storing the page's current scroll offset
          scrollV = document.body.scrollTop;
          scrollH = document.body.scrollLeft;
          window.location.hash = ''; // Restore the scroll offset, should be flicker free

          document.body.scrollTop = scrollV;
          document.body.scrollLeft = scrollH;
        }
      }
    }
  };
  var UIToggleGroup = function UIToggleGroup(element, prefix, activatedClass, siblingSelector, resetterClass, noActiveClass, multipleClass) {
    prefix = prefix || false;

    if (!prefix) {
      return;
    }

    siblingSelector = siblingSelector || "." + prefix;
    activatedClass = activatedClass || 'active';
    resetterClass = resetterClass || prefix + "-group-toggle-reset";
    noActiveClass = noActiveClass || prefix + "-group-toggle-allow-no-active";
    multipleClass = multipleClass || prefix + "-group-toggle-multiple";

    if (element.closest(siblingSelector) && !element.classList.contains(prefix)) {
      element = element.closest(siblingSelector);
    }

    if (!element) {
      return;
    } //reset da resetti


    var resetter = FwDom.getSiblings(element).filter(function (butt) {
      return butt.classList.contains(resetterClass);
    });
    resetter.forEach(function (butt) {
      butt.classList.remove(activatedClass);
    }); //dem siblongs

    var selectorSiblings = FwDom.getSiblings(element).filter(function (sibling) {
      return sibling.matches(siblingSelector);
    });

    if (!element.closest("." + multipleClass) || element.classList.contains(resetterClass)) {
      selectorSiblings.forEach(function (sibling) {
        sibling.classList.remove(activatedClass);
      });
    }

    if (element.closest("." + multipleClass) && selectorSiblings.filter(function (butt) {
      return butt.classList.contains(activatedClass);
    }).length > 0 || element.closest("." + noActiveClass)) {
      element.classList.toggle(activatedClass);
    } else {
      element.classList.add(activatedClass);
    }
  };
  var UIPurge = function UIPurge(exempted, selector, callback) {
    document.querySelectorAll(selector).forEach(function (elem) {
      if (!exempted || exempted && elem !== exempted && !elem.contains(exempted)) {
        callback(elem);
      }
    });
  };

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

  var INITIATOR_QUEUE = new FwQueue();
  var is_started = false;

  var _execqt = /*#__PURE__*/_classPrivateFieldLooseKey("execqt");

  var _runRightAway = /*#__PURE__*/_classPrivateFieldLooseKey("runRightAway");

  var _runReady = /*#__PURE__*/_classPrivateFieldLooseKey("runReady");

  var _runLoad = /*#__PURE__*/_classPrivateFieldLooseKey("runLoad");

  var _runResize = /*#__PURE__*/_classPrivateFieldLooseKey("runResize");

  var _runScroll = /*#__PURE__*/_classPrivateFieldLooseKey("runScroll");

  var Initiator = /*#__PURE__*/function () {
    function Initiator() {
      Object.defineProperty(this, _runScroll, {
        value: _runScroll2
      });
      Object.defineProperty(this, _runResize, {
        value: _runResize2
      });
      Object.defineProperty(this, _runLoad, {
        value: _runLoad2
      });
      Object.defineProperty(this, _runReady, {
        value: _runReady2
      });
      Object.defineProperty(this, _runRightAway, {
        value: _runRightAway2
      });
      Object.defineProperty(this, _execqt, {
        value: _execqt2
      });
      this.resizeTimerInternal = null;
      this.scrollTimerInternal = null;
    }

    Initiator.isDocReady = function isDocReady(fn) {
      if (document.readyState != 'loading') {
        fn();
      } else {
        document.addEventListener('DOMContentLoaded', fn);
      }
    };

    Initiator.setState = function setState(mode) {
      mode = mode || 'complete';
      var body = document.querySelector('body');

      switch (mode) {
        case 'loading':
          body.classList.remove(UIBodyClass.loaded);
          body.classList.add(UIBodyClass.loading);
          break;

        case 'complete':
        default:
          setTimeout(function () {
            body.classList.remove(UIBodyClass.loading);
            body.classList.add(UIBodyClass.loaded);
          }, 100);
          break;
      }
    };

    Initiator.setLoadingState = function setLoadingState() {
      Initiator.setState('loading');
    };

    Initiator.setCompleteState = function setCompleteState() {
      Initiator.setState('complete');
    };

    Initiator.start = function start() {
      //component events
      var ini = new Initiator();
      Initiator.isStarted = true;

      _classPrivateFieldLooseBase(ini, _execqt)[_execqt](Initiator.Q.on_init);

      _classPrivateFieldLooseBase(ini, _runRightAway)[_runRightAway]();

      Initiator.isDocReady(function () {
        _classPrivateFieldLooseBase(ini, _runReady)[_runReady]();

        Initiator.setCompleteState();
      });
      window.addEventListener('load', function () {
        _classPrivateFieldLooseBase(ini, _runLoad)[_runLoad]();
      });
      window.addEventListener('resize', function () {
        _classPrivateFieldLooseBase(ini, _runResize)[_runResize]();
      });
      window.addEventListener('scroll', function () {
        _classPrivateFieldLooseBase(ini, _runScroll)[_runScroll]();
      });
    };

    Initiator.restart = function restart() {
      if (!Initiator.isStarted) {
        return;
      }

      var ini = new Initiator();
      Initiator.setLoadingState();

      _classPrivateFieldLooseBase(ini, _runRightAway)[_runRightAway]();

      _classPrivateFieldLooseBase(ini, _runReady)[_runReady]();

      Initiator.setCompleteState();

      _classPrivateFieldLooseBase(ini, _runLoad)[_runLoad]();

      console.info('frameWork restarted');
    };

    _createClass(Initiator, null, [{
      key: "isStarted",
      get: function get() {
        return is_started;
      },
      set: function set(val) {
        is_started = val;
      }
    }, {
      key: "Q",
      get: function get() {
        return INITIATOR_QUEUE;
      }
    }]);

    return Initiator;
  }();

  function _execqt2(fnsArray) {
    fnsArray.forEach(function (fn) {
      fn();
    });
  }

  function _runRightAway2() {
    _classPrivateFieldLooseBase(this, _execqt)[_execqt](Initiator.Q.on_rightAway);
  }

  function _runReady2() {
    _classPrivateFieldLooseBase(this, _execqt)[_execqt](Initiator.Q.on_ready);
  }

  function _runLoad2() {
    _classPrivateFieldLooseBase(this, _execqt)[_execqt](Initiator.Q.on_load);
  }

  function _runResize2() {
    var ini = this;
    clearTimeout(ini.resizeTimerInternal);
    ini.resizeTimerInternal = setTimeout(function () {
      _classPrivateFieldLooseBase(ini, _execqt)[_execqt](Initiator.Q.on_resize);
    }, 100);
  }

  function _runScroll2() {
    var ini = this;
    clearTimeout(ini.scrollTimerInternal);
    ini.scrollTimerInternal = setTimeout(function () {
      _classPrivateFieldLooseBase(ini, _execqt)[_execqt](Initiator.Q.on_scroll);
    }, 100);
  }

  Initiator.start();

  var NativeEvents = ['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'paste', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll', 'hashchange'];

  var FwEvent = /*#__PURE__*/function (_FwDataHelper) {
    _inheritsLoose(FwEvent, _FwDataHelper);

    function FwEvent() {
      return _FwDataHelper.apply(this, arguments) || this;
    }

    FwEvent.UIDEvent = function UIDEvent(element, uid) {
      return uid && uid + "::" + uidEvent++ || element.uidEvent || uidEvent++;
    };

    FwEvent.getEvent = function getEvent(element) {
      var uid = UIDEvent(element);
      element.uidEvent = uid;
      return eventRegistry[uid];
    };

    FwEvent.classNester = function classNester(selector) {
      if (selector === '*' || typeof selector !== 'string') {
        return selector;
      } else {
        var selArr = selector.split(',');
        var toReturn = selector;
        selArr.forEach(function (sel) {
          toReturn += ", " + sel + " *";
        });
        return toReturn;
      }
    };

    FwEvent.addListener = function addListener(parent, evt, selectorOrParentFallback, handler) {
      parent = parent || false; // runNative = runNative !== false || runNative == true; //no apipipi
      //dai mo ilaag sa ddocument ta maerror si matches habo nya ki element

      var elemToAddTo = parent || selectorOrParentFallback;
      var evtNoApi = evt.split("_" + Settings.get('prefix'))[0];
      var isNative = NativeEvents.includes(evt);

      if (!isNative) {
        elemToAddTo.addEventListener(evtNoApi, function (event) {
          if (!parent || parent && event.target.matches(FwEvent.classNester(selectorOrParentFallback)) // && event.target.closest(selectorOrParentFallback)
          ) {
              FwEvent.trigger(event.target, evt, {
                detail: {
                  nativeEvt: event,
                  _selection: FwEvent.classNester(selectorOrParentFallback),
                  bubbles: true,
                  cancelable: true
                }
              });
            }
        }, true);
      }

      elemToAddTo.addEventListener(evt, function (event) {
        if (!parent || parent && // && event.target.matches(FwEvent.classNester(selectorOrParentFallback))
        event.target.closest(selectorOrParentFallback)) {
          if (!isNative) {
            handler(event.detail.nativeEvt);
          } else {
            handler(event);
          }
        }
      }, true);
    };

    FwEvent.removeListener = function removeListener(element, evt, handler) {
      element.removeEventListener(evt, handler, true); // @TODO. neet to rethink this shit
    };

    FwEvent.trigger = function trigger(el, evt, customEventOpts) {
      var event;
      el = el || document;

      if (NativeEvents.includes(evt)) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(evt, true, false);
      } else {
        customEventOpts = customEventOpts || {
          bubbles: true,
          cancelable: true
        };

        if (customEventOpts) {
          event = new CustomEvent(evt, customEventOpts);
        } else {
          event = new CustomEvent(evt);
        }
      }

      return el.dispatchEvent(event); // return event;
    };

    return FwEvent;
  }(FwDataHelper);

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

  var DataHandler = {
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

      DataHandler.set(element, this.constructor.DATA_KEY, this);
      this.element = element;

      if (typeof props === 'object') {
        for (var key in props) {
          this[key] = props[key];
          this.element["_" + key] = props[key];
        }
      }
    }

    var _proto = FwComponent.prototype;

    _proto.dispose = function dispose() {
      DataHandler["delete"](this.element, this.constructor.DATA_KEY, this);
      this.element = null;
    };

    FwComponent.getInstance = function getInstance(element) {
      return DataHandler.get(element, this.DATA_KEY);
    };

    _proto.runCycle = function runCycle(beforeEvt, duringEvt, AfterEvt, callback, triggeredElem) {
      triggeredElem = triggeredElem || this.UIEl();

      if (!beforeEvt || !duringEvt || !AfterEvt) {
        return;
      }

      if (FwEvent.trigger(triggeredElem, beforeEvt)) {
        if (FwEvent.trigger(triggeredElem, duringEvt)) {
          if (typeof callback === 'function') {
            callback(this);
          }

          FwEvent.trigger(triggeredElem, AfterEvt);
        }
      }
    };

    _proto.UIEl = function UIEl(elem) {
      if (elem) {
        this._resetUIEl(elem);
      }

      return this.element;
    };

    _proto._resetUIEl = function _resetUIEl(element) {
      if (element) {
        this.element = element;
      }
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

    _proto._setInitState = function _setInitState(beforeEvent, happeningEvent, afterEvent, callback) {
      callback = callback || false;

      if (callback) {
        FwEvent.trigger(element, beforeEvent);
        FwEvent.trigger(element, happeningEvent);
        callback(this.element);
        FwEvent.trigger(element, afterEvent);
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

      DisableClasses.forEach(function (classString) {
        if (elem.closest("." + classString) && !toReturn) {
          toReturn = true;
        }
      });
      return toReturn;
    };

    FwComponent.isDynamic = function isDynamic(elem) {
      return elem.classList.contains(UIDynamicClass);
    };

    return FwComponent;
  }();

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

  var NAME$d = 'accordion';
  var ARG_ATTRIBUTE_NAME$5 = "" + NAME$d;
  var TOGGLE_MODE$3 = "" + NAME$d;
  var COMPONENT_CLASS$d = "" + FwString.ToDashed(NAME$d);
  var ACTIVATED_CLASS$7 = "open";
  var DATA_KEY$d = Settings.get('prefix') + "_" + NAME$d;
  var EVENT_KEY$d = "_" + DATA_KEY$d;
  var EVENT_CLICK$a = "click" + EVENT_KEY$d;
  var EVENT_HASHCHANGE$1 = "hashchange" + EVENT_KEY$d;
  var EVENT_BEFORE_CLOSE$2 = "before_close" + EVENT_KEY$d;
  var EVENT_CLOSE$2 = "close" + EVENT_KEY$d;
  var EVENT_AFTER_CLOSE$2 = "after_close" + EVENT_KEY$d;
  var EVENT_BEFORE_OPEN$1 = "before_open" + EVENT_KEY$d;
  var EVENT_OPEN$1 = "open" + EVENT_KEY$d;
  var EVENT_AFTER_OPEN$1 = "after_open" + EVENT_KEY$d;

  var Accordion = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(Accordion, _FwComponent);

    function Accordion(element, triggerer, args) {
      element = element || UIToggled(TOGGLE_MODE$3) || false;
      return _FwComponent.call(this, element, {
        triggerer: triggerer ? triggerer : element && element._triggerer ? element._triggerer : false,
        _customArgs: args ? args : element && element.__customArgs ? element.__customArgs : {}
      }) || this;
    }

    var _proto = Accordion.prototype;

    _proto.dispose = function dispose() {
      _FwComponent.prototype.dispose.call(this);

      this.triggerer = null;
      this._customArgs = null;
    };

    Accordion.configDefaults = function configDefaults() {
      return {
        changeHash: true
      };
    };

    _proto._siblicide = function _siblicide() {
      var _this = this;

      if (!this._isWithinGroupMultiple) {
        FwDom.RunFnForChildren(this.UIGroot, "[data-toggle-" + TOGGLE_MODE$3 + "],." + COMPONENT_CLASS$d, "." + COMPONENT_CLASS$d + "-group", function (accBbies) {
          if (_this.triggerer && accBbies !== _this.triggerer && accBbies !== _FwComponent.prototype.UIEl.call(_this) || !_this.triggerer && accBbies !== _FwComponent.prototype.UIEl.call(_this)) {
            accBbies.classList.remove(ACTIVATED_CLASS$7);
          }
        });
      }
    } //which came first the accordion-gruoup or the accordiiinbsbob?? the actual bitch none of that accordion-group shit
    ;

    _proto.close = function close(elem, triggerer) {
      var _this2 = this;

      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);

      if (!element) {
        return;
      }

      triggerer = triggerer || this.triggerer;

      if (!this.UIGroot || this._isWithinAllowNoActive) {
        _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_CLOSE$2, EVENT_CLOSE$2, EVENT_AFTER_CLOSE$2, function () {
          triggerer && triggerer.classList.remove(ACTIVATED_CLASS$7);

          _this2._probablyToggle.forEach(function (toggle) {
            toggle.classList.remove(ACTIVATED_CLASS$7);
          });

          element.classList.remove(ACTIVATED_CLASS$7);

          if (_this2.args.changeHash && _this2._id) {
            UIChangeHash('');
          }
        }, element);
      }
    };

    _proto.open = function open(elem, triggerer) {
      var _this3 = this;

      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);

      if (!element) {
        return;
      }

      triggerer = triggerer || this.triggerer;

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_OPEN$1, EVENT_OPEN$1, EVENT_AFTER_OPEN$1, function () {
        _this3._siblicide();

        triggerer && triggerer.classList.add(ACTIVATED_CLASS$7);

        _this3._probablyToggle.forEach(function (toggle) {
          toggle.classList.add(ACTIVATED_CLASS$7);
        });

        element.classList.add(ACTIVATED_CLASS$7);

        if (_this3.args.changeHash && _this3._id) {
          UIChangeHash(_this3._id);
        }
      }, element);
    };

    _proto.toggle = function toggle(elem, triggerer) {
      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);

      if (!element) {
        return;
      }

      triggerer = triggerer || this.triggerer;

      if (element.classList.contains(ACTIVATED_CLASS$7)) {
        this.close(element, triggerer);
      } else {
        this.open(element, triggerer);
      }
    };

    Accordion.handleToggler = function handleToggler() {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var accordion = new Accordion(UIToggled(TOGGLE_MODE$3, e.target), e.target);
          accordion.toggle();
        }
      };
    };

    Accordion.handleHash = function handleHash() {
      return function () {
        if (Settings.get('initializeAccordion')) {
          var accordion = new Accordion();
          accordion.open();
        }
      };
    };

    Accordion.initListeners = function initListeners() {
      FwEvent.addListener(document.documentElement, EVENT_CLICK$a, "*[data-toggle-" + TOGGLE_MODE$3 + "]", Accordion.handleToggler());
      FwEvent.addListener(null, EVENT_HASHCHANGE$1, window, Accordion.handleHash());
      Initiator.Q.on_ready = Accordion.handleHash();
    };

    Accordion.destroyListeners = function destroyListeners() {
      FwEvent.removeListener(document.documentElement, EVENT_CLICK$a, Accordion.handleToggler());
      FwEvent.removeListener(window, EVENT_HASHCHANGE$1, Accordion.handleHash());
    };

    _createClass(Accordion, [{
      key: "args",
      get: function get() {
        return FwComponent._parseArgs({
          changeHash: this.triggerer && this.triggerer.hasAttribute("data-" + ARG_ATTRIBUTE_NAME$5 + "-change-hash") ? this.triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME$5 + "-change-hash") : _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$5 + "-change-hash") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$5 + "-change-hash") : this._customArgs.changeHash
        }, Accordion.configDefaults());
      }
    }, {
      key: "_isValidWithinQuery",
      get: function get() {
        return !(_FwComponent.prototype.UIEl.call(this).classList.contains(NAME$d + "-mobile") && !ValidateBr(BrMobileMax, 'above'));
      }
    }, {
      key: "_isWithinGroupMultiple",
      get: function get() {
        return this.UIGroot && this.UIGroot.classList.contains(NAME$d + "-group-multiple");
      }
    }, {
      key: "_isWithinAllowNoActive",
      get: function get() {
        return this.UIGroot && this.UIGroot.classList.contains(NAME$d + "-group-allow-no-active");
      }
    }, {
      key: "_probablyToggle",
      get: function get() {
        var toReturn = [];
        var selection = document.querySelectorAll("[data-toggle-" + TOGGLE_MODE$3 + "][href=\"#" + this._id + "\"],\n\t\t\t[data-toggle-" + TOGGLE_MODE$3 + "][data-href=\"#" + this._id + "\"]");

        if (selection.length) {
          toReturn = selection;
        }

        return toReturn;
      }
    }, {
      key: "_id",
      get: function get() {
        return _FwComponent.prototype.UIEl.call(this).hasAttribute('id') ? _FwComponent.prototype.UIEl.call(this).getAttribute('id') : false;
      }
    }, {
      key: "UIGroot",
      get: function get() {
        var toReturn = _FwComponent.prototype.UIEl.call(this).parentNode.closest("." + COMPONENT_CLASS$d + ",." + COMPONENT_CLASS$d + "-group"); //has to actually be accordion-group closest before accordion


        if (!toReturn || toReturn && !toReturn.matches("." + COMPONENT_CLASS$d + "-group") //***
        ) {
            toReturn = false;
          }

        return toReturn;
      }
    }], [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$d;
      }
    }]);

    return Accordion;
  }(FwComponent);
  Accordion.initListeners();

  var NAME$c = 'alert';
  var TOGGLE_MODE$2 = NAME$c + "-close";
  var COMPONENT_CLASS$c = "" + FwString.ToDashed(NAME$c);
  var DATA_KEY$c = Settings.get('prefix') + "_" + NAME$c;
  var EVENT_KEY$c = "_" + DATA_KEY$c;
  var EVENT_CLICK$9 = "click" + EVENT_KEY$c;
  var EVENT_BEFORE_CLOSE$1 = "before_close" + EVENT_KEY$c;
  var EVENT_CLOSE$1 = "close" + EVENT_KEY$c;
  var EVENT_AFTER_CLOSE$1 = "after_close" + EVENT_KEY$c;

  var Alert = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(Alert, _FwComponent);

    function Alert() {
      return _FwComponent.apply(this, arguments) || this;
    }

    var _proto = Alert.prototype;

    _proto.close = function close(elem) {
      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : this.element;

      if (!element) {
        return;
      }

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_CLOSE$1, EVENT_CLOSE$1, EVENT_AFTER_CLOSE$1, function () {
        element.parentNode.removeChild(element);
      }, element);
    };

    Alert.closeAll = function closeAll() {
      var selector = document.querySelectorAll("." + COMPONENT_CLASS$c);

      if (selector.length) {
        selector.forEach(function (instance) {
          if (instance.querySelectorAll('[data-toggle-alert-close]').length || instance.classList.contains(NAME$c + "-closeable")) {
            var alertInstance = new Alert(instance);
            alertInstance.close();
          }
        });
      }
    };

    Alert.handleClose = function handleClose() {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var alert = new Alert(UIToggled(TOGGLE_MODE$2, e.target));
          alert.close();
        }
      };
    };

    Alert.handleCloseAll = function handleCloseAll() {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          Alert.closeAll();
        }
      };
    };

    Alert.initListeners = function initListeners() {
      FwEvent.addListener(document.documentElement, EVENT_CLICK$9, "*[data-toggle-" + TOGGLE_MODE$2 + "]", Alert.handleClose());
      FwEvent.addListener(document.documentElement, EVENT_CLICK$9, "*[data-toggle-" + TOGGLE_MODE$2 + "-all]", Alert.handleCloseAll());
    };

    Alert.destroyListeners = function destroyListeners() {
      FwEvent.removeListener(document.documentElement, EVENT_CLICK$9, Alert.handleClose());
      FwEvent.removeListener(window, EVENT_CLICK$9, Alert.handleCloseAll());
    };

    _createClass(Alert, null, [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$c;
      }
    }]);

    return Alert;
  }(FwComponent);
  Alert.initListeners();

  var NAME$b = 'btn';
  var COMPONENT_CLASS$b = "" + FwString.ToDashed(NAME$b);
  var DATA_KEY$b = Settings.get('prefix') + "_" + NAME$b;
  var EVENT_KEY$b = "_" + DATA_KEY$b;
  var EVENT_CLICK$8 = "click" + EVENT_KEY$b;
  var EVENT_BEFORE_TOGGLE$1 = "before_toggle" + EVENT_KEY$b;
  var EVENT_TOGGLE$1 = "toggle" + EVENT_KEY$b;
  var EVENT_AFTER_TOGGLE$1 = "after_toggle" + EVENT_KEY$b;

  var Button = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(Button, _FwComponent);

    function Button() {
      return _FwComponent.apply(this, arguments) || this;
    }

    var _proto = Button.prototype;

    _proto.toggle = function toggle(elem) {
      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : this.element;

      if (!element) {
        return;
      }

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_TOGGLE$1, EVENT_TOGGLE$1, EVENT_AFTER_TOGGLE$1, function () {
        UIToggleGroup(element, NAME$b);
      }, element);
    };

    Button.handleToggle = function handleToggle() {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var button = new Button(e.target);
          button.toggle();
        }
      };
    };

    Button.initListeners = function initListeners() {
      FwEvent.addListener(document.documentElement, EVENT_CLICK$8, "." + COMPONENT_CLASS$b + "-group-toggle > ." + COMPONENT_CLASS$b, Button.handleToggle());
    };

    Button.destroyListeners = function destroyListeners() {
      FwEvent.removeListener(document.documentElement, EVENT_CLICK$8, Button.handleToggle());
    };

    _createClass(Button, null, [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$b;
      }
    }]);

    return Button;
  }(FwComponent);
  Button.initListeners();

  var NAME$a = 'dropdown';
  var ARG_ATTRIBUTE_NAME$4 = "" + NAME$a;
  var TOGGLE_MODE$1 = "" + NAME$a;
  var COMPONENT_CLASS$a = "" + FwString.ToDashed(NAME$a);
  var COMPONENT_PURGER_CLASS$1 = COMPONENT_CLASS$a + "-purger";
  var ACTIVATED_CLASS$6 = "open";
  var NAV_ANCESTOR = "li, .nav-item";
  var DATA_KEY$a = Settings.get('prefix') + "_" + NAME$a;
  var EVENT_KEY$a = "_" + DATA_KEY$a;
  var EVENT_CLICK$7 = "click" + EVENT_KEY$a;
  var EVENT_CLICK_PURGE$2 = "click" + EVENT_KEY$a + "_purge";
  var EVENT_FOCUS = "focus" + EVENT_KEY$a;
  var EVENT_BLUR$1 = "blur" + EVENT_KEY$a;
  var EVENT_BEFORE_CLOSE = "before_close" + EVENT_KEY$a;
  var EVENT_CLOSE = "close" + EVENT_KEY$a;
  var EVENT_AFTER_CLOSE = "after_close" + EVENT_KEY$a;
  var EVENT_BEFORE_OPEN = "before_open" + EVENT_KEY$a;
  var EVENT_OPEN = "open" + EVENT_KEY$a;
  var EVENT_AFTER_OPEN = "after_open" + EVENT_KEY$a;

  var Dropdown = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(Dropdown, _FwComponent);

    function Dropdown(element, triggerer, args) {
      return _FwComponent.call(this, element, {
        triggerer: triggerer ? triggerer : element && element._triggerer ? element._triggerer : false,
        _customArgs: args ? args : element && element.__customArgs ? element.__customArgs : {}
      }) || this;
    }

    var _proto = Dropdown.prototype;

    _proto.dispose = function dispose() {
      _FwComponent.prototype.dispose.call(this);

      this.triggerer = null;
      this._customArgs = null;
    };

    Dropdown.configDefaults = function configDefaults() {
      return {
        width: null,
        maxHeight: null
      };
    };

    _proto.close = function close(elem, triggerer) {
      var _this = this;

      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : this.element;

      if (!element) {
        return;
      }

      triggerer = triggerer || this.triggerer;

      if (element.classList.contains(ACTIVATED_CLASS$6)) {
        _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_CLOSE, EVENT_CLOSE, EVENT_AFTER_CLOSE, function () {
          element.classList.remove(ACTIVATED_CLASS$6);
          triggerer && triggerer.classList.remove(ACTIVATED_CLASS$6);
          _this.UIElNavcestor && _this.UIElNavcestor.classList.remove(ACTIVATED_CLASS$6);

          _this.setDimensions(null, Dropdown.configDefaults);
        }, element);
      }
    };

    _proto.open = function open(elem, triggerer) {
      var _this2 = this;

      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : this.element;

      if (!element) {
        return;
      }

      triggerer = triggerer || this.triggerer;

      if (!element.classList.contains(ACTIVATED_CLASS$6)) {
        _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_OPEN, EVENT_OPEN, EVENT_AFTER_OPEN, function () {
          Dropdown.purge(element);
          element.classList.add(ACTIVATED_CLASS$6);
          triggerer && triggerer.classList.add(ACTIVATED_CLASS$6); // if(this.UIElUncles){
          // 	this.UIElUncles.forEach((uncle) => {
          // 		uncle.classList.remove(ACTIVATED_CLASS);
          // 	});
          // }

          _this2.setDimensions();
        }, element);
      }
    };

    _proto.toggle = function toggle(elem, triggerer) {
      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : this.element;

      if (!element) {
        return;
      }

      triggerer = triggerer || this.triggerer;
      triggerer.closest("." + Settings.get('uiJsClass')) && !triggerer.closest("." + UIDynamicClass);

      if (element.classList.contains(ACTIVATED_CLASS$6)) {
        this.close(element, triggerer);
      } else {
        this.open(element, triggerer);
      }
    };

    _proto.setDimensions = function setDimensions(elem, args) {
      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : this.element;

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

    Dropdown.purge = function purge(exempted) {
      UIPurge(exempted, "." + COMPONENT_CLASS$a, function (elem) {
        new Dropdown(elem).close();
      });
    };

    Dropdown.handleToggle = function handleToggle() {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var dropdown = new Dropdown(UIToggled(TOGGLE_MODE$1, UITriggerer(e.target)), UITriggerer(e.target));
          dropdown.toggle();
        }
      };
    };

    Dropdown.handleFocusOpen = function handleFocusOpen(i) {
      return function (e) {
        if (FwComponent.isDisabled(e.target)) {
          e.target.blur();
        } else {
          var dropdown = new Dropdown(UIToggled(TOGGLE_MODE$1, UITriggerer(e.target)), UITriggerer(e.target));
          dropdown.open();
          triggerer.classList.add('focus');
        }
      };
    };

    Dropdown.handleBlurClose = function handleBlurClose() {
      return function (e) {
        if (!FwComponent.isDisabled(e.target)) {
          var dropdown = new Dropdown(UIToggled(TOGGLE_MODE$1, UITriggerer(e.target)), UITriggerer(e.target));
          setTimeout(function () {
            dropdown.close();
          }, 200);
          triggerer.classList.remove('focus');
        }
      };
    };

    Dropdown.handleUniversalPurge = function handleUniversalPurge(isPurger) {
      return function (e) {
        if (FwComponent.isDisabled(e.target)) {
          e.preventDefault();
        } else if (!FwComponent.isDynamic(e.target)) {
          if (e.target.closest("." + COMPONENT_PURGER_CLASS$1) || !(e.target.closest("[data-toggle-" + TOGGLE_MODE$1 + "]") || e.target.closest("." + COMPONENT_CLASS$a))) {
            Dropdown.purge();
          }
        }
      };
    };

    Dropdown.initListeners = function initListeners() {
      FwEvent.addListener(document.documentElement, EVENT_CLICK$7, "*[data-toggle-" + TOGGLE_MODE$1 + "]:not(input):not([contenteditable]):not(." + Settings.get('uiJsClass') + ")", Dropdown.handleToggle());
      FwEvent.addListener(document.documentElement, EVENT_FOCUS, "input[data-toggle-" + TOGGLE_MODE$1 + "], *[contenteditable][data-toggle-" + TOGGLE_MODE$1 + "], ." + Settings.get('uiJsClass') + "[data-toggle-" + TOGGLE_MODE$1 + "] [contenteditable]", Dropdown.handleFocusOpen());
      FwEvent.addListener(document.documentElement, EVENT_BLUR$1, "input[data-toggle-" + TOGGLE_MODE$1 + "], *[contenteditable][data-toggle-" + TOGGLE_MODE$1 + "], ." + Settings.get('uiJsClass') + "[data-toggle-" + TOGGLE_MODE$1 + "] [contenteditable]", Dropdown.handleBlurClose());
      FwEvent.addListener(document.documentElement, EVENT_CLICK_PURGE$2, "*, ." + COMPONENT_PURGER_CLASS$1, Dropdown.handleUniversalPurge());
    };

    Dropdown.destroyListeners = function destroyListeners() {
      FwEvent.removeListener(document.documentElement, EVENT_CLICK$7, Dropdown.handleToggle());
      FwEvent.removeListener(document.documentElement, EVENT_FOCUS, Dropdown.handleFocusOpen());
      FwEvent.removeListener(document.documentElement, EVENT_BLUR$1, Dropdown.handleBlurClose());
      FwEvent.removeListener(document.documentElement, EVENT_CLICK_PURGE$2, Dropdown.handleUniversalPurge());
    };

    _createClass(Dropdown, [{
      key: "args",
      get: function get() {
        return FwComponent._parseArgs({
          width: this.triggerer && this.triggerer.hasAttribute("data-" + ARG_ATTRIBUTE_NAME$4 + "-width") ? this.triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME$4 + "-width") : _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$4 + "-width") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$4 + "-width") : this._customArgs.width,
          maxHeight: this.triggerer && this.triggerer.hasAttribute("data-" + ARG_ATTRIBUTE_NAME$4 + "-max-height") ? this.triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME$4 + "-max-height") : _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$4 + "-max-height") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$4 + "-max-height") : this._customArgs.maxHeight
        }, Dropdown.configDefaults());
      }
    }, {
      key: "UIElNavcestor",
      get: function get() {
        return this.element.closest(NAV_ANCESTOR);
      }
    }, {
      key: "UIElUncles",
      get: function get() {
        if (this.UIElNavcestor) {
          return FwDom.getSiblings(this.UIElNavcestor).filter(function (sibling) {
            return sibling.matches(NAV_ANCESTOR);
          });
        }
      }
    }], [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$a;
      }
    }]);

    return Dropdown;
  }(FwComponent);
  Dropdown.initListeners();

  var FwDate = /*#__PURE__*/function (_FwDataHelper) {
    _inheritsLoose(FwDate, _FwDataHelper);

    function FwDate() {
      return _FwDataHelper.apply(this, arguments) || this;
    }

    FwDate.toParsed = function toParsed(d) {
      if (!d || d === '') {
        return false;
      } else {
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
          var pattern = new RegExp(DateTimePreset.Value.pattern);
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
      format = format || DateTimePreset.HumanDate.template;

      if (!d) {
        return '';
      } else {
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
                output += formatName('D', d.getDay(), dayNamesShort, dayNames);
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
                output += formatName('M', d.getMonth(), monthNamesShort, monthNames);
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
      }
    };

    FwDate.toVal = function toVal(date) {
      var d = FwDate.toParsed(date);

      if (!d) {
        return false;
      } else {
        return this.toHuman(d, DateTimePreset.Value.template);
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
      }
    };

    return FwDate;
  }(FwDataHelper);

  var NAME$9 = 'formCalendar';
  var ARG_ATTRIBUTE_NAME$3 = 'calendar';
  var COMPONENT_CLASS$9 = "input-calendar";
  var ACTIVATED_CLASS$5 = "active";
  var DATA_KEY$9 = Settings.get('prefix') + "_" + NAME$9;
  var EVENT_KEY$9 = "_" + DATA_KEY$9;
  var EVENT_CLICK$6 = "click" + EVENT_KEY$9;
  var EVENT_KEYUP = "keyup" + EVENT_KEY$9; // const EVENT_CHANGE = `change${EVENT_KEY}`;

  var EVENT_BEFORE_INIT$4 = "before_init" + EVENT_KEY$9;
  var EVENT_INIT$4 = "init" + EVENT_KEY$9;
  var EVENT_AFTER_INIT$4 = "after_init" + EVENT_KEY$9;
  var EVENT_BEFORE_RENDER$2 = "before_render" + EVENT_KEY$9;
  var EVENT_RENDER$2 = "render" + EVENT_KEY$9;
  var EVENT_AFTER_RENDER$2 = "after_render" + EVENT_KEY$9;
  var EVENT_BEFORE_UPDATE$2 = "before_update" + EVENT_KEY$9;
  var EVENT_UPDATE$2 = "update" + EVENT_KEY$9;
  var EVENT_AFTER_UPDATE$2 = "after_update" + EVENT_KEY$9;
  var EVENT_BEFORE_RESET = "before_reset" + EVENT_KEY$9;
  var EVENT_RESET = "update" + EVENT_KEY$9;
  var EVENT_AFTER_RESET = "after_reset" + EVENT_KEY$9;

  var Calendar = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(Calendar, _FwComponent);

    function Calendar(element, valueToRender, args) {
      var _this;

      _this = _FwComponent.call(this, element, {
        UIValue: valueToRender ? valueToRender : element && element._UIValue ? element._UIValue : false,
        _customArgs: args ? args : element && element.__customArgs ? element.__customArgs : {}
      }) || this;

      _this._arrowHtml = function (buttonClass) {
        var symbolClass, arrowDate, disValid, arrowClass; //set a new date with no date because fuck that boi
        // console.warn(buttonClass,'hello i fucked up','\n',FwDate.toParsed(uiValue),'\n',this._calendar.startDate,'\n', new Date(this._calendar.year,this._calendar.month));

        switch (buttonClass) {
          case 'prev-month':
            symbolClass = 'symbol-arrow-left';
            arrowClass = 'month';
            arrowDate = FwDate.toVal(FwDate.adjacentMonth(_this._calendar.startDate, -1));
            disValid = _this.validates(new Date(_this._calendar.year, _this._calendar.month, 0), true);
            break;

          case 'prev-year':
            symbolClass = 'symbol-arrow-double-left';
            arrowClass = 'year';
            arrowDate = FwDate.toVal(FwDate.adjacentMonth(_this._calendar.startDate, -12));
            disValid = _this.validates(new Date(_this._calendar.year - 1, _this._calendar.month, 0), true);
            break;

          case 'next-month':
            symbolClass = 'symbol-arrow-right';
            arrowClass = 'month';
            arrowDate = FwDate.toVal(FwDate.adjacentMonth(_this._calendar.startDate, 1));
            disValid = _this.validates(new Date(_this._calendar.year, _this._calendar.month + 1, 1), true);
            break;

          case 'next-year':
            symbolClass = 'symbol-arrow-double-right';
            arrowClass = 'year';
            arrowDate = FwDate.toVal(FwDate.adjacentMonth(_this._calendar.startDate, 12));
            disValid = _this.validates(new Date(_this._calendar.year + 1, _this._calendar.month, 1), true);
            break;
        } //kung yung at least yung last day nang prev or first day ng next man lang ay valid pwidi sya ipindoot


        var htmlString = "<button type=\"button\"\n\t\t\tclass=\"\n\t\t\t\t" + (!disValid ? "disabled " : '') + "\n\t\t\t\t" + UIPrefix(COMPONENT_CLASS$9) + "-navigation\n\t\t\t\t" + UIPrefix(COMPONENT_CLASS$9) + "-button\n\t\t\t\t" + UIPrefix(COMPONENT_CLASS$9) + "-" + arrowClass + "\n\t\t\t\t" + UIPrefix(COMPONENT_CLASS$9) + "-" + buttonClass + "\" data-value=\"" + arrowDate + "\"\n\t\t\t>\n\t\t\t\t<i class=\"" + UIPrefix(COMPONENT_CLASS$9) + "symbol symbol " + symbolClass + "\"></i>\n\t\t\t</button>";
        return htmlString;
      };

      _this._blockHtml = function (date, customClass) {
        customClass = customClass || '';
        return "<button type=\"button\" data-value=\"" + FwDate.toVal(date) + "\"\n\t\t\t\tclass=\"\n\t\t\t\t" + UIPrefix(COMPONENT_CLASS$9) + "-block\n\t\t\t\t" + UIPrefix(COMPONENT_CLASS$9) + "-button\n\t\t\t\t" + UIPrefix(COMPONENT_CLASS$9) + "-date\n\t\t\t\t" + customClass + "\n\t\t\t\">\n\t\t\t\t<span>" + date.getDate() + "</span>\n\t\t\t</button>";
      };

      return _this;
    }

    var _proto = Calendar.prototype;

    _proto.dispose = function dispose() {
      _FwComponent.prototype.dispose.call(this);

      this.UIValue = null;
      this._customArgs = null;
    };

    Calendar.configDefaults = function configDefaults() {
      return {
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
    };

    _proto.reset = function reset() {
      var _this2 = this;

      var element = this.element;

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_RESET, EVENT_RESET, EVENT_AFTER_RESET, function () {
        _this2.theValue = FwDate.toVal(false, false);

        _this2._renderUI();
      }, element);
    };

    _proto.update = function update(newValue, valueToRender) {
      var _this3 = this;

      var element = this.element;
      var theValue = newValue || newValue === '' ? FwDate.toVal(newValue) : this.theValue;
      var uiValue = FwDate.toVal(valueToRender) || theValue || this.renderValue;

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_UPDATE$2, EVENT_UPDATE$2, EVENT_AFTER_UPDATE$2, function () {
        if (_this3.validates(theValue) || !theValue) {
          _this3.theValue = FwDate.toVal(theValue, false);
          _this3.renderValue = uiValue;

          _this3._renderUI();
        } //user visual feedback if it has a valid bitch


        if (!_FwComponent.prototype.UIEl.call(_this3).classList.contains('input-error')) {
          if (_this3.validates(theValue) || !theValue && !_this3.isRequired) {
            _this3.UIRoot.classList.remove('input-error');
          } else {
            _this3.UIRoot.classList.add('input-error');
          }
        }

        if (_this3.theValue) {
          _this3.UIDates.forEach(function (date) {
            if (date.getAttribute('data-value') == theValue) {
              date.classList.add(ACTIVATED_CLASS$5);
            } else {
              date.classList.remove(ACTIVATED_CLASS$5);
            }
          });

          if (_this3.UIInput) {
            _this3.UIInputValue = theValue;
          }
        }

        newValue && FwEvent.trigger(_FwComponent.prototype.UIEl.call(_this3), 'change');
      }, element);
    };

    _proto.validates = function validates(date, rangeOnly) {
      date = date || this.theValue;
      rangeOnly = rangeOnly || false; //range,spot

      var d = FwDate.toParsed(date),
          checkAgainst = this.args.disabledDates.split(',');
      var toReturn = true;

      if (!rangeOnly) {
        //if in disabled dates
        if (checkAgainst.includes(FwDate.toVal(d))) {
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


      if (FwDate.toParsed(this.args.max) && FwDate.toParsed(this.args.max) < d || FwDate.toParsed(this.args.min) && d < FwDate.toParsed(this.args.min)) {
        // console.warn('value not in max and width || ',FwDate.toVal(d));;
        toReturn = false;
      } //check if values are actually legit dates
      //month
      //date


      return toReturn;
    };

    _proto._renderUI = function _renderUI(elem, uiValue) {
      var _this4 = this;

      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);
      uiValue = uiValue || this.renderValue;
      this.renderValue = uiValue;
      var theUI = {};

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_RENDER$2, EVENT_RENDER$2, EVENT_AFTER_RENDER$2, function () {
        theUI.container = _this4.UIRoot;

        if (!theUI.container) {
          theUI.container = document.createElement('div');
          element.parentNode.insertBefore(theUI.container, element);
          theUI.container.appendChild(element);
          theUI.container.setAttribute('class', Settings.get('uiClass') + "\n          " + Settings.get('uiJsClass') + "\n          " + element.getAttribute('class').toString().replace(COMPONENT_CLASS$9, UIPrefix(COMPONENT_CLASS$9)));
        }

        theUI.inputWrapper = theUI.container.querySelector("." + UIPrefix(COMPONENT_CLASS$9) + "-input");
        var components = FwDom.getSiblings(element);
        components.forEach(function (component) {
          if (component !== theUI.inputWrapper) {
            component.parentNode.removeChild(component);
          }
        }); //input

        if (_this4.args.textInput) {
          if (!theUI.inputWrapper) {
            theUI.inputWrapper = document.createElement('div');
            theUI.container.appendChild(theUI.inputWrapper);
            theUI.inputWrapper.setAttribute('class', UIPrefix(COMPONENT_CLASS$9) + "-input");
            theUI.inputWrapper.innerHTML = '<input class="input input-single-line" type="text" maxlength="10" placeholder="MM/DD/YYYY" />';
          }
        } //heading


        theUI.heading = document.createElement('div');
        theUI.container.appendChild(theUI.heading);
        theUI.heading.setAttribute('class', UIPrefix(COMPONENT_CLASS$9) + "-heading"); //arrowz

        var butts = ['prev-year', 'prev-month', 'next-month', 'next-year'];
        butts.forEach(function (butt) {
          if (_this4.args.yearSkip && (butt == 'prev-year' || butt == 'next-year') || _this4.args.monthSkip && (butt == 'prev-month' || butt == 'next-month')) {
            theUI.heading.innerHTML += _this4._arrowHtml(butt);
          }
        }); //title

        theUI.title = document.createElement('div');
        theUI.heading.appendChild(theUI.title);
        theUI.title.setAttribute('class', UIPrefix(COMPONENT_CLASS$9) + "-title " + UIPrefix(COMPONENT_CLASS$9) + "-dropdown-toggle\n          " + UIDynamicClass //NEED THIS AT ALL TIMES IF U DONT WANNA DIE
        );
        theUI.title.setAttribute('data-toggle-dropdown', '');
        theUI.title.innerHTML = "<span\n          class=\"" + UIPrefix(COMPONENT_CLASS$9) + "-month-text\">\n            " + monthNamesShort[_this4._calendar.month] + "\n          </span>\n          <span class=\"" + UIPrefix(COMPONENT_CLASS$9) + "-year-text\">\n            " + _this4._calendar.year + "\n          </span>\n          <i class=\"" + UIPrefix(COMPONENT_CLASS$9) + "-symbol symbol symbol-caret-down no-margin-x\"></i>"; //dropdown

        var dropdown = document.createElement('ul');
        theUI.heading.appendChild(dropdown);
        dropdown.setAttribute('data-dropdown-width', '100%');
        dropdown.setAttribute('class', UIPrefix(COMPONENT_CLASS$9) + "-dropdown dropdown dropdown-center-x dropdown-top-flush text-align-center");
        dropdown.innerHTML += "<li\n            class=\"" + UIPrefix(COMPONENT_CLASS$9) + "-current-month-year active\"\n          >\n            <a href=\"#\"\n              class=\"" + UIPrefix(COMPONENT_CLASS$9) + "-month\"\n              data-value=\"" + FwDate.toVal(_this4._calendar.startDate) + "\"\n            >\n              " + monthNamesShort[_this4._calendar.month] + " " + _this4._calendar.year + "\n            </a>\n          </li>\n          <li><hr class=\"dropdown-separator\"></li>";
        theUI.dropdown = new Dropdown(dropdown, theUI.title);
        var dropdownInit, dropdownLimit;

        if (_this4.args.yearSpan == 0) {
          dropdownInit = _this4._calendar.startDate.getMonth() * -1;
          dropdownLimit = 11 - _this4._calendar.startDate.getMonth();
        } else {
          dropdownInit = parseInt(-12 * parseInt(_this4.args.yearSpan));
          dropdownLimit = parseInt(12 * parseInt(_this4.args.yearSpan));
        } //update dropdown


        var _loop = function _loop(i) {
          var listItemDate = FwDate.adjacentMonth(_this4._calendar.startDate, i);

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

          if (_this4.validates(dateForValidation, true)) {
            var currClass = i == 0 ? 'active' : '',
                listItem = "<li class=\"" + currClass + "\">\n                <a href=\"#\"\n                  class=\"" + UIPrefix(COMPONENT_CLASS$9) + "-month\"\n                  data-value=\"" + FwDate.toVal(listItemDate) + "\">\n                    " + monthNamesShort[listItemDate.getMonth()] + " " + listItemDate.getFullYear() + "\n                </a>\n              " + (listItemDate.getMonth() == 11 && i !== dropdownLimit ? "</li><li><hr class=\"dropdown-separator\">" : '') + "\n              </li>";
            theUI.dropdown.element.innerHTML += listItem;
          }
        };

        for (var i = dropdownInit; i <= dropdownLimit; i++) {
          _loop(i);
        } //generate grid


        theUI.grid = document.createElement('div');
        theUI.container.append(theUI.grid);
        theUI.grid.setAttribute('class', UIPrefix(COMPONENT_CLASS$9) + "-grid"); //days heading

        theUI.days = document.createElement('div');
        theUI.grid.append(theUI.days);
        theUI.days.setAttribute('class', UIPrefix(COMPONENT_CLASS$9) + "-days");
        var daysHTML = '',
            dayToRetrieve = parseInt(_this4.args.startDay);

        for (var _i = 0; _i < 7; _i++) {
          if (dayToRetrieve > 6) {
            dayToRetrieve -= 7;
          }

          daysHTML += "<div\n              class=\"" + UIPrefix(COMPONENT_CLASS$9) + "-block\n              " + UIPrefix(COMPONENT_CLASS$9) + "-day\"\n            >\n              " + dayNamesShorter[dayToRetrieve] + "\n            </div>";
          dayToRetrieve++;
        }

        theUI.days.innerHTML = daysHTML; //days

        theUI.dates = document.createElement('div');
        theUI.grid.append(theUI.dates);
        theUI.dates.setAttribute('class', UIPrefix(COMPONENT_CLASS$9) + "-dates"); //previous month

        var freeGridSpacePrev = (_this4._calendar.startDate.getDay() - parseInt(_this4.args.startDay) + 7) % 7,
            calendarPrevDayStart = _this4._calendar.prevDay == 6 ? 0 : _this4._calendar.prevDay + 1;

        if (calendarPrevDayStart !== parseInt(_this4.args.startDay)) {
          //if it doenst take its own row of shit
          // i = 0; i <= freeGridSpacePrev; i++
          // @TODO AAAAAAAAAAAA FIGURE OUT THE MATH
          // for( dayLoopI = this._calendar.prevDay; dayLoopI >= (parseInt(this.args.startDay)); dayLoopI--){
          // for(let i = 0; i < 7; i++){
          for (var _i2 = 0; _i2 < freeGridSpacePrev; _i2++) {
            var offset = _this4._calendar.prevDate.getDate() - _i2;

            var loopDatePrev = new Date(_this4._calendar.prevDate.getFullYear(), _this4._calendar.prevDate.getMonth(), offset);

            var dateBlockPrev = _this4._blockHtml(loopDatePrev, UIPrefix(COMPONENT_CLASS$9) + "-block-adjacent\n                " + (!_this4.validates(loopDatePrev) ? 'disabled' : '')); //prepend because we loopped this bitch in reverse


            theUI.dates.innerHTML += dateBlockPrev;
          }
        } //curr month


        for (var _i3 = 1; _i3 <= _this4._calendar.lastDate.getDate(); _i3++) {
          var dateBlockCurr = _this4._blockHtml(new Date(_this4._calendar.year, _this4._calendar.month, _i3), !_this4.validates(new Date(_this4._calendar.year, _this4._calendar.month, _i3)) ? 'disabled' : '');

          theUI.dates.innerHTML += dateBlockCurr;
        } //next month just fill the shit


        var currNextFirstDay = new Date(_this4._calendar.year, _this4._calendar.month + 1, 1).getDay(),
            freeGridSpaceNext = (7 - currNextFirstDay + parseInt(_this4.args.startDay)) % 7;

        if (currNextFirstDay !== parseInt(_this4.args.startDay)) {
          for (var _i4 = 1; _i4 <= freeGridSpaceNext; _i4++) {
            var loopDateNext = new Date(_this4._calendar.year, _this4._calendar.month + 1, _i4);

            var dateBlockNext = _this4._blockHtml(loopDateNext, UIPrefix(COMPONENT_CLASS$9) + "-block-adjacent\n              " + (!_this4.validates(loopDateNext) ? 'disabled' : ''));

            theUI.dates.innerHTML += dateBlockNext;
          }
        }
      }, element);
    };

    _proto.init = function init(elem) {
      elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);
      this.update();
    };

    Calendar.initAll = function initAll() {
      new Calendar().runCycle(EVENT_BEFORE_INIT$4, EVENT_INIT$4, EVENT_AFTER_INIT$4, function () {
        var calendars = document.querySelectorAll("." + COMPONENT_CLASS$9);
        calendars.forEach(function (cal) {
          var calendar = new Calendar(cal);
          calendar.init();
        });
      }, document);
    };

    Calendar.handleChange = function handleChange() {
      return function (e) {
        var calendar = new Calendar(e.target);
        calendar.update();
      };
    };

    Calendar.handleUpdateKeyup = function handleUpdateKeyup() {
      return function (e) {
        if (FwComponent.isDisabled(e.target)) {
          e.preventDefault();
        } else {
          var calendar = new Calendar(e.target.closest("." + UIPrefix(COMPONENT_CLASS$9)).querySelector("." + COMPONENT_CLASS$9));
          var uiInput = e.target.value;

          if (uiInput.match(/^\d{2}$/) !== null) {
            e.target.value = uiInput + "/";
          } else if (uiInput.match(/^\d{2}\/\d{2}$/) !== null) {
            e.target.value = uiInput + "/";
          }

          var preParsedVal = '';

          if (uiInput) {
            var pattern = new RegExp(DateTimePreset.HumanDate.pattern);
            var isValid = pattern.test(uiInput);

            if (calendar && isValid) {
              var theValue = uiInput.split('/');
              var y = theValue[2] || '';
              var m = theValue[0] || '';
              var d = theValue[1] || '';
              preParsedVal = y + "-" + m + "-" + d;
            }
          }

          calendar.update(preParsedVal);
        }
      };
    };

    Calendar.handleUpdateClick = function handleUpdateClick() {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var calendar = new Calendar(e.target.closest("." + UIPrefix(COMPONENT_CLASS$9)).querySelector("." + COMPONENT_CLASS$9));

          if (e.target.classList.contains(ACTIVATED_CLASS$5)) {
            calendar.update('');
          } else {
            calendar.update(e.target.getAttribute('data-value'));
          }
        }
      };
    };

    Calendar.handleRenderClick = function handleRenderClick() {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var calendar = new Calendar(e.target.closest("." + UIPrefix(COMPONENT_CLASS$9)).querySelector("." + COMPONENT_CLASS$9));
          calendar.update(null, e.target.getAttribute('data-value'));
        }
      };
    };

    Calendar.initListeners = function initListeners() {
      FwEvent.addListener(document.documentElement, EVENT_KEYUP, "." + UIPrefix(COMPONENT_CLASS$9) + "-input input", Calendar.handleUpdateKeyup());
      FwEvent.addListener(document.documentElement, EVENT_CLICK$6, "." + UIPrefix(COMPONENT_CLASS$9) + "-date", Calendar.handleUpdateClick());
      FwEvent.addListener(document.documentElement, EVENT_CLICK$6, "." + UIPrefix(COMPONENT_CLASS$9) + "-month, ." + UIPrefix(COMPONENT_CLASS$9) + "-year", Calendar.handleRenderClick());

      if (Settings.get('initializeForm')) {
        Initiator.Q.on_ready = Calendar.initAll;
      }
    };

    Calendar.destroyListeners = function destroyListeners() {
      FwEvent.removeListener(document.documentElement, EVENT_KEYUP, Calendar.handleUpdateKeyup());
      FwEvent.removeListener(document.documentElement, EVENT_CLICK$6, Calendar.handleUpdateClick());
      FwEvent.removeListener(document.documentElement, EVENT_CLICK$6, Calendar.handleRenderClick());
    };

    _createClass(Calendar, [{
      key: "isRequired",
      get: function get() {
        return _FwComponent.prototype.UIEl.call(this).hasAttribute('required');
      }
    }, {
      key: "theValue",
      get: function get() {
        return _FwComponent.prototype.UIEl.call(this).value ? FwDate.toVal(_FwComponent.prototype.UIEl.call(this).value) : false;
      },
      set: function set(theValue) {
        if (theValue) {
          _FwComponent.prototype.UIEl.call(this).setAttribute('value', FwDate.toVal(theValue));

          _FwComponent.prototype.UIEl.call(this).value = FwDate.toVal(theValue);
        }
      }
    }, {
      key: "renderValue",
      get: function get() {
        var theRenderDate = this.UIValue ? this.UIValue : this.theValue ? this.theValue : new Date();
        return FwDate.toVal(theRenderDate);
      },
      set: function set(renderDate) {
        this.UIValue = renderDate;
      }
    }, {
      key: "UIInputValue",
      get: function get() {
        return this.UIInput && FwDate.toVal(this.UIInput.value);
      },
      set: function set(uiValue) {
        this.UIInput.setAttribute('value', FwDate.toHuman(uiValue));
        this.UIInput.value = FwDate.toHuman(uiValue);
      }
    }, {
      key: "UIRoot",
      get: function get() {
        return _FwComponent.prototype.UIEl.call(this).closest("." + UIPrefix(COMPONENT_CLASS$9));
      }
    }, {
      key: "UIDates",
      get: function get() {
        return this.UIRoot && this.UIRoot.querySelectorAll("." + UIPrefix(COMPONENT_CLASS$9) + "-date");
      }
    }, {
      key: "UIInput",
      get: function get() {
        return this.UIRoot.querySelector("." + UIPrefix(COMPONENT_CLASS$9) + "-input input");
      }
    }, {
      key: "args",
      get: function get() {
        return FwComponent._parseArgs({
          startDay: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-start-day") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-start-day") : this._customArgs.startDay,
          min: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-min") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-min") : _FwComponent.prototype.UIEl.call(this).hasAttribute("min") ? _FwComponent.prototype.UIEl.call(this).getAttribute("min") : this._customArgs.min,
          max: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-max") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-max") : _FwComponent.prototype.UIEl.call(this).hasAttribute("max") ? _FwComponent.prototype.UIEl.call(this).getAttribute("max") : this._customArgs.max,
          yearSpan: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-year-span") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-year-span") : this._customArgs.yearSpan,
          disabledDates: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-disabled-dates") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-disabled-dates") : this._customArgs.disabledDates,
          textInput: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-text-input") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-text-input") : this._customArgs.textInput,
          monthSkip: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-month-skip") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-month-skip") : this._customArgs.monthSkip,
          yearSkip: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-year-skip") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-year-skip") : this._customArgs.yearSkip
        }, Calendar.configDefaults());
      }
    }, {
      key: "_calendar",
      get: function get() {
        var renderDate = this.renderValue;
        var toReturn = {
          year: FwDate.toParsed(renderDate).getFullYear(),
          month: FwDate.toParsed(renderDate).getMonth()
        };
        toReturn.startDate = new Date(toReturn.year, toReturn.month, 1);
        toReturn.lastDate = new Date(toReturn.year, toReturn.month + 1, 0);
        toReturn.prevDate = new Date(toReturn.year, toReturn.month, 0);
        toReturn.prevDay = toReturn.prevDate.getDay();
        return toReturn;
      }
    }], [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$9;
      }
    }]);

    return Calendar;
  }(FwComponent);
  Calendar.initListeners();

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

  document.addEventListener('keydown', function (e) {
    Modifiers.update(e);
  });
  document.addEventListener('keyup', function (e) {
    setTimeout(function () {
      Modifiers.update(e);
    }, 100);
  });

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
  }(FwDataHelper);

  var NAME$8 = 'formTags';
  var ARG_ATTRIBUTE_NAME$2 = 'tags';
  var COMPONENT_CLASS$8 = "input-tags";
  var FOCUS_CLASS = "focus";
  var DATA_KEY$8 = Settings.get('prefix') + "_" + NAME$8;
  var EVENT_KEY$8 = "_" + DATA_KEY$8;
  var EVENT_CLICK$5 = "click" + EVENT_KEY$8;
  var EVENT_KEYDOWN = "keydown" + EVENT_KEY$8;
  var EVENT_BLUR = "blur" + EVENT_KEY$8;
  var EVENT_PASTE = "paste" + EVENT_KEY$8; // const EVENT_CHANGE = `change${EVENT_KEY}`;

  var EVENT_BEFORE_INIT$3 = "before_init" + EVENT_KEY$8;
  var EVENT_INIT$3 = "init" + EVENT_KEY$8;
  var EVENT_AFTER_INIT$3 = "after_init" + EVENT_KEY$8;
  var EVENT_BEFORE_RENDER$1 = "before_render" + EVENT_KEY$8;
  var EVENT_RENDER$1 = "render" + EVENT_KEY$8;
  var EVENT_AFTER_RENDER$1 = "after_render" + EVENT_KEY$8;
  var EVENT_BEFORE_UPDATE$1 = "before_update" + EVENT_KEY$8;
  var EVENT_UPDATE$1 = "update" + EVENT_KEY$8;
  var EVENT_AFTER_UPDATE$1 = "after_update" + EVENT_KEY$8;
  var INPUT_STRING = "__fw_input__";

  var Tags = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(Tags, _FwComponent);

    function Tags(element, valueToRender, args) {
      return _FwComponent.call(this, element, {
        UIValue: valueToRender ? valueToRender : element && element._UIValue ? element._UIValue : false,
        _customArgs: args ? args : element && element.__customArgs ? element.__customArgs : {}
      }) || this;
    }

    var _proto = Tags.prototype;

    _proto.dispose = function dispose() {
      _FwComponent.prototype.dispose.call(this);

      this.UIValue = null;
      this._customArgs = null;
    };

    _proto._scrollToUIInput = function _scrollToUIInput() {
      if (this.args.multipleLines || !this.UIInput) {
        return;
      }

      if (this.UIRoot.scrollLeft > this.UIInput.offsetLeft + this.UIInput.offsetWidth || this.UIRoot.scrollLeft + this.UIRoot.clientWidth < this.UIInput.offsetLeft + this.UIInput.offsetWidth) {
        FwDom.scrollToElem(this.UIRoot, this.UIInput, 'x');
        FwDom.scrollToElem(this.UIRoot, this.UIInput, 'y');
      }
    };

    Tags.configDefaults = function configDefaults() {
      return {
        width: null,
        filter: null,
        onKeyUp: null,
        multipleLines: false,
        multipleLinesBreak: false
      };
    };

    Tags.toArr = function toArr(value, returnsWithInput) {
      returnsWithInput = returnsWithInput !== false || returnsWithInput == true;
      var toReturn = Array.isArray(value) ? value : typeof value == 'string' ? value.split(',') : []; //remove duplicates

      toReturn = toReturn.reduce(function (acc, tag) {
        if (!acc.includes(tag) && tag !== '') {
          acc.push(tag);
        }

        return acc;
      }, []); //check for ya boi

      toReturn.forEach(function (tag, i) {
        if (!tag || tag == '' || tag === Tags.__is && !returnsWithInput) {
          toReturn.splice(i, 1);
        }
      });

      if (returnsWithInput && toReturn.indexOf(Tags.__is) < 0) {
        toReturn.push(Tags.__is);
      }

      return toReturn;
    };

    Tags.toVal = function toVal(value, returnsWithInput) {
      return Tags.toArr(value, returnsWithInput).join(',');
    };

    _proto.filterValue = function filterValue(custFn) {
      var _this = this;

      var fnToFilter, applyFilter;

      try {
        fnToFilter = custFn || (typeof this.args.filter === 'string' ? eval(this.args.filter) : this.args.filter);
      } catch (err) {}

      if (typeof fnToFilter === 'function') {
        var fn = fnToFilter;

        applyFilter = function applyFilter(valueToFilter, fn) {
          var noInputValueToFilter = function () {
            return Tags.toVal(valueToFilter, false);
          }(); // turn to array ya bopi without the input tag string
          // let toReturn = Tags.toArr(
          //   eval(`${filterFnName}("${noInputValueToFilter}")`),
          //   false
          // );


          var toReturn = Tags.toArr(fn(noInputValueToFilter), false); // console.log(
          // 	'index of input\n',inputIndex,
          // 	'\n\n\nfiltered and ready for splice\n',toReturn,
          // 	'\n\n\npassed to the fil;ter\n'Tags.toVal(valueToFilter,false),
          // 	'\n\n\nrar array\n'Tags.toArr(valueToFilter),
          // 	'\n\n\n no input field\n',noInputValueToFilter,Tags.toVal(valueToFilter,false),
          // 	'\n\n\n no input fieldas array\n'Tags.toArr(valueToFilter,false),
          // 	'\n\n\n string for eval\n', ( filterFnName +'("'+ noInputValueToFilter +'")'),
          // 	'\n\n\neval\n',  eval(filterFnName +'("'+ noInputValueToFilter +'")'),
          // 	'whAT ETHE FUCK'
          // );

          if (_this.UIInputIdx > -1) {
            toReturn.splice(_this.UIInputIdx < Tags.toArr(valueToFilter).length - 1 ? _this.UIInputIdx : toReturn.length, 0, Tags.__is);
          }

          return Tags.toVal(toReturn);
        };

        this.theValue = applyFilter(this.theValue, fn);
        this.renderValue = applyFilter(this.renderValue, fn);
      }
    };

    _proto.update = function update(newValue, allowFilter, valueToRender, inputText) {
      var _this2 = this;

      var theValue = newValue || this.theValue || '';
      var uiValue = valueToRender || theValue || this.renderValue || '';
      allowFilter = allowFilter == false ? false : true;
      inputText = inputText || false;
      var triggerChange = newValue && Tags.toVal(newValue, false) !== this.theValue ? true : false;

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_UPDATE$1, EVENT_UPDATE$1, EVENT_AFTER_UPDATE$1, function () {
        _this2.theValue = theValue;
        _this2.renderValue = uiValue;

        if (_this2.args.filter && allowFilter) {
          _this2.filterValue();
        }

        _this2._renderUI();

        if (inputText) {
          _this2.UIInputValue = inputText;

          _this2.focus();
        }

        if (triggerChange) {
          FwEvent.trigger(_FwComponent.prototype.UIEl.call(_this2), 'change');
        }
      });
    };

    _proto._renderUI = function _renderUI(elem) {
      var _this3 = this;

      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);

      if (!element) {
        return;
      }

      var theUI = {};

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_RENDER$1, EVENT_RENDER$1, EVENT_AFTER_RENDER$1, function () {
        theUI.container = _this3.UIRoot;

        if (!theUI.container) {
          theUI.container = document.createElement('div');
          element.parentNode.insertBefore(theUI.container, element);
          theUI.container.appendChild(element);
          theUI.container.classList.add('input');
          theUI.container.setAttribute('class', Settings.get('uiClass') + "\n          " + Settings.get('uiJsClass') + "\n          " + element.getAttribute('class').toString().replace(COMPONENT_CLASS$8, UIPrefix(COMPONENT_CLASS$8)));
          theUI.container.classList.add(_this3.args.multipleLines ? UIPrefix(COMPONENT_CLASS$8) + "-multiple" : UIPrefix(COMPONENT_CLASS$8) + "-single");
          _this3.args.multipleLines && _this3.args.multipleLinesBreak && theUI.container.classList.add(UIPrefix(COMPONENT_CLASS$8) + "-multiple-break");
        }

        if (_this3.args.width) {
          theUI.container.style = _this3.args.width;
        } //idk it never exists on initial so we dont have to do weird div wraping catches here


        theUI.wrapper = theUI.container.querySelector("." + UIPrefix(COMPONENT_CLASS$8) + "-wrapper");

        if (!theUI.wrapper) {
          theUI.wrapper = document.createElement('div');
          theUI.container.appendChild(theUI.wrapper);
          theUI.wrapper.setAttribute('class', UIPrefix(COMPONENT_CLASS$8) + "-wrapper");
          theUI.wrapper = theUI.container.querySelector("." + UIPrefix(COMPONENT_CLASS$8) + "-wrapper");
          var self = _this3;

          Initiator.Q.on_resize = function () {
            self._scrollToUIInput();
          };
        }

        theUI.input = _this3.UIInput;

        if (!theUI.input) {
          theUI.input = document.createElement('input'); // theUI.input = document.createElement('span');

          theUI.wrapper.appendChild(theUI.input);
          theUI.input.setAttribute('class', UIPrefix(COMPONENT_CLASS$8) + "-input"); // theUI.input.contentEditable = true;

          theUI.input = theUI.wrapper.querySelector("." + UIPrefix(COMPONENT_CLASS$8) + "-input");

          if (element.hasAttribute('placeholder')) {
            theUI.input.setAttribute( // 'data-placeholder',
            'placeholder', element.getAttribute('placeholder'));
          } //nearest fw-ui parent will actually do tgoggl for bby because baby cant stand up on its own
          // if (element.hasAttribute('data-toggle')) {
          //   theUI.input.setAttribute(
          //     'data-toggle',
          //     element.getAttribute('data-toggle')
          //   );
          // }


          if (FwComponent.isDisabled(element)) {
            theUI.input.classList.add('disabled');
          } //bitch


          if (_this3.args.onKeyUp) {
            theUI.input.addEventListener('keyup', function (event) {
              var keyUpScript = eval(_this3.args.onKeyUp);

              if (keyUpScript) {
                return keyUpScript;
              }
            });
          }
        } //updoot tags


        var oldTags = theUI.wrapper.querySelectorAll("." + UIPrefix(COMPONENT_CLASS$8) + "-tag");
        oldTags.forEach(function (tag) {
          tag.parentNode.removeChild(tag);
        });
        var valArr = Tags.toArr(_this3.renderValue, true);
        theUI.input.setAttribute('data-ui-i', _this3.UIInputIdx); //validate tags
        // valArr = valArr.reduce((acc, tag) => {
        // 	if (!acc.includes(tag)) {
        // 		acc.push(tag);
        // 	}
        // 	return acc;
        // }, []);

        valArr.forEach(function (tag, i) {
          //get index of input
          if (tag !== Tags.__is) {
            var tagHtml = document.createElement('span');

            if (i < _this3.UIInputIdx) {
              theUI.input.insertAdjacentElement('beforebegin', tagHtml);
            } else {
              theUI.wrapper.appendChild(tagHtml);
            }

            tagHtml.setAttribute('class', UIPrefix(COMPONENT_CLASS$8) + "-tag");
            tagHtml.innerHTML = "<button\n              data-ui-i=\"" + i + "\"\n              class=\"" + UIPrefix(COMPONENT_CLASS$8) + "-tag-text " + UIPrefix(COMPONENT_CLASS$8) + "-tag-button\"\n              type=\"button\"\n            >\n              " + tag + "\n            </button>\n            <button data-ui-i=\"" + i + "\" class=\"" + UIPrefix(COMPONENT_CLASS$8) + "-tag-close " + UIPrefix(COMPONENT_CLASS$8) + "-tag-button\" type=\"button\">\n              <i class=\"symbol symbol-close\"></i>\n            </button>";
          }
        }); //attribues

        for (var i = 0; i < element.attributes.length; i++) {
          var attr = element.attributes[i];

          if (attr.specified) {
            if (attr.name.includes('data') && !attr.name.includes('data-tags') && !attr.name.includes('data-toggle') && !attr.name.includes('data-value-ui')) {
              theUI.container.setAttribute(attr.name, attr.value);
            }
          }
        }

        element.setAttribute('data-value-ui', _this3.renderValue); //keep that shoit bisibol

        _this3._scrollToUIInput();
      }, element);
    };

    _proto.focus = function focus(disableNative) {
      disableNative = disableNative || false;
      var self = this;
      !disableNative && setTimeout(function () {
        // console.log('poku','naAAANDATAAAOOOO',self.UIInput);
        self.UIInput.focus();
      }, 0);
      self.UIRoot.classList.add(FOCUS_CLASS);

      self._scrollToUIInput();
    };

    _proto.blur = function blur(disableNative) {
      disableNative = disableNative || false;
      var self = this;
      !disableNative && setTimeout(function () {
        // console.log('bru','naAAANDATAAAOOOO');
        self.UIInput.blur();
      }, 0);
      self.UIRoot.classList.remove(FOCUS_CLASS);
    };

    _proto.init = function init(elem) {
      elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);
      this.update();
    };

    Tags.initAll = function initAll() {
      new Tags().runCycle(EVENT_BEFORE_INIT$3, EVENT_INIT$3, EVENT_AFTER_INIT$3, function () {
        var tagsInputs = document.querySelectorAll("." + COMPONENT_CLASS$8);
        tagsInputs.forEach(function (poot) {
          var tagsInput = new Tags(poot);
          tagsInput.init();
        });
      }, document);
    };

    Tags.handleEditablePaste = function handleEditablePaste() {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var tagsInput = new Tags(e.target.closest("." + UIPrefix(COMPONENT_CLASS$8)).querySelector("." + COMPONENT_CLASS$8));
          var pasted = e.clipboardData || window.clipboardData || e.originalEvent.clipboardData;
          tagsInput.UIInputValue += pasted.getData('text');
          tagsInput.blur();
        }
      };
    };

    Tags.handleEditableFocus = function handleEditableFocus() {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var tagsInput = new Tags(e.target);
          tagsInput.focus();
        }
      };
    };

    Tags.handleEditableBlur = function handleEditableBlur() {
      return function (e) {
        if (!FwComponent.isDisabled(e.target)) {
          var tagsInput = new Tags(e.target.closest("." + UIPrefix(COMPONENT_CLASS$8)).querySelector("." + COMPONENT_CLASS$8)); //value para mareset ta kung hain si buloy

          var currValue = Tags.toArr(tagsInput.theValue);

          if (tagsInput.UIInputValue) {
            currValue.splice(tagsInput.UIInputIdx, 0, tagsInput.UIInputValue.replace(',', ''));
          }

          tagsInput.UIInputValue = '';
          tagsInput.update(Tags.toVal(currValue, false), true);
          tagsInput.blur(true);
        }
      };
    };

    Tags.handleEditableKeydown = function handleEditableKeydown() {
      return function (e) {
        if (FwComponent.isDisabled(e.target)) {
          e.preventDefault();
        } else {
          var tagsInput = new Tags(e.target.closest("." + UIPrefix(COMPONENT_CLASS$8)).querySelector("." + COMPONENT_CLASS$8));
          var currUIValue = Tags.toArr(tagsInput.renderValue),
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
              if (!Modifiers.hasActive()) {
                allowFilter = true;
                e.preventDefault();
                currUIValue.splice(tagsInput.UIInputIdx, 0, tagsInput.UIInputValue.replace(',', ''));
                tagsInput.UIInputValue = '';
              } // currUIValue.splice()


              break;
            //left

            case 'ArrowLeft':
              if (!tagsInput.UIInputValue) {
                e.preventDefault();
                currUIValue = FwArrayay.moveItem(currUIValue, tagsInput.UIInputIdx, tagsInput.UIInputIdx > 0 ? tagsInput.UIInputIdx - 1 : 0);
              }

              break;
            //right

            case 'ArrowRight':
              if (!tagsInput.UIInputValue) {
                e.preventDefault();
                currUIValue = FwArrayay.moveItem(currUIValue, tagsInput.UIInputIdx, tagsInput.UIInputIdx < currUIValue.length ? tagsInput.UIInputIdx + 1 : currUIValue.length - 1); // tagsInput._scrollToUIInput();
              }

              break;
            //up

            case 'ArrowUp':
              if (!tagsInput.UIInputValue) {
                e.preventDefault();
                currUIValue = FwArrayay.moveItem(currUIValue, tagsInput.UIInputIdx, 0);
              }

              break;
            //down

            case 'ArrowDown':
              if (!tagsInput.UIInputValue) {
                e.preventDefault();
                currUIValue = FwArrayay.moveItem(currUIValue, tagsInput.UIInputIdx, currUIValue.length - 1); // tagsInput._scrollToUIInput();
              }

              break;
            //backspace

            case 'Backspace':
              if (!tagsInput.UIInputValue) {
                e.preventDefault();
                allowFilter = true;
                currUIValue.splice(tagsInput.UIInputIdx - 1, 1);
              }

              break;
            //delete

            case 'Delete':
              if (!tagsInput.UIInputValue) {
                e.preventDefault();
                allowFilter = true;
                currUIValue.splice(tagsInput.UIInputIdx + 1, 1);
              }

              break;
          }

          newValue = Tags.toVal(currUIValue); // tagsInput._scrollToUIInput();

          tagsInput.update(newValue, allowFilter);
        }
      };
    };

    Tags.handleDelete = function handleDelete() {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var tagsInput = new Tags(e.target.closest("." + UIPrefix(COMPONENT_CLASS$8)).querySelector("." + COMPONENT_CLASS$8));
          var tagToRemove = parseInt(e.target.getAttribute('data-ui-i'));
          var currValue = Tags.toArr(tagsInput.theValue);
          currValue.splice(parseInt(tagToRemove), 1);
          var newValue = Tags.toVal(currValue);
          tagsInput.update(newValue, true);
        }
      };
    };

    Tags.handleEdit = function handleEdit() {
      return function (e) {
        var triggerer = e.target;
        e.preventDefault();

        if (!FwComponent.isDisabled(triggerer)) {
          var tagsInput = new Tags(e.target.closest("." + UIPrefix(COMPONENT_CLASS$8)).querySelector("." + COMPONENT_CLASS$8));
          var tagToEdit = parseInt(e.target.getAttribute('data-ui-i'));
          var currValue = Tags.toArr(tagsInput.theValue, false);
          currValue.splice(tagToEdit, 1, Tags.__is);
          var newUIValue = Tags.toVal(currValue);
          tagsInput.update(null, false, newUIValue, e.target.innerText);
        }
      };
    };

    Tags.initListeners = function initListeners() {
      FwEvent.addListener(document.documentElement, EVENT_PASTE, "." + UIPrefix(COMPONENT_CLASS$8) + " ." + UIPrefix(COMPONENT_CLASS$8) + "-input", Tags.handleEditablePaste());
      FwEvent.addListener(document.documentElement, EVENT_CLICK$5, "." + UIPrefix(COMPONENT_CLASS$8) + " ." + UIPrefix(COMPONENT_CLASS$8) + "-input", Tags.handleEditableFocus());
      FwEvent.addListener(document.documentElement, EVENT_BLUR, "." + UIPrefix(COMPONENT_CLASS$8) + " ." + UIPrefix(COMPONENT_CLASS$8) + "-input", Tags.handleEditableBlur());
      FwEvent.addListener(document.documentElement, EVENT_KEYDOWN, "." + UIPrefix(COMPONENT_CLASS$8) + " ." + UIPrefix(COMPONENT_CLASS$8) + "-input", Tags.handleEditableKeydown());
      FwEvent.addListener(document.documentElement, EVENT_CLICK$5, "." + UIPrefix(COMPONENT_CLASS$8) + " ." + UIPrefix(COMPONENT_CLASS$8) + "-tag-close", Tags.handleDelete());
      FwEvent.addListener(document.documentElement, EVENT_CLICK$5, "." + UIPrefix(COMPONENT_CLASS$8) + " ." + UIPrefix(COMPONENT_CLASS$8) + "-tag-text", Tags.handleEdit());

      if (Settings.get('initializeForm')) {
        Initiator.Q.on_ready = Tags.initAll;
      }
    };

    Tags.destroyListeners = function destroyListeners() {
      FwEvent.removeListener(document.documentElement, EVENT_PASTE, Tags.handleEditablePaste());
      FwEvent.removeListener(document.documentElement, EVENT_CLICK$5, Tags.handleEditableFocus());
      FwEvent.removeListener(document.documentElement, EVENT_BLUR, Tags.handleEditableBlur());
      FwEvent.removeListener(document.documentElement, EVENT_KEYDOWN, Tags.handleEditableKeydown());
      FwEvent.removeListener(document.documentElement, EVENT_CLICK$5, Tags.handleDelete());
      FwEvent.removeListener(document.documentElement, EVENT_CLICK$5, Tags.handleEdit());
    };

    _createClass(Tags, [{
      key: "theValue",
      get: function get() {
        return _FwComponent.prototype.UIEl.call(this).value;
      },
      set: function set(theValue) {
        if (theValue) {
          _FwComponent.prototype.UIEl.call(this).setAttribute('value', Tags.toVal(theValue, false));

          _FwComponent.prototype.UIEl.call(this).value = Tags.toVal(theValue, false);
        }
      }
    }, {
      key: "renderValue",
      get: function get() {
        var renderTags = this.UIValue ? this.UIValue : _FwComponent.prototype.UIEl.call(this).hasAttribute('data-value-ui') ? _FwComponent.prototype.UIEl.call(this).getAttribute('data-value-ui') : this.theValue;
        return renderTags;
      },
      set: function set(renderTags) {
        this.UIValue = Tags.toVal(renderTags);
      }
    }, {
      key: "UIRoot",
      get: function get() {
        return _FwComponent.prototype.UIEl.call(this).closest("." + UIPrefix(COMPONENT_CLASS$8));
      }
    }, {
      key: "UIInput",
      get: function get() {
        return this.UIRoot && this.UIRoot.querySelector("." + UIPrefix(COMPONENT_CLASS$8) + "-input");
      }
    }, {
      key: "UIInputValue",
      get: function get() {
        return this.UIInput.value;
      },
      set: function set(inputValue) {
        this.UIInput.value = inputValue.toString().replace(/\n|\r/g, '\\n');
      }
    }, {
      key: "UIInputIdx",
      get: function get() {
        var toReturn = Tags.toArr(this.renderValue).indexOf(Tags.__is);

        if (toReturn < 0) {
          Tags.toArr(this.renderValue).length > 0 ? Tags.toArr(this.renderValue).length - 1 : 0;
        }

        return toReturn; // (
        // 	this.UIInput
        // 	&& parseInt(this.UIInput.getAttribute('data-ui-i'))
        // )
        // || Tags.toArr(this.renderValue).indexOf(Tags.__is)
        // || Tags.toArr(this.theValue).length;
      }
    }, {
      key: "args",
      get: function get() {
        return FwComponent._parseArgs({
          width: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$2 + "-width") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$2 + "-width") : this._customArgs.width,
          onKeyUp: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$2 + "-on-keyup") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$2 + "-on-keyup") : this._customArgs.onKeyUp,
          filter: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$2 + "-filter") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$2 + "-filter") : this._customArgs.filter,
          multipleLines: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$2 + "-multiple-lines") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$2 + "-multiple-lines") : this._customArgs.multipleLines,
          multipleLinesBreak: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$2 + "-multiple-lines-break") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$2 + "-multiple-lines-break") : this._customArgs.multipleLinesBreak
        }, Tags.configDefaults());
      }
    }], [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$8;
      }
    }, {
      key: "__is",
      get: function get() {
        return INPUT_STRING;
      }
    }]);

    return Tags;
  }(FwComponent);
  Tags.initListeners();

  var Form = {
    Calendar: Calendar,
    Tags: Tags
  };

  var NAME$7 = 'lazy';
  var COMPONENT_CLASS$7 = "" + FwString.ToDashed(NAME$7);
  var COMPONENT_CLASS_SVG = COMPONENT_CLASS$7 + "-svg";
  var ACTIVATED_CLASS$4 = NAME$7 + "-loaded";
  var SVG_REPLACED_CLASS = COMPONENT_CLASS$7 + "-svg-replacement";
  var COMPONENT_SELECTOR = "*[data-src],*[data-srcset],." + COMPONENT_CLASS$7;
  var BODY_LOADING_CLASS = "body-" + NAME$7 + "-loading";
  var BODY_LOADED_CLASS = "body-" + NAME$7 + "-loaded";
  var DATA_KEY$7 = Settings.get('prefix') + "_" + NAME$7;
  var EVENT_KEY$7 = "_" + DATA_KEY$7;
  var EVENT_BEFORE_INIT$2 = "before_init" + EVENT_KEY$7;
  var EVENT_INIT$2 = "init" + EVENT_KEY$7;
  var EVENT_AFTER_INIT$2 = "after_init" + EVENT_KEY$7;
  var EVENT_BEFORE_SVGCONVERSION = "before_svgconversion" + EVENT_KEY$7;
  var EVENT_SVGCONVERSION = "svgconversion" + EVENT_KEY$7;
  var EVENT_AFTER_SVGCONVERSION = "after_svgconversion" + EVENT_KEY$7;
  var EVENT_BEFORE_LOAD = "before_load" + EVENT_KEY$7;
  var EVENT_LOAD = "load" + EVENT_KEY$7;
  var EVENT_AFTER_LOAD = "after_load" + EVENT_KEY$7;

  var Lazy = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(Lazy, _FwComponent);

    function Lazy(element) {
      return _FwComponent.call(this, element, {
        _ogElement: element && element.__ogElement ? element.__ogElement : false
      }) || this;
    }

    var _proto = Lazy.prototype;

    _proto.dispose = function dispose() {
      _FwComponent.prototype.dispose.call(this);
    };

    _proto.readyLoaded = function readyLoaded(elem) {
      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this); //so it dont run agen when it's already loaded

      this.theSrc && element.removeAttribute('data-src');
      this.theSrcSet && element.removeAttribute('data-srcset');
      element.classList.remove("" + COMPONENT_CLASS$7);
      element.classList.add("" + ACTIVATED_CLASS$4);
    };

    _proto.loadSVG = function loadSVG(elem) {
      var _this = this;

      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);
      var imgID = element.getAttribute('id');
      var imgClass = element.getAttribute('class');

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_SVGCONVERSION, EVENT_SVGCONVERSION, EVENT_AFTER_SVGCONVERSION, function () {
        fetch(_this.theSrc).then(function (response) {
          return response.text();
        }).then(function (markup) {
          var parser = new DOMParser();
          var dom = parser.parseFromString(markup, 'text/html');
          var svg = dom.querySelector('svg');

          if (svg) {
            if (element.hasAttribute('id')) {
              svg.setAttribute('id', imgID);
            }

            if (element.hasAttribute('class')) {
              svg.setAttribute('class', imgClass + " " + SVG_REPLACED_CLASS);
            }

            svg.removeAttribute('xmlns:a');
            _this.UIOriginal = element;

            _FwComponent.prototype._resetUIEl.call(_this, svg);

            element.replaceWith(svg);
          }

          _this.readyLoaded();
        });
      }, element);
    };

    _proto.load = function load(elem) {
      var _this2 = this;

      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);

      if (!element) {
        return;
      }

      if (element.classList.contains("" + COMPONENT_CLASS$7)) {
        _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_LOAD, EVENT_LOAD, EVENT_AFTER_LOAD, function () {
          if (element.matches('img') || element.closest('picture')) {
            _this2.theSrc && element.setAttribute('src', _this2.theSrc);
            _this2.theSrcSet && element.setAttribute('srcset', _this2.theSrcSet);

            if ((_this2.theSrc || _this2.theSrcSet) && FwString.GetFileExtension(_this2.theSrc) == 'svg' && element.classList.contains(COMPONENT_CLASS_SVG)) {
              _this2.loadSVG();
            } else {
              _this2.readyLoaded();
            }
          } else {
            _this2.theSrc && (element.style.backgroundImage = "url(" + _this2.theSrc + ")");

            _this2.readyLoaded();
          }
        }, element);
      }
    };

    Lazy.setStatus = function setStatus(status) {
      status = status || 'loaded';
      var addClass, removeClass;

      switch (status) {
        case 'loading':
          addClass = BODY_LOADING_CLASS;
          removeClass = BODY_LOADED_CLASS;
          break;

        case 'loaded':
          addClass = BODY_LOADED_CLASS;
          removeClass = BODY_LOADING_CLASS;
          break;
      }

      document.body.classList.remove(removeClass);
      document.body.classList.add(addClass);
    };

    Lazy.loadAll = function loadAll(images) {
      new Lazy().runCycle(EVENT_BEFORE_INIT$2, EVENT_INIT$2, EVENT_AFTER_INIT$2, function () {
        Lazy.setStatus('loading');
        images = images || document.querySelectorAll(COMPONENT_SELECTOR);
        images.forEach(function (img) {
          var lazy = new Lazy(img);
          lazy.load();
        });
        Lazy.setStatus('loaded');
      }, document);
    };

    Lazy.initListeners = function initListeners() {
      if (Settings.get('lazyLoad')) {
        Initiator.Q.on_ready = Lazy.loadAll;
      }
    };

    _createClass(Lazy, [{
      key: "theSrc",
      get: function get() {
        return _FwComponent.prototype.UIEl.call(this).getAttribute('data-src');
      }
    }, {
      key: "theSrcSet",
      get: function get() {
        return _FwComponent.prototype.UIEl.call(this).getAttribute('data-srcset');
      }
    }, {
      key: "UIOriginal",
      get: function get() {
        return this._ogElement || _FwComponent.prototype.UIEl.call(this);
      },
      set: function set(elem) {
        this._ogElement = elem;
      }
    }], [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$7;
      }
    }]);

    return Lazy;
  }(FwComponent);
  Lazy.initListeners();

  var NAME$6 = 'listGroup';
  var COMPONENT_CLASS$6 = FwString.ToDashed(NAME$6) + "-toggle"; //coz toggling shit only work when this class is heeerr

  var CHILD_CLASS = FwString.ToDashed(NAME$6) + "-item";
  var COMPONENT_TOGGLEGROUP_PREFIX = "list";
  var DATA_KEY$6 = Settings.get('prefix') + "_" + NAME$6;
  var EVENT_KEY$6 = "_" + DATA_KEY$6;
  var EVENT_CLICK$4 = "click" + EVENT_KEY$6;
  var EVENT_BEFORE_TOGGLE = "before_toggle" + EVENT_KEY$6;
  var EVENT_TOGGLE = "toggle" + EVENT_KEY$6;
  var EVENT_AFTER_TOGGLE = "after_toggle" + EVENT_KEY$6;

  var ListGroup = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(ListGroup, _FwComponent);

    function ListGroup(element, triggeredChild) {
      element = element || false;
      return _FwComponent.call(this, element, {
        _triggeredChild: triggeredChild ? new FwDom(triggeredChild) : element && element.__triggeredChild ? element.__triggeredChild : false
      }) || this;
    }

    var _proto = ListGroup.prototype;

    _proto.toggle = function toggle(triggd) {
      var _this = this;

      var triggeredChild = triggd ? triggd : this.UITriggeredChild;
      this.UITriggeredChild = triggeredChild;

      if (!triggeredChild || !FwDom.isDescendant(_FwComponent.prototype.UIEl.call(this), triggeredChild)) {
        return;
      }

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_TOGGLE, EVENT_TOGGLE, EVENT_AFTER_TOGGLE, function () {
        UIToggleGroup(_this.UITriggeredChild, "" + COMPONENT_TOGGLEGROUP_PREFIX, null, "li, ." + CHILD_CLASS);
      }, this.UITriggeredChild);
    };

    ListGroup.handleToggle = function handleToggle() {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var listGroup = new ListGroup(e.target.parentNode.closest("." + COMPONENT_CLASS$6));
          listGroup.toggle(e.target);
        }
      };
    };

    ListGroup.initListeners = function initListeners() {
      FwEvent.addListener(document.documentElement, EVENT_CLICK$4, "." + COMPONENT_CLASS$6 + " > ." + CHILD_CLASS + ", ." + COMPONENT_CLASS$6 + " > li", ListGroup.handleToggle());
    };

    ListGroup.destroyListeners = function destroyListeners() {
      FwEvent.removeListener(document.documentElement, EVENT_CLICK$4, ListGroup.handleToggle());
    };

    _createClass(ListGroup, [{
      key: "UITriggeredChild",
      get: function get() {
        return this._triggeredChild;
      },
      set: function set(triggd) {
        if (FwDom.isDescendant(_FwComponent.prototype.UIEl.call(this), triggd)) {
          this._triggeredChild = triggd;
        }
      }
    }], [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$6;
      }
    }]);

    return ListGroup;
  }(FwComponent);
  ListGroup.initListeners();

  var NAME$5 = 'modal';
  var COMPONENT_CLASS$5 = "" + FwString.ToDashed(NAME$5);
  var ARG_ATTRIBUTE_NAME$1 = "" + NAME$5;
  var TOGGLE_MODE_PREFIX = "" + NAME$5;
  var ACTIVATED_CLASS$3 = "active";
  var DEFAULT_NAME = "default";
  var FULLSCREEN_NAME = "fullscreen";
  var BOARD_NAME = "board";
  var DATA_KEY$5 = Settings.get('prefix') + "_" + NAME$5;
  var EVENT_KEY$5 = "_" + DATA_KEY$5;
  var EVENT_CLICK$3 = "click" + EVENT_KEY$5;
  var EVENT_HASHCHANGE = "hashchange" + EVENT_KEY$5;
  var EVENT_BEFORE_CREATE$1 = "before_create" + EVENT_KEY$5;
  var EVENT_CREATE$1 = "create" + EVENT_KEY$5;
  var EVENT_AFTER_CREATE$1 = "after_create" + EVENT_KEY$5;
  var EVENT_BEFORE_DESTROY$1 = "before_destroy" + EVENT_KEY$5;
  var EVENT_DESTROY$1 = "destroy" + EVENT_KEY$5;
  var EVENT_AFTER_DESTROY$1 = "after_destroy" + EVENT_KEY$5;
  var EVENT_BEFORE_UPDATE = "before_update" + EVENT_KEY$5;
  var EVENT_UPDATE = "update" + EVENT_KEY$5;
  var EVENT_AFTER_UPDATE = "after_update" + EVENT_KEY$5;
  var EVENT_BEFORE_RESIZE = "before_resize" + EVENT_KEY$5;
  var EVENT_RESIZE = "resize" + EVENT_KEY$5;
  var EVENT_AFTER_RESIZE = "after_resize" + EVENT_KEY$5;
  var CURRENT_MODAL_INSTANCE = {};
  var VALID_MODAL_MODES = [BOARD_NAME, FULLSCREEN_NAME, DEFAULT_NAME // default's just named after the component istels fo im not confusion also make it last
  ];
  VALID_MODAL_MODES.forEach(function (mode) {
    CURRENT_MODAL_INSTANCE[mode] = {
      element: false,
      args: false,
      UI: false,
      UIContentBlock: false
    };
  });

  var _current = /*#__PURE__*/_classPrivateFieldLooseKey("current");

  var _modeToggle = /*#__PURE__*/_classPrivateFieldLooseKey("modeToggle");

  var _modeClass = /*#__PURE__*/_classPrivateFieldLooseKey("modeClass");

  var Modal = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(Modal, _FwComponent);

    function Modal(element, triggerer, args) {
      var _this;

      //4 on init by hash
      element = element || false;
      args = args || false; //get currMode

      var currMode = false; //look for currMode

      VALID_MODAL_MODES.forEach(function (mode) {
        if (!element) {
          element = UIToggled(_classPrivateFieldLooseBase(Modal, _modeToggle)[_modeToggle](currMode), null, "." + COMPONENT_CLASS$5 + "." + _classPrivateFieldLooseBase(Modal, _modeClass)[_modeClass](mode)) || Modal.current(currMode).element;
        } //if not set yet of course


        if (!currMode) {
          // by triggerer first
          if (triggerer && !element) {
            if (triggerer.hasAttribute("data-toggle-" + _classPrivateFieldLooseBase(Modal, _modeToggle)[_modeToggle](mode)) || triggerer.hasAttribute("data-toggle-" + _classPrivateFieldLooseBase(Modal, _modeToggle)[_modeToggle](mode) + "-open") || triggerer.hasAttribute("data-toggle-" + _classPrivateFieldLooseBase(Modal, _modeToggle)[_modeToggle](mode) + "-close")) {
              currMode = mode;
            }
          } else if (element) {
            //look for subcom
            if (element.classList.contains(COMPONENT_CLASS$5 + "-" + mode)) {
              currMode = mode; //ok default probable
            } else if (element.classList.contains(COMPONENT_CLASS$5)) {
              currMode = DEFAULT_NAME;
            }
          } else if (!element) {
            if (Modal.current(mode).element) {
              currMode = mode;
            }
          }
        }
      }); //kill if not a valid bode boi

      if (!currMode) {
        element = false;
      }

      _this = _FwComponent.call(this, element, {
        triggerer: triggerer ? triggerer : element && element._triggerer ? element._triggerer : false,
        _customArgs: args ? args : element && element.__customArgs ? element.__customArgs : {},
        _mode: currMode ? currMode : element && element.__mode ? element.__mode : false
      }) || this;
      Object.defineProperty(_assertThisInitialized(_this), _current, {
        get: _get_current,
        set: _set_current
      });
      return _this;
    }

    var _proto = Modal.prototype;

    _proto.dispose = function dispose() {
      _FwComponent.prototype.dispose.call(this);

      this.triggerer = null;
      this._customArgs = null;
    };

    Modal.current = function current(mode) {
      return mode ? CURRENT_MODAL_INSTANCE[mode] : CURRENT_MODAL_INSTANCE;
    };

    Modal.configDefaults = function configDefaults(mode) {
      mode = mode || DEFAULT_NAME;
      return {
        changeHash: true,
        title: '',
        close: {
          value: true,
          parser: function parser(value) {
            return mode !== FULLSCREEN_NAME ? value : false;
          }
        },
        disableOverlay: {
          value: true,
          parser: function parser(value) {
            return mode !== FULLSCREEN_NAME ? value : false;
          }
        },
        width: null,
        callback: null,
        classes: '',
        closeClasses: '',
        align: {
          value: 'right',
          parser: function parser(value) {
            if (mode == BOARD_NAME && (value == 'left' || value == 'right')) return value;
          }
        },
        resize: {
          value: false,
          parser: function parser(value) {
            if (mode == BOARD_NAME) return value;
          }
        },
        resizeClasses: {
          value: null,
          parser: function parser(value) {
            if (mode == BOARD_NAME) return value;
          }
        }
      };
    };

    _proto.toggle = function toggle(elem) {
      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);

      if (element && element.classList.contains(ACTIVATED_CLASS$3)) {
        this.create();
      } else {
        this.destroy();
      }
    };

    _proto.create = function create(elem) {
      var _this2 = this;

      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);
      var matchedHashDestroy = false;

      if (!window.location.hash && _classPrivateFieldLooseBase(this, _current)[_current] && _classPrivateFieldLooseBase(this, _current)[_current].element) {
        if (element === _classPrivateFieldLooseBase(this, _current)[_current].element) {
          matchedHashDestroy = true;
        }

        new Modal(_classPrivateFieldLooseBase(this, _current)[_current].element).destroy();
      } //no need to create it twice or create it after already desttroiny it


      if (matchedHashDestroy) {
        return;
      }

      if (!element) {
        return;
      }

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_CREATE$1, EVENT_CREATE$1, EVENT_AFTER_CREATE$1, function () {
        var id = _this2.UIElId || _this2.UIId;
        id !== "" + _this2.UIId && _this2.args.changeHash && UIChangeHash(id);
        var theUI = document.createElement('div'); // document.querySelector('body').appendChild(theUI);

        element.parentNode.insertBefore(theUI, element.nextSibling);
        theUI.className = UIPrefix(COMPONENT_CLASS$5) + " " + _this2.UiModeClass + " " + UIPrefix(COMPONENT_CLASS$5) + "-component\n          " + (_this2.args.align ? UIPrefix(COMPONENT_CLASS$5) + "-align-" + _this2.args.align : '') + "\n          " + _this2.args.classes;
        theUI.setAttribute('id', _this2.UIId);
        theUI.innerHTML = _this2._markup;
        FwDom.moveContents(element, _this2.UIContentBlock);
        element.appendChild(theUI);
        _classPrivateFieldLooseBase(_this2, _current)[_current] = {
          element: element,
          args: _this2.args,
          UI: _this2.UIRoot,
          UIContentBlock: _this2.UIContentBlock
        };

        if (_this2.args.width) {
          _this2.resize();
        }

        _this2.update();

        if (_this2.args.callback) {
          _this2._runFn(_this2.args.callback);
        }

        element.classList.add(ACTIVATED_CLASS$3);
        document.body.classList.add(UIBodyClass.noScroll);
      }, element);
    };

    _proto.destroy = function destroy(elem) {
      var _this3 = this;

      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);
      var hash = window.location.hash;

      if (!element) {
        return;
      }

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_DESTROY$1, EVENT_DESTROY$1, EVENT_AFTER_DESTROY$1, function () {
        var canRemoveHash = false;

        if (element.hasAttribute('id') && element.getAttribute('id') == hash.replace('#', '')) {
          canRemoveHash = true;
        }

        if (_this3.UIRoot) {
          element.classList.remove('active');
          element.parentNode.insertBefore(_this3.UIRoot, element.nextSibling);
          FwDom.moveContents(_this3.UIContentBlock, element);

          _this3.UIRoot.parentNode.removeChild(_this3.UIRoot);
        }

        var removeBodClass = true;

        if (document.getElementById(_this3.UIId) && removeBodClass == true) {
          removeBodClass = false;
        }

        if (removeBodClass) {
          document.body.classList.remove(UIBodyClass.noScroll);
        }

        element.classList.remove(ACTIVATED_CLASS$3);
        canRemoveHash && UIChangeHash('');
        _classPrivateFieldLooseBase(_this3, _current)[_current] = {
          element: false,
          args: false,
          UI: false,
          UIContentBlock: false
        };
      }, element);
    };

    _proto.update = function update(elem) {
      var _this4 = this;

      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _classPrivateFieldLooseBase(this, _current)[_current] ? _classPrivateFieldLooseBase(this, _current)[_current].element : false;

      if (!element) {
        return;
      }

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_UPDATE, EVENT_UPDATE, EVENT_AFTER_UPDATE, function () {
        // buttons
        // resize
        var currentWidth = _this4.UIRoot.querySelector("." + UIPrefix(COMPONENT_CLASS$5) + "-popup").clientWidth;

        var resizeBtn = _this4.UIRoot.querySelectorAll("*[data-toggle-" + _this4.modeToggle + "-resize]");

        if (resizeBtn && currentWidth < parseInt(_this4.args.width)) {
          resizeBtn.forEach(function (butt) {
            butt.classList.add('disabled');
          });
        } else {
          resizeBtn.forEach(function (butt) {
            butt.classList.remove('disabled');
          });
        }
      }, element);
    };

    _proto.resize = function resize(width) {
      var _this5 = this;

      if (!_classPrivateFieldLooseBase(this, _current)[_current]) {
        return;
      }

      var args = this.args || _classPrivateFieldLooseBase(this, _current)[_current].args || {};
      width = width || args.width || null;

      if (this.UIRoot && parseInt(width) >= parseInt(args.width)) {
        _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_RESIZE, EVENT_RESIZE, EVENT_AFTER_RESIZE, function () {
          //all
          if (_this5.UIRoot.querySelector("." + UIPrefix(COMPONENT_CLASS$5) + "-popup")) {
            _this5.UIRoot.querySelector("." + UIPrefix(COMPONENT_CLASS$5) + "-popup").style.width = width;
          } //bboard


          if (_this5.UIRoot.querySelector("." + UIPrefix(COMPONENT_CLASS$5) + "-button-wrapper")) {
            _this5.UIRoot.querySelector("." + UIPrefix(COMPONENT_CLASS$5) + "-button-wrapper").style.width = width;
          }
        }, _classPrivateFieldLooseBase(this, _current)[_current].element);
      }
    };

    Modal.handleResize = function handleResize(mode) {
      return function (e) {
        VALID_MODAL_MODES.forEach(function (mode) {
          var modal = new Modal(Modal.current(mode).element, null, Modal.current(mode).args);
          modal.resize();
          modal.update();
        });
      };
    };

    Modal.handleHash = function handleHash() {
      return function (e) {
        if (Settings.get('initializeModal')) {
          var modal = new Modal();
          modal.create();
        }
      };
    };

    Modal.handleOpen = function handleOpen(mode) {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var modal = new Modal(UIToggled(_classPrivateFieldLooseBase(Modal, _modeToggle)[_modeToggle](mode), e.target, "." + COMPONENT_CLASS$5 + "." + _classPrivateFieldLooseBase(Modal, _modeClass)[_modeClass](mode)), e.target);
          modal.create();
        }
      };
    };

    Modal.handleClose = function handleClose(mode) {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var modal = new Modal(UIToggled(_classPrivateFieldLooseBase(Modal, _modeToggle)[_modeToggle](mode), e.target, "." + COMPONENT_CLASS$5 + "." + _classPrivateFieldLooseBase(Modal, _modeClass)[_modeClass](mode)), e.target);
          modal.destroy();
        }
      };
    };

    Modal.initListeners = function initListeners() {
      VALID_MODAL_MODES.forEach(function (mode) {
        var modeToggle = _classPrivateFieldLooseBase(Modal, _modeToggle)[_modeToggle](mode);

        FwEvent.addListener(document.documentElement, EVENT_CLICK$3, "*[data-toggle-" + modeToggle + "], *[data-toggle-" + modeToggle + "-open]", Modal.handleOpen(mode));
        FwEvent.addListener(document.documentElement, EVENT_CLICK$3, "*[data-toggle-" + modeToggle + "-close]", Modal.handleClose(mode));
      });
      FwEvent.addListener(null, EVENT_HASHCHANGE, window, Modal.handleHash());
      Initiator.Q.on_ready = Modal.handleHash();
      Initiator.Q.on_resize = Modal.handleResize();
    };

    Modal.destroyListeners = function destroyListeners() {
      VALID_MODAL_MODES.forEach(function (mode) {
        _classPrivateFieldLooseBase(Modal, _modeToggle)[_modeToggle](mode);

        FwEvent.removeListener(document.documentElement, EVENT_CLICK$3, Modal.handleOpen(mode));
        FwEvent.removeListener(document.documentElement, EVENT_CLICK$3, Modal.handleClose(mode));
      });
      FwEvent.removeListener(window, EVENT_HASHCHANGE, Modal.handleHash());
    };

    _createClass(Modal, [{
      key: "instance",
      get: function get() {
        return _classPrivateFieldLooseBase(this, _current)[_current];
      }
    }, {
      key: "mode",
      get: function get() {
        return this._mode;
      }
    }, {
      key: "UIId",
      get: function get() {
        return Settings.get('prefix') + "-" + NAME$5 + "-" + this.mode;
      }
    }, {
      key: "UIContentBlock",
      get: function get() {
        return this.UIRoot.querySelector("." + UIPrefix(COMPONENT_CLASS$5) + "-popup-content");
      }
    }, {
      key: "UIRoot",
      get: function get() {
        return document.getElementById(this.UIId);
      }
    }, {
      key: "UIElId",
      get: function get() {
        return _FwComponent.prototype.UIEl.call(this).getAttribute('id');
      }
    }, {
      key: "modeToggle",
      get: function get() {
        return _classPrivateFieldLooseBase(Modal, _modeToggle)[_modeToggle](this.mode);
      }
    }, {
      key: "modeClass",
      get: function get() {
        return _classPrivateFieldLooseBase(Modal, _modeClass)[_modeClass](this.mode);
      }
    }, {
      key: "UiModeClass",
      get: function get() {
        return " " + UIPrefix(COMPONENT_CLASS$5) + "-mode-" + this.mode;
      }
    }, {
      key: "args",
      get: function get() {
        return FwComponent._parseArgs({
          changeHash: this.triggerer && this.triggerer.hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-change-hash") ? this.triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-change-hash") : _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-change-hash") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-change-hash") : this._customArgs.changeHash,
          title: this.triggerer && this.triggerer.hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-title") ? this.triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-title") : _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-title") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-title") : this._customArgs.title,
          disableOverlay: this.triggerer && this.triggerer.hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-disable-overlay") ? this.triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-disable-overlay") : _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-disable-overlay") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-disable-overlay") : this._customArgs.disableOverlay,
          width: this.triggerer && this.triggerer.hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-width") ? this.triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-width") : _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-width") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-width") : this._customArgs.width,
          callback: this.triggerer && this.triggerer.hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-callback") ? this.triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-callback") : _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-callback") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-callback") : this._customArgs.callback,
          classes: this.triggerer && this.triggerer.hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-classes") ? this.triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-classes") : _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-classes") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-classes") : this._customArgs.callback,
          close: this.triggerer && this.triggerer.hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-close") ? this.triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-close") : _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-close") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-close") : this._customArgs.close,
          closeClasses: this.triggerer && this.triggerer.hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-close-classes") ? this.triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-close-classes") : _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-close-classes") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-close-classes") : this._customArgs.closeClasses,
          //@TODO
          fullscreen: this.triggerer && this.triggerer.hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-fullscreen") ? this.triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-fullscreen") : _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-fullscreen") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-fullscreen") : this._customArgs.fullscreen,
          fullscreenClasses: this.triggerer && this.triggerer.hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-fullscreen-classes") ? this.triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-fullscreen-classes") : _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-fullscreen-classes") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-fullscreen-classes") : this._customArgs.fullscreenClasses,
          //board shits
          align: this.triggerer && this.triggerer.hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-align") ? this.triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-align") : _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-align") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-align") : this._customArgs.align,
          resize: this.triggerer && this.triggerer.hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-resize") ? this.triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-resize") : _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-resize") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-resize") : this._customArgs.resize,
          resizeClasses: this.triggerer && this.triggerer.hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-resize-classes") ? this.triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-resize-classes") : _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-resize-classes") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-resize-classes") : this._customArgs.resizeClasses //custom specific
          // customMarkup: //halat weit

        }, Modal.configDefaults(this.mode));
      }
    }, {
      key: "_markup",
      get: function get() {
        var html = "<div\n\t\t\t\tclass=\"\n          " + this.UiModeClass + "\n\t\t\t\t\t" + UIPrefix(COMPONENT_CLASS$5) + "-wrapper\"\n\t\t\t>"; //overlay

        html += "<div\n\t\t\t\t\t\tclass=\"\n              " + this.UiModeClass + "\n\t\t\t\t\t\t\t" + UIPrefix(COMPONENT_CLASS$5) + "-close-overlay\"\n\t\t\t\t\t\t\t" + (this.args.disableOverlay == false ? "data-toggle-" + this.modeToggle + "-close" : '') + "\n\t\t\t\t\t></div>";

        switch (this.mode) {
          case 'board':
            html += "<div class=\"" + this.UiModeClass + " " + UIPrefix(COMPONENT_CLASS$5) + "-popup\">";
            html += "<div class=\"" + this.UiModeClass + " " + UIPrefix(COMPONENT_CLASS$5) + "-button-wrapper\">";

            if (this.args.close !== false) {
              html += "<a href=\"#\"\n                      class=\"\n                        " + this.UiModeClass + "\n                        " + UIPrefix(COMPONENT_CLASS$5) + "-close\n                        " + UIPrefix(COMPONENT_CLASS$5) + "-button\n                        " + (this.args.closeClasses ? this.args.closeClasses : UIPrefix(COMPONENT_CLASS$5) + "-button-default") + "\"\n                      data-toggle-" + this.modeToggle + "-close\n                    >\n                      <i class=\"symbol symbol-close \"></i>\n                    </a>";
            }

            if (this.args.resize !== false && this.args.width) {
              html += "<a\n                      class=\"\n                        " + this.UiModeClass + "\n                        " + UIPrefix(COMPONENT_CLASS$5) + "-resize\n                        " + UIPrefix(COMPONENT_CLASS$5) + "-button\n                        " + (this.args.resizeClasses ? this.args.resizeClasses : UIPrefix(COMPONENT_CLASS$5) + "-button-default") + "\"\n                      data-toggle-" + this.modeToggle + "-resize\n                    >\n                      <i class=\"symbol symbol-arrow-tail-left \"></i>\n                      <i class=\"symbol symbol-arrow-tail-right \"></i>\n                    </a>";
            }

            html += "</div>";

            if (this.args.title) {
              html += "<div class=\"" + this.UiModeClass + " " + UIPrefix(COMPONENT_CLASS$5) + "-header\">\n\t\t\t\t\t\t\t\t\t\t\t<h1 class=\"" + this.UiModeClass + " " + UIPrefix(COMPONENT_CLASS$5) + "-title\">" + decodeURIComponent(this.args.title) + "</h1>\n\t\t\t\t\t\t\t\t\t\t</div>";
            }

            html += "<div class=\"" + this.UiModeClass + " " + UIPrefix(COMPONENT_CLASS$5) + "-popup-content\"></div>";
            html += "</div>";
            break;

          default:
            html += "<div class=\"" + this.UiModeClass + " " + UIPrefix(COMPONENT_CLASS$5) + "-popup\">";

            if (this.args.title) {
              html += "<div class=\"" + this.UiModeClass + " " + UIPrefix(COMPONENT_CLASS$5) + "-header\">\n\t\t\t\t\t\t\t\t\t\t\t<h1 class=\"" + this.UiModeClass + " " + UIPrefix(COMPONENT_CLASS$5) + "-title\">" + decodeURIComponent(this.args.title) + "</h1>\n\t\t\t\t\t\t\t\t\t\t</div>";
            }

            if (this.args.close !== false) {
              html += "<a href=\"#\"\n\t\t\t\t\t\t\t\t\t\t\tclass=\"" + this.UiModeClass + " " + UIPrefix(COMPONENT_CLASS$5) + "-close " + this.args.closeClasses + "\"\n\t\t\t\t\t\t\t\t\t\t\tdata-toggle-" + this.modeToggle + "-close\n\t\t\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"symbol symbol-close\"></i>\n\t\t\t\t\t\t\t\t\t\t</a>";
            }

            html += "<div class=\"" + this.UiModeClass + " " + UIPrefix(COMPONENT_CLASS$5) + "-popup-content\"></div>";
            html += "</div>";
            break;
        }

        html += '</div>';
        return html;
      }
    }], [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$5;
      }
    }]);

    return Modal;
  }(FwComponent);

  function _get_current() {
    return CURRENT_MODAL_INSTANCE[this.mode];
  }

  function _set_current(obj) {
    CURRENT_MODAL_INSTANCE[this.mode].element = obj.element;
    CURRENT_MODAL_INSTANCE[this.mode].args = obj.args;
    CURRENT_MODAL_INSTANCE[this.mode].UI = obj.UI;
    CURRENT_MODAL_INSTANCE[this.mode].UIContentBlock = obj.UIContentBlock;
  }

  function _modeToggle2(mode) {
    return FwString.ToDashed(TOGGLE_MODE_PREFIX + "-" + mode);
  }

  function _modeClass2(mode) {
    return FwString.ToDashed(TOGGLE_MODE_PREFIX + "-" + mode);
  }

  Object.defineProperty(Modal, _modeClass, {
    value: _modeClass2
  });
  Object.defineProperty(Modal, _modeToggle, {
    value: _modeToggle2
  });
  Modal.initListeners();

  var NAME$4 = 'moduleGrid';
  var COMPONENT_CLASS$4 = "" + FwString.ToDashed(NAME$4);
  var COMPONENT_CHILDREN_CLASS$1 = "module";
  var DATA_KEY$4 = Settings.get('prefix') + "_" + NAME$4;
  var EVENT_KEY$4 = "_" + DATA_KEY$4;
  var EVENT_BEFORE_INIT$1 = "before_init" + EVENT_KEY$4;
  var EVENT_INIT$1 = "init" + EVENT_KEY$4;
  var EVENT_AFTER_INIT$1 = "after_init" + EVENT_KEY$4;
  var EVENT_BEFORE_RENDER = "before_render" + EVENT_KEY$4;
  var EVENT_RENDER = "render" + EVENT_KEY$4;
  var EVENT_AFTER_RENDER = "after_render" + EVENT_KEY$4;
  var EVENT_BEFORE_RENDER_GRID = "before_render_grid" + EVENT_KEY$4;
  var EVENT_RENDER_GRID = "render_grid" + EVENT_KEY$4;
  var EVENT_AFTER_RENDER_GRID = "after_render_grid" + EVENT_KEY$4;
  var EVENT_BEFORE_RENDER_BLOCK = "before_render_block" + EVENT_KEY$4;
  var EVENT_RENDER_BLOCK = "render_block" + EVENT_KEY$4;
  var EVENT_AFTER_RENDER_BLOCK = "after_render_block" + EVENT_KEY$4;
  var PROPERTIES_WRAPPER = ['grid-template-columns', 'grid-template-rows', 'grid-template-areas', 'grid-column-start', 'grid-template-end', 'grid-template', 'grid-column-gap', 'grid-row-gap', 'justify-items', 'align-items', 'justify-content', 'align-content', 'place-content', 'grid-auto-columns', 'grid-auto-rows', 'grid-auto-flow', 'grid'];
  var PROPERTIES_CHILDREN = ['grid-area', 'grid-column', 'grid-row', 'grid-column-start', 'grid-column-end', 'grid-row-start', 'grid-row-end', 'justify-self', 'align-self', 'place-self'];

  var ModuleGrid = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(ModuleGrid, _FwComponent);

    function ModuleGrid() {
      return _FwComponent.apply(this, arguments) || this;
    }

    var _proto = ModuleGrid.prototype;

    _proto._loopProps = function _loopProps(block, props) {
      props.forEach(function (prop) {
        var propsSet = false,
            propSetBr = false,
            smallestStyledBr = false; //check for breakpointz first

        FwArrayay.reverse(BrTag).forEach(function (br) {
          if (block.hasAttribute("data-" + prop + "-" + br) && !propsSet) {
            smallestStyledBr = br;

            if (ValidateBr(br, 'above')) {
              block.style[FwString.ToCamelCase(prop)] = block.getAttribute("data-" + prop + "-" + br);
              propsSet = true;
              propSetBr = true;
            }
          }
        });

        if (block.hasAttribute("data-" + prop) && !propsSet) {
          //check for all breakpoint
          if (!propsSet && !propSetBr) {
            block.style[FwString.ToCamelCase(prop)] = block.getAttribute("data-" + prop);
            propsSet = true;
          }
        } else {
          if (block.style[FwString.ToCamelCase(prop)] !== null && smallestStyledBr && !ValidateBr(smallestStyledBr, 'above')) {
            block.style[FwString.ToCamelCase(prop)] = null;
          }
        }
      });
    };

    _proto.renderGrid = function renderGrid(elem) {
      var _this = this;

      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_RENDER_GRID, EVENT_RENDER_GRID, EVENT_AFTER_RENDER_GRID, function () {
        _this._loopProps(element, PROPERTIES_WRAPPER);
      }, element);
    };

    _proto.renderBlocks = function renderBlocks() {
      var _this2 = this;

      this.UIChildren.forEach(function (child) {
        _FwComponent.prototype.runCycle.call(_this2, EVENT_BEFORE_RENDER_BLOCK, EVENT_RENDER_BLOCK, EVENT_AFTER_RENDER_BLOCK, function () {
          _this2._loopProps(child, PROPERTIES_CHILDREN);
        }, child);
      });
    };

    _proto.render = function render(elem) {
      var _this3 = this;

      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_RENDER, EVENT_RENDER, EVENT_AFTER_RENDER, function () {
        _this3.renderGrid(element);

        _this3.renderBlocks();
      }, element);
    };

    ModuleGrid.handleUniversal = function handleUniversal() {
      return function () {
        new ModuleGrid().runCycle(EVENT_BEFORE_INIT$1, EVENT_INIT$1, EVENT_AFTER_INIT$1, function () {
          var grids = document.querySelectorAll("." + COMPONENT_CLASS$4);
          grids.forEach(function (grid) {
            var moduleGrid = new ModuleGrid(grid);
            moduleGrid.render();
          });
        }, document);
      };
    };

    ModuleGrid.initListeners = function initListeners() {
      Initiator.Q.on_ready = ModuleGrid.handleUniversal();
      Initiator.Q.on_resize = ModuleGrid.handleUniversal();
    };

    _createClass(ModuleGrid, [{
      key: "UIChildren",
      get: function get() {
        return _FwComponent.prototype.UIEl.call(this).querySelectorAll("." + COMPONENT_CHILDREN_CLASS$1);
      }
    }], [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$4;
      }
    }]);

    return ModuleGrid;
  }(FwComponent);
  ModuleGrid.initListeners();

  var NAME$3 = 'switch';
  var TOGGLE_MODE = "" + NAME$3;
  var TOGGLE_MODE_ON = TOGGLE_MODE + "-on";
  var TOGGLE_MODE_OFF = TOGGLE_MODE + "-off";
  var COMPONENT_CLASS$3 = "" + FwString.ToDashed(NAME$3);
  var COMPONENT_CLASS_STATUS_OFF = COMPONENT_CLASS$3 + "-to-off";
  var COMPONENT_CLASS_STATUS_ON = COMPONENT_CLASS$3 + "-to-on";
  var COMPONENT_CLASS_IDLE = COMPONENT_CLASS$3 + "-idle";
  var DATA_KEY$3 = Settings.get('prefix') + "_" + NAME$3;
  var EVENT_KEY$3 = "_" + DATA_KEY$3;
  var EVENT_CLICK$2 = "click" + EVENT_KEY$3;
  var EVENT_CLICK_PURGE$1 = "click" + EVENT_KEY$3 + "_purge";
  var EVENT_BEFORE_INIT = "before_init" + EVENT_KEY$3;
  var EVENT_INIT = "init" + EVENT_KEY$3;
  var EVENT_AFTER_INIT = "after_init" + EVENT_KEY$3;
  var EVENT_BEFORE_ON = "before_on" + EVENT_KEY$3;
  var EVENT_ON = "on" + EVENT_KEY$3;
  var EVENT_AFTER_ON = "after_on" + EVENT_KEY$3;
  var EVENT_BEFORE_OFF = "before_off" + EVENT_KEY$3;
  var EVENT_OFF = "off" + EVENT_KEY$3;
  var EVENT_AFTER_OFF = "after_off" + EVENT_KEY$3;

  var Switch = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(Switch, _FwComponent);

    function Switch(element) {
      element = element || UIToggled(TOGGLE_MODE) || false;
      return _FwComponent.call(this, element) || this;
    }

    var _proto = Switch.prototype;

    _proto.isOff = function isOff(elem) {
      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);
      return element.classList.contains(COMPONENT_CLASS_STATUS_OFF);
    };

    _proto.isOn = function isOn(elem) {
      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);
      return element.classList.contains(COMPONENT_CLASS_STATUS_ON) || !this.isOff();
    };

    _proto.isIdle = function isIdle(elem) {
      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);
      element.classList.contains(COMPONENT_CLASS_IDLE);
    } //catch bois that re not off
    ;

    _proto.init = function init(elem) {
      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);

      if (!element.classList.contains(COMPONENT_CLASS_STATUS_ON) && !element.classList.contains(COMPONENT_CLASS_STATUS_OFF)) {
        element.classList.add(COMPONENT_CLASS_STATUS_OFF);
      }
    };

    _proto.turnOff = function turnOff(elem) {
      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);

      if (this.isOn()) {
        _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_OFF, EVENT_OFF, EVENT_AFTER_OFF, function () {
          element.classList.remove(COMPONENT_CLASS_STATUS_ON);
          element.classList.add(COMPONENT_CLASS_STATUS_OFF);
        }, element);
      }
    };

    _proto.turnOn = function turnOn(elem) {
      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);

      if (this.isOff()) {
        _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_ON, EVENT_ON, EVENT_AFTER_ON, function () {
          element.classList.remove(COMPONENT_CLASS_STATUS_OFF);
          element.classList.add(COMPONENT_CLASS_STATUS_ON);
        }, element);
      }
    };

    _proto.toggle = function toggle(elem) {
      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);

      if (this.isOff()) {
        this.turnOn(element);
      } else {
        this.turnOff(element);
      }
    };

    Switch.purge = function purge(exempted) {
      UIPurge(exempted, "." + COMPONENT_CLASS$3 + ":not(." + COMPONENT_CLASS_IDLE + ")", function (elem) {
        new Switch(elem).turnOff();
      });
    };

    Switch.handleToggleOn = function handleToggleOn() {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var switchElement = new Switch(UIToggled(TOGGLE_MODE, e.target));
          Switch.purge(UIToggled(TOGGLE_MODE, e.target));
          switchElement.turnOn();
        }
      };
    };

    Switch.handleToggleOff = function handleToggleOff() {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var switchElement = new Switch(UIToggled(TOGGLE_MODE, e.target));
          switchElement.turnOff();
        }
      };
    };

    Switch.handleToggle = function handleToggle() {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var switchElement = new Switch(UIToggled(TOGGLE_MODE, e.target));
          switchElement.toggle();
        }
      };
    };

    Switch.handleInit = function handleInit() {
      return function () {
        new Switch().runCycle(EVENT_BEFORE_INIT, EVENT_INIT, EVENT_AFTER_INIT, function () {
          UIPurge(false, "." + COMPONENT_CLASS$3, function (elem) {
            new Switch(elem).init();
          });
        }, document);
      };
    };

    Switch.handleUniversalPurge = function handleUniversalPurge() {
      return function (e) {
        if (FwComponent.isDisabled(e.target)) {
          e.preventDefault();
        } else if (!FwComponent.isDynamic(e.target)) {
          if (!e.target.closest("[data-toggle-" + TOGGLE_MODE_ON + "]") && !e.target.closest("[data-toggle-" + TOGGLE_MODE_OFF + "]") && !e.target.closest("[data-toggle-" + TOGGLE_MODE + "]") && !e.target.closest("." + COMPONENT_CLASS$3)) {
            Switch.purge();
          }
        }
      };
    };

    Switch.initListeners = function initListeners() {
      FwEvent.addListener(document.documentElement, EVENT_CLICK$2, "*[data-toggle-" + TOGGLE_MODE_ON + "]", Switch.handleToggleOn());
      FwEvent.addListener(document.documentElement, EVENT_CLICK$2, "*[data-toggle-" + TOGGLE_MODE_OFF + "]", Switch.handleToggleOff());
      FwEvent.addListener(document.documentElement, EVENT_CLICK$2, "*[data-toggle-" + TOGGLE_MODE + "]", Switch.handleToggle());
      FwEvent.addListener(document.documentElement, EVENT_CLICK_PURGE$1, "*", Switch.handleUniversalPurge());
      Initiator.Q.on_ready = Switch.handleInit();
    };

    Switch.destroyListeners = function destroyListeners() {
      FwEvent.removeListener(document.documentElement, EVENT_CLICK$2, Switch.handleToggleOff());
      FwEvent.removeListener(document.documentElement, EVENT_CLICK$2, Switch.handleToggleOn());
      FwEvent.removeListener(document.documentElement, EVENT_CLICK$2, Switch.handleToggle());
      FwEvent.removeListener(document.documentElement, EVENT_CLICK_PURGE$1, Switch.handleUniversalPurge());
    };

    _createClass(Switch, null, [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$3;
      }
    }]);

    return Switch;
  }(FwComponent);
  Switch.initListeners();

  var NAME$2 = 'tabs';
  var COMPONENT_CLASS$2 = "" + FwString.ToDashed(NAME$2);
  var COMPONENT_CHILDREN_CLASS = 'tab';
  var COMPONENT_CHILDREN_TAG = 'li';
  var ACTIVATED_CLASS$2 = "active";
  var DATA_KEY$2 = Settings.get('prefix') + "_" + NAME$2;
  var EVENT_KEY$2 = "_" + DATA_KEY$2;
  var EVENT_CLICK$1 = "click" + EVENT_KEY$2;
  var EVENT_BEFORE_ACTIVATE$1 = "before_activate" + EVENT_KEY$2;
  var EVENT_ACTIVATE$1 = "activate" + EVENT_KEY$2;
  var EVENT_AFTER_ACTIVATE$1 = "after_activate" + EVENT_KEY$2;

  var Tabs = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(Tabs, _FwComponent);

    function Tabs() {
      return _FwComponent.apply(this, arguments) || this;
    }

    var _proto = Tabs.prototype;

    _proto.UIChildren = function UIChildren() {
      return _FwComponent.prototype.UIEl.call(this).querySelectorAll("." + COMPONENT_CHILDREN_CLASS + ", " + COMPONENT_CHILDREN_TAG);
    };

    _proto.UIActive = function UIActive() {
      return _FwComponent.prototype.UIEl.call(this).querySelector("." + COMPONENT_CHILDREN_CLASS + "." + ACTIVATED_CLASS$2 + ", " + COMPONENT_CHILDREN_TAG + "." + ACTIVATED_CLASS$2);
    };

    _proto.target = function target(element) {
      if (element) return new FwDom(element).closest("." + COMPONENT_CHILDREN_CLASS);
    };

    _proto.activate = function activate(target, elem) {
      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);
      var theTab = this.target(target);

      if (!theTab) {
        return false;
      }

      if (!theTab.classList.contains("" + ACTIVATED_CLASS$2)) {
        _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_ACTIVATE$1, EVENT_ACTIVATE$1, EVENT_AFTER_ACTIVATE$1, function () {
          var triggererSiblings = FwDom.getSiblings(theTab);
          triggererSiblings.filter(function (sibling) {
            return sibling.matches("." + COMPONENT_CHILDREN_CLASS) || sibling.matches("" + COMPONENT_CHILDREN_TAG);
          }).forEach(function (sibling) {
            sibling.classList.remove("" + ACTIVATED_CLASS$2);
          });
          theTab.classList.add("" + ACTIVATED_CLASS$2);
        }, element);
      }
    };

    Tabs.handleClick = function handleClick() {
      return function (e) {
        if (FwComponent.isDisabled(e.target)) {
          e.preventDefault();
        } else {
          var tabs = new Tabs(e.target.closest('.tabs'));
          tabs.activate(e.target);
        }
      };
    };

    Tabs.initListeners = function initListeners() {
      FwEvent.addListener(document.documentElement, EVENT_CLICK$1, "." + COMPONENT_CLASS$2 + " > " + COMPONENT_CHILDREN_TAG + " > *, ." + COMPONENT_CHILDREN_CLASS + ", ." + COMPONENT_CHILDREN_CLASS + " > *", Tabs.handleClick());
    };

    Tabs.destroyListeners = function destroyListeners() {
      FwEvent.removeListener(document.documentElement, EVENT_CLICK$1, Tabs.handleClick());
    };

    _createClass(Tabs, null, [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$2;
      }
    }]);

    return Tabs;
  }(FwComponent);
  Tabs.initListeners();

  var NAME$1 = 'tooltip';
  var TOGGLE_MODE_CLICK = NAME$1 + "-click";
  var TOGGLE_MODE_HOVER = NAME$1 + "-hover";
  var ARG_ATTRIBUTE_NAME = NAME$1;
  var COMPONENT_CLASS$1 = "" + FwString.ToDashed(NAME$1);
  var COMPONENT_CUSTOM_WIDTH_CLASS = COMPONENT_CLASS$1 + "-has-custom-width";
  var COMPONENT_PURGER_CLASS = COMPONENT_CLASS$1 + "-purger";
  var COMPONENT_ALLOW_INTERACTION_CLASS = COMPONENT_CLASS$1 + "-allow-interaction";
  var ACTIVATED_CLASS$1 = "active";
  var DATA_KEY$1 = Settings.get('prefix') + "_" + NAME$1;
  var EVENT_KEY$1 = "_" + DATA_KEY$1;
  var EVENT_CLICK = "click" + EVENT_KEY$1;
  var EVENT_CLICK_PURGE = "click" + EVENT_KEY$1 + "_purge";
  var EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY$1;
  var EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY$1;
  var EVENT_BEFORE_CREATE = "before_create" + EVENT_KEY$1;
  var EVENT_CREATE = "create" + EVENT_KEY$1;
  var EVENT_AFTER_CREATE = "after_create" + EVENT_KEY$1;
  var EVENT_BEFORE_DESTROY = "before_destroy" + EVENT_KEY$1;
  var EVENT_DESTROY = "destroy" + EVENT_KEY$1;
  var EVENT_AFTER_DESTROY = "after_destroy" + EVENT_KEY$1;
  var EVENT_BEFORE_POSITION = "before_position" + EVENT_KEY$1;
  var EVENT_POSITION = "position" + EVENT_KEY$1;
  var EVENT_AFTER_POSITION = "after_position" + EVENT_KEY$1;
  var CURRENT_TOOLTIP_INSTANCE = {
    UI: null,
    element: null,
    args: null
  };

  var Tooltip = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(Tooltip, _FwComponent);

    function Tooltip(triggerElement, args) {
      triggerElement = triggerElement || false;
      return _FwComponent.call(this, triggerElement, {
        _customArgs: args ? args : triggerElement && triggerElement.__customArgs ? triggerElement.__customArgs : {}
      }) || this;
    }

    var _proto = Tooltip.prototype;

    _proto.dispose = function dispose() {
      _FwComponent.prototype.dispose.call(this);

      this._customArgs = null;
    };

    Tooltip.configDefaults = function configDefaults() {
      return {
        placement: 'left',
        badge: false,
        badgeBg: 'primary',
        badgeSize: '',
        classes: '',
        inverse: false,
        size: '',
        content: '<em class="color-neutral tooltip-placeholder">No info...</em>',
        centerX: false,
        centerY: false,
        x: false,
        y: false,
        width: null,
        allowInteraction: false
      };
    };

    _proto._markup = function _markup() {
      var html = '';

      if (this.args.badge) {
        html += "<span class=\"badge " + NAME$1 + "-badge";

        if (this.args.badgeSize == 'small' || this.args.badgeSize == 'large') {
          html += " badge-" + this.args.badgeSize;
        }

        if (Palette.includes(this.args.badgeBg)) {
          html += " badge-" + this.args.badgeBg;
        } else {
          html += "\" style=\"background-color:" + this.args.badgeBg + ";";
        }

        html += "\"></span>";
      }

      html += "<div class=\"" + NAME$1 + "-content " + this.args.classes + "\">" + this.args.content + "</div></div>";
      return html;
    };

    _proto.create = function create(elem) {
      var _this = this;

      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);

      if (!element) {
        return;
      }

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_CREATE, EVENT_CREATE, EVENT_AFTER_CREATE, function () {
        _this.destroy();

        var tip = document.createElement('div');
        document.body.appendChild(tip);
        tip.className = COMPONENT_CLASS$1 + " " + COMPONENT_CLASS$1 + "-" + _this.args.placement + "\n          " + (_this.args.width ? COMPONENT_CUSTOM_WIDTH_CLASS : '') + "\n          " + (_this.args.allowInteraction ? COMPONENT_ALLOW_INTERACTION_CLASS : '') + "\n          " + (_this.args.size ? COMPONENT_CLASS$1 + "-" + _this.args.size : '') + "\n          " + (_this.args.inverse ? 'theme-inverse' : '');

        if (_this.args.width) {
          tip.style.width = _this.args.width;
        }

        Tooltip.current = {
          UI: tip,
          args: _this.args,
          element: element
        };
        tip.innerHTML += _this._markup();

        if (_this.args.width) {
          _this.width = _this.args.width;
        }

        tip.classList.add(ACTIVATED_CLASS$1);

        _this.position();
      }, element);
    };

    _proto.destroy = function destroy() {
      var element = Tooltip.current.element;
      var tip = Tooltip.current.UI;

      if (!element || !tip) {
        return;
      }

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_DESTROY, EVENT_DESTROY, EVENT_AFTER_DESTROY, function () {
        tip.parentNode.removeChild(tip);
        Tooltip.current = {
          UI: false,
          args: false,
          element: false
        };
      }, element);
    };

    _proto.position = function position(posX, posY) {
      var _this2 = this;

      var element = _FwComponent.prototype.UIEl.call(this);

      if (!Tooltip.current.UI) {
        return;
      }

      var toolTip = Tooltip.current.UI;

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_POSITION, EVENT_POSITION, EVENT_AFTER_POSITION, function () {
        posX = posX || _this2.elementOrigin.x;
        posY = posY || _this2.elementOrigin.y;
        toolTip.style.left = posX + _this2.UIOffset.x + 'px';
        toolTip.style.top = posY + _this2.UIOffset.y + 'px';
      }, element);
    };

    Tooltip.handleToggleClickOn = function handleToggleClickOn() {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var tooltip = new Tooltip(e.target);
          tooltip.create();
        }
      };
    };

    Tooltip.handleUniversalPurge = function handleUniversalPurge() {
      return function (e) {
        if (FwComponent.isDisabled(e.target)) {
          e.preventDefault();
        } else if (!FwComponent.isDynamic(e.target)) {
          if (!e.target.closest("[data-toggle-" + TOGGLE_MODE_CLICK + "]") && !e.target.closest("[data-toggle-" + TOGGLE_MODE_HOVER + "]") // && !e.target.closest(`.${COMPONENT_CLASS}.${COMPONENT_ALLOW_INTERACTION_CLASS}`)
          ) {
              var tooltip = new Tooltip();
              tooltip.destroy();
            }
        }
      };
    };

    Tooltip.handleToggleHoverOn = function handleToggleHoverOn() {
      return function (e) {
        if (FwComponent.isDisabled(e.target)) {
          e.preventDefault();
        } else {
          var tooltip = new Tooltip(e.target);
          tooltip.create();
        }
      };
    };

    Tooltip.handleToggleHoverOff = function handleToggleHoverOff() {
      return function (e) {
        var tooltip = new Tooltip();
        tooltip.destroy();
      };
    };

    Tooltip.handleResizeScroll = function handleResizeScroll() {
      return function () {
        if (Tooltip.current.element) {
          var tooltip = new Tooltip(Tooltip.current.element);
          tooltip.position();
        }
      };
    };

    Tooltip.initListeners = function initListeners() {
      FwEvent.addListener(document.documentElement, EVENT_MOUSEENTER, "*[data-toggle-" + TOGGLE_MODE_HOVER + "]", Tooltip.handleToggleHoverOn());
      FwEvent.addListener(document.documentElement, EVENT_MOUSELEAVE, "*[data-toggle-" + TOGGLE_MODE_HOVER + "]", Tooltip.handleToggleHoverOff());
      FwEvent.addListener(document.documentElement, EVENT_CLICK, "*[data-toggle-" + TOGGLE_MODE_CLICK + "]", Tooltip.handleToggleClickOn());
      FwEvent.addListener(document.documentElement, EVENT_CLICK_PURGE, "*, ." + COMPONENT_PURGER_CLASS, Tooltip.handleUniversalPurge());
      Initiator.Q.on_ready = Tooltip.handleResizeScroll();
      Initiator.Q.on_resize = Tooltip.handleResizeScroll();
    };

    Tooltip.destroyListeners = function destroyListeners() {
      FwEvent.removeListener(document.documentElement, EVENT_MOUSEENTER, Tooltip.handleToggleHoverOn());
      FwEvent.removeListener(document.documentElement, EVENT_MOUSELEAVE, Tooltip.handleToggleHoverOff());
      FwEvent.removeListener(document.documentElement, EVENT_CLICK, Tooltip.handleToggleClickOn());
      FwEvent.removeListener(document.documentElement, EVENT_CLICK_PURGE, Tooltip.handleUniversalPurge());
    };

    _createClass(Tooltip, [{
      key: "UICurrent",
      get: function get() {
        return Tooltip.current.UI;
      }
    }, {
      key: "args",
      get: function get() {
        return FwComponent._parseArgs({
          placement: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME + "-placement") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-placement") : this._customArgs.placement,
          badge: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME + "-badge") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-badge") : this._customArgs.badge,
          badgeBg: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME + "-badge-background") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-badge-background") : this._customArgs.badgeBg,
          badgeSize: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME + "-badge-size") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-badge-size") : this._customArgs.badgeSize,
          classes: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME + "-classes") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-classes") : this._customArgs.classes,
          content: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME + "-content") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-content") : this._customArgs.content,
          inverse: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME + "-inverse") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-inverse") : this._customArgs.inverse,
          size: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME + "-size") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-size") : this._customArgs.size,
          centerX: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME + "-center-x") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-center-x") : this._customArgs.centerX,
          centerY: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME + "-center-y") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-center-y") : this._customArgs.centerY,
          x: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME + "-x") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-x") : this._customArgs.x,
          y: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME + "-y") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-y") : this._customArgs.y,
          width: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME + "-width") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-width") : this._customArgs.width,
          allowInteraction: _FwComponent.prototype.UIEl.call(this).hasAttribute("data-" + ARG_ATTRIBUTE_NAME + "-allow-interaction") ? _FwComponent.prototype.UIEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME + "-allow-interaction") : this._customArgs.allowInteraction
        }, Tooltip.configDefaults());
      }
    }, {
      key: "elementOffset",
      get: function get() {
        var element = _FwComponent.prototype.UIEl.call(this);

        return {
          top: element.getBoundingClientRect().top + window.pageYOffset,
          left: element.getBoundingClientRect().left + window.pageXOffset,
          height: element.getBoundingClientRect().height,
          width: element.getBoundingClientRect().width
        };
      }
    }, {
      key: "_pointWidth",
      get: function get() {
        var toReturn = parseFloat(window.getComputedStyle(Tooltip.current.UI, ':before').getPropertyValue('width'));
        toReturn = Math.sqrt(toReturn * toReturn * 2) * 0.5;
        isNaN(toReturn) && (toReturn = 15);
        return toReturn;
      }
    }, {
      key: "badge",
      get: function get() {
        if (!this.UICurrent) {
          return;
        }

        return this.UICurrent.querySelector("." + COMPONENT_CLASS$1 + "-badge");
      }
    }, {
      key: "width",
      get: function get() {
        return this.UICurrent.getBoundingClientRect().width;
      },
      set: function set(val) {
        this.UICurrent.style.width = val;
      }
    }, {
      key: "height",
      get: function get() {
        return this.UICurrent.getBoundingClientRect().height;
      },
      set: function set(val) {
        this.UICurrent.style.height = val;
      }
    }, {
      key: "UIOffset",
      get: function get() {
        var the_x = this.width * -0.5; //top and bottom

        var badgeOffsetX = 0;

        switch (this.args.placement) {
          case 'right':
            the_x = this._pointWidth;
            break;

          case 'left':
            the_x = -(this.width + this._pointWidth);
            break;
        }

        if (this.badge && (this.args.placement == 'left' || this.args.placement == 'right')) {
          badgeOffsetX = this.args.placement == 'left' ? this.badge.getBoundingClientRect().width * -0.5 : this.badge.getBoundingClientRect().width * 0.5;
        }

        the_x += badgeOffsetX;
        var the_y = this.height * -0.5; // left and right

        var badgeOffsetY = 0;

        switch (this.args.placement) {
          case 'bottom':
            the_y = this._pointWidth;
            break;

          case 'top':
            the_y = -(this.height + this._pointWidth);
            break;
        }

        if (this.badge && (this.args.placement == 'top' || this.args.placement == 'bottom')) {
          badgeOffsetY = this.args.placement == 'top' ? this.badge.getBoundingClientRect().height * -0.5 : this.badge.getBoundingClientRect().height * 0.5;
        }

        the_y += badgeOffsetY;
        return {
          x: the_x,
          y: the_y // x: 0,
          // y: 0

        };
      }
    }, {
      key: "elementOrigin",
      get: function get() {
        if (!Tooltip.current.UI) {
          return;
        }

        var the_x = this.elementOffset.left + this.elementOffset.width * 0.5; //top and bottom

        if (!this.args.x) {
          if (!this.args.centerX) {
            switch (this.args.placement) {
              case 'right':
                the_x = this.elementOffset.left + this.elementOffset.width;
                break;

              case 'left':
                the_x = this.elementOffset.left;
                break;
            }
          }
        } else {
          the_x = parseFloat(this.args.x);
        }

        var the_y = this.elementOffset.top + this.elementOffset.height * 0.5; // left and right

        if (!this.args.y) {
          if (!this.args.centerY) {
            switch (this.args.placement) {
              case 'bottom':
                the_y = this.elementOffset.top + this.elementOffset.height;
                break;

              case 'top':
                the_y = this.elementOffset.top;
                break;
            }
          }
        } else {
          the_y = parseFloat(this.args.y);
        }

        return {
          x: the_x,
          y: the_y
        };
      }
    }], [{
      key: "current",
      get: function get() {
        return CURRENT_TOOLTIP_INSTANCE;
      },
      set: function set(obj) {
        CURRENT_TOOLTIP_INSTANCE.UI = obj.UI;
        CURRENT_TOOLTIP_INSTANCE.args = obj.args;
        CURRENT_TOOLTIP_INSTANCE.element = obj.element;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$1;
      }
    }]);

    return Tooltip;
  }(FwComponent);
  Tooltip.initListeners();

  var NAME = 'zone';
  var COMPONENT_CLASS = "" + FwString.ToDashed(NAME);
  var ACTIVATED_CLASS = COMPONENT_CLASS + "-has-content";
  var COMPONENT_TEXT_CLASS = ACTIVATED_CLASS + "-text";
  var DATA_KEY = Settings.get('prefix') + "_" + NAME;
  var EVENT_KEY = "_" + DATA_KEY;
  var EVENT_CHANGE = "change" + EVENT_KEY;
  var EVENT_BEFORE_ACTIVATE = "before_activate" + EVENT_KEY;
  var EVENT_ACTIVATE = "activate" + EVENT_KEY;
  var EVENT_AFTER_ACTIVATE = "after_activate" + EVENT_KEY;
  var EVENT_BEFORE_DEACTIVATE = "before_deactivate" + EVENT_KEY;
  var EVENT_DEACTIVATE = "deactivate" + EVENT_KEY;
  var EVENT_AFTER_DEACTIVATE = "after_deactivate" + EVENT_KEY;

  var Zone = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(Zone, _FwComponent);

    function Zone(element, formControl) {
      element = element || false;
      return _FwComponent.call(this, element, {
        _formControl: formControl ? new FwDom(formControl) : element ? element.__formControl : false
      }) || this;
    }

    var _proto = Zone.prototype;

    _proto._killDyText = function _killDyText() {
      this.UIDyText && this.UIDyText.parentNode.removeChild(this.UIDyText);
    };

    _proto.activate = function activate(elem) {
      var _this = this;

      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_ACTIVATE, EVENT_ACTIVATE, EVENT_AFTER_ACTIVATE, function () {
        _this._killDyText();

        element.classList.add(ACTIVATED_CLASS);
        element.innerHTML += "<div class=\"" + COMPONENT_TEXT_CLASS + "\">\n              <span>" + _this.UIControl.files.length + " files selected.<br> Click or drag and drop to reselect</span>\n            </div>";
      }, element);
    };

    _proto.deactivate = function deactivate(elem) {
      var _this2 = this;

      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);

      _FwComponent.prototype.runCycle.call(this, EVENT_BEFORE_DEACTIVATE, EVENT_DEACTIVATE, EVENT_AFTER_DEACTIVATE, function () {
        _this2._killDyText();

        element.classList.remove(ACTIVATED_CLASS);
      }, element);
    };

    _proto.toggle = function toggle(elem) {
      var element = elem ? _FwComponent.prototype.UIEl.call(this, elem) : _FwComponent.prototype.UIEl.call(this);

      if (this.UIControl.value && this.UIControl.files.length) {
        this.activate(element);
      } else {
        this.deactivate(element);
      }
    };

    Zone.handleClick = function handleClick() {
      return function (e) {
        if (!FwComponent.isDisabled(e.target)) {
          var zone = new Zone(e.target.closest("." + COMPONENT_CLASS), e.target);
          zone.toggle();
        }
      };
    };

    Zone.initListeners = function initListeners() {
      FwEvent.addListener(document.documentElement, EVENT_CHANGE, "." + COMPONENT_CLASS, Zone.handleClick());
    };

    Zone.destroyListeners = function destroyListeners() {
      FwEvent.removeListener(document.documentElement, EVENT_CHANGE, Zone.handleClick());
    };

    _createClass(Zone, [{
      key: "UIControl",
      get: function get() {
        return this._formControl;
      }
    }, {
      key: "UIDyText",
      get: function get() {
        return _FwComponent.prototype.UIEl.call(this).querySelector("." + COMPONENT_TEXT_CLASS);
      }
    }], [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY;
      }
    }]);

    return Zone;
  }(FwComponent);
  Zone.initListeners();

  // import FwArrayay from './src/data-helper/array.js';
  var FrameWork = {
    Initiator: Initiator,
    Settings: Settings,
    Accordion: Accordion,
    Alert: Alert,
    Button: Button,
    Dropdown: Dropdown,
    Form: Form,
    Lazy: Lazy,
    ListGroup: ListGroup,
    Modal: Modal,
    ModuleGrid: ModuleGrid,
    Switch: Switch,
    Tabs: Tabs,
    Tooltip: Tooltip,
    Zone: Zone
  };

  return FrameWork;

})));
//# sourceMappingURL=framework.lib.js.map
