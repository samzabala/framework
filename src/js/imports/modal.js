import Initiator from './core/initiator.js';
import Settings from './core/settings.js';

// import Modifiers from './../util/modifiers.js';

import FwEvent from './data-helper/event.js';
import FwString from './data-helper/string.js';
import FwDom from './data-helper/dom.js';

import FwComponent from './classes/component.js';
import { UIPrefix, UIToggled, UIBodyClass, UIChangeHash } from './util/ui.js';

const NAME = 'modal';
const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}`;
const ARG_ATTRIBUTE_NAME = `${NAME}`;
const TOGGLE_MODE_PREFIX = `${NAME}`;
const FULLSCREEN_CLASS = `${UIPrefix(COMPONENT_CLASS)}-on-fullscreen`;

const ACTIVATED_CLASS = `active`;
const TOGGLE_ACTIVATED_CLASS = ACTIVATED_CLASS;

const DEFAULT_NAME = `default`;
const BOARD_NAME = `board`;

const DATA_KEY = `${Settings.get('prefix')}_${NAME}`;

const EVENT_KEY = `_${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;

const EVENT_MOUSEDOWN = `mousedown${EVENT_KEY}`;
// const EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`;

const EVENT_MOUSEMOVE = `mousemove${EVENT_KEY}`;
// const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`;

const EVENT_MOUSEUP = `mouseup${EVENT_KEY}`;
// const EVENT_TOUCHEND = `mouseup${EVENT_KEY}`;

// const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;

const EVENT_HASHCHANGE = `hashchange${EVENT_KEY}`;

const EVENT_BEFORE_CREATE = `before_create${EVENT_KEY}`;
const EVENT_CREATE = `create${EVENT_KEY}`;
const EVENT_AFTER_CREATE = `after_create${EVENT_KEY}`;

const EVENT_BEFORE_DESTROY = `before_destroy${EVENT_KEY}`;
const EVENT_DESTROY = `destroy${EVENT_KEY}`;
const EVENT_AFTER_DESTROY = `after_destroy${EVENT_KEY}`;

const EVENT_BEFORE_UPDATE = `before_update${EVENT_KEY}`;
const EVENT_UPDATE = `update${EVENT_KEY}`;
const EVENT_AFTER_UPDATE = `after_update${EVENT_KEY}`;

const EVENT_BEFORE_RESIZE = `before_resize${EVENT_KEY}`;
const EVENT_RESIZE = `resize${EVENT_KEY}`;
const EVENT_AFTER_RESIZE = `after_resize${EVENT_KEY}`;

const EVENT_BEFORE_FULLSCREEN_ACTIVATE = `before_fullscreen_activate${EVENT_KEY}`;
const EVENT_FULLSCREEN_ACTIVATE = `fullscreen_activate${EVENT_KEY}`;
const EVENT_AFTER_FULLSCREEN_ACTIVATE = `after_fullscreen_activate${EVENT_KEY}`;

const EVENT_BEFORE_FULLSCREEN_DEACTIVATE = `before_fullscreen_deactivate${EVENT_KEY}`;
const EVENT_FULLSCREEN_DEACTIVATE = `fullscreen_deactivate${EVENT_KEY}`;
const EVENT_AFTER_FULLSCREEN_DEACTIVATE = `after_fullscreen_deactivate${EVENT_KEY}`;

const CURRENT_MODAL_INSTANCE = {};

let LAST_POS_X = 0;

const VALID_MODAL_MODES = [
  BOARD_NAME,
  DEFAULT_NAME, // default's just named after the component istels fo im not confusion also make it last
];

VALID_MODAL_MODES.forEach((mode) => {
  CURRENT_MODAL_INSTANCE[mode] = {
    element: false,
    args: false,
    UI: false,
    UIContentBlock: false,
  };
});

class Modal extends FwComponent {
  constructor(element, triggerer, args) {
    //4 on init by hash

    element = element || false;
    args = args || false;

    //get currMode
    let currMode = false;

    //look for currMode
    VALID_MODAL_MODES.forEach((mode) => {
      //if no element
      if (!element) {
        element =
          UIToggled(
            Modal.#modeToggle(mode),
            null,
            `.${COMPONENT_CLASS}.${Modal.#modeClass(mode)}`
          ) || Modal.current(mode).element;
      }

      //if not set yet of course
      if (!currMode) {
        // by triggerer first
        if (triggerer && !element) {
          if (
            triggerer.hasAttribute(`data-toggle-${Modal.#modeToggle(mode)}`) ||
            triggerer.hasAttribute(`data-toggle-${Modal.#modeToggle(mode)}-open`) ||
            triggerer.hasAttribute(`data-toggle-${Modal.#modeToggle(mode)}-close`) ||
            triggerer.hasAttribute(
              `data-toggle-${Modal.#modeToggle(mode)}-fullscreen`
            ) ||
            triggerer.hasAttribute(`data-toggle-${Modal.#modeToggle(mode)}-resize`)
          ) {
            currMode = mode;
          }
        } else if (element) {
          //look for subcom
          if (element.__mode) {
            currMode = element.__mode;
          } else if (element.classList.contains(`${COMPONENT_CLASS}-${mode}`)) {
            currMode = mode;
            //ok default probable
          } else if (element.classList.contains(COMPONENT_CLASS)) {
            currMode = DEFAULT_NAME;
          }
        } else if (!element) {
          if (Modal.current(mode).element) {
            currMode = mode;
          }
        }
      }
    });

    //kill if not a valid bode boi
    if (!currMode) {
      element = false;
    }

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
      _mode: currMode,
      _canDrag: element && element.__canDrag ? element.__canDrag : false,
    });
  }

  dispose() {
    super.setProp('triggerer', '__dispose');
    super.setProp('_customArgs', '__dispose');
    super.setProp('_mode', '__dispose');
    super.setProp('_canDrag', '__dispose');
    super.dispose();
  }

  static current(mode) {
    return mode ? CURRENT_MODAL_INSTANCE[mode] : CURRENT_MODAL_INSTANCE;
  }

  get #current() {
    if (this.mode) {
      return Modal.current(this.mode);
    } else {
      return false;
    }
  }

  set #current(obj) {
    CURRENT_MODAL_INSTANCE[this.mode].element = obj.element;
    CURRENT_MODAL_INSTANCE[this.mode].args = obj.args;
    CURRENT_MODAL_INSTANCE[this.mode].UI = obj.UI;
    CURRENT_MODAL_INSTANCE[this.mode].UIContentBlock = obj.UIContentBlock;
  }

  get instance() {
    return this.#current;
  }

  get mode() {
    return super.getProp('_mode');
  }

  static containsHash(hash) {
    const anId = hash.replace('#', ''); //just to be sure
    const possibEl = document.getElementById(anId);
    return possibEl && possibEl.parentNode.closest(`.${COMPONENT_CLASS}`);
  }

  static isHash(hash) {
    const anId = hash.replace('#', ''); //just to be sure
    const possibEl = document.getElementById(anId);
    return possibEl && possibEl.classList.contains(COMPONENT_CLASS);
  }

  get hasButtons() {
    return (
      this.args.close !== false ||
      this.args.fullscreen !== false ||
      (this.args.resize !== false && this.args.width)
    );
  }

  get buttonsMarkup() {
    let html = '';

    if (this.args.close !== false) {
      html += `<a href="#" title="Close"
        class="
          ${UIPrefix(COMPONENT_CLASS)}-close
          ${UIPrefix(COMPONENT_CLASS)}-button
          ${
            this.args.closeClasses
              ? this.args.closeClasses
              : `${UIPrefix(COMPONENT_CLASS)}-button-default`
          }"
        data-toggle-${this.modeToggle}-close
      >
        <i class="symbol symbol-close "></i>
      </a>`;
    }

    if (this.args.fullscreen !== false) {
      html += `<a href="#" title="Toggle fullscreen"
        class="
          ${UIPrefix(COMPONENT_CLASS)}-fullscreen
          ${UIPrefix(COMPONENT_CLASS)}-button
          ${
            this.args.closeClasses
              ? this.args.closeClasses
              : `${UIPrefix(COMPONENT_CLASS)}-button-default`
          }"
        data-toggle-${this.modeToggle}-fullscreen
      >
        <i class="symbol symbol-expand symbol-collapse-toggle"></i>
      </a>`;
    }

    if (this.args.resize !== false && this.args.width) {
      html += `<a title="Drag resize"
        class="
          ${UIPrefix(COMPONENT_CLASS)}-resize
          ${UIPrefix(COMPONENT_CLASS)}-button
          ${
            this.args.resizeClasses
              ? this.args.resizeClasses
              : `${UIPrefix(COMPONENT_CLASS)}-button-default`
          }"
        data-toggle-${this.modeToggle}-resize
      >
        <i class="symbol symbol-fries"></i>
      </a>`;
    }

    return html;
  }

  get UIId() {
    return `${Settings.get('prefix')}-${NAME}-${this.mode}`;
  }

  get UIContentBlock() {
    return this.UIRoot.querySelector(`.${UIPrefix(COMPONENT_CLASS)}-popup-content`);
  }

  get UIRoot() {
    return document.getElementById(this.UIId);
  }
  get UIElId() {
    return super.UIEl().getAttribute('id');
  }

  get UIToggle() {
    return this.UIRoot.querySelectorAll(`*[data-toggle-${this.modeToggle}]`);
  }
  get UIToggleClose() {
    return this.UIRoot.querySelectorAll(`*[data-toggle-${this.modeToggle}-close]`);
  }
  get UIToggleOpen() {
    return this.UIRoot.querySelectorAll(`*[data-toggle-${this.modeToggle}-open]`);
  }
  get UIToggleFullscreen() {
    return this.UIRoot.querySelectorAll(`*[data-toggle-${this.modeToggle}-fullscreen]`);
  }
  get UIToggleResize() {
    return this.UIRoot.querySelectorAll(`*[data-toggle-${this.modeToggle}-resize]`);
  }

  static #modeToggle(mode) {
    return FwString.ToDashed(`${TOGGLE_MODE_PREFIX}-${mode}`);
  }

  get modeToggle() {
    return Modal.#modeToggle(this.mode);
  }

  static #modeClass(mode) {
    return FwString.ToDashed(`${TOGGLE_MODE_PREFIX}-${mode}`);
  }

  get modeClass() {
    return Modal.#modeClass(this.mode);
  }

  get UiModeClass() {
    return `${UIPrefix(COMPONENT_CLASS)}-mode-${this.mode}`;
  }

  get UiModeStyleClass() {
    return `${UIPrefix(COMPONENT_CLASS)}-on-mode-${this.mode}`;
  }

  get isFullscreen() {
    return this.UIRoot.classList.contains(FULLSCREEN_CLASS);
  }

  static configDefaults(mode) {
    mode = mode || DEFAULT_NAME;
    return {
      changeHash: true,
      title: '',
      close: true,
      disableOverlay: true,
      width: mode !== BOARD_NAME ? null : '960px',
      callback: null,
      classes: '',
      closeClasses: '',
      fullscreen: false, //@TODO: this shit
      fullscreenContentDisplay: 'block',
      centerY: {
        value: true,
        parser: (value) => {
          if (mode !== BOARD_NAME) return value;
        },
      },
      align: {
        value: 'right',
        parser: (value) => {
          if (mode == BOARD_NAME && (value == 'left' || value == 'right')) {
            return value;
          } else {
            return false;
          }
        },
      },
      resize: {
        value: false,
        parser: (value) => {
          return mode == BOARD_NAME ? value : false;
        },
      },
      resizeClasses: {
        value: null,
        parser: (value) => {
          return mode == BOARD_NAME ? value : false;
        },
      },
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
        title:
          this.triggerer &&
          this.triggerer.hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-title`)
            ? this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-title`)
            : super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-title`)
            ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-title`)
            : this._customArgs.title,
        disableOverlay:
          this.triggerer &&
          this.triggerer.hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-disable-overlay`)
            ? this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-disable-overlay`)
            : super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-disable-overlay`)
            ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-disable-overlay`)
            : this._customArgs.disableOverlay,
        width:
          this.triggerer &&
          this.triggerer.hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-width`)
            ? this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-width`)
            : super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-width`)
            ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-width`)
            : this._customArgs.width,
        callback:
          this.triggerer &&
          this.triggerer.hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-callback`)
            ? this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-callback`)
            : super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-callback`)
            ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-callback`)
            : this._customArgs.callback,
        classes:
          this.triggerer &&
          this.triggerer.hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-classes`)
            ? this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-classes`)
            : super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-classes`)
            ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-classes`)
            : this._customArgs.callback,
        close:
          this.triggerer &&
          this.triggerer.hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-close`)
            ? this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-close`)
            : super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-close`)
            ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-close`)
            : this._customArgs.close,
        closeClasses:
          this.triggerer &&
          this.triggerer.hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-close-classes`)
            ? this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-close-classes`)
            : super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-close-classes`)
            ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-close-classes`)
            : this._customArgs.closeClasses,
        fullscreen:
          this.triggerer &&
          this.triggerer.hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-fullscreen`)
            ? this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-fullscreen`)
            : super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-fullscreen`)
            ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-fullscreen`)
            : this._customArgs.fullscreen,
        fullscreenContentDisplay:
          this.triggerer &&
          this.triggerer.hasAttribute(
            `data-${ARG_ATTRIBUTE_NAME}-fullscreen-content-display`
          )
            ? this.triggerer.getAttribute(
                `data-${ARG_ATTRIBUTE_NAME}-fullscreen-content-display`
              )
            : super
                .UIEl()
                .hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-fullscreen-content-display`)
            ? super
                .UIEl()
                .getAttribute(`data-${ARG_ATTRIBUTE_NAME}-fullscreen-content-display`)
            : this._customArgs.fullscreenContentDisplay,
        centerY:
          this.triggerer &&
          this.triggerer.hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-center-y`)
            ? this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-center-y`)
            : super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-center-y`)
            ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-center-y`)
            : this._customArgs.centerY,
        //board shits
        align:
          this.triggerer &&
          this.triggerer.hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-align`)
            ? this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-align`)
            : super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-align`)
            ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-align`)
            : this._customArgs.align,
        resize:
          this.triggerer &&
          this.triggerer.hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-resize`)
            ? this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-resize`)
            : super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-resize`)
            ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-resize`)
            : this._customArgs.resize,
        resizeClasses:
          this.triggerer &&
          this.triggerer.hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-resize-classes`)
            ? this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-resize-classes`)
            : super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-resize-classes`)
            ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-resize-classes`)
            : this._customArgs.resizeClasses,
        //custom specific
        // customMarkup: //halat weit
      },
      Modal.configDefaults(this.mode)
    );
  }

  static get DATA_KEY() {
    return DATA_KEY;
  }

  toggle(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    if (element && element.classList.contains(ACTIVATED_CLASS)) {
      this.create();
    } else {
      this.destroy();
    }
  }

  get canDrag() {
    return super.getProp('_canDrag');
  }

  set canDrag(val) {
    super.setProp('_canDrag', val);

    if (val !== false) {
      document.body.classList.add(UIBodyClass.onDrag);
    } else {
      document.body.classList.remove(UIBodyClass.onDrag);
    }
  }

  create(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    if (!element) {
      return;
    }

    if (!element) {
      return;
    }

    const lifeCycle = {};

    lifeCycle.before = () => {
      let matchedHashDestroy = false;

      if (this.#current && this.#current.element) {
        if (element === this.#current.element) {
          matchedHashDestroy = true;
        }

        new Modal(this.#current.element).destroy();
      }

      //no need to create it twice or create it after already desttroiny it
      if (matchedHashDestroy) {
        return false;
      }
    };

    lifeCycle.during = () => {
      const id = this.UIElId || this.UIId;

      id !== `${this.UIId}` && this.args.changeHash && UIChangeHash(id);

      const theUI = document.createElement('div');
      // document.querySelector('body').appendChild(theUI);
      element.parentNode.insertBefore(theUI, element.nextSibling);
      theUI.className = `${UIPrefix(COMPONENT_CLASS)} ${this.UiModeClass} ${
        this.UiModeStyleClass
      } ${UIPrefix(COMPONENT_CLASS)}-component
        ${
          this.args.align ? `${UIPrefix(COMPONENT_CLASS)}-align-${this.args.align}` : ''
        }
        ${this.args.centerY ? `${UIPrefix(COMPONENT_CLASS)}-center-y` : ''}
        ${this.args.classes}`;
      theUI.setAttribute('id', this.UIId);

      theUI.innerHTML = this._markup;

      FwDom.moveContents(element, this.UIContentBlock);
      element.appendChild(theUI);

      this.#current = {
        element: element,
        args: this.args,
        UI: this.UIRoot,
        UIContentBlock: this.UIContentBlock,
      };

      if (this.args.width) {
        this.resize();
      }

      this.update();

      if (this.args.callback) {
        this._runFn(this.args.callback);
      }

      element.classList.add(ACTIVATED_CLASS);
      document.body.classList.add(UIBodyClass.noScroll);
    };

    super.runCycle(
      EVENT_BEFORE_CREATE,
      EVENT_CREATE,
      EVENT_AFTER_CREATE,
      lifeCycle,
      element
    );
  }

  destroy(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    const hash = window.location.hash;

    if (!element) {
      return;
    }

    super.runCycle(
      EVENT_BEFORE_DESTROY,
      EVENT_DESTROY,
      EVENT_AFTER_DESTROY,
      () => {
        let canRemoveHash = false;

        if (
          element.hasAttribute('id') &&
          element.getAttribute('id') == hash.replace('#', '')
        ) {
          canRemoveHash = true;
        }

        if (this.UIRoot) {
          element.classList.remove(ACTIVATED_CLASS);

          this.update();

          element.parentNode.insertBefore(this.UIRoot, element.nextSibling);
          FwDom.moveContents(this.UIContentBlock, element);

          this.UIRoot.parentNode.removeChild(this.UIRoot);
        }

        canRemoveHash && UIChangeHash('');

        this.#current = {
          element: false,
          args: false,
          UI: false,
          UIContentBlock: false,
        };

        const currArr = Object.values(Modal.current()).filter((mod) => {
          return mod.element;
        });

        if (currArr.length < 1) {
          document.body.classList.remove(UIBodyClass.noScroll);
        }
      },
      element
    );
  }

  activateFullscreen(elem) {
    const element = elem
      ? super.UIEl(elem)
      : this.#current
      ? this.#current.element
      : false;

    if (!element) {
      return;
    }

    super.runCycle(
      EVENT_BEFORE_FULLSCREEN_ACTIVATE,
      EVENT_FULLSCREEN_ACTIVATE,
      EVENT_AFTER_FULLSCREEN_ACTIVATE,
      () => {
        this.UIRoot.classList.add(FULLSCREEN_CLASS);
        this.UIRoot.classList.remove(this.UiModeStyleClass);
        this.UIContentBlock.style.display = this.args.fullscreenContentDisplay;
      },
      element
    );
  }

  deactivateFullscreen(elem) {
    const element = elem
      ? super.UIEl(elem)
      : this.#current
      ? this.#current.element
      : false;

    if (!element) {
      return;
    }

    super.runCycle(
      EVENT_BEFORE_FULLSCREEN_DEACTIVATE,
      EVENT_FULLSCREEN_DEACTIVATE,
      EVENT_AFTER_FULLSCREEN_DEACTIVATE,
      () => {
        this.UIRoot.classList.remove(FULLSCREEN_CLASS);
        this.UIRoot.classList.add(this.UiModeStyleClass);
        this.UIContentBlock.style.display = '';
      },
      element
    );
  }

  toggleFullscreen(elem) {
    if (this.isFullscreen) {
      this.deactivateFullscreen(elem);
    } else {
      this.activateFullscreen(elem);
    }
    this.update();
  }

  update(elem) {
    const element = elem
      ? super.UIEl(elem)
      : this.#current
      ? this.#current.element
      : false;

    if (!element) {
      return;
    }

    super.runCycle(
      EVENT_BEFORE_UPDATE,
      EVENT_UPDATE,
      EVENT_AFTER_UPDATE,
      () => {
        // buttons
        if (this.UIToggleFullscreen) {
          if (this.isFullscreen) {
            this.UIToggleFullscreen.forEach((butt) => {
              butt.classList.add(TOGGLE_ACTIVATED_CLASS);
            });
          } else {
            this.UIToggleFullscreen.forEach((butt) => {
              butt.classList.remove(TOGGLE_ACTIVATED_CLASS);
            });
          }
        }
      },
      element
    );
  }

  resize(width) {
    if (!this.#current || !super.UIEl()) {
      return;
    }

    const element = this.#current ? this.#current.element : false;

    if (!element) {
      return;
    }

    const args = this.args || this.#current.args || {};
    width = width || args.width || null;

    if (this.UIRoot && parseInt(width) >= parseInt(args.width)) {
      super.runCycle(
        EVENT_BEFORE_RESIZE,
        EVENT_RESIZE,
        EVENT_AFTER_RESIZE,
        () => {
          //all
          if (this.UIRoot.querySelector(`.${UIPrefix(COMPONENT_CLASS)}-popup`)) {
            this.UIRoot.querySelector(
              `.${UIPrefix(COMPONENT_CLASS)}-popup`
            ).style.width = typeof width == 'string' ? width : `${width}px`;
          }

          //bboard
          if (this.mode == 'board') {
            if (
              this.UIRoot.querySelector(`.${UIPrefix(COMPONENT_CLASS)}-button-wrapper`)
            ) {
              this.UIRoot.querySelector(
                `.${UIPrefix(COMPONENT_CLASS)}-button-wrapper`
              ).style.width = typeof width == 'string' ? width : `${width}px`;
            }
          }
          this.update();
        },
        element
      );
    }
  }

  get _markup() {
    let html = `<div class="${this.UiModeClass} ${UIPrefix(COMPONENT_CLASS)}-wrapper">`;

    //overlay
    html += `<div
      class="${this.UiModeClass} ${UIPrefix(COMPONENT_CLASS)}-close-overlay" ${
      this.args.disableOverlay == false ? `data-toggle-${this.modeToggle}-close` : ''
    }
    ></div>`;

    switch (this.mode) {
      case 'board':
        html += `<div class="${this.UiModeClass} ${UIPrefix(COMPONENT_CLASS)}-popup">`;

        html += `<div class="${this.UiModeClass} ${UIPrefix(
          COMPONENT_CLASS
        )}-button-wrapper">
          ${this.buttonsMarkup}
        </div>`;

        if (this.args.title) {
          html += `<div class="${this.UiModeClass} ${UIPrefix(COMPONENT_CLASS)}-header">
            <h1 class="${this.UiModeClass} ${UIPrefix(
            COMPONENT_CLASS
          )}-title">${decodeURIComponent(this.args.title)}</h1>
          </div>`;
        }

        html += `<div class="${this.UiModeClass} ${UIPrefix(
          COMPONENT_CLASS
        )}-popup-content"></div>`;
        html += `</div>`;

        break;

      default:
        html += `<div class="${this.UiModeClass} ${UIPrefix(COMPONENT_CLASS)}-popup">`;

        if (this.args.title || this.hasButtons) {
          html += `<div class="${this.UiModeClass} ${UIPrefix(
            COMPONENT_CLASS
          )}-header">`;
          if (this.args.title) {
            html += `<h1 class="${this.UiModeClass} ${UIPrefix(COMPONENT_CLASS)}-title">
            ${decodeURIComponent(this.args.title)}
            </h1>`;
          }

          if (this.hasButtons) {
            html += `<div class="${this.UiModeClass} ${UIPrefix(
              COMPONENT_CLASS
            )}-button-wrapper">
              ${this.buttonsMarkup}
            </div>`;
          }

          html += `</div>`;
        }

        html += `<div class="${this.UiModeClass} ${UIPrefix(
          COMPONENT_CLASS
        )}-popup-content"></div>`;

        html += `</div>`;

        break;
    }

    html += '</div>';

    return html;
  }

  static handleResize() {
    return () => {
      VALID_MODAL_MODES.forEach((mode) => {
        const modal = new Modal(
          Modal.current(mode).element,
          null,
          Modal.current(mode).args
        );
        modal.resize();
      });
    };
  }

  static handleInit() {
    return () => {
      if (Settings.get('initializeModal')) {
        const modal = new Modal();
        const hash = window.location.hash;
        if (Modal.isHash(hash)) {
          modal.create();
        }
      }
    };
  }

  static handleHash() {
    return () => {
      const modal = new Modal();
      const hash = window.location.hash;
      if (Modal.isHash(hash) && !Modal.containsHash(hash)) {
        modal.open();
      } else {
        modal.close();
      }
    };
  }

  static handleToggleOpen(mode) {
    return (e) => {
      e.preventDefault();

      if (!FwComponent.isDisabled(e.target)) {
        const modal = new Modal(
          UIToggled(
            Modal.#modeToggle(mode),
            e.target,
            `.${COMPONENT_CLASS}.${Modal.#modeClass(mode)}`
          ),
          e.target
        );
        modal.create();
      }
    };
  }

  static handleToggleClose(mode) {
    return (e) => {
      e.preventDefault();

      if (!FwComponent.isDisabled(e.target)) {
        const modal = new Modal(
          UIToggled(
            Modal.#modeToggle(mode),
            e.target,
            `.${COMPONENT_CLASS}.${Modal.#modeClass(mode)}`
          ),
          e.target
        );
        modal.destroy();
      }
    };
  }

  static handleToggleResizeMouseDown(mode) {
    return (e) => {
      if (!FwComponent.isDisabled(e.target)) {
        const modal = new Modal(
          UIToggled(
            Modal.#modeToggle(mode),
            e.target,
            `.${COMPONENT_CLASS}.${Modal.#modeClass(mode)}`
          ),
          e.target
        );

        if (modal) {
          // console.warn('MouseDown');
          modal.canDrag = true;

          FwEvent.addListener(
            null,
            EVENT_MOUSEMOVE,
            window,
            Modal.handleToggleResizeMouseMove(mode)
          );

          // FwEvent.addListener(
          //   null,
          //   EVENT_TOUCHMOVE,
          //   window,
          //   Modal.handleToggleResizeMouseMove(mode)
          // );
        }
      }
    };
  }

  static handleToggleResizeMouseMove(mode) {
    return (e) => {
      if (Modal.current(mode).element) {
        const modal = new Modal(
          Modal.current(mode).element,
          null,
          Modal.current(mode).args
        );

        if (modal && modal.canDrag) {
          const widthBasis =
            e.clientX ||
            (e.touches && e.touches[0].clientX) ||
            (e.originalEvent.touches && e.originalEvent.touches[0].clientX);

          if (LAST_POS_X !== widthBasis) {
            console.warn(e.type, 'MouseMove', e.clientX, LAST_POS_X);
            LAST_POS_X = widthBasis;

            let newWidth;

            if (modal.args.align == 'right') {
              newWidth = window.innerWidth - widthBasis;
            } else if (modal.args.align == 'left') {
              newWidth = widthBasis;
            }

            modal.resize(newWidth);
          }
        }
      }
    };
  }

  static handleToggleResizeMouseUp(mode) {
    return () => {
      if (Modal.current(mode).element) {
        // console.warn(e.type,'MouseUp',document.body.classList);

        const modal = new Modal(
          Modal.current(mode).element,
          null,
          Modal.current(mode).args
        );

        if (modal) {
          modal.canDrag = false;
        }
      }

      FwEvent.removeListener(
        window,
        EVENT_MOUSEMOVE,
        Modal.handleToggleResizeMouseMove(mode)
      );

      // FwEvent.removeListener(
      //   window,
      //   EVENT_TOUCHMOVE,
      //   Modal.handleToggleResizeMouseMove(mode)
      // );
    };
  }

  static handleToggleResizeClick() {
    return (e) => {
      e.preventDefault();
    };
  }

  static handleFullscreen(mode) {
    return (e) => {
      e.preventDefault();

      if (!FwComponent.isDisabled(e.target)) {
        const modal = new Modal(
          UIToggled(
            Modal.#modeToggle(mode),
            e.target,
            `.${COMPONENT_CLASS}.${Modal.#modeClass(mode)}`
          ),
          e.target
        );
        modal.toggleFullscreen();
      }
    };
  }

  static initListeners() {
    VALID_MODAL_MODES.forEach((mode) => {
      const modeToggle = Modal.#modeToggle(mode);

      FwEvent.addListener(
        document.documentElement,
        EVENT_CLICK,
        `*[data-toggle-${modeToggle}], *[data-toggle-${modeToggle}-open]`,
        Modal.handleToggleOpen(mode)
      );

      FwEvent.addListener(
        document.documentElement,
        EVENT_CLICK,
        `*[data-toggle-${modeToggle}-close]`,
        Modal.handleToggleClose(mode)
      );

      FwEvent.addListener(
        document.documentElement,
        EVENT_CLICK,
        `*[data-toggle-${modeToggle}-resize]`,
        Modal.handleToggleResizeClick(mode)
      );

      FwEvent.addListener(
        window,
        EVENT_MOUSEDOWN,
        `*[data-toggle-${modeToggle}-resize]`,
        Modal.handleToggleResizeMouseDown(mode)
      );

      // FwEvent.addListener(
      //   window,
      //   EVENT_TOUCHSTART,
      //   `*[data-toggle-${modeToggle}-resize]`,
      //   Modal.handleToggleResizeMouseDown(mode),
      // );

      FwEvent.addListener(
        null,
        EVENT_MOUSEUP,
        window,
        Modal.handleToggleResizeMouseUp(mode)
      );

      // FwEvent.addListener(
      //   null,
      //   EVENT_TOUCHEND,
      //   window,
      //   Modal.handleToggleResizeMouseUp(mode)
      // );

      FwEvent.addListener(
        document.documentElement,
        EVENT_CLICK,
        `*[data-toggle-${modeToggle}-fullscreen]`,
        Modal.handleFullscreen(mode)
      );
    });

    FwEvent.addListener(null, EVENT_HASHCHANGE, window, Modal.handleHash());

    Initiator.Q.on_ready = Modal.handleInit();
    Initiator.Q.on_resize = Modal.handleResize();
  }
  static destroyListeners() {
    VALID_MODAL_MODES.forEach((mode) => {
      FwEvent.removeListener(
        document.documentElement,
        EVENT_CLICK,
        Modal.handleToggleOpen(mode)
      );

      FwEvent.removeListener(
        document.documentElement,
        EVENT_CLICK,
        Modal.handleToggleClose(mode)
      );

      FwEvent.removeListener(
        document.documentElement,
        EVENT_CLICK,
        Modal.handleToggleResizeClick(mode)
      );

      FwEvent.addListener(
        window,
        EVENT_MOUSEDOWN,
        Modal.handleToggleResizeMouseDown(mode)
      );

      // FwEvent.addListener(
      //   window,
      //   EVENT_TOUCHSTART,
      //   Modal.handleToggleResizeMouseDown(mode)
      // );

      FwEvent.removeListener(
        window,
        EVENT_MOUSEUP,
        Modal.handleToggleResizeMouseUp(mode)
      );

      // FwEvent.removeListener(
      //   window,
      //   EVENT_TOUCHEND,
      //   Modal.handleToggleResizeMouseUp(mode)
      // );

      FwEvent.removeListener(
        document.documentElement,
        EVENT_CLICK,
        Modal.handleFullscreen(mode)
      );
    });

    FwEvent.removeListener(window, EVENT_HASHCHANGE, Modal.handleHash());
  }
}

export default Modal;

Modal.initListeners();
