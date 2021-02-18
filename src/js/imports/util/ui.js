
import FwCore from './core.js';
import {lookupResetToParentClass,lookupResetFromClosestComponent} from './validation.js';
import FwDom from '../data-helper/dom.js';

export const UiPrefix = (componentName,noDash) => {
	noDash = noDash || false;
	return noDash ? `${componentName}-ui` : `${componentName}-ui-`;
}

export const UiDynamicClass = `${FwCore.settings.uiJsClass}_internal_toggle`;

export const BodyClass = {
	noScroll: `body-no-scroll`,
	onDrag: `body-on-drag`,
	loading: `body-loading`,
	loaded: `body-loaded`,
}
//this was the bitch that got clickied or hovered or wehatever
export const UiTriggerer = (triggerer,isGroupable) => {
	triggerer = triggerer || false;
	isGroupable = isGroupable || false;

	let toReturn;

	if (triggerer) {
		if ( isGroupable ){
			return;
		} else if ( //calendar fix
			triggerer
				.closest(`.${FwCore.settings.uiJsClass}`)
			&& !triggerer
				.closest(`.${UiDynamicClass}`)
		) {
			toReturn = triggerer
				.closest(`.${FwCore.settings.uiJsClass}`);

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

export const UiToggled = (toggleMode,triggerer) => {
	triggerer = triggerer || false;
	toggleMode = toggleMode || false;
		// lookup_reset_to_parent
		// lookup_from_closest

		if (toggleMode) {
			const selector = `.${toggleMode}`,
				toggledClass = `.${toggleMode}`
					.replace('-open', '')
					.replace('-close', ''),
				componentClass = toggledClass ? toggledClass.replace('.', '') : null;

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
						).classList.contains(componentClass)
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
						).classList.contains(componentClass)
					)
				) {
					// console.warn('toggle found by data-href');
					toReturn = document.querySelector(triggerer.getAttribute('data-href'));

				//lookup by closest [data-toggle]
				} else if (
					toggleMode
					&& triggerer
						.parentNode
						.closest(`[data-toggle="${toggleMode}"]`)
				) {
					// console.warn('toggle searching closest data-toggle');
					toReturn = UiToggled(
						toggleMode,
						triggerer.parentNode.closest(`[data-toggle="${toggleMode}"]`)
					);

				//look up by tag `lookup_reset_to_parent`
				} else if (
					toggleMode
					&& lookupResetToParentClass.filter(i => {
						return triggerer.parentNode.classList.contains(i)
					}).length > 0
				) {
					// console.warn('toggle trigger was in input group');
					toReturn = UiToggled(
						toggleMode,
						triggerer.parentNode
					);

				} else {
					let possibleSiblings = triggerer.nextElementSibling;
					
					while (possibleSiblings) {
						if (possibleSiblings.matches(selector)) {
							// console.warn('toggle trigger anybody whos a sibling');
							return possibleSiblings;
						}
						possibleSiblings =
							possibleSiblings.nextElementSibling;
					}
					toReturn = possibleSiblings;
				}
			} else {
				
				if (
					window.location.hash !== ''
					&& document.querySelector(window.location.hash)
					&& document
						.querySelector(window.location.hash)
						.classList.contains(componentClass)
				) {
					// console.warn('no trigger but found the hash is a matching toggle');
					toReturn = document.querySelector(window.location.hash);
				}
			}

			if (
				!toReturn
				&& lookupResetFromClosestComponent.filter((i)=> {
					return i == componentClass
				})
			) {
				//look if theres an ancestor it can toggle. last prioroty
				// console.warn('no trigger so looking for an ancestor');
				if (
					triggerer
					&& toggleMode
					&& triggerer.parentNode.closest(toggledClass)
				) {
					// console.warn('found ancestor');
					toReturn = triggerer.parentNode.closest(
						toggledClass
					);
				}
			}

			return toReturn;
		}
}

export const UiChangeHash = (id) => {
	id = id || '';

	if (FwCore.settings.dynamicHash) {
		const idToGoTo = id !== '' ? `#${id}` : null;

		if (idToGoTo) {
			if (history.pushState) {
				history.pushState(null, null, idToGoTo);
			} else {
				location.hash = idToGoTo;
			}

		} else {
			const noHashURL = window.location.href.replace(/#.*$/, '');
			if (history.pushState) {
				window.history.pushState('', document.title, noHashURL);
			}
			location.hash = '';
		}
	}
};

export const UiToggleGroup = (element, prefix, activatedClass, siblingSelector, resetterClass, noActiveClass,multipleClass) => {
	prefix = prefix || 'btn';
	siblingSelector = siblingSelector || `.${prefix}`;
	activatedClass = activatedClass || 'active';
	resetterClass = resetterClass || `${prefix}-group-toggle-reset`;
	noActiveClass = noActiveClass || `${prefix}-group-toggle-allow-no-active`;
	multipleClass = multipleClass || `${prefix}-group-toggle-multiple`;

	if(!element) {
		return;
	}

	if(
		element.closest(siblingSelector)
		&& !element.classList.contains(prefix)
	){
		element = element.closest(siblingSelector);
	}

	if (element) {

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
				.closest(noActiveClass)
		) {
			element.classList.toggle(activatedClass);

		} else {
			element.classList.add(activatedClass);
		}
	}
}

export const UiPurge = (exempted,selector,callback) => {
	
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
		}
	});
}