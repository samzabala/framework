
import FwCore from './util/core.js';
import {FwFnsQ} from './util/initiator.js';

import FwEvent from './data-helper/event.js';
import FwString from './data-helper/string.js';

import FwComponent from './classes/component.js';
import { UiToggled } from './util/ui.js';


const NAME = 'alert';
const TOGGLE_MODE = `${NAME}-close`;
const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}`;

const DATA_KEY = `${FwCore.settings.prefix}.${NAME}`;

const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;

	const EVENT_BEFORE_CLOSE = `before_close${EVENT_KEY}`;
	const EVENT_CLOSE = `close${EVENT_KEY}`;
	const EVENT_AFTER_CLOSE = `after_close${EVENT_KEY}`;


class Alert extends FwComponent {

	static get DATA_KEY(){
		return DATA_KEY;

	}

	close(elem){
		const element = elem ?
			super.UiEl(elem)
			: this._element;

		
		if(!element){
			return;
		}
		
		FwEvent.trigger(element,EVENT_BEFORE_CLOSE);

		FwEvent.trigger(element,EVENT_CLOSE);
		element.parentNode.removeChild(element);

		FwEvent.trigger(element,EVENT_AFTER_CLOSE);
	}

	static closeAll(){
		const selector = document.querySelectorAll(`.${COMPONENT_CLASS}`);

		if (selector.length) {
			selector.forEach((instance) => {
				if (
					instance.querySelectorAll('[data-toggle="alert-close"]').length
					|| instance.classList.contains(`${NAME}-closeable`)
				) {
					const alertInstance = new Alert(instance);
					alertInstance.close();
				}
			});
		}

	}

	static handleClose() {
		return (e) => {
			e.preventDefault();

			if(!FwComponent.isDisabled(e.target)){
				const alert = new Alert( UiToggled(TOGGLE_MODE,e.target) );
				alert.close();
			}
		}
	}

	static handleCloseAll() {
		return (e) => {
	
			e.preventDefault();
	
			if (!FwComponent.isDisabled(e.target)) {
				Alert.closeAll()
			}
		}
	}

	static initListeners(){
		
		FwEvent.addListener(
			document,
			EVENT_CLICK,
			`*[data-toggle="${TOGGLE_MODE}"]`,
			Alert.handleClose()
		);
		
		FwEvent.addListener(
			document,
			EVENT_CLICK,
			`*[data-toggle="${TOGGLE_MODE}-all"]`,
			Alert.handleCloseAll()
		);
	}
}

export default Alert;

Alert.initListeners();