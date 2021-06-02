import Settings from './../core/settings.js';
import Initiator from './../core/initiator.js';

import FwEvent from './../data-helper/event.js';
import FwDom from './../data-helper/dom.js';
import FwDate from './../data-helper/date.js';

import FwComponent from './../classes/component.js';
import { UIPrefix, UIDynamicClass } from './../util/ui.js';
import {
  DateTimePreset,
  dayNamesShorter,
  monthNamesShort,
} from './../util/validation.js';

import Dropdown from './../dropdown.js';

const NAME = 'formCalendar';
const ARG_ATTRIBUTE_NAME = 'calendar';
const COMPONENT_CLASS = `input-calendar`;
const ACTIVATED_CLASS = `active`;

const DATA_KEY = `${Settings.get('prefix')}_${NAME}`;

const EVENT_KEY = `_${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;
const EVENT_KEYUP = `keyup${EVENT_KEY}`;
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

const EVENT_BEFORE_RESET = `before_reset${EVENT_KEY}`;
const EVENT_RESET = `update${EVENT_KEY}`;
const EVENT_AFTER_RESET = `after_reset${EVENT_KEY}`;

class Calendar extends FwComponent {
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
        : false,
    });
  }

  dispose() {
    super.dispose();
    this.UIValue = null;
    this._customArgs = null;
  }

  get isRequired() {
    return super.UIEl().hasAttribute('required');
  }

  get theValue() {
    return super.UIEl().value ? FwDate.toVal(super.UIEl().value) : false;
  }

  set theValue(theValue) {
    if (theValue) {
      super.UIEl().setAttribute('value', FwDate.toVal(theValue));
      super.UIEl().value = FwDate.toVal(theValue);
    }
  }

  get renderValue() {
    const theRenderDate = this.UIValue
      ? this.UIValue
      : this.theValue
      ? this.theValue
      : new Date();

    return FwDate.toVal(theRenderDate);
  }

  set renderValue(renderDate) {
    this.UIValue = renderDate;
  }

  get UIInputValue() {
    return this.UIInput && FwDate.toVal(this.UIInput.value);
  }

  set UIInputValue(uiValue) {
    this.UIInput.setAttribute('value', FwDate.toHuman(uiValue));
    this.UIInput.value = FwDate.toHuman(uiValue);
  }

  get UIRoot() {
    return super.UIEl().closest(`.${UIPrefix(COMPONENT_CLASS)}`);
  }

  get UIDates() {
    return (
      this.UIRoot && this.UIRoot.querySelectorAll(`.${UIPrefix(COMPONENT_CLASS)}-date`)
    );
  }

  get UIInput() {
    return this.UIRoot.querySelector(`.${UIPrefix(COMPONENT_CLASS)}-input input`);
  }

  static get configDefaults() {
    return {
      class: '',
      startDay: {
        value: 0,
        parser: (value) => {
          return parseInt(value) % 7;
        },
      }, // su,mo,tu,we,th,fr,sa,
      min: null,
      max: null,
      yearSpan: {
        value: 0,
        parser: (value) => {
          if (parseInt(value) <= 0) {
            value = 0;
          }

          return value;
        },
      },
      disabledDates: '', //yyyy-mm-dd,weekends,past,future
      textInput: false,
      monthSkip: true,
      yearSkip: false,
    };
  }

  get args() {
    return FwComponent._parseArgs(
      this._customArgs
        ? this._customArgs
        : {
            class: super.UIEl().getAttribute('class'),
            startDay: super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-start-day`), // 0,1,2,3,4,5,6
            min:
              super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-min`) ||
              super.UIEl().getAttribute('min'),
            max:
              super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-max`) ||
              super.UIEl().getAttribute('max'),
            yearSpan: super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-year-span`),
            disabledDates: super
              .UIEl()
              .getAttribute(`data-${ARG_ATTRIBUTE_NAME}-disabled-dates`),
            textInput: super
              .UIEl()
              .getAttribute(`data-${ARG_ATTRIBUTE_NAME}-text-input`),
            monthSkip: super
              .UIEl()
              .getAttribute(`data-${ARG_ATTRIBUTE_NAME}-month-skip`),
            yearSkip: super.UIEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-year-skip`),
          },
      Calendar.configDefaults
    );
  }

  static get DATA_KEY() {
    return DATA_KEY;
  }

  reset() {
    const element = this.element;
    super.runCycle(
      EVENT_BEFORE_RESET,
      EVENT_RESET,
      EVENT_AFTER_RESET,
      () => {
        this.theValue = FwDate.toVal(false, false);
        this._renderUI();
      },
      element
    );
  }

  update(newValue, valueToRender) {
    const element = this.element;

    const theValue =
      newValue || newValue === '' ? FwDate.toVal(newValue) : this.theValue;
    const uiValue = FwDate.toVal(valueToRender) || theValue || this.renderValue;

    super.runCycle(
      EVENT_BEFORE_UPDATE,
      EVENT_UPDATE,
      EVENT_AFTER_UPDATE,
      () => {
        if (this.validates(theValue) || !theValue) {
          this.theValue = FwDate.toVal(theValue, false);
          this.renderValue = uiValue;

          this._renderUI();
        }

        //user visual feedback if it has a valid bitch
        if (!super.UIEl().classList.contains('input-error')) {
          if (this.validates(theValue) || (!theValue && !this.isRequired)) {
            this.UIRoot.classList.remove('input-error');
          } else {
            this.UIRoot.classList.add('input-error');
          }
        }

        if (this.theValue) {
          this.UIDates.forEach((date) => {
            if (date.getAttribute('data-value') == theValue) {
              date.classList.add(ACTIVATED_CLASS);
            } else {
              date.classList.remove(ACTIVATED_CLASS);
            }
          });

          if (this.UIInput) {
            this.UIInputValue = theValue;
          }
        }
        newValue && FwEvent.trigger(super.UIEl(), 'change');
      },
      element
    );
  }

  validates(date, rangeOnly) {
    date = date || this.theValue;
    rangeOnly = rangeOnly || false; //range,spot

    const d = FwDate.toParsed(date),
      checkAgainst = this.args.disabledDates.split(',');

    let toReturn = true;

    if (!rangeOnly) {
      //if in disabled dates
      if (checkAgainst.includes(FwDate.toVal(d))) {
        // console.warn('value is declared disabled specifically || ',FwDate.toVal(d));
        toReturn = false;
      }

      //weekend
      if (checkAgainst.includes('weekends') && (d.getDay() == 0 || d.getDay() == 6)) {
        // console.warn('value was a weekend || ',FwDate.toVal(d),FwDate.toVal(d));
        toReturn = false;
      }
    }

    //in the past
    let dateNow = new Date();
    dateNow.setHours(0, 0, 0, 0);
    if (checkAgainst.includes('past') && d < dateNow) {
      // console.warn('value was in the past || ',FwDate.toVal(d),'\nversus ',FwDate.toVal(dateNow));
      toReturn = false;
    }

    if (checkAgainst.includes('future') && d > dateNow) {
      // console.warn('value was in the future || ',FwDate.toVal(date),'\nversus ',FwDate.toVal(dateNow));
      toReturn = false;
    }

    //if  in range of min or max
    if (
      (FwDate.toParsed(this.args.max) && FwDate.toParsed(this.args.max) < d) ||
      (FwDate.toParsed(this.args.min) && d < FwDate.toParsed(this.args.min))
    ) {
      // console.warn('value not in max and width || ',FwDate.toVal(d));;
      toReturn = false;
    }

    //check if values are actually legit dates
    //month
    //date

    return toReturn;
  }

  get _calendar() {
    const renderDate = this.renderValue;

    const toReturn = {
      year: FwDate.toParsed(renderDate).getFullYear(),
      month: FwDate.toParsed(renderDate).getMonth(),
    };
    toReturn.startDate = new Date(toReturn.year, toReturn.month, 1);

    toReturn.lastDate = new Date(toReturn.year, toReturn.month + 1, 0);

    toReturn.prevDate = new Date(toReturn.year, toReturn.month, 0);
    toReturn.prevDay = toReturn.prevDate.getDay();

    return toReturn;
  }

  _arrowHtml = (buttonClass) => {
    let symbolClass, arrowDate, disValid, arrowClass;
    //set a new date with no date because fuck that boi
    // console.warn(buttonClass,'hello i fucked up','\n',FwDate.toParsed(uiValue),'\n',this._calendar.startDate,'\n', new Date(this._calendar.year,this._calendar.month));
    switch (buttonClass) {
      case 'prev-month':
        symbolClass = 'symbol-arrow-left';
        arrowClass = 'month';
        arrowDate = FwDate.toVal(FwDate.adjacentMonth(this._calendar.startDate, -1));
        disValid = this.validates(
          new Date(this._calendar.year, this._calendar.month, 0),
          true
        );
        break;

      case 'prev-year':
        symbolClass = 'symbol-arrow-double-left';
        arrowClass = 'year';
        arrowDate = FwDate.toVal(FwDate.adjacentMonth(this._calendar.startDate, -12));
        disValid = this.validates(
          new Date(this._calendar.year - 1, this._calendar.month, 0),
          true
        );
        break;

      case 'next-month':
        symbolClass = 'symbol-arrow-right';
        arrowClass = 'month';
        arrowDate = FwDate.toVal(FwDate.adjacentMonth(this._calendar.startDate, 1));
        disValid = this.validates(
          new Date(this._calendar.year, this._calendar.month + 1, 1),
          true
        );
        break;

      case 'next-year':
        symbolClass = 'symbol-arrow-double-right';
        arrowClass = 'year';
        arrowDate = FwDate.toVal(FwDate.adjacentMonth(this._calendar.startDate, 12));
        disValid = this.validates(
          new Date(this._calendar.year + 1, this._calendar.month, 1),
          true
        );
        break;
    }

    //kung yung at least yung last day nang prev or first day ng next man lang ay valid pwidi sya ipindoot
    let htmlString = `<button type="button"
			class="
				${!disValid ? `disabled ` : ''}
				${UIPrefix(COMPONENT_CLASS)}-navigation
				${UIPrefix(COMPONENT_CLASS)}-button
				${UIPrefix(COMPONENT_CLASS)}-${arrowClass}
				${UIPrefix(COMPONENT_CLASS)}-${buttonClass}" data-value="${arrowDate}"
			>
				<i class="${UIPrefix(COMPONENT_CLASS)}symbol symbol ${symbolClass}"></i>
			</button>`;

    return htmlString;
  };

  _blockHtml = (date, customClass) => {
    customClass = customClass || '';
    return `<button type="button" data-value="${FwDate.toVal(date)}"
				class="
				${UIPrefix(COMPONENT_CLASS)}-block
				${UIPrefix(COMPONENT_CLASS)}-button
				${UIPrefix(COMPONENT_CLASS)}-date
				${customClass}
			">
				<span>${date.getDate()}</span>
			</button>`;
  };

  _renderUI(elem, uiValue) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    uiValue = uiValue || this.renderValue;
    this.renderValue = uiValue;

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
          theUI.container.setAttribute(
            'class',
            `${Settings.get('uiClass')}
          ${Settings.get('uiJsClass')}
          ${element
            .getAttribute('class')
            .toString()
            .replace(COMPONENT_CLASS, UIPrefix(COMPONENT_CLASS))}`
          );
        }

        theUI.inputWrapper = theUI.container.querySelector(
          `.${UIPrefix(COMPONENT_CLASS)}-input`
        );

        const components = FwDom.getSiblings(element);
        components.forEach((component) => {
          if (component !== theUI.inputWrapper) {
            component.parentNode.removeChild(component);
          }
        });

        //input
        if (this.args.textInput) {
          if (!theUI.inputWrapper) {
            theUI.inputWrapper = document.createElement('div');
            theUI.container.appendChild(theUI.inputWrapper);
            theUI.inputWrapper.setAttribute(
              'class',
              `${UIPrefix(COMPONENT_CLASS)}-input`
            );
            theUI.inputWrapper.innerHTML =
              '<input class="input input-single-line" type="text" maxlength="10" placeholder="MM/DD/YYYY" />';
          }
        }

        //heading
        theUI.heading = document.createElement('div');
        theUI.container.appendChild(theUI.heading);
        theUI.heading.setAttribute('class', `${UIPrefix(COMPONENT_CLASS)}-heading`);

        //arrowz
        const butts = ['prev-year', 'prev-month', 'next-month', 'next-year'];

        butts.forEach((butt) => {
          if (
            (this.args.yearSkip && (butt == 'prev-year' || butt == 'next-year')) ||
            (this.args.monthSkip && (butt == 'prev-month' || butt == 'next-month'))
          ) {
            theUI.heading.innerHTML += this._arrowHtml(butt);
          }
        });

        //title
        theUI.title = document.createElement('div');
        theUI.heading.appendChild(theUI.title);
        theUI.title.setAttribute(
          'class',
          `${UIPrefix(COMPONENT_CLASS)}-title ${UIPrefix(
            COMPONENT_CLASS
          )}-dropdown-toggle
          ${UIDynamicClass}` //NEED THIS AT ALL TIMES IF U DONT WANNA DIE
        );
        theUI.title.setAttribute('data-toggle-dropdown', '');
        theUI.title.innerHTML = `<span
          class="${UIPrefix(COMPONENT_CLASS)}-month-text">
            ${monthNamesShort[this._calendar.month]}
          </span>
          <span class="${UIPrefix(COMPONENT_CLASS)}-year-text">
            ${this._calendar.year}
          </span>
          <i class="${UIPrefix(
            COMPONENT_CLASS
          )}-symbol symbol symbol-caret-down no-margin-x"></i>`;

        //dropdown
        const dropdown = document.createElement('ul');
        theUI.heading.appendChild(dropdown);
        dropdown.setAttribute('data-dropdown-width', '100%');
        dropdown.setAttribute(
          'class',
          `${UIPrefix(
            COMPONENT_CLASS
          )}-dropdown dropdown dropdown-center-x dropdown-top-flush text-align-center`
        );
        dropdown.innerHTML += `<li
            class="${UIPrefix(COMPONENT_CLASS)}-current-month-year active"
          >
            <a href="#"
              class="${UIPrefix(COMPONENT_CLASS)}-month"
              data-value="${FwDate.toVal(this._calendar.startDate)}"
            >
              ${monthNamesShort[this._calendar.month]} ${this._calendar.year}
            </a>
          </li>
          <li><hr class="dropdown-separator"></li>`;

        theUI.dropdown = new Dropdown(dropdown, theUI.title);

        let dropdownInit, dropdownLimit;

        if (this.args.yearSpan == 0) {
          dropdownInit = this._calendar.startDate.getMonth() * -1;
          dropdownLimit = 11 - this._calendar.startDate.getMonth();
        } else {
          dropdownInit = parseInt(-12 * parseInt(this.args.yearSpan));
          dropdownLimit = parseInt(12 * parseInt(this.args.yearSpan));
        }

        //update dropdown
        for (let i = dropdownInit; i <= dropdownLimit; i++) {
          const listItemDate = FwDate.adjacentMonth(this._calendar.startDate, i);

          const dateForValidation = (() => {
            let toReturn;

            if (i >= 0) {
              //first day of month
              toReturn = new Date(
                listItemDate.getFullYear(),
                listItemDate.getMonth(),
                1
              );
            } else {
              //last day of month
              toReturn = new Date(
                listItemDate.getFullYear(),
                listItemDate.getMonth() + 1,
                0
              );
            }

            return toReturn;
          })();

          if (this.validates(dateForValidation, true)) {
            let currClass = i == 0 ? 'active' : '',
              listItem = `<li class="${currClass}">
                <a href="#"
                  class="${UIPrefix(COMPONENT_CLASS)}-month"
                  data-value="${FwDate.toVal(listItemDate)}">
                    ${
                      monthNamesShort[listItemDate.getMonth()]
                    } ${listItemDate.getFullYear()}
                </a>
              ${
                listItemDate.getMonth() == 11 && i !== dropdownLimit
                  ? `</li><li><hr class="dropdown-separator">`
                  : ''
              }
              </li>`;
            theUI.dropdown.element.innerHTML += listItem;
          }
        }

        //generate grid
        theUI.grid = document.createElement('div');
        theUI.container.append(theUI.grid);
        theUI.grid.setAttribute('class', `${UIPrefix(COMPONENT_CLASS)}-grid`);

        //days heading
        theUI.days = document.createElement('div');
        theUI.grid.append(theUI.days);
        theUI.days.setAttribute('class', `${UIPrefix(COMPONENT_CLASS)}-days`);

        let daysHTML = '',
          dayToRetrieve = parseInt(this.args.startDay);

        for (let i = 0; i < 7; i++) {
          if (dayToRetrieve > 6) {
            dayToRetrieve -= 7;
          }

          daysHTML += `<div
              class="${UIPrefix(COMPONENT_CLASS)}-block
              ${UIPrefix(COMPONENT_CLASS)}-day"
            >
              ${dayNamesShorter[dayToRetrieve]}
            </div>`;

          dayToRetrieve++;
        }

        theUI.days.innerHTML = daysHTML;

        //days
        theUI.dates = document.createElement('div');
        theUI.grid.append(theUI.dates);
        theUI.dates.setAttribute('class', `${UIPrefix(COMPONENT_CLASS)}-dates`);

        //previous month
        const freeGridSpacePrev =
            (this._calendar.startDate.getDay() - parseInt(this.args.startDay) + 7) % 7,
          calendarPrevDayStart =
            this._calendar.prevDay == 6 ? 0 : this._calendar.prevDay + 1;

        if (calendarPrevDayStart !== parseInt(this.args.startDay)) {
          //if it doenst take its own row of shit

          // i = 0; i <= freeGridSpacePrev; i++
          // @TODO AAAAAAAAAAAA FIGURE OUT THE MATH
          // for( dayLoopI = this._calendar.prevDay; dayLoopI >= (parseInt(this.args.startDay)); dayLoopI--){
          // for(let i = 0; i < 7; i++){
          for (let i = 0; i < freeGridSpacePrev; i++) {
            let offset = this._calendar.prevDate.getDate() - i;

            let loopDatePrev = new Date(
              this._calendar.prevDate.getFullYear(),
              this._calendar.prevDate.getMonth(),
              offset
            );

            let dateBlockPrev = this._blockHtml(
              loopDatePrev,
              `${UIPrefix(COMPONENT_CLASS)}-block-adjacent
                ${!this.validates(loopDatePrev) ? 'disabled' : ''}`
            );

            //prepend because we loopped this bitch in reverse
            theUI.dates.innerHTML += dateBlockPrev;
          }
        }

        //curr month

        for (let i = 1; i <= this._calendar.lastDate.getDate(); i++) {
          let dateBlockCurr = this._blockHtml(
            new Date(this._calendar.year, this._calendar.month, i),
            !this.validates(new Date(this._calendar.year, this._calendar.month, i))
              ? 'disabled'
              : ''
          );

          theUI.dates.innerHTML += dateBlockCurr;
        }

        //next month just fill the shit
        const currNextFirstDay = new Date(
            this._calendar.year,
            this._calendar.month + 1,
            1
          ).getDay(),
          freeGridSpaceNext = (7 - currNextFirstDay + parseInt(this.args.startDay)) % 7;

        if (currNextFirstDay !== parseInt(this.args.startDay)) {
          for (let i = 1; i <= freeGridSpaceNext; i++) {
            let loopDateNext = new Date(
              this._calendar.year,
              this._calendar.month + 1,
              i
            );

            let dateBlockNext = this._blockHtml(
              loopDateNext,
              `${UIPrefix(COMPONENT_CLASS)}-block-adjacent
              ${!this.validates(loopDateNext) ? 'disabled' : ''}`
            );

            theUI.dates.innerHTML += dateBlockNext;
          }
        }
      },
      element
    );
  }

  init(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();
    this.update();
  }

  static initAll() {
    new Calendar().runCycle(
      EVENT_BEFORE_INIT,
      EVENT_INIT,
      EVENT_AFTER_INIT,
      () => {
        const calendars = document.querySelectorAll(`.${COMPONENT_CLASS}`);

        calendars.forEach((cal) => {
          const calendar = new Calendar(cal);
          calendar.init();
        });
      },
      document
    );
  }

  static handleChange() {
    return (e) => {
      const calendar = new Calendar(e.target);
      calendar.update();
    };
  }

  static handleUpdateKeyup() {
    return (e) => {
      if (FwComponent.isDisabled(e.target)) {
        e.preventDefault();
      } else {
        const calendar = new Calendar(
          e.target
            .closest(`.${UIPrefix(COMPONENT_CLASS)}`)
            .querySelector(`.${COMPONENT_CLASS}`)
        );

        const uiInput = e.target.value;
        if (uiInput.match(/^\d{2}$/) !== null) {
          e.target.value = `${uiInput}/`;
        } else if (uiInput.match(/^\d{2}\/\d{2}$/) !== null) {
          e.target.value = `${uiInput}/`;
        }

        let preParsedVal = '';

        if (uiInput) {
          const pattern = new RegExp(DateTimePreset.HumanDate.pattern);

          const isValid = pattern.test(uiInput);

          if (calendar && isValid) {
            const theValue = uiInput.split('/');

            const y = theValue[2] || '';
            const m = theValue[0] || '';
            const d = theValue[1] || '';

            preParsedVal = `${y}-${m}-${d}`;
          }
        }
        calendar.update(preParsedVal);
      }
    };
  }

  static handleUpdateClick() {
    return (e) => {
      e.preventDefault();

      if (!FwComponent.isDisabled(e.target)) {
        const calendar = new Calendar(
          e.target
            .closest(`.${UIPrefix(COMPONENT_CLASS)}`)
            .querySelector(`.${COMPONENT_CLASS}`)
        );

        if (e.target.classList.contains(ACTIVATED_CLASS)) {
          calendar.update('');
        } else {
          calendar.update(e.target.getAttribute('data-value'));
        }
      }
    };
  }

  static handleRenderClick() {
    return (e) => {
      e.preventDefault();

      if (!FwComponent.isDisabled(e.target)) {
        const calendar = new Calendar(
          e.target
            .closest(`.${UIPrefix(COMPONENT_CLASS)}`)
            .querySelector(`.${COMPONENT_CLASS}`)
        );

        calendar.update(null, e.target.getAttribute('data-value'));
      }
    };
  }

  static initListeners() {
    FwEvent.addListener(
      document.documentElement,
      EVENT_KEYUP,
      `.${UIPrefix(COMPONENT_CLASS)}-input input`,
      Calendar.handleUpdateKeyup()
    );

    FwEvent.addListener(
      document.documentElement,
      EVENT_CLICK,
      `.${UIPrefix(COMPONENT_CLASS)}-date`,
      Calendar.handleUpdateClick()
    );

    FwEvent.addListener(
      document.documentElement,
      EVENT_CLICK,
      `.${UIPrefix(COMPONENT_CLASS)}-month, .${UIPrefix(COMPONENT_CLASS)}-year`,
      Calendar.handleRenderClick()
    );

    if (Settings.get('initializeForm')) {
      Initiator.Q.on_ready = Calendar.initAll;
    }
  }
  static destroyListeners() {
    FwEvent.removeListener(
      document.documentElement,
      EVENT_KEYUP,
      Calendar.handleUpdateKeyup()
    );

    FwEvent.removeListener(
      document.documentElement,
      EVENT_CLICK,
      Calendar.handleUpdateClick()
    );

    FwEvent.removeListener(
      document.documentElement,
      EVENT_CLICK,
      Calendar.handleRenderClick()
    );
  }
}

export default Calendar;

Calendar.initListeners();
