import FwCore from './util/core.js';

import FwEvent from './data-helper/event.js';
import FwString from './data-helper/string.js';
import FwDom from './data-helper/dom.js';

import FwComponent from './classes/component.js';
import { UiToggleGroup } from './util/ui.js';


const NAME = 'listGroup';
const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}-toggle`; //coz toggling shit only work when this class is heeerr

const CHILD_CLASS = `${FwString.ToDashed(NAME)}-item`;
const COMPONENT_TOGGLEGROUP_PREFIX = `list`;

const DATA_KEY = `${FwCore.settings.prefix}.${NAME}`;

const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;

	const EVENT_BEFORE_TOGGLE = `before_toggle${EVENT_KEY}`;
	const EVENT_TOGGLE = `toggle${EVENT_KEY}`;
	const EVENT_AFTER_TOGGLE = `after_toggle${EVENT_KEY}`;


class ListGroup extends FwComponent {

	constructor(element,triggeredChild){
		element = element || false;
		super(
			element,
			{
				_triggeredChild:(
					triggeredChild
						? new FwDom(triggeredChild)
					: false
				)
			}
		);
	}

	static get DATA_KEY(){
		return DATA_KEY;
	}

	get UiTriggeredChild(){
		return this._triggeredChild
	}
	
	set UiTriggeredChild(triggd){
		if(FwDom.isDescendant(super.UiEl(),triggd)){
			this._triggeredChild = triggd;
		}
	}

	toggle(triggd){
		const triggeredChild = triggd ?
			triggd
			: this.UiTriggeredChild;

		this.UiTriggeredChild = triggeredChild;

		if(!triggeredChild || !FwDom.isDescendant(super.UiEl(),triggeredChild)){
			return;
		}

		FwEvent.trigger(this.UiTriggeredChild,EVENT_BEFORE_TOGGLE);
		FwEvent.trigger(this.UiTriggeredChild,EVENT_TOGGLE);
		UiToggleGroup(
			this.UiTriggeredChild,
			`${COMPONENT_TOGGLEGROUP_PREFIX}`,
			null,
			`li, .${CHILD_CLASS}`
		);
		FwEvent.trigger(this.UiTriggeredChild,EVENT_AFTER_TOGGLE);
	}


	static handleToggle() {
		return (e) => {
	
			e.preventDefault();
	
			if (!FwComponent.isDisabled(e.target)) {
				
				const listGroup = new ListGroup(
					e.target.parentNode.closest(`.${COMPONENT_CLASS}`)
				);
				listGroup.toggle(e.target);
			}
		}
	}

	static initListeners(){
		
		FwEvent.addListener(
			document.documentElement,
			EVENT_CLICK,
			`.${COMPONENT_CLASS} > .${CHILD_CLASS}, .${COMPONENT_CLASS} > li`,	
			ListGroup.handleToggle()
		);
	}
}



export default ListGroup;

ListGroup.initListeners();
