import FwCore from './../util/core.js';
import {FwFnsQ} from './../util/initiator.js';

import FwEvent from './../data-helper/event.js';
import FwDom from './../data-helper/dom.js';
import FwDate from './../data-helper/date.js';

import FwComponent from './../classes/component.js';
import { UiPrefix,UiDynamicClass } from '../util/ui.js';
import { DateTimePreset, dayNamesShorter, monthNamesShort } from '../util/validation.js';

import Dropdown from './../dropdown.js';

const NAME = 'formCalendar';
const ARG_ATTRIBUTE_NAME = 'calendar';
const COMPONENT_CLASS = `input-calendar`;
const ACTIVATED_CLASS = `active`;

const DATA_KEY = `${FwCore.settings.prefix}.${NAME}`;

const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;
const EVENT_KEYUP = `keyup${EVENT_KEY}`;
const EVENT_CHANGE = `change${EVENT_KEY}`;

	const EVENT_BEFORE_INIT = `before_init${EVENT_KEY}`;
	const EVENT_INIT = `init${EVENT_KEY}`;
	const EVENT_AFTER_INIT = `after_init${EVENT_KEY}`;

	const EVENT_BEFORE_CREATE = `before_create${EVENT_KEY}`;
	const EVENT_CREATE = `create${EVENT_KEY}`;
	const EVENT_AFTER_CREATE = `after_create${EVENT_KEY}`;

	const EVENT_BEFORE_UPDATE = `before_update${EVENT_KEY}`;
	const EVENT_UPDATE = `update${EVENT_KEY}`;
	const EVENT_AFTER_UPDATE = `after_update${EVENT_KEY}`;


class FormCalendar extends FwComponent {
	
	constructor(element,valueToRender,args){
		super(
			element,
			{
				UiValue: valueToRender
					|| false,
				_customArgs: args
					|| false
			}
		);
	}

	dispose() {
		super.dispose();
		this.UiValue = null;
		this._customArgs = null;
	}

	get theValue() {
		return super.UiEl().value
			? FwDate.toVal(super.UiEl().value)
			: false;
	}

	set theValue(theValue) {
		if(theValue){

			super.UiEl().setAttribute('value', FwDate.toVal(theValue));
			super.UiEl().value = FwDate.toVal(theValue);
		}
	}

	get renderValue() {
		const theRenderDate = this.UiValue
			? this.UiValue
		: this.theValue
			? this.theValue
		:  new Date()
		return FwDate.toVal(theRenderDate);
	}

	set renderValue(renderDate) {
		this.UiValue = renderDate;
	}

	get UiInputValue() {
		return this.UiInput && FwDate.toVal(this.UiInput.value)
	}

	set UiInputValue(uiValue) {
		if(uiValue){
			this.UiInput.setAttribute('value', FwDate.toHuman(uiValue));
			this.UiInput.value = FwDate.toHuman(uiValue);
		}
	}

	get UiRoot () {
		return super.UiEl().closest(`.${UiPrefix(COMPONENT_CLASS, true)}`);
	}

	get UiDates () {
		return this.UiRoot && this.UiRoot.querySelectorAll(`.${UiPrefix(COMPONENT_CLASS)}date`);
	}

	get UiInput(){
		return this.UiRoot.querySelector(`.${UiPrefix(COMPONENT_CLASS)}input input`);
	}

	static get configDefaults(){
		return {
			class: '',
			startDay: {
				value: 0,
				parser: (value)=>{
					return parseInt(value) % 7
				}
			}, // su,mo,tu,we,th,fr,sa,
			min: null,
			max: null,
			yearSpan: {
				value: 0,
				parser: (value)=>{
					if (parseInt(value) <= 0) {
						value = 0;
					}

					return value;
				}
			},
			disabledDates: '', //yyyy-mm-dd,weekends,past,future
			textInput: false,
			monthSkip: true,
			yearSkip: false,
		}
	}

