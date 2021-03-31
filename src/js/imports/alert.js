import Settings from './core/settings.js';

import FwEvent from './data-helper/event.js';
import FwString from './data-helper/string.js';

import FwComponent from './classes/component.js';
import { UIToggled } from './util/ui.js';

const NAME = 'alert';
const TOGGLE_MODE = `${NAME}-close`;
const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}`;

const DATA_KEY = `${Settings.get('prefix')}_${NAME}`;

const EVENT_KEY = `_${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;

const EVENT_BEFORE_CLOSE = `before_close${EVENT_KEY}`;
const EVENT_CLOSE = `close${EVENT_KEY}`;
const EVENT_AFTER_CLOSE = `after_close${EVENT_KEY}`;

class Alert extends FwComponent {
  static get DATA_KEY() {
    return DATA_KEY;
  }

  close(elem) {
    const element = elem ? super.UIEl(elem) : this.element;

    if (!element) {
      return;
    }

    super.runCycle(
      EVENT_BEFORE_CLOSE,
      EVENT_CLOSE,
      EVENT_AFTER_CLOSE,
      () => {
        element.parentNode.removeChild(element);
      },
      element
    );
  }

  static closeAll() {
    const selector = document.querySelectorAll(`.${COMPONENT_CLASS}`);

    if (selector.length) {
      selector.forEach((instance) => {
        if (
          instance.querySelectorAll('[data-toggle-alert-close]').length ||
          instance.classList.contains(`${NAME}-closeable`)
        ) {
          const alertInstance = new Alert(instance);
          alertInstance.close();
        }
      });
    }
  }

  static handleClose() {
    return (e) => {
      e.preventDefault();

      if (!FwComponent.isDisabled(e.target)) {
        const alert = new Alert(UIToggled(TOGGLE_MODE, e.target));
        alert.close();
      }
    };
  }

  static handleCloseAll() {
    return (e) => {
      e.preventDefault();

      if (!FwComponent.isDisabled(e.target)) {
        Alert.closeAll();
      }
    };
  }

  static initListeners() {
    FwEvent.addListener(
      document.documentElement,
      EVENT_CLICK,
      `*[data-toggle-${TOGGLE_MODE}]`,
      Alert.handleClose()
    );

    FwEvent.addListener(
      document.documentElement,
      EVENT_CLICK,
      `*[data-toggle-${TOGGLE_MODE}-all]`,
      Alert.handleCloseAll()
    );
  }

  static destroyListeners() {
    FwEvent.removeListener(document.documentElement, EVENT_CLICK, Alert.handleClose());

    FwEvent.removeListener(window, EVENT_CLICK, Alert.handleCloseAll());
  }
}

export default Alert;

Alert.initListeners();
