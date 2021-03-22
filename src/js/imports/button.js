import Settings from './core/settings.js';

import FwEvent from './data-helper/event.js';
import FwString from './data-helper/string.js';

import FwComponent from './classes/component.js';
import { UIToggleGroup } from './util/ui.js';

const NAME = 'btn';
const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}`;

const DATA_KEY = `${Settings.get('prefix')}.${NAME}`;

const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;

const EVENT_BEFORE_TOGGLE = `before_toggle${EVENT_KEY}`;
const EVENT_TOGGLE = `toggle${EVENT_KEY}`;
const EVENT_AFTER_TOGGLE = `after_toggle${EVENT_KEY}`;

class Button extends FwComponent {
  static get DATA_KEY() {
    return DATA_KEY;
  }

  toggle(elem) {
    const element = elem ? super.UIEl(elem) : this.element;

    if (!element) {
      return;
    }

    FwEvent.trigger(element, EVENT_BEFORE_TOGGLE);
    FwEvent.trigger(element, EVENT_TOGGLE);
    UIToggleGroup(element, NAME);
    FwEvent.trigger(element, EVENT_AFTER_TOGGLE);
  }

  static handleToggle() {
    return (e) => {
      e.preventDefault();

      if (!FwComponent.isDisabled(e.target)) {
        const button = new Button(e.target);
        button.toggle();
      }
    };
  }

  static initListeners() {
    FwEvent.addListener(
      document.documentElement,
      EVENT_CLICK,
      `.${COMPONENT_CLASS}-group-toggle > .${COMPONENT_CLASS}`,
      Button.handleToggle()
    );
  }

  static destroyListeners() {
    FwEvent.removeListener(
      document.documentElement,
      EVENT_CLICK,
      Button.handleToggle()
    );
  }
}

export default Button;

Button.initListeners();
