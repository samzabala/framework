
import FwCore from '../util/core.js';
import FwDataHelper from '../classes/data-helper.js';
const customEvents = [];
const NativeEvents = [
	'click',
	'dblclick',
	'mouseup',
	'mousedown',
	'contextmenu',
	'mousewheel',
	'DOMMouseScroll',
	'mouseover',
	'mouseout',
	'mousemove',
	'selectstart',
	'selectend',
	'keydown',
	'keypress',
	'keyup',
	'paste',
	'orientationchange',
	'touchstart',
	'touchmove',
	'touchend',
	'touchcancel',
	'pointerdown',
	'pointermove',
	'pointerup',
	'pointerleave',
	'pointercancel',
	'gesturestart',
	'gesturechange',
	'gestureend',
	'focus',
	'blur',
	'change',
	'reset',
	'select',
	'submit',
	'focusin',
	'focusout',
	'load',
	'unload',
	'beforeunload',
	'resize',
	'move',
	'DOMContentLoaded',
	'readystatechange',
	'error',
	'abort',
	'scroll'
  ];
  

class FwEvent extends FwDataHelper {
	

	static get cusEventOptsDef () {
		return {
			bubbles: true,
			cancelable: true,
		}
	}
	
	static addListener(parent, evt, selector, delegationFn,runNative,customEventOpts){
		parent = parent || selector;
		runNative = runNative !== false || runNative == true;

		const evtNoApi = evt.split(`.${FwCore.settings.prefix}`)[0];
		const isNative = NativeEvents.includes(evt);

		customEventOpts = customEventOpts || {
			cancelable: true
		};

		customEventOpts.detail = customEventOpts.detail || {};

		// parent.addEventListener(
		// 	evtNoApi,
		// 	(event) => {

		// 		console.log(evt,evtNoApi);
		// 		if (event.target.matches(selector + ', ' + selector + ' *')) {
		// 			// try {
		// 				delegationFn(event);
		// 				if(!isNative){
		// 					FwEvent.trigger(event.target,evt,customEventOpts);
		// 				}
		// 			// } catch(e) {}
		// 		}
		// 	},
		// 	true
		// );

		parent.addEventListener(
			(
				runNative
					? evtNoApi
					: evt ),
			(event) => {
				if (event.target.matches(selector + ', ' + selector + ' *')) {
					// try {
						(!runNative && !isNative) && FwEvent.trigger(
							event.target,
							evt,
							customEventOpts
						);
						delegationFn(event);
					// } catch(e) {}
				}
			},
			true
		);

		
	}

	static trigger(el, evt, customEventOpts) {
		let event;
		el = el || document;
		if (NativeEvents.includes(evt)) {
			event = document.createEvent('HTMLEvents');
			event.initEvent(evt, true, false);
		} else {
			customEventOpts = customEventOpts || {};
			if(customEventOpts) {
				event = new CustomEvent(evt, customEventOpts);
			}else{
				event = new CustomEvent(evt)
			}
		}
		el.dispatchEvent(event);
	
		// return event;
	}


}

export default FwEvent;

