const CORE_SETTINGS = {};
	CORE_SETTINGS.prefix = 'fw';
	CORE_SETTINGS.lazyLoad = true;
	CORE_SETTINGS.initializeModal = true;
	CORE_SETTINGS.initializeAccordion = true;
	CORE_SETTINGS.dynamicHash = true;
	CORE_SETTINGS.uiClass = `${CORE_SETTINGS.prefix}-ui`; //for styles
	CORE_SETTINGS.uiJsClass = CORE_SETTINGS.uiClass.replace('-','_'); // for scripting events and shit

class Settings {

	static modify(key,value){
		if(this.hasOwnProperty(key)){
			CORE_SETTINGS[key] = value;
		}
	}

	static get(key){
		const toReturn = {
			prefix: CORE_SETTINGS.prefix,
			lazyLoad: CORE_SETTINGS.lazyLoad,
			initializeModal: CORE_SETTINGS.initializeModal,
			initializeAccordion: CORE_SETTINGS.initializeAccordion,
			dynamicHash: CORE_SETTINGS.dynamicHash,
			uiClass: CORE_SETTINGS.uiClass,
			uiJsClass: CORE_SETTINGS.uiJsClass,
		}

		if(key){
			return toReturn[key];
		}else{
			return toReturn;
		}
	}
}


export default Settings;