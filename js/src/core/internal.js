const __f = {};


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
	noActiveClass = noActiveClass || `${prefix}-group-toggle-allow-no-active`;

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

__f.palette = [
	'base',
	'primary',
	'secondary',
	'accent',
	'neutral',
	'error',
	'caution',
	'success',
];

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