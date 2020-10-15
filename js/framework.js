'use strict';

(function (window) {
	console.info('Framework vanilla script is initiated');

	if (window.fw) {
		throw new Error('fw already exists oh boi');
	}

	//frameWork shit
	const frameWork = window.frameWork || {};

	//internal shit
	const __f = {};

	//settings
	frameWork.settings =
		frameWork.settings
		|| {};
	frameWork.settings.prefix =
		'fw';
	frameWork.settings.lazyLoad =
		frameWork.settings.lazyLoad
		|| true;
	frameWork.settings.initializeModal =
		frameWork.settings.initializeModal
		|| true;
	frameWork.settings.initializeBoard =
		frameWork.settings.initializeBoard
		|| true;
	frameWork.settings.initializeAccordion =
		frameWork.settings.initializeAccordion
		|| true;
	frameWork.settings.dynamicHash =
		frameWork.settings.dynamicHash
		|| true;
	frameWork.settings.uiClass =
		frameWork.settings.uiClass
		|| `${frameWork.settings.prefix}-ui`; //for styles
	frameWork.settings.uiJsClass =
		frameWork.settings.uiJsClass
		|| frameWork.settings.uiClass.replace('-','_'); // for scripting events and shit

	__f.modifierKeys = {
		ctrl: false,
		shift: false,
		alt: false,
		meta: false,
	};

	__f.modifierIsActive = (mode) => {

		mode = mode || false;

		if (mode && __f.modifierKeys.hasOwnProperty(mode)) {
			return __f.modifierKeys[mode];
			
		} else {
			return (
				__f.modifierKeys.ctrl
				|| __f.modifierKeys.shift
				|| __f.modifierKeys.alt
				|| __f.modifierKeys.meta
			);
		}
	};

	//vanilla already has scrollto btwn... just so u know

	__f.strGetFileExtension = (str) => {
		str = str || '';
		return str.split('.').pop();
	};

	__f.strToCamelCase = (str) => {
		str = str || '';

		return str
			.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
				return index == 0
					? word.toLowerCase()
					: word.toUpperCase();
			})
			.replace(/-|\s/g, '');
	};

	__f.arrMoveItem = (arr, oi, ni) => {

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

	};

	//polyifiulls
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.msMatchesSelector
			|| Element.prototype.webkitMatchesSelector;
	}

	if (!Element.prototype.closest) {
		Element.prototype.closest = (s) => {
			let el = this;
			do {
				if (el.matches(s)) return el;
				el = el.parentElement || el.parentNode;
			} while (el !== null && el.nodeType === 1);
			return null;
		};
	}

	frameWork.addEvent = (parent, evt, selector, handler) => {
		parent = parent || selector;

		parent.addEventListener(
			evt,
			(event) => {
				if (event.target.matches(selector + ', ' + selector + ' *')) {
					// try {
						handler(event);
					// } catch(e) {}
				}
			},
			true
		);

	};

	frameWork.triggerEvent = (el, evt) => {
		const event = document.createEvent('HTMLEvents');

		event.initEvent(evt, true, false);
		el.dispatchEvent(event);

	};
	
	frameWork.slideDown = (elem) => {
		elem && (elem.style.display = 'block');
	};
	
	frameWork.slideUp = (elem) => {
		elem && (elem.style.display = 'none');
	};

	frameWork.getSiblings = (elem) => {

		return Array.prototype.filter.call(
			elem.parentNode.children,
			(child) => {
				return child !== elem;
			}
		);

	};

	frameWork.getAncestors = (elem, selector) => {

		const parents = [];
		let firstChar;

		if (selector) {
			firstChar = selector.charAt(0);
		}

		// Get matches
		for (; elem && elem !== document; elem = elem.parentNode) {

			if (selector) {
				// If selector is a class
				if (firstChar === '.') {
					if (elem.classList.contains(selector.substr(1))) {
						parents.push(elem);
					}
				}

				// If selector is an ID
				if (firstChar === '#') {
					if (elem.id === selector.substr(1)) {
						parents.push(elem);
					}
				}

				// If selector is a data attribute
				if (firstChar === '[') {
					if (
						elem.hasAttribute(selector.substr(1, selector.length - 1))
					) {
						parents.push(elem);
					}
				}

				// If selector is a tag
				if (elem.tagName.toLowerCase() === selector) {
					parents.push(elem);
				}

			} else {
				parents.push(elem);
			}

		}
		// Return parents if any exist
		if (parents.length === 0) {
			return null;
		} else {
			return parents;
		}
	};

	frameWork.docReady = (fn) => {
		if (document.readyState != 'loading') {
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	};

	frameWork.moveContents = (oldParent, newParent) => {
		if (newParent && newParent !== oldParent) {
			while (oldParent.childNodes.length > 0) {
				newParent.appendChild(oldParent.childNodes[0]);
			}
		}
	};

	__f.datetimeFormatPresets = {
		HumanDate: {
			placeholder: 'mm/dd/yyyy',
			pattern: /^\d{2}\/\d{2}\/\d{4}$/,
			template: 'mm/dd/yy',
		},
		// HumanTime24: {
		// 	placeholder:"hh:mm",
		// 	pattern:"",
		// 	template:"HH:MM"
		// },
		// HumanTime12: {
		// 	placeholder:"hh:mm",
		// 	pattern:"",
		// 	template:"HH:MM"
		// },
		Value: {
			placeholder: 'yyyy-mm-dd',
			pattern: /^\d{4}[-]\d{2}[-]\d{2}$/,
			template: 'yy-mm-dd',
		},
		// ValueDateTime:{
		// 	placeholder:"yy-mm-ddThh:gg",
		// 	pattern:"",
		// 	template:"yy-mm-ddThh:gg"
		// },
	};

	__f.dayFormatNames = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	__f.dayFormatNamesShort = [
		'Sun',
		'Mon',
		'Tue',
		'Wed',
		'Thu',
		'Fri',
		'Sat',
	];

	__f.dayFormatNamesShorter = [
		'Su',
		'Mo',
		'Tu',
		'We',
		'Th',
		'Fr',
		'Sa'
	];

	__f.monthFormatNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	__f.monthFormatNamesShort = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	//make it objoct
	__f.dateToParse = (date) => {

		let yr,
			mo,
			dy,
			hr,
			mn,
			dateArr = [],
			timeArr = [];

		if (date) {
			
			if (Object.prototype.toString.call(date) === '[object Date]') {
				//make a new date out of its methods because js will think u are referring to the same date everythere and ur math becomes a hellhole... dont.. hOE
				yr = date.getFullYear() || null;
				mo = date.getMonth() || null;
				dy = date.getDate() || null;
				hr = date.getHours() || null;
				mn = date.getMinutes() || null;
				
			} else {

				const pattern = new RegExp(
					__f.datetimeFormatPresets.Value.pattern
				);
				const isValid = pattern.test(date);

				if (isValid) {
					let dateTimeArr = date.split('T') || [];

					//date
					if (dateTimeArr[0]) {
						dateArr = dateTimeArr[0].split('-');
					}

					//time
					if (dateTimeArr[1]) {
						timeArr = dateTimeArr[1].split(':');
					}

					yr = parseInt(dateArr[0]) || null;
					mo = parseInt(dateArr[1] - 1) || null;
					dy = parseInt(dateArr[2]) || null;
					hr = parseInt(timeArr[0]) || null;
					mn = parseInt(timeArr[1]) || null;
				}
			}

			let toReturn = false;

			if (
				Object.prototype.toString.call(
					new Date(yr, mo, dy, hr, mn)
				) == '[object Date]'
			) {
				toReturn = new Date(yr, mo, dy, hr, mn);
			}

			return toReturn;
		}
	};

	//make it human readable
	__f.dateToHuman = (date, format) => {
		date = __f.dateToParse(date);
		format = format || __f.datetimeFormatPresets.HumanDate.template;

		if (date) {

			let iFormat,
				output = '',
				literal = false;

			// Check whether a format character is doubled
			const lookAhead = (match) => {
					let matches =
						iFormat + 1 < format.length
						&& format.charAt(iFormat + 1) === match;
					if (matches) {
						iFormat++;
					}
					return matches;
				},

				// Format a number, with leading zero if necessary
				formatNumber = (match, value, len) => {
					let num = '' + value;
					if (lookAhead(match)) {
						while (num.length < len) {
							num = '0' + num;
						}
					}
					return num;
				},

				// Format a name, short or long as requested
				formatName = (match, value, shortNames, longNames) => {
					return lookAhead(match)
						? longNames[value]
						: shortNames[value];
				};
				
			if (date) {

				for (iFormat = 0; iFormat < format.length; iFormat++) {

					if (literal) {
						if (
							format.charAt(iFormat) === "'" && !lookAhead("'")
						) {
							literal = false;

						} else {
							output += format.charAt(iFormat);
						}

					} else {
						switch (format.charAt(iFormat)) {
							case 'd': //date number
								output += formatNumber(
									'd',
									date.getDate(),
									2
								);
								break;

							case 'D': //day of the week
								output += formatName(
									'D',
									date.getDay(),
									__f.dayFormatNamesShort,
									__f.dayFormatNames
								);
								break;

							case 'o': //day of year hmm
								output += formatNumber(
									'o',
									Math.round(
										(
											new Date(
												date.getFullYear(),
												date.getMonth(),
												date.getDate()
											).getTime()
											- new Date(
													date.getFullYear(),
													0,
													0
											).getTime()
										)
										/ 86400000
									),
									3
								);
								break;

							case 'm': //month
								output += formatNumber(
									'm',
									date.getMonth() + 1,
									2
								);
								break;

							case 'M': //month but name
								output += formatName(
									'M',
									date.getMonth(),
									__f.monthFormatNamesShort,
									__f.monthFormatNames
								);
								break;

							case 'y': //year
								output += lookAhead('y')
									? date.getFullYear()
									: (date.getFullYear() % 100 < 10
											? '0'
											: '') +
									  (date.getFullYear() % 100);
								break;

							case 'H': //12 hour
								output += formatNumber(
									'H',
									date.getHours() % 12 || 12,
									2
								);
								break;

							case 'h': //24 hour
								output += formatNumber(
									'h',
									date.getHours(),
									2
								);
								break;

							case 'i': //minute
								output += formatNumber(
									'i',
									date.getMinutes(),
									2
								);
								break;

							case 'a': //am /pm
								output +=
									date.getHours() >= 12 ? 'pm' : 'am';
								break;

							case 'A': //AM/PM
								output +=
									date.getHours() >= 12 ? 'PM' : 'AM';
								break;

							case "'":
								if (lookAhead("'")) {
									output += "'";
								} else {
									literal = true;
								}
								break;

							default:
								output += format.charAt(iFormat);

						}
					}
				}
			}

			return output;

		} else {
			return false;
		}
	};

	//make it ready for input value of datata
	__f.dateToVal = (date) => {
		const d = __f.dateToParse(date);

		if (d) {
			return __f.dateToHuman(
				d,
				__f.datetimeFormatPresets.Value.template
			);
		}
	};

	__f.dateGetAdjacent = (date, offsetByMonth, dateOverride) => {
		let d = __f.dateToParse(date);

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

		if (frameWork.settings.dynamicHash) {
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
		noActiveClass = noActiveClass || `${prefix}-group-allow-no-active`;

		if(
			triggerer.closest(siblingSelector)
			&& !triggerer.classList.contains(prefix)
		){
			triggerer = triggerer.closest(siblingSelector);
		}

		if (triggerer) {

			const resetter = frameWork
				.getSiblings(triggerer)
				.filter((butt) => {
					return butt.classList.contains(resetterClass);
				});
			resetter.forEach((butt) => {
				butt.classList.remove('active');
			});

			const selectorSiblings = frameWork
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
					.closest(`.input-group${frameWork.settings.uiJsClass}`)
			){
			} else if ( //calendar fix
				triggerer
					.closest(`.${frameWork.settings.uiJsClass}`)
				&& !triggerer
					.closest(`.${frameWork.settings.uiJsClass}_internal_toggle`)
			) {
				toReturn = triggerer
					.closest(`.${frameWork.settings.uiJsClass}`);

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
					case 'asset':
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

	__f.br_vals = {
		xxs: 0,
		xs:
			parseFloat(
				getComputedStyle(
					document.documentElement
				).getPropertyValue('--fw-br-xs')
			)
			|| 600,
		sm:
			parseFloat(
				getComputedStyle(
					document.documentElement
				).getPropertyValue('--fw-br-sm')
			)
			|| 1200,
		md:
			parseFloat(
				getComputedStyle(
					document.documentElement
				).getPropertyValue('--fw-br-md')
			)
			|| 1600,
		lg:
			parseFloat(
				getComputedStyle(
					document.documentElement
				).getPropertyValue('--fw-br-lg')
			)
			|| 1800,
		xl: 9999999,
	};

	__f.br_arr = Object.keys(__f.br_vals);
	// __f.br_to_loop =  ['xs','sm','md','lg'];

	__f.br_mobile_max =
		parseFloat(
			getComputedStyle(
				document.documentElement
			).getPropertyValue('--fw-br-mobile-max')
		)
		|| 'sm';

	__f.fns_on_load = [];
	__f.fns_on_ready = [];
	__f.fns_on_resize = [];
	__f.fns_on_scroll = [];
	__f.fns_on_rightAway = [];

	frameWork.validateBr = (breakpoint, mode) => {
		mode = mode || 'below'; //below,within,above
		const currIndex = __f.br_arr.indexOf(breakpoint);
		switch (mode) {
			case 'below': //max-width
				return (
					document.documentElement.clientWidth
						<= __f.br_vals[breakpoint]
				);

			case 'within':
				return (
					document.documentElement.clientWidth
						<=__f.br_vals[breakpoint]
					&& document.documentElement.clientWidth
						> __f.br_vals[__f.br_arr[currIndex - 1]]
				);

			case 'above':
				return currIndex > 0
					? document.documentElement.clientWidth
						> __f.br_vals[__f.br_arr[currIndex - 1]]
					: document.documentElement.clientWidth
						> __f.br_vals[__f.br_arr[currIndex]];
		}
	};

	__f.palette = [
		'base',
		'primary',
		'secondary',
		'accent',
		'neutral',
		'error',
		'caution',
		'success',
		'intensity-1',
		'intensity-2',
		'intensity-3',
		'intensity-4',
		'intensity-5',
	];

	frameWork.initGrid = (moduleGrid) => {
		const availablePropertiesParent = [
			'grid-template-columns',
			'grid-template-rows',
			'grid-template-areas',
			'grid-column-start',
			'grid-template-end',
			'grid-template',
			'grid-column-gap',
			'grid-row-gap',
			'justify-items',
			'align-items',
			'justify-content',
			'align-content',
			'place-content',
			'grid-auto-columns',
			'grid-auto-rows',
			'grid-auto-flow',
			'grid',
		];

		const availablePropertiesChildren = [
			'grid-area',
			'grid-column',
			'grid-row',
			'grid-column-start',
			'grid-column-end',
			'grid-row-start',
			'grid-row-end',
			'justify-self',
			'align-self',
			'place-self',
		];

		const renderProps = (modElement, props) => {
			props.forEach((prop) => {
				// modElement.style[__f.strToCamelCase(prop)] = '';
				let propsSet = false,
					propSetBr = false,
					smallestStyledBr = false;

				//check for breakpointz first
				__f.reverseArray(__f.br_arr).forEach((br) => {
					if (
						modElement.hasAttribute(`data-${prop}-${br}`)
						&& !propsSet
					) {
						smallestStyledBr = br;
						if (frameWork.validateBr(br, 'above')) {
							modElement
								.style[__f.strToCamelCase(prop)] = modElement.getAttribute(
									`data-${prop}-${br}`
								);
							propsSet = true;
							propSetBr = true;
						}
					}
				});

				if (
					modElement.hasAttribute(`data-${prop}`)
					&& !propsSet
				) {
					//check for all breakpoint
					if (
						!propsSet
						&& !propSetBr
					) {
						modElement
							.style[__f.strToCamelCase(prop)] = modElement.getAttribute(
								`data-${prop}`
							);
						propsSet = true;
					}

				} else {
					if (
						modElement.style[__f.strToCamelCase(prop)] !== null
						&& smallestStyledBr
						&& !frameWork.validateBr(smallestStyledBr, 'above')
					) {
						modElement.style[__f.strToCamelCase(prop)] = null;
					}
				}
			});
		};

		renderProps(moduleGrid, availablePropertiesParent);
		const moduleChildren = Array.from(moduleGrid.children).filter(
			(child) => {
				return child.matches('.module');
			}
		);

		moduleChildren.forEach((child) => {
			renderProps(child, availablePropertiesChildren);
		});
	};

	//range only is pag kwan di sya isa isang date pangmaramihan
	__f.dateIsValid = (date, args, rangeOnly) => {
		rangeOnly = rangeOnly || false; //range,spot

		const d = __f.dateToParse(date),
			checkAgainst = args.disabledDates.split(',');

		let toReturn = true;

		if (!rangeOnly) {
			//if in disabled dates
			if (checkAgainst.indexOf(__f.dateToVal(d)) > -1) {
				// console.warn('value is declared disabled specifically || ',__f.dateToVal(d));
				toReturn = false;
			}

			//weekend
			if (
				checkAgainst.indexOf('weekends') > -1
				&& (d.getDay() == 0 || d.getDay() == 6)
			) {
				// console.warn('value was a weekend || ',__f.dateToVal(d),__f.dateToVal(date));
				toReturn = false;
			}
		}

		//in the past
		let dateNow = new Date();
		dateNow.setHours(0, 0, 0, 0);
		if (
			checkAgainst.indexOf('past') > -1
			&& d < dateNow
		) {
			// console.warn('value was in the past || ',__f.dateToVal(date),'\nversus ',__f.dateToVal(dateNow));
			toReturn = false;
		}

		if (
			checkAgainst.indexOf('future') > -1
			&& d > dateNow
		) {
			// console.warn('value was in the future || ',__f.dateToVal(date),'\nversus ',__f.dateToVal(dateNow));
			toReturn = false;
		}

		//if  in range of min or max
		if (
			(
				__f.dateToParse(args.max)
				&& __f.dateToParse(args.max) < d
			)
			|| (
				__f.dateToParse(args.min)
				&& d < __f.dateToParse(args.min)
			)
		) {
			// console.warn('value not in max and width || ',__f.dateToVal(d));;
			toReturn = false;
		}

		return toReturn;
	};

	__f.createCalendarUi = (inputCalendar, valueForUi, args) => {
		
		if (inputCalendar) {
			valueForUi =
				valueForUi
				|| __f.dateToVal(inputCalendar.value)
				|| __f.dateToVal(new Date());
			const theUi = {};

			theUi.container = inputCalendar
				.closest(`.${__f.uiPrefix('calendar', true)}`);
			if (!theUi.container) {
				theUi.container = document.createElement('div');
				inputCalendar.parentNode.insertBefore(
					theUi.container,
					inputCalendar
				);
				theUi.container.appendChild(inputCalendar);
				theUi.container.setAttribute(
					'class',
					`${frameWork.settings.uiClass}
					${frameWork.settings.uiJsClass}
					${inputCalendar.getAttribute('class')
						.toString().replace('input-calendar', __f.uiPrefix('calendar', true))
					}`
				);
			}

			theUi.input = theUi.container
				.querySelector(`.${__f.uiPrefix('calendar')}input`);

			const components = frameWork.getSiblings(inputCalendar);
			components.forEach((component) => {
				if (component !== theUi.input) {
					component.parentNode.removeChild(component);
				}
			});

			//input
			if (args.textInput) {
				if (!theUi.input) {
					theUi.input = document.createElement('div');
					theUi.container.appendChild(theUi.input);
					theUi.input.setAttribute(
						'class',
						`${__f.uiPrefix('calendar')}input`
					);
					theUi.input.innerHTML =
						'<input class="input input-single-line" type="text" maxlength="10" placeholder="MM/DD/YYYY" />';
				}
			}

			const currYear = __f.dateToParse(valueForUi).getFullYear(),
				currMonth = __f.dateToParse(valueForUi).getMonth(),
				currentCalendarDate = new Date(currYear, currMonth, 1); //IT ALSO FIRST DAY MOTHERFUCKER

			//heading
			theUi.heading = document.createElement('div');
			theUi.container.appendChild(theUi.heading);
			theUi.heading.setAttribute(
				'class',
				`${__f.uiPrefix('calendar')}heading`
			);

			//arrowz
			const generateArrow = (buttonClass) => {
				let symbolClass, arrowDate, validness;
				//set a new date with no date because fuck that boi
				// console.warn(buttonClass,'hello i fucked up','\n',__f.dateToParse(valueForUi),'\n',currentCalendarDate,'\n', new Date(currYear,currMonth));
				switch (buttonClass) {
					case 'prev-month':
						symbolClass = 'symbol-arrow-left';
						arrowDate = __f.dateToVal(
							__f.dateGetAdjacent(currentCalendarDate, -1)
						);
						validness = __f.dateIsValid(
							new Date(currYear, currMonth, 0),
							args,
							true
						);
						break;

					case 'prev-year':
						symbolClass = 'symbol-arrow-double-left';
						arrowDate = __f.dateToVal(
							__f.dateGetAdjacent(currentCalendarDate, -12)
						);
						validness = __f.dateIsValid(
							new Date(currYear - 1, currMonth, 0),
							args,
							true
						);
						break;

					case 'next-month':
						symbolClass = 'symbol-arrow-right';
						arrowDate = __f.dateToVal(
							__f.dateGetAdjacent(currentCalendarDate, 1)
						);
						validness = __f.dateIsValid(
							new Date(currYear, currMonth + 1, 1),
							args,
							true
						);
						break;

					case 'next-year':
						symbolClass = 'symbol-arrow-double-right';
						arrowDate = __f.dateToVal(
							__f.dateGetAdjacent(currentCalendarDate, 12)
						);
						validness = __f.dateIsValid(
							new Date(currYear + 1, currMonth, 1),
							args,
							true
						);
						break;

				}
				//kung yung at least yung last day nang prev or first day ng next man lang ay valid pwidi sya i doot doot
				let htmlString = `<a href=""
					class="
						${!validness ? `disabled ` : ''}
						${__f.uiPrefix('calendar')}navigation
						${__f.uiPrefix('calendar')}button
						${__f.uiPrefix('calendar')}${buttonClass}" data-value="${arrowDate}"
					>
						<i class="${__f.uiPrefix('calendar')}symbol symbol ${symbolClass}"></i>
					</a>`;

				return htmlString;
			};

			const butts = [
				'prev-year',
				'prev-month',
				'next-month',
				'next-year',
			];

			butts.forEach((butt) => {
				if (
					(
						args.yearSkip
						&& (
							butt == 'prev-year'
							|| butt == 'next-year'
						)
					)
					|| (
						args.monthSkip
						&& (
							butt == 'prev-month'
							|| butt == 'next-month'
						)
					)
				) {
					theUi.heading.innerHTML += generateArrow(butt);
				}
			});

			//title
			theUi.title = document.createElement('div');
			theUi.heading.appendChild(theUi.title);
			theUi.title.setAttribute(
				'class',
				`${__f.uiPrefix('calendar')}title ${__f.uiPrefix('calendar')}dropdown-toggle
				${frameWork.settings.uiJsClass}_internal_toggle`
			);
			theUi.title.setAttribute('data-toggle', 'dropdown');
			theUi.title.innerHTML = `<span
				class="${__f.uiPrefix('calendar')}month-text">
					${__f.monthFormatNamesShort[currMonth]}
				</span>
				<span class="${__f.uiPrefix('calendar')}year-text">
					${currYear}
				</span>
				<i class="${__f.uiPrefix('calendar')}symbol symbol symbol-caret-down no-margin-x"></i>`;

			//dropdown
			theUi.dropdown = document.createElement('ul');
			theUi.heading.appendChild(theUi.dropdown);
			theUi.dropdown.setAttribute('data-dropdown-width', '100%');
			theUi.dropdown.setAttribute(
				'class',
				`${__f.uiPrefix(
					'calendar'
				)}dropdown dropdown dropdown-center-x dropdown-top-flush text-align-center`
			);
			theUi.dropdown.innerHTML += `<li 
					class="${__f.uiPrefix('calendar')}current-month-year active"
				>
					<a href="#"
						class="${__f.uiPrefix('calendar')}month"
						data-value="${__f.dateToVal(currentCalendarDate)}"
					>
						${__f.monthFormatNamesShort[currMonth]} ${currYear}
					</a>
				</li>
				<li><hr class="dropdown-separator"></li>`;

			let dropdownInit, dropdownLimit;

			if (args.dropdownYearSpan == 0) {
				dropdownInit = currentCalendarDate.getMonth() * -1;
				dropdownLimit = 11 - currentCalendarDate.getMonth();
			} else {
				dropdownInit = parseInt(
					-12 * parseInt(args.dropdownYearSpan)
				);
				dropdownLimit = parseInt(
					12 * parseInt(args.dropdownYearSpan)
				);
			}

			//update dropdown
			for (let i = dropdownInit; i <= dropdownLimit; i++) {
				const listItemDate = __f.dateGetAdjacent(
					currentCalendarDate,
					i
				);

				const dateForValidation = (() => {
					let toReturn;

					if (i >= 0) {
						//first day of month
						// console.log('kinabukasan sya');
						toReturn = new Date(
							listItemDate.getFullYear(),
							listItemDate.getMonth(),
							1
						);

					} else {
						//last day of month
						// console.log('nakaraan sya');
						toReturn = new Date(
							listItemDate.getFullYear(),
							listItemDate.getMonth() + 1,
							0
						);
					}

					return toReturn;
				})();
				// console.warn(i,'\nkwan ano ni\n',listItemDate,dateForValidation);

				if (__f.dateIsValid(dateForValidation, args, true)) {
					let currClass = i == 0 ? 'active' : '',
						listItem = `<li class="${currClass}">
							<a href="#"
								class="${__f.uiPrefix('calendar')}month"
								data-value="${__f.dateToVal(listItemDate)}">
									${
										__f.monthFormatNamesShort[
											listItemDate.getMonth()
										]
									} ${listItemDate.getFullYear()}
							</a>
						${listItemDate.getMonth() == 11
							&& i !== dropdownLimit
								? `</li><li><hr class="dropdown-separator">`
								: ''
						}
						</li>`;

					theUi.dropdown.innerHTML += listItem;
				}
			}

			//generate grid
			theUi.grid = document.createElement('div');
			theUi.container.append(theUi.grid);
			theUi.grid.setAttribute(
				'class',
				`${__f.uiPrefix('calendar')}grid`
			);

			const generateBlock = (date, customClass) => {
				customClass = customClass || '';
				return `<a href="#" data-value="${__f.dateToVal(date)}"
						class="
						${__f.uiPrefix('calendar')}block 
						${__f.uiPrefix('calendar')}date
						${customClass}
					">
						<span>${date.getDate()}</span>
					</a>`;
			};

			//days heading
			theUi.days = document.createElement('div');
			theUi.grid.append(theUi.days);
			theUi.days.setAttribute(
				'class',
				`${__f.uiPrefix('calendar')}days`
			);

			let daysHTML = '',
				dayToRetrieve = parseInt(args.startDay);

			for (let i = 0; i < 7; i++) {
				if (dayToRetrieve > 6) {
					dayToRetrieve -= 7;
				}

				daysHTML += `<div
						class="${__f.uiPrefix('calendar')}block
						${__f.uiPrefix('calendar')}day"
					>
						${__f.dayFormatNamesShorter[dayToRetrieve]}
					</div>`;

				dayToRetrieve++;
			}

			theUi.days.innerHTML = daysHTML;

			//days
			theUi.dates = document.createElement('div');
			theUi.grid.append(theUi.dates);
			theUi.dates.setAttribute(
				'class',
				`${__f.uiPrefix('calendar')}dates`
			);

			//previous month
			const currPrevLastDate = (() => {
					return new Date(currYear, currMonth, 0);
				})(),
				currPrevLastDateDay = currPrevLastDate.getDay(),
				freeGridSpacePrev = 
					(
						currentCalendarDate.getDay()
						- parseInt(args.startDay)
						+ 7
					) % 7,
				currPrevLastDayOnStart =
					currPrevLastDateDay == 6
					? 0
					: currPrevLastDateDay + 1;

			if (currPrevLastDayOnStart !== parseInt(args.startDay)) {
				//if it doenst take its own row of shit

				// i = 0; i <= freeGridSpacePrev; i++
				// @TODO AAAAAAAAAAAA FIGURE OUT THE MATH
				// for( dayLoopI = currPrevLastDateDay; dayLoopI >= (parseInt(args.startDay)); dayLoopI--){
				// for(let i = 0; i < 7; i++){
				for (let i = 0; i < freeGridSpacePrev; i++) {
					let offset = currPrevLastDate.getDate() - i;

					let loopDatePrev = new Date(
						currPrevLastDate.getFullYear(),
						currPrevLastDate.getMonth(),
						offset
					);

					let dateBlockPrev = generateBlock(
						loopDatePrev,
						`${__f.uiPrefix('calendar')}block-adjacent
						${(!__f.dateIsValid(loopDatePrev, args)
							? 'disabled'
							: '')
						}`
					);

					//prepend because we loopped this bitch in reverse
					theUi.dates.innerHTML += dateBlockPrev;
				}
			}

			//curr month
			const currLastDate = new Date(currYear, currMonth + 1, 0);

			for (let i = 1; i <= currLastDate.getDate(); i++) {
				let dateBlockCurr = generateBlock(
					new Date(currYear, currMonth, i),
					!__f.dateIsValid(new Date(currYear, currMonth, i), args)
						? 'disabled'
						: ''
				);

				theUi.dates.innerHTML += dateBlockCurr;
			}

			//next month just fill the shit
			const currNextFirstDay = new Date(
					currYear,
					currMonth + 1,
					1
				).getDay(),
				freeGridSpaceNext =
					(7 - currNextFirstDay + parseInt(args.startDay)) % 7;

			if (currNextFirstDay !== parseInt(args.startDay)) {
				for (let i = 1; i <= freeGridSpaceNext; i++) {
					let loopDateNext = new Date(
						currYear,
						currMonth + 1,
						i
					);

					let dateBlockNext = generateBlock(
						loopDateNext,
						__f.uiPrefix('calendar') +
							'block-adjacent ' +
							(!__f.dateIsValid(loopDateNext, args)
								? 'disabled'
								: '')
					);

					theUi.dates.innerHTML += dateBlockNext;
				}
			}
		}
	};

	//updates both input field and UI
	frameWork.updateCalendar = (inputCalendar, newValue, valueForUi) => {

		const theValue = newValue || __f.dateToVal(inputCalendar.value);

		valueForUi = valueForUi || theValue || __f.dateToVal(new Date());

		const arr = {
			class:
				inputCalendar.getAttribute('class'),
			startDay:
				inputCalendar.getAttribute('data-calendar-start-day'), // 0,1,2,3,4,5,6
			min:
				inputCalendar.getAttribute('data-calendar-min')
				|| inputCalendar.getAttribute('min'),
			max:
				inputCalendar.getAttribute('data-calendar-max')
				|| inputCalendar.getAttribute('max'),
			dropdownYearSpan:
				inputCalendar.getAttribute('data-calendar-dropdown-year-span'),
			disabledDates:
				inputCalendar.getAttribute('data-calendar-disabled-dates'),
			textInput:
				inputCalendar.getAttribute('data-calendar-text-input'),
			monthSkip:
				inputCalendar.getAttribute('data-calendar-month-skip'),
			yearSkip:
				inputCalendar.getAttribute('data-calendar-year-skip'),
		};

		const defaults = {
			class: '',
			startDay: 0, // su,mo,tu,we,th,fr,sa,
			min: null,
			max: null,
			dropdownYearSpan: 0,
			disabledDates: '',
			textInput: false,
			monthSkip: true,
			yearSkip: false,
		};

		const args = __f.parseArgs(arr, defaults);

		if (parseInt(arr.dropdownYearSpan) <= 0) {
			args.dropdownYearSpan = defaults.dropdownYearSpan;
		}

		args.startDay = parseInt(args.startDay) % 7;

		//set up calendar
		if (__f.dateIsValid(theValue, args) || !theValue) {
			__f.createCalendarUi(
				inputCalendar,
				valueForUi,
				args
			);
		}

		if (__f.dateIsValid(theValue, args)) {
			inputCalendar
				.closest(`.${frameWork.settings.uiClass}`)
				.classList.remove('input-error');
		} else {
			inputCalendar
				.closest(`.${frameWork.settings.uiClass}`)
				.classList.add('input-error');
		}

		if (theValue) {
			//update the actual butt
			inputCalendar.setAttribute('value', theValue);
			inputCalendar.value = theValue;

			const dates = inputCalendar.parentNode.querySelectorAll(`.${__f.uiPrefix('calendar')}date`);

			dates.forEach((date) => {
				if (
					date.getAttribute('data-value') ==
					__f.dateToVal(theValue)
				) {
					date.classList.add('active');
				} else {
					date.classList.remove('active');
				}
			});

			const inputField = inputCalendar.parentNode.querySelector(`.${__f.uiPrefix('calendar')}input input`);

			if (inputField) {
				inputField.setAttribute('value', __f.dateToHuman(theValue));
				inputField.value = __f.dateToHuman(theValue);
			}
		}
	};

	__f.tagsInputString = '__fw_input__';

	//because input field is gonna go in between for backspacing capabilities
	__f.tagsToParse = (value, returnWithInput) => {
		returnWithInput =
			returnWithInput !== false || returnWithInput == true;

		let toReturn = Array.isArray(value)
			? value
			: value.split(',') || [];

		//check for ya boi
		toReturn.forEach((tag, i) => {
			if (
				(!tag || tag == '')
				|| (tag === __f.tagsInputString && !returnWithInput)
			) {
				toReturn.splice(i, 1);
			}
		});

		if (returnWithInput && toReturn.indexOf(__f.tagsInputString) < 0) {
			toReturn.push(__f.tagsInputString);
		}

		//remove duplicates
		toReturn = toReturn.reduce((acc, tag) => {
			if (!acc.includes(tag)) {
				acc.push(tag);
			}

			return acc;
		}, []);

		return toReturn;
	};

	//because input field is gonna go in between for backspacing capabilities
	__f.tagsToVal = (value, returnWithInput) => {
		value = value || '';
		return __f.tagsToParse(value, returnWithInput).join(',');
	};

	__f.createTagsUi = (inputTags, valueForUi, inputText, args) => {

		if (inputTags) {
			valueForUi = valueForUi || __f.tagsToVal(inputTags.value) || '';
			inputText = inputText || false;

			const theUi = {};

			theUi.container = inputTags.closest(`.${__f.uiPrefix('tags', true)}`);

			if (!theUi.container) {
				theUi.container = document.createElement('div');
				inputTags.parentNode.insertBefore(
					theUi.container,
					inputTags
				);
				theUi.container.appendChild(inputTags);
				theUi.container.classList.add('input');
				theUi.container.setAttribute(
					'class',
					`${frameWork.settings.uiClass}
					${frameWork.settings.uiJsClass}
					${
						inputTags
						.getAttribute('class').replace('input-tags', __f.uiPrefix('tags', true))
					}`
				);
			}

			theUi.container.classList.add(
				args.multipleLines
					? `${__f.uiPrefix('tags')}multiple`
					: `${__f.uiPrefix('tags')}single`
			);

			if (args.width) {
				theUi.container.style = args.width;
			}
			//idk it never exists on initial so we dont have to do weird div wraping catches here

			theUi.wrapper = theUi.container.querySelector(`.${__f.uiPrefix('tags')}wrapper`);

			if (!theUi.wrapper) {
				theUi.wrapper = document.createElement('div');
				theUi.container.appendChild(theUi.wrapper);
				theUi.wrapper.setAttribute(
					'class',
					`${__f.uiPrefix('tags')}wrapper`
				);
				theUi.wrapper = theUi.container.querySelector(`.${__f.uiPrefix('tags')}wrapper`);
			}

			theUi.input = theUi.wrapper.querySelector(`.${__f.uiPrefix('tags')}input`);

			if (!theUi.input) {
				theUi.input = document.createElement('span');
				theUi.wrapper.appendChild(theUi.input);
				theUi.input.setAttribute(
					'class',
					`${__f.uiPrefix('tags')}input`
				);
				theUi.input.contentEditable = true;
				theUi.input = theUi.wrapper.querySelector(`.${__f.uiPrefix('tags')}input`);

				if (args.callbackOnKeyup) {
					theUi.input.addEventListener('keyup', (event)=>{
						const keyUpScript = eval(args.callbackOnKeyup);
						if(keyUpScript){
							keyUpScript();
						};
					});
				}
			}


			if(inputTags.hasAttribute('placeholder')){
				theUi.input.setAttribute(
					'data-placeholder',
					inputTags.getAttribute('placeholder')
				);
			}

			//nearest fw-ui parent will actually do tgoggl for bby because baby cant stand up on its own
			if (inputTags.hasAttribute('data-toggle')) {
				theUi.input.setAttribute(
					'data-toggle',
					inputTags.getAttribute('data-toggle')
				);
			}

			if (frameWork.isDisabled(inputTags)) {
				theUi.input.classList.add('disabled');
			}

			const oldTags = theUi.wrapper.querySelectorAll(`.${__f.uiPrefix('tags')}tag`);

			oldTags.forEach((tag) => {
				tag.parentNode.removeChild(tag);
			});

			let valArr = __f.tagsToParse(valueForUi, true);
			const inputIn = valArr.indexOf(__f.tagsInputString);

			theUi.input.setAttribute('data-value', inputIn);

			//validate tags
			valArr = valArr.reduce((acc, tag) => {
				if (!acc.includes(tag)) {
					acc.push(tag);
				}
				return acc;
			}, []);

			valArr.forEach((tag, i) => {
				//get index of input
				if (tag !== __f.tagsInputString) {
					const tagHtml = document.createElement('span');

					if (i < inputIn) {
						theUi.input.insertAdjacentElement(
							'beforebegin',
							tagHtml
						);
					} else {
						theUi.wrapper.appendChild(tagHtml);
					}
					tagHtml.setAttribute(
						'class',
						`${__f.uiPrefix('tags')}tag`
					);

					tagHtml.innerHTML = `<span
							data-value="${i}"
							class="${__f.uiPrefix('tags')}tag-text"
						>
							${tag}
						</span>
						<a data-value="${i}" class="${__f.uiPrefix('tags')}tag-close" href="#">
						<i class="symbol symbol-close"></i></a>`;
				}
			});

			//attribues
			for (let i = 0; i < inputTags.attributes.length; i++) {
				let attr = inputTags.attributes[i];

				if (attr.specified) {
					if (
						attr.name.includes('data')
						&& !attr.name.includes('data-tags')
						&& !attr.name.includes('data-toggle')
						&& !attr.name.includes('data-value-ui')
					) {
						theUi.container.setAttribute(attr.name, attr.value);
					}
				}
			}

			inputTags.setAttribute('data-value-ui', valueForUi);

			//keep that shoit to the right
			theUi.container.scrollTo(theUi.input, 'x');

			//jquery u duuumb
			if (inputText) {
				theUi.input.innerText = inputText;
				theUi.input.focus();
			}
		}
	};

	frameWork.updateTags = (inputTags, allowFilter, newValue, valueForUi, inputText) => {
		let theValue = newValue
		|| ((inputTags.value !== '') && inputTags.value)
		|| '';

		inputText = inputText || false;
		valueForUi = valueForUi || theValue || '';
		allowFilter = allowFilter != false;

		const arr = {
			width:
				inputTags.getAttribute('data-tags-width'),
			callback:
				inputTags.getAttribute('data-tags-callback'),
			callbackOnKeyup:
				inputTags.getAttribute('data-tags-callback-on-keyup'),
			callbackNameFilter:
				inputTags.getAttribute('data-tags-callback-name-filter'),
			multipleLines:
				inputTags.getAttribute('data-tags-multiple-lines'),
		};

		const defaults = {
			width: null,
			callback: null,
			callbackNameFilter: null,
			callbackOnKeyup: null,
			multipleLines: false,
		};

		const args = __f.parseArgs(arr, defaults);

		if (inputTags) {
			if (args.callbackNameFilter && allowFilter) {
				let fnToFilter;

				try {
					fnToFilter = eval(args.callbackNameFilter);
				} catch (err) {}

				if (typeof fnToFilter === 'function') {
					const applyFilter = (valueToFilter, filterFnName) => {
						const inputIndex = __f.tagsToParse(valueToFilter)
								.indexOf(__f.tagsInputString),
							noInputValueToFilter = (() => {
									return __f.tagsToVal(valueToFilter, false);
								})();

						// turn to array ya bopi without the input tag string
						let toReturn = __f.tagsToParse(
							eval(`${filterFnName}("${noInputValueToFilter}")`),
							false
						);

						// console.log(
						// 	'index of input\n',inputIndex,
						// 	'\n\n\nfiltered and ready for splice\n',toReturn,
						// 	'\n\n\npassed to the fil;ter\n',__f.tagsToVal(valueToFilter,false),
						// 	'\n\n\nrar array\n',__f.tagsToParse(valueToFilter),
						// 	'\n\n\n no input field\n',noInputValueToFilter,__f.tagsToVal(valueToFilter,false),
						// 	'\n\n\n no input fieldas array\n',__f.tagsToParse(valueToFilter,false),
						// 	'\n\n\n string for eval\n', ( filterFnName +'("'+ noInputValueToFilter +'")'),
						// 	'\n\n\neval\n',  eval(filterFnName +'("'+ noInputValueToFilter +'")'),
						// 	'whAT ETHE FUCK'
						// );

						if (inputIndex > -1) {
							toReturn.splice(
								inputIndex <
									__f.tagsToParse(valueToFilter).length - 1
									? inputIndex
									: toReturn.length,
								0,
								__f.tagsInputString
							);
						}

						return __f.tagsToVal(toReturn);
					};

					theValue = applyFilter(
						theValue,
						args.callbackNameFilter
					);
					valueForUi = applyFilter(
						valueForUi,
						args.callbackNameFilter
					);
				}
			}

			__f.createTagsUi(
				inputTags,
				__f.tagsToVal(valueForUi),
				inputText,
				args
			);

			//update the actual butt
			inputTags.setAttribute('value', __f.tagsToVal(theValue, false));
			inputTags.value = __f.tagsToVal(theValue, false);

			//ATODO UPDATE SETUP HERE
			//update fake hoes
			if (args.callback) {
				__f.runFn(args.callback);
			}
		}
	};

	frameWork.isDisabled = (elem) => {
		const disableClasses = [
			'table-row-disabled',
			'tab-disabled',
			'btn-disabled',
			'input-disabled',
			'disabled',
		];
		let toReturn = false;

		if (elem.closest('[disabled]') || elem.matches(':disabled')) {
			toReturn = true;
		}

		disableClasses.forEach((classString) => {
			if (elem.closest(`.${classString}`) && !toReturn) {
				toReturn = true;
			}
		});

		return toReturn;
	};

	// //lazyload
	frameWork.loadImage = (img) => {
			let imgSrc = img.getAttribute('data-src'),
			imgSrcset = img.getAttribute('data-srcset');

		if (img.matches('img') || img.closest('picture')) {
			if (__f.strGetFileExtension(imgSrc) == 'svg') {
				const imgID = img.getAttribute('id') || null;
				const imgClass = img.getAttribute('class') || null;

				fetch(imgSrc)
					.then((response) => response.text())
					.then((markup) => {
						const parser = new DOMParser();
						const doc = parser.parseFromString(markup, 'text/html');

						const svg = doc.querySelector('svg');

						if (svg) {
							if (typeof imgID !== null) {
								svg.setAttribute('id', imgID);
							}
							if (typeof imgClass !== null) {
								svg.setAttribute(
									'class',
									`${imgClass} replaced-svg`
								);
							}

							svg.removeAttribute('xmlns:a');
							img.replaceWith(svg);
						}
					});
			} else {
				img.hasAttribute('data-src') && img.setAttribute('src', imgSrc);
				img.hasAttribute('data-srcset') && img.setAttribute('srcset', imgSrcset);
			}
		} else {
			img.style.backgroundImage = `url(${imgSrc})`;
		}
		img.classList.add('lazy-loaded');
	};

	frameWork.loadImages = (images) => {
		//css images
		// images
		images = images || document.querySelectorAll('*[data-src]');

		images.forEach((img) => {
			frameWork.loadImage(img);
		});

		document.documentElement.classList.add('lazy-initialized');
	};

	frameWork.settings.lazyLoad && __f.fns_on_rightAway.push(frameWork.loadImages);

	frameWork.createToolTip = (triggerer) => {

		if (triggerer) {
			frameWork.destroyToolTip();
			frameWork.toolTip = frameWork.toolTip || {};

			const arr = {
				placement:
					triggerer.getAttribute('data-tooltip-placement'),
				badge:
					triggerer.getAttribute('data-tooltip-badge'),
				badgeBg:
					triggerer.getAttribute('data-tooltip-badge-background'),
				badgeSize:
					triggerer.getAttribute('data-tooltip-badge-size'),
				content:
					triggerer.getAttribute('data-tooltip-content'),
				classes:
					triggerer.getAttribute('data-tooltip-classes'),
				centerX:
					triggerer.getAttribute('data-tooltip-center-x'),
				centerY:
					triggerer.getAttribute('data-tooltip-center-y'),
				x:
					triggerer.getAttribute('data-tooltip-x'),
				y:
					triggerer.getAttribute('data-tooltip-y'),
				width:
					triggerer.getAttribute('data-tooltip-width'),
				allowInteraction:
					triggerer.getAttribute('data-tooltip-allow-interaction'),
			};

			const defaults = {
				placement: 'left',
				badge: false,
				badgeBg: 'primary',
				badgeSize: '',
				classes: '',
				content: '<em class="color-neutral tooltip-placeholder">No info...</em>',
				centerX: false,
				centerY: false,
				x: false,
				y: false,
				width: null,
				allowInteraction: false,
			};

			const args = __f.parseArgs(arr, defaults);

			const toolTip = document.createElement('div');
			document.querySelector('body').appendChild(toolTip);

			toolTip.className = `tooltip tooltip-${args.placement}
				${args.width ? 'tooltip-has-custom-width' : ''}
				${args.allowInteraction ? 'tooltip-allow-interaction' : ''}`;

			if (args.width) {
				toolTip.style.maxidth = args.width;
			}

			let ttHtml = '';

			if (args.badge) {
				ttHtml += `<span class="badge tooltip-badge`;
				if (
					args.badgeSize == 'small'
					|| args.badgeSize == 'large'
				) {
					ttHtml += ` badge-${args.badgeSize}`;
				}

				if (__f.palette.includes(args.badgeBg)) {
					ttHtml += ` badge-${args.badgeBg}`;
				} else {
					ttHtml += `" style="background-color:${args.badgeBg};`;
				}

				ttHtml += `"></span>`;
			}

			ttHtml += `<div class="tooltip-content ${args.classes}">${args.content}</div></div>`;

			toolTip.innerHTML += ttHtml;

			frameWork.toolTip.current = toolTip;
			frameWork.toolTip.activeTriggerer = triggerer;
			frameWork.toolTip.args = args;

			toolTip.classList.add('active');

			frameWork.positionToolTip();
		}
	};

	//return origitit
	frameWork.getDefCoordsToolTip = (triggerer) => {

		if(frameWork.toolTip){

			triggerer  = triggerer || frameWork.toolTip.activeTriggerer;
			const args = frameWork.toolTip.args;

			let triggererOrigin;

			if(triggerer){

				let triggererProps = {
					top:
						triggerer.getBoundingClientRect().top + window.pageYOffset,
					left:
						triggerer.getBoundingClientRect().left + window.pageXOffset,
					height:
						triggerer.getBoundingClientRect().height,
					width:
						triggerer.getBoundingClientRect().width,
				};
	
				triggererOrigin = {
					x: () => {
						let toReturn =
							triggererProps.left + triggererProps.width * 0.5; //top and bottom
	
						if (!args.x) {
							if (!args.centerX) {
								switch (args.placement) {
									case 'right':
										toReturn =
											triggererProps.left +
											triggererProps.width;
										break;
									case 'left':
										toReturn = triggererProps.left;
										break;
								}
							}
	
						} else {
							toReturn = parseFloat(args.x);
						}
	
						return toReturn;
					},
	
					y: () => {
						let toReturn =
							triggererProps.top + triggererProps.height * 0.5; // left and right
						if (!args.y) {
							if (!args.centerY) {
								switch (args.placement) {
									case 'bottom':
										toReturn =
											triggererProps.top +
											triggererProps.height;
										break;
									case 'top':
										toReturn = triggererProps.top;
										break;
								}
							}
	
						} else {
							toReturn = parseFloat(args.y);
						}
	
						return toReturn;
					},
				};
			}

			return triggererOrigin;
		}
	}

	frameWork.destroyToolTip = () => {
		if (frameWork.toolTip) {
			if (frameWork.toolTip.current) {
				frameWork.toolTip.
					current.parentNode.removeChild(frameWork.toolTip.current);
			}

			delete frameWork.toolTip;
		}
	};

	//only use when the tooltip is finally active
	frameWork.positionToolTip = (posX, posY) => {
		
		if (frameWork.toolTip) {

			const toolTip = frameWork.toolTip.current;
			const args = frameWork.toolTip.args;
			const triggerer = frameWork.toolTip.activeTriggerer;

			let triggererOrigin;

			if(!posX || !posY) {
				triggererOrigin = frameWork.getDefCoordsToolTip(triggerer);
			}

			posX = posX || triggererOrigin && triggererOrigin.x();
			posY = posY || triggererOrigin && triggererOrigin.y();

			let toolPoint = parseFloat(
				window
					.getComputedStyle(toolTip, ':before')
					.getPropertyValue('width')
			);

			//check if we can sqrt it
			toolPoint = Math.sqrt(toolPoint * toolPoint * 2) * 0.5;
			isNaN(toolPoint) && (toolPoint = 15);

			let toolTipProps = {
				height: toolTip.getBoundingClientRect().height,
				width: toolTip.getBoundingClientRect().width,
			};

			const toolTipBadge = toolTip.querySelector('.tooltip-badge');

			let off = {
				x: () => {
					let toReturn = toolTipProps.width * -0.5; //top and bottom
					let badgeOffset = 0;

					switch (args.placement) {
						case 'right':
							toReturn = toolPoint;
							break;
						case 'left':
							toReturn = -(toolTipProps.width + toolPoint);
							break;
					}

					if (
						toolTipBadge
						&& (
							args.placement == 'left'
							|| args.placement == 'right'
						)
					) {
						badgeOffset =
							args.placement == 'left'
								? toolTipBadge.getBoundingClientRect()
										.width * -0.5
								: toolTipBadge.getBoundingClientRect()
										.width * 0.5;
					}

					toReturn += badgeOffset;

					return toReturn;
				},
				
				y: () => {
					let toReturn = toolTipProps.height * -0.5; // left and right
					let badgeOffset = 0;

					switch (args.placement) {
						case 'bottom':
							toReturn = toolPoint;
							break;
						case 'top':
							toReturn = -(toolTipProps.height + toolPoint);
							break;
					}

					if (
						toolTipBadge
						&& (
							args.placement == 'top'
							|| args.placement == 'bottom'
						)
					) {
						badgeOffset =
							args.placement == 'top'
								? toolTipBadge.getBoundingClientRect()
										.height * -0.5
								: toolTipBadge.getBoundingClientRect()
										.height * 0.5;
					}

					toReturn += badgeOffset;

					return toReturn;
				},
			};

			toolTip.style.left = posX + off.x() + 'px';
			toolTip.style.top = posY + off.y() + 'px';
			// toolTip.style.left = (posX)+'px';
			// toolTip.style.top = (posY) +'px';
		}
	};
	__f.fns_on_scroll.push(frameWork.positionToolTip);
	__f.fns_on_resize.push(frameWork.positionToolTip);

	frameWork.createModal = (triggerer, subcom) => {
		frameWork.destroyToolTip();
		
		subcom = subcom || 'modal';
		frameWork[subcom] = frameWork[subcom] || {};

		const contentWrap = __f.getTheToggled(triggerer, subcom);

		if(contentWrap || !window.location.hash){
			frameWork.destroyModal(null, subcom);
		}

		if (contentWrap && subcom) {

			const arr = {
				resize:
					(triggerer && triggerer.getAttribute(`data-${subcom}-resize`))
					|| contentWrap.getAttribute(`data-${subcom}-resize`),
				changeHash:
					(triggerer && triggerer.getAttribute(`data-${subcom}-change-hash`))
					|| contentWrap.getAttribute(`data-${subcom}-change-hash`),
				header:
					(triggerer && triggerer.getAttribute(`data-${subcom}-title`))
					|| contentWrap.getAttribute(`data-${subcom}-title`),
				close:
					(triggerer && triggerer.getAttribute(`data-${subcom}-close`))
					|| contentWrap.getAttribute(`data-${subcom}-close`),
				disableOverlay:
					(triggerer && triggerer.getAttribute(`data-${subcom}-disable-overlay`))
					|| contentWrap.getAttribute(`data-${subcom}-disable-overlay`),
				width:
					contentWrap.getAttribute(`data-${subcom}-width`)
					|| (triggerer && triggerer.getAttribute(`data-${subcom}-width`)),
				callback:
					(triggerer && triggerer.getAttribute(`data-${subcom}-callback`))
					|| contentWrap.getAttribute(`data-${subcom}-callback`),
				classes:
					(triggerer && triggerer.getAttribute(`data-${subcom}-classes`))
					|| contentWrap.getAttribute(`data-${subcom}-classes`),
				closeClasses:
					(triggerer && triggerer.getAttribute(`data-${subcom}-close-classes`))
					|| contentWrap.getAttribute(`data-${subcom}-close-classes`),
				align:
					(triggerer && triggerer.getAttribute(`data-${subcom}-align`))
					|| contentWrap.getAttribute(`data-${subcom}-align`),
			};

			const defaults = {
				resize: false,
				resizeClasses: null,
				changeHash: true,
				header: '',
				close: true,
				disableOverlay: true,
				width: null,
				callback: null,
				classes: '',
				closeClasses: '',
				align: 'left',
			};

			const args = __f.parseArgs(arr, defaults);

			const actualId = `${frameWork.settings.prefix}-${subcom}`;


			// console.log(contentWrap,arr,defaults,args);

			switch (subcom) {
				case 'modal':
					args.align = false;
					args.resize = false;
					args.resizeClasses = null;
					break;
			}

			const id = contentWrap.getAttribute('id') || actualId;

			id !== `${actualId}` && args.changeHash && __f.changeHash(id);

			const modal = document.createElement('div');
			document.querySelector('body').appendChild(modal);
			modal.className = `${frameWork.settings.prefix}-modal-component
				${subcom}-wrapper
				${args.classes}
				${args.align ? `${subcom}-${args.align}` : ''}`;
			modal.setAttribute('id', actualId);

			let html = '';

				//overlay
				html += `<a href="#"
						class="
							${subcom}-close-overlay"
							${
								args.disableOverlay == false
								? `data-toggle="${subcom}-close"`
								: ''
							}
					></a>`;

					switch (subcom) {
						case 'board':
							html += `<div class="${subcom}-button-wrapper">`;
								if (args.close !== false) {
									html += `<a href="#"
										class="
											${subcom}-close ${subcom}-button
											${
												args.closeClasses
												? args.closeClasses
												: `${subcom}-button-default`}"
										data-toggle="${subcom}-close"
									>
										<i class="symbol symbol-close "></i>
									</a>`;
								}

								if (args.resize !== false && args.width) {
									html += `<a
										class="
											${subcom}-resize ${subcom}-button
											${
												args.resizeClasses
												? args.resizeClasses
												: `${subcom}-button-default`}"
										data-toggle="${subcom}-resize"
									>
										<i class="symbol symbol-arrow-tail-left "></i>
										<i class="symbol symbol-arrow-tail-right "></i>
									</a>`;
								}
							html += `</div>`;

							html += `<div class="${subcom}-popup">`;

								if (args.header) {
									html += `<div class="${subcom}-header">
											<h1 class="${subcom}-title">${args.header}</h1>
										</div>`;
								}

								html += `<div class="${subcom}-popup-content"></div>`;

							html += `</div>`;

							break;

						case 'modal':
							html += `<div class="${subcom}-popup">`;

							if (args.header) {
								html += `<div class="${subcom}-header">
										<h1 class="${subcom}-title">${args.header}</h1>
									</div>`;
							}

							if (args.close !== false) {
								html += `<a href="#"
										class="${subcom}-close ${args.closeClasses}"
										data-toggle="${subcom}-close"
									>
										<i class="symbol symbol-close "></i>
									</a>`;
							}

							html += `<div class="${subcom}-popup-content"></div>`;

							html += `</div>`;
							
							break;
					}

			modal.innerHTML = html;

			frameWork.moveContents(
				contentWrap,
				modal.querySelector(`.${subcom}-popup-content`)
			);

			if (args.width) {
				frameWork.resizeModal(subcom,args.width,modal,args);
			}
			
			if (args.callback) {
				__f.runFn(args.callback);
			}

			frameWork[subcom].current = contentWrap;
			frameWork[subcom].args = args;

			modal.classList.add('active');
			document.body.classList.add('body-no-scroll');

			frameWork.checkOnModal(subcom);
		}
	};


	frameWork.checkOnModal = (subcom)=>{

		subcom = subcom || 'modal';

		const args = frameWork[subcom].args || {};
		const modal = document.getElementById(`${frameWork.settings.prefix}-${subcom}`);

		if(modal) {

			// buttons
				// resize
					const currentWidth = modal
						.querySelector(`.${subcom}-popup`).clientWidth;
						
					const resizeBtn = modal
						.querySelectorAll(`*[data-toggle="${subcom}-resize"]`);

					if(resizeBtn && currentWidth < parseInt(args.width)){
						resizeBtn.forEach((butt) => {
							butt.classList.add('disabled');
						});
					}else{
						resizeBtn.forEach((butt) => {
							butt.classList.remove('disabled');
						});
					}
		}
	}
	__f.fns_on_resize.push(frameWork.checkOnModal);

	frameWork.resizeModal = (subcom,width,modal,args) => {
		subcom = subcom || 'modal';
		modal = modal ||  document.getElementById(`${frameWork.settings.prefix}-${subcom}`);
		args = args || frameWork[subcom].args || {};
		width = width || args.width || null;

		if(modal && parseInt(width) >= parseInt(args.width)){
			//all
			if(modal.querySelector(`.${subcom}-popup`)){
				modal.
					querySelector(`.${subcom}-popup`)
						.style.width = width;
			}

			//bboard
			if(modal.querySelector(`.${subcom}-button-wrapper`)){
				modal.
					querySelector(`.${subcom}-button-wrapper`)
						.style.width = width;
			}
		}
	}

	frameWork.destroyModal = (removeHash, subcom) => {
		removeHash = removeHash || false;
		subcom = subcom || 'modal';


		let canRemoveHash = false;

		if (
			removeHash
			&& frameWork[subcom].current.hasAttribute('id')
			&& frameWork[subcom].current.getAttribute('id') == window.location.hash.replace('#','')
		) {
			canRemoveHash = true;
		}

		const modal = document.querySelector(`.${subcom}-wrapper`);
		if (modal) {
			frameWork.moveContents(
				modal.querySelector(`.${subcom}-popup-content`),
				frameWork[subcom].current
			);

			modal.classList.remove('active');
			modal.parentNode.removeChild(modal);
		}

		frameWork[subcom].current = false;
		frameWork[subcom].args = false;


		const validSubcoms = ['modal','board']; 
		let removeBodClass = true;
		validSubcoms.forEach((sc)=> {
			if(
				document.getElementById(`${frameWork.settings.prefix}-${sc}`)
				&& removeBodClass == true
			){
				removeBodClass = false;
			}
		})

		removeBodClass && document.body.classList.remove('body-no-scroll');
	
		canRemoveHash && __f.changeHash('');
	};

	frameWork.createBoard = (triggerer) => {
		frameWork.createModal(triggerer, 'board');
	};
	
	frameWork.resizeBoard = (width,modal,args) => {
		frameWork.resizeModal('board',width,modal,args);
	};
	
	frameWork.checkOnBoard = () => {
		frameWork.checkOnModal('board');
	};
	__f.fns_on_resize.push(frameWork.checkOnBoard);

	frameWork.destroyBoard = (removeHash) => {
		frameWork.destroyModal(removeHash, 'board');
	};

	frameWork.closeDropdowns = (currentDropdown) => {
		currentDropdown = currentDropdown || false;

		if (currentDropdown) {
			document.querySelectorAll('.dropdown').forEach((dropdown) => {
				// frameWork.slideUp( dropdown );

				if (
					dropdown !== currentDropdown
					&& !dropdown.contains(currentDropdown)
				) {
					dropdown.classList.remove('open');
				}
			});
		} else {
			document.querySelectorAll('.dropdown').forEach((dropdown) => {
				dropdown.classList.remove('open');
			});
		}
	};

	frameWork.setDropdown = (selector, triggerer, mode) => {
		selector = selector || false;
		mode = mode || 'toggle';

		if (selector) {
			const width =
				selector.getAttribute('data-dropdown-width')
				|| triggerer.getAttribute('data-dropdown-width')
				|| null;
			
			const maxHeight =
				selector.getAttribute('data-dropdown-max-height')
				|| triggerer.getAttribute('data-dropdown-max-height')
				|| null;

			if (width) {
				selector.style.width = width;
			}

			if (maxHeight) {
				selector.style.maxHeight = maxHeight;
			}

			if (mode == 'toggle' || mode == 'open') {
				document
					.querySelectorAll('*[data-toggle="dropdown"]')
					.forEach((toggler) => {
						toggler.classList.remove('open');
					});

				frameWork.closeDropdowns(selector);
			}

			if (
				(
					selector.classList.contains('open')
					&& mode == 'toggle'
				)
				|| mode == 'close'
			) {
				selector.classList.remove('open');
				
			} else if (
				(
					!selector.classList.contains('open')
					&& mode == 'toggle'
				)
				|| mode == 'open'
			) {
				selector.classList.add('open');
			}
		}
	};

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

	frameWork.toggleAccordion = (triggerer, changeHash) => {
		changeHash = changeHash != false;

		const selector = __f.getTheToggled(triggerer, 'accordion');

		if (selector) {
			let accClassAns = selector.parentNode.closest('.accordion,.accordion-group');


			//has to actually be accordion-group closest before accordion
			if(
				!accClassAns
				|| (
					accClassAns
					&& !accClassAns.classList.contains('accordion-group')
				)
			) {
				accClassAns = false;
			}


			if (
				accClassAns
				&& !accClassAns.matches('.accordion-group-multiple')
			) {


				__f.funFnForTrueChildren(
					accClassAns,'[data-toggle="accordion"],.accordion',
					'.accordion-group',
					(accBbies)=>{
						if(
							(
								triggerer
								&& (accBbies !== triggerer)
								&& (accBbies !== selector)
							)
							|| (
								!triggerer
								&& (accBbies !== selector)
							)
						){
							accBbies.classList.remove('open')
						}
					}
				);
			}

			//only work on accordion-mobile on mobile breakpoints or accordion bois on everiything watwat?? english is confusing
			if (
				!(
					selector.classList.contains('accordion-mobile')
					&& !frameWork.validateBr(__f.br_mobile_max, 'below')
				)
			) {
				if (triggerer) {
					const arr = {
						changeHash:
							(triggerer && triggerer.getAttribute('data-accordion-change-hash'))
							|| selector.getAttribute('data-accordion-change-hash'),
					};

					const defaults = {
						changeHash: changeHash,
					};

					const args = __f.parseArgs(arr, defaults);

					if (
						selector.classList.contains('open')
						&& triggerer.classList.contains('open')
					) {
						if (
							!accClassAns
							|| (
								accClassAns
								&& !accClassAns.classList.contains('accordion-group-no-close')
							)
						) {
							// frameWork.slideUp(selector);
							triggerer.classList.remove('open');
							selector.classList.remove('open');

							if (args.changeHash && selector.hasAttribute('id')) {
								__f.changeHash('');
							}
						}
					} else {

						// frameWork.slideDown(selector);
						triggerer.classList.add('open');
						selector.classList.add('open');

						if (args.changeHash && selector.hasAttribute('id')) {
							__f.changeHash(selector.getAttribute('id'));
						}
					}
				} else {

					const probablyToggle = document.querySelectorAll(
						`[data-toggle="accordion"][href="#${selector.getAttribute('id')}"],
						[data-toggle="accordion"][data-href="#${selector.getAttribute('id')}"]`
					);

					selector.classList.add('open');
					probablyToggle.forEach((toggle) => {
						toggle.classList.add('open');
					});

					window.scrollTo({
						top:
							selector.getBoundingClientRect().top +
							window.pageYOffset,
						left:
							selector.getBoundingClientRect().top +
							window.pageXOffset,
						behavior: 'smooth',
					});
				}
			}
		}
	};

	frameWork.readyGrid = () => {
		const grids = document.querySelectorAll('.module-grid:not(.module-grid-custom)');
		grids.forEach((grid) => {
			frameWork.initGrid(grid);
		});
	};
	__f.fns_on_rightAway.push(frameWork.readyGrid);
	__f.fns_on_resize.push(frameWork.readyGrid);

	frameWork.readyCalendar = () => {
		const calendars = document.querySelectorAll('.input-calendar');

		calendars.forEach((calendar) => {
			frameWork.updateCalendar(calendar);
		});
	};
	__f.fns_on_rightAway.push(frameWork.readyCalendar);

	frameWork.readyTags = () => {
		const inputTags = document.querySelectorAll('.input-tags');

		inputTags.forEach((input) => {
			frameWork.updateTags(input);
		});
	};
	__f.fns_on_load.push(frameWork.readyTags);
	__f.fns_on_resize.push(frameWork.readyTags);

	// //will run. right away. boi
	__f.fns_on_rightAway.forEach((fn) => {
		fn();
	});

	window.addEventListener('hashchange', () => {
		frameWork.settings.initializeModal && frameWork.createModal();
		frameWork.settings.initializeModal && frameWork.createBoard();
		frameWork.settings.initializeAccordion && frameWork.toggleAccordion();
	});

	frameWork.docReady(() => {
		__f.fns_on_ready.forEach((fn) => {
			fn();
		});

		document.body.addEventListener(
			'keydown',
			(e) => {
				switch (e.keyCode) {
					//shift
					case 16:
						__f.modifierKeys.shift = true;
						break;
					// control
					case 17:
						__f.modifierKeys.ctrl = true;
						break;
					//op/alt
					case 18:
						__f.modifierKeys.alt = true;
						break;
					//meta
					case 91:
						__f.modifierKeys.meta = true;
						break;
				}
			}
		);

		document.body.addEventListener(
			'keyup',
			(e) => {
				setTimeout(() => {
					switch (e.keyCode) {
						//shift
						case 16:
							__f.modifierKeys.shift = false;
							break;
						// control
						case 17:
							__f.modifierKeys.ctrl = false;
							break;
						//op/alt
						case 18:
							__f.modifierKeys.alt = false;
							break;
						//meta
						case 91:
							__f.modifierKeys.meta = false;
							break;
					}
				}, 100);
			}
		);

		frameWork.addEvent(
			document.body,
			'change',
			'.input-calendar',
			(e) => {
				const triggerer = e.target;
				frameWork.updateCalendar(triggerer);
			}
		);

		frameWork.addEvent(
			document.body,
			'click', 
			'a.input-calendar-ui-date',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					const inputCalendar = triggerer
						.closest('.input-calendar-ui')
						.querySelector('.input-calendar');

					if (inputCalendar) {
						frameWork.updateCalendar(
							inputCalendar,
							e.target.getAttribute('data-value'),
							null
						);
					}
				}
			}
		);

		frameWork.addEvent(
			document.body,
			'click',
			'a.input-calendar-ui-navigation, .input-calendar-ui-month',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					const inputCalendar = triggerer
						.closest('.input-calendar-ui')
						.querySelector('.input-calendar');

					if (inputCalendar) {
						frameWork.updateCalendar(
							inputCalendar,
							null,
							e.target.getAttribute('data-value')
						);
					}
				}
			}
		);

		frameWork.addEvent(
			document.body,
			'keyup',
			'.input-calendar-ui-input input',
			(e) => {
				const triggerer = e.target;

				if (frameWork.isDisabled(triggerer)) {
					e.preventDefault();

				} else {
					const inputCalendar = e.target
						.closest('.input-calendar-ui')
						.querySelector('.input.input-calendar');

					const v = e.target.value;
					if (v.match(/^\d{2}$/) !== null) {
						e.target.value = `${v}/`;
					} else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
						e.target.value = `${v}/`;
					}

					const pattern = new RegExp(
						__f.datetimeFormatPresets.HumanDate.pattern
					);

					const isValid = pattern.test(v);

					if (isValid) {
						const theValue = v.split('/');

						const y = theValue[2] || '';
						const m = theValue[0] || '';
						const d = theValue[1] || '';

						const preParsedVal = `${y}-${m}-${d}`;

						frameWork.updateCalendar(
							inputCalendar,
							preParsedVal
						);
					}
				}
			}
		);

		frameWork.addEvent(
			document.body,
			'change',
			'.input-tags',
			(e) => {
				const triggerer = e.target;
				frameWork.updateTags(triggerer);
			}
		);

		frameWork.addEvent(
			document.body,
			'paste',
			'.input-tags-ui .input-tags-ui-input',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					const pasted =
						e.clipboardData
						|| window.clipboardData
						|| e.originalEvent.clipboardData;

					triggerer.innerHTML += pasted.getData('text');

					triggerer.blur();
				}
			}
		);


		frameWork.addEvent(
			document.body,
			'click',
			'.input-tags-ui .input-tags-ui-input',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					setTimeout(function() {
						triggerer.focus();
					}, 0);
				}
			}
		);

		//blur bitch blurr
		frameWork.addEvent(
			document.body,
			'blur',
			'.input-tags-ui .input-tags-ui-input',
			(e) => {

				const triggerer = e.target;

				if (!frameWork.isDisabled(triggerer)) {
					const inputTags = triggerer
							.closest('.input-tags-ui')
							.querySelector('.input-tags'),
						inputUiIndex = triggerer.getAttribute('data-value'),
						currValue = __f.tagsToParse(inputTags.value);

					if(triggerer.innerText && triggerer.innerText != ''){
						currValue.splice(
							parseInt(inputUiIndex),
							0,
							triggerer.innerText.replace(',', '')
						);
					}

					triggerer.innerText = '';

					// const newValue = __f.arrMoveItem(currValue,parseInt(inputUiIndex), currValue.length -1);

					frameWork.updateTags(
						inputTags,
						true,
						__f.tagsToVal(currValue)
					);
				}
			}
		);

		//key events on focus bitch
		frameWork.addEvent(
			document.body,
			'keydown',
			'.input-tags-ui .input-tags-ui-input',
			(e) => {
				const triggerer = e.target;

				if (frameWork.isDisabled(triggerer)) {
					e.preventDefault();

				} else {
					const inputTags = triggerer
							.closest('.input-tags-ui')
							.querySelector('.input-tags'),
						inputUiIndex = triggerer.getAttribute('data-value'),
						currValue = __f.tagsToParse(
							inputTags.getAttribute('data-value-ui')
						);

					let newValue,
						allowFilter = false;

					inputTags.innerText = inputTags.innerText.replace(
						/\n|\r/g,
						'\\n'
					);

					switch (e.keyCode) {
						//enter
						case 13:
							e.preventDefault();
							break;

						//comma
						case 188:
							if (!__f.modifierIsActive()) {
								allowFilter = true;
								e.preventDefault();
								currValue.splice(
									parseInt(inputUiIndex),
									0,
									triggerer.innerText.replace((',', ''))
								);

								triggerer.innerText = '';
							}
							// currValue.splice()
							break;

						//left
						case 37:
							if (!triggerer.textContent) {
								e.preventDefault();
								__f.arrMoveItem(
									currValue,
									parseInt(inputUiIndex),
									parseInt(inputUiIndex) - 1 >= 0
										? parseInt(inputUiIndex) - 1
										: 0
								);
							}

							break;

						//right
						case 39:
							if (!triggerer.textContent) {
								e.preventDefault();
								__f.arrMoveItem(
									currValue,
									parseInt(inputUiIndex),
									parseInt(inputUiIndex) + 1 <= currValue.length - 1
										? parseInt(inputUiIndex) + 1
										: currValue.length - 1
								);
							}
							break;

						//backspace
						case 8:
							if (!triggerer.textContent) {
								e.preventDefault();
								allowFilter = true;
								currValue.splice(
									parseInt(inputUiIndex) - 1,
									1
								);
							}
							break;

						//delete
						case 46:
							if (!triggerer.textContent) {
								e.preventDefault();
								allowFilter = true;
								currValue.splice(
									parseInt(inputUiIndex) + 1,
									1
								);
							}
							break;
					}

					newValue = __f.tagsToVal(currValue);

					frameWork.updateTags(
						inputTags,
						allowFilter,
						newValue
					);
				}
			}
		);

		//on click on the text, edit it via input and input should be focused and in place of the tag

		frameWork.addEvent(
			document.body,
			'click',
			'.input-tags-ui .input-tags-ui-tag-close',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				const inputTags = triggerer
					.closest('.input-tags-ui')
					.querySelector('.input-tags');

				if (!frameWork.isDisabled(triggerer)) {
					const tagToRemove = triggerer.getAttribute(
							'data-value'
						),
						currValue = __f.tagsToParse(
							inputTags.getAttribute('data-value-ui')
						);
					currValue.splice(parseInt(tagToRemove), 1);

					const newValue = __f.tagsToVal(currValue);

					frameWork.updateTags(
						inputTags,
						true,
						newValue
					);
				}
			}
		);

		frameWork.addEvent(
			document.body,
			'click',
			'.input-tags-ui .input-tags-ui-tag-text',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					const tagText = triggerer.innerText,
						inputTags = triggerer
							.closest('.input-tags-ui')
							.querySelector('.input-tags'),
						tagToEdit = triggerer.getAttribute('data-value'),
						currValue = __f.tagsToParse(
							inputTags.getAttribute('data-value-ui'),
							false
						);
					currValue.splice(
						parseInt(tagToEdit),
						1,
						__f.tagsInputString
					);

					const uiValue = __f.tagsToVal(currValue);

					frameWork.updateTags(
						inputTags,
						false,
						null,
						uiValue,
						tagText
					);
				}
			}
		);

		frameWork.addEvent(
			document.body,
			'click',
			'*[data-toggle="accordion"]',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();
				if (!frameWork.isDisabled(triggerer)) {
					frameWork.toggleAccordion(
						triggerer,
						true
					);
				}
			}
		);

		frameWork.addEvent(
			document.body,
			'click',
			'*[data-toggle="alert-close"]',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					const selector = __f.getTheToggled(triggerer,'alert-close');

					if (selector) {
						selector.parentNode.removeChild(selector);
					}
				}
			}
		);

		frameWork.addEvent(
			document.body,
			'click',
			'*[data-toggle="alert-close-all"]',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					const selector = document.querySelectorAll('.alert');

					if (selector.length) {
						selector.forEach((alert) => {
							if (
								alert.querySelectorAll('[data-toggle="alert-close"]').length
							) {
								alert.parentNode.removeChild(alert);
							}
						});
					}
				}
			}
		);

		frameWork.addEvent(
			document.body,
			'focus',
			`input[data-toggle="dropdown"], *[contenteditable][data-toggle="dropdown"], .${frameWork.settings.uiJsClass} [contenteditable]`,
			(e) => {
				const uiTrigger = e.target;

				if (frameWork.isDisabled(uiTrigger)) {
					uiTrigger.blur();

				} else {
					const triggerer = __f.getTheUiTriggerer(uiTrigger);
					const selector = __f.getTheToggled(
						triggerer,
						'dropdown'
					);

					if (selector) {
						frameWork.setDropdown(
							selector,
							triggerer,
							'open'
						);
					}

					triggerer.classList.add('focus');
				}
			}
		);

		frameWork.addEvent(
			document.body,
			'blur',
			`input[data-toggle="dropdown"], *[contenteditable][data-toggle="dropdown"], .${frameWork.settings.uiJsClass} [contenteditable]`,
			(e) => {
				const uiTrigger = e.target;

				if (!frameWork.isDisabled(uiTrigger)) {
					const triggerer = __f.getTheUiTriggerer(uiTrigger);

					const selector = __f.getTheToggled(triggerer,'dropdown');

					setTimeout(() => {
						if (selector) {
							frameWork.setDropdown(
								selector,
								triggerer,
								'close'
							);
						}
					}, 200);
					triggerer.classList.remove('focus');
				}
			}
		);

		frameWork.addEvent(
			document.body,
			'click',
			`*[data-toggle="dropdown"]:not(input):not([contenteditable]):not(.${frameWork.settings.uiJsClass})`,
			(e) => {
				const uiTrigger = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(uiTrigger)) {
					const triggerer = __f.getTheUiTriggerer(uiTrigger),
						selector = __f.getTheToggled(triggerer, 'dropdown');

					if (selector) {
						const selectorAncestor = selector.closest('li, .nav-item');

						frameWork.setDropdown(
							selector,
							triggerer
						);

						if (selector.classList.contains('open')) {
							selectorAncestor
								&& selectorAncestor.classList.remove('open');
							// frameWork.slideUp(selector);
							triggerer.classList.remove('open');

						} else {
							if (selectorAncestor) {
								const selectorUncles = frameWork
									.getSiblings(selectorAncestor)
									.filter((sibling) => {
										return sibling.matches(
											'li, .nav-item'
										);
									});
								selectorUncles.forEach((sibling) => {
									sibling.classList.remove('open');
								});
							}

							// frameWork.slideDown(selector);
							triggerer.classList.add('open');
						}
					}
				}
			}
		);

		frameWork.addEvent(
			document.body,
			'click',
			'.tab, .tab > *',
			(e) => {
				const triggerer = e.target;

				if (frameWork.isDisabled(triggerer)) {
					e.preventDefault();

				} else {
					const theTab = triggerer.closest('.tab');

					if (theTab) {
						if (!theTab.classList.contains('active')) {
							const triggererSiblings = frameWork.getSiblings(
								theTab
							);
							triggererSiblings
								.filter((sibling) => {
									return (
										sibling.matches('.tab')
										|| sibling.matches('li')
									);
								})
								.forEach((sibling) => {
									sibling.classList.remove('active');
								});

							theTab.classList.add('active');
						}
					}
				}
			}
		);

		// btn group
		frameWork.addEvent(
			document.body,
			'click',
			'.btn-group-toggle > .btn',
			(e) => {

				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					__f.toggleGroup(triggerer, 'btn');
				}
			}
		);

		// btn group
		frameWork.addEvent(
			document.body,
			'click',
			'.list-group-toggle .list-group-item, .list-group-toggle li',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					__f.toggleGroup(
						triggerer,
						'list',
						'li, .list-group-item',
						null,
						'list-group-toggle-allow-no-active'
					);
				}
			}
		);

		//tooltip
		frameWork.addEvent(
			document.body,
			'click',
			'*[data-toggle="tooltip-click"]',
			(e) => {

				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					frameWork.createToolTip(triggerer);
				}
			}
		);

		frameWork.addEvent(
			document.body,
			'mouseenter',
			'*[data-toggle="tooltip-hover"]',
			(e) => {

				const triggerer = e.target;

				if (frameWork.isDisabled(triggerer)) {
					e.preventDefault();

				} else {
					frameWork.createToolTip(triggerer);
				}
			}
		);

		frameWork.addEvent(
			document.body,
			'mouseleave',
			'*[data-toggle="tooltip-hover"]',
			(e) => {
				frameWork.destroyToolTip();
			}
		);

		frameWork.addEvent(
			document.body,
			'click',
			'*[data-toggle="modal-open"], *[data-toggle="modal"]',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					frameWork.createModal(triggerer);
				}
			}
		);

		frameWork.addEvent(
			document.body,
			'click',
			'*[data-toggle="modal-close"]',
			(e) => {

				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					frameWork.destroyModal(true);
				}
			}
		);

		frameWork.addEvent(
			document.body,
			'click',
			'*[data-toggle="board-open"], *[data-toggle="board"]',
			(e) => {

				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					frameWork.createBoard(triggerer);
				}
			}
		);

		frameWork.addEvent(
			document.body,
			'click',
			'*[data-toggle="board-close"]',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					frameWork.destroyBoard(true);
				}
			}
		);

		frameWork.addEvent(
			document.body,
			'click',
			'*[data-toggle="board-resize"]',
			(e) => {
				e.preventDefault();
			}
		);

					
			const startBoardResize = (e)=>{


				document.body.classList.add('body-on-drag');

				const widthBasis = 
					e.clientX
					|| (e.touches && e.touches[0].clientX )
					|| (
						e.originalEvent.touches
						&& e.originalEvent.touches[0].clientX
					);
				let newWidth;

				if(frameWork.board.args.align == 'right'){
					newWidth = widthBasis
				}else if(frameWork.board.args.align == 'left'){
					newWidth = window.innerWidth - widthBasis;
				}
				
				frameWork.resizeModal('board',`${newWidth}px`);
			}

			const removeBoardResize = (e)=>{

				document.body.classList.remove('body-on-drag');
				window.removeEventListener(
					'mousemove',
					startBoardResize
				)
					window.removeEventListener(
						'touchmove',
						startBoardResize
					)
			}

			const initBoardResize = (e) => {
					
				const triggerer = e.target;

				if (
					!frameWork.isDisabled(triggerer)
					&& frameWork.board.current
				) {

					window.addEventListener(
						'mousemove',
						startBoardResize
					);

						window.addEventListener(
							'touchmove',
							startBoardResize
						);

					window.addEventListener(
						'mouseup',
						removeBoardResize
					);

						window.addEventListener(
							'touchend',
							removeBoardResize
						);

				}
					
			};

			frameWork.addEvent(
				document.body,
				'mousedown',
				'*[data-toggle="board-resize"]',
				(e) => {
					e.preventDefault();
					initBoardResize(e);
				}
			);

				frameWork.addEvent(
					document.body,
					'touchstart',
					'*[data-toggle="board-resize"]',
					initBoardResize
				);

		frameWork.addEvent(
			document.body,
			'change',
			'.zone input[type="file"]',
			(e) => {
				const triggerer = e.target;
				const zone = triggerer.closest('.zone');
				const files = triggerer.files;

				const zoneDyText = zone.querySelector('.zone-has-content-text');
				zoneDyText && zoneDyText.parentNode.removeChild(zoneDyText);

				if (triggerer.value && files.length) {
					zone.classList.add('zone-has-content');

					zone.innerHTML += `<div class="zone-has-content-text">
							<span>${files.length} files selected.<br> Click or drag and drop to reselect</span>
						</div>`;

				} else {
					zone.classList.remove('zone-has-content');
				}
			}
		);

		frameWork.addEvent(
			document.body,
			'click',
			'*[data-toggle="asset-close"]',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					const asset = __f.getTheToggled(triggerer, 'asset');
					asset.parentNode.removeChild(asset);
				}
			}
		);

		frameWork.addEvent(
			document.body,
			'click',
			'*',
			(e) => {
				const triggerer = e.target;

				if (frameWork.isDisabled(triggerer)) {
					e.preventDefault();
				} else {
					//tooltip
					if (
						!triggerer.closest('[data-toggle="tooltip-click"]')
						&& !triggerer.closest('[data-toggle="tooltip-hover"]')
						&& !triggerer.closest('.tooltip.tooltip-allow-interaction')
						&& !triggerer.hasAttribute('data-value') //temp fix for ui elements not getting ancestry
					) {
						frameWork.destroyToolTip();
					}
		
					if (
						!triggerer.closest('[data-toggle="dropdown"]')
						&& !triggerer.closest('.dropdown')
						&& !triggerer.hasAttribute('data-value') //temp fix for ui elements not getting ancestry
					) {
						frameWork.closeDropdowns(false);
					}
				}
			}
		);

	});

	window.addEventListener('load', () => {
		__f.fns_on_load.forEach((fn) => {
			fn();
		});

		frameWork.settings.initializeModal && frameWork.createModal();
		frameWork.settings.initializeBoard && frameWork.createBoard();
		frameWork.settings.initializeAccordion && frameWork.toggleAccordion();

		let resizeTimerInternal;
		window.addEventListener('resize', () => {
			clearTimeout(resizeTimerInternal);

			resizeTimerInternal = setTimeout(() => {
				__f.fns_on_resize.forEach((fn) => {
					fn();
				});
			}, 100);
		});


		let scrollTimerInternal;
		window.addEventListener('scroll', () => {
			clearTimeout(scrollTimerInternal);

			scrollTimerInternal = setTimeout(() => {
				__f.fns_on_scroll.forEach((fn) => {
					fn();
				});
			}, 100);
		});

		document.querySelector('body').classList.remove('body-loading');
		document.querySelector('body').classList.add('body-loaded');
	});

	//put boi on global

	window.fw = frameWork;
	window.frameWork = frameWork;
	// window.frameWork.DEBUG = __f;
}(window));
