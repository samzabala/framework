import DataHandler from './../util/datahandler.js';
import FwEvent from './../data-helper/event.js';
import { DisableClasses } from './../util/validation.js';
import { UIDynamicClass } from './../util/ui.js';

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

class FwComponent {
  constructor(element, props) {
    if (!element) {
      return;
    }

    DataHandler.set(element, this.constructor.DATA_KEY, this);
    this.element = element;

    if (typeof props === 'object') {
      for (let key in props) {
        this[key] = props[key];
        this.element[`_${key}`] = props[key];
      }
    }
  }

  dispose() {
    DataHandler.delete(this.element, this.constructor.DATA_KEY, this);
    this.element = null;
  }

  setProp(key, value) {
    if (!key) return;
    if (value === '__dispose') {
      delete this[key];
      delete this.element[`_${key}`];
    } else {
      this[key] = value;
      this.element[`_${key}`] = value;
    }
  }

  getProp(key) {
    if (!key) return;
    return this.element[`_${key}`];
  }

  static getInstance(element) {
    return DataHandler.get(element, this.DATA_KEY);
  }

  runCycle(beforeEvt, duringEvt, AfterEvt, callbacks, triggeredElem) {
    triggeredElem = triggeredElem || this.UIEl();
    if (!beforeEvt || !duringEvt || !AfterEvt) {
      return;
    }

    let callBackBefore,
      callBackDuring,
      callbackAfter,
      callbackSuccessBefore = true,
      callbackSuccessDuring = true;
    if (typeof callbacks === 'function') {
      callBackDuring = callbacks;
    } else if (
      typeof callbacks === 'object' &&
      !Array.isArray(callbacks) &&
      callbacks !== null
    ) {
      callBackBefore = callbacks.before;
      callBackDuring = callbacks.during;
      callbackAfter = callbacks.after;
    }

    if (FwEvent.trigger(triggeredElem, beforeEvt)) {
      // console.log('before event');
      if (typeof callBackBefore === 'function') {
        const callbackReturnBefore = callBackBefore(this);
        callbackSuccessBefore =
          callbackReturnBefore === false ? callbackReturnBefore : true;
      }

      const continueDuring =
        callbackSuccessBefore && FwEvent.trigger(triggeredElem, duringEvt);
      if (continueDuring) {
        // console.log('during event');
        if (typeof callBackDuring === 'function') {
          const callbackReturnDuring = callBackDuring(this);
          callbackSuccessDuring =
            callbackReturnDuring === false ? callbackReturnDuring : true;
        }

        const continueAfter =
          callbackSuccessDuring && FwEvent.trigger(triggeredElem, AfterEvt);
        if (continueAfter) {
          if (typeof callbackAfter === 'function') {
            callbackAfter(this);
          }
        }
      }
    }
  }

  UIEl(elem) {
    if (elem) {
      this._resetUIEl(elem);
    }
    return this.element;
  }

  _resetUIEl(element) {
    if (element) {
      this.element = element;
    }
  }

  _runFn(callback) {
    if (callback) {
      let fn;
      try {
        fn = eval(/^[^(]+/.exec(callback)[0]);
      } catch (err) {
        console.error(err);
      }
      if (typeof fn === 'function') {
        eval(callback);
      }
    }
  }

  _setInitState(beforeEvent, happeningEvent, afterEvent, callback) {
    callback = callback || false;

    if (callback) {
      FwEvent.trigger(element, beforeEvent);
      FwEvent.trigger(element, happeningEvent);

      callback(this.element);

      FwEvent.trigger(element, afterEvent);
    }
  }

  static _parseArgs(arr, defaults) {
    const args = {};

    for (let prop in defaults) {
      //defaults
      if (
        typeof defaults[prop] === 'object' &&
        defaults[prop] !== null &&
        defaults[prop].hasOwnProperty('value')
      ) {
        args[prop] = defaults[prop].value;
      } else {
        args[prop] = defaults[prop];
      }

      //custom
      if (
        arr.hasOwnProperty(prop) &&
        arr[prop] !== undefined &&
        arr[prop] !== null &&
        arr[prop] !== ''
      ) {
        args[prop] = arr[prop];
      }

      //validate
      if (
        typeof defaults[prop] === 'object' &&
        defaults[prop] !== null &&
        defaults[prop].hasOwnProperty('parser')
      ) {
        args[prop] = defaults[prop].parser(args[prop]);
      }

      // catch boolean
      if (args[prop] == 'false' || args[prop] == 'true') {
        args[prop] = args[prop] == 'true' ? true : false;
      }
    }

    return args;
  }

  static isDisabled(elem) {
    if (!elem) {
      return;
    }

    let toReturn = false;

    if (elem.closest('[disabled]') || elem.matches(':disabled')) {
      toReturn = true;
    }

    DisableClasses.forEach((classString) => {
      if (elem.closest(`.${classString}`) && !toReturn) {
        toReturn = true;
      }
    });

    return toReturn;
  }
  static isDynamic(elem) {
    return elem.classList.contains(UIDynamicClass);
  }
}

export default FwComponent;