	get args () {
		
		return FwComponent._parseArgs(
			(this._customArgs
				? this._customArgs
				: {
					class:
						super.UiEl().getAttribute('class'),
					startDay:
						super.UiEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-start-day`), // 0,1,2,3,4,5,6
					min:
						super.UiEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-min`)
						|| super.UiEl().getAttribute('min'),
					max:
						super.UiEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-max`)
						|| super.UiEl().getAttribute('max'),
					yearSpan:
						super.UiEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-year-span`),
					disabledDates:
						super.UiEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-disabled-dates`),
					textInput:
						super.UiEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-text-input`),
					monthSkip:
						super.UiEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-month-skip`),
					yearSkip:
						super.UiEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-year-skip`),
				}
			),
			FormCalendar.configDefaults
		);
	}

	static get DATA_KEY(){
		return DATA_KEY;

	}

	update(newValue,valueToRender) {		
		FwEvent.trigger(super.UiEl(),EVENT_BEFORE_UPDATE);

		const theValue =
			FwDate.toVal(newValue)
			|| this.theValue;
		
		const uiValue =
			FwDate.toVal(valueToRender)
			|| theValue
			|| this.renderValue;
			
		
		FwEvent.trigger(super.UiEl(),EVENT_UPDATE);
		//set up calendar
		if (this.validates(theValue) || !theValue) {
			this.theValue = FwDate.toVal(theValue, false);
			this.renderValue = uiValue;

			this._createUi();
		}
	
		//user visual feedback if it has a valid bitch
		if (this.validates(theValue)) {
			this.UiRoot
				.classList.remove('input-error');
		} else {
			this.UiRoot
				.classList.add('input-error');
		}
	
		if (this.theValue) {
	
			this.UiDates.forEach((date) => {
				if (
					date.getAttribute('data-value') == theValue
				) {
					date.classList.add(ACTIVATED_CLASS);
				} else {
					date.classList.remove(ACTIVATED_CLASS);
				}
			});
	
	
			if (this.UiInput) {
				this.UiInputValue = theValue;
			}
		}
		FwEvent.trigger(super.UiEl(),EVENT_AFTER_UPDATE);
	}

	
	validates(date,rangeOnly) {

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
			if (
				checkAgainst.includes('weekends')
				&& (d.getDay() == 0 || d.getDay() == 6)
			) {
				// console.warn('value was a weekend || ',FwDate.toVal(d),FwDate.toVal(d));
				toReturn = false;
			}
		}
	
		//in the past
		let dateNow = new Date();
		dateNow.setHours(0, 0, 0, 0);
		if (
			checkAgainst.includes('past')
			&& d < dateNow
		) {
			// console.warn('value was in the past || ',FwDate.toVal(d),'\nversus ',FwDate.toVal(dateNow));
			toReturn = false;
		}
	
		if (
			checkAgainst.includes('future')
			&& d > dateNow
		) {
			// console.warn('value was in the future || ',FwDate.toVal(date),'\nversus ',FwDate.toVal(dateNow));
			toReturn = false;
		}
	
		//if  in range of min or max
		if (
			(
				FwDate.toParsed(this.args.max)
				&& FwDate.toParsed(this.args.max) < d
			)
			|| (
				FwDate.toParsed(this.args.min)
				&& d < FwDate.toParsed(this.args.min)
			)
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
		}
		toReturn.startDate = new Date(toReturn.year, toReturn.month, 1);

		toReturn.lastDate = new Date(toReturn.year, toReturn.month + 1, 0);

		toReturn.prevDate = new Date(toReturn.year, toReturn.month, 0);
		toReturn.prevDay = toReturn.prevDate.getDay();

		return toReturn;
	}

	_arrowHtml = (buttonClass) => {
		let symbolClass, arrowDate, disValid,arrowClass;
		//set a new date with no date because fuck that boi
		// console.warn(buttonClass,'hello i fucked up','\n',FwDate.toParsed(uiValue),'\n',this._calendar.startDate,'\n', new Date(this._calendar.year,this._calendar.month));
		switch (buttonClass) {
			case 'prev-month':
				symbolClass = 'symbol-arrow-left';
				arrowClass = 'month';
				arrowDate = FwDate.toVal(
					FwDate.adjacentMonth(this._calendar.startDate, -1)
				);
				disValid = this.validates(
					new Date(this._calendar.year, this._calendar.month, 0),
					true
				);
				break;

			case 'prev-year':
				symbolClass = 'symbol-arrow-double-left';
				arrowClass = 'year';
				arrowDate = FwDate.toVal(
					FwDate.adjacentMonth(this._calendar.startDate, -12)
				);
				disValid = this.validates(
					new Date(this._calendar.year - 1, this._calendar.month, 0),
					true
				);
				break;

			case 'next-month':
				symbolClass = 'symbol-arrow-right';
				arrowClass = 'month';
				arrowDate = FwDate.toVal(
					FwDate.adjacentMonth(this._calendar.startDate, 1)
				);
				disValid = this.validates(
					new Date(this._calendar.year, this._calendar.month + 1, 1),
					true
				);
				break;

			case 'next-year':
				symbolClass = 'symbol-arrow-double-right';
				arrowClass = 'year';
				arrowDate = FwDate.toVal(
					FwDate.adjacentMonth(this._calendar.startDate, 12)
				);
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
				${UiPrefix(COMPONENT_CLASS)}navigation
				${UiPrefix(COMPONENT_CLASS)}button
				${UiPrefix(COMPONENT_CLASS)}${arrowClass}
				${UiPrefix(COMPONENT_CLASS)}${buttonClass}" data-value="${arrowDate}"
			>
				<i class="${UiPrefix(COMPONENT_CLASS)}symbol symbol ${symbolClass}"></i>
			</button>`;

		return htmlString;
	}

	_blockHtml = (date, customClass) => {
		customClass = customClass || '';
		return `<button type="button" data-value="${FwDate.toVal(date)}"
				class="
				${UiPrefix(COMPONENT_CLASS)}block
				${UiPrefix(COMPONENT_CLASS)}button
				${UiPrefix(COMPONENT_CLASS)}date
				${customClass}
			">
				<span>${date.getDate()}</span>
			</button>`;
	}

	_createUi(elem,uiValue) {

		const element = elem ?
			super.UiEl(elem)
			: super.UiEl();

		FwEvent.trigger(element,EVENT_BEFORE_CREATE);

		uiValue =
			uiValue
			|| this.renderValue;

		this.renderValue = uiValue;

		const theUi = {};

		FwEvent.trigger(element,EVENT_CREATE);

		theUi.container = this.UiRoot;
			
		if (!theUi.container) {
			theUi.container = document.createElement('div');
			element.parentNode.insertBefore(
				theUi.container,
				element
			);
			theUi.container.appendChild(element);
			theUi.container.setAttribute(
				'class',
				`${FwCore.settings.uiClass}
				${FwCore.settings.uiJsClass}
				${element.getAttribute('class')
					.toString()
					.replace(
						COMPONENT_CLASS,
						UiPrefix(COMPONENT_CLASS, true)
					)
				}`
			);
		}

		theUi.inputWrapper = theUi.container
			.querySelector(`.${UiPrefix(COMPONENT_CLASS)}input`);

		const components = FwDom.getSiblings(element);
		components.forEach((component) => {
			if (component !== theUi.inputWrapper) {
				component.parentNode.removeChild(component);
			}
		});

		//input
		if (this.args.textInput) {
			if (!theUi.inputWrapper) {
				theUi.inputWrapper = document.createElement('div');
				theUi.container.appendChild(theUi.inputWrapper);
				theUi.inputWrapper.setAttribute(
					'class',
					`${UiPrefix(COMPONENT_CLASS)}input`
				);
				theUi.inputWrapper.innerHTML =
					'<input class="input input-single-line" type="text" maxlength="10" placeholder="MM/DD/YYYY" />';
			}
		}

		//date 4 u

		//heading
			theUi.heading = document.createElement('div');
			theUi.container.appendChild(theUi.heading);
			theUi.heading.setAttribute(
				'class',
				`${UiPrefix(COMPONENT_CLASS)}heading`
			);

		//arrowz

			const butts = [
				'prev-year',
				'prev-month',
				'next-month',
				'next-year',
			];

			butts.forEach((butt) => {
				if (
					(
						this.args.yearSkip
						&& (
							butt == 'prev-year'
							|| butt == 'next-year'
						)
					)
					|| (
						this.args.monthSkip
						&& (
							butt == 'prev-month'
							|| butt == 'next-month'
						)
					)
				) {
					theUi.heading.innerHTML += this._arrowHtml(butt);
				}
			});

		//title
			theUi.title = document.createElement('div');
			theUi.heading.appendChild(theUi.title);
			theUi.title.setAttribute(
				'class',
				`${UiPrefix(COMPONENT_CLASS)}title ${UiPrefix(COMPONENT_CLASS)}dropdown-toggle
				${UiDynamicClass}` //NEED THIS AT ALL TIMES IF U DONT WANNA DIE
			);
			theUi.title.setAttribute('data-toggle', 'dropdown');
			theUi.title.innerHTML = `<span
				class="${UiPrefix(COMPONENT_CLASS)}month-text">
					${monthNamesShort[this._calendar.month]}
				</span>
				<span class="${UiPrefix(COMPONENT_CLASS)}year-text">
					${this._calendar.year}
				</span>
				<i class="${UiPrefix(COMPONENT_CLASS)}symbol symbol symbol-caret-down no-margin-x"></i>`;

		//dropdown
			const dropdown = document.createElement('ul');
			theUi.heading.appendChild(dropdown);
			dropdown.setAttribute('data-dropdown-width', '100%');
			dropdown.setAttribute(
				'class',
				`${UiPrefix(COMPONENT_CLASS)}dropdown dropdown dropdown-center-x dropdown-top-flush text-align-center`
			);
			dropdown.innerHTML += `<li 
					class="${UiPrefix(COMPONENT_CLASS)}current-month-year active"
				>
					<a href="#"
						class="${UiPrefix(COMPONENT_CLASS)}month"
						data-value="${FwDate.toVal(this._calendar.startDate)}"
					>
						${monthNamesShort[this._calendar.month]} ${this._calendar.year}
					</a>
				</li>
				<li><hr class="dropdown-separator"></li>`;

			theUi.dropdown = new Dropdown(dropdown,theUi.title).UiEl();

			let dropdownInit, dropdownLimit;


			if (this.args.yearSpan == 0) {
				dropdownInit =   this._calendar.startDate.getMonth() * -1;
				dropdownLimit = 11 - this._calendar.startDate.getMonth();
			} else {
				dropdownInit = parseInt(
					-12 * parseInt(this.args.yearSpan)
				);
				dropdownLimit = parseInt(
					12 * parseInt(this.args.yearSpan)
				);
			}

			//update dropdown
			for (let i = dropdownInit; i <= dropdownLimit; i++) {
				const listItemDate = FwDate.adjacentMonth(
					this._calendar.startDate,
					i
				);

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
								class="${UiPrefix(COMPONENT_CLASS)}month"
								data-value="${FwDate.toVal(listItemDate)}">
									${
										monthNamesShort[
											listItemDate.getMonth()
										]
									} ${listItemDate.getFullYear()}
							</a>
						${listItemDate.getMonth() == 11
							&& i !== dropdownLimit
								? `</li><li><hr class="dropdown-separator">`
								: ''
						}
						</li>`;
					theUi.dropdown.innerHTML += listItem;
				}
			}

		//generate grid
			theUi.grid = document.createElement('div');
			theUi.container.append(theUi.grid);
			theUi.grid.setAttribute(
				'class',
				`${UiPrefix(COMPONENT_CLASS)}grid`
			);

		//days heading
			theUi.days = document.createElement('div');
			theUi.grid.append(theUi.days);
			theUi.days.setAttribute(
				'class',
				`${UiPrefix(COMPONENT_CLASS)}days`
			);

			let daysHTML = '',
				dayToRetrieve = parseInt(this.args.startDay);

			for (let i = 0; i < 7; i++) {
				if (dayToRetrieve > 6) {
					dayToRetrieve -= 7;
				}

				daysHTML += `<div
						class="${UiPrefix(COMPONENT_CLASS)}block
						${UiPrefix(COMPONENT_CLASS)}day"
					>
						${dayNamesShorter[dayToRetrieve]}
					</div>`;

				dayToRetrieve++;
			}

			theUi.days.innerHTML = daysHTML;

		//days
			theUi.dates = document.createElement('div');
			theUi.grid.append(theUi.dates);
			theUi.dates.setAttribute(
				'class',
				`${UiPrefix(COMPONENT_CLASS)}dates`
			);

			//previous month
				const freeGridSpacePrev = 
						(
							this._calendar.startDate.getDay()
							- parseInt(this.args.startDay)
							+ 7
						) % 7,
					calendarPrevDayStart =
						this._calendar.prevDay == 6
						? 0
						: this._calendar.prevDay + 1;

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
							`${UiPrefix(COMPONENT_CLASS)}block-adjacent
							${(!this.validates(loopDatePrev)
								? 'disabled'
								: '')
							}`
						);

						//prepend because we loopped this bitch in reverse
						theUi.dates.innerHTML += dateBlockPrev;
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

					theUi.dates.innerHTML += dateBlockCurr;
				}

			//next month just fill the shit
			const currNextFirstDay = new Date(
					this._calendar.year,
					this._calendar.month + 1,
					1
				).getDay(),
				freeGridSpaceNext =
					(7 - currNextFirstDay + parseInt(this.args.startDay)) % 7;

			if (currNextFirstDay !== parseInt(this.args.startDay)) {
				for (let i = 1; i <= freeGridSpaceNext; i++) {
					let loopDateNext = new Date(
						this._calendar.year,
						this._calendar.month + 1,
						i
					);

					let dateBlockNext = this._blockHtml(
						loopDateNext,
						UiPrefix(COMPONENT_CLASS) +
							'block-adjacent ' +
							(!this.validates(loopDateNext)
								? 'disabled'
								: '')
					);

					theUi.dates.innerHTML += dateBlockNext;
				}
			}


		
		FwEvent.trigger(element,EVENT_AFTER_CREATE);
	}

	_render(){
		this.update();
	}

	static renderAll(){
		FwEvent.trigger(document,EVENT_BEFORE_INIT);

		const calendars = document.querySelectorAll(`.${COMPONENT_CLASS}`);
		FwEvent.trigger(document,EVENT_INIT);
		
		calendars.forEach((calendar) => {
			const cal = new FormCalendar(calendar);
			
			cal._render();
		});
		FwEvent.trigger(document,EVENT_AFTER_INIT);
	}

	static handleChange() {
		return (e) => {
			const calendar = new FormCalendar(e.target);
			calendar.update();
		}
	}

	static handleUpdateKeyup() {
		return (e) => {
			if (FwComponent.isDisabled(e.target)){
				e.preventDefault();
			}else{
				const calendar = new FormCalendar(e.target
					.closest(`.${UiPrefix(COMPONENT_CLASS, true)}`)
					.querySelector(`.${COMPONENT_CLASS}`));
	
				const uiInput = e.target.value;
				if (uiInput.match(/^\d{2}$/) !== null) {
					e.target.value = `${uiInput}/`;
				} else if (uiInput.match(/^\d{2}\/\d{2}$/) !== null) {
					e.target.value = `${uiInput}/`;
				}
	
				const pattern = new RegExp(
					DateTimePreset.HumanDate.pattern
				);
	
				const isValid = pattern.test(uiInput);
	
				if (calendar && isValid) {
					const theValue = uiInput.split('/');
	
					const y = theValue[2] || '';
					const m = theValue[0] || '';
					const d = theValue[1] || '';
	
					const preParsedVal = `${y}-${m}-${d}`;

	
					calendar.update(
						preParsedVal
					);
				}
			}
		}
	}
	

	static handleUpdateClick() {
		return (e) => {
			e.preventDefault();
	
			if (!FwComponent.isDisabled(e.target)) {
				
				const calendar = new FormCalendar(e.target
					.closest(`.${UiPrefix(COMPONENT_CLASS, true)}`)
					.querySelector(`.${COMPONENT_CLASS}`));

					calendar.update(
						e.target.getAttribute('data-value')
					);
			}
		}
	}
	

	static handleRenderClick() {
		return (e) => {
			e.preventDefault();
	
			if (!FwComponent.isDisabled(e.target)) {
				
				const calendar = new FormCalendar(e.target
					.closest(`.${UiPrefix(COMPONENT_CLASS, true)}`)
					.querySelector(`.${COMPONENT_CLASS}`));

					calendar.update(
						null,
						e.target.getAttribute('data-value')
					);
			}
		}
	}
	

	static initListeners() {

		FwEvent.addListener(
			document,
			EVENT_CHANGE,
			COMPONENT_CLASS,
			FormCalendar.handleChange()
		);

		FwEvent.addListener(
			document,
			EVENT_KEYUP,
			`.${UiPrefix(COMPONENT_CLASS)}input input`,
			FormCalendar.handleUpdateKeyup()
		);
		
		FwEvent.addListener(
			document,
			EVENT_CLICK,
			`.${UiPrefix(COMPONENT_CLASS)}date`,
			FormCalendar.handleUpdateClick()
		);

		FwEvent.addListener(
			document,
			EVENT_CLICK,
			`.${UiPrefix(COMPONENT_CLASS)}month, .${UiPrefix(COMPONENT_CLASS)}year`,
			FormCalendar.handleRenderClick()
		);
		FwFnsQ.on_ready = FormCalendar.renderAll;

	}
}

export default FormCalendar;

FormCalendar.initListeners();
