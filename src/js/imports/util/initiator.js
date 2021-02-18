
import { BodyClass } from './ui.js';


 class FwQueue {
	constructor(){
		this._on_load = [];
		this._on_ready = [];
		this._on_resize = [];
		this._on_scroll = [];
		this._on_rightAway = [];
		this._on_init = [];
	}

	get on_load(){
		return this._on_load;
	}
	get on_ready(){
		return this._on_ready;
	}
	get on_resize(){
		return this._on_resize;
	}
	get on_scroll(){
		return this._on_scroll;
	}
	get on_rightAway(){
		return this._on_rightAway;
	}
	get on_init(){
		return this._on_init;
	}

	set on_load(fn){
		this._on_load.push(fn);
	}
	set on_ready(fn){
		this._on_ready.push(fn);
	}
	set on_resize(fn){
		this._on_resize.push(fn);
	}
	set on_scroll(fn){
		this._on_scroll.push(fn);
	}
	set on_rightAway(fn){
		this._on_rightAway.push(fn);
	}
	set on_init(fn){
		this._on_init.push(fn);
	}
}

const FwFnsQ = new FwQueue();

export {FwFnsQ};

const runFnsQ = (fnsArray) =>  {
	fnsArray.forEach((fn) => {
		fn();
	});
}


const docReady = (fn) => {
	if (document.readyState != 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
};

const FwInit = {};

FwInit.initEvents = () => {

	//component events
		runFnsQ(FwFnsQ.on_init);

	//window events
		window.addEventListener('resize', FwInit.runResize);
		window.addEventListener('scroll', FwInit.runScroll);
}

FwInit.runInit = () => {
	runFnsQ(FwFnsQ.on_rightAway);
};

FwInit.runReady = () => {
	runFnsQ(FwFnsQ.on_ready);
	FwInit.setCompleteState();
};

FwInit.runLoad = () => {
	runFnsQ(FwFnsQ.on_load);
};

let resizeTimerInternal;
FwInit.runResize = () => {
	clearTimeout(resizeTimerInternal);
	resizeTimerInternal = setTimeout(() => {
		console.log(FwFnsQ.on_resize);
		runFnsQ(FwFnsQ.on_resize);
	}, 100);
};

let scrollTimerInternal;
FwInit.runScroll = () => {
	clearTimeout(scrollTimerInternal);
	scrollTimerInternal = setTimeout(() => {
		runFnsQ(FwFnsQ.on_scroll);
	}, 100);
};

FwInit.setState = (mode) => {
	mode = mode || 'complete';
	switch(mode){
		case 'loading':
			document.body
				.classList
				.remove(BodyClass.loaded);
			document.body
				.classList
				.add(BodyClass.loading);
			break;
		case 'complete':
		default:
			setTimeout(()=>{ 
				document.body
					.classList
					.remove(BodyClass.loading);
				document.body
					.classList
					.add(BodyClass.loaded);
			},100);
			break;
	}

}

FwInit.setLoadingState = () => {
	FwInit.setState('loading');
}

FwInit.setCompleteState = () => {
	FwInit.setState('complete');

}

FwInit.reInit = () => {
	FwInit.setLoadingState();
	FwInit.runInit();
	FwInit.runReady();
	FwInit.runLoad();
};

FwInit.runInit();
docReady(FwInit.runReady);
window.addEventListener('load',FwInit.runLoad);
FwInit.initEvents();

/*


FwEvent.addListener(
			document.documentElement,
			'click',
			'*',
			(e) => {
				const triggerer = e.target;

				if (FwInit.isDisabled(triggerer)) {
					e.preventDefault();
				} else {
					if(
						!triggerer.classList.contains(UiDynamicClass) //temp fix for ui elements not getting ancestry
					){
						
						//tooltip
						if (
							!triggerer.closest('[data-toggle="tooltip-click"]')
							&& !triggerer.closest('[data-toggle="tooltip-hover"]')
							&& !triggerer.closest('.tooltip.tooltip-allow-interaction')
						) {
							FwInit.destroyToolTip();
						}
			
						//dropdown
						if (
							!triggerer.closest('[data-toggle="dropdown"]')
							&& !triggerer.closest('.dropdown')
						) {
							FwInit.closeDropdowns(false);
						}

						//switch
						if (
							!triggerer.closest('[data-toggle="switch-off"]')
							&& !triggerer.closest('[data-toggle="switch-on"]')
							&& !triggerer.closest('.switch')
						){
							FwInit.initSwitch(false,'off')
						}
					}
				}
			}
		);

*/