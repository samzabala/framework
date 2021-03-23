import Initiator from './core/initiator.js';
import Settings from './core/settings.js';

import FwEvent from './data-helper/event.js';
import FwString from './data-helper/string.js';
import FwDom from './data-helper/dom.js';

import FwComponent from './classes/component.js';
import { UIPrefix, UIToggled, UIBodyClass, UIChangeHash } from './util/ui.js';

const NAME = 'modal';
const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}`;
const ACTIVATED_CLASS = `active`;

const ARG_ATTRIBUTE_NAME = `${NAME}`;
const TOGGLE_MODE_PREFIX = `${NAME}`;

const DEFAULT_NAME = `default`;
const BOARD_NAME = `board`;

const DATA_KEY = `${Settings.get('prefix')}.${NAME}`;

const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;
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

const CURRENT_MODAL_INSTANCE = {};

const VALID_MODAL_MODES = [
  BOARD_NAME,
  DEFAULT_NAME, // default's just named after the component istels fo im not confusion also make it last
];

VALID_MODAL_MODES.forEach((mode) => {
  CURRENT_MODAL_INSTANCE[mode] = {
    element: false,
    args: false,
  };
});

class Modal extends FwComponent {
  constructor(element, triggerer, args) {
    //4 on init by hash

    element = element || false;
    args = args || false;

    //get currMode
    let currMode = false;

    //look by triggerer first
    if (triggerer && !element) {
      //look for subcom
      VALID_MODAL_MODES.forEach((mode) => {
        if (
          (triggerer.hasAttribute(`data-toggle-${Modal.#modeToggle(mode)}`) ||
            triggerer.hasAttribute(`data-toggle-${Modal.#modeToggle(mode)}-open`) ||
            triggerer.hasAttribute(`data-toggle-${Modal.#modeToggle(mode)}-close`)) &&
          !currMode
        ) {
          currMode = mode;
        }
      });
    } else if (element) {
      //look for subcom
      VALID_MODAL_MODES.forEach((mode) => {
        if (element.classList.contains(`${COMPONENT_CLASS}-${mode}`) && !currMode) {
          currMode = mode;
        }
      });

      //ok default probable
      if (element.classList.contains(COMPONENT_CLASS) && !currMode) {
        currMode = DEFAULT_NAME;
      }
    }

    //kill if not a valid bode boi
    if (!currMode) {
      element = false;
    } else {
      if (currMode && !element) {
        element = Modal.current(currMode).element;
      }
    }

    super(element, {
      triggerer: triggerer,
      _customArgs: args || false,
      _mode: currMode,
    });
  }

  dispose() {
    super.dispose();
    this.triggerer = null;
    this._customArgs = null;
  }

  static current(mode) {
    return mode ? CURRENT_MODAL_INSTANCE[mode] : CURRENT_MODAL_INSTANCE;
  }

  get #current() {
    return CURRENT_MODAL_INSTANCE[this.mode];
  }

  set #current(obj) {
    CURRENT_MODAL_INSTANCE[this.mode].element = obj.element;
    CURRENT_MODAL_INSTANCE[this.mode].args = obj.args;
  }

  get mode() {
    return this._mode;
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

  static get configDefaults() {
    const mode = this.mode;
    return {
      changeHash: true,
      title: '',
      close: true,
      disableOverlay: true,
      width: null,
      callback: null,
      classes: '',
      closeClasses: '',

      align: {
        value: 'left',
        parser: (value) => {
          if (mode == BOARD_NAME) return value;
        },
      },
      resizeClasses: {
        value: null,
        parser: (value) => {
          if (mode == BOARD_NAME) return value;
        },
      },
      resize: {
        value: false,
        parser: (value) => {
          if (mode == BOARD_NAME) return value;
        },
      },
    };
  }

  get args() {
    return FwComponent._parseArgs(
      this._customArgs
        ? this._customArgs
        : {
            changeHash:
              (this.triggerer &&
                this.triggerer.getAttribute(
                  `data-${ARG_ATTRIBUTE_NAME}-change-hash`
                )) ||
              super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-change-hash`),
            title:
              (this.triggerer &&
                this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-title`)) ||
              super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-title`),
            disableOverlay:
              (this.triggerer &&
                this.triggerer.getAttribute(
                  `data-${ARG_ATTRIBUTE_NAME}-disable-overlay`
                )) ||
              super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-disable-overlay`),
            width:
              (this.triggerer &&
                this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-width`)) ||
              super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-width`),
            callback:
              (this.triggerer &&
                this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-callback`)) ||
              super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-callback`),
            classes:
              (this.triggerer &&
                this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-classes`)) ||
              super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-classes`),
            close:
              (this.triggerer &&
                this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-close`)) ||
              super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-close`),
            closeClasses:
              (this.triggerer &&
                this.triggerer.getAttribute(
                  `data-${ARG_ATTRIBUTE_NAME}-close-classes`
                )) ||
              super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-close-classes`),
            //@TODO program this pityur
            fullscreen:
              (this.triggerer &&
                this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-fullscreen`)) ||
              super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-fullscreen`),
            fullscreenClasses:
              (this.triggerer &&
                this.triggerer.getAttribute(
                  `data-${ARG_ATTRIBUTE_NAME}-fullscreen-classes`
                )) ||
              super
                .UIEl()
                .getAttribute(`data-${ARG_ATTRIBUTE_NAME}-fullscreen-classes`),

            //board specific
            align:
              (this.triggerer &&
                this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-align`)) ||
              super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-align`),
            resize:
              (this.triggerer &&
                this.triggerer.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-resize`)) ||
              super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-resize`),

            resizeClasses:
              (this.triggerer &&
                this.triggerer.getAttribute(
                  `data-${ARG_ATTRIBUTE_NAME}-resize-classes`
                )) ||
              super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-resize-classes`),

            //custom specific
            // customMarkup: //halat weit
          },
      Modal.configDefaults
    );
  }

  static get DATA_KEY() {
    return DATA_KEY;
  }

  create(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    if (!element) {
      return;
    }

    FwEvent.trigger(element, EVENT_BEFORE_CREATE);

    if (element || !window.location.hash) {
      this.destroy();
    }

    FwEvent.trigger(element, EVENT_CREATE);

    const id = this.UIElId || this.UIId;

    id !== `${this.UIId}` && this.args.changeHash && UIChangeHash(id);

    const theUI = document.createElement('div');
    document.querySelector('body').appendChild(theUI);
    theUI.className = `${UIPrefix(COMPONENT_CLASS)}  ${UIPrefix(
      COMPONENT_CLASS
    )}-mode-${this.mode} ${UIPrefix(COMPONENT_CLASS)}-component
			${this.args.align ? `${UIPrefix(COMPONENT_CLASS)}-align-${this.args.align}` : ''}
			${this.args.classes}`;
    theUI.setAttribute('id', this.UIId);

    theUI.innerHTML = this._markup;

    FwDom.moveContents(element, this.UIContentBlock);

    this.#current = {
      element: element,
      args: this.args,
    };

    if (this.args.width) {
      this.resize();
    }

    this.update();

    if (this.args.callback) {
      this._runFn(this.args.callback);
    }

    theUI.classList.add(ACTIVATED_CLASS);
    document.body.classList.add(UIBodyClass.noScroll);

    FwEvent.trigger(element, EVENT_AFTER_CREATE);
  }

  destroy(elem) {
    const element = elem ? super.UIEl(elem) : this.#current.element;

    if (!element) {
      return;
    }

    FwEvent.trigger(element, EVENT_BEFORE_DESTROY);
    FwEvent.trigger(element, EVENT_DESTROY);
    // removeHash = removeHash || false;

    let canRemoveHash = false;

    if (
      element.hasAttribute('id') &&
      element.getAttribute('id') == window.location.hash.replace('#', '')
    ) {
      canRemoveHash = true;
    }

    if (this.UIRoot) {
      FwDom.moveContents(this.UIContentBlock, element);

      this.UIRoot.classList.remove('active');
      this.UIRoot.parentNode.removeChild(this.UIRoot);
    }

    let removeBodClass = true;
    if (document.getElementById(this.UIId) && removeBodClass == true) {
      removeBodClass = false;
    }

    if (removeBodClass) {
      document.body.classList.remove(UIBodyClass.noScroll);
    }

    canRemoveHash && UIChangeHash('');

    FwEvent.trigger(element, EVENT_AFTER_DESTROY);

    this.#current = {
      element: false,
      args: false,
    };
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

    FwEvent.trigger(element, EVENT_BEFORE_UPDATE);
    FwEvent.trigger(element, EVENT_UPDATE);

    // buttons
    // resize
    const currentWidth = this.UIRoot.querySelector(
      `.${UIPrefix(COMPONENT_CLASS)}-popup`
    ).clientWidth;

    const resizeBtn = this.UIRoot.querySelectorAll(
      `*[data-toggle-${this.modeToggle}-resize]`
    );

    if (resizeBtn && currentWidth < parseInt(this.args.width)) {
      resizeBtn.forEach((butt) => {
        butt.classList.add('disabled');
      });
    } else {
      resizeBtn.forEach((butt) => {
        butt.classList.remove('disabled');
      });
    }

    FwEvent.trigger(element, EVENT_AFTER_UPDATE);
  }

  resize(width) {
    if (!this.#current) {
      return;
    }

    const args = args || this.args || this.#current.args || {};
    width = width || args.width || null;

    if (this.UIRoot && parseInt(width) >= parseInt(args.width)) {
      FwEvent.trigger(this.#current.element, EVENT_BEFORE_RESIZE);
      FwEvent.trigger(this.#current.element, EVENT_RESIZE);

      //all
      if (this.UIRoot.querySelector(`.${UIPrefix(COMPONENT_CLASS)}-popup`)) {
        this.UIRoot.querySelector(
          `.${UIPrefix(COMPONENT_CLASS)}-popup`
        ).style.width = width;
      }

      //bboard
      if (this.UIRoot.querySelector(`.${UIPrefix(COMPONENT_CLASS)}-button-wrapper`)) {
        this.UIRoot.querySelector(
          `.${UIPrefix(COMPONENT_CLASS)}-button-wrapper`
        ).style.width = width;
      }

      FwEvent.trigger(this.#current.element, EVENT_AFTER_RESIZE);
    }
  }

  get _markup() {
    let html = `<div
				class="
					${UIPrefix(COMPONENT_CLASS)}-wrapper"
			>`;

    //overlay
    html += `<a href="#"
						class="
							${UIPrefix(COMPONENT_CLASS)}-close-overlay"
							${this.args.disableOverlay == false ? `data-toggle-${this.modeToggle}-close` : ''}
					></a>`;

    switch (this.mode) {
      case 'board':
        html += `<div class="${UIPrefix(COMPONENT_CLASS)}-button-wrapper">`;
        if (this.args.close !== false) {
          html += `<a href="#"
										class="
											${UIPrefix(COMPONENT_CLASS)}-close ${UIPrefix(COMPONENT_CLASS)}-button
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

        if (this.args.resize !== false && this.args.width) {
          html += `<a
										class="
											${UIPrefix(COMPONENT_CLASS)}-resize ${UIPrefix(COMPONENT_CLASS)}-button
											${
                        this.args.resizeClasses
                          ? this.args.resizeClasses
                          : `${UIPrefix(COMPONENT_CLASS)}-button-default`
                      }"
										data-toggle-${this.modeToggle}-resize
									>
										<i class="symbol symbol-arrow-tail-left "></i>
										<i class="symbol symbol-arrow-tail-right "></i>
									</a>`;
        }
        html += `</div>`;

        html += `<div class="${UIPrefix(COMPONENT_CLASS)}-popup">`;

        if (this.args.title) {
          html += `<div class="${UIPrefix(COMPONENT_CLASS)}-header">
											<h1 class="${UIPrefix(COMPONENT_CLASS)}-title">${decodeURIComponent(
            this.args.title
          )}</h1>
										</div>`;
        }

        html += `<div class="${UIPrefix(COMPONENT_CLASS)}-popup-content"></div>`;

        html += `</div>`;

        break;

      default:
        html += `<div class="${UIPrefix(COMPONENT_CLASS)}-popup">`;

        if (this.args.title) {
          html += `<div class="${UIPrefix(COMPONENT_CLASS)}-header">
											<h1 class="${UIPrefix(COMPONENT_CLASS)}-title">${decodeURIComponent(
            this.args.title
          )}</h1>
										</div>`;
        }

        if (this.args.close !== false) {
          html += `<a href="#"
											class="${UIPrefix(COMPONENT_CLASS)}-close ${this.args.closeClasses}"
											data-toggle-${this.modeToggle}-close
										>
											<i class="symbol symbol-close"></i>
										</a>`;
        }

        html += `<div class="${UIPrefix(COMPONENT_CLASS)}-popup-content"></div>`;

        html += `</div>`;

        break;
    }

    html += '</div>';

    return html;
  }

  static handleResize(mode) {
    return (e) => {
      VALID_MODAL_MODES.forEach((mode) => {
        const modal = new Modal(
          Modal.current(mode).element,
          null,
          Modal.current(mode).args
        );
        modal.resize();
        modal.update();
      });
    };
  }

  static handleUniversal() {
    return () => {
      if (Settings.get('initializeModal')) {
        VALID_MODAL_MODES.forEach((mode) => {
          const modal = new Modal(
            UIToggled(
              Modal.#modeToggle(mode),
              null,
              `.${COMPONENT_CLASS}.${Modal.#modeClass(mode)}`
            )
          );
          modal.create();
        });
      }
    };
  }

  static handleOpen(mode) {
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

  static handleClose(mode) {
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

  static initListeners() {
    VALID_MODAL_MODES.forEach((mode) => {
      const modeToggle = Modal.#modeToggle(mode);

      FwEvent.addListener(
        document.documentElement,
        EVENT_CLICK,
        `*[data-toggle-${modeToggle}], *[data-toggle-${modeToggle}-open]`,
        Modal.handleOpen(mode)
      );

      FwEvent.addListener(
        document.documentElement,
        EVENT_CLICK,
        `*[data-toggle-${modeToggle}-close]`,
        Modal.handleClose(mode)
      );
    });

    FwEvent.addListener(null, EVENT_HASHCHANGE, window, Modal.handleUniversal());

    Initiator.Q.on_ready = Modal.handleUniversal();
    Initiator.Q.on_resize = Modal.handleResize();
  }
  static destroyListeners() {
    VALID_MODAL_MODES.forEach((mode) => {
      const modeToggle = Modal.#modeToggle(mode);

      FwEvent.removeListener(
        document.documentElement,
        EVENT_CLICK,
        Modal.handleOpen(mode)
      );

      FwEvent.removeListener(
        document.documentElement,
        EVENT_CLICK,
        Modal.handleClose(mode)
      );
    });

    FwEvent.removeListener(window, EVENT_HASHCHANGE, Modal.handleUniversal());
  }
}

export default Modal;

Modal.initListeners();
