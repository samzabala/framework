(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.frameWork = factory());
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
    subClass.__proto__ = superClass;
  }

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

  var UiPrefix = function UiPrefix(componentName, noDash) {
    noDash = noDash || false;
    return noDash ? componentName + "-ui" : componentName + "-ui-";
  };
  var UiDynamicClass = FwCore.settings.uiJsClass + "_internal_toggle";
  var BodyClass = {
    noScroll: "body-no-scroll",
    onDrag: "body-on-drag",
    loading: "body-loading",
    loaded: "body-loaded"
  }; //this was the bitch that got clickied or hovered or wehatever

  var UiTriggerer = function UiTriggerer(triggerer, isGroupable) {
    triggerer = triggerer || false;
    isGroupable = isGroupable || false;
    var toReturn;

    if (triggerer) {
      if (isGroupable) {
        return;
      } else if ( //calendar fix
      triggerer.closest("." + FwCore.settings.uiJsClass) && !triggerer.closest("." + UiDynamicClass)) {
        toReturn = triggerer.closest("." + FwCore.settings.uiJsClass);
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
        } else if (toggleMode && lookupResetToParentClass.filter(function (i) {
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

      if (!toReturn && lookupResetFromClosestComponent.filter(function (i) {
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
  var UiChangeHash$1 = function UiChangeHash(id) {
    id = id || '';

    if (FwCore.settings.dynamicHash) {
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
    activatedClass = activatedClass || 'active';
    resetterClass = resetterClass || prefix + "-group-toggle-reset";
    noActiveClass = noActiveClass || prefix + "-group-toggle-allow-no-active";
    multipleClass = multipleClass || prefix + "-group-toggle-multiple";

    if (!element) {
      return;
    }

    if (element.closest(siblingSelector) && !element.classList.contains(prefix)) {
      element = element.closest(siblingSelector);
    }

    if (element) {
      //reset da resetti
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
      }).length > 0 || element.closest(noActiveClass)) {
        element.classList.toggle(activatedClass);
      } else {
        element.classList.add(activatedClass);
      }
    }
  };
  var UiPurge = function UiPurge(exempted, selector, callback) {
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
      console.log(FwFnsQ.on_resize);
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
        document.body.classList.remove(BodyClass.loaded);
        document.body.classList.add(BodyClass.loading);
        break;

      case 'complete':
      default:
        setTimeout(function () {
          document.body.classList.remove(BodyClass.loading);
          document.body.classList.add(BodyClass.loaded);
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

  var NativeEvents = ['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'paste', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll'];

  var FwEvent = /*#__PURE__*/function (_FwDataHelper) {
    _inheritsLoose(FwEvent, _FwDataHelper);

    function FwEvent() {
      return _FwDataHelper.apply(this, arguments) || this;
    }

    FwEvent.addListener = function addListener(parent, evt, selector, delegationFn, runNative, customEventOpts) {
      parent = parent || selector;
      runNative = runNative !== false || runNative == true;
      var evtNoApi = evt.split("." + FwCore.settings.prefix)[0];
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

      parent.addEventListener(runNative ? evtNoApi : evt, function (event) {
        if (event.target.matches(selector + ', ' + selector + ' *')) {
          // try {
          !runNative && !isNative && FwEvent.trigger(event.target, evt, customEventOpts);
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

      FwCore.Data.set(element, this.constructor.DATA_KEY, this);
      this._element = element;

      if (typeof props === 'object') {
        for (var key in props) {
          this[key] = props[key];
        }
      }
    }

    var _proto = FwComponent.prototype;

    _proto.dispose = function dispose() {
      FwCore.Data["delete"](this._element, this.constructor.DATA_KEY, this);
      this._element = null;
    };

    FwComponent.getInstance = function getInstance(element) {
      return FwCore.Data.get(element, this.DATA_KEY);
    };

    _proto.UiEl = function UiEl(elem) {
      if (elem) {
        this._resetUiEl(elem);
      }

      return this._element;
    };

    _proto._resetUiEl = function _resetUiEl(element) {
      if (element) {
        this._element = element;
      } else {
        throw new Error('Needs a valid element to reset component UI root element');
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
      return elem.classList.contains(UiDynamicClass);
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

  var NAME = 'accordion';
  var ARG_ATTRIBUTE_NAME = "" + NAME;
  var TOGGLE_MODE = "" + NAME;
  var COMPONENT_CLASS = "" + FwString.ToDashed(NAME);
  var ACTIVATED_CLASS = "open";
  var DATA_KEY = FwCore.settings.prefix + "." + NAME;
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
      element = element || UiToggled(TOGGLE_MODE) || false;
      return _FwComponent.call(this, element, {
        _triggerer: triggerer ? new FwDom(triggerer) : false,
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
        FwDom.RunFnForChildren(this.UiGroot, "[data-toggle=\"" + TOGGLE_MODE + "\"],." + COMPONENT_CLASS, "." + COMPONENT_CLASS + "-group", function (accBbies) {
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
        FwEvent.trigger(element, EVENT_BEFORE_CLOSE); //is not within an accordion group that needs one of them open 

        if (!this.UiGroot || this._isWithinAllowNoActive) {
          if (this._triggerer) {
            this._triggerer.classList.remove(ACTIVATED_CLASS);
          } else {
            this._probablyToggle.forEach(function (toggle) {
              toggle.classList.remove(ACTIVATED_CLASS);
            });
          }

          FwEvent.trigger(element, EVENT_CLOSE);
          element.classList.remove(ACTIVATED_CLASS);

          if (this.args.changeHash && this._id) {
            UiChangeHash$1('');
          }

          FwEvent.trigger(element, EVENT_AFTER_CLOSE);
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
        FwEvent.trigger(element, EVENT_BEFORE_OPEN);

        if (this._triggerer) {
          this._triggerer.classList.add(ACTIVATED_CLASS);
        } else {
          this._probablyToggle.forEach(function (toggle) {
            toggle.classList.add(ACTIVATED_CLASS);
          });
        }

        FwEvent.trigger(element, EVENT_OPEN);
        element.classList.add(ACTIVATED_CLASS);

        if (this.args.changeHash && this._id) {
          UiChangeHash$1(this._id);
        }

        FwEvent.trigger(element, EVENT_AFTER_OPEN);
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

        if (!FwComponent.isDisabled(e.target)) {
          var accordion = new Accordion(UiToggled(TOGGLE_MODE, e.target), e.target);
          accordion.toggle();
        }
      };
    };

    Accordion.handleUniversal = function handleUniversal() {
      return function () {
        if (FwCore.settings.initializeAccordion) {
          var accordion = new Accordion();
          accordion.open();
        }
      };
    };

    Accordion.initListeners = function initListeners() {
      FwEvent.addListener(document, EVENT_CLICK, "*[data-toggle=\"" + TOGGLE_MODE + "\"]", Accordion.handleToggler());
      window.addEventListener('hashchange', Accordion.handleUniversal());
      FwFnsQ.on_ready = Accordion.handleUniversal();
    };

    _createClass(Accordion, [{
      key: "args",
      get: function get() {
        return FwComponent._parseArgs(this._customArgs ? this._customArgs : {
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
  }(FwComponent);
  Accordion.initListeners();

  var NAME$1 = 'alert';
  var TOGGLE_MODE$1 = NAME$1 + "-close";
  var COMPONENT_CLASS$1 = "" + FwString.ToDashed(NAME$1);
  var DATA_KEY$1 = FwCore.settings.prefix + "." + NAME$1;
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var EVENT_CLICK$1 = "click" + EVENT_KEY$1;
  var EVENT_BEFORE_CLOSE$1 = "before_close" + EVENT_KEY$1;
  var EVENT_CLOSE$1 = "close" + EVENT_KEY$1;
  var EVENT_AFTER_CLOSE$1 = "after_close" + EVENT_KEY$1;

  var Alert = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(Alert, _FwComponent);

    function Alert() {
      return _FwComponent.apply(this, arguments) || this;
    }

    var _proto = Alert.prototype;

    _proto.close = function close(elem) {
      var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : this._element;

      if (!element) {
        return;
      }

      FwEvent.trigger(element, EVENT_BEFORE_CLOSE$1);
      FwEvent.trigger(element, EVENT_CLOSE$1);
      element.parentNode.removeChild(element);
      FwEvent.trigger(element, EVENT_AFTER_CLOSE$1);
    };

    Alert.closeAll = function closeAll() {
      var selector = document.querySelectorAll("." + COMPONENT_CLASS$1);

      if (selector.length) {
        selector.forEach(function (instance) {
          if (instance.querySelectorAll('[data-toggle="alert-close"]').length || instance.classList.contains(NAME$1 + "-closeable")) {
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
          var alert = new Alert(UiToggled(TOGGLE_MODE$1, e.target));
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
      FwEvent.addListener(document, EVENT_CLICK$1, "*[data-toggle=\"" + TOGGLE_MODE$1 + "\"]", Alert.handleClose());
      FwEvent.addListener(document, EVENT_CLICK$1, "*[data-toggle=\"" + TOGGLE_MODE$1 + "-all\"]", Alert.handleCloseAll());
    };

    _createClass(Alert, null, [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$1;
      }
    }]);

    return Alert;
  }(FwComponent);
  Alert.initListeners();

  var NAME$2 = 'btn';
  var COMPONENT_CLASS$2 = "" + FwString.ToDashed(NAME$2);
  var DATA_KEY$2 = FwCore.settings.prefix + "." + NAME$2;
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var EVENT_CLICK$2 = "click" + EVENT_KEY$2;
  var EVENT_BEFORE_TOGGLE = "before_toggle" + EVENT_KEY$2;
  var EVENT_TOGGLE = "toggle" + EVENT_KEY$2;
  var EVENT_AFTER_TOGGLE = "after_toggle" + EVENT_KEY$2;

  var Button = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(Button, _FwComponent);

    function Button() {
      return _FwComponent.apply(this, arguments) || this;
    }

    var _proto = Button.prototype;

    _proto.toggle = function toggle(elem) {
      var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : this._element;

      if (!element) {
        return;
      }

      FwEvent.trigger(element, EVENT_BEFORE_TOGGLE);
      FwEvent.trigger(element, EVENT_TOGGLE);
      UiToggleGroup(element, NAME$2);
      FwEvent.trigger(element, EVENT_AFTER_TOGGLE);
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
      FwEvent.addListener(document.documentElement, EVENT_CLICK$2, "." + COMPONENT_CLASS$2 + "-group-toggle > ." + COMPONENT_CLASS$2, Button.handleToggle());
    };

    _createClass(Button, null, [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$2;
      }
    }]);

    return Button;
  }(FwComponent);
  Button.initListeners();

  var NAME$3 = 'dropdown';
  var ARG_ATTRIBUTE_NAME$1 = "" + NAME$3;
  var TOGGLE_MODE$2 = "" + NAME$3;
  var COMPONENT_CLASS$3 = "" + FwString.ToDashed(NAME$3);
  var ACTIVATED_CLASS$1 = "open";
  var NAV_ANCESTOR = "li, .nav-item";
  var DATA_KEY$3 = FwCore.settings.prefix + "." + NAME$3;
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var EVENT_CLICK$3 = "click" + EVENT_KEY$3;
  var EVENT_FOCUS = "focus" + EVENT_KEY$3;
  var EVENT_BLUR = "blur" + EVENT_KEY$3;
  var EVENT_BEFORE_CLOSE$2 = "before_close" + EVENT_KEY$3;
  var EVENT_CLOSE$2 = "close" + EVENT_KEY$3;
  var EVENT_AFTER_CLOSE$2 = "after_close" + EVENT_KEY$3;
  var EVENT_BEFORE_OPEN$1 = "before_open" + EVENT_KEY$3;
  var EVENT_OPEN$1 = "open" + EVENT_KEY$3;
  var EVENT_AFTER_OPEN$1 = "after_open" + EVENT_KEY$3;

  var Dropdown = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(Dropdown, _FwComponent);

    function Dropdown(element, triggerer, args) {
      return _FwComponent.call(this, element, {
        _triggerer: triggerer ? new FwDom(triggerer) : false,
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
        FwEvent.trigger(element, EVENT_BEFORE_CLOSE$2);
        this.setDimensions(null, Dropdown.configDefaults);
        FwEvent.trigger(element, EVENT_CLOSE$2);
        element.classList.remove(ACTIVATED_CLASS$1);
        triggerer && triggerer.classList.remove(ACTIVATED_CLASS$1);
        this.UiElNavcestor && this.UiElNavcestor.classList.remove(ACTIVATED_CLASS$1);
        FwEvent.trigger(element, EVENT_AFTER_CLOSE$2);
      }
    };

    _proto.open = function open(elem, triggerer) {
      var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : this._element;

      if (!element) {
        return;
      }

      triggerer = triggerer || this._triggerer;
      FwEvent.trigger(element, EVENT_BEFORE_OPEN$1);
      this.setDimensions();
      Dropdown.purgeToggles(triggerer);
      Dropdown.purge(element);
      FwEvent.trigger(element, EVENT_OPEN$1);
      element.classList.add(ACTIVATED_CLASS$1);
      triggerer && triggerer.classList.add(ACTIVATED_CLASS$1);

      if (this.UiElUncles) {
        this.UiElUncles.forEach(function (uncle) {
          uncle.classList.remove(ACTIVATED_CLASS$1);
        });
      }

      FwEvent.trigger(element, EVENT_AFTER_OPEN$1);
    };

    _proto.toggle = function toggle(elem, triggerer) {
      var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : this._element;

      if (!element) {
        return;
      }

      triggerer = triggerer || false;

      if (element.classList.contains(ACTIVATED_CLASS$1)) {
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

    Dropdown.purge = function purge(exemptedDropdown) {
      UiPurge(exemptedDropdown, "." + COMPONENT_CLASS$3, function (elem) {
        new Dropdown(elem).close();
      });
    };

    Dropdown.purgeToggles = function purgeToggles(exemptedToggle) {
      UiPurge(exemptedToggle, "*[data-toggle=\"" + TOGGLE_MODE$2 + "\"]", function (elem) {
        new Dropdown(UiToggled(TOGGLE_MODE$2, elem)).close();
      });
    };

    Dropdown.handleToggle = function handleToggle() {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var triggerer = UiTriggerer(e.target);
          var dropdown = new Dropdown(UiToggled(TOGGLE_MODE$2, triggerer), triggerer);
          dropdown.toggle();
        }
      };
    };

    Dropdown.handleFocusOpen = function handleFocusOpen(i) {
      return function (e) {
        if (FwComponent.isDisabled(e.target)) {
          e.target.blur();
        } else {
          var triggerer = UiTriggerer(e.target);
          var dropdown = new Dropdown(UiToggled(TOGGLE_MODE$2, triggerer), triggerer);
          dropdown.open();
          triggerer.classList.add('focus');
        }
      };
    };

    Dropdown.handleBlurClose = function handleBlurClose() {
      return function (e) {
        if (!FwComponent.isDisabled(e.target)) {
          var triggerer = UiTriggerer(e.target);
          var dropdown = new Dropdown(UiToggled(TOGGLE_MODE$2, triggerer), triggerer);
          setTimeout(function () {
            dropdown.close();
          }, 200);
          triggerer.classList.remove('focus');
        }
      };
    };

    Dropdown.handlerUniversal = function handlerUniversal() {
      return function (e) {
        if (FwComponent.isDisabled(e.target)) {
          e.preventDefault();
        } else if (!FwComponent.isDynamic(e.target)) {
          if (!e.target.closest("[data-toggle=\"" + TOGGLE_MODE$2 + "\"]") && !e.target.closest("." + COMPONENT_CLASS$3)) {
            Dropdown.purge();
            Dropdown.purgeToggles();
          }
        }
      };
    };

    Dropdown.initListeners = function initListeners() {
      FwEvent.addListener(document, EVENT_CLICK$3, "*[data-toggle=\"" + TOGGLE_MODE$2 + "\"]:not(input):not([contenteditable]):not(." + FwCore.settings.uiJsClass + ")", Dropdown.handleToggle());
      FwEvent.addListener(document, EVENT_FOCUS, "input[data-toggle=\"" + TOGGLE_MODE$2 + "\"], *[contenteditable][data-toggle=\"" + TOGGLE_MODE$2 + "\"], ." + FwCore.settings.uiJsClass + "[data-toggle=\"" + TOGGLE_MODE$2 + "\"] [contenteditable]", Dropdown.handleFocusOpen());
      FwEvent.addListener(document, EVENT_BLUR, "input[data-toggle=\"" + TOGGLE_MODE$2 + "\"], *[contenteditable][data-toggle=\"" + TOGGLE_MODE$2 + "\"], ." + FwCore.settings.uiJsClass + "[data-toggle=\"" + TOGGLE_MODE$2 + "\"] [contenteditable]", Dropdown.handleBlurClose());
      FwEvent.addListener(document, 'click', "*", Dropdown.handlerUniversal());
    };

    _createClass(Dropdown, [{
      key: "args",
      get: function get() {
        return FwComponent._parseArgs(this._customArgs ? this._customArgs : {
          width: this._triggerer && this._triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-width") || this._element.getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-width"),
          maxHeight: this._triggerer && this._triggerer.getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-max-height") || this._element.getAttribute("data-" + ARG_ATTRIBUTE_NAME$1 + "-max-height")
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
          return FwDom.getSiblings(this.UiElNavcestor).filter(function (sibling) {
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
        return DATA_KEY$3;
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
      } else {
        return false;
      }
    };

    FwDate.toVal = function toVal(date) {
      var d = FwDate.toParsed(date);

      if (d) {
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
      } else {
        return false;
      }
    };

    return FwDate;
  }(FwDataHelper);

  var NAME$4 = 'formCalendar';
  var ARG_ATTRIBUTE_NAME$2 = 'calendar';
  var COMPONENT_CLASS$4 = "input-calendar";
  var ACTIVATED_CLASS$2 = "active";
  var DATA_KEY$4 = FwCore.settings.prefix + "." + NAME$4;
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var EVENT_CLICK$4 = "click" + EVENT_KEY$4;
  var EVENT_KEYUP = "keyup" + EVENT_KEY$4;
  var EVENT_CHANGE = "change" + EVENT_KEY$4;
  var EVENT_BEFORE_INIT = "before_init" + EVENT_KEY$4;
  var EVENT_INIT = "init" + EVENT_KEY$4;
  var EVENT_AFTER_INIT = "after_init" + EVENT_KEY$4;
  var EVENT_BEFORE_CREATE = "before_create" + EVENT_KEY$4;
  var EVENT_CREATE = "create" + EVENT_KEY$4;
  var EVENT_AFTER_CREATE = "after_create" + EVENT_KEY$4;
  var EVENT_BEFORE_UPDATE = "before_update" + EVENT_KEY$4;
  var EVENT_UPDATE = "update" + EVENT_KEY$4;
  var EVENT_AFTER_UPDATE = "after_update" + EVENT_KEY$4;

  var FormCalendar = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(FormCalendar, _FwComponent);

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


        var htmlString = "<button type=\"button\" \n\t\t\tclass=\"\n\t\t\t\t" + (!disValid ? "disabled " : '') + "\n\t\t\t\t" + UiPrefix(COMPONENT_CLASS$4) + "navigation\n\t\t\t\t" + UiPrefix(COMPONENT_CLASS$4) + "button\n\t\t\t\t" + UiPrefix(COMPONENT_CLASS$4) + arrowClass + "\n\t\t\t\t" + UiPrefix(COMPONENT_CLASS$4) + buttonClass + "\" data-value=\"" + arrowDate + "\"\n\t\t\t>\n\t\t\t\t<i class=\"" + UiPrefix(COMPONENT_CLASS$4) + "symbol symbol " + symbolClass + "\"></i>\n\t\t\t</button>";
        return htmlString;
      };

      _this._blockHtml = function (date, customClass) {
        customClass = customClass || '';
        return "<button type=\"button\" data-value=\"" + FwDate.toVal(date) + "\"\n\t\t\t\tclass=\"\n\t\t\t\t" + UiPrefix(COMPONENT_CLASS$4) + "block\n\t\t\t\t" + UiPrefix(COMPONENT_CLASS$4) + "button\n\t\t\t\t" + UiPrefix(COMPONENT_CLASS$4) + "date\n\t\t\t\t" + customClass + "\n\t\t\t\">\n\t\t\t\t<span>" + date.getDate() + "</span>\n\t\t\t</button>";
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
      FwEvent.trigger(_FwComponent.prototype.UiEl.call(this), EVENT_BEFORE_UPDATE);
      var theValue = FwDate.toVal(newValue) || this.theValue;
      var uiValue = FwDate.toVal(valueToRender) || theValue || this.renderValue;
      FwEvent.trigger(_FwComponent.prototype.UiEl.call(this), EVENT_UPDATE); //set up calendar

      if (this.validates(theValue) || !theValue) {
        this.theValue = FwDate.toVal(theValue, false);
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
            date.classList.add(ACTIVATED_CLASS$2);
          } else {
            date.classList.remove(ACTIVATED_CLASS$2);
          }
        });

        if (this.UiInput) {
          this.UiInputValue = theValue;
        }
      }

      FwEvent.trigger(_FwComponent.prototype.UiEl.call(this), EVENT_AFTER_UPDATE);
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

    _proto._createUi = function _createUi(elem, uiValue) {
      var _this2 = this;

      var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);
      FwEvent.trigger(element, EVENT_BEFORE_CREATE);
      uiValue = uiValue || this.renderValue;
      this.renderValue = uiValue;
      var theUi = {};
      FwEvent.trigger(element, EVENT_CREATE);
      theUi.container = this.UiRoot;

      if (!theUi.container) {
        theUi.container = document.createElement('div');
        element.parentNode.insertBefore(theUi.container, element);
        theUi.container.appendChild(element);
        theUi.container.setAttribute('class', FwCore.settings.uiClass + "\n\t\t\t\t" + FwCore.settings.uiJsClass + "\n\t\t\t\t" + element.getAttribute('class').toString().replace(COMPONENT_CLASS$4, UiPrefix(COMPONENT_CLASS$4, true)));
      }

      theUi.inputWrapper = theUi.container.querySelector("." + UiPrefix(COMPONENT_CLASS$4) + "input");
      var components = FwDom.getSiblings(element);
      components.forEach(function (component) {
        if (component !== theUi.inputWrapper) {
          component.parentNode.removeChild(component);
        }
      }); //input

      if (this.args.textInput) {
        if (!theUi.inputWrapper) {
          theUi.inputWrapper = document.createElement('div');
          theUi.container.appendChild(theUi.inputWrapper);
          theUi.inputWrapper.setAttribute('class', UiPrefix(COMPONENT_CLASS$4) + "input");
          theUi.inputWrapper.innerHTML = '<input class="input input-single-line" type="text" maxlength="10" placeholder="MM/DD/YYYY" />';
        }
      } //date 4 u
      //heading


      theUi.heading = document.createElement('div');
      theUi.container.appendChild(theUi.heading);
      theUi.heading.setAttribute('class', UiPrefix(COMPONENT_CLASS$4) + "heading"); //arrowz

      var butts = ['prev-year', 'prev-month', 'next-month', 'next-year'];
      butts.forEach(function (butt) {
        if (_this2.args.yearSkip && (butt == 'prev-year' || butt == 'next-year') || _this2.args.monthSkip && (butt == 'prev-month' || butt == 'next-month')) {
          theUi.heading.innerHTML += _this2._arrowHtml(butt);
        }
      }); //title

      theUi.title = document.createElement('div');
      theUi.heading.appendChild(theUi.title);
      theUi.title.setAttribute('class', UiPrefix(COMPONENT_CLASS$4) + "title " + UiPrefix(COMPONENT_CLASS$4) + "dropdown-toggle\n\t\t\t\t" + UiDynamicClass //NEED THIS AT ALL TIMES IF U DONT WANNA DIE
      );
      theUi.title.setAttribute('data-toggle', 'dropdown');
      theUi.title.innerHTML = "<span\n\t\t\t\tclass=\"" + UiPrefix(COMPONENT_CLASS$4) + "month-text\">\n\t\t\t\t\t" + monthNamesShort[this._calendar.month] + "\n\t\t\t\t</span>\n\t\t\t\t<span class=\"" + UiPrefix(COMPONENT_CLASS$4) + "year-text\">\n\t\t\t\t\t" + this._calendar.year + "\n\t\t\t\t</span>\n\t\t\t\t<i class=\"" + UiPrefix(COMPONENT_CLASS$4) + "symbol symbol symbol-caret-down no-margin-x\"></i>"; //dropdown

      var dropdown = document.createElement('ul');
      theUi.heading.appendChild(dropdown);
      dropdown.setAttribute('data-dropdown-width', '100%');
      dropdown.setAttribute('class', UiPrefix(COMPONENT_CLASS$4) + "dropdown dropdown dropdown-center-x dropdown-top-flush text-align-center");
      dropdown.innerHTML += "<li \n\t\t\t\t\tclass=\"" + UiPrefix(COMPONENT_CLASS$4) + "current-month-year active\"\n\t\t\t\t>\n\t\t\t\t\t<a href=\"#\"\n\t\t\t\t\t\tclass=\"" + UiPrefix(COMPONENT_CLASS$4) + "month\"\n\t\t\t\t\t\tdata-value=\"" + FwDate.toVal(this._calendar.startDate) + "\"\n\t\t\t\t\t>\n\t\t\t\t\t\t" + monthNamesShort[this._calendar.month] + " " + this._calendar.year + "\n\t\t\t\t\t</a>\n\t\t\t\t</li>\n\t\t\t\t<li><hr class=\"dropdown-separator\"></li>";
      theUi.dropdown = new Dropdown(dropdown, theUi.title).UiEl();
      var dropdownInit, dropdownLimit;

      if (this.args.yearSpan == 0) {
        dropdownInit = this._calendar.startDate.getMonth() * -1;
        dropdownLimit = 11 - this._calendar.startDate.getMonth();
      } else {
        dropdownInit = parseInt(-12 * parseInt(this.args.yearSpan));
        dropdownLimit = parseInt(12 * parseInt(this.args.yearSpan));
      } //update dropdown


      var _loop = function _loop(i) {
        var listItemDate = FwDate.adjacentMonth(_this2._calendar.startDate, i);

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
              listItem = "<li class=\"" + currClass + "\">\n\t\t\t\t\t\t\t<a href=\"#\"\n\t\t\t\t\t\t\t\tclass=\"" + UiPrefix(COMPONENT_CLASS$4) + "month\"\n\t\t\t\t\t\t\t\tdata-value=\"" + FwDate.toVal(listItemDate) + "\">\n\t\t\t\t\t\t\t\t\t" + monthNamesShort[listItemDate.getMonth()] + " " + listItemDate.getFullYear() + "\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t" + (listItemDate.getMonth() == 11 && i !== dropdownLimit ? "</li><li><hr class=\"dropdown-separator\">" : '') + "\n\t\t\t\t\t\t</li>";
          theUi.dropdown.innerHTML += listItem;
        }
      };

      for (var i = dropdownInit; i <= dropdownLimit; i++) {
        _loop(i);
      } //generate grid


      theUi.grid = document.createElement('div');
      theUi.container.append(theUi.grid);
      theUi.grid.setAttribute('class', UiPrefix(COMPONENT_CLASS$4) + "grid"); //days heading

      theUi.days = document.createElement('div');
      theUi.grid.append(theUi.days);
      theUi.days.setAttribute('class', UiPrefix(COMPONENT_CLASS$4) + "days");
      var daysHTML = '',
          dayToRetrieve = parseInt(this.args.startDay);

      for (var _i = 0; _i < 7; _i++) {
        if (dayToRetrieve > 6) {
          dayToRetrieve -= 7;
        }

        daysHTML += "<div\n\t\t\t\t\t\tclass=\"" + UiPrefix(COMPONENT_CLASS$4) + "block\n\t\t\t\t\t\t" + UiPrefix(COMPONENT_CLASS$4) + "day\"\n\t\t\t\t\t>\n\t\t\t\t\t\t" + dayNamesShorter[dayToRetrieve] + "\n\t\t\t\t\t</div>";
        dayToRetrieve++;
      }

      theUi.days.innerHTML = daysHTML; //days

      theUi.dates = document.createElement('div');
      theUi.grid.append(theUi.dates);
      theUi.dates.setAttribute('class', UiPrefix(COMPONENT_CLASS$4) + "dates"); //previous month

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

          var dateBlockPrev = this._blockHtml(loopDatePrev, UiPrefix(COMPONENT_CLASS$4) + "block-adjacent\n\t\t\t\t\t\t\t" + (!this.validates(loopDatePrev) ? 'disabled' : '')); //prepend because we loopped this bitch in reverse


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

          var dateBlockNext = this._blockHtml(loopDateNext, UiPrefix(COMPONENT_CLASS$4) + 'block-adjacent ' + (!this.validates(loopDateNext) ? 'disabled' : ''));

          theUi.dates.innerHTML += dateBlockNext;
        }
      }

      FwEvent.trigger(element, EVENT_AFTER_CREATE);
    };

    _proto._render = function _render() {
      this.update();
    };

    FormCalendar.renderAll = function renderAll() {
      FwEvent.trigger(document, EVENT_BEFORE_INIT);
      var calendars = document.querySelectorAll("." + COMPONENT_CLASS$4);
      FwEvent.trigger(document, EVENT_INIT);
      calendars.forEach(function (calendar) {
        var cal = new FormCalendar(calendar);

        cal._render();
      });
      FwEvent.trigger(document, EVENT_AFTER_INIT);
    };

    FormCalendar.handleChange = function handleChange() {
      return function (e) {
        var calendar = new FormCalendar(e.target);
        calendar.update();
      };
    };

    FormCalendar.handleUpdateKeyup = function handleUpdateKeyup() {
      return function (e) {
        if (FwComponent.isDisabled(e.target)) {
          e.preventDefault();
        } else {
          var calendar = new FormCalendar(e.target.closest("." + UiPrefix(COMPONENT_CLASS$4, true)).querySelector("." + COMPONENT_CLASS$4));
          var uiInput = e.target.value;

          if (uiInput.match(/^\d{2}$/) !== null) {
            e.target.value = uiInput + "/";
          } else if (uiInput.match(/^\d{2}\/\d{2}$/) !== null) {
            e.target.value = uiInput + "/";
          }

          var pattern = new RegExp(DateTimePreset.HumanDate.pattern);
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

        if (!FwComponent.isDisabled(e.target)) {
          var calendar = new FormCalendar(e.target.closest("." + UiPrefix(COMPONENT_CLASS$4, true)).querySelector("." + COMPONENT_CLASS$4));
          calendar.update(e.target.getAttribute('data-value'));
        }
      };
    };

    FormCalendar.handleRenderClick = function handleRenderClick() {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var calendar = new FormCalendar(e.target.closest("." + UiPrefix(COMPONENT_CLASS$4, true)).querySelector("." + COMPONENT_CLASS$4));
          calendar.update(null, e.target.getAttribute('data-value'));
        }
      };
    };

    FormCalendar.initListeners = function initListeners() {
      FwEvent.addListener(document, EVENT_CHANGE, COMPONENT_CLASS$4, FormCalendar.handleChange());
      FwEvent.addListener(document, EVENT_KEYUP, "." + UiPrefix(COMPONENT_CLASS$4) + "input input", FormCalendar.handleUpdateKeyup());
      FwEvent.addListener(document, EVENT_CLICK$4, "." + UiPrefix(COMPONENT_CLASS$4) + "date", FormCalendar.handleUpdateClick());
      FwEvent.addListener(document, EVENT_CLICK$4, "." + UiPrefix(COMPONENT_CLASS$4) + "month, ." + UiPrefix(COMPONENT_CLASS$4) + "year", FormCalendar.handleRenderClick());
      FwFnsQ.on_ready = FormCalendar.renderAll;
    };

    _createClass(FormCalendar, [{
      key: "theValue",
      get: function get() {
        return _FwComponent.prototype.UiEl.call(this).value ? FwDate.toVal(_FwComponent.prototype.UiEl.call(this).value) : false;
      },
      set: function set(theValue) {
        if (theValue) {
          _FwComponent.prototype.UiEl.call(this).setAttribute('value', FwDate.toVal(theValue));

          _FwComponent.prototype.UiEl.call(this).value = FwDate.toVal(theValue);
        }
      }
    }, {
      key: "renderValue",
      get: function get() {
        var theRenderDate = this.UiValue ? this.UiValue : this.theValue ? this.theValue : new Date();
        return FwDate.toVal(theRenderDate);
      },
      set: function set(renderDate) {
        this.UiValue = renderDate;
      }
    }, {
      key: "UiInputValue",
      get: function get() {
        return this.UiInput && FwDate.toVal(this.UiInput.value);
      },
      set: function set(uiValue) {
        if (uiValue) {
          this.UiInput.setAttribute('value', FwDate.toHuman(uiValue));
          this.UiInput.value = FwDate.toHuman(uiValue);
        }
      }
    }, {
      key: "UiRoot",
      get: function get() {
        return _FwComponent.prototype.UiEl.call(this).closest("." + UiPrefix(COMPONENT_CLASS$4, true));
      }
    }, {
      key: "UiDates",
      get: function get() {
        return this.UiRoot && this.UiRoot.querySelectorAll("." + UiPrefix(COMPONENT_CLASS$4) + "date");
      }
    }, {
      key: "UiInput",
      get: function get() {
        return this.UiRoot.querySelector("." + UiPrefix(COMPONENT_CLASS$4) + "input input");
      }
    }, {
      key: "args",
      get: function get() {
        return FwComponent._parseArgs(this._customArgs ? this._customArgs : {
          "class": _FwComponent.prototype.UiEl.call(this).getAttribute('class'),
          startDay: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$2 + "-start-day"),
          // 0,1,2,3,4,5,6
          min: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$2 + "-min") || _FwComponent.prototype.UiEl.call(this).getAttribute('min'),
          max: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$2 + "-max") || _FwComponent.prototype.UiEl.call(this).getAttribute('max'),
          yearSpan: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$2 + "-year-span"),
          disabledDates: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$2 + "-disabled-dates"),
          textInput: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$2 + "-text-input"),
          monthSkip: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$2 + "-month-skip"),
          yearSkip: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$2 + "-year-skip")
        }, FormCalendar.configDefaults);
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
        return DATA_KEY$4;
      }
    }]);

    return FormCalendar;
  }(FwComponent);
  FormCalendar.initListeners();

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

  var NAME$5 = 'formTags';
  var ARG_ATTRIBUTE_NAME$3 = 'tags';
  var COMPONENT_CLASS$5 = "input-tags";
  var FOCUS_CLASS = "focus";
  var DATA_KEY$5 = FwCore.settings.prefix + "." + NAME$5;
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var EVENT_CLICK$5 = "click" + EVENT_KEY$5;
  var EVENT_KEYDOWN = "keydown" + EVENT_KEY$5;
  var EVENT_BLUR$1 = "blur" + EVENT_KEY$5;
  var EVENT_PASTE = "paste" + EVENT_KEY$5;
  var EVENT_CHANGE$1 = "change" + EVENT_KEY$5;
  var EVENT_BEFORE_INIT$1 = "before_init" + EVENT_KEY$5;
  var EVENT_INIT$1 = "init" + EVENT_KEY$5;
  var EVENT_AFTER_INIT$1 = "after_init" + EVENT_KEY$5;
  var EVENT_BEFORE_CREATE$1 = "before_create" + EVENT_KEY$5;
  var EVENT_CREATE$1 = "create" + EVENT_KEY$5;
  var EVENT_AFTER_CREATE$1 = "after_create" + EVENT_KEY$5;
  var EVENT_BEFORE_UPDATE$1 = "before_update" + EVENT_KEY$5;
  var EVENT_UPDATE$1 = "update" + EVENT_KEY$5;
  var EVENT_AFTER_UPDATE$1 = "after_update" + EVENT_KEY$5;
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
        FwDom.scrollToElem(this.UiRoot, this.UiInput, 'x');
        FwDom.scrollToElem(this.UiRoot, this.UiInput, 'y');
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
      FwEvent.trigger(_FwComponent.prototype.UiEl.call(this), EVENT_BEFORE_UPDATE$1);
      var theValue = newValue || this.theValue || '';
      var uiValue = valueToRender || theValue || this.renderValue || '';
      allowFilter = allowFilter != false || allowFilter == true;
      inputText = inputText || false;
      FwEvent.trigger(_FwComponent.prototype.UiEl.call(this), EVENT_UPDATE$1);
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

      FwEvent.trigger(_FwComponent.prototype.UiEl.call(this), EVENT_AFTER_UPDATE$1);
    };

    _proto._createUi = function _createUi(elem) {
      var _this2 = this;

      var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);

      if (!element) {
        return;
      }

      FwEvent.trigger(element, EVENT_BEFORE_CREATE$1);
      var theUi = {};
      FwEvent.trigger(element, EVENT_CREATE$1);
      theUi.container = this.UiRoot;

      if (!theUi.container) {
        theUi.container = document.createElement('div');
        element.parentNode.insertBefore(theUi.container, element);
        theUi.container.appendChild(element);
        theUi.container.classList.add('input');
        theUi.container.setAttribute('class', FwCore.settings.uiClass + "\n\t\t\t\t" + FwCore.settings.uiJsClass + "\n\t\t\t\t" + element.getAttribute('class').toString().replace(COMPONENT_CLASS$5, UiPrefix(COMPONENT_CLASS$5, true)));
        theUi.container.classList.add(this.args.multipleLines ? UiPrefix(COMPONENT_CLASS$5) + "multiple" : UiPrefix(COMPONENT_CLASS$5) + "single");
      }

      if (this.args.width) {
        theUi.container.style = this.args.width;
      } //idk it never exists on initial so we dont have to do weird div wraping catches here


      theUi.wrapper = theUi.container.querySelector("." + UiPrefix(COMPONENT_CLASS$5) + "wrapper");

      if (!theUi.wrapper) {
        theUi.wrapper = document.createElement('div');
        theUi.container.appendChild(theUi.wrapper);
        theUi.wrapper.setAttribute('class', UiPrefix(COMPONENT_CLASS$5) + "wrapper");
        theUi.wrapper = theUi.container.querySelector("." + UiPrefix(COMPONENT_CLASS$5) + "wrapper");
      }

      theUi.input = this.UiInput;

      if (!theUi.input) {
        theUi.input = document.createElement('span');
        theUi.wrapper.appendChild(theUi.input);
        theUi.input.setAttribute('class', UiPrefix(COMPONENT_CLASS$5) + "input");
        theUi.input.contentEditable = true;
        theUi.input = theUi.wrapper.querySelector("." + UiPrefix(COMPONENT_CLASS$5) + "input");

        if (element.hasAttribute('placeholder')) {
          theUi.input.setAttribute('data-placeholder', element.getAttribute('placeholder'));
        } //nearest fw-ui parent will actually do tgoggl for bby because baby cant stand up on its own


        if (element.hasAttribute('data-toggle')) {
          theUi.input.setAttribute('data-toggle', element.getAttribute('data-toggle'));
        }

        if (FwComponent.isDisabled(element)) {
          theUi.input.classList.add('disabled');
        } //bitch


        if (this.args.onKeyUp) {
          theUi.input.addEventListener('keyup', function (event) {
            var keyUpScript = eval(_this2.args.onKeyUp);

            if (keyUpScript) {
              keyUpScript();
            }
          });
        }
      } //updoot tags


      var oldTags = theUi.wrapper.querySelectorAll("." + UiPrefix(COMPONENT_CLASS$5) + "tag");
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

          tagHtml.setAttribute('class', UiPrefix(COMPONENT_CLASS$5) + "tag");
          tagHtml.innerHTML = "<button\n\t\t\t\t\t\tdata-ui-i=\"" + i + "\"\n\t\t\t\t\t\tclass=\"" + UiPrefix(COMPONENT_CLASS$5) + "tag-text " + UiPrefix(COMPONENT_CLASS$5) + "tag-button\"\n\t\t\t\t\t\ttype=\"button\"\n\t\t\t\t\t>\n\t\t\t\t\t\t" + tag + "\n\t\t\t\t\t</button>\n\t\t\t\t\t<button data-ui-i=\"" + i + "\" class=\"" + UiPrefix(COMPONENT_CLASS$5) + "tag-close " + UiPrefix(COMPONENT_CLASS$5) + "tag-button\" type=\"button\">\n\t\t\t\t\t\t<i class=\"symbol symbol-close\"></i>\n\t\t\t\t\t</button>";
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

      FwEvent.trigger(element, EVENT_AFTER_CREATE$1);
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
      FwEvent.trigger(document, EVENT_BEFORE_INIT$1);
      var tagsInputs = document.querySelectorAll("." + COMPONENT_CLASS$5);
      FwEvent.trigger(document, EVENT_INIT$1);
      tagsInputs.forEach(function (poot) {
        var tagsInput = new FormTags(poot);

        tagsInput._render();
      });
      FwEvent.trigger(document, EVENT_AFTER_INIT$1);
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

        if (!FwComponent.isDisabled(e.target)) {
          var tagsInput = new FormTags(e.target.closest("." + UiPrefix(COMPONENT_CLASS$5, true)).querySelector("." + COMPONENT_CLASS$5));
          var pasted = e.clipboardData || window.clipboardData || e.originalEvent.clipboardData;
          tagsInput.UiInputValue += pasted.getData('text');
          tagsInput.blur();
        }
      };
    };

    FormTags.handleEditableFocus = function handleEditableFocus() {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var tagsInput = new FormTags(e.target);
          tagsInput.focus();
        }
      };
    };

    FormTags.handleEditableBlur = function handleEditableBlur() {
      return function (e) {
        if (!FwComponent.isDisabled(e.target)) {
          var tagsInput = new FormTags(e.target.closest("." + UiPrefix(COMPONENT_CLASS$5, true)).querySelector("." + COMPONENT_CLASS$5)); //value para mareset ta kung hain si buloy

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
        if (FwComponent.isDisabled(e.target)) {
          e.preventDefault();
        } else {
          var tagsInput = new FormTags(e.target.closest("." + UiPrefix(COMPONENT_CLASS$5, true)).querySelector("." + COMPONENT_CLASS$5));
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
              if (!Modifiers.hasActive()) {
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
                currUiValue = FwArrayay.moveItem(currUiValue, tagsInput.UiInputIdx, tagsInput.UiInputIdx > 0 ? tagsInput.UiInputIdx - 1 : 0);
              }

              break;
            //right

            case 'ArrowRight':
              if (!tagsInput.UiInputValue) {
                e.preventDefault();
                currUiValue = FwArrayay.moveItem(currUiValue, tagsInput.UiInputIdx, tagsInput.UiInputIdx < currUiValue.length ? tagsInput.UiInputIdx + 1 : currUiValue.length - 1); // tagsInput._scrollToUiInput();
              }

              break;
            //up

            case 'ArrowUp':
              if (!tagsInput.UiInputValue) {
                e.preventDefault();
                currUiValue = FwArrayay.moveItem(currUiValue, tagsInput.UiInputIdx, 0);
              }

              break;
            //down

            case 'ArrowDown':
              if (!tagsInput.UiInputValue) {
                e.preventDefault();
                currUiValue = FwArrayay.moveItem(currUiValue, tagsInput.UiInputIdx, currUiValue.length - 1); // tagsInput._scrollToUiInput();
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

        if (!FwComponent.isDisabled(e.target)) {
          var tagsInput = new FormTags(e.target.closest("." + UiPrefix(COMPONENT_CLASS$5, true)).querySelector("." + COMPONENT_CLASS$5));
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

        if (!FwComponent.isDisabled(triggerer)) {
          var tagsInput = new FormTags(e.target.closest("." + UiPrefix(COMPONENT_CLASS$5, true)).querySelector("." + COMPONENT_CLASS$5));
          var tagToEdit = parseInt(e.target.getAttribute('data-ui-i'));
          var currValue = FormTags.toArr(tagsInput.theValue, false);
          currValue.splice(tagToEdit, 1, FormTags.__is);
          var newUiValue = FormTags.toVal(currValue);
          tagsInput.update(null, false, newUiValue, e.target.innerText);
        }
      };
    };

    FormTags.initListeners = function initListeners() {
      FwEvent.addListener(document, EVENT_CHANGE$1, COMPONENT_CLASS$5, FormTags.handleChange());
      FwEvent.addListener(document, EVENT_PASTE, "." + UiPrefix(COMPONENT_CLASS$5, true) + " ." + UiPrefix(COMPONENT_CLASS$5) + "input", FormTags.handleEditablePaste());
      FwEvent.addListener(document, EVENT_CLICK$5, "." + UiPrefix(COMPONENT_CLASS$5, true) + " ." + UiPrefix(COMPONENT_CLASS$5) + "input", FormTags.handleEditableFocus());
      FwEvent.addListener(document, EVENT_BLUR$1, "." + UiPrefix(COMPONENT_CLASS$5, true) + " ." + UiPrefix(COMPONENT_CLASS$5) + "input", FormTags.handleEditableBlur());
      FwEvent.addListener(document, EVENT_KEYDOWN, "." + UiPrefix(COMPONENT_CLASS$5, true) + " ." + UiPrefix(COMPONENT_CLASS$5) + "input", FormTags.handleEditableKeydown());
      FwEvent.addListener(document, EVENT_CLICK$5, "." + UiPrefix(COMPONENT_CLASS$5, true) + " ." + UiPrefix(COMPONENT_CLASS$5) + "tag-close", FormTags.handleDelete());
      FwEvent.addListener(document, EVENT_CLICK$5, "." + UiPrefix(COMPONENT_CLASS$5, true) + " ." + UiPrefix(COMPONENT_CLASS$5) + "tag-text", FormTags.handleEdit());
      FwFnsQ.on_ready = FormTags.renderAll;
      FwFnsQ.on_resize = FormTags.renderAll;
    };

    _createClass(FormTags, [{
      key: "theValue",
      get: function get() {
        return _FwComponent.prototype.UiEl.call(this).value;
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
        return _FwComponent.prototype.UiEl.call(this).closest("." + UiPrefix(COMPONENT_CLASS$5, true));
      }
    }, {
      key: "UiInput",
      get: function get() {
        return this.UiRoot && this.UiRoot.querySelector("." + UiPrefix(COMPONENT_CLASS$5) + "input");
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
        return FwComponent._parseArgs(this._customArgs ? this._customArgs : {
          width: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-width"),
          onKeyUp: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-on-keyup"),
          filter: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-filter"),
          multipleLines: _FwComponent.prototype.UiEl.call(this).getAttribute("data-" + ARG_ATTRIBUTE_NAME$3 + "-multiple-lines")
        }, FormTags.configDefaults);
      }
    }], [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$5;
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
          filter: null,
          onKeyUp: null,
          multipleLines: false
        };
      }
    }]);

    return FormTags;
  }(FwComponent);
  FormTags.initListeners();

  var Form = {
    FormCalendar: FormCalendar,
    FormTags: FormTags
  };

  var NAME$6 = 'lazy';
  var COMPONENT_CLASS$6 = "" + FwString.ToDashed(NAME$6);
  var ACTIVATED_CLASS$3 = NAME$6 + "-loaded";
  var SVG_REPLACED_CLASS = COMPONENT_CLASS$6 + "-svg-replacement";
  var COMPONENT_SELECTOR = "*[data-src],*[data-srcset],." + COMPONENT_CLASS$6;
  var BODY_LOADING_CLASS = "body-" + NAME$6 + "-loading";
  var BODY_LOADED_CLASS = "body-" + NAME$6 + "-loaded";
  var DATA_KEY$6 = FwCore.settings.prefix + "." + NAME$6;
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var EVENT_BEFORE_LAZYLOAD = "before_lazyload" + EVENT_KEY$6;
  var EVENT_LAZYLOAD = "lazyload" + EVENT_KEY$6;
  var EVENT_AFTER_LAZYLOAD = "after_lazyload" + EVENT_KEY$6;

  var Lazy = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(Lazy, _FwComponent);

    function Lazy(element) {
      return _FwComponent.call(this, element, {
        _ogElement: false
      }) || this;
    }

    var _proto = Lazy.prototype;

    _proto.dispose = function dispose() {
      _FwComponent.prototype.dispose.call(this);
    };

    _proto.readyLoaded = function readyLoaded(elem) {
      var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);
      element.classList.add("" + ACTIVATED_CLASS$3);
    };

    _proto.loadSVG = function loadSVG(elem) {
      var _this = this;

      var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);
      var imgID = element.getAttribute('id') || null;
      var imgClass = element.getAttribute('class') || null;
      fetch(this.theSrc).then(function (response) {
        return response.text();
      }).then(function (markup) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(markup, 'text/html');
        var svg = dom.querySelector('svg');

        if (svg) {
          if (typeof imgID !== null) {
            svg.setAttribute('id', imgID);
          }

          if (typeof imgClass !== null) {
            svg.setAttribute('class', imgClass + " " + SVG_REPLACED_CLASS);
          }

          svg.removeAttribute('xmlns:a');
          element.replaceWith(svg);
          _this.UiOriginal = element;

          _FwComponent.prototype._resetUiEl.call(_this, svg);
        }

        _this.readyLoaded();
      });
    };

    _proto.load = function load(elem) {
      var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);

      if (!element) {
        return;
      }

      FwEvent.trigger(element, EVENT_BEFORE_LAZYLOAD);

      if (element.classList.contains("" + COMPONENT_CLASS$6)) {
        FwEvent.trigger(element, EVENT_LAZYLOAD);

        if (element.matches('img') || element.closest('picture')) {
          this.theSrc && element.setAttribute('src', this.theSrc);
          this.theSrcSet && element.setAttribute('srcset', this.theSrcSet);

          if (FwString.GetFileExtension(this.theSrc) == 'svg') {
            this.loadSVG();
          } else {
            this.readyLoaded();
          }
        } else {
          console.log(element);
          element.style.backgroundImage = "url(" + this.theSrc + ")";
          this.readyLoaded();
        }
      }

      FwEvent.trigger(element, EVENT_AFTER_LAZYLOAD);
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
      FwEvent.trigger(document, EVENT_BEFORE_LAZYLOAD);
      Lazy.setStatus('loading');
      images = images || document.querySelectorAll(COMPONENT_SELECTOR);
      FwEvent.trigger(document, EVENT_LAZYLOAD);
      images.forEach(function (img) {
        var lazy = new Lazy(img);
        lazy.load();
      });
      Lazy.setStatus('loaded');
      FwEvent.trigger(document, EVENT_AFTER_LAZYLOAD);
    };

    Lazy.initListeners = function initListeners() {
      if (FwCore.settings.lazyLoad) {
        FwFnsQ.on_ready = Lazy.loadAll;
      }
    };

    _createClass(Lazy, [{
      key: "theSrc",
      get: function get() {
        return _FwComponent.prototype.UiEl.call(this).getAttribute('data-src');
      }
    }, {
      key: "theSrcSet",
      get: function get() {
        return _FwComponent.prototype.UiEl.call(this).getAttribute('data-srcset');
      }
    }, {
      key: "UiOriginal",
      get: function get() {
        return this._ogElement || _FwComponent.prototype.UiEl.call(this);
      },
      set: function set(elem) {
        this._ogElement = elem;
      }
    }], [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$6;
      }
    }]);

    return Lazy;
  }(FwComponent);
  Lazy.initListeners();

  var NAME$7 = 'listGroup';
  var COMPONENT_CLASS$7 = FwString.ToDashed(NAME$7) + "-toggle"; //coz toggling shit only work when this class is heeerr

  var CHILD_CLASS = FwString.ToDashed(NAME$7) + "-item";
  var COMPONENT_TOGGLEGROUP_PREFIX = "list";
  var DATA_KEY$7 = FwCore.settings.prefix + "." + NAME$7;
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var EVENT_CLICK$6 = "click" + EVENT_KEY$7;
  var EVENT_BEFORE_TOGGLE$1 = "before_toggle" + EVENT_KEY$7;
  var EVENT_TOGGLE$1 = "toggle" + EVENT_KEY$7;
  var EVENT_AFTER_TOGGLE$1 = "after_toggle" + EVENT_KEY$7;

  var ListGroup = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(ListGroup, _FwComponent);

    function ListGroup(element, triggeredChild) {
      element = element || false;
      return _FwComponent.call(this, element, {
        _triggeredChild: triggeredChild ? new FwDom(triggeredChild) : false
      }) || this;
    }

    var _proto = ListGroup.prototype;

    _proto.toggle = function toggle(triggd) {
      var triggeredChild = triggd ? triggd : this.UiTriggeredChild;
      this.UiTriggeredChild = triggeredChild;

      if (!triggeredChild || !FwDom.isDescendant(_FwComponent.prototype.UiEl.call(this), triggeredChild)) {
        return;
      }

      FwEvent.trigger(this.UiTriggeredChild, EVENT_BEFORE_TOGGLE$1);
      FwEvent.trigger(this.UiTriggeredChild, EVENT_TOGGLE$1);
      UiToggleGroup(this.UiTriggeredChild, "" + COMPONENT_TOGGLEGROUP_PREFIX, null, "li, ." + CHILD_CLASS);
      FwEvent.trigger(this.UiTriggeredChild, EVENT_AFTER_TOGGLE$1);
    };

    ListGroup.handleToggle = function handleToggle() {
      return function (e) {
        e.preventDefault();

        if (!FwComponent.isDisabled(e.target)) {
          var listGroup = new ListGroup(e.target.parentNode.closest("." + COMPONENT_CLASS$7));
          listGroup.toggle(e.target);
        }
      };
    };

    ListGroup.initListeners = function initListeners() {
      FwEvent.addListener(document.documentElement, EVENT_CLICK$6, "." + COMPONENT_CLASS$7 + " > ." + CHILD_CLASS + ", ." + COMPONENT_CLASS$7 + " > li", ListGroup.handleToggle());
    };

    _createClass(ListGroup, [{
      key: "UiTriggeredChild",
      get: function get() {
        return this._triggeredChild;
      },
      set: function set(triggd) {
        if (FwDom.isDescendant(_FwComponent.prototype.UiEl.call(this), triggd)) {
          this._triggeredChild = triggd;
        }
      }
    }], [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$7;
      }
    }]);

    return ListGroup;
  }(FwComponent);
  ListGroup.initListeners();

  var NAME$8 = 'modal';
  var ACTIVATED_CLASS$4 = "active";
  var BOARD_NAME = "board";
  var DATA_KEY$8 = FwCore.settings.prefix + "." + NAME$8;
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var EVENT_CLICK$7 = "click" + EVENT_KEY$8;
  var EVENT_BEFORE_INIT$2 = "before_init" + EVENT_KEY$8;
  var EVENT_INIT$2 = "init" + EVENT_KEY$8;
  var EVENT_AFTER_INIT$2 = "after_init" + EVENT_KEY$8;
  var EVENT_BEFORE_CREATE$2 = "before_create" + EVENT_KEY$8;
  var EVENT_CREATE$2 = "create" + EVENT_KEY$8;
  var EVENT_AFTER_CREATE$2 = "after_create" + EVENT_KEY$8;
  var EVENT_BEFORE_DESTROY = "before_destroy" + EVENT_KEY$8;
  var EVENT_DESTROY = "destroy" + EVENT_KEY$8;
  var EVENT_AFTER_DESTROY = "after_destroy" + EVENT_KEY$8;
  var EVENT_BEFORE_UPDATE$2 = "before_update" + EVENT_KEY$8;
  var EVENT_UPDATE$2 = "update" + EVENT_KEY$8;
  var EVENT_AFTER_UPDATE$2 = "after_update" + EVENT_KEY$8;
  var EVENT_BEFORE_RESIZE = "before_resize" + EVENT_KEY$8;
  var EVENT_RESIZE = "resize" + EVENT_KEY$8;
  var EVENT_AFTER_RESIZE = "after_resize" + EVENT_KEY$8;
  var CURRENT_MODAL_INSTANCE = {
    element: null,
    args: null
  };
  var VALID_MODAL_MODES = [NAME$8, BOARD_NAME];

  var Modal = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(Modal, _FwComponent);

    function Modal(element, triggerer, args) {
      var _this;

      var currMode;
      VALID_MODAL_MODES.forEach(function (mode) {
        if (element.classList.contains(mode) && !currMode) {
          currMode = mode;
        }
      });
      element = element || UiToggled(currMode) || false;
      _this = _FwComponent.call(this, element, {
        _triggerer: triggerer ? new FwDom(triggerer) : false,
        _customArgs: args || false
      }) || this;
      _this.mode = currMode;
      return _this;
    }

    var _proto = Modal.prototype;

    _proto.dispose = function dispose() {
      _FwComponent.prototype.dispose.call(this);

      this._triggerer = null;
      this._customArgs = null;
    };

    _proto.create = function create(elem) {
      var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);

      if (!element) {
        return;
      }

      FwEvent.trigger(element, EVENT_BEFORE_CREATE$2);
      FwEvent.trigger(element, EVENT_CREATE$2);
      var id = this.UiElId || this.UiId;
      id !== "" + this.UiId && this.args.changeHash && UiChangeHash(id);
      var theUi = document.createElement('div');
      document.querySelector('body').appendChild(theUi);
      theUi.className = UiPrefix + "-" + NAME$8 + "-component\n\t\t\t" + this.mode + "-wrapper\n\t\t\t" + this.args.classes + "\n\t\t\t" + (this.args.align ? this.mode + "-" + this.args.align : '');
      theUi.setAttribute('id', this.UiId);
      theUi.innerHTML = this._markup;
      FwDom.moveContents(element, theUi.querySelector("." + this.mode + "-popup-content"));

      if (this.args.width) {
        frameWork.resizeModal(this.args.width, theUi, args);
      }

      if (this.args.callback) {
        RunFn(this.args.callback);
      }

      Modal.current = {
        element: element,
        args: this.args
      };
      theUi.classList.add(ACTIVATED_CLASS$4);
      document.body.classList.add(BodyClass.noScroll);
      Modal.update();
      FwEvent.trigger(element, EVENT_AFTER_CREATE$2);
    };

    _proto.destroy = function destroy(removeHash) {
      if (!Modal.current.element) {
        return;
      }

      FwEvent.trigger(element, EVENT_BEFORE_DESTROY);
      FwEvent.trigger(element, EVENT_DESTROY);
      var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);
      removeHash = removeHash || false;
      var canRemoveHash = false;

      if (removeHash && Modal.current.element.hasAttribute('id') && Modal.current.element.getAttribute('id') == window.location.hash.replace('#', '')) {
        canRemoveHash = true;
      }

      if (this.UiRoot) {
        FwDom.moveContents(this.UiRoot.querySelector("." + this.mode + "-popup-content"), Modal.current.element);
        this.UiRoot.classList.remove('active');
        this.UiRoot.parentNode.removeChild(this.UiRoot);
      }

      Modal.current = {
        element: false,
        args: false
      };
      var removeBodClass = true;
      VALID_MODAL_MODES.forEach(function (mode) {
        if (document.getElementById(UiPrefix + "-" + mode) && removeBodClass == true) {
          removeBodClass = false;
        }
      });
      removeBodClass && document.body.classList.remove(BodyClass.noScroll);
      canRemoveHash && ChangeHash('');
      FwEvent.trigger(element, EVENT_AFTER_DESTROY);
    };

    Modal.update = function update() {
      if (this.UiRoot) {
        FwEvent.trigger(element, EVENT_BEFORE_UPDATE$2);
        FwEvent.trigger(element, EVENT_UPDATE$2); // buttons
        // resize

        var currentWidth = this.UiRoot.querySelector("." + this.mode + "-popup").clientWidth;
        var resizeBtn = this.UiRoot.querySelectorAll("*[data-toggle=\"" + this.mode + "-resize\"]");

        if (resizeBtn && currentWidth < parseInt(this.current.args.width)) {
          resizeBtn.forEach(function (butt) {
            butt.classList.add('disabled');
          });
        } else {
          resizeBtn.forEach(function (butt) {
            butt.classList.remove('disabled');
          });
        }

        FwEvent.trigger(element, EVENT_AFTER_UPDATE$2);
      }
    };

    _proto.resize = function resize(width) {
      if (this.mode !== BOARD_NAME) {
        return;
      }

      FwEvent.trigger(element, EVENT_BEFORE_RESIZE);
      FwEvent.trigger(element, EVENT_RESIZE);
      var args = args || Modal.current.args || {};
      width = width || args.width || null;

      if (this.UiRoot && parseInt(width) >= parseInt(this.args.width)) {
        //all
        if (this.UiRoot.querySelector("." + this.mode + "-popup")) {
          this.UiRoot.querySelector("." + this.mode + "-popup").style.width = width;
        } //bboard


        if (this.UiRoot.querySelector("." + this.mode + "-button-wrapper")) {
          this.UiRoot.querySelector("." + this.mode + "-button-wrapper").style.width = width;
        }
      }

      FwEvent.trigger(element, EVENT_AFTER_RESIZE);
    };

    Modal.handleResize = function handleResize(mode) {
    };

    Modal.handleUniversal = function handleUniversal(mode) {
      mode = mode || NAME$8;
      return function () {
        if (FwCore.settings["initialize" + mode.toUpperCase()]) {
          FwEvent.trigger(element, EVENT_BEFORE_INIT$2);
          FwEvent.trigger(element, EVENT_INIT$2);
          var modal = new Modal();
          modal.create();
          FwEvent.trigger(element, EVENT_AFTER_INIT$2);
        }
      };
    };

    Modal.handleSomethingEvent = function handleSomethingEvent() {};

    Modal.handleOpen = function handleOpen(mode) {
      mode = mode || NAME$8;
      return function (e) {
        var modal = new Modal(UiToggled(mode, e.target), e.target);
        modal.create();
      };
    };

    Modal.handleClose = function handleClose(mode) {
      mode = mode || NAME$8;
      return function (e) {
        var modal = new Modal(UiToggled(mode, e.target), e.target);
        modal.destroy();
      };
    };

    Modal.initListeners = function initListeners() {
      VALID_MODAL_MODES.forEach(function (mode) {
        FwEvent.addListener(document, EVENT_CLICK$7, "*[data-toggle=\"" + mode + "\"] *[data-toggle=\"" + mode + "-open\"]", Modal.handleOpen(mode));
        FwEvent.addListener(document, EVENT_CLICK$7, "*[data-toggle=\"" + mode + "-close\"]", Modal.handleClose(mode));
        window.addEventListener('hashchange', Modal.handleUniversal(mode));
        FwFnsQ.on_ready = Modal.handleUniversal(mode);
        FwFnsQ.on_resize = Modal.handleResize(mode);
      });
    };

    _createClass(Modal, [{
      key: "UiRoot",
      get: function get() {
        return document.getElementById(this.UiId);
      }
    }, {
      key: "UiId",
      get: function get() {
        return FwCore.settings.prefix + "-" + (this.mode != 'default' ? this.mode : NAME$8);
      }
    }, {
      key: "UiElId",
      get: function get() {
        return _FwComponent.prototype.UiEl.call(this).getAttribute('id');
      }
    }, {
      key: "args",
      get: function get() {
        return FwComponent._parseArgs(this._customArgs ? this._customArgs : {
          changeHash: this._triggerer && this._triggerer.getAttribute("data-" + this.mode + "-change-hash") || contentWrap.getAttribute("data-" + this.mode + "-change-hash"),
          header: this._triggerer && this._triggerer.getAttribute("data-" + this.mode + "-title") || contentWrap.getAttribute("data-" + this.mode + "-title"),
          close: this._triggerer && this._triggerer.getAttribute("data-" + this.mode + "-close") || contentWrap.getAttribute("data-" + this.mode + "-close"),
          disableOverlay: this._triggerer && this._triggerer.getAttribute("data-" + this.mode + "-disable-overlay") || contentWrap.getAttribute("data-" + this.mode + "-disable-overlay"),
          width: this._triggerer && this._triggerer.getAttribute("data-" + this.mode + "-width") || contentWrap.getAttribute("data-" + this.mode + "-width"),
          callback: this._triggerer && this._triggerer.getAttribute("data-" + this.mode + "-callback") || contentWrap.getAttribute("data-" + this.mode + "-callback"),
          classes: this._triggerer && this._triggerer.getAttribute("data-" + this.mode + "-classes") || contentWrap.getAttribute("data-" + this.mode + "-classes"),
          closeClasses: this._triggerer && this._triggerer.getAttribute("data-" + this.mode + "-close-classes") || contentWrap.getAttribute("data-" + this.mode + "-close-classes"),
          //board specific
          align: this._triggerer && this._triggerer.getAttribute("data-" + this.mode + "-align") || contentWrap.getAttribute("data-" + this.mode + "-align"),
          resize: this._triggerer && this._triggerer.getAttribute("data-" + this.mode + "-resize") || contentWrap.getAttribute("data-" + this.mode + "-resize"),
          resizeClasses: this._triggerer && this._triggerer.getAttribute("data-" + this.mode + "-resize-classes") || contentWrap.getAttribute("data-" + this.mode + "-resize-classes") //custom specific
          // customMarkup: //halat weit

        }, Modal.configDefaults);
      }
    }, {
      key: "_markup",
      get: function get() {
        var html = ''; //overlay

        html += "<a href=\"#\"\n\t\t\t\t\t\tclass=\"\n\t\t\t\t\t\t\t" + this.mode + "-close-overlay\"\n\t\t\t\t\t\t\t" + (this.args.disableOverlay == false ? "data-toggle=\"" + this.mode + "-close\"" : '') + "\n\t\t\t\t\t></a>";

        switch (this.mode) {
          case 'board':
            html += "<div class=\"" + this.mode + "-button-wrapper\">";

            if (this.args.close !== false) {
              html += "<a href=\"#\"\n\t\t\t\t\t\t\t\t\t\tclass=\"\n\t\t\t\t\t\t\t\t\t\t\t" + this.mode + "-close " + this.mode + "-button\n\t\t\t\t\t\t\t\t\t\t\t" + (this.args.closeClasses ? this.args.closeClasses : this.mode + "-button-default") + "\"\n\t\t\t\t\t\t\t\t\t\tdata-toggle=\"" + this.mode + "-close\"\n\t\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t\t<i class=\"symbol symbol-close \"></i>\n\t\t\t\t\t\t\t\t\t</a>";
            }

            if (this.args.resize !== false && this.args.width) {
              html += "<a\n\t\t\t\t\t\t\t\t\t\tclass=\"\n\t\t\t\t\t\t\t\t\t\t\t" + this.mode + "-resize " + this.mode + "-button\n\t\t\t\t\t\t\t\t\t\t\t" + (this.args.resizeClasses ? this.args.resizeClasses : this.mode + "-button-default") + "\"\n\t\t\t\t\t\t\t\t\t\tdata-toggle=\"" + this.mode + "-resize\"\n\t\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t\t<i class=\"symbol symbol-arrow-tail-left \"></i>\n\t\t\t\t\t\t\t\t\t\t<i class=\"symbol symbol-arrow-tail-right \"></i>\n\t\t\t\t\t\t\t\t\t</a>";
            }

            html += "</div>";
            html += "<div class=\"" + this.mode + "-popup\">";

            if (this.args.header) {
              html += "<div class=\"" + this.mode + "-header\">\n\t\t\t\t\t\t\t\t\t\t\t<h1 class=\"" + this.mode + "-title\">" + decodeURIComponent(this.args.header) + "</h1>\n\t\t\t\t\t\t\t\t\t\t</div>";
            }

            html += "<div class=\"" + this.mode + "-popup-content\"></div>";
            html += "</div>";
            break;

          case 'modal':
            html += "<div class=\"" + this.mode + "-popup\">";

            if (this.args.header) {
              html += "<div class=\"" + this.mode + "-header\">\n\t\t\t\t\t\t\t\t\t\t<h1 class=\"" + this.mode + "-title\">" + decodeURIComponent(this.args.header) + "</h1>\n\t\t\t\t\t\t\t\t\t</div>";
            }

            if (this.args.close !== false) {
              html += "<a href=\"#\"\n\t\t\t\t\t\t\t\t\t\tclass=\"" + this.mode + "-close " + this.args.closeClasses + "\"\n\t\t\t\t\t\t\t\t\t\tdata-toggle=\"" + this.mode + "-close\"\n\t\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t\t<i class=\"symbol symbol-close\"></i>\n\t\t\t\t\t\t\t\t\t</a>";
            }

            html += "<div class=\"" + this.mode + "-popup-content\"></div>";
            html += "</div>";
            break;
        }

        return html;
      }
    }], [{
      key: "current",
      get: function get() {
        return CURRENT_MODAL_INSTANCE;
      },
      set: function set(obj) {
        CURRENT_MODAL_INSTANCE.element = obj.element;
        CURRENT_MODAL_INSTANCE.args = obj.args;
      }
    }, {
      key: "configDefaults",
      get: function get() {
        var mode = this.mode;
        return {
          changeHash: true,
          header: '',
          close: true,
          disableOverlay: true,
          width: null,
          callback: null,
          classes: '',
          closeClasses: '',
          align: {
            value: 'left',
            parser: function parser(value) {
              if (mode == BOARD_NAME) return value;
            }
          },
          resizeClasses: {
            value: null,
            parser: function parser(value) {
              if (mode == BOARD_NAME) return value;
            }
          },
          resize: {
            value: false,
            parser: function parser(value) {
              if (mode == BOARD_NAME) return value;
            }
          }
        };
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$8;
      }
    }]);

    return Modal;
  }(FwComponent);
  Modal.initListeners();

  var NAME$9 = 'moduleGrid';
  var COMPONENT_CLASS$8 = "" + FwString.ToDashed(NAME$9);
  var COMPONENT_CHILDREN_CLASS = "module";
  var DATA_KEY$9 = FwCore.settings.prefix + "." + NAME$9;
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var EVENT_BEFORE_INIT$3 = "before_init" + EVENT_KEY$9;
  var EVENT_INIT$3 = "init" + EVENT_KEY$9;
  var EVENT_AFTER_INIT$3 = "after_init" + EVENT_KEY$9;
  var EVENT_BEFORE_RENDER = "before_render" + EVENT_KEY$9;
  var EVENT_RENDER = "render" + EVENT_KEY$9;
  var EVENT_AFTER_RENDER = "after_render" + EVENT_KEY$9;
  var EVENT_BEFORE_RENDER_GRID = "before_render_grid" + EVENT_KEY$9;
  var EVENT_RENDER_GRID = "render_grid" + EVENT_KEY$9;
  var EVENT_AFTER_RENDER_GRID = "after_render_grid" + EVENT_KEY$9;
  var EVENT_BEFORE_RENDER_BLOCK = "before_render_block" + EVENT_KEY$9;
  var EVENT_RENDER_BLOCK = "render_block" + EVENT_KEY$9;
  var EVENT_AFTER_RENDER_BLOCK = "after_render_block" + EVENT_KEY$9;
  var PROPERTIES_WRAPPER = ['grid-template-columns', 'grid-template-rows', 'grid-template-areas', 'grid-column-start', 'grid-template-end', 'grid-template', 'grid-column-gap', 'grid-row-gap', 'justify-items', 'align-items', 'justify-content', 'align-content', 'place-content', 'grid-auto-columns', 'grid-auto-rows', 'grid-auto-flow', 'grid'];
  var PROPERTIES_CHILDREN = ['grid-area', 'grid-column', 'grid-row', 'grid-column-start', 'grid-column-end', 'grid-row-start', 'grid-row-end', 'justify-self', 'align-self', 'place-self'];

  var ModuleGrid = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(ModuleGrid, _FwComponent);

    function ModuleGrid(element) {
      return _FwComponent.call(this, element) || this;
    }

    var _proto = ModuleGrid.prototype;

    _proto.render = function render(elem) {
      elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);
    };

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
      var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);
      FwEvent.trigger(elem, EVENT_BEFORE_RENDER_GRID);
      FwEvent.trigger(elem, EVENT_RENDER_GRID);

      this._loopProps(element, PROPERTIES_WRAPPER);

      FwEvent.trigger(elem, EVENT_AFTER_RENDER_GRID);
    };

    _proto.renderBlocks = function renderBlocks() {
      var _this = this;

      this.UiChildren.forEach(function (child) {
        FwEvent.trigger(child, EVENT_BEFORE_RENDER_BLOCK);
        FwEvent.trigger(child, EVENT_RENDER_BLOCK);

        _this._loopProps(child, PROPERTIES_CHILDREN);

        FwEvent.trigger(child, EVENT_AFTER_RENDER_BLOCK);
      });
    };

    _proto.render = function render(elem) {
      elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);
      FwEvent.trigger(elem, EVENT_BEFORE_RENDER);
      FwEvent.trigger(elem, EVENT_RENDER);
      this.renderGrid(elem);
      this.renderBlocks();
      FwEvent.trigger(elem, EVENT_AFTER_RENDER);
    };

    ModuleGrid.handleUniversal = function handleUniversal() {
      return function () {
        FwEvent.trigger(document, EVENT_BEFORE_INIT$3);
        FwEvent.trigger(document, EVENT_INIT$3);
        var grids = document.querySelectorAll("." + COMPONENT_CLASS$8);
        grids.forEach(function (grid) {
          var moduleGrid = new ModuleGrid(grid);
          moduleGrid.render();
        });
        FwEvent.trigger(document, EVENT_AFTER_INIT$3);
      };
    };

    ModuleGrid.initListeners = function initListeners() {
      FwFnsQ.on_ready = ModuleGrid.handleUniversal();
      FwFnsQ.on_resize = ModuleGrid.handleUniversal();
    };

    _createClass(ModuleGrid, [{
      key: "UiChildren",
      get: function get() {
        return _FwComponent.prototype.UiEl.call(this).querySelectorAll("." + COMPONENT_CHILDREN_CLASS);
      }
    }], [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$9;
      }
    }]);

    return ModuleGrid;
  }(FwComponent);
  ModuleGrid.initListeners();

  var NAME$a = 'switch';
  var TOGGLE_MODE$3 = "" + NAME$a;
  var TOGGLE_MODE_ON = TOGGLE_MODE$3 + "-on";
  var TOGGLE_MODE_OFF = TOGGLE_MODE$3 + "-off";
  var COMPONENT_CLASS$9 = "" + FwString.ToDashed(NAME$a);
  var COMPONENT_CLASS_STATUS_OFF = COMPONENT_CLASS$9 + "-to-off";
  var COMPONENT_CLASS_STATUS_ON = COMPONENT_CLASS$9 + "-to-on";
  var COMPONENT_CLASS_IDLE = COMPONENT_CLASS$9 + "-idle";
  var DATA_KEY$a = FwCore.settings.prefix + "." + NAME$a;
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var EVENT_CLICK$8 = "click" + EVENT_KEY$a;
  var EVENT_BEFORE_INIT$4 = "before_init" + EVENT_KEY$a;
  var EVENT_INIT$4 = "init" + EVENT_KEY$a;
  var EVENT_AFTER_INIT$4 = "after_init" + EVENT_KEY$a;
  var EVENT_BEFORE_ON = "before_on" + EVENT_KEY$a;
  var EVENT_ON = "on" + EVENT_KEY$a;
  var EVENT_AFTER_ON = "after_on" + EVENT_KEY$a;
  var EVENT_BEFORE_OFF = "before_off" + EVENT_KEY$a;
  var EVENT_OFF = "off" + EVENT_KEY$a;
  var EVENT_AFTER_OFF = "after_off" + EVENT_KEY$a;

  var Switch = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(Switch, _FwComponent);

    function Switch(element, triggerer) {
      element = element || UiToggled(TOGGLE_MODE$3) || false;
      return _FwComponent.call(this, element, {
        _triggerer: triggerer ? new FwDom(triggerer) : false
      }) || this;
    }

    var _proto = Switch.prototype;

    _proto.dispose = function dispose() {
      _FwComponent.prototype.dispose.call(this);

      this._triggerer = null;
    };

    _proto.isOff = function isOff(elem) {
      var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);
      return element.classList.contains(COMPONENT_CLASS_STATUS_OFF);
    };

    _proto.isOn = function isOn(elem) {
      var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);
      return element.classList.contains(COMPONENT_CLASS_STATUS_ON) || !this.isOff();
    };

    _proto.isIdle = function isIdle(elem) {
      var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);
      element.classList.contains(COMPONENT_CLASS_IDLE);
    };

    _proto.turnOff = function turnOff(elem) {
      var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);
      FwEvent.trigger(document, EVENT_BEFORE_OFF);
      FwEvent.trigger(document, EVENT_OFF);
      element.classList.remove(COMPONENT_CLASS_STATUS_ON);
      element.classList.add(COMPONENT_CLASS_STATUS_OFF);
      FwEvent.trigger(document, EVENT_AFTER_OFF);
    };

    _proto.turnOn = function turnOn(elem) {
      var element = elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);
      FwEvent.trigger(document, EVENT_BEFORE_ON);
      FwEvent.trigger(document, EVENT_ON);
      element.classList.remove(COMPONENT_CLASS_STATUS_OFF);
      element.classList.add(COMPONENT_CLASS_STATUS_ON);
      FwEvent.trigger(document, EVENT_AFTER_ON);
    };

    _proto.toggle = function toggle(elem) {
      elem ? _FwComponent.prototype.UiEl.call(this, elem) : _FwComponent.prototype.UiEl.call(this);

      if (this.isOff()) {
        this.turnOn();
      } else {
        this.turnOff();
      }
    };

    Switch.purge = function purge(exempted) {
      UiPurge(exempted, "." + COMPONENT_CLASS$9 + ":not(." + COMPONENT_CLASS_IDLE + ")", function (elem) {
        new Switch(elem).turnOff();
      });
    };

    Switch.handleToggleOn = function handleToggleOn() {
      return function (e) {
        if (!FwComponent.isDisabled(e.target)) {
          var switcher = new Switch(UiToggled(TOGGLE_MODE$3, e.target), e.target);
          Switch.purge(UiToggled(TOGGLE_MODE$3, e.target));
          switcher.turnOn();
        } else {
          e.preventDefault();
        }
      };
    };

    Switch.handleToggleOff = function handleToggleOff() {
      return function (e) {
        if (!FwComponent.isDisabled(e.target)) {
          var switcher = new Switch(UiToggled(TOGGLE_MODE$3, e.target), e.target);
          switcher.turnOff();
        } else {
          e.preventDefault();
        }
      };
    };

    Switch.handleInit = function handleInit() {
      return function () {
        FwEvent.trigger(document, EVENT_BEFORE_INIT$4);
        FwEvent.trigger(document, EVENT_INIT$4);
        UiPurge(false, "." + COMPONENT_CLASS$9 + ":not(." + COMPONENT_CLASS_STATUS_ON + ")", function (elem) {
          console.log(elem);
          new Switch(elem).turnOff();
        });
        FwEvent.trigger(document, EVENT_AFTER_INIT$4);
      };
    };

    Switch.handleUniversal = function handleUniversal() {
      return function (e) {
        if (FwComponent.isDisabled(e.target)) {
          e.preventDefault();
        } else if (!FwComponent.isDynamic(e.target)) {
          if (!e.target.closest("[data-toggle=\"" + TOGGLE_MODE_ON + "\"]") && !e.target.closest("[data-toggle=\"" + TOGGLE_MODE_OFF + "\"]") && !e.target.closest("." + COMPONENT_CLASS$9)) {
            Switch.purge();
          }
        }
      };
    };

    Switch.initListeners = function initListeners() {
      FwEvent.addListener(document.documentElement, EVENT_CLICK$8, "*[data-toggle=\"" + TOGGLE_MODE_OFF + "\"]", Switch.handleToggleOff());
      FwEvent.addListener(document.documentElement, EVENT_CLICK$8, "*[data-toggle=\"" + TOGGLE_MODE_ON + "\"]", Switch.handleToggleOn());
      FwEvent.addListener(document.documentElement, EVENT_CLICK$8, "*", Switch.handleUniversal());
      FwFnsQ.on_ready = Switch.handleInit();
    };

    _createClass(Switch, null, [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$a;
      }
    }]);

    return Switch;
  }(FwComponent);
  Switch.initListeners();

  var NAME$b = 'tabs';
  var COMPONENT_CLASS$a = "" + FwString.ToDashed(NAME$b);
  var COMPONENT_CHILDREN_CLASS$1 = 'tab';
  var COMPONENT_CHILDREN_TAG = 'li';
  var ACTIVATED_CLASS$5 = "active";
  var DATA_KEY$b = FwCore.settings.prefix + "." + NAME$b;
  var EVENT_KEY$b = "." + DATA_KEY$b;
  var EVENT_CLICK$9 = "click" + EVENT_KEY$b;

  var Tabs = /*#__PURE__*/function (_FwComponent) {
    _inheritsLoose(Tabs, _FwComponent);

    function Tabs() {
      return _FwComponent.apply(this, arguments) || this;
    }

    var _proto = Tabs.prototype;

    _proto.UiChildren = function UiChildren() {
      return _FwComponent.prototype.UiEl.call(this).querySelectorAll("." + COMPONENT_CHILDREN_CLASS$1);
    };

    _proto.target = function target(element) {
      if (element) return new FwDom(element).closest("." + COMPONENT_CHILDREN_CLASS$1);
    };

    _proto.activate = function activate(target) {
      var theTab = this.target(target);

      if (!theTab) {
        return false;
      }

      if (!theTab.classList.contains("" + ACTIVATED_CLASS$5)) {
        var triggererSiblings = frameWork.getSiblings(theTab);
        triggererSiblings.filter(function (sibling) {
          return sibling.matches("." + COMPONENT_CHILDREN_CLASS$1) || sibling.matches("" + COMPONENT_CHILDREN_TAG);
        }).forEach(function (sibling) {
          sibling.classList.remove("" + ACTIVATED_CLASS$5);
        });
        theTab.classList.add("" + ACTIVATED_CLASS$5);
      }
    };

    Tabs.handleClick = function handleClick() {
      return function (e) {
        if (frameWork.isDisabled(triggerer)) {
          e.preventDefault();
        } else {
          var tabs = new Tabs(e.target.closest('.tabs'));
          tabs.activate(e.target);
        }
      };
    };

    Tabs.initListeners = function initListeners() {
      FwEvent.addListener(document, EVENT_CLICK$9, "." + COMPONENT_CLASS$a + " > " + COMPONENT_CHILDREN_TAG + " > *, ." + COMPONENT_CHILDREN_CLASS$1 + ", ." + COMPONENT_CHILDREN_CLASS$1 + " > *", Tabs.handleClick());
    };

    _createClass(Tabs, null, [{
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$b;
      }
    }]);

    return Tabs;
  }(FwComponent);
  Tabs.initListeners();
  FwEvent.addListener(document.documentElement, 'click', '.tab, .tab > *', function (e) {
    var triggerer = e.target;

    if (frameWork.isDisabled(triggerer)) {
      e.preventDefault();
    } else {
      var theTab = triggerer.closest('.tab');

      if (theTab) {
        if (!theTab.classList.contains('active')) {
          var triggererSiblings = frameWork.getSiblings(theTab);
          triggererSiblings.filter(function (sibling) {
            return sibling.matches('.tab') || sibling.matches('li');
          }).forEach(function (sibling) {
            sibling.classList.remove('active');
          });
          theTab.classList.add('active');
        }
      }
    }
  });

  // import FwArrayay from './src/data-helper/array.js';
  var FrameWork = {
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
    Tabs: Tabs
  };

  return FrameWork;

})));
