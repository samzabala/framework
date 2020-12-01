class FwSettings {
	constructor(opts){
		this.prefix =
			'fw';
			
		this.lazyLoad =
			opts.lazyLoad
			|| true;
		this.initializeModal =
			opts.initializeModal
			|| true;
		this.initializeBoard =
			opts.initializeBoard
			|| true;
		this.initializeAccordion =
			opts.initializeAccordion
			|| true;
		this.dynamicHash =
			opts.dynamicHash
			|| true;
		this.uiClass =
			opts.uiClass
			|| `${settings.prefix}-ui`; //for styles
		this.uiJsClass =
			opts.uiJsClass
			|| settings.uiClass.replace('-','_'); // for scripting events and shit
	}
}



let settings = {};

		


export default (new FwSettings);