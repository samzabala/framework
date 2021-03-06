import Settings from './../core/settings.js';
import Initiator from './../core/initiator.js';

import Modifiers from './../util/modifiers.js';

import FwEvent from './../data-helper/event.js';
import FwArray from './../data-helper/array.js';
import FwDom from './../data-helper/dom.js';

import FwComponent from './../classes/component.js';
import { UIPrefix } from './../util/ui.js';

const NAME = 'formTags';
const ARG_ATTRIBUTE_NAME = 'tags';
const COMPONENT_CLASS = `input-tags`;
const FOCUS_CLASS = `focus`;

const DATA_KEY = `${Settings.get('prefix')}_${NAME}`;

const EVENT_KEY = `_${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;
const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
const EVENT_BLUR = `blur${EVENT_KEY}`;
const EVENT_PASTE = `paste${EVENT_KEY}`;
// const EVENT_CHANGE = `change${EVENT_KEY}`;

const EVENT_BEFORE_INIT = `before_init${EVENT_KEY}`;
const EVENT_INIT = `init${EVENT_KEY}`;
const EVENT_AFTER_INIT = `after_init${EVENT_KEY}`;

const EVENT_BEFORE_RENDER = `before_render${EVENT_KEY}`;
const EVENT_RENDER = `render${EVENT_KEY}`;
const EVENT_AFTER_RENDER = `after_render${EVENT_KEY}`;

const EVENT_BEFORE_UPDATE = `before_update${EVENT_KEY}`;
const EVENT_UPDATE = `update${EVENT_KEY}`;
const EVENT_AFTER_UPDATE = `after_update${EVENT_KEY}`;

const INPUT_STRING = `__fw_input__`;

class Tags extends FwComponent {
  constructor(element, valueToRender, args) {
    super(element, {
      UIValue: valueToRender
        ? valueToRender
        : element && element._UIValue
        ? element._UIValue
        : false,
      _customArgs: args
        ? args
        : element && element.__customArgs
        ? element.__customArgs
        : {},
    });
  }

  dispose() {
    super.dispose();
    this.UIValue = null;
    this._customArgs = null;
  }

  static get DATA_KEY() {
    return DATA_KEY;
  }

  static get __is() {
    return INPUT_STRING;
  }

  get theValue() {
    return super.UIEl().value;
  }

  set theValue(theValue) {
    if (theValue) {
      super.UIEl().setAttribute('value', Tags.toVal(theValue, false));
      super.UIEl().value = Tags.toVal(theValue, false);
    }
  }

  get renderValue() {
    const renderTags = this.UIValue
      ? this.UIValue
      : super.UIEl().hasAttribute('data-value-ui')
      ? super.UIEl().getAttribute('data-value-ui')
      : this.theValue;
    return renderTags;
  }

  set renderValue(renderTags) {
    this.UIValue = Tags.toVal(renderTags);
  }

  get UIRoot() {
    return super.UIEl().closest(`.${UIPrefix(COMPONENT_CLASS)}`);
  }

  get UIInput() {
    return (
      this.UIRoot && this.UIRoot.querySelector(`.${UIPrefix(COMPONENT_CLASS)}-input`)
    );
  }

  get UIInputValue() {
    return this.UIInput.value;
  }

  set UIInputValue(inputValue) {
    this.UIInput.value = inputValue.toString().replace(/\n|\r/g, '\\n');
  }

  get UIInputIdx() {
    let toReturn = Tags.toArr(this.renderValue).indexOf(Tags.__is);

    if (toReturn < 0) {
      Tags.toArr(this.renderValue).length > 0
        ? Tags.toArr(this.renderValue).length - 1
        : 0;
    }

    return toReturn;

    // (
    // 	this.UIInput
    // 	&& parseInt(this.UIInput.getAttribute('data-ui-i'))
    // )
    // || Tags.toArr(this.renderValue).indexOf(Tags.__is)
    // || Tags.toArr(this.theValue).length;
  }

  _scrollToUIInput() {
    if (this.args.multipleLines || !this.UIInput) {
      return;
    }

    if (
      this.UIRoot.scrollLeft > this.UIInput.offsetLeft + this.UIInput.offsetWidth ||
      this.UIRoot.scrollLeft + this.UIRoot.clientWidth <
        this.UIInput.offsetLeft + this.UIInput.offsetWidth
    ) {
      FwDom.scrollToElem(this.UIRoot, this.UIInput, 'x');
      FwDom.scrollToElem(this.UIRoot, this.UIInput, 'y');
    }
  }

  static get configDefaults() {
    return {
      width: null,
      filter: null,
      onKeyUp: null,
      multipleLines: false,
      multipleLinesBreak: false,
    };
  }

  get args() {
    return FwComponent._parseArgs(
      {
        width: super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-width`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-width`)
          : this._customArgs.width,
        onKeyUp: super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-on-keyup`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-on-keyup`)
          : this._customArgs.onKeyUp,
        filter: super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-filter`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-filter`)
          : this._customArgs.filter,
        multipleLines: super
          .UIEl()
          .hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-multiple-lines`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-multiple-lines`)
          : this._customArgs.multipleLines,
        multipleLinesBreak: super
          .UIEl()
          .hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-multiple-lines-break`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-multiple-lines-break`)
          : this._customArgs.multipleLinesBreak,
      },
      Tags.configDefaults
    );
  }

  static toArr(value, returnsWithInput) {
    returnsWithInput = returnsWithInput !== false || returnsWithInput == true;

    let toReturn = Array.isArray(value)
      ? value
      : typeof value == 'string'
      ? value.split(',')
      : [];

    //remove duplicates
    toReturn = toReturn.reduce((acc, tag) => {
      if (!acc.includes(tag) && tag !== '') {
        acc.push(tag);
      }

      return acc;
    }, []);

    //check for ya boi
    toReturn.forEach((tag, i) => {
      if (!tag || tag == '' || (tag === Tags.__is && !returnsWithInput)) {
        toReturn.splice(i, 1);
      }
    });

    if (returnsWithInput && toReturn.indexOf(Tags.__is) < 0) {
      toReturn.push(Tags.__is);
    }

    return toReturn;
  }

  static toVal(value, returnsWithInput) {
    return Tags.toArr(value, returnsWithInput).join(',');
  }

  filterValue(custFn) {
    let fnToFilter, applyFilter;

    try {
      fnToFilter =
        custFn ||
        (typeof this.args.filter === 'string'
          ? eval(this.args.filter)
          : this.args.filter);
    } catch (err) {}

    if (typeof fnToFilter === 'function') {
      const fn = fnToFilter;

      applyFilter = (valueToFilter, fn) => {
        const noInputValueToFilter = (() => {
          return Tags.toVal(valueToFilter, false);
        })();

        // turn to array ya bopi without the input tag string
        // let toReturn = Tags.toArr(
        //   eval(`${filterFnName}("${noInputValueToFilter}")`),
        //   false
        // );

        let toReturn = Tags.toArr(fn(noInputValueToFilter), false);

        // console.log(
        // 	'index of input\n',inputIndex,
        // 	'\n\n\nfiltered and ready for splice\n',toReturn,
        // 	'\n\n\npassed to the fil;ter\n'Tags.toVal(valueToFilter,false),
        // 	'\n\n\nrar array\n'Tags.toArr(valueToFilter),
        // 	'\n\n\n no input field\n',noInputValueToFilter,Tags.toVal(valueToFilter,false),
        // 	'\n\n\n no input fieldas array\n'Tags.toArr(valueToFilter,false),
        // 	'\n\n\n string for eval\n', ( filterFnName +'("'+ noInputValueToFilter +'")'),
        // 	'\n\n\neval\n',  eval(filterFnName +'("'+ noInputValueToFilter +'")'),
        // 	'whAT ETHE FUCK'
        // );

        if (this.UIInputIdx > -1) {
          toReturn.splice(
            this.UIInputIdx < Tags.toArr(valueToFilter).length - 1
              ? this.UIInputIdx
              : toReturn.length,
            0,
            Tags.__is
          );
        }

        return Tags.toVal(toReturn);
      };

      this.theValue = applyFilter(this.theValue, fn);
      this.renderValue = applyFilter(this.renderValue, fn);
    }
  }

  update(newValue, allowFilter, valueToRender, inputText) {
    let theValue = newValue || this.theValue || '';

    let uiValue = valueToRender || theValue || this.renderValue || '';

    allowFilter = allowFilter == false ? false : true;

    inputText = inputText || false;

    const triggerChange =
      newValue && Tags.toVal(newValue, false) !== this.theValue ? true : false;

    super.runCycle(EVENT_BEFORE_UPDATE, EVENT_UPDATE, EVENT_AFTER_UPDATE, () => {
      this.theValue = theValue;
      this.renderValue = uiValue;

      if (this.args.filter && allowFilter) {
        this.filterValue();
      }

      this._renderUI();

      if (inputText) {
        this.UIInputValue = inputText;
        this.focus();
      }

      if (triggerChange) {
        FwEvent.trigger(super.UIEl(), 'change');
      }
    });
  }

  _renderUI(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    if (!element) {
      return;
    }

    const theUI = {};

    super.runCycle(
      EVENT_BEFORE_RENDER,
      EVENT_RENDER,
      EVENT_AFTER_RENDER,
      () => {
        theUI.container = this.UIRoot;
        if (!theUI.container) {
          theUI.container = document.createElement('div');
          element.parentNode.insertBefore(theUI.container, element);
          theUI.container.appendChild(element);
          theUI.container.classList.add('input');
          theUI.container.setAttribute(
            'class',
            `${Settings.get('uiClass')}
          ${Settings.get('uiJsClass')}
          ${element
            .getAttribute('class')
            .toString()
            .replace(COMPONENT_CLASS, UIPrefix(COMPONENT_CLASS))}`
          );

          theUI.container.classList.add(
            this.args.multipleLines
              ? `${UIPrefix(COMPONENT_CLASS)}-multiple`
              : `${UIPrefix(COMPONENT_CLASS)}-single`
          );

          this.args.multipleLines &&
            this.args.multipleLinesBreak &&
            theUI.container.classList.add(
              `${UIPrefix(COMPONENT_CLASS)}-multiple-break`
            );
        }

        if (this.args.width) {
          theUI.container.style = this.args.width;
        }
        //idk it never exists on initial so we dont have to do weird div wraping catches here

        theUI.wrapper = theUI.container.querySelector(
          `.${UIPrefix(COMPONENT_CLASS)}-wrapper`
        );

        if (!theUI.wrapper) {
          theUI.wrapper = document.createElement('div');
          theUI.container.appendChild(theUI.wrapper);
          theUI.wrapper.setAttribute('class', `${UIPrefix(COMPONENT_CLASS)}-wrapper`);
          theUI.wrapper = theUI.container.querySelector(
            `.${UIPrefix(COMPONENT_CLASS)}-wrapper`
          );
          const self = this;
          Initiator.Q.on_resize = () => {
            self._scrollToUIInput();
          };
        }

        theUI.input = this.UIInput;

        if (!theUI.input) {
          theUI.input = document.createElement('input');
          // theUI.input = document.createElement('span');
          theUI.wrapper.appendChild(theUI.input);
          theUI.input.setAttribute('class', `${UIPrefix(COMPONENT_CLASS)}-input`);
          // theUI.input.contentEditable = true;
          theUI.input = theUI.wrapper.querySelector(
            `.${UIPrefix(COMPONENT_CLASS)}-input`
          );

          if (element.hasAttribute('placeholder')) {
            theUI.input.setAttribute(
              // 'data-placeholder',
              'placeholder',
              element.getAttribute('placeholder')
            );
          }

          //nearest fw-ui parent will actually do tgoggl for bby because baby cant stand up on its own
          // if (element.hasAttribute('data-toggle')) {
          //   theUI.input.setAttribute(
          //     'data-toggle',
          //     element.getAttribute('data-toggle')
          //   );
          // }

          if (FwComponent.isDisabled(element)) {
            theUI.input.classList.add('disabled');
          }

          //bitch
          if (this.args.onKeyUp) {
            theUI.input.addEventListener('keyup', (event) => {
              const keyUpScript = eval(this.args.onKeyUp);
              if (keyUpScript) {
                return keyUpScript;
              }
            });
          }
        }

        //updoot tags
        const oldTags = theUI.wrapper.querySelectorAll(
          `.${UIPrefix(COMPONENT_CLASS)}-tag`
        );

        oldTags.forEach((tag) => {
          tag.parentNode.removeChild(tag);
        });

        let valArr = Tags.toArr(this.renderValue, true);

        theUI.input.setAttribute('data-ui-i', this.UIInputIdx);

        //validate tags
        // valArr = valArr.reduce((acc, tag) => {
        // 	if (!acc.includes(tag)) {
        // 		acc.push(tag);
        // 	}
        // 	return acc;
        // }, []);

        valArr.forEach((tag, i) => {
          //get index of input
          if (tag !== Tags.__is) {
            const tagHtml = document.createElement('span');

            if (i < this.UIInputIdx) {
              theUI.input.insertAdjacentElement('beforebegin', tagHtml);
            } else {
              theUI.wrapper.appendChild(tagHtml);
            }

            tagHtml.setAttribute('class', `${UIPrefix(COMPONENT_CLASS)}-tag`);

            tagHtml.innerHTML = `<button
              data-ui-i="${i}"
              class="${UIPrefix(COMPONENT_CLASS)}-tag-text ${UIPrefix(
              COMPONENT_CLASS
            )}-tag-button"
              type="button"
            >
              ${tag}
            </button>
            <button data-ui-i="${i}" class="${UIPrefix(
              COMPONENT_CLASS
            )}-tag-close ${UIPrefix(COMPONENT_CLASS)}-tag-button" type="button">
              <i class="symbol symbol-close"></i>
            </button>`;
          }
        });

        //attribues
        for (let i = 0; i < element.attributes.length; i++) {
          let attr = element.attributes[i];

          if (attr.specified) {
            if (
              attr.name.includes('data') &&
              !attr.name.includes('data-tags') &&
              !attr.name.includes('data-toggle') &&
              !attr.name.includes('data-value-ui')
            ) {
              theUI.container.setAttribute(attr.name, attr.value);
            }
          }
        }

        element.setAttribute('data-value-ui', this.renderValue);

        //keep that shoit bisibol
        this._scrollToUIInput();
      },
      element
    );
  }

  focus(disableNative) {
    disableNative = disableNative || false;
    const self = this;
    !disableNative &&
      setTimeout(function () {
        // console.log('poku','naAAANDATAAAOOOO',self.UIInput);
        self.UIInput.focus();
      }, 0);
    self.UIRoot.classList.add(FOCUS_CLASS);
    self._scrollToUIInput();
  }

  blur(disableNative) {
    disableNative = disableNative || false;
    const self = this;
    !disableNative &&
      setTimeout(function () {
        // console.log('bru','naAAANDATAAAOOOO');
        self.UIInput.blur();
      }, 0);
    self.UIRoot.classList.remove(FOCUS_CLASS);
  }

  init(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    this.update();
  }

  static initAll() {
    new Tags().runCycle(
      EVENT_BEFORE_INIT,
      EVENT_INIT,
      EVENT_AFTER_INIT,
      () => {
        const tagsInputs = document.querySelectorAll(`.${COMPONENT_CLASS}`);
        tagsInputs.forEach((poot) => {
          const tagsInput = new Tags(poot);
          tagsInput.init();
        });
      },
      document
    );
  }

  static handleEditablePaste() {
    return (e) => {
      e.preventDefault();

      if (!FwComponent.isDisabled(e.target)) {
        const tagsInput = new Tags(
          e.target
            .closest(`.${UIPrefix(COMPONENT_CLASS)}`)
            .querySelector(`.${COMPONENT_CLASS}`)
        );

        const pasted =
          e.clipboardData || window.clipboardData || e.originalEvent.clipboardData;

        tagsInput.UIInputValue += pasted.getData('text');

        tagsInput.blur();
      }
    };
  }

  static handleEditableFocus() {
    return (e) => {
      e.preventDefault();
      if (!FwComponent.isDisabled(e.target)) {
        const tagsInput = new Tags(e.target);
        tagsInput.focus();
      }
    };
  }

  static handleEditableBlur() {
    return (e) => {
      if (!FwComponent.isDisabled(e.target)) {
        const tagsInput = new Tags(
          e.target
            .closest(`.${UIPrefix(COMPONENT_CLASS)}`)
            .querySelector(`.${COMPONENT_CLASS}`)
        );
        //value para mareset ta kung hain si buloy
        let currValue = Tags.toArr(tagsInput.theValue);

        if (tagsInput.UIInputValue) {
          currValue.splice(
            tagsInput.UIInputIdx,
            0,
            tagsInput.UIInputValue.replace(',', '')
          );
        }

        tagsInput.UIInputValue = '';

        tagsInput.update(Tags.toVal(currValue, false), true);

        tagsInput.blur(true);
      }
    };
  }

  static handleEditableKeydown() {
    return (e) => {
      if (FwComponent.isDisabled(e.target)) {
        e.preventDefault();
      } else {
        const tagsInput = new Tags(
          e.target
            .closest(`.${UIPrefix(COMPONENT_CLASS)}`)
            .querySelector(`.${COMPONENT_CLASS}`)
        );
        let currUIValue = Tags.toArr(tagsInput.renderValue),
          newValue,
          allowFilter = false;

        switch (e.key) {
          //enter
          case 'Enter':
            e.preventDefault();
            tagsInput.blur();
            break;

          //comma
          case ',':
            if (!Modifiers.hasActive()) {
              allowFilter = true;
              e.preventDefault();
              currUIValue.splice(
                tagsInput.UIInputIdx,
                0,
                tagsInput.UIInputValue.replace(',', '')
              );

              tagsInput.UIInputValue = '';
            }
            // currUIValue.splice()
            break;

          //left
          case 'ArrowLeft':
            if (!tagsInput.UIInputValue) {
              e.preventDefault();
              currUIValue = FwArray.moveItem(
                currUIValue,
                tagsInput.UIInputIdx,
                tagsInput.UIInputIdx > 0 ? tagsInput.UIInputIdx - 1 : 0
              );
            }

            break;

          //right
          case 'ArrowRight':
            if (!tagsInput.UIInputValue) {
              e.preventDefault();
              currUIValue = FwArray.moveItem(
                currUIValue,
                tagsInput.UIInputIdx,
                tagsInput.UIInputIdx < currUIValue.length
                  ? tagsInput.UIInputIdx + 1
                  : currUIValue.length - 1
              );
              // tagsInput._scrollToUIInput();
            }
            break;

          //up
          case 'ArrowUp':
            if (!tagsInput.UIInputValue) {
              e.preventDefault();
              currUIValue = FwArray.moveItem(currUIValue, tagsInput.UIInputIdx, 0);
            }

            break;

          //down
          case 'ArrowDown':
            if (!tagsInput.UIInputValue) {
              e.preventDefault();
              currUIValue = FwArray.moveItem(
                currUIValue,
                tagsInput.UIInputIdx,
                currUIValue.length - 1
              );
              // tagsInput._scrollToUIInput();
            }
            break;

          //backspace
          case 'Backspace':
            if (!tagsInput.UIInputValue) {
              e.preventDefault();
              allowFilter = true;
              currUIValue.splice(tagsInput.UIInputIdx - 1, 1);
            }
            break;

          //delete
          case 'Delete':
            if (!tagsInput.UIInputValue) {
              e.preventDefault();
              allowFilter = true;
              currUIValue.splice(tagsInput.UIInputIdx + 1, 1);
            }
            break;
        }

        newValue = Tags.toVal(currUIValue);
        // tagsInput._scrollToUIInput();

        tagsInput.update(newValue, allowFilter);
      }
    };
  }

  static handleDelete() {
    return (e) => {
      e.preventDefault();

      if (!FwComponent.isDisabled(e.target)) {
        const tagsInput = new Tags(
          e.target
            .closest(`.${UIPrefix(COMPONENT_CLASS)}`)
            .querySelector(`.${COMPONENT_CLASS}`)
        );

        const tagToRemove = parseInt(e.target.getAttribute('data-ui-i'));

        let currValue = Tags.toArr(tagsInput.theValue);

        currValue.splice(parseInt(tagToRemove), 1);

        const newValue = Tags.toVal(currValue);

        tagsInput.update(newValue, true);
      }
    };
  }

  static handleEdit() {
    return (e) => {
      const triggerer = e.target;

      e.preventDefault();

      if (!FwComponent.isDisabled(triggerer)) {
        const tagsInput = new Tags(
          e.target
            .closest(`.${UIPrefix(COMPONENT_CLASS)}`)
            .querySelector(`.${COMPONENT_CLASS}`)
        );

        const tagToEdit = parseInt(e.target.getAttribute('data-ui-i'));

        let currValue = Tags.toArr(tagsInput.theValue, false);

        currValue.splice(tagToEdit, 1, Tags.__is);

        const newUIValue = Tags.toVal(currValue);

        tagsInput.update(null, false, newUIValue, e.target.innerText);
      }
    };
  }

  static initListeners() {
    FwEvent.addListener(
      document.documentElement,
      EVENT_PASTE,
      `.${UIPrefix(COMPONENT_CLASS)} .${UIPrefix(COMPONENT_CLASS)}-input`,
      Tags.handleEditablePaste()
    );

    FwEvent.addListener(
      document.documentElement,
      EVENT_CLICK,
      `.${UIPrefix(COMPONENT_CLASS)} .${UIPrefix(COMPONENT_CLASS)}-input`,
      Tags.handleEditableFocus()
    );

    FwEvent.addListener(
      document.documentElement,
      EVENT_BLUR,
      `.${UIPrefix(COMPONENT_CLASS)} .${UIPrefix(COMPONENT_CLASS)}-input`,
      Tags.handleEditableBlur()
    );

    FwEvent.addListener(
      document.documentElement,
      EVENT_KEYDOWN,
      `.${UIPrefix(COMPONENT_CLASS)} .${UIPrefix(COMPONENT_CLASS)}-input`,
      Tags.handleEditableKeydown()
    );

    FwEvent.addListener(
      document.documentElement,
      EVENT_CLICK,
      `.${UIPrefix(COMPONENT_CLASS)} .${UIPrefix(COMPONENT_CLASS)}-tag-close`,
      Tags.handleDelete()
    );

    FwEvent.addListener(
      document.documentElement,
      EVENT_CLICK,
      `.${UIPrefix(COMPONENT_CLASS)} .${UIPrefix(COMPONENT_CLASS)}-tag-text`,
      Tags.handleEdit()
    );

    if (Settings.get('initializeForm')) {
      Initiator.Q.on_ready = Tags.initAll;
    }
  }
  static destroyListeners() {
    FwEvent.removeListener(
      document.documentElement,
      EVENT_PASTE,
      Tags.handleEditablePaste()
    );

    FwEvent.removeListener(
      document.documentElement,
      EVENT_CLICK,
      Tags.handleEditableFocus()
    );

    FwEvent.removeListener(
      document.documentElement,
      EVENT_BLUR,
      Tags.handleEditableBlur()
    );

    FwEvent.removeListener(
      document.documentElement,
      EVENT_KEYDOWN,
      Tags.handleEditableKeydown()
    );

    FwEvent.removeListener(document.documentElement, EVENT_CLICK, Tags.handleDelete());

    FwEvent.removeListener(document.documentElement, EVENT_CLICK, Tags.handleEdit());
  }
}

export default Tags;

Tags.initListeners();
