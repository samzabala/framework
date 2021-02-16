

const FwCore = {};

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

FwCore.Data = {
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


FwCore.settings =
	FwCore.settings
	|| {};

FwCore.settings.prefix = 'fw';

FwCore.settings.lazyLoad =
	FwCore.settings.lazyLoad
	|| true;
FwCore.settings.initializeModal =
	FwCore.settings.initializeModal
	|| true;
FwCore.settings.initializeBoard =
	FwCore.settings.initializeBoard
	|| true;
FwCore.settings.initializeAccordion =
	FwCore.settings.initializeAccordion
	|| true;
FwCore.settings.dynamicHash =
	FwCore.settings.dynamicHash
	|| true;
FwCore.settings.uiClass =
	FwCore.settings.uiClass
	|| `${FwCore.settings.prefix}-ui`; //for styles
FwCore.settings.uiJsClass =
	FwCore.settings.uiJsClass
	|| FwCore.settings.uiClass.replace('-','_'); // for scripting events and shit

export default FwCore;