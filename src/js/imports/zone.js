import Settings from './core/settings.js';

import FwEvent from './data-helper/event.js';
import FwDom from './data-helper/dom.js';
import FwString from './data-helper/string.js';

import FwComponent from './classes/component.js';


const NAME = 'zone';
const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}`;
	const ACTIVATED_CLASS = `${COMPONENT_CLASS}-has-content`;
	const COMPONENT_TEXT_CLASS = `${ACTIVATED_CLASS}-text`;

const DATA_KEY = `${Settings.get('prefix')}.${NAME}`;

const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_CHANGE = `change${EVENT_KEY}`;

	const EVENT_BEFORE_ACTIVATE = `before_activate${EVENT_KEY}`;
	const EVENT_ACTIVATE = `activate${EVENT_KEY}`;
	const EVENT_AFTER_ACTIVATE = `after_activate${EVENT_KEY}`;

	const EVENT_BEFORE_DEACTIVATE = `before_deactivate${EVENT_KEY}`;
	const EVENT_DEACTIVATE = `deactivate${EVENT_KEY}`;
	const EVENT_AFTER_DEACTIVATE = `after_deactivate${EVENT_KEY}`;

class Zone extends FwComponent {

	constructor(element,formControl){
		element = element || false;

		super(
			element,
			{
				_formControl:(
					formControl
						? new FwDom(formControl)
					: false
				)
			}
		);
	}

	static get DATA_KEY(){
		return DATA_KEY;

	}

	get UIControl(){
		return this._formControl;
	}

	get UIDyText(){
		return super.UIEl().querySelector(`.${COMPONENT_TEXT_CLASS}`);
	}

	_killDyText(){
		this.UIDyText && this.UIDyText.parentNode.removeChild(this.UIDyText);
	}

	activate(elem){
		const element = elem ?
			super.UIEl(elem)
			: super.UIEl();

			FwEvent.trigger(element,EVENT_BEFORE_ACTIVATE);
			FwEvent.trigger(element,EVENT_ACTIVATE);

			this._killDyText();

			element.classList.add(ACTIVATED_CLASS);
			element.innerHTML += `<div class="${COMPONENT_TEXT_CLASS}">
					<span>${this.UIControl.files.length} files selected.<br> Click or drag and drop to reselect</span>
				</div>`;
	
			FwEvent.trigger(element,EVENT_AFTER_ACTIVATE);

	}

	deactivate(elem){
		const element = elem ?
			super.UIEl(elem)
			: super.UIEl();
			FwEvent.trigger(element,EVENT_BEFORE_DEACTIVATE);
			FwEvent.trigger(element,EVENT_DEACTIVATE);

			this._killDyText();
			element.classList.remove(ACTIVATED_CLASS);
			FwEvent.trigger(element,EVENT_AFTER_DEACTIVATE);

	}

	toggle(elem){
		const element = elem ?
			super.UIEl(elem)
			: super.UIEl();

		this.UIDyText && this.UIDyText.parentNode.removeChild(this.UIDyText);

		if (this.UIControl.value && this.UIControl.files.length) {
			this.activate();
		} else {
			this.deactivate();
		}
	}


	static handleClick() {
		return (e) => {

			if (!FwComponent.isDisabled(e.target)) {
				const zone = new Zone(e.target.closest(`.${COMPONENT_CLASS}`),e.target);
				zone.toggle();
			}
		}
	}

	static initListeners(){
		FwEvent.addListener(
			document.documentElement,
			EVENT_CHANGE,
			`.${COMPONENT_CLASS}`,
			Zone.handleClick()
		);
	}
	
}

export default Zone;

Zone.initListeners(); 