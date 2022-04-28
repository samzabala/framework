import Initiator from './core/initiator.js';
import Settings from './core/settings.js';

// import FwDom from './data-helper/dom.js';
import FwString from './data-helper/string.js';
import FwEvent from './data-helper/event.js';

import FwComponent from './classes/component.js';
import { UIPurge, UIToggled, UIChangeHash } from './util/ui.js';

const NAME = 'scroller';
const ARG_ATTRIBUTE_NAME = `${NAME}`;
const TOGGLE_MODE = `${NAME}`;
const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}`;
const ACTIVATED_CLASS = `active`;

const DATA_KEY = `${Settings.get('prefix')}_${NAME}`;

const EVENT_KEY = `_${DATA_KEY}`;
const EVENT_HASHCHANGE = `hashchange${EVENT_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;

const EVENT_BEFORE_TRACK = `before_track${EVENT_KEY}`;
const EVENT_TRACK = `track${EVENT_KEY}`;
const EVENT_AFTER_TRACK = `after_track${EVENT_KEY}`;

class Scroller extends FwComponent {
  constructor(element, triggerer, args) {
    element = element || UIToggled(TOGGLE_MODE) || false;
    super(element, {
      triggerer: triggerer
        ? triggerer
        : element && element._triggerer
        ? element._triggerer
        : false,
      _customArgs: args
        ? args
        : element && element.__customArgs
        ? element.__customArgs
        : {},
    });
  }

  dispose() {
    super.setProp('triggerer', '__dispose');
    super.setProp('_customArgs', '__dispose');
    super.dispose();
  }

  static get DATA_KEY() {
    return DATA_KEY;
  }

  static configDefaults() {
    return {
      changeHash: true,
      offset: null,
    };
  }

  get args() {
    return FwComponent._parseArgs(
      {
        changeHash:
          this.triggerer &&
          this.triggerer.hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-change-hash`)
            ? this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-change-hash`)
            : super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-change-hash`)
            ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-change-hash`)
            : this._customArgs.changeHash,
        offset:
          this.triggerer &&
          this.triggerer.hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-offset`)
            ? this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-offset`)
            : super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-offset`)
            ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-offset`)
            : this._customArgs.offset,
      },
      Scroller.configDefaults()
    );
  }

  get _id() {
    return super.UIEl().hasAttribute('id') ? super.UIEl().getAttribute('id') : false;
  }

  // static scrollAncestor(elem,coord){
  //   coord = coord || 'y';
  //   const element = elem || this.element;

  //   const methods = coord == 'x' ? ['scrollWidth','clientWidth'] : ['scrollHeight','clientHeight']

  //   if (element[methods[0]] > element[methods[1]]) {
  //     return element;
  //   } else {
  //     return scrollAncestor(element.parentNode);
  //   }
  // }

  offset() {
    return this.args.offset && !isNaN(parseFloat(this.args.offset))
      ? parseFloat(this.args.offset)
      : 0;
  }

  get allTriggers() {
    return document.querySelectorAll(`*[data-toggle-${TOGGLE_MODE}]`);
  }

  size(coord) {
    const element = super.UIEl();
    coord = coord || 'y';
    return coord == 'x' ? element.offsetWidth : element.offsetHeight;
  }

  scrollCoord(coord) {
    coord = coord || 'y';
    const element = super.UIEl();
    if (coord == 'x') {
      return element.getBoundingClientRect().left + window.scrollX;
    } else {
      return element.getBoundingClientRect().top + window.scrollY;
    }
  }

  start(coord) {
    coord = coord || 'y';
    return this.scrollCoord(coord);
  }

  end(coord) {
    coord = coord || 'y';
    return this.start(coord) + this.size(coord);
  }

  static purge(exempted) {
    UIPurge(exempted, `.${COMPONENT_CLASS}`, (elem) => {
      new Scroller(elem)._deactivate();
    });
  }

  _activate(elem) {
    const element = elem ? super.UIEl(elem) : this.element;

    Scroller.purge(element);

    element.classList.add(ACTIVATED_CLASS);
    if (this.triggerer) {
      this.triggerer.classList.add(ACTIVATED_CLASS);
    }
    if (this.args.changeHash && this._id) {
      UIChangeHash(this._id);
    }
  }
  _deactivate(elem) {
    const element = elem ? super.UIEl(elem) : this.element;

    element.classList.remove(ACTIVATED_CLASS);
    if (this.triggerer) {
      this.triggerer.classList.remove(ACTIVATED_CLASS);
    }

    if (this.args.changeHash && this._id) {
      UIChangeHash('');
    }
  }

  track(elem, triggerer) {
    const element = elem ? super.UIEl(elem) : this.element;

    if (!element) {
      return false;
    }

    triggerer = triggerer || this.triggerer;
    this.triggerer = triggerer;

    super.runCycle(
      EVENT_BEFORE_TRACK,
      EVENT_TRACK,
      EVENT_AFTER_TRACK,
      () => {
        if (
          window.scrollY + this.offset() > this.start() &&
          (!this.args.selfRevert ||
            (this.args.selfRevert && window.scrollY > this.end()))
        ) {
          this._activate(element);
        } else {
          this._deactivate(element);
        }
      },
      element
    );
  }

  static handleScroll() {
    return () => {
      const scrollers = document.querySelectorAll(`.${COMPONENT_CLASS}`);
      scrollers.forEach((sc) => {
        const scroller = new Scroller(sc);
        scroller.track();
      });
    };
  }

  static handleToggler() {
    return (e) => {
      e.preventDefault();
      if (!FwComponent.isDisabled(e.target)) {
        const toggled = new Scroller(UIToggled(TOGGLE_MODE, e.target));

        if (toggled) {
          window.scrollTo({
            top: toggled.scrollCoord(),
            left: toggled.scrollCoord('x'),
          });
        }
      }
    };
  }

  static handleHash() {
    return () => {
      if (Settings.get('initializeScroller')) {
        const scroller = new Scroller();
        scroller.track();
      }
    };
  }

  static initListeners() {
    FwEvent.addListener(null, EVENT_HASHCHANGE, window, Scroller.handleHash());
    FwEvent.addListener(
      document.documentElement,
      EVENT_CLICK,
      `*[data-toggle-${TOGGLE_MODE}]`,
      Scroller.handleToggler()
    );

    Initiator.Q.on_ready = Scroller.handleHash();
    Initiator.Q.on_scroll = Scroller.handleScroll();
  }

  static destroyListeners() {
    FwEvent.removeListener(window, EVENT_HASHCHANGE, Scroller.handleHash());
    FwEvent.removeListener(
      document.documentElement,
      EVENT_CLICK,
      Scroller.handleToggler()
    );
  }
}

export default Scroller;

Scroller.initListeners();
