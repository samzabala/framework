import Settings from './core/settings.js';

import FwEvent from './data-helper/event.js';
import FwDom from './data-helper/dom.js';
import FwString from './data-helper/string.js';

import FwComponent from './classes/component.js';


const NAME = 'tabs';
const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}`;
const COMPONENT_CHILDREN_CLASS = 'tab';
const COMPONENT_CHILDREN_TAG = 'li';
const ACTIVATED_CLASS = `active`;

const DATA_KEY = `${Settings.get('prefix')}.${NAME}`;

const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;

	const EVENT_BEFORE_ACTIVATE = `before_activate${EVENT_KEY}`;
	const EVENT_ACTIVATE = `activate${EVENT_KEY}`;
	const EVENT_AFTER_ACTIVATE = `after_activate${EVENT_KEY}`;

class Tabs extends FwComponent {

	static get DATA_KEY(){
		return DATA_KEY;

	}

	UIChildren(){
		return super.UIEl().querySelectorAll(`.${COMPONENT_CHILDREN_CLASS}, ${COMPONENT_CHILDREN_TAG}`);
	}

	UIActive(){
		return super.UIEl().querySelector(`.${COMPONENT_CHILDREN_CLASS}.${ACTIVATED_CLASS}, ${COMPONENT_CHILDREN_TAG}.${ACTIVATED_CLASS}`);
	}

	target(element){
		if(element) return new FwDom(element).closest(`.${COMPONENT_CHILDREN_CLASS}`);
	}

	activate(target,elem){
		const element = elem ?
			super.UIEl(elem)
			: super.UIEl();
			
		const theTab = this.target(target);

		if(!theTab){
			return false;
		}

		FwEvent.trigger(element,EVENT_BEFORE_ACTIVATE);

		if (!theTab.classList.contains(`${ACTIVATED_CLASS}`)) {
			FwEvent.trigger(element,EVENT_ACTIVATE);
			const triggererSiblings = FwDom.getSiblings(
				theTab
			);
			triggererSiblings
				.filter((sibling) => {
					return (
						sibling.matches(`.${COMPONENT_CHILDREN_CLASS}`)
						|| sibling.matches(`${COMPONENT_CHILDREN_TAG}`)
					);
				})
				.forEach((sibling) => {
					sibling.classList.remove(`${ACTIVATED_CLASS}`);
				});

			theTab.classList.add(`${ACTIVATED_CLASS}`);
		}

		FwEvent.trigger(element,EVENT_AFTER_ACTIVATE);

	}


	static handleClick() {
		return (e) => {

			if (FwComponent.isDisabled(e.target)) {
				e.preventDefault();

			} else {
				const tabs = new Tabs(e.target.closest('.tabs'));
				tabs.activate(e.target);
			}
		}
	}

	static initListeners(){
		FwEvent.addListener(
			document.documentElement,
			EVENT_CLICK,
			`.${COMPONENT_CLASS} > ${COMPONENT_CHILDREN_TAG} > *, .${COMPONENT_CHILDREN_CLASS}, .${COMPONENT_CHILDREN_CLASS} > *`,
			Tabs.handleClick()
		);
	}

	static destroyListeners(){
		FwEvent.removeListener(
			document.documentElement,
			EVENT_CLICK,
			Tabs.handleClick()
		);
	}
	
}

export default Tabs;

Tabs.initListeners(); 