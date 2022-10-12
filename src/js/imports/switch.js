import Initiator from './core/initiator.js';
import Settings from './core/settings.js';

import FwEvent from './data-helper/event.js';
import FwString from './data-helper/string.js';

import FwComponent from './classes/component.js';
import { UIToggled, UIPurge } from './util/ui.js';

const NAME = 'switch';
const TOGGLE_MODE = `${NAME}`;
const TOGGLE_MODE_ON = `${TOGGLE_MODE}-on`;
const TOGGLE_MODE_OFF = `${TOGGLE_MODE}-off`;
const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}`;
const COMPONENT_CLASS_STATUS_OFF = `${COMPONENT_CLASS}-to-off`;
const COMPONENT_CLASS_STATUS_ON = `${COMPONENT_CLASS}-to-on`;
const COMPONENT_CLASS_IDLE = `${COMPONENT_CLASS}-idle`;

const DATA_KEY = `${Settings.get('prefix')}_${NAME}`;

const EVENT_KEY = `_${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;
const EVENT_CLICK_PURGE = `click${EVENT_KEY}_purge`;

const EVENT_BEFORE_INIT = `before_init${EVENT_KEY}`;
const EVENT_INIT = `init${EVENT_KEY}`;
const EVENT_AFTER_INIT = `after_init${EVENT_KEY}`;

const EVENT_BEFORE_ON = `before_on${EVENT_KEY}`;
const EVENT_ON = `on${EVENT_KEY}`;
const EVENT_AFTER_ON = `after_on${EVENT_KEY}`;

const EVENT_BEFORE_OFF = `before_off${EVENT_KEY}`;
const EVENT_OFF = `off${EVENT_KEY}`;
const EVENT_AFTER_OFF = `after_off${EVENT_KEY}`;

class Switch extends FwComponent {
  constructor(element) {
    element = element || UIToggled(TOGGLE_MODE) || false;

    super(element);
  }

  static get DATA_KEY() {
    return DATA_KEY;
  }

  isOff(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();
    return element.classList.contains(COMPONENT_CLASS_STATUS_OFF);
  }

  isOn(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    return element.classList.contains(COMPONENT_CLASS_STATUS_ON) || !this.isOff();
  }

  isIdle(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    element.classList.contains(COMPONENT_CLASS_IDLE);
  }

  //catch bois that re not off
  init(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    if (
      !element.classList.contains(COMPONENT_CLASS_STATUS_ON) &&
      !element.classList.contains(COMPONENT_CLASS_STATUS_OFF)
    ) {
      element.classList.add(COMPONENT_CLASS_STATUS_OFF);
    }
  }
  turnOff(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    if (this.isOn()) {
      super.runCycle(
        EVENT_BEFORE_OFF,
        EVENT_OFF,
        EVENT_AFTER_OFF,
        () => {
          element.classList.remove(COMPONENT_CLASS_STATUS_ON);
          element.classList.add(COMPONENT_CLASS_STATUS_OFF);
        },
        element
      );
    }
  }

  turnOn(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    if (this.isOff()) {
      super.runCycle(
        EVENT_BEFORE_ON,
        EVENT_ON,
        EVENT_AFTER_ON,
        () => {
          element.classList.remove(COMPONENT_CLASS_STATUS_OFF);
          element.classList.add(COMPONENT_CLASS_STATUS_ON);
        },
        element
      );
    }
  }

  toggle(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    if (this.isOff()) {
      this.turnOn(element);
    } else {
      this.turnOff(element);
    }
  }

  static purge(exempted) {
    UIPurge(exempted, `.${COMPONENT_CLASS}:not(.${COMPONENT_CLASS_IDLE})`, (elem) => {
      new Switch(elem).turnOff();
    });
  }

  static handleToggleOn() {
    return (e) => {
      e.preventDefault();

      if (!FwComponent.isDisabled(e.target)) {
        const switchElement = new Switch(UIToggled(TOGGLE_MODE, e.target));
        Switch.purge(UIToggled(TOGGLE_MODE, e.target));
        switchElement.turnOn();
      }
    };
  }

  static handleToggleOff() {
    return (e) => {
      e.preventDefault();

      if (!FwComponent.isDisabled(e.target)) {
        const switchElement = new Switch(UIToggled(TOGGLE_MODE, e.target));
        switchElement.turnOff();
      }
    };
  }

  static handleToggle() {
    return (e) => {
      e.preventDefault();

      if (!FwComponent.isDisabled(e.target)) {
        const switchElement = new Switch(UIToggled(TOGGLE_MODE, e.target));
        switchElement.toggle();
      }
    };
  }

  static handleInit() {
    return () => {
      new Switch().runCycle(
        EVENT_BEFORE_INIT,
        EVENT_INIT,
        EVENT_AFTER_INIT,
        () => {
          UIPurge(
            false,
            `.${COMPONENT_CLASS}:not(${COMPONENT_CLASS_STATUS_ON})`,
            (elem) => {
              new Switch(elem).init();
            }
          );
        },
        document
      );
    };
  }

  static handleUniversalPurge() {
    return (e) => {
      if (FwComponent.isDisabled(e.target)) {
        e.preventDefault();
      } else if (!FwComponent.isDynamic(e.target)) {
        if (
          !e.target.closest(`[data-toggle-${TOGGLE_MODE_ON}]`) &&
          !e.target.closest(`[data-toggle-${TOGGLE_MODE_OFF}]`) &&
          !e.target.closest(`[data-toggle-${TOGGLE_MODE}]`) &&
          !e.target.closest(`.${COMPONENT_CLASS}`)
        ) {
          Switch.purge();
        }
      }
    };
  }

  static initListeners() {
    FwEvent.addListener(
      document.documentElement,
      EVENT_CLICK,
      `*[data-toggle-${TOGGLE_MODE_ON}]`,
      Switch.handleToggleOn()
    );

    FwEvent.addListener(
      document.documentElement,
      EVENT_CLICK,
      `*[data-toggle-${TOGGLE_MODE_OFF}]`,
      Switch.handleToggleOff()
    );

    FwEvent.addListener(
      document.documentElement,
      EVENT_CLICK,
      `*[data-toggle-${TOGGLE_MODE}]`,
      Switch.handleToggle()
    );

    FwEvent.addListener(
      document.documentElement,
      EVENT_CLICK_PURGE,
      `*`,
      Switch.handleUniversalPurge()
    );

    Initiator.Q.on_ready = Switch.handleInit();
  }
  static destroyListeners() {
    FwEvent.removeListener(
      document.documentElement,
      EVENT_CLICK,
      Switch.handleToggleOff()
    );

    FwEvent.removeListener(
      document.documentElement,
      EVENT_CLICK,
      Switch.handleToggleOn()
    );

    FwEvent.removeListener(
      document.documentElement,
      EVENT_CLICK,
      Switch.handleToggle()
    );

    FwEvent.removeListener(
      document.documentElement,
      EVENT_CLICK_PURGE,
      Switch.handleUniversalPurge()
    );
  }
}

export default Switch;

Switch.initListeners();
