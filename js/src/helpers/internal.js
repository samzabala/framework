import { FrameWork } from './core.js';
import { 
	disableClasses,
	dateTime,
	dayNames,
	dayNamesShort,
	dayNamesShorter,
	monthNames,
	monthNamesShort,
	BrValue,
	BrTag,
	BrMobileMax,
	Palette,
	DateToParse,
	DateToHuman,
	DateToVal,
} from './validation';
import FwTypeHelper from './classes.js';

const __f = {};

export const FwModifiers = {
	keys: {
		ctrl: false,
		shift: false,
		alt: false,
		meta: false,
	},
	hasActive(key) {
		key = key || false;
	
		if (key && this.keys.hasOwnProperty(key)) {
			return this.keys[key];
			
		} else {
			return (
				this.keys.ctrl
				|| this.keys.shift
				|| this.keys.alt
				|| this.keys.meta
			);
		}
	},
	activate(key){
		key = key || false;
		if (key && this.keys.hasOwnProperty(key)) {
			this.keys[key] == true;
		}
	},
	deactivate(key){
		key = key || false;
		if (key && this.keys.hasOwnProperty(key)) {
			this.keys[key] == false;
		}
	}
	
}

class FwString extends FwTypeHelper(){
	
	static GetFileExtension () {
		str = self.data;
		return str.split('.').pop();
	}

	static ToCamelCase (){
		const str = self.data;
		str = self.data;
	
		return str
			.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
				return index == 0
					? word.toLowerCase()
					: word.toUpperCase();
			})
			.replace(/-|\s/g, '');
	}
}

class FwArr extends FwTypeHelper(){
	static moveItem(oi, ni){
		const arr = self.data;

		while (oi < 0) {
			oi += arr.length;
		}
	
		while (ni < 0) {
			ni += arr.length;
		}
	
		if (ni >= arr.length) {
			let k = ni - arr.length;
			while (k-- + 1) {
				arr.push(undefined);
			}
		}
	
		arr.splice(ni, 0, arr.splice(oi, 1)[0]);
		return arr;
	}
}



__f.dateGetAdjacent = (date, offsetByMonth, dateOverride) => {
	let d = DateToParse(date);

	if (d) {
		dateOverride = dateOverride || null;

		const currMonth = d.getMonth(),
			currYear = d.getFullYear(),
			newMonth = (() => {
				let toReturn;
				if (
					(currMonth + offsetByMonth) % 12 > 12
				) {
					toReturn = ((currMonth + offsetByMonth) % 12) - 12;

				} else if (
					(currMonth + offsetByMonth) % 12 < 0
				) {
					toReturn = ((currMonth + offsetByMonth) % 12) + 12;

				} else {
					toReturn = (currMonth + offsetByMonth) % 12;
				}

				return toReturn;
			})(),

			newYear = (() => {
				const defOffset = parseInt(offsetByMonth / 12);
				let toReturn = currYear + defOffset;

				//offset to adjacent year
				if (
					offsetByMonth < 0
					&& currMonth + (offsetByMonth % 12) < 0
				) {
					toReturn -= 1;

				} else if (
					offsetByMonth > 0
					&& currMonth + (offsetByMonth % 12) > 11
				) {
					toReturn += 1;
				}

				return toReturn;
			})()
			;

		d.setMonth(newMonth);
		d.setFullYear(newYear);

		if (dateOverride) {
			d.setDate(dateOverride);
		}

		return d;

	} else {
		return false;
	}
};

__f.reverseArray = (arr) => {
	let newArray = [];
	for (let i = arr.length - 1; i >= 0; i--) {
		newArray.push(arr[i]);
	}
	return newArray;
};

__f.uiPrefix = (pref, noDash) => {
	noDash = noDash || false;
	return noDash ? `input-${pref}-ui` : `input-${pref}-ui-`;
};

