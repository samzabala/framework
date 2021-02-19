

import FwCore from './util/core.js';
import {FwFnsQ} from './util/initiator.js';

import FwEvent from './data-helper/event.js';
import FwString from './data-helper/string.js';
import FwDom from './data-helper/dom.js';

import FwComponent from './classes/component.js';
import { UiToggled,UiPurge } from './util/ui.js';


const NAME = 'switch';
const TOGGLE_MODE = `${NAME}`;
const TOGGLE_MODE_ON = `${TOGGLE_MODE}-on`;
const TOGGLE_MODE_OFF = `${TOGGLE_MODE}-off`;
const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}`;
	const COMPONENT_CLASS_STATUS_OFF = `${COMPONENT_CLASS}-to-off`;
	const COMPONENT_CLASS_STATUS_ON = `${COMPONENT_CLASS}-to-on`;
	const COMPONENT_CLASS_IDLE = `${COMPONENT_CLASS}-idle`;

const DATA_KEY = `${FwCore.settings.prefix}.${NAME}`;

const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;

const EVENT_BEFORE_INIT = `before_init${EVENT_KEY}`;
const EVENT_INIT = `init${EVENT_KEY}`;
const EVENT_AFTER_INIT = `after_init${EVENT_KEY}`;

const EVENT_BEFORE_ON = `before_on${EVENT_KEY}`;
const EVENT_ON = `on${EVENT_KEY}`;
const EVENT_AFTER_ON = `after_on${EVENT_KEY}`;

const EVENT_BEFORE_OFF = `before_off${EVENT_KEY}`;
const EVENT_OFF = `off${EVENT_KEY}`;
const EVENT_AFTER_OFF = `after_off${EVENT_KEY}`;


class Switch extends FwComponent {

	constructor(element,triggerer){
		element = element || UiToggled(TOGGLE_MODE) || false;

		super(
			element,
			{
				_triggerer:(
					triggerer
						? new FwDom(triggerer)
					: false
				)
			}
		);
	}

	dispose() {
		super.dispose();
		this._triggerer = null;
	}

	static get DATA_KEY(){
		return DATA_KEY;
	}

	isOff(elem){
		const element = elem ?
			super.UiEl(elem)
			: super.UiEl();
			return element.classList.contains(COMPONENT_CLASS_STATUS_OFF);
	}


	isOn(elem){
		const element = elem ?
			super.UiEl(elem)
			: super.UiEl();

			return element.classList.contains(COMPONENT_CLASS_STATUS_ON) || !this.isOff();


	}
	
	isIdle(elem){
		const element = elem ?
			super.UiEl(elem)
			: super.UiEl();
			
			element.classList.contains(COMPONENT_CLASS_IDLE);
	}

	turnOff(elem){
		const element = elem ?
			super.UiEl(elem)
			: super.UiEl();
			FwEvent.trigger(document,EVENT_BEFORE_OFF);
			FwEvent.trigger(document,EVENT_OFF);

			element.classList.remove(COMPONENT_CLASS_STATUS_ON);
			element.classList.add(COMPONENT_CLASS_STATUS_OFF);
			FwEvent.trigger(document,EVENT_AFTER_OFF);
	}

	turnOn(elem){
		const element = elem ?
			super.UiEl(elem)
			: super.UiEl();

			FwEvent.trigger(document,EVENT_BEFORE_ON);
			FwEvent.trigger(document,EVENT_ON);

			element.classList.remove(COMPONENT_CLASS_STATUS_OFF);
			element.classList.add(COMPONENT_CLASS_STATUS_ON);

			FwEvent.trigger(document,EVENT_AFTER_ON);
	}

	toggle(elem){
		const element = elem ?
			super.UiEl(elem)
			: super.UiEl();


			if(this.isOff()){
				this.turnOn();
			}else{
				this.turnOff();
			}
		
	}
	

	static purge(exempted){
		UiPurge(
			exempted,
			`.${COMPONENT_CLASS}:not(.${COMPONENT_CLASS_IDLE})`,
			(elem)=> {
				new Switch(elem).turnOff();
			}
		);
	}

	static handleToggleOn() {
		return (e) => {

			if(!FwComponent.isDisabled(e.target)){
				const switcher = new Switch(
					UiToggled(TOGGLE_MODE,e.target),
					e.target
				);
				Switch.purge(UiToggled(TOGGLE_MODE,e.target));
				switcher.turnOn();

			}else{
				e.preventDefault();
			}
		}
	}

	static handleToggleOff() {
		return (e) => {

			if(!FwComponent.isDisabled(e.target)){
				const switcher = new Switch(
					UiToggled(TOGGLE_MODE,e.target),
					e.target
				);
				switcher.turnOff();
				
			}else{
				e.preventDefault();
			}
		}
	}

	static handleInit(){
		return () => {
			FwEvent.trigger(document,EVENT_BEFORE_INIT);

			FwEvent.trigger(document,EVENT_INIT);
			UiPurge(
				false,
				`.${COMPONENT_CLASS}:not(.${COMPONENT_CLASS_STATUS_ON})`,
				(elem)=> {
					console.log(elem);
					new Switch(elem).turnOff();
				}
			);

			FwEvent.trigger(document,EVENT_AFTER_INIT);
		}
	}

	static handleUniversal(){
		return (e) => {
			if (FwComponent.isDisabled(e.target)) {
				e.preventDefault();
			} else if(!FwComponent.isDynamic(e.target)) {
				if (
					!e.target.closest(`[data-toggle="${TOGGLE_MODE_ON}"]`)
					&& !e.target.closest(`[data-toggle="${TOGGLE_MODE_OFF}"]`)
					&& !e.target.closest(`.${COMPONENT_CLASS}`)
				){
					Switch.purge();
				}
			}
			
		}
	}

	static initListeners(){

		FwEvent.addListener(
			document.documentElement,
			EVENT_CLICK,
			`*[data-toggle="${TOGGLE_MODE_OFF}"]`,
			Switch.handleToggleOff()
		);

		FwEvent.addListener(
			document.documentElement,
			EVENT_CLICK,
			`*[data-toggle="${TOGGLE_MODE_ON}"]`,
			Switch.handleToggleOn()
		);

		FwEvent.addListener(
			document.documentElement,
			EVENT_CLICK,
			`*`,
			Switch.handleUniversal()
		);

		FwFnsQ.on_ready = Switch.handleInit();
	}
}

export default Switch;

Switch.initListeners();