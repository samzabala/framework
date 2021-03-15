
import Settings from './../core/settings.js';
import {lookupResetToParentClass,lookupResetFromClosestComponent,lookupResetFromClosestComponentUi} from './validation.js';
import FwDom from './../data-helper/dom.js';
import FwString from './../data-helper/string.js';

export const UIPrefix = (componentName) => {
	return `${componentName}-ui`;
}

export const UIDynamicClass = `${Settings.get('uiJsClass')}_internal_toggle`;

export const UIBodyClass = {
	noScroll: `body-no-scroll`,
	onDrag: `body-on-drag`,
	loading: `body-loading`,
	loaded: `body-loaded`,
}
//convert toggler if it's a dynamic chu so no sadness
export const UITriggerer = (triggerer,isGroupable) => {
	triggerer = triggerer || false;
	isGroupable = isGroupable || false;

	let toReturn;

	if (triggerer) {
		if ( isGroupable ){
			return;
		} else if ( //calendar fix
			triggerer
				.closest(`.${Settings.get('uiJsClass')}`)
			&& !triggerer
				.closest(`.${UIDynamicClass}`)
		) {
			toReturn = triggerer
				.closest(`.${Settings.get('uiJsClass')}`);

		} else {
			toReturn = triggerer;
		}

		return toReturn;
	}
}

// case 'dropdown':
// 	case 'modal':
// 	case 'board':
// 	case 'switch':
// 	case 'alert-close':

export const UIToggled = (toggleMode,triggerer,selector) => {
	triggerer = triggerer || false;
	toggleMode = toggleMode || false;
	selector = selector || false;

	const componentClass = `${FwString.ToDashed(
		toggleMode
			.replace('-open', '')
			.replace('-close', '')
	)}`;

	if(!toggleMode){
		return
	}

	const selectorToMatch = selector
		? selector
		: `.${componentClass}`;
		// lookup_reset_to_parent
		// lookup_from_closest


	let toReturn = null;

	if (triggerer) {
		//lookup by href
		if (
			triggerer.hasAttribute('href')
			&& triggerer.getAttribute('href').startsWith('#')
			&& triggerer.getAttribute('href') !== '#'
			&& (
				document.querySelector(
					triggerer.getAttribute('href')
				)
				&& document.querySelector(
					triggerer.getAttribute('href')
				).matches(selectorToMatch)
			)
		) {
			// console.warn('toggle found by href');
			toReturn = document.querySelector(triggerer.getAttribute('href'));

		//lookup by data-href
		} else if (
			triggerer.hasAttribute('data-href')
			&& triggerer.getAttribute('data-href').startsWith('#')
			&& triggerer.getAttribute('data-href') !== '#'
			&& (
				document.querySelector(
					triggerer.getAttribute('data-href')
				)
				&& document.querySelector(
					triggerer.getAttribute('data-href')
				).matches(selectorToMatch)
			)
		) {
			// console.warn('toggle found by data-href');
			toReturn = document.querySelector(triggerer.getAttribute('data-href'));

		//lookup by closest [data-toggle]
		} else if (
			toggleMode
			&& triggerer
				.parentNode
				.closest(`[data-toggle-${toggleMode}]`)
		) {
			// console.warn('toggle searching closest data-toggle');
			toReturn = UIToggled(
				toggleMode,
				triggerer.parentNode.closest(`[data-toggle-${toggleMode}]`)
			);

		//look up by tag `lookup_reset_to_parent`
		} else if (
			toggleMode
			&& lookupResetToParentClass.filter(i => {
				return triggerer.parentNode.matches(`.${i}`)
			}).length > 0
		) {
			// console.warn('toggle trigger was in group');
			toReturn = UIToggled(
				toggleMode,
				triggerer.parentNode
			);
		} else {
			let possibleSiblings = triggerer.nextElementSibling;
			
			while (possibleSiblings) {
				if (possibleSiblings.matches(selectorToMatch)) {
					console.warn('toggle trigger anybody whos a sibling');
					return possibleSiblings;
				}
				possibleSiblings =
					possibleSiblings.nextElementSibling;
			}
			toReturn = possibleSiblings;
		}
	}

	if (
		!toReturn
		&& lookupResetFromClosestComponent.filter((i)=> {
			return i == componentClass
		})
	) {
		//look if theres an ancestor it can toggle. last prioroty
		// console.warn('has a ttrigger, looking for closest compopnent');


		if (
			triggerer
			&& toggleMode
			&& (
				lookupResetFromClosestComponentUi.filter(i => {
					return triggerer.parentNode.matches(`.${i}`)
				}).length > 0
				&& triggerer.parentNode.closest(`.${UIPrefix(componentClass)}`)
			)
		){
			// console.warn('found for a ui ancestor');
			toReturn = triggerer.parentNode.closest(`.${componentClass}`);
		}else if(
			triggerer
			&& toggleMode
			&& triggerer.parentNode.closest(selectorToMatch)
		){
			// console.warn('found for an ancestor');
			toReturn = triggerer.parentNode.closest(selectorToMatch);
		}
	}

	if(!toReturn) {
		
		if (
			window.location.hash !== ''
			&& document.querySelector(window.location.hash)
			&& document
				.querySelector(window.location.hash)
				.matches(selectorToMatch)
		) {
			// console.warn('no trigger but found the hash is a matching toggle');
			toReturn = document.querySelector(window.location.hash);
		}
	}

	return toReturn;
}

