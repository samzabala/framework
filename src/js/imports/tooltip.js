import Initiator from './core/initiator.js';
import Settings from './core/settings.js';
import { Palette } from './util/validation.js';

import FwEvent from './data-helper/event.js';
import FwString from './data-helper/string.js';

import FwComponent from './classes/component.js';

const NAME = 'tooltip';

const TOGGLE_MODE_CLICK = `${NAME}-click`;
const TOGGLE_MODE_HOVER = `${NAME}-hover`;
const ARG_ATTRIBUTE_NAME = NAME;

const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}`;
const COMPONENT_CUSTOM_WIDTH_CLASS = `${COMPONENT_CLASS}-has-custom-width`;
const COMPONENT_PURGER_CLASS = `${COMPONENT_CLASS}-purger`;
const COMPONENT_ALLOW_INTERACTION_CLASS = `${COMPONENT_CLASS}-allow-interaction`;
const ACTIVATED_CLASS = `active`;

const DATA_KEY = `${Settings.get('prefix')}_${NAME}`;

const EVENT_KEY = `_${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;
const EVENT_CLICK_PURGE = `click${EVENT_KEY}_purge`;
const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`;
const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`;

const EVENT_BEFORE_CREATE = `before_create${EVENT_KEY}`;
const EVENT_CREATE = `create${EVENT_KEY}`;
const EVENT_AFTER_CREATE = `after_create${EVENT_KEY}`;

const EVENT_BEFORE_DESTROY = `before_destroy${EVENT_KEY}`;
const EVENT_DESTROY = `destroy${EVENT_KEY}`;
const EVENT_AFTER_DESTROY = `after_destroy${EVENT_KEY}`;

const EVENT_BEFORE_POSITION = `before_position${EVENT_KEY}`;
const EVENT_POSITION = `position${EVENT_KEY}`;
const EVENT_AFTER_POSITION = `after_position${EVENT_KEY}`;

const CURRENT_TOOLTIP_INSTANCE = {
  UI: null,
  element: null,
  args: null,
};

class Tooltip extends FwComponent {
  constructor(triggerElement, args) {
    triggerElement = triggerElement || false;

    super(triggerElement, {
      _customArgs: args
        ? args
        : triggerElement && triggerElement.__customArgs
        ? triggerElement.__customArgs
        : {},
    });
  }

  dispose() {
    super.setProp('_customArgs', '__dispose');
    super.dispose();
  }

  static get current() {
    return CURRENT_TOOLTIP_INSTANCE;
  }

  static set current(obj) {
    CURRENT_TOOLTIP_INSTANCE.UI = obj.UI;
    CURRENT_TOOLTIP_INSTANCE.args = obj.args;
    CURRENT_TOOLTIP_INSTANCE.element = obj.element;
  }

  get UICurrent() {
    return Tooltip.current.UI;
  }

  static configDefaults() {
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
      allowInteraction: false,
    };
  }

  get args() {
    return FwComponent._parseArgs(
      {
        placement: super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-placement`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-placement`)
          : this._customArgs.placement,
        badge: super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-badge`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-badge`)
          : this._customArgs.badge,
        badgeBg: super
          .UIEl()
          .hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-badge-background`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-badge-background`)
          : this._customArgs.badgeBg,
        badgeSize: super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-badge-size`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-badge-size`)
          : this._customArgs.badgeSize,
        classes: super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-classes`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-classes`)
          : this._customArgs.classes,
        content: super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-content`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-content`)
          : this._customArgs.content,
        inverse: super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-inverse`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-inverse`)
          : this._customArgs.inverse,
        size: super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-size`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-size`)
          : this._customArgs.size,
        centerX: super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-center-x`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-center-x`)
          : this._customArgs.centerX,
        centerY: super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-center-y`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-center-y`)
          : this._customArgs.centerY,
        x: super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-x`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-x`)
          : this._customArgs.x,
        y: super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-y`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-y`)
          : this._customArgs.y,
        width: super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-width`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-width`)
          : this._customArgs.width,
        allowInteraction: super
          .UIEl()
          .hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-allow-interaction`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-allow-interaction`)
          : this._customArgs.allowInteraction,
      },
      Tooltip.configDefaults()
    );
  }

  static get DATA_KEY() {
    return DATA_KEY;
  }

  _markup() {
    let html = '';

    if (this.args.badge) {
      html += `<span class="badge ${NAME}-badge`;
      if (this.args.badgeSize == 'small' || this.args.badgeSize == 'large') {
        html += ` badge-${this.args.badgeSize}`;
      }

      if (Palette.includes(this.args.badgeBg)) {
        html += ` badge-${this.args.badgeBg}`;
      } else {
        html += `" style="background-color:${this.args.badgeBg};`;
      }
      html += `"></span>`;
    }

    html += `<div class="${NAME}-content ${this.args.classes}">${this.args.content}</div></div>`;

    return html;
  }

  get elementOffset() {
    const element = super.UIEl();

    return {
      top: element.getBoundingClientRect().top + window.pageYOffset,
      left: element.getBoundingClientRect().left + window.pageXOffset,
      height: element.getBoundingClientRect().height,
      width: element.getBoundingClientRect().width,
    };
  }

  get _pointWidth() {
    let toReturn = parseFloat(
      window.getComputedStyle(Tooltip.current.UI, ':before').getPropertyValue('width')
    );

    toReturn = Math.sqrt(toReturn * toReturn * 2) * 0.5;
    isNaN(toReturn) && (toReturn = 15);

    return toReturn;
  }

  get badge() {
    if (!this.UICurrent) {
      return;
    }
    return this.UICurrent.querySelector(`.${COMPONENT_CLASS}-badge`);
  }

  get width() {
    return this.UICurrent.getBoundingClientRect().width;
  }

  get height() {
    return this.UICurrent.getBoundingClientRect().height;
  }

  set width(val) {
    this.UICurrent.style.width = val;
  }

  set height(val) {
    this.UICurrent.style.height = val;
  }

  create(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    if (!element) {
      return;
    }

    super.runCycle(
      EVENT_BEFORE_CREATE,
      EVENT_CREATE,
      EVENT_AFTER_CREATE,
      () => {
        this.destroy();

        const tip = document.createElement('div');
        document.body.appendChild(tip);

        tip.className = `${COMPONENT_CLASS} ${COMPONENT_CLASS}-${this.args.placement}
          ${this.args.width ? COMPONENT_CUSTOM_WIDTH_CLASS : ''}
          ${this.args.allowInteraction ? COMPONENT_ALLOW_INTERACTION_CLASS : ''}
          ${this.args.size ? `${COMPONENT_CLASS}-${this.args.size}` : ''}
          ${this.args.inverse ? 'theme-inverse' : ''}`;

        if (this.args.width) {
          tip.style.width = this.args.width;
        }

        Tooltip.current = {
          UI: tip,
          args: this.args,
          element: element,
        };

        tip.innerHTML += this._markup();

        if (this.args.width) {
          this.width = this.args.width;
        }
        tip.classList.add(ACTIVATED_CLASS);

        this.position();
      },
      element
    );
  }

  destroy() {
    const element = Tooltip.current.element;
    const tip = Tooltip.current.UI;

    if (!element || !tip) {
      return;
    }

    super.runCycle(
      EVENT_BEFORE_DESTROY,
      EVENT_DESTROY,
      EVENT_AFTER_DESTROY,
      () => {
        tip.parentNode.removeChild(tip);

        Tooltip.current = {
          UI: false,
          args: false,
          element: false,
        };
      },
      element
    );
  }

  get UIOffset() {
    let the_x = this.width * -0.5; //top and bottom
    let badgeOffsetX = 0;

    switch (this.args.placement) {
      case 'right':
        the_x = this._pointWidth;
        break;
      case 'left':
        the_x = -(this.width + this._pointWidth);
        break;
    }

    if (
      this.badge &&
      (this.args.placement == 'left' || this.args.placement == 'right')
    ) {
      badgeOffsetX =
        this.args.placement == 'left'
          ? this.badge.getBoundingClientRect().width * -0.5
          : this.badge.getBoundingClientRect().width * 0.5;
    }

    the_x += badgeOffsetX;

    let the_y = this.height * -0.5; // left and right
    let badgeOffsetY = 0;

    switch (this.args.placement) {
      case 'bottom':
        the_y = this._pointWidth;
        break;
      case 'top':
        the_y = -(this.height + this._pointWidth);
        break;
    }

    if (
      this.badge &&
      (this.args.placement == 'top' || this.args.placement == 'bottom')
    ) {
      badgeOffsetY =
        this.args.placement == 'top'
          ? this.badge.getBoundingClientRect().height * -0.5
          : this.badge.getBoundingClientRect().height * 0.5;
    }

    the_y += badgeOffsetY;

    return {
      x: the_x,
      y: the_y,
      // x: 0,
      // y: 0
    };
  }

  position(posX, posY) {
    const element = super.UIEl();

    if (!Tooltip.current.UI) {
      return;
    }
    const toolTip = Tooltip.current.UI;

    super.runCycle(
      EVENT_BEFORE_POSITION,
      EVENT_POSITION,
      EVENT_AFTER_POSITION,
      () => {
        posX = posX || this.elementOrigin.x;
        posY = posY || this.elementOrigin.y;

        toolTip.style.left = posX + this.UIOffset.x + 'px';
        toolTip.style.top = posY + this.UIOffset.y + 'px';
      },
      element
    );
  }

  get elementOrigin() {
    if (!Tooltip.current.UI) {
      return;
    }

    let the_x = this.elementOffset.left + this.elementOffset.width * 0.5; //top and bottom

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

    let the_y = this.elementOffset.top + this.elementOffset.height * 0.5; // left and right
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
      y: the_y,
    };
  }

  static handleToggleClickOn() {
    return (e) => {
      e.preventDefault();

      if (!FwComponent.isDisabled(e.target)) {
        const tooltip = new Tooltip(e.target);
        tooltip.create();
      }
    };
  }

  static handleUniversalPurge() {
    return (e) => {
      if (FwComponent.isDisabled(e.target)) {
        e.preventDefault();
      } else if (!FwComponent.isDynamic(e.target)) {
        if (
          !e.target.closest(`[data-toggle-${TOGGLE_MODE_CLICK}]`) &&
          !e.target.closest(`[data-toggle-${TOGGLE_MODE_HOVER}]`)
          // && !e.target.closest(`.${COMPONENT_CLASS}.${COMPONENT_ALLOW_INTERACTION_CLASS}`)
        ) {
          const tooltip = new Tooltip();
          tooltip.destroy();
        }
      }
    };
  }

  static handleToggleHoverOn() {
    return (e) => {
      if (FwComponent.isDisabled(e.target)) {
        e.preventDefault();
      } else {
        const tooltip = new Tooltip(e.target);
        tooltip.create();
      }
    };
  }

  static handleToggleHoverOff() {
    return (e) => {
      const tooltip = new Tooltip();
      tooltip.destroy();
    };
  }

  static handleResizeScroll() {
    return () => {
      if (Tooltip.current.element) {
        const tooltip = new Tooltip(Tooltip.current.element);

        tooltip.position();
      }
    };
  }

  static initListeners() {
    FwEvent.addListener(
      document.documentElement,
      EVENT_MOUSEENTER,
      `*[data-toggle-${TOGGLE_MODE_HOVER}]`,
      Tooltip.handleToggleHoverOn()
    );

    FwEvent.addListener(
      document.documentElement,
      EVENT_MOUSELEAVE,
      `*[data-toggle-${TOGGLE_MODE_HOVER}]`,
      Tooltip.handleToggleHoverOff()
    );

    FwEvent.addListener(
      document.documentElement,
      EVENT_CLICK,
      `*[data-toggle-${TOGGLE_MODE_CLICK}]`,
      Tooltip.handleToggleClickOn()
    );

    FwEvent.addListener(
      document.documentElement,
      EVENT_CLICK_PURGE,
      `*, .${COMPONENT_PURGER_CLASS}`,
      Tooltip.handleUniversalPurge()
    );

    Initiator.Q.on_ready = Tooltip.handleResizeScroll();
    Initiator.Q.on_resize = Tooltip.handleResizeScroll();
  }

  static destroyListeners() {
    FwEvent.removeListener(
      document.documentElement,
      EVENT_MOUSEENTER,
      Tooltip.handleToggleHoverOn()
    );

    FwEvent.removeListener(
      document.documentElement,
      EVENT_MOUSELEAVE,
      Tooltip.handleToggleHoverOff()
    );

    FwEvent.removeListener(
      document.documentElement,
      EVENT_CLICK,
      Tooltip.handleToggleClickOn()
    );

    FwEvent.removeListener(
      document.documentElement,
      EVENT_CLICK_PURGE,
      Tooltip.handleUniversalPurge()
    );
  }
}

export default Tooltip;

Tooltip.initListeners();
