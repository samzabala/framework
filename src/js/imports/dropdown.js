import Settings from './core/settings.js';

import FwEvent from './data-helper/event.js';
import FwString from './data-helper/string.js';
import FwDom from './data-helper/dom.js';

import FwComponent from './classes/component.js';
import { UIToggled,UITriggerer,UIPurge, UIDynamicClass } from './util/ui.js';

const NAME = 'dropdown';
const ARG_ATTRIBUTE_NAME = `${NAME}`;
const TOGGLE_MODE = `${NAME}`;
const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}`;
const COMPONENT_PURGER_CLASS = `${COMPONENT_CLASS}-purger`;
const ACTIVATED_CLASS = `open`;

const NAV_ANCESTOR = `li, .nav-item`;

const DATA_KEY = `${Settings.get('prefix')}.${NAME}`;

const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;
	const EVENT_CLICK_PURGE = `click${EVENT_KEY}.purge`;
const EVENT_FOCUS = `focus${EVENT_KEY}`;
const EVENT_BLUR = `blur${EVENT_KEY}`;

	const EVENT_BEFORE_CLOSE = `before_close${EVENT_KEY}`;
	const EVENT_CLOSE = `close${EVENT_KEY}`;
	const EVENT_AFTER_CLOSE = `after_close${EVENT_KEY}`;

	const EVENT_BEFORE_OPEN = `before_open${EVENT_KEY}`;
	const EVENT_OPEN = `open${EVENT_KEY}`;
	const EVENT_AFTER_OPEN = `after_open${EVENT_KEY}`;

class Dropdown extends FwComponent {
	
	constructor(element,triggerer,args){
		super(
			element,
			{
				triggerer:(
					triggerer
						? triggerer
					: false
				),
				_customArgs: args
					|| false
			}
		);
	}

	dispose() {
		super.dispose();
		this.triggerer = null;
		this._customArgs = null;
	}

	static get configDefaults(){
		return {
			width: null,
			maxHeight: null
		}
	}

	get args () {
		return FwComponent._parseArgs(
			(this._customArgs
				? this._customArgs
				: {
					width:(
						(
							this.triggerer
							&& this.triggerer
								.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-width`)
						) || this.element.
							getAttribute(`data-${ARG_ATTRIBUTE_NAME}-width`)
					),
					maxHeight:(
						(
							this.triggerer
							&& this.triggerer
								.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-max-height`)
						) || this.element.
							getAttribute(`data-${ARG_ATTRIBUTE_NAME}-max-height`)
					),
				}
			),
			Dropdown.configDefaults
		);
	}

	static get DATA_KEY(){
		return DATA_KEY;
	}

	get UIElNavcestor() {
		return this.element.closest(NAV_ANCESTOR);
	}

	get UIElUncles() {
		if(this.UIElNavcestor){
			return FwDom.getSiblings(this.UIElNavcestor)
				.filter((sibling) => {
					return sibling.matches(
						NAV_ANCESTOR
					);
				});
		}
	}
	

	close(elem,triggerer){
		const element = elem ?
			super.UIEl(elem)
			: this.element;

		if(!element){
			return;
		}

		triggerer = triggerer || this.triggerer;

		FwEvent.trigger(element,EVENT_BEFORE_CLOSE);

		this.setDimensions(
			null,
			Dropdown.configDefaults
		);
	
		FwEvent.trigger(element,EVENT_CLOSE);
		element.classList.remove(ACTIVATED_CLASS);
		triggerer
			&& triggerer.classList.remove(ACTIVATED_CLASS);
		this.UIElNavcestor
			&& this.UIElNavcestor.classList.remove(ACTIVATED_CLASS);
			
		FwEvent.trigger(element,EVENT_AFTER_CLOSE);
	}

	open(elem,triggerer){
		const element = elem ?
			super.UIEl(elem)
			: this.element;

		if(!element){
			return;
		}

		
		triggerer = triggerer || this.triggerer;

		FwEvent.trigger(element,EVENT_BEFORE_OPEN);
		
		Dropdown.purge(element);
	
		FwEvent.trigger(element,EVENT_OPEN);

		this.setDimensions();

		element.classList.add(ACTIVATED_CLASS);

		triggerer
			&& triggerer.classList.add(ACTIVATED_CLASS);

		// if(this.UIElUncles){
		// 	this.UIElUncles.forEach((uncle) => {
		// 		uncle.classList.remove(ACTIVATED_CLASS);
		// 	});
		// }



		FwEvent.trigger(element,EVENT_AFTER_OPEN);
	}

	toggle(elem,triggerer){
		const element = elem ?
			super.UIEl(elem)
			: this.element;

		
		if(!element){
			return;
		}
		triggerer = triggerer || this.triggerer;

		triggerer
				.closest(`.${Settings.get('uiJsClass')}`)
			&& !triggerer
				.closest(`.${UIDynamicClass}`)

		if(element.classList.contains(ACTIVATED_CLASS)){
			this.close(element,triggerer);
		}else{
			this.open(element,triggerer);
		}
	}
	

	setDimensions(elem,args){

		const element = elem ?
			super.UIEl(elem)
			: this.element;

		
		if(!element){
			return;
		}
		
		args = args || this.args;

		if (args.width) {
			element.style.width = args.width;
		}

		if (args.maxHeight) {
			element.style.maxHeight = args.maxHeight;
		}
	}

	static purge(exempted) {
		UIPurge(
			exempted,
			`.${COMPONENT_CLASS}`,
			(elem) => {
				new Dropdown(elem).close();
			}
		);
	}



	static handleToggle() {
		return (e) => {
			e.preventDefault();
			if(!FwComponent.isDisabled(e.target)){

				const dropdown = new Dropdown(
					UIToggled(
						TOGGLE_MODE,
						UITriggerer(e.target)
					),
					UITriggerer(e.target)
				);
				dropdown.toggle();
			}
		}
	}
	static handleFocusOpen(i) {
		return (e) => {
			if (FwComponent.isDisabled(e.target)) {
				e.target.blur();
			}else{
				const dropdown = new Dropdown(
					UIToggled(
						TOGGLE_MODE,
						UITriggerer(e.target)
					),
					UITriggerer(e.target)
				);

				dropdown.open();
				triggerer.classList.add('focus');
			}
			
		}
	}
	static handleBlurClose() {
		return (e) => {

			if(!FwComponent.isDisabled(e.target)){
				const dropdown = new Dropdown(
					UIToggled(
						TOGGLE_MODE,
						UITriggerer(e.target)
					),
					UITriggerer(e.target)
				);
	
				setTimeout(() => {
					dropdown.close();
				}, 200);
				triggerer.classList.remove('focus');
			}
			
		}
	}

	static handleUniversalPurge(isPurger) {
		isPurger = isPurger || false;
		

		return (e) => {

			if (FwComponent.isDisabled(e.target)) {
				e.preventDefault();
			} else if(!FwComponent.isDynamic(e.target)) {
				if (
					isPurger
					|| (
						!isPurger
						&& !e.target.closest(`[data-toggle-${TOGGLE_MODE}]`)
						&& !e.target.closest(`.${COMPONENT_CLASS}`)
					)
				) {
					Dropdown.purge();
				}
			}
			
		}
	}

	static initListeners(){
		
		FwEvent.addListener(
			document.documentElement,
			EVENT_CLICK,
			`*[data-toggle-${TOGGLE_MODE}]:not(input):not([contenteditable]):not(.${Settings.get('uiJsClass')})`,
			Dropdown.handleToggle()
		);


		FwEvent.addListener(
			document.documentElement,
			EVENT_FOCUS,
			`input[data-toggle-${TOGGLE_MODE}], *[contenteditable][data-toggle-${TOGGLE_MODE}], .${Settings.get('uiJsClass')}[data-toggle-${TOGGLE_MODE}] [contenteditable]`,
			Dropdown.handleFocusOpen()
		);

		FwEvent.addListener(
			document.documentElement,
			EVENT_BLUR,
			`input[data-toggle-${TOGGLE_MODE}], *[contenteditable][data-toggle-${TOGGLE_MODE}], .${Settings.get('uiJsClass')}[data-toggle-${TOGGLE_MODE}] [contenteditable]`,
			Dropdown.handleBlurClose()
		);

		FwEvent.addListener(
			document.documentElement,
			EVENT_CLICK_PURGE,
			`*, .${COMPONENT_PURGER_CLASS}`,
			Dropdown.handleUniversalPurge()
		);
	}
}


export default Dropdown;

Dropdown.initListeners();