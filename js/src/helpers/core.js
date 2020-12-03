// import 
console.info('Framework core is initiated');

const FrameWork = window.FrameWork || {};

const _dataobj = (() => {
	const storage = {};
	let id = 1;
	return {
		_set(element, key, data) {
			if (typeof element.fwKeys === 'undefined') {
			element.fwKeys = {
				key,
				id
			}
			id++
			}

			storage[element.fwKeys.id] = data
		},
		_get(element, key) {
			if (!element || typeof element.fwKeys === 'undefined') {
			return null
			}

			const keyProperties = element.fwKeys
			if (keyProperties.key === key) {
			return storage[keyProperties.id]
			}

			return null
		},
		_remove(element, key) {
			if (typeof element.fwKeys === 'undefined') {
			return
			}

			const keyProperties = element.fwKeys
			if (keyProperties.key === key) {
			delete storage[keyProperties.id]
			delete element.fwKeys
			}
		}
	}
})()

FrameWork.data = {
	set(elm, key, data) {
	_dataobj._set(elm, key, data)
	},
	get(elm, key) {
	return _dataobj._get(elm, key)
	},
	remove(elm, key) {
	_dataobj._remove(elm, key)
	}
}


FrameWork.settings =
	FrameWork.settings
	|| {};

FrameWork.settings.prefix =
	FrameWork.settings.prefix
	|| 'fw';

FrameWork.settings.lazyLoad =
	FrameWork.settings.lazyLoad
	|| true;
FrameWork.settings.initializeModal =
	FrameWork.settings.initializeModal
	|| true;
FrameWork.settings.initializeBoard =
	FrameWork.settings.initializeBoard
	|| true;
FrameWork.settings.initializeAccordion =
	FrameWork.settings.initializeAccordion
	|| true;
FrameWork.settings.dynamicHash =
	FrameWork.settings.dynamicHash
	|| true;
FrameWork.settings.uiClass =
	FrameWork.settings.uiClass
	|| `${FrameWork.settings.prefix}-ui`; //for styles
FrameWork.settings.uiJsClass =
	FrameWork.settings.uiJsClass
	|| FrameWork.settings.uiClass.replace('-','_'); // for scripting events and shit


export {FrameWork};