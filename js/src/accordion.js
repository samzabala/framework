
import FwCore from './util/core.js';
import {FwFnsQ} from './util/initiator.js';

import FwEvent from './data-helper/event.js';
import FwDom from './data-helper/dom.js';
import FwString from './data-helper/string.js';

import FwComponent from './classes/component.js';
import { UiToggled,UiChangeHash } from './util/ui.js';
import {BrMobileMax,ValidateBr} from './util/breakpoint.js';


const NAME = 'accordion';
const ARG_ATTRIBUTE_NAME = `${NAME}`;
const TOGGLE_MODE = `${NAME}`;
const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}`;
const ACTIVATED_CLASS = `open`;

const DATA_KEY = `${FwCore.settings.prefix}.${NAME}`;


const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;

	const EVENT_BEFORE_CLOSE = `before_close${EVENT_KEY}`;
	const EVENT_CLOSE = `close${EVENT_KEY}`;
	const EVENT_AFTER_CLOSE = `after_close${EVENT_KEY}`;

	const EVENT_BEFORE_OPEN = `before_open${EVENT_KEY}`;
	const EVENT_OPEN = `open${EVENT_KEY}`;
	const EVENT_AFTER_OPEN = `after_open${EVENT_KEY}`;

class Accordion extends FwComponent {
	
	constructor(element,triggerer,args){
		element = element || UiToggled(TOGGLE_MODE) || false;
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

	static get DATA_KEY(){
		return DATA_KEY;

	}

	static get configDefaults(){
		return {
			changeHash: 'true',
		}
	}

	get args () {
		return FwComponent._parseArgs(
			(this._customArgs
				? this._customArgs
				: {
					changeHash:
						(
							this._triggerer
							&& this._triggerer
								.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-change-hash`)
						)
						|| super.UiEl()
							.getAttribute(`data-${ARG_ATTRIBUTE_NAME}-change-hash`)
				}
			),
			Accordion.configDefaults
		);
	}

	get _isValidWithinQuery() {
		return !(
			super.UiEl().classList.contains(`${NAME}-mobile`)
			&& !ValidateBr(BrMobileMax, 'below')
		)
	}

	get _isWithinGroupMultiple () {
		return this.UiGroot && this.UiGroot.classList.contains(`${NAME}-group-multiple`)
	}

	get _isWithinAllowNoActive() {
		return this.UiGroot && this.UiGroot.classList.contains(`${NAME}-group-allow-no-active`)
	}

	get _probablyToggle() {
		let toReturn = [];

		const selection = document.querySelectorAll(
			`[data-toggle="${TOGGLE_MODE}"][href="#${this._id}"],
			[data-toggle="${TOGGLE_MODE}"][data-href="#${this._id}"]`
		);

		if(selection.length) {
			toReturn = selection;
		}

		return toReturn;

	}

	get _id(){
		return super.UiEl().hasAttribute('id')
			? super.UiEl().getAttribute('id')
		: false;
	}

	_siblicide(){

		if ( !this._isWithinGroupMultiple ) {
			FwDom.RunFnForChildren(
				this.UiGroot,
				`[data-toggle="${TOGGLE_MODE}"],.${COMPONENT_CLASS}`,
				`.${COMPONENT_CLASS}-group`,
				(accBbies)=>{
					if(
						(
							this._triggerer
							&& (accBbies !== this._triggerer)
							&& (accBbies !== super.UiEl())
						)
						|| (
							!this._triggerer
							&& (accBbies !== super.UiEl())
						)
					){
						accBbies.classList.remove(ACTIVATED_CLASS)
					}
				}
			)
		}
	}

	//which came first the accordion-gruoup or the accordiiinbsbob?? the actual bitch none of that accordion-group shit
	get UiGroot () {
			let toReturn = super.UiEl().parentNode.closest(`.${COMPONENT_CLASS},.${COMPONENT_CLASS}-group`);

			//has to actually be accordion-group closest before accordion
			if(
				!toReturn
				|| (
					toReturn
					&& !toReturn.matches(`.${COMPONENT_CLASS}-group`) //***
				)
			) {
				toReturn = false;
			}

			return toReturn;
	}	

	close(elem,hashChangeOverride){
		const element = elem ?
			super.UiEl(elem)
			: super.UiEl();

		if(!element){
			return;
		}

		hashChangeOverride = hashChangeOverride || this.args.changeHash;

		if( this._isValidWithinQuery ) {

			FwEvent.trigger(element,EVENT_BEFORE_CLOSE);
			//is not within an accordion group that needs one of them open 
			if ( !this.UiGroot || this._isWithinAllowNoActive ) {

				if(this._triggerer) {
					this._triggerer.classList.remove(ACTIVATED_CLASS);
				}else{
					this._probablyToggle.forEach((toggle) => {
						toggle.classList.remove(ACTIVATED_CLASS);
					});
				}

				FwEvent.trigger(element,EVENT_CLOSE);

				element.classList.remove(ACTIVATED_CLASS);

				if (this.args.changeHash && this._id) {
					UiChangeHash('');
				}

				FwEvent.trigger(element,EVENT_AFTER_CLOSE);
			}
		}
	}

	open(elem,hashChangeOverride){
		const element = elem ?
			super.UiEl(elem)
			: super.UiEl();

		if(!element){
			return;
		}

		hashChangeOverride = hashChangeOverride || this.args.changeHash;

		this._siblicide();

		if( this._isValidWithinQuery ) {

			FwEvent.trigger(element,EVENT_BEFORE_OPEN);
			if(this._triggerer) {
				this._triggerer.classList.add(ACTIVATED_CLASS);
			}else{
				this._probablyToggle.forEach((toggle) => {
					toggle.classList.add(ACTIVATED_CLASS);
				});
			}
			
			FwEvent.trigger(element,EVENT_OPEN);

			element.classList.add(ACTIVATED_CLASS);

			if (this.args.changeHash && this._id) {
				UiChangeHash(this._id);
			}

			FwEvent.trigger(element,EVENT_AFTER_OPEN);
		}
		
	}



	toggle(elem,hashChangeOverride){
		const element = elem ?
			super.UiEl(elem)
			: super.UiEl();

		if(!element){
			return;
		}

		if(element.classList.contains(ACTIVATED_CLASS)){
			this.close(elem,hashChangeOverride);
		}else{
			this.open(elem,hashChangeOverride);
		}
	}

	static handleToggler() {
		return (e) => {
			e.preventDefault();

			if(!FwComponent.isDisabled(e.target)){
				const accordion = new Accordion(
					UiToggled(TOGGLE_MODE,e.target),
					e.target
				);

				accordion.toggle();
			}
		}
	}

	static handleUniversal() {
		return () => {
			if(FwCore.settings.initializeAccordion){
				const accordion = new Accordion();
				accordion.open();
			};
		}
	}

	static initListeners() {
		
		FwEvent.addListener(
			document,
			EVENT_CLICK,
			`*[data-toggle="${TOGGLE_MODE}"]`,
			Accordion.handleToggler()
		);

		window.addEventListener(
			'hashchange',
			Accordion.handleUniversal()
		);

		FwFnsQ.on_ready = Accordion.handleUniversal();
	}
	
}

export default Accordion;

Accordion.initListeners();

