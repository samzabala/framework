import FwCore from './util/core.js';
import {FwFnsQ} from './util/initiator.js';

import FwEvent from './data-helper/event.js';
import FwString from './data-helper/string.js';
import FwDom from './data-helper/dom.js';

import FwComponent from './classes/component.js';
import { UiToggled,UiTriggerer } from './util/ui.js';

const NAME = 'dropdown';
const ARG_ATTRIBUTE_NAME = `${NAME}`;
const TOGGLE_MODE = `${NAME}`;
const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}`;
const ACTIVATED_CLASS = `open`;

const NAV_ANCESTOR = `li, .nav-item`;

const DATA_KEY = `${FwCore.settings.prefix}.${NAME}`;

const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;
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
				_triggerer:(
					triggerer
						? new FwDom(triggerer)
					: false
				),
				_customArgs: args
					|| false
			}
		);
	}

	dispose() {
		super.dispose();
		this._triggerer = null;
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
							this._triggerer
							&& this._triggerer
								.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-width`)
						) || this._element.
							getAttribute(`data-${ARG_ATTRIBUTE_NAME}-width`)
					),
					maxHeight:(
						(
							this._triggerer
							&& this._triggerer
								.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-max-height`)
						) || this._element.
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

	get UiElNavcestor() {
		return this._element.closest(NAV_ANCESTOR);
	}

	get UiElUncles() {
		if(this.UiElNavcestor){
			return FwDom.getSiblings(this.UiElNavcestor)
				.filter((sibling) => {
					return sibling.matches(
						NAV_ANCESTOR
					);
				});
		}
	}
	

	close(elem,triggerer){
		const element = elem ?
			super.UiEl(elem)
			: this._element;

		if(element){
			triggerer = triggerer || this._triggerer;

			FwEvent.trigger(element,EVENT_BEFORE_CLOSE);
	
			this.setDimensions(
				null,
				Dropdown.configDefaults
			);
		
			FwEvent.trigger(element,EVENT_CLOSE);
			element.classList.remove(ACTIVATED_CLASS);
			triggerer
				&& triggerer.classList.remove(ACTIVATED_CLASS);
			this.UiElNavcestor
				&& this.UiElNavcestor.classList.remove(ACTIVATED_CLASS);
				
			FwEvent.trigger(element,EVENT_AFTER_CLOSE);
		}
	}

	open(elem,triggerer){
		const element = elem ?
			super.UiEl(elem)
			: this._element;

		if(!element){
			return;
		}
		
		triggerer = triggerer || this._triggerer;

		FwEvent.trigger(element,EVENT_BEFORE_OPEN);
		
		this.setDimensions();

		Dropdown.purgeToggles(triggerer);
		Dropdown.purge(element);
	
		FwEvent.trigger(element,EVENT_OPEN);
		element.classList.add(ACTIVATED_CLASS);
		triggerer
			&& triggerer.classList.add(ACTIVATED_CLASS);

		if(this.UiElUncles){
			this.UiElUncles.forEach((uncle) => {
				uncle.classList.remove(ACTIVATED_CLASS);
			});
		}

		FwEvent.trigger(element,EVENT_AFTER_OPEN);
	}

	toggle(elem,triggerer){
		const element = elem ?
			super.UiEl(elem)
			: this._element;

		
		if(!element){
			return;
		}
		
		triggerer = triggerer || false;

		if(element.classList.contains(ACTIVATED_CLASS)){
			this.close(elem,triggerer);
		}else{
			this.open(elem,triggerer);
		}
	}
	

	setDimensions(elem,args){

		const element = elem ?
			super.UiEl(elem)
			: this._element;

		
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

	static _purger(exempted,selector) {
			exempted = exempted || false;
	
			document.querySelectorAll(selector).forEach((doopdoop) => {
	
				if (
					!exempted
					|| (
						exempted
						&& doopdoop !== exempted
						&& !doopdoop.contains(exempted)
					 )
				) {
					new Dropdown(doopdoop).close();
				}
			});
	}

	static purge(exemptedDropdown) {
		Dropdown._purger(exemptedDropdown,`.${COMPONENT_CLASS}`);
	}



	static purgeToggles(exemptedToggle) {
		Dropdown._purger(exemptedToggle,`*[data-toggle="${TOGGLE_MODE}"]`);
	}


	static handleToggle() {
		return (e) => {
			e.preventDefault();

			if(!FwComponent.isDisabled(e.target)){
				const triggerer = UiTriggerer(e.target);
				const dropdown = new Dropdown(
					UiToggled(
						TOGGLE_MODE,
						triggerer
					),
					triggerer
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
				const triggerer = UiTriggerer(e.target);
				const dropdown = new Dropdown(
					UiToggled(
						TOGGLE_MODE,
						triggerer
					),
					triggerer
				);

				dropdown.open();
				triggerer.classList.add('focus');
			}
			
		}
	}
	static handleBlurClose() {
		return (e) => {

			if(!FwComponent.isDisabled(e.target)){
				const triggerer = UiTriggerer(e.target);
				const dropdown = new Dropdown(
					UiToggled(
						TOGGLE_MODE,
						triggerer
					),
					triggerer
				);
	
				setTimeout(() => {
					dropdown.close();
				}, 200);
				triggerer.classList.remove('focus');
			}
			
		}
	}

	static handlerUniversal() {
		

		return (e) => {
			if (FwComponent.isDisabled(e.target)) {
				e.preventDefault();
			} else if(!FwComponent.isDynamic(e.target)) {
				if (
					!e.target.closest(`[data-toggle="${TOGGLE_MODE}"]`)
					&& !e.target.closest(`.${COMPONENT_CLASS}`)
				) {
					
					Dropdown.purge();
					Dropdown.purgeToggles();
				}
			}
			
		}
	}

	static initListeners(){
		
		FwEvent.addListener(
			document,
			EVENT_CLICK,
			`*[data-toggle="${TOGGLE_MODE}"]:not(input):not([contenteditable]):not(.${FwCore.settings.uiJsClass})`,
			Dropdown.handleToggle()
		);


		FwEvent.addListener(
			document,
			EVENT_FOCUS,
			`input[data-toggle="${TOGGLE_MODE}"], *[contenteditable][data-toggle="${TOGGLE_MODE}"], .${FwCore.settings.uiJsClass}[data-toggle="${TOGGLE_MODE}"] [contenteditable]`,
			Dropdown.handleFocusOpen()
		);

		FwEvent.addListener(
			document,
			EVENT_BLUR,
			`input[data-toggle="${TOGGLE_MODE}"], *[contenteditable][data-toggle="${TOGGLE_MODE}"], .${FwCore.settings.uiJsClass}[data-toggle="${TOGGLE_MODE}"] [contenteditable]`,
			Dropdown.handleBlurClose()
		);

		FwEvent.addListener(
			document,
			'click',
			`*`,
			Dropdown.handlerUniversal()
		);
	}
}


export default Dropdown;

Dropdown.initListeners();