export const UIChangeHash = (id) => {
	id = id || '';

	if (Settings.get('dynamicHash')) {
		const idToGoTo = (id !== '' ? `#${id}` : null);
		if (idToGoTo) {
			if (window.history.pushState) {
				window.history.pushState(
					null,
					null,idToGoTo
				);
			} else {
				window.location.hash = idToGoTo;
			}

		} else {
			let scrollV, scrollH;
			if (window.history.pushState)
				window.history.pushState(
					"",
					document.title,
					window.location.pathname + window.location.search
				);
			else {
				// Prevent scrolling by storing the page's current scroll offset
				scrollV = document.body.scrollTop;
				scrollH = document.body.scrollLeft;

				window.location.hash = "";

				// Restore the scroll offset, should be flicker free
				document.body.scrollTop = scrollV;
				document.body.scrollLeft = scrollH;
			}
		}
	}
};

export const UIToggleGroup = (element, prefix, activatedClass, siblingSelector, resetterClass, noActiveClass,multipleClass) => {
	prefix = prefix || false;

	if(!prefix){
		return;
	}
	siblingSelector = siblingSelector || `.${prefix}`;
	activatedClass = activatedClass || 'active';
	resetterClass = resetterClass || `${prefix}-group-toggle-reset`;
	noActiveClass = noActiveClass || `${prefix}-group-toggle-allow-no-active`;
	multipleClass = multipleClass || `${prefix}-group-toggle-multiple`;

	if(
		element.closest(siblingSelector)
		&& !element.classList.contains(prefix)
	){
		element = element.closest(siblingSelector);
	}

	if(!element) {
		return;
	}

	console.log(element,
		noActiveClass);

	//reset da resetti
	const resetter = FwDom
		.getSiblings(element)
		.filter((butt) => {
			return butt.classList.contains(resetterClass);
		});
	resetter.forEach((butt) => {
		butt.classList.remove(activatedClass);
	});

	//dem siblongs
	const selectorSiblings = FwDom
		.getSiblings(element)
		.filter((sibling) => {
			return sibling.matches(siblingSelector);
		});

	if (
		!element.closest(`.${multipleClass}`)
		|| element.classList.contains(resetterClass)
	) {
		selectorSiblings.forEach((sibling) => {
			sibling.classList.remove(activatedClass);
		});
	}

	if (
		(
			element.closest(`.${multipleClass}`)
			&& selectorSiblings
				.filter((butt) => {
					return butt.classList.contains(activatedClass);
				})
				.length > 0
		)
		|| element
			.closest(`.${noActiveClass}`)
	) {
		element.classList.toggle(activatedClass);

	} else {0
		element.classList.add(activatedClass);
	}
}

export const UIPurge = (exempted,selector,callback) => {
	
	document.querySelectorAll(selector).forEach((elem) => {

		if (
			!exempted
			|| (
				exempted
				&& elem !== exempted
				&& !elem.contains(exempted)
			 )
		) {
			callback(elem);
		}else{
			// console.log('exepmted',exempted);
		}
	});
}