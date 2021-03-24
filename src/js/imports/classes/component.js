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
      }
    }
  }

  dispose() {
    DataHandler.delete(this.element, this.constructor.DATA_KEY, this);
    this.element = null;
  }

  static getInstance(element) {
    return DataHandler.get(element, this.DATA_KEY);
  }

  runCycle(beforeEvt, duringEvt, AfterEvt, callback, triggeredElem) {
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
      if (
        typeof defaults[prop] === 'object' &&
        defaults[prop] !== null &&
        arr[prop] !== '' &&
        defaults[prop].hasOwnProperty('value')
      ) {
        args[prop] = defaults[prop].value;
      } else {
        args[prop] = defaults[prop];
      }
    }

    for (let prop in arr) {
      if (
        arr.hasOwnProperty(prop) &&
        arr[prop] !== undefined &&
        arr[prop] !== null &&
        arr[prop] !== ''
      ) {
        // Push each value from `obj` into `extended`
        if (
          typeof defaults[prop] === 'object' &&
          defaults[prop] !== null &&
          defaults[prop].hasOwnProperty('value') &&
          defaults[prop].hasOwnProperty('parser')
        ) {
          args[prop] = defaults[prop].parser(arr[prop]);
        } else {
          args[prop] = arr[prop];
        }

        // catch boolean
        if (args[prop] == 'false' || args[prop] == 'true') {
          args[prop] = args[prop] == 'true' ? true : false;
        }
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
