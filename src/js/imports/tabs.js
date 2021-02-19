
import FwCore from './util/core.js';
import {FwFnsQ} from './util/initiator.js';

import FwEvent from './data-helper/event.js';
import FwDom from './data-helper/dom.js';
import FwString from './data-helper/string.js';

import FwComponent from './classes/component.js';
import { UiToggled,UiChangeHash } from './util/ui.js';


const NAME = 'tabs';
const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}`;
const COMPONENT_CHILDREN_CLASS = 'tab';
const COMPONENT_CHILDREN_TAG = 'li';
const ACTIVATED_CLASS = `active`;

const DATA_KEY = `${FwCore.settings.prefix}.${NAME}`;

const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;

	const EVENT_BEFORE_ACTIVATE = `before_activate${EVENT_KEY}`;
	const EVENT_ACTIVATE = `activate${EVENT_KEY}`;
	const EVENT_AFTER_ACTIVATE = `after_activate${EVENT_KEY}`;

class Tabs extends FwComponent {

	static get DATA_KEY(){
		return DATA_KEY;

	}

	UiChildren(){
		return super.UiEl().querySelectorAll(`.${COMPONENT_CHILDREN_CLASS}`);
	}

	target(element){
		if(element) return new FwDom(element).closest(`.${COMPONENT_CHILDREN_CLASS}`);
	}

	activate(target){
		const theTab = this.target(target);

		if(!theTab){
			return false;
		}

		if (!theTab.classList.contains(`${ACTIVATED_CLASS}`)) {
			const triggererSiblings = frameWork.getSiblings(
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

	}


	static handleClick() {
		return (e) => {

			if (frameWork.isDisabled(triggerer)) {
				e.preventDefault();

			} else {
				const tabs = new Tabs(e.target.closest('.tabs'));
				tabs.activate(e.target);
			}
		}
	}

	static initListeners(){
		FwEvent.addListener(
			document,
			EVENT_CLICK,
			`.${COMPONENT_CLASS} > ${COMPONENT_CHILDREN_TAG} > *, .${COMPONENT_CHILDREN_CLASS}, .${COMPONENT_CHILDREN_CLASS} > *`,
			Tabs.handleClick()
		);
	}
	
}

export default Tabs;

Tabs.initListeners();





FwEvent.addListener(
	document.documentElement,
	'click',
	'.tab, .tab > *',
	(e) => {
		const triggerer = e.target;

		if (frameWork.isDisabled(triggerer)) {
			e.preventDefault();

		} else {
			const theTab = triggerer.closest('.tab');

			if (theTab) {
				if (!theTab.classList.contains('active')) {
					const triggererSiblings = frameWork.getSiblings(
						theTab
					);
					triggererSiblings
						.filter((sibling) => {
							return (
								sibling.matches('.tab')
								|| sibling.matches('li')
							);
						})
						.forEach((sibling) => {
							sibling.classList.remove('active');
						});

					theTab.classList.add('active');
				}
			}
		}
	}
);