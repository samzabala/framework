import Settings from './../core/settings.js';
import FwDataHelper from './../classes/data-helper.js';
// const customEvents = [];
const NativeEvents = [
  'click',
  'dblclick',
  'mouseup',
  'mousedown',
  'contextmenu',
  'mousewheel',
  'DOMMouseScroll',
  'mouseover',
  'mouseout',
  'mousemove',
  'selectstart',
  'selectend',
  'keydown',
  'keypress',
  'keyup',
  'paste',
  'orientationchange',
  'touchstart',
  'touchmove',
  'touchend',
  'touchcancel',
  'pointerdown',
  'pointermove',
  'pointerup',
  'pointerleave',
  'pointercancel',
  'gesturestart',
  'gesturechange',
  'gestureend',
  'focus',
  'blur',
  'change',
  'reset',
  'select',
  'submit',
  'focusin',
  'focusout',
  'load',
  'unload',
  'beforeunload',
  'resize',
  'move',
  'DOMContentLoaded',
  'readystatechange',
  'error',
  'abort',
  'scroll',
  'hashchange',
];
let FWESIDEvent = 0;

const EVENT_STORAGE = {};

class FwEvent extends FwDataHelper {
  static getEventSorageId(element, FWESID) {
    const toReturn = FWESID || element.FWESIDEvent || FWESIDEvent++;

    element.FWESIDEvent = toReturn;
    // debugger;
    return toReturn;
  }

  static getListenerArgs(element) {
    const FWESID = FwEvent.getEventSorageId(element);

    EVENT_STORAGE[FWESID] = EVENT_STORAGE[FWESID] || {};

    return EVENT_STORAGE[FWESID];
  }

  static saveListenerArgs(element, evt, evtNoApi, handler, handlerNoApi, trueHandler) {
    const FWESID = FwEvent.getEventSorageId(element, evt);

    EVENT_STORAGE[FWESID] = {};

    if (evt !== null) EVENT_STORAGE[FWESID].evt = evt;
    if (evtNoApi !== null) EVENT_STORAGE[FWESID].evtNoApi = evtNoApi;
    if (handler !== null) EVENT_STORAGE[FWESID].handler = handler;
    if (handlerNoApi !== null) EVENT_STORAGE[FWESID].handlerNoApi = handlerNoApi;
    if (trueHandler !== null) EVENT_STORAGE[FWESID].trueHandler = trueHandler;
  }

  static deleteListenerArgs(element) {
    const FWESID = FwEvent.getEventSorageId(element);
    delete element.FWESIDEvent;
    delete EVENT_STORAGE[FWESID];
  }

  static classNester(selector) {
    if (selector === '*' || typeof selector !== 'string') {
      return selector;
    } else {
      const selArr = selector.split(',');
      let toReturn = selector;
      selArr.forEach((sel) => {
        toReturn += `, ${sel} *`;
      });

      return toReturn;
    }
  }

  // static isNative(evtName) {
  //   return NativeEvents.filter((nativeEvt) => {
  //     return evtName.includes(nativeEvt);
  //   }).length > 0;
  // }

  static addListener(parent, evt, selectorOrParentFallback, handler) {
    parent = parent || false;

    // runNative = runNative !== false || runNative == true; //no apipipi
    //dai mo ilaag sa ddocument ta maerror si matches habo nya ki element

    const remember = {
      evt: evt,
      evtNoApi: null,
      handler: null,
      handlerNoApi: null,
      trueHandler: handler,
    };

    const element = parent || selectorOrParentFallback;
    const evtNoApi = evt.split(`_${Settings.get('prefix')}`)[0];
    const isNative = NativeEvents.includes(evt);

    if (!isNative) {
      remember.evtNoApi = evtNoApi;
      remember.handler = (event) => {
        if (
          !parent ||
          (parent &&
            event.target.matches(FwEvent.classNester(selectorOrParentFallback)))
          // && event.target.closest(selectorOrParentFallback)
        ) {
          FwEvent.trigger(event.target, evt, {
            detail: {
              nativeEvt: event,
              _selection: FwEvent.classNester(selectorOrParentFallback),
              bubbles: true,
              cancelable: true,
            },
          });
        }
      };
    }

    remember.handlerNoApi = (event) => {
      if (
        !parent ||
        (parent &&
          // && event.target.matches(FwEvent.classNester(selectorOrParentFallback))
          event.target.closest(selectorOrParentFallback))
      ) {
        handler(event);
      }
    };

    FwEvent.saveListenerArgs(
      element,
      remember.evt,
      remember.evtNoApi,
      remember.handler,
      remember.handlerNoApi,
      remember.trueHandler
    );
    const FWESID = FwEvent.getEventSorageId(element);

    if (!isNative) {
      element.addEventListener(
        EVENT_STORAGE[FWESID].evtNoApi,
        EVENT_STORAGE[FWESID].handlerNoApi,
        true
      );
    }

    element.addEventListener(
      EVENT_STORAGE[FWESID].evt,
      EVENT_STORAGE[FWESID].handler,
      true
    );
  }

  static removeListener(element, evt, handler) {
    const FWESID = FwEvent.getEventSorageId(element);

    // const evtNoApi = evt.split(`_${Settings.get('prefix')}`)[0];
    const isNative = NativeEvents.includes(evt);

    if (handler === EVENT_STORAGE[FWESID].trueHandler) {
      if (!isNative) {
        // element.removeEventListener(evtNoApi, handler, true);
        element.removeEventListener(
          EVENT_STORAGE[FWESID].evt,
          EVENT_STORAGE[FWESID].handler,
          true
        );
      }
      element.removeEventListener(
        EVENT_STORAGE[FWESID].evtNoApi,
        EVENT_STORAGE[FWESID].handlerNoApi,
        true
      );

      FwEvent.deleteListenerArgs(element);
    }
  }

  static trigger(el, evt, customEventOpts) {
    let event;
    el = el || document;
    if (NativeEvents.includes(evt)) {
      event = document.createEvent('HTMLEvents');
      event.initEvent(evt, true, false);
    } else {
      customEventOpts = customEventOpts || {
        bubbles: true,
        cancelable: true,
      };
      if (customEventOpts) {
        event = new Event(evt, customEventOpts);
      } else {
        event = new Event(evt);
      }
    }

    el.dispatchEvent(event);

    return event;
  }
}

export default FwEvent;
