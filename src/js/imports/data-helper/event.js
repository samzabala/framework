
import Settings from './../core/settings.js';
import FwDataHelper from './../classes/data-helper.js';
// const customEvents = [];
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

	static classNester(selector){
		if(selector === '*' || typeof selector !== 'string'){
			return selector;
		}else{
			const selArr = selector.split(',');
			let toReturn  = selector;
			selArr.forEach(sel => {

				
				toReturn += `, ${sel} *`;
			});
	
			return toReturn;
		}
	}

	static addListener(parent, evt, selectorOrParentFallback, handler){
		parent = parent || false;
		
		// runNative = runNative !== false || runNative == true; //no apipipi
		//dai mo ilaag sa ddocument ta maerror si matches habo nya ki element

		const elemToAddTo = parent || selectorOrParentFallback;
		const evtNoApi = evt.split(`.${Settings.get('prefix')}`)[0];
		const isNative = NativeEvents.includes(evt);
		if(!isNative){
			elemToAddTo.addEventListener(
				evtNoApi,
				(event)=>{
					if(
						!parent
						|| (
							parent
							&& event.target.matches(FwEvent.classNester(selectorOrParentFallback))
							// && event.target.closest(selectorOrParentFallback)
						)
					){
						FwEvent.trigger(
							event.target,
							evt,
							{
								detail: {
									nativeEvt:event,
									_selection: FwEvent.classNester(selectorOrParentFallback)
								}
							}
						);
					}
				},
				true
			);
		}

		elemToAddTo.addEventListener(
			evt,
			(event) => {
				if (
					!parent
					|| (
						parent
						// && event.target.matches(FwEvent.classNester(selectorOrParentFallback))
						&& event.target.closest(selectorOrParentFallback)
					)
				) {
					if(!isNative){
						handler(event.detail.nativeEvt);
					}else{
						handler(event);
					}
				}
			},
			true
		);

		
		// //stable no api
		// elemToAddTo.addEventListener(
		// 	evtNoApi,
		// 	(event)=>{
		// 		if(
		// 			!parent
		// 			|| (
		// 				parent
		// 				&& event.target.matches(FwEvent.classNester(selectorOrParentFallback))
		// 				// && event.target.closest(selectorOrParentFallback)
		// 			)
		// 		){
		// 			handler(event);
		// 		}
		// 	},
		// 	true
		// );	
	}
	


	static translateToNative(event){

	}

	static trigger(el, evt, customEventOpts) {
		let event;
		el = el || document;
		if (NativeEvents.includes(evt)) {
			event = document.createEvent('HTMLEvents');
			event.initEvent(evt, true, false);
		} else {
			customEventOpts = customEventOpts || false;
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

