const CORE_SETTINGS = {};
CORE_SETTINGS.prefix = 'fw';
CORE_SETTINGS.lazyLoad = true;
CORE_SETTINGS.initializeModal = true;
CORE_SETTINGS.initializeAccordion = true;
CORE_SETTINGS.initializeForm = true;
CORE_SETTINGS.dynamicHash = true;
CORE_SETTINGS.uiClass = `${CORE_SETTINGS.prefix}-ui`; //for styles
CORE_SETTINGS.uiJsClass = CORE_SETTINGS.uiClass.replace('-', '_'); // for scripting events and shit

class Settings {
  static modify(key, value) {
    if (Object.prototype.hasOwnProperty.call(CORE_SETTINGS, key)) {
      CORE_SETTINGS[key] = value;
    }
  }

  static get(key) {
    if (key) {
      return CORE_SETTINGS[key];
    } else {
      return CORE_SETTINGS;
    }
  }
}

export default Settings;
