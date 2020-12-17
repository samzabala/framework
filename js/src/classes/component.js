import FwCore from '../util/core.js';
import { DisableClasses } from '../util/validation.js';
import FwDom from '../data-helper/dom.js';
import { UiDynamicClass } from '../util/ui.js';

/*
NAME
TOGGLE_MODE
DATA_KEY
CONTAINED_BY_NAME

	case 'dropdown':
	case 'modal':
	case 'board':
	case 'switch':
	case 'alert-close':

FwToggleMode

*/

class FwComponent {
	constructor(element,props) {
		if (!element) {
			return
		}

		FwCore.Data.set(element, this.constructor.DATA_KEY, this);
		this._element = element;

		if(
			typeof props === 'object'){
			for (let key in props) {
				this[key] = props[key];
			}
		}
	
	}

	dispose() {
		FwCore.Data.delete(this._element, this.constructor.DATA_KEY, this);
		this._element = null;
	}

	static getInstance(element) {
		return FwCore.Data.get(element, this.DATA_KEY);
	}

	UiEl(elem){
		if(elem){
			this._resetUiEl(elem);
		}
		return this._element;
	}

	_resetUiEl(element){
		if(element){
			this._element = element
		}else{
			throw new Error('Needs a valid element to reset component UI root element');
		}
	}

	_runFn (callback) {
		if (callback) {
			let fn;
			try {
				fn = eval(/^[^(]+/.exec(callback)[0]);
			} catch (err) {
				console.error(err);
			}
			if (typeof fn === 'function') {
				eval(callback);
			}
		}
	}

	static _parseArgs (arr, defaults) {

		const args = {};
	
		for (let prop in defaults) {
			if(
				(
					typeof defaults[prop] === 'object'
					&& defaults[prop] !== null
					&& arr[prop] !== ''
				)
				&& defaults[prop].hasOwnProperty('value')
			){
				args[prop] = defaults[prop].value;
			}else{
				args[prop] = defaults[prop];
			}
		}
	
		for (let prop in arr) {
			if (
				arr.hasOwnProperty(prop)
				&& arr[prop] !== undefined
				&& arr[prop] !== null
				&& arr[prop] !== ''
			) {
				// Push each value from `obj` into `extended`
				if(
					(
						typeof defaults[prop] === 'object'
						&& defaults[prop] !== null
					)
					&& defaults[prop].hasOwnProperty('value')
					&& defaults[prop].hasOwnProperty('parser')
				){
					args[prop] = defaults[prop].parser(arr[prop]);
				}else{
					args[prop] = arr[prop];
				}
				
				// catch boolean
				if (args[prop] == 'false' || args[prop] == 'true') {
					args[prop] = args[prop] == 'true' ? true : false;
				}
			}
		}
	
		return args;
	}

	static isDisabled (elem){
		if(!elem){
			return;
		}
		
		let toReturn = false;

		if (elem.closest('[disabled]') || elem.matches(':disabled')) {
			toReturn = true;
		}

		DisableClasses.forEach((classString) => {
			if (elem.closest(`.${classString}`) && !toReturn) {
				toReturn = true;
			}
		});

		return toReturn;
	}
	static isDynamic(elem){	
		return elem.classList.contains(UiDynamicClass)
	} 

	
}

export default FwComponent;