__f.runFn = (callback) => {
	if (callback) {
		let fn;
		try {
			fn = eval(/^[^(]+/.exec(callback)[0]);
		} catch (err) {}
		if (typeof fn === 'function') {
			eval(callback);
		}
	}
};

__f.parseArgs = (arr, defaults) => {

	const args = {};

	for (let def in defaults) {
		args[def] = defaults[def];
	}

	for (let prop in arr) {
		if (
			arr.hasOwnProperty(prop)
			&& arr[prop] !== undefined
			&& arr[prop] !== null
			&& arr[prop] !== ''
		) {
			// Push each value from `obj` into `extended`
			// catch boolean
			if (arr[prop] == 'false' || arr[prop] == 'true') {
				arr[prop] = arr[prop] == 'true' ? true : false;
			}
			args[prop] = arr[prop];
		}
	}

	return args;
};

__f.changeHash = (id) => {
	id = id || '';

	if (FrameWork.settings.dynamicHash) {
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

__f.toggleGroup = (triggerer, prefix, siblingSelector, resetterClass, noActiveClass) => {
	prefix = prefix || 'btn';
	siblingSelector = siblingSelector || `.${prefix}`;
	resetterClass = resetterClass || `${prefix}-group-toggle-reset`;
	noActiveClass = noActiveClass || `${prefix}-group-toggle-allow-no-active`;

	if(
		triggerer.closest(siblingSelector)
		&& !triggerer.classList.contains(prefix)
	){
		triggerer = triggerer.closest(siblingSelector);
	}

	if (triggerer) {

		const resetter = FrameWork
			.getSiblings(triggerer)
			.filter((butt) => {
				return butt.classList.contains(resetterClass);
			});
		resetter.forEach((butt) => {
			butt.classList.remove('active');
		});

		const selectorSiblings = FrameWork
			.getSiblings(triggerer)
			.filter((sibling) => {
				return sibling.matches(siblingSelector);
			});

		if (
			!triggerer.closest(`.${prefix}-group-toggle-multiple`)
			|| triggerer.classList.contains(resetterClass)
		) {
			selectorSiblings.forEach((sibling) => {
				sibling.classList.remove('active');
			});
		}

		if (
			(
				triggerer
					.closest(`.${prefix}-group-toggle-multiple`)
				&& selectorSiblings
					.filter((butt) => {
						return butt.classList.contains('active');
					})
					.length > 0
			)
			|| triggerer
				.closest(`.${noActiveClass}`)
		) {
			triggerer.classList.toggle('active');

		} else {
			triggerer.classList.add('active');
		}
	}
};

//good for descendants of ui shitsc as long as ui component gets data attribues of element that start is
__f.getTheUiTriggerer = (triggerer) => {
	triggerer = triggerer || false;

	let toReturn;

	if (triggerer) {
		if ( //idk what the fuck this was for but it stays for now
			triggerer
				.closest(`.input-group${FrameWork.settings.uiJsClass}`)
		){
		} else if ( //calendar fix
			triggerer
				.closest(`.${FrameWork.settings.uiJsClass}`)
			&& !triggerer
				.closest(`.${FrameWork.settings.uiJsClass}_internal_toggle`)
		) {
			toReturn = triggerer
				.closest(`.${FrameWork.settings.uiJsClass}`);

		} else {
			toReturn = triggerer;
		}

		return toReturn;
	}
};

__f.getTheToggled = (triggerer, toggleMode) => {
	toggleMode = toggleMode || null;

	if (toggleMode) {
		const selector = `.${toggleMode}`,
			toggledClass = `.${toggleMode}`
				.replace('-open', '')
				.replace('-close', ''),
			classToSearch = toggledClass ? toggledClass.replace('.', '') : null;

		let toReturn = null;

		if (triggerer) {
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
					).classList.contains(classToSearch)
				)
			) {
				// console.warn('toggle found by href');
				toReturn = document.querySelector(triggerer.getAttribute('href'));

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
					).classList.contains(classToSearch)
				)
			) {
				// console.warn('toggle found by data-href');
				toReturn = document.querySelector(triggerer.getAttribute('data-href'));

			} else if (
				toggleMode
				&& triggerer
					.parentNode
					.closest(`[data-toggle="${toggleMode}"]`)
			) {
				// console.warn('toggle searching closest data-toggle');
				toReturn = __f.getTheToggled(
					triggerer.parentNode.closest(`[data-toggle="${toggleMode}"]`),
					toggleMode
				);

			} else if (
				toggleMode
				&& triggerer.parentNode.classList.contains('input-group')
			) {
				// console.warn('toggle trigger was in input group');
				toReturn = __f.getTheToggled(
					triggerer.parentNode,
					toggleMode
				);

			} else if (
				toggleMode
				&& triggerer.parentNode.classList.contains('btn-group')
			) {
				// console.warn('toggle trigger was in btn group');
				toReturn = __f.getTheToggled(
					triggerer.parentNode,
					toggleMode
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
					.classList.contains(classToSearch)
			) {
				// console.warn('no trigger but found the hash is a matching toggle');
				toReturn = document.querySelector(window.location.hash);
			}
		}

		if (!toReturn) {
			//look if theres an ancestor it can toggle. last prioroty
			// console.warn('no trigger so looking for an ancestor');
			switch (toggleMode) {
				case 'dropdown':
				case 'modal':
				case 'board':
				case 'switch':
				case 'alert-close':
					if (
						triggerer
						&& toggleMode
						&& triggerer.parentNode.closest(toggledClass)
					) {
						// console.log('found ancestor');
						toReturn = triggerer.parentNode.closest(
							toggledClass
						);
					}
					break;
			}
		}

		return toReturn;
	}
};

__f.fns_on_load = [];
__f.fns_on_ready = [];
__f.fns_on_resize = [];
__f.fns_on_scroll = [];
__f.fns_on_rightAway = [];

__f.funFnForTrueChildren = (AncestorOfAllElm,selector,parentSelector,fn) => {

	if(
		AncestorOfAllElm
		&& selector
		&& parentSelector
		&& fn	
	){
		let children = AncestorOfAllElm.querySelectorAll(selector);

		children.forEach((child) => {

			if(
				child.closest(parentSelector)
				&& (AncestorOfAllElm.isSameNode(child.closest(parentSelector)))
			){
				fn(child);
			}
		})
	}
}

export { __f }