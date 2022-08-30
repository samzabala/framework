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
const EVENT_CHANGE = `change${EVENT_KEY}`;

const EVENT_BEFORE_INIT = `before_init${EVENT_KEY}`;
const EVENT_INIT = `init${EVENT_KEY}`;
const EVENT_AFTER_INIT = `after_init${EVENT_KEY}`;

const EVENT_BEFORE_RESET = `before_reset${EVENT_KEY}`;
const EVENT_RESET = `reset${EVENT_KEY}`;
const EVENT_AFTER_RESET = `after_reset${EVENT_KEY}`;

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
      isFiltering:
        element && Object.prototype.hasOwnProperty.call(element, 'isFiltering')
          ? element._isFiltering
          : true,
      triggerChange:
        element && Object.prototype.hasOwnProperty.call(element, '_triggerChange')
          ? element._triggerChange
          : false,
      _renderValue: valueToRender
        ? valueToRender
        : element && Object.prototype.hasOwnProperty.call(element, '__renderValue')
        ? element.__renderValue
        : false,
      _customArgs: args
        ? args
        : element && element.__customArgs
        ? element.__customArgs
        : {},
    });
  }

  dispose() {
    super.setProp('isFiltering', '__dispose');
    super.setProp('triggerChange', '__dispose');
    super.setProp('_renderValue', '__dispose');
    super.setProp('_customArgs', '__dispose');
    super.dispose();
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
    theValue = theValue || '';
    super.UIEl().setAttribute('value', Tags.toVal(theValue, false));
    super.UIEl().value = Tags.toVal(theValue, false);
  }

  get renderValue() {
    const renderTags = super.getProp('_renderValue') || Tags.toVal(this.theValue, true);

    if (!super.getProp('_renderValue')) {
      super.setProp('_renderValue', renderTags);
    }

    return super.getProp('_renderValue');
  }

  set renderValue(renderTags) {
    const parsedRenderTags = Tags.toVal(renderTags, true);
    super.UIEl().setAttribute('data-value-ui', parsedRenderTags);
    super.setProp('_renderValue', parsedRenderTags);
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
    // return this.UIInput.value;
    return this.UIInput && this.UIInput.innerText ? this.UIInput.innerText : '';
  }

  set UIInputValue(inputValue) {
    // this.UIInput.value = inputValue.toString().replace(/\n|\r/g, '\\n');
    this.UIInput.innerText = inputValue.toString().replace(/\n|\r/g, '\\n');
  }

  get UIInputIdx() {
    let toReturn = Tags.toArr(this.renderValue, true).indexOf(Tags.__is);

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

  __enableFilter() {
    super.setProp('isFiltering', true);
  }

  __disableFilter() {
    super.setProp('isFiltering', false);
  }

  __mustOnChange() {
    return super.getProp('triggerChange');
  }

  __enableChange() {
    super.setProp('triggerChange', true);
  }

  __disableChange() {
    super.setProp('triggerChange', false);
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

  static configDefaults() {
    return {
      width: null,
      filter: null,
      onKeyUp: null,
      multipleLines: false,
      multipleLinesBreak: false,
      maxChar: {
        value: 0,
        parser: (value) => {
          if (parseInt(value) > 0) {
            value = parseInt(value);
          } else {
            return 0;
          }

          return value;
        },
      },
      snipToLimit: false,
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
        maxChar: super.UIEl().hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-max-char`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-max-char`)
          : this._customArgs.maxChar,
        maxCharSnip: super
          .UIEl()
          .hasAttribute(`data-${ARG_ATTRIBUTE_NAME}-max-char-snip`)
          ? super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-max-char-snip`)
          : this._customArgs.maxCharSnip,
      },
      Tags.configDefaults()
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
      //check against a case so you can catch different cases
      const matcher = acc.map((tag) => tag.toUpperCase());

      if (!acc.includes(tag) && !matcher.includes(tag.toUpperCase()) && tag !== '') {
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

  _trimOrLimit(tags) {
    let trimmed = [];

    tags.forEach((tag) => {
      //do not filter ya boi because you need that to type stuff in it
      if (tag === INPUT_STRING) {
        trimmed.push(tag);
        return;
      }

      if (tag.toString().length > this.args.maxChar) {
        if (this.args.maxCharSnip) {
          trimmed.push(tag.substr(0, this.args.maxChar - 1) + '…');
        }
      } else {
        trimmed.push(tag);
      }
    });

    return trimmed;
  }

  trim() {
    if (!(this.args.maxChar > 0)) {
      return;
    }

    this.theValue = this._trimOrLimit(Tags.toArr(this.theValue));
    this.renderValue = this._trimOrLimit(Tags.toArr(this.renderValue, true));
  }

  filterValue(custFn) {
    let fnToFilter, applyFilter;

    try {
      fnToFilter =
        custFn ||
        (typeof this.args.filter === 'string'
          ? eval(this.args.filter)
          : this.args.filter);
    } catch (err) {
      console.error(err);
    }

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
        // console.log(noInputValueToFilter);
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

  validate() {
    //limit tag lengths
    this.trim();

    //filter args
    if (this.args.filter && this.isFiltering) {
      this.filterValue();
      //reset filtering to true after
      this.__enableFilter();
    }
  }

  _updateValues(theValue, uiValue, inputText) {
    this.theValue = theValue;
    this.renderValue = uiValue;
    if (inputText) {
      this.UIInputValue = inputText;
    }
    // console.warn('set');
    // console.log(this.theValue,'|',this.renderValue,'|',this.UIInputValue);
    this.validate();
    // console.warn('after validate');
    // console.log(this.theValue,'|',this.renderValue,'|',this.UIInputValue);
  }

  update(newValue, valueToRender, inputText) {
    const theValue =
      newValue || newValue == '' ? newValue : this.theValue ? this.theValue : false;
    const uiValue = valueToRender
      ? valueToRender
      : newValue || newValue == ''
      ? theValue
      : this.renderValue
      ? this.renderValue
      : false;

    inputText = inputText || false;
    // console.warn('passed');
    // console.log(newValue,'|',valueToRender,'|',inputText);
    // console.warn('parsed');
    // console.log(theValue,'|',uiValue,'|',inputText);

    // const triggerChange =
    //   newValue && Tags.toVal(newValue, false) !== this.theValue ? true : false;

    this._updateValues(theValue, uiValue, inputText);

    const lifeCycle = {};

    if (this.__mustOnChange()) {
      lifeCycle.before = () => {
        this.change();
        return false;
      };
    } else {
      lifeCycle.during = () => {
        this._renderUI();
      };

      lifeCycle.after = () => {
        if (inputText) {
          this.focus();
        }
      };
    }
    super.runCycle(EVENT_BEFORE_UPDATE, EVENT_UPDATE, EVENT_AFTER_UPDATE, lifeCycle);
  }

  reset() {
    const element = this.element;
    super.runCycle(
      EVENT_BEFORE_RESET,
      EVENT_RESET,
      EVENT_AFTER_RESET,
      () => {
        // this.__enableChange();
        this.update('', '');
      },
      element
    );
  }

  change(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    this.__disableChange(); // so it dont loop
    FwEvent.trigger(element, 'change');
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
          // theUI.input = document.createElement('input');
          theUI.input = document.createElement('span');
          theUI.wrapper.appendChild(theUI.input);
          theUI.input.setAttribute('class', `${UIPrefix(COMPONENT_CLASS)}-input`);
          theUI.input.contentEditable = true;
          theUI.input = theUI.wrapper.querySelector(
            `.${UIPrefix(COMPONENT_CLASS)}-input`
          );

          if (element.hasAttribute('placeholder')) {
            theUI.input.setAttribute(
              'data-placeholder',
              // 'placeholder',
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
            if (typeof this.args.onKeyUp === 'string') {
              //attribute setup
              theUI.input.addEventListener('keyup', (event) => {
                if (event) return eval(this.args.onKeyUp);
              });
            } else {
              //api setup
              theUI.input.addEventListener('keyup', this.args.onKeyUp);
            }
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
              !attr.name.includes('data-value-ui')
            ) {
              theUI.input.setAttribute(attr.name, attr.value);
            }
          }
        }

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
    elem ? super.UIEl(elem) : super.UIEl();
    this.update(this.theValue, this.theValue);
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

  static handleChange() {
    return (e) => {
      if (!FwComponent.isDisabled(e.target)) {
        const tagsInput = new Tags(e.target);
        tagsInput.update(tagsInput.theValue, tagsInput.renderValue);
      }
    };
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

        tagsInput.UIInputValue += pasted.getData('text').replace(',', '');

        tagsInput.__enableChange();
        tagsInput.blur();
      }
    };
  }

  static handleEditableFocus() {
    return (e) => {
      e.preventDefault();
      if (!FwComponent.isDisabled(e.target)) {
        const tagsInput = new Tags(
          e.target
            .closest(`.${UIPrefix(COMPONENT_CLASS)}`)
            .querySelector(`.${COMPONENT_CLASS}`)
        );
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
        let currValue = Tags.toArr(tagsInput.renderValue);

        if (tagsInput.UIInputValue !== '') {
          currValue.splice(
            tagsInput.UIInputIdx,
            currValue[tagsInput.UIInputIdx] == tagsInput.UIInputValue ? 1 : 0,
            tagsInput.UIInputValue.replace(',', '')
          );
          tagsInput.__enableChange();
        }

        tagsInput.UIInputValue = '';
        tagsInput.update(Tags.toVal(currValue, false), Tags.toVal(currValue, false));

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
        let currUIValue = Tags.toArr(tagsInput.renderValue, true),
          newValue,
          enableChange,
          allowFilter;
        switch (e.key) {
          //enter
          case 'Enter':
            e.preventDefault();
            tagsInput.blur();
            enableChange = true;
            break;

          //comma
          case ',':
            if (!Modifiers.hasActive()) {
              e.preventDefault();
              currUIValue.splice(
                tagsInput.UIInputIdx,
                0,
                tagsInput.UIInputValue.replace(',', '')
              );
              allowFilter = true;
              tagsInput.UIInputValue = '';
              enableChange = true;
            }
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
              enableChange = true;
            }
            break;

          //delete
          case 'Delete':
            if (!tagsInput.UIInputValue) {
              e.preventDefault();
              allowFilter = true;
              currUIValue.splice(tagsInput.UIInputIdx + 1, 1);
              enableChange = true;
            }
            break;
        }

        newValue = Tags.toVal(currUIValue);
        // tagsInput._scrollToUIInput();
        if (!allowFilter) {
          tagsInput.__disableFilter();
        }
        if (enableChange) {
          tagsInput.__enableChange();
        }
        tagsInput.update(newValue, currUIValue);
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

        let currValue = Tags.toArr(tagsInput.renderValue);

        currValue.splice(parseInt(tagToRemove), 1);

        const newValue = Tags.toVal(currValue);

        tagsInput.__enableChange();
        tagsInput.update(newValue);
      }
    };
  }

  static handleEdit() {
    return (e) => {
      e.preventDefault();

      if (!FwComponent.isDisabled(e.target)) {
        const tagsInput = new Tags(
          e.target
            .closest(`.${UIPrefix(COMPONENT_CLASS)}`)
            .querySelector(`.${COMPONENT_CLASS}`)
        );
        tagsInput.blur(true);

        const tagToEdit = parseInt(e.target.getAttribute('data-ui-i'));

        let currValue = Tags.toArr(tagsInput.theValue, false);

        currValue.splice(tagToEdit, 1, Tags.__is);

        const newUIValue = Tags.toVal(currValue);
        tagsInput.__disableFilter();
        tagsInput.__disableChange();
        tagsInput.update(null, newUIValue, e.target.innerText);
      }
    };
  }

  static initListeners() {
    FwEvent.addListener(
      document.documentElement,
      EVENT_CHANGE,
      `.${COMPONENT_CLASS}`,
      Tags.handleChange()
    );
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
    FwEvent.removeListener(document.documentElement, EVENT_CHANGE, Tags.handleChange());
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
