import Settings from './core/settings.js';

import FwEvent from './data-helper/event.js';
import FwString from './data-helper/string.js';
import FwDom from './data-helper/dom.js';

import FwComponent from './classes/component.js';
import { UIToggleGroup } from './util/ui.js';

const NAME = 'listGroup';
const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}-toggle`; //coz toggling shit only work when this class is heeerr

const CHILD_CLASS = `${FwString.ToDashed(NAME)}-item`;
const COMPONENT_TOGGLEGROUP_PREFIX = `list`;

const DATA_KEY = `${Settings.get('prefix')}_${NAME}`;

const EVENT_KEY = `_${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;

const EVENT_BEFORE_TOGGLE = `before_toggle${EVENT_KEY}`;
const EVENT_TOGGLE = `toggle${EVENT_KEY}`;
const EVENT_AFTER_TOGGLE = `after_toggle${EVENT_KEY}`;

class ListGroup extends FwComponent {
  constructor(element, triggeredChild) {
    element = element || false;
    super(element, {
      _triggeredChild: triggeredChild ? new FwDom(triggeredChild) : false,
    });
  }

  static get DATA_KEY() {
    return DATA_KEY;
  }

  get UITriggeredChild() {
    return this._triggeredChild;
  }

  set UITriggeredChild(triggd) {
    if (FwDom.isDescendant(super.UIEl(), triggd)) {
      this._triggeredChild = triggd;
    }
  }

  toggle(triggd) {
    const triggeredChild = triggd ? triggd : this.UITriggeredChild;

    this.UITriggeredChild = triggeredChild;

    if (!triggeredChild || !FwDom.isDescendant(super.UIEl(), triggeredChild)) {
      return;
    }

    super.runCycle(
      EVENT_BEFORE_TOGGLE,
      EVENT_TOGGLE,
      EVENT_AFTER_TOGGLE,
      () => {
        UIToggleGroup(
          this.UITriggeredChild,
          `${COMPONENT_TOGGLEGROUP_PREFIX}`,
          null,
          `li, .${CHILD_CLASS}`
        );
      },
      this.UITriggeredChild
    );
  }

  static handleToggle() {
    return (e) => {
      e.preventDefault();

      if (!FwComponent.isDisabled(e.target)) {
        const listGroup = new ListGroup(
          e.target.parentNode.closest(`.${COMPONENT_CLASS}`)
        );
        listGroup.toggle(e.target);
      }
    };
  }

  static initListeners() {
    FwEvent.addListener(
      document.documentElement,
      EVENT_CLICK,
      `.${COMPONENT_CLASS} > .${CHILD_CLASS}, .${COMPONENT_CLASS} > li`,
      ListGroup.handleToggle()
    );
  }

  static destroyListeners() {
    FwEvent.removeListener(
      document.documentElement,
      EVENT_CLICK,
      ListGroup.handleToggle()
    );
  }
}

export default ListGroup;

ListGroup.initListeners();
