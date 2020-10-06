'use strict';
window.jQuery && jQuery.noConflict();
(function ($, window) {
	console.info('Framework plugged script is initiated');

	if (window.fw) {
		throw new Error('fw already exists oh boi');
	}

	//frameWork shit
	const frameWork = window.frameWork || {};

	//internal shit
	const _ = {};

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

	if (!$) {
		throw new Error('jQuery not found bro, what did you do?');
	}

	_.modifierKeys = {
		ctrl: false,
		shift: false,
		alt: false,
		meta: false,
	};

	_.modifierIsActive = (mode) => {
		mode = mode || false;

		if (mode && _.modifierKeys.hasOwnProperty(mode)) {
			return _.modifierKeys[mode];
			
		} else {
			return (
				_.modifierKeys.ctrl
				|| _.modifierKeys.shift
				|| _.modifierKeys.alt
				|| _.modifierKeys.meta
			);
		}
	};

	$.fn.scrollTo = function (elem, direction) {
		direction = direction || 'y';

		const methods =
			direction == 'x'
				? ['scrollLeft', 'left']
				: ['scrollTop', 'top'];

		const scrollResult =
			$(this)[methods[0]]() -
			$(this).offset()[methods[1]] +
			$(elem).offset()[methods[1]];

		$(this)[methods[0]](scrollResult);

		// console.log( scrollResult,'\nscroll parent', $(this)[ methods[0] ](),'\nchild offset', $(elem).offset()[ methods[1] ]   )

		return this;

	};

	_.strGetFileExtension = (str) => {
		str = str || '';
		return str.split('.').pop();
	};

	_.strToCamelCase = (str) => {
		str = str || '';

		return str
			.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
				return index == 0
					? word.toLowerCase()
					: word.toUpperCase();
			})
			.replace(/-|\s/g, '');
	};

	_.arrMoveItem = (arr, oi, ni) => {

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

	_.datetimeFormatPresets = {
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

	_.dayFormatNames = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	_.dayFormatNamesShort = [
		'Sun',
		'Mon',
		'Tue',
		'Wed',
		'Thu',
		'Fri',
		'Sat',
	];

	_.dayFormatNamesShorter = [
		'Su',
		'Mo',
		'Tu',
		'We',
		'Th',
		'Fr',
		'Sa'
	];

	_.monthFormatNames = [
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

	_.monthFormatNamesShort = [
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
	_.dateToParse = (date) => {

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
					_.datetimeFormatPresets.Value.pattern
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
	_.dateToHuman = (date, format) => {
		date = _.dateToParse(date);
		format = format || _.datetimeFormatPresets.HumanDate.template;

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
									_.dayFormatNamesShort,
									_.dayFormatNames
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
									_.monthFormatNamesShort,
									_.monthFormatNames
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
	_.dateToVal = (date) => {
		const d = _.dateToParse(date);

		if (d) {
			return _.dateToHuman(
				d,
				_.datetimeFormatPresets.Value.template
			);
		}
	};

	_.dateGetAdjacent = (date, offsetByMonth, dateOverride) => {
		let d = _.dateToParse(date);

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

	_.reverseArray = (arr) => {
		let newArray = [];
		for (let i = arr.length - 1; i >= 0; i--) {
			newArray.push(arr[i]);
		}
		return newArray;
	};

	_.uiPrefix = (pref, noDash) => {
		noDash = noDash || false;
		return noDash ? `input-${pref}-ui` : `input-${pref}-ui-`;
	};

	_.runFn = (callback) => {
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

	_.parseArgs = (arr, defaults) => {

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

	_.changeHash = (id) => {
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

	_.toggleGroup = (triggerer, prefix, resetterClass, siblingSelector) => {
		prefix = prefix || 'btn';
		resetterClass = resetterClass || `${prefix}-group-toggle-reset`;
		siblingSelector = siblingSelector || `.${prefix}`;

		if(
			triggerer.closest(siblingSelector).length
			&& !triggerer.hasClass(prefix)
		){
			triggerer = triggerer.closest(siblingSelector);
		}

		if (triggerer) {
			// fix the children bullshit shit
			
			triggerer
				.siblings(`.${resetterClass}`)
				.removeClass('active');

			if (
				!triggerer
					.closest(`.${prefix}-group-toggle-multiple`).length
					|| triggerer.hasClass(resetterClass)
			) {
				triggerer
					.siblings(siblingSelector)
					.removeClass('active');
			}

			if (
				(
					triggerer
						.closest(`.${prefix}-group-toggle-multiple`)
							.length
					&& triggerer
						.siblings('.active')
							.length > 0
				)
				|| triggerer
				.closest(`.${prefix}-group-toggle-allow-no-active`)
					.length
					
			) {
				triggerer.toggleClass('active');

			} else {
				triggerer.addClass('active');
			}
		}
	};

	//good for descendants of ui shitsc as long as ui component gets data attribues of element that start is
	_.getTheUiTriggerer = (triggerer) => {
		triggerer = triggerer || false;

		let toReturn;

		if (triggerer) {

			if ( //idk what the fuck this was for but it stays for now
				triggerer
					.closest(`.input-group${frameWork.settings.uiJsClass}`)
						.length
			) {

			} else if ( //calendar fix
				triggerer
					.closest(`.${frameWork.settings.uiJsClass}`)
						.length
				&& !triggerer
					.closest(`.${frameWork.settings.uiJsClass}_internal_toggle`)
					.length
			) {
				toReturn = triggerer
					.closest(`.${frameWork.settings.uiJsClass}`);

			} else {
				toReturn = triggerer;
			}

			return toReturn;
		}
	};

	_.getTheToggled = (triggerer, toggleMode) => {
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
					triggerer.attr('href')
					&& triggerer.attr('href') !== ''
					&& triggerer.attr('href') !== '#'
					&& $(triggerer.attr('href'))
						.hasClass(classToSearch)
				) {
					// console.warn('toggle found by href');
					toReturn = $(triggerer.attr('href'));

				} else if (
					triggerer.attr('data-href')
					&& $(triggerer.attr('data-href'))
						.hasClass(classToSearch)
				) {
					// console.warn('toggle found by data-href');
					toReturn = $(triggerer.attr('data-href'));

				} else if (
					toggleMode
					&& triggerer
						.parent()
						.closest(`[data-toggle="${toggleMode}"]`).length
				) {
					// console.warn('toggle searching closest data-toggle');
					toReturn = _.getTheToggled(
						triggerer.closest(`[data-toggle="${toggleMode}"]`),
						toggleMode
					);

				} else if (
					toggleMode
					&& triggerer.parent('.input-group').length
				) {
					// console.warn('toggle trigger was in input group');
					toReturn = _.getTheToggled(
						triggerer.parent('.input-group'),
						toggleMode
					);
					
				} else if (
					toggleMode
					&& triggerer.parent('.btn-group').length
				) {
					// console.warn('toggle trigger was in btn group');
					toReturn = _.getTheToggled(
						triggerer.parent('.btn-group'),
						toggleMode
					);

				} else if (triggerer.next(selector).first().length) {
					// console.warn('toggle trigger is prev sibling');
					toReturn = triggerer.next(selector).first();

				} else if (triggerer.siblings(selector).first().length) {
					// console.warn('toggle trigger anybody whos a sibling');
					toReturn = triggerer.siblings(selector).first();
				}
			} else {
				if (
					window.location.hash !== ''
					&& $(window.location.hash).length
					&& $(window.location.hash).hasClass(
						classToSearch
					)
				) {
					// console.warn('no trigger but found the hash is a matching toggle');
					toReturn = $(window.location.hash);
				}
			}

			if (!toReturn || !toReturn.length) {
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
							&& triggerer.parent().closest(toggledClass).length
						) {
							
							// console.warn('found ancestor');
							toReturn = triggerer
								.parent()
								.closest(toggledClass);
						}
						break;
				}
			}


			if(toReturn && toReturn.length) {
				return toReturn;
			}

		}
	};

	_.br_vals = {
		xxs: 0,
		xs:
			parseFloat(
				getComputedStyle(
					document.documentElement
				).getPropertyValue('--br-xs')
			)
			|| 600,
		sm:
			parseFloat(
				getComputedStyle(
					document.documentElement
				).getPropertyValue('--br-sm')
			)
			|| 1200,
		md:
			parseFloat(
				getComputedStyle(
					document.documentElement
				).getPropertyValue('--br-md')
			)
			|| 1600,
		lg: 9999999,
	};

	_.br_arr = Object.keys(_.br_vals);
	// _.br_to_loop =  ['xs','sm','md','lg'];

	_.br_mobile_max =
		parseFloat(
			getComputedStyle(
				document.documentElement
			).getPropertyValue('--mobile-br-max')
		)
		|| 'sm';

	_.fns_on_load = [];
	_.fns_on_ready = [];
	_.fns_on_resize = [];
	_.fns_on_scroll = [];
	_.fns_on_rightAway = [];

	frameWork.validateBr = (breakpoint, mode) => {
		mode = mode || 'below'; //below,within,above
		const currIndex = _.br_arr.indexOf(breakpoint);
		switch (mode) {
			case 'below': //max-width
				return (
					document.documentElement.clientWidth
						<= _.br_vals[breakpoint]
				);

			case 'within':
				return (
					document.documentElement.clientWidth
						<=_.br_vals[breakpoint]
					&& document.documentElement.clientWidth
						> _.br_vals[_.br_arr[currIndex - 1]]
				);

			case 'above':
				return currIndex > 0
					? document.documentElement.clientWidth
						> _.br_vals[_.br_arr[currIndex - 1]]
					: document.documentElement.clientWidth
						> _.br_vals[_.br_arr[currIndex]];
		}
	};

	_.palette = [
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
				let propsSet = false,
					propSetBr = false,
					smallestStyledBr = false;

				//check for breakpointz first
				_.reverseArray(_.br_arr).forEach((br) => {
					if (
						modElement.attr(`data-${prop}-${br}`)
						&& !propsSet
					) {
						smallestStyledBr = br;
						if (frameWork.validateBr(br, 'above')) {
							modElement.css(
								prop,
								modElement.attr(`data-${prop}-${br}`)
							);
							propsSet = true;
							propSetBr = true;
						}
					}
				});

				if (
					modElement.attr(`data-${prop}`)
					&& !propsSet
				) {
					//check for all breakpoint
					if (
						!propsSet
						&& !propSetBr
					) {
						modElement.css(
							prop,
							modElement.attr(`data-${prop}`)
						);
						propsSet = true;
					}

				} else {
					if (
						modElement.prop('style')[_.strToCamelCase(prop)] !== null
						&& smallestStyledBr
						&& !frameWork.validateBr(smallestStyledBr, 'above')
					) {
						modElement.css(prop, '');
					}
				}
			});
		};

		renderProps(moduleGrid, availablePropertiesParent);
		moduleGrid.children('.module').each((i, elm) => {
			const child = $(elm);
			renderProps(child, availablePropertiesChildren);
		});
	};

	//range only is pag kwan di sya isa isang date pangmaramihan
	_.dateIsValid = (date, args, rangeOnly) => {
		rangeOnly = rangeOnly || false; //range,spot

		const d = _.dateToParse(date),
			checkAgainst = args.disabledDates.split(',');

		let toReturn = true;

		if (!rangeOnly) {
			//if in disabled dates
			if (checkAgainst.indexOf(_.dateToVal(d)) > -1) {
				// console.warn('value is declared disabled specifically || ',_.dateToVal(d));
				toReturn = false;
			}

			//weekend
			if (
				checkAgainst.indexOf('weekends') > -1
				&& (d.getDay() == 0 || d.getDay() == 6)
			) {
				// console.warn('value was a weekend || ',_.dateToVal(d),_.dateToVal(date));
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
			// console.warn('value was in the past || ',_.dateToVal(date),'\nversus ',_.dateToVal(dateNow));
			toReturn = false;
		}

		if (
			checkAgainst.indexOf('future') > -1
			&& d > dateNow
		) {
			// console.warn('value was in the future || ',_.dateToVal(date),'\nversus ',_.dateToVal(dateNow));
			toReturn = false;
		}

		//if  in range of min or max
		if (
			(
				_.dateToParse(args.max)
				&& _.dateToParse(args.max) < d
			)
			|| (
				_.dateToParse(args.min)
				&& d < _.dateToParse(args.min)
			)
		) {
			// console.warn('value not in max and width || ',_.dateToVal(d));;
			toReturn = false;
		}

		return toReturn;
	};

	_.createCalendarUi = (inputCalendar, valueForUi, args) => {
		
		if (inputCalendar) {
			valueForUi =
				valueForUi
				|| _.dateToVal(inputCalendar.val())
				|| _.dateToVal(new Date());
			const theUi = {};

			theUi.container = inputCalendar
				.closest(`.${_.uiPrefix('calendar', true)}`);
			if (!theUi.container.length) {
				inputCalendar.wrap($(`<div
					class="
						${frameWork.settings.uiClass}
						${frameWork.settings.uiJsClass}
						${inputCalendar.attr('class')
							.replace('input-calendar', _.uiPrefix('calendar', true))
						}"
					>
					</div>`));
				theUi.container = inputCalendar
					.closest(`.${_.uiPrefix('calendar', true)}`);
			}

			//idk it never exists on initial so we dont have to do weird div wraping catches here
			theUi.input = theUi.container
				.children(`.${_.uiPrefix('calendar')}input`);

			inputCalendar.siblings().not(theUi.input).remove();

			//input
			if (args.textInput) {
				if (!theUi.input.length) {
					theUi.input = $(`<div class="${_.uiPrefix(
								'calendar'
							)}input"><input class="input input-single-line" type="text" maxlength="10"  placeholder="MM/DD/YYYY" />
						</div>`);
					theUi.container.append(theUi.input);
				}
			}

			if (frameWork.isDisabled(inputCalendar)) {
				theUi.input.addClass('disabled');
			}

			const currYear = _.dateToParse(valueForUi).getFullYear(),
				currMonth = _.dateToParse(valueForUi).getMonth(),
				currentCalendarDate = new Date(currYear, currMonth, 1); //IT ALSO FIRST DAY MOTHERFUCKER

			//heading
			theUi.heading = $(`<div class="${_.uiPrefix('calendar')}heading"></div>`);
			theUi.container.append(theUi.heading);

			//arrowz
			const generateArrow = (buttonClass) => {
				let symbolClass, arrowDate, validness;
				//set a new date with no date because fuck that boi
				// console.warn(buttonClass,'hello i fucked up','\n',_.dateToParse(valueForUi),'\n',currentCalendarDate,'\n', new Date(currYear,currMonth));
				switch (buttonClass) {
					case 'prev-month':
						symbolClass = 'symbol-arrow-left';
						arrowDate = _.dateToVal(
							_.dateGetAdjacent(currentCalendarDate, -1)
						);
						validness = _.dateIsValid(
							new Date(currYear, currMonth, 0),
							args,
							true
						);
						break;

					case 'prev-year':
						symbolClass = 'symbol-arrow-double-left';
						arrowDate = _.dateToVal(
							_.dateGetAdjacent(currentCalendarDate, -12)
						);
						validness = _.dateIsValid(
							new Date(currYear - 1, currMonth, 0),
							args,
							true
						);
						break;

					case 'next-month':
						symbolClass = 'symbol-arrow-right';
						arrowDate = _.dateToVal(
							_.dateGetAdjacent(currentCalendarDate, 1)
						);
						validness = _.dateIsValid(
							new Date(currYear, currMonth + 1, 1),
							args,
							true
						);
						break;
						
					case 'next-year':
						symbolClass = 'symbol-arrow-double-right';
						arrowDate = _.dateToVal(
							_.dateGetAdjacent(currentCalendarDate, 12)
						);
						validness = _.dateIsValid(
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
						${_.uiPrefix('calendar')}navigation
						${_.uiPrefix('calendar')}button
						${_.uiPrefix('calendar')}${buttonClass}" data-value="${arrowDate}"
					>
						<i class="${_.uiPrefix('calendar')}symbol symbol ${symbolClass}"></i>
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
					theUi.heading.append(generateArrow(butt));
				}
			});

			//title
			theUi.title = $(`<div
				data-toggle="dropdown"
				class="
					${_.uiPrefix('calendar')}title
					${_.uiPrefix('calendar')}dropdown-toggle
					${frameWork.settings.uiJsClass}_internal_toggle"
			></div>`);
			theUi.heading.append(theUi.title);
			theUi.title.append(() => {
				return `<span
						class="${_.uiPrefix('calendar')}month-text">
						${_.monthFormatNamesShort[currMonth]}
					</span>
					<span class="${_.uiPrefix('calendar')}year-text">
						${currYear}
					</span>
					<i class="${_.uiPrefix('calendar')}symbol symbol symbol-caret-down no-margin-x"></i>`;
			});

			//dropdown
			theUi.dropdown = $(`<ul
				data-dropdown-width="100%"
				class="${_.uiPrefix('calendar')}dropdown
				dropdown
				dropdown-center-x
				dropdown-top-flush
				text-align-center"
			></ul>`);
			// theUi.dropdown.
			theUi.heading.append(theUi.dropdown);
			theUi.dropdown.append(() => {
				return `<li
						class="${_.uiPrefix('calendar')}current-month-year active"
					>
							<a href="#"
								class="${_.uiPrefix('calendar')}month"
								data-value="${_.dateToVal(currentCalendarDate)}"
							>
								${_.monthFormatNamesShort[currMonth]} ${currYear}
							</a>
					</li>
					<li><hr class="dropdown-separator"></li>`;
				});

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
			theUi.dropList = [];
			for (let i = dropdownInit; i <= dropdownLimit; i++) {
				const listItemDate = _.dateGetAdjacent(
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

				if (_.dateIsValid(dateForValidation, args, true)) {
					let currClass = i == 0 ? 'active' : '';

					theUi.dropdown.append(() => {
						return `<li class="${currClass}">
							<a href="#"
								class="${_.uiPrefix('calendar')}month"
								data-value="${_.dateToVal(listItemDate)}">
									${
										_.monthFormatNamesShort[
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
				});
				}
			}

			//generate grid
			theUi.grid = $(
				`<div class="${_.uiPrefix('calendar')}grid"></div>`
			);
			theUi.container.append(theUi.grid);

			const generateBlock = (date, customClass) => {
				customClass = customClass || '';
				return `<a href="#" data-value="${_.dateToVal(date)}"
						class="
						${_.uiPrefix('calendar')}block 
						${_.uiPrefix('calendar')}date
						${customClass}
					">
						<span>${date.getDate()}</span>
					</a>`;
			};

			//days heading
			theUi.days = $(
				`<div class="${_.uiPrefix('calendar')}days"></div>`
			);

			theUi.grid.append(theUi.days);

			let daysHTML = '',
				dayToRetrieve = parseInt(args.startDay);

			for (let i = 0; i < 7; i++) {
				if (dayToRetrieve > 6) {
					dayToRetrieve -= 7;
				}

				daysHTML += `<div
						class="${_.uiPrefix('calendar')}block
						${_.uiPrefix('calendar')}day"
					>
						${_.dayFormatNamesShorter[dayToRetrieve]}
					</div>`;

				dayToRetrieve++;
			}

			theUi.days.html(daysHTML);

			//days
			theUi.dates = $(
				`<div class="${_.uiPrefix('calendar')}dates"></div>`
			);
			theUi.grid.append(theUi.dates);

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
						`${_.uiPrefix('calendar')}block-adjacent
						${(!_.dateIsValid(loopDatePrev, args)
							? 'disabled'
							: '')
						}`
					);

					//prepend because we loopped this bitch in reverse
					theUi.dates.prepend(dateBlockPrev);
				}
			}

			//curr month
			const currLastDate = new Date(currYear, currMonth + 1, 0);

			for (let i = 1; i <= currLastDate.getDate(); i++) {
				let dateBlockCurr = generateBlock(
					new Date(currYear, currMonth, i),
					!_.dateIsValid(new Date(currYear, currMonth, i), args)
						? 'disabled'
						: ''
				);

				theUi.dates.append(dateBlockCurr);
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
						_.uiPrefix('calendar') +
							'block-adjacent ' +
							(!_.dateIsValid(loopDateNext, args)
								? 'disabled'
								: '')
					);

					theUi.dates.append(dateBlockNext);
				}
			}
		}
	};

	//updates both input field and UI
	frameWork.updateCalendar = (inputCalendar, newValue, valueForUi) => {

		const theValue = newValue || _.dateToVal(inputCalendar.val());

		valueForUi = valueForUi || theValue || _.dateToVal(new Date());
		// ignoreInput = ignoreInput || false;

		const arr = {
			class:
				inputCalendar.attr('class'),
			startDay:
				inputCalendar.attr('data-calendar-start-day'), // 0,1,2,3,4,5,6
			min:
				inputCalendar.attr('data-calendar-min')
		|| inputCalendar.attr('min'),
			max:
				inputCalendar.attr('data-calendar-max')
		|| inputCalendar.attr('max'),
			dropdownYearSpan:
				inputCalendar.attr('data-calendar-dropdown-year-span'),
			disabledDates:
				inputCalendar.attr('data-calendar-disabled-dates'),
			textInput:
				inputCalendar.attr('data-calendar-text-input'),
			monthSkip:
				inputCalendar.attr('data-calendar-month-skip'),
			yearSkip:
				inputCalendar.attr('data-calendar-year-skip'),
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

		const args = _.parseArgs(arr, defaults);

		if (parseInt(arr.dropdownYearSpan) <= 0) {
			args.dropdownYearSpan = defaults.dropdownYearSpan;
		}

		args.startDay = parseInt(args.startDay) % 7;

		//set up calendar
		if (_.dateIsValid(theValue, args) || !theValue) {
			_.createCalendarUi(
				inputCalendar,
				valueForUi,
				args
			);
		}

		if (_.dateIsValid(theValue, args)) {
			inputCalendar
				.closest(`.${frameWork.settings.uiClass}`)
				.removeClass('input-error');
		} else {
			inputCalendar
				.closest(`.${frameWork.settings.uiClass}`)
				.addClass('input-error');
		}

		if (theValue) {
			//update the actual butt
			inputCalendar.attr('value', theValue);
			inputCalendar.val(theValue);

			inputCalendar
				.parent()
				.find(`.${_.uiPrefix('calendar')}date`)
				.removeClass('active');
			inputCalendar
				.parent()
				.find(
					`.${_.uiPrefix('calendar')}date[data-value=${_.dateToVal(theValue)}]`
				)
				.addClass('active');

			// if(!ignoreInput){
			inputCalendar
				.parent()
				.find(`.${_.uiPrefix('calendar')}input input`)
				.attr('value', _.dateToHuman(theValue));
			inputCalendar
				.parent()
				.find(`.${_.uiPrefix('calendar')}input input`)
				.val(_.dateToHuman(theValue));
			// }
		}
	};

	_.tagsInputString = '__fw_input__';

	//because input field is gonna go in between for backspacing capabilities
	_.tagsToParse = (value, returnWithInput) => {
		returnWithInput =
			returnWithInput !== false || returnWithInput == true;

		let toReturn = Array.isArray(value)
			? value
			: value.split(',') || [];

		//check for ya boi
		toReturn.forEach((tag, i) => {
			if (
				(!tag || tag == '')
				|| (tag === _.tagsInputString && !returnWithInput)
			) {
				toReturn.splice(i, 1);
			}
		});

		if (returnWithInput && toReturn.indexOf(_.tagsInputString) < 0) {
			toReturn.push(_.tagsInputString);
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
	_.tagsToVal = (value, returnWithInput) => {
		value = value || '';
		return _.tagsToParse(value, returnWithInput).join(',');
	};

	_.createTagsUi = (inputTags, valueForUi, inputText, args) => {

		if (inputTags) {
			valueForUi = valueForUi || _.tagsToVal(inputTags.val()) || '';
			inputText = inputText || false;

			const theUi = {};

			theUi.container = inputTags.closest(`.${_.uiPrefix('tags', true)}`);

			if (!theUi.container.length) {
				inputTags.wrap($(`<div
					class="
					${frameWork.settings.uiClass}
					${frameWork.settings.uiJsClass}
					${inputTags
						.attr('class').replace('input-tags', _.uiPrefix('tags', true))
					}">
					</div>`));
				theUi.container = inputTags.closest(`.${_.uiPrefix('tags', true)}`);
				theUi.container.addClass('input');
			}

			theUi.container.addClass(
				args.multipleLines
					? `${_.uiPrefix('tags')}multiple`
					: `${_.uiPrefix('tags')}single`
			);

			if (args.width) {
				theUi.container.css('width', args.width);
			}
			//idk it never exists on initial so we dont have to do weird div wraping catches here

			theUi.wrapper = theUi.container.children(`.${_.uiPrefix('tags')}wrapper`);

			if (!theUi.wrapper.length) {
				theUi.container.append(
					`<div class="${_.uiPrefix('tags')}wrapper"></div>`
				);
				theUi.wrapper = theUi.container.children(`.${_.uiPrefix('tags')}wrapper`);
			}

			theUi.input = theUi.wrapper.children(`.${_.uiPrefix('tags')}input`);

			if (!theUi.input.length) {
				theUi.wrapper.append(
					`<span contenteditable="true" class="input ${_.uiPrefix(
						'tags'
					)}input"></span>`
				);
				theUi.input = theUi.wrapper.children(`.${_.uiPrefix('tags')}input`);
			}

			if(inputTags.attr('placeholder')){
				theUi.input.attr(
					'data-placeholder',
					inputTags.attr('placeholder')
				);
			}

			//nearest fw-ui parent will actually do tgoggl for bby because baby cant stand up on its own
			if (inputTags.attr('data-toggle')) {
				theUi.input.attr(
					'data-toggle',
					inputTags.attr('data-toggle')
				);
			}

			if (frameWork.isDisabled(inputTags)) {
				theUi.input.addClass('disabled');
			}

			if (args.callbackOnKeyup) {
				theUi.input.on('keyup', (event)=>{
					const keyUpScript = eval(args.callbackOnKeyup);
					if(keyUpScript) keyUpScript();
				});


			}

			theUi.wrapper.children(`.${_.uiPrefix('tags')}tag`).remove();

			let valArr = _.tagsToParse(valueForUi, true);
			const inputIn = valArr.indexOf(_.tagsInputString);

			theUi.input.attr('data-value', inputIn);

			//validate tags
			valArr = valArr.reduce((acc, tag) => {
				if (!acc.includes(tag)) {
					acc.push(tag);
				}
				return acc;
			}, []);

			valArr.forEach((tag, i) => {
				//get index of input
				if (tag !== _.tagsInputString) {
					const tagHtmlFn = () => {
						return `<span class="${_.uiPrefix('tags')}tag">
							<span
								data-value="${i}"
								class="${_.uiPrefix('tags')}tag-text"
							>
								${tag}
							</span>
							<a data-value="${i}" class="${_.uiPrefix('tags')}tag-close" href="#">
							<i class="symbol symbol-close"></i></a>
						</span>`;
					};

					if (i < inputIn) {
						theUi.input.before(tagHtmlFn);
					} else {
						theUi.wrapper.append(tagHtmlFn);
					}
				}
			});

			//attribues
			for (let i = 0; i < inputTags[0].attributes.length; i++) {
				let attr = inputTags[0].attributes[i];

				if (attr.specified) {
					if (
						attr.name.includes('data')
						&& !attr.name.includes('data-tags')
						&& !attr.name.includes('data-toggle')
						&& !attr.name.includes('data-value-ui')
					) {
						theUi.container.attr(attr.name, attr.value);
					}
				}
			}

			inputTags.attr('data-value-ui', valueForUi);

			//keep that shoit to the right
			theUi.container.scrollTo(theUi.input, 'x');

			//jquery u duuumb
			if (inputText) {
				theUi.input.text(inputText);
				theUi.input.focus();
			}
		}
	};

	frameWork.updateTags = (inputTags, allowFilter, newValue, valueForUi, inputText) => {
		let theValue = newValue || inputTags.val() || '';

		inputText = inputText || false;
		valueForUi = valueForUi || theValue || '';
		allowFilter = allowFilter != false;

		const arr = {
			width:
				inputTags.attr('data-tags-width'),
			callback:
				inputTags.attr('data-tags-callback'),
			callbackOnKeyup:
				inputTags.attr('data-tags-callback-on-keyup'),
			callbackNameFilter:
				inputTags.attr('data-tags-callback-name-filter'),
			multipleLines:
				inputTags.attr('data-tags-multiple-lines'),
		};

		const defaults = {
			width: null,
			callback: null,
			callbackNameFilter: null,
			callbackOnKeyup: null,
			multipleLines: false,
		};

		const args = _.parseArgs(arr, defaults);

		if (inputTags) {
			if (args.callbackNameFilter && allowFilter) {
				let fnToFilter;

				try {
					fnToFilter = eval(args.callbackNameFilter);
				} catch (err) {}

				if (typeof fnToFilter === 'function') {
					const applyFilter = (valueToFilter, filterFnName) => {
						const inputIndex = _.tagsToParse(valueToFilter)
								.indexOf(_.tagsInputString),
							noInputValueToFilter = (() => {
									return _.tagsToVal(valueToFilter, false);
								})();

						// turn to array ya bopi without the input tag string
						let toReturn = _.tagsToParse(
							eval(`${filterFnName}("${noInputValueToFilter}")`),
							false
						);

						// console.log(
						// 	'index of input\n',inputIndex,
						// 	'\n\n\nfiltered and ready for splice\n',toReturn,
						// 	'\n\n\npassed to the fil;ter\n',_.tagsToVal(valueToFilter,false),
						// 	'\n\n\nrar array\n',_.tagsToParse(valueToFilter),
						// 	'\n\n\n no input field\n',noInputValueToFilter,_.tagsToVal(valueToFilter,false),
						// 	'\n\n\n no input fieldas array\n',_.tagsToParse(valueToFilter,false),
						// 	'\n\n\n string for eval\n', ( filterFnName +'("'+ noInputValueToFilter +'")'),
						// 	'\n\n\neval\n',  eval(filterFnName +'("'+ noInputValueToFilter +'")'),
						// 	'whAT ETHE FUCK'
						// );

						if (inputIndex > -1) {
							toReturn.splice(
								inputIndex <
									_.tagsToParse(valueToFilter).length - 1
									? inputIndex
									: toReturn.length,
								0,
								_.tagsInputString
							);
						}

						return _.tagsToVal(toReturn);
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

			_.createTagsUi(
				inputTags,
				_.tagsToVal(valueForUi),
				inputText,
				args
			);

			//update the actual butt
			inputTags.attr('value', _.tagsToVal(theValue, false));
			inputTags.val(_.tagsToVal(theValue, false));

			//ATODO UPDATE SETUP HERE
			//update fake hoes
			if (args.callback) {
				_.runFn(args.callback);
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

		if (elem.closest('[disabled]').length || elem.is(':disabled')) {
			toReturn = true;
		}

		disableClasses.forEach((classString) => {
			if (elem.closest(`.${classString}`).length && !toReturn) {
				toReturn = true;
			}
		});

		return toReturn;
	};
	
	//lazyload
	frameWork.loadImage = (img) => {
			const
				imgSrc = img.attr('data-src'),
				imgSrcset = img.attr('data-srcset');

			if (
				img.is('img')
				|| (
					img.is('source')
					&& img.closest('picture').length
				)
			) {
				if (_.strGetFileExtension(img.attr('data-src')) == 'svg') {
					const imgID = img.attr('id');
					const imgClass = img.attr('class');
					$.get(
						imgSrc,
						(data) => {
							const svg = $(data).find('svg');
							if (typeof imgID !== 'undefined') {
								svg.attr('id', imgID);
							}
							if (typeof imgClass !== 'undefined') {
								svg.attr(
									'class',
									`${imgClass} replaced-svg`
								);
							}
							svg.removeAttr('xmlns:a');
							img.replaceWith(svg);
						},
						'xml'
					);
				} else {
					imgSrc !== 'undefined' && img.attr('src', imgSrc);
					imgSrcset !== 'undefined' && img.attr('srcset', imgSrcset);
				}
			} else {
				img.css('background-image', `url(${imgSrc})`);
			}

			img.addClass('lazy-loaded');
	}

	frameWork.loadImages = (images) => {
		//css images
		// images
		images = images || $('*[data-src]');

		images.each((i, elm) => {
			frameWork.loadImage($(elm));
		});

		//css images
		$('html').addClass('lazy-initialized');
	};

	frameWork.settings.lazyLoad &&
		_.fns_on_rightAway.push(frameWork.loadImages);

	frameWork.createToolTip = (triggerer) => {

		if (triggerer) {
			frameWork.destroyToolTip();
			frameWork.toolTip = {};

			const arr = {
				placement:
					triggerer.attr('data-tooltip-placement'),
				badge:
					triggerer.attr('data-tooltip-badge'),
				badgeBg:
					triggerer.attr('data-tooltip-badge-background'),
				badgeSize:
					triggerer.attr('data-tooltip-badge-size'),
				content:
					triggerer.attr('data-tooltip-content'),
				classes:
					triggerer.attr('data-tooltip-classes'),
				centerX:
					triggerer.attr('data-tooltip-center-x'),
				centerY:
					triggerer.attr('data-tooltip-center-y'),
				x:
					triggerer.attr('data-tooltip-x'),
				y:
					triggerer.attr('data-tooltip-y'),
				width:
					triggerer.attr('data-tooltip-width'),
				allowInteraction:
					triggerer.attr('data-tooltip-allow-interaction'),
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
				width: null,
				allowInteraction: false,
			};

			const args = _.parseArgs(arr, defaults);

			$('body').append(() => {
				let html = `<div
					class="tooltip
						tooltip-${args.placement}
						${args.width ? 'tooltip-has-custom-width' : ''}
						${args.allowInteraction ? `tooltip-allow-interaction` : ''}"
					${args.width ? ` style="width:${args.width};"` : ''}
					>`;

				if (args.badge) {
					html += `<span class="badge tooltip-badge`;
					if (
						args.badgeSize == 'small'
						|| args.badgeSize == 'large'
					) {
						html += ` badge-${args.badgeSize}`;
					}

					if (_.palette.includes(args.badgeBg)) {
						html += ` badge-${args.badgeBg}`;
					} else {
						html += `" style="background-color:${args.badgeBg};`;
					}

					html += `"></span>`;
				}

				html += `<div class="tooltip-content ${args.classes}">${args.content}</div></div>`;

				return html;
			});

			const toolTip = $('body')
				.children('.tooltip:last-child')
				.first();

			frameWork.toolTip.current = toolTip;
			frameWork.toolTip.activeTriggerer = triggerer;
			frameWork.toolTip.args = args;

			toolTip.show();
			toolTip.addClass('active');

			frameWork.positionToolTip();
		}
	};

	frameWork.destroyToolTip = () => {
		if (frameWork.toolTip) {
			if (frameWork.toolTip.current) {
				frameWork.toolTip.current.remove();
			}
		}

		delete frameWork.toolTip;
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
						triggerer.offset().top,
					left:
						triggerer.offset().left,
					height:
						triggerer.outerHeight(),
					width:
						triggerer.outerWidth(),
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
					.getComputedStyle(toolTip[0], ':before')
					.getPropertyValue('width')
			);

			//check if we can sqrt it
			toolPoint = Math.sqrt(toolPoint * toolPoint * 2) * 0.5;
			isNaN(toolPoint) && (toolPoint = 15);

			let toolTipProps = {
				height: toolTip.outerHeight(),
				width: toolTip.outerWidth(),
			};

			const toolTipBadge = toolTip.find('.tooltip-badge').first();

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
						toolTipBadge.length > 0
						&& (
							args.placement == 'left'
							|| args.placement == 'right'
						)
					) {
						badgeOffset =
							args.placement == 'left'
								? toolTipBadge.outerWidth() * -0.5
								: toolTipBadge.outerWidth() * 0.5;
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
						toolTipBadge.length > 0
						&& (
							args.placement == 'top'
							|| args.placement == 'bottom'
						)
					) {
						badgeOffset =
							args.placement == 'top'
								? toolTipBadge.outerHeight() * -0.5
								: toolTipBadge.outerHeight() * 0.5;
					}

					toReturn += badgeOffset;

					return toReturn;
				},
			};

			toolTip.css({
				left: posX + off.x(),
				top: posY + off.y(),
				// 'left': posX,
				// 'top': posY
			});
		}
	};
	_.fns_on_scroll.push(frameWork.positionToolTip);
	_.fns_on_resize.push(frameWork.positionToolTip);

	frameWork.createModal = (triggerer, subcom) => {
		subcom = subcom || 'modal';
		frameWork[subcom] = frameWork[subcom] || {};

		const contentWrap = _.getTheToggled(triggerer, subcom);

		if(contentWrap || !window.location.hash){
			frameWork.destroyModal(null, subcom);
		}

		if (contentWrap && subcom) {

			const arr = {
				resize:
					(triggerer && triggerer.attr(`data-${subcom}-resize`))
					|| contentWrap.attr(`data-${subcom}-resize`),
				changeHash:
					(triggerer && triggerer.attr(`data-${subcom}-change-hash`))
					|| contentWrap.attr(`data-${subcom}-change-hash`),
				header:
					(triggerer && triggerer.attr(`data-${subcom}-title`))
					|| contentWrap.attr(`data-${subcom}-title`),
				close:
					(triggerer && triggerer.attr(`data-${subcom}-close`))
					|| contentWrap.attr(`data-${subcom}-close`),
				disableOverlay:
					(triggerer && triggerer.attr(`data-${subcom}-disable-overlay`))
					|| 	contentWrap.attr(`data-${subcom}-disable-overlay`),
				width:
					(triggerer && triggerer.attr(`data-${subcom}-width`))
					|| contentWrap.attr(`data-${subcom}-width`),
				callback:
					(triggerer && triggerer.attr(`data-${subcom}-callback`))
					|| contentWrap.attr(`data-${subcom}-callback`),
				classes:
					(triggerer && triggerer.attr(`data-${subcom}-classes`))
					|| contentWrap.attr(`data-${subcom}-classes`),
				closeClasses:
					(triggerer && triggerer.attr(`data-${subcom}-close-classes`))
					|| contentWrap.attr(`data-${subcom}-close-classes`),
				align:
					(triggerer && triggerer.attr(`data-${subcom}-align`))
					|| contentWrap.attr(`data-${subcom}-align`),
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

			const args = _.parseArgs(arr, defaults);
			
			const actualId = `${frameWork.settings.prefix}-${subcom}`;


			switch (subcom) {
				case 'modal':
					args.align = false;
					args.resize = false;
					args.resizeClasses = null;
					break;
			}

			const id = contentWrap.attr('id') || actualId;

			id !== `${actualId}` && args.changeHash && _.changeHash(id);

			$('body').append(() => {
				let html = '';

				html += `<div id="${actualId}"
						class="${frameWork.settings.prefix}-modal-component
						${subcom}-wrapper
						${args.classes}
						${args.align ? `${subcom}-${args.align}` : ''}
					">`;

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

				html += `</div>`;

				return html;
			});

			const modal = $('body').children(`.${subcom}-wrapper`).first();

			contentWrap
				.contents()
				.appendTo(
					$('body')
						.children(`.${subcom}-wrapper`)
						.find(`.${subcom}-popup-content`)
						.first()
				);

			if (args.width) {
				frameWork.resizeModal(subcom,args.width,modal,args);
			}

			if (args.callback) {
				_.runFn(args.callback);
			}

			frameWork[subcom].current = contentWrap;
			frameWork[subcom].args = args;

			modal.fadeIn();
			modal.addClass('active');
			$('body').addClass('body-no-scroll');

			frameWork.checkOnModal(subcom);
		}
	};


	frameWork.checkOnModal = (subcom)=>{

		subcom = subcom || 'modal';


		const args = frameWork[subcom].args || {};
		const modal = $(`#${frameWork.settings.prefix}-${subcom}`);

		if(modal.length) {

			// buttons
				// resize
					const currentWidth = modal
						.find(`.${subcom}-popup`)[0].clientWidth;

					const resizeBtn = modal
						.find(`*[data-toggle="${subcom}-resize"]`);

					if(resizeBtn.length && currentWidth < parseInt(args.width)){
						resizeBtn.addClass('disabled');
					}else{
						resizeBtn.removeClass('disabled');
					}
		}
	}
	_.fns_on_resize.push(frameWork.checkOnModal);

	frameWork.resizeModal = (subcom,width,modal,args) => {
		subcom = subcom || 'modal';
		modal = modal || $(`#${frameWork.settings.prefix}-${subcom}`);
		args = args || frameWork[subcom].args || {};
		width = width || args.width || null;

		if(modal.length && parseInt(width) >= parseInt(args.width)){
			//all
			modal
				.find(`.${subcom}-popup`)
				.css('width', width);

			//bboard
			modal
				.find(`.${subcom}-button-wrapper`)
				.css('width', width);
		}
	}

	frameWork.destroyModal = (removeHash, subcom) => {
		removeHash = removeHash || false;
		subcom = subcom || 'modal';

		let canRemoveHash = false;

		if (removeHash
			&& frameWork[subcom].current.attr('id')
			&& frameWork[subcom].current.attr('id') == window.location.hash.replace('#','')
		) {
			canRemoveHash = true;
		}

		$('body')
			.children(`.${subcom}-wrapper`)
			.find(`.${subcom}-popup-content`)
			.first()
			.contents()
			.appendTo(frameWork[subcom].current);

		$('body')
			.children(`.${subcom}-wrapper`)
			.fadeOut()
			.removeClass('active')
			.remove();

		frameWork[subcom].current = false;
		frameWork[subcom].args = false;

		const validSubcoms = ['modal','board']; 
		let removeBodClass = true;

		validSubcoms.forEach((sc)=> {
			if( $(`#${frameWork.settings.prefix}-${sc}`).length && removeBodClass == true ){
				removeBodClass = false;
			}
		})
		removeBodClass && $('body').removeClass('body-no-scroll');
	
		canRemoveHash && _.changeHash('');
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
	_.fns_on_resize.push(frameWork.checkOnBoard);

	frameWork.destroyBoard = (removeHash) => {
		frameWork.destroyModal(removeHash, 'board');
	};

	frameWork.closeDropdowns = (currentDropdown) => {
		currentDropdown = currentDropdown || false;

		if (currentDropdown) {
			$('.dropdown')
				.not(currentDropdown)
				.each((i, dropdown) => {
					if (!currentDropdown.closest($(dropdown)).length) {
						$(dropdown).removeClass('open');
					}
				});
		} else {
			//@TODO. wtf jquery
			$('.dropdown').removeClass('open');
		}
	};

	frameWork.setDropdown = (selector, triggerer, mode) => {
		selector = selector || false;
		mode = mode || 'toggle';

		if (selector) {
			const width =
				selector.attr('data-dropdown-width')
				|| triggerer.attr('data-dropdown-width')
				|| null;

			
			const maxHeight =
				selector.attr('data-dropdown-max-height')
				|| triggerer.attr('data-dropdown-max-height')
				|| null;

			if (width) {
				selector.css('width', width);
			}

			if (maxHeight) {
				selector.css('max-height', maxHeight);
			}

			if (mode == 'toggle' || mode == 'open') {
				$('*[data-toggle="dropdown"]').removeClass('open');

				frameWork.closeDropdowns(selector);
			}

			if (
				(
					selector.hasClass('open')
					&& mode == 'toggle'
				)
				|| mode == 'close'
			) {
				selector.removeClass('open');

			} else if (
				(
					!selector.hasClass('open')
					&& mode == 'toggle'
				)
				|| mode == 'open'
			) {
				selector.addClass('open');
			}
		}
	};

	//for component helpers that can go deep no matter wat but will always be The Children TM... which sounds incestuous oh god why
	_.funFnForTrueChildren = (AncestorOfAllElm,selector,parentSelector,fn) => {

		if(
			AncestorOfAllElm
			&& selector
			&& parentSelector
			&& fn	
		){
			let children = AncestorOfAllElm.find(selector);

			children.each((i, elm) => {
				const child = $(elm);

				if(
					child.closest(parentSelector).length
					&& (AncestorOfAllElm.is(child.closest(parentSelector)))
				){
					fn(child);
				}
			})
		}
	}

	frameWork.toggleAccordion = (triggerer, changeHash) => {
		changeHash = changeHash != false;

		const selector = _.getTheToggled(triggerer, 'accordion');

		if (selector) {
			let accClassAns = selector.parent().closest('.accordion-group,.accordion');

			//has to actually be accordion-group closest before accordion
			if(
				!accClassAns.length
				|| (
					accClassAns.length
					&& !accClassAns.hasClass('accordion-group')
				)
			) {
				accClassAns = false;
			}



			if (
				accClassAns
				&& !accClassAns.is('.accordion-group-multiple')
			) {

				_.funFnForTrueChildren(
					accClassAns,'[data-toggle="accordion"],.accordion',
					'.accordion-group',
					(accBbies)=>{
						accBbies.removeClass('open')
					}
				);
			}
			
			//only work on accordion-mobile on mobile breakpoints or accordion bois on everiything watwat?? english is confusing
			if (
				!(
					selector.hasClass('accordion-mobile')
					&& !frameWork.validateBr(_.br_mobile_max, 'below')
				)
			) {
				if (triggerer) {
					const arr = {
						changeHash:
							(triggerer && triggerer.attr('data-accordion-change-hash'))
							|| selector.attr('data-accordion-change-hash'),
					};

					const defaults = {
						changeHash: changeHash,
					};

					const args = _.parseArgs(arr, defaults);

					if (
						selector.hasClass('open')
						&& triggerer.hasClass('open')
					) {
						if (
							!accClassAns
							|| (
								accClassAns.length
								&& !accClassAns.hasClass('accordion-group-no-close')
							)
						) {
							// selector.slideUp();
							triggerer.removeClass('open');
							selector.removeClass('open');

							if (args.changeHash && selector.attr('id')) {
								_.changeHash('');
							}
						}
					} else {

						// selector.slideDown();
						triggerer.addClass('open');
						selector.addClass('open');

						if (args.changeHash && selector.attr('id')) {
							_.changeHash(selector.attr('id'));
						}
					}
				} else {

					const probablyToggle = $(
						`[data-toggle="accordion"][href="#${selector.attr('id')}"],
						[data-toggle="accordion"][data-href="#${selector.attr('id')}"]`
					);

					// //fallback in case true child shit doesnt find shit
					// probablyToggle
					// 	.siblings('[data-toggle="accordion"]')
					// 	.removeClass('open');
					// probablyToggle
					// 	.closest('.accordion-group')
					// 	.children('[data-toggle="accordion"]')
					// 	.removeClass('open');

					selector.addClass('open');
					probablyToggle.addClass('open');

					$([document.documentElement, document.body])
						.animate(
							{scrollTop: selector.offset().top},
							500
						);
				}
			}
		}
	};

	frameWork.readyGrid = () => {
		$('.module-grid:not(.module-grid-custom)').each((i, grid) => {
			frameWork.initGrid($(grid));
		});
	};
	_.fns_on_rightAway.push(frameWork.readyGrid);
	_.fns_on_resize.push(frameWork.readyGrid);

	frameWork.readyCalendar = () => {
		$('.input-calendar').each((i, calendar) => {
			frameWork.updateCalendar($(calendar));
		});
	};
	_.fns_on_rightAway.push(frameWork.readyCalendar);

	frameWork.readyTags = () => {
		$('.input-tags').each((i, input) => {
			frameWork.updateTags($(input));
		});
	};
	_.fns_on_load.push(frameWork.readyTags);
	_.fns_on_resize.push(frameWork.readyTags);

	// //will run. right away. boi
	_.fns_on_rightAway.forEach((fn) => {
		fn();
	});

	$(window).on('hashchange', () => {
		frameWork.settings.initializeModal && frameWork.createModal();
		frameWork.settings.initializeBoard && frameWork.createBoard();
		frameWork.settings.initializeAccordion && frameWork.toggleAccordion();
	});

	$(document).ready(() => {
		_.fns_on_ready.forEach((fn) => {
			fn();
		});

		//key evenmts
		$('body').on(
			'keydown',
			(e) => {
				switch (e.keyCode) {
					//shift
					case 16:
						_.modifierKeys.shift = true;
						break;
					// control
					case 17:
						_.modifierKeys.ctrl = true;
						break;
					//op/alt
					case 18:
						_.modifierKeys.alt = true;
						break;
					//meta
					case 91:
						_.modifierKeys.meta = true;
						break;
				}
			}
		);

		$('body').on(
			'keyup',
			(e) => {
				setTimeout(() => {
					switch (e.keyCode) {
						//shift
						case 16:
							_.modifierKeys.shift = false;
							break;
						// control
						case 17:
							_.modifierKeys.ctrl = false;
							break;
						//op/alt
						case 18:
							_.modifierKeys.alt = false;
							break;
						//meta
						case 91:
							_.modifierKeys.meta = false;
							break;
					}
				}, 100);
			}
		);

		$('body').on(
			'change',
			'.input-calendar',
			(e) => {
				const triggerer = $(e.target);
				frameWork.updateCalendar(triggerer);
			}
		);

		$('body').on(
			'click',
			'a.input-calendar-ui-date',
			(e) => {

				const triggerer = $(e.target);

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					const inputCalendar = triggerer
						.closest('.input-calendar-ui')
						.find('.input-calendar')
						.first();

					if (inputCalendar.length > -1) {
						frameWork.updateCalendar(
							inputCalendar,
							triggerer.attr('data-value'),
							null
						);
					}
				}
			}
		);

		$('body').on(
			'click',
			'a.input-calendar-ui-navigation, .input-calendar-ui-month',
			(e) => {
				const triggerer = $(e.target);

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					const inputCalendar = triggerer
						.closest('.input-calendar-ui')
						.find('.input-calendar')
						.first();

					if (inputCalendar.length > -1) {
						frameWork.updateCalendar(
							inputCalendar,
							null,
							triggerer.attr('data-value')
						);
					}
				}
			}
		);

		$('body').on(
			'keyup',
			'.input-calendar-ui-input input',
			(e) => {
				const triggerer = $(e.target);

				if (frameWork.isDisabled(triggerer)) {
					e.preventDefault();

				} else {
					const inputCalendar = triggerer
						.closest('.input-calendar-ui')
						.find('.input.input-calendar');

					const v = triggerer.val();
					if (v.match(/^\d{2}$/) !== null) {
						triggerer.val(`${v}/`);
					} else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
						triggerer.val(`${v}/`);
					}

					const pattern = new RegExp(
						_.datetimeFormatPresets.HumanDate.pattern
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

		$('body').on(
			'change',
			'.input-tags',
			(e) => {
				const triggerer = $(e.target);
				frameWork.updateTags(triggerer);
			}
		);

		$('body').on(
			'paste',
			'.input-tags-ui .input-tags-ui-input',
			(e) => {
				const triggerer = $(e.target);

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					const pasted =
						e.clipboardData
						|| window.clipboardData
						|| e.originalEvent.clipboardData;

					triggerer.html(
						triggerer.html() + pasted.getData('text')
					);

					triggerer.blur();
				}
			}
		);

		$('body').on(
			'click',
			'.input-tags-ui .input-tags-ui-input',
			(e) => {
				const triggerer = $(e.target);

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					setTimeout(function() {
						triggerer.focus();
					}, 0);
				}
			}
		);

		//blur bitch blurr
		$('body').on(
			'blur',
			'.input-tags-ui .input-tags-ui-input',
			(e) => {

				const triggerer = $(e.target);

				if (!frameWork.isDisabled(triggerer)) {

					const inputTags = triggerer
							.closest('.input-tags-ui')
							.children('.input-tags'),
						inputUiIndex = triggerer.attr('data-value'),
						currValue = _.tagsToParse(inputTags.val());

					if(triggerer.text() && triggerer.text() != ''){
						currValue.splice(
							parseInt(inputUiIndex),
							0,
							triggerer.text().replace(',', '')
						);
					}

					triggerer.text('');

					// const newValue = _.arrMoveItem(currValue,parseInt(inputUiIndex), currValue.length -1);

					frameWork.updateTags(
						inputTags,
						true,
						_.tagsToVal(currValue)
					);
				}
			}
		);

		//key events on focus bitch
		$('body').on(
			'keydown',
			'.input-tags-ui .input-tags-ui-input',
			(e) => {
				const triggerer = $(e.target);

				if (frameWork.isDisabled(triggerer)) {
					e.preventDefault();

				} else {
					const inputTags = triggerer
							.closest('.input-tags-ui')
							.children('.input-tags'),
						inputUiIndex = triggerer.attr('data-value'),
						currValue = _.tagsToParse(
							inputTags.attr('data-value-ui')
						);

					let newValue,
						allowFilter = false;

					inputTags.text(
						inputTags.text().replace(/\n|\r/g, '\\n')
					);

					switch (e.keyCode) {
						//enter
						case 13:
							e.preventDefault();
							break;

						//comma
						case 188:
							if (!_.modifierIsActive()) {
								allowFilter = true;
								e.preventDefault();
								currValue.splice(
									parseInt(inputUiIndex),
									0,
									triggerer.text().replace(',', '')
								);

								triggerer.text('');
							}
							// currValue.splice()
							break;

						//left
						case 37:
							if (!triggerer.text()) {
								e.preventDefault();
								_.arrMoveItem(
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
							if (!triggerer.text()) {
								e.preventDefault();
								_.arrMoveItem(
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
							if (!triggerer.text()) {
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
							if (!triggerer.text()) {
								e.preventDefault();
								allowFilter = true;
								currValue.splice(
									parseInt(inputUiIndex) + 1,
									1
								);
							}
							break;
					}

					newValue = _.tagsToVal(currValue);

					frameWork.updateTags(
						inputTags,
						allowFilter,
						newValue
					);
				}
			}
		);

		//on click on the text, edit it via input and input should be focused and in place of the tag

		$('body').on(
			'click',
			'.input-tags-ui .input-tags-ui-tag-close',
			(e) => {
				const triggerer = $(e.target);

				e.preventDefault();

				const inputTags = triggerer
					.closest('.input-tags-ui')
					.children('.input-tags');

				if (!frameWork.isDisabled(inputTags)) {
					const tagToRemove = triggerer.attr('data-value'),
						currValue = _.tagsToParse(
							inputTags.attr('data-value-ui')
						);
					currValue.splice(parseInt(tagToRemove), 1);

					const newValue = _.tagsToVal(currValue);

					frameWork.updateTags(
						inputTags,
						true,
						newValue
					);
				}
			}
		);

		$('body').on(
			'click',
			'.input-tags-ui .input-tags-ui-tag-text',
			(e) => {
				const triggerer = $(e.target);

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					const tagText = triggerer.text(),
						inputTags = triggerer
							.closest('.input-tags-ui')
							.children('.input-tags'),
						tagToEdit = triggerer.attr('data-value'),
						currValue = _.tagsToParse(
							inputTags.attr('data-value-ui'),
							false
						);
					currValue.splice(
						parseInt(tagToEdit),
						1,
						_.tagsInputString
					);

					const uiValue = _.tagsToVal(currValue);

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

		$('body').on(
			'click',
			'*[data-toggle="accordion"]',
			(e) => {
				const triggerer = $(e.target);

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					frameWork.toggleAccordion(
						triggerer,
						true
					);
				}
			}
		);

		$('body').on(
			'click',
			'*[data-toggle="alert-close"]',
			(e) => {
				const triggerer = $(e.target);

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					const selector = _.getTheToggled(triggerer, 'alert-close');

					if (selector) {
						selector.hide().remove();
					}
				}
			}
		);

		$('body').on(
			'click',
			'*[data-toggle="alert-close-all"]',
			(e) => {
				const triggerer = $(e.target);

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					$('.alert').each((i, alert) => {
						if (
							$(alert).find('[data-toggle="alert-close"]').length
						) {
							$(alert).hide().remove();
						}
					});
				}
			}
		);

		$('body').on(
			'focus',
			`input[data-toggle="dropdown"], *[contenteditable][data-toggle="dropdown"], .${frameWork.settings.uiJsClass} [contenteditable]`,
			(e) => {
				const uiTrigger = $(e.target);

				if (frameWork.isDisabled(uiTrigger)) {
					uiTrigger.blur();

				} else {
					const triggerer = _.getTheUiTriggerer(uiTrigger);
					const selector = _.getTheToggled(
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

					triggerer.addClass('focus');
				}
			}
		);

		$('body').on(
			'blur',
			`input[data-toggle="dropdown"], *[contenteditable][data-toggle="dropdown"], .${frameWork.settings.uiJsClass} [contenteditable]`,
			(e) => {
				const uiTrigger = $(e.target);

				if (!frameWork.isDisabled(uiTrigger)) {
					const triggerer = _.getTheUiTriggerer(uiTrigger);

					const selector = _.getTheToggled(triggerer,'dropdown');

					setTimeout(() => {
						if (selector) {
							frameWork.setDropdown(
								selector,
								triggerer,
								'close'
							);
						}
					}, 200);
					triggerer.removeClass('focus');
				}
			}
		);

		$('body').on(
			'click',
			`*[data-toggle="dropdown"]:not(input):not([contenteditable]):not(.${frameWork.settings.uiJsClass})`,
			(e) => {
				const uiTrigger = $(e.target);

				e.preventDefault();

				if (!frameWork.isDisabled(uiTrigger)) {
					const triggerer = _.getTheUiTriggerer(uiTrigger),
						selector = _.getTheToggled(triggerer, 'dropdown');

					if (selector) {
						frameWork.setDropdown(
							selector,
							triggerer
						);

						if (selector.hasClass('open')) {
							// selector.slideUp();
							triggerer
								.closest('li, .nav-item')
								.removeClass('open');
							triggerer.removeClass('open');

						} else {
							//close all the bois
							$('.dropdown')
								.closest('li, .nav-item')
								.removeClass('open');

							$('.dropdown')
								.closest('li, .nav-item')
								.find('.dropdown')
								.removeClass('open');
							// $('.dropdown').slideUp();

							// selector.slideDown();
							triggerer
								.closest('li, .nav-item')
								.addClass('open');

							triggerer.addClass('open');
						}
					}
				}
			}
		);

		$('body').on(
			'click', 
			'.tab, .tab > *',
			(e) => {
				const triggerer = $(e.target);

				if (frameWork.isDisabled(triggerer)) {
					e.preventDefault();

				} else {
					const theTab = triggerer.closest('.tab');

					if (theTab.length) {
						if (!theTab.hasClass('active')) {
							theTab.siblings('.tab, li').removeClass('active');
							theTab.addClass('active');
						}
					}
				}
			}
		);

		$('body').on(
			'click',
			'.btn-group-toggle > .btn',
			(e) => {
				const triggerer = $(e.target);

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					_.toggleGroup(triggerer, 'btn');
				}
			}
		);

		$('body').on(
			'click',
			'.list-group-toggle .list-group-item, .list-group-toggle li',
			(e) => {

				const triggerer = $(e.target);

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					_.toggleGroup(
						triggerer,
						'list',
						null,
						'li, .list-group-item'
					);
				}
			}
		);

		$('body').on(
			'click',
			'*[data-toggle="tooltip-click"]',
			(e) => {

				const triggerer = $(e.target);

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					frameWork.createToolTip(triggerer);
				}
			}
		);

		$('body').on(
			'mouseenter',
			'*[data-toggle="tooltip-hover"]',
			(e) => {

				const triggerer = $(e.target);

				if (frameWork.isDisabled(triggerer)) {
					e.preventDefault();

				} else {
					frameWork.createToolTip(triggerer);
				}
			}
		);

		$('body').on(
			'mouseleave',
			'*[data-toggle="tooltip-hover"]',
			(e) => {
				frameWork.destroyToolTip();
			}
		);

		$('body').on(
			'click',
			'*[data-toggle="modal-open"], *[data-toggle="modal"]',
			(e) => {

				const triggerer = $(e.target);

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					frameWork.createModal(triggerer);
				}
			}
		);

		$('body').on(
			'click',
			'*[data-toggle="modal-close"]',
			(e) => {

			const triggerer = $(e.target);

			e.preventDefault();

			if (!frameWork.isDisabled(triggerer)) {
				frameWork.destroyModal(true);
			}
		});

		$('body').on(
			'click',
			'*[data-toggle="board-open"], *[data-toggle="board"]',
			(e) => {

				const triggerer = $(e.target);

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					frameWork.createBoard(triggerer);
				}
			}
		);

		$('body').on(
			'click',
			'*[data-toggle="board-close"]',
			(e) => {
				const triggerer = $(e.target);

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					frameWork.destroyBoard(true);
				}
			}
		);

		$('body').on(
			'click',
			'*[data-toggle="board-resize"]',
			(e) => {
				e.preventDefault();
			}
		);

					
			const startBoardResize = (e)=>{

				$('body').addClass('body-on-drag');

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

				$('body').removeClass('body-on-drag');
				$(window).off(
					'mousemove',
					startBoardResize
				)
					$(window).off(
						'touchmove',
						startBoardResize
					)
			}

			const initBoardResize = (e) => {
					
				const triggerer = $(e.target);

				if (
					!frameWork.isDisabled(triggerer)
					&& frameWork.board.current.length
				) {

					$(window).on(
						'mousemove',
						startBoardResize
					);

						$(window).on(
							'touchmove',
							startBoardResize
						);

					$(window).on(
						'mouseup',
						removeBoardResize
					);

						$(window).on(
							'touchend',
							removeBoardResize
						);

				}
					
			};

			$('body').on(
				'mousedown',
				'*[data-toggle="board-resize"]',
				(e) => {
					e.preventDefault();
					initBoardResize(e);
				}
			);

				$('body').on(
					'touchstart',
					'*[data-toggle="board-resize"]',
					initBoardResize
				);

		$('body').on('change', '.zone input[type="file"]', (e) => {
			const triggerer = $(e.target);
			const zone = triggerer.closest('.zone');
			const files = triggerer[0].files;

			zone.find('.zone-has-content-text').remove();

			if (triggerer.val() && files.length) {
				zone.addClass('zone-has-content');

				zone.append(() => {
					const html = `<div class="zone-has-content-text">
							<span>${files.length} files selected.<br> Click or drag and drop to reselect</span>
						</div>`;

						return html;

				});
			} else {
				zone.removeClass('zone-has-content');
			}
		});

		$('body').on(
			'click',
			'*[data-toggle="asset-close"]',
			(e) => {

				const triggerer = $(e.target);

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					const asset = _.getTheToggled(triggerer, 'asset');
					asset.remove();
				}
			}
		);

		$('html, body').on(
			'click',
			'*',
			(e) => {
				const triggerer = $(e.target);

				if (frameWork.isDisabled(triggerer)) {
					e.preventDefault();
				} else {
					//tooltip
					if (
						!triggerer.closest('[data-toggle="tooltip-click"]').length
						&& !triggerer.closest('[data-toggle="tooltip-hover"]').length
						&& !triggerer.closest('.tooltip.tooltip-allow-interaction').length
						&& !triggerer.closest('[data-value]').length //temp fix for ui elements not getting ancestry
					) {
						frameWork.destroyToolTip();
					}

					//dropdown
					if (
						!triggerer.closest('[data-toggle="dropdown"]').length
						&& !triggerer.closest('.dropdown').length
						&& !triggerer.closest('[data-value]').length //temp fix for ui elements not getting ancestry
					) {
						frameWork.closeDropdowns(false);
					}
				}
			}
		);

	});

	$(window).on('load', () => {
		_.fns_on_load.forEach((fn) => {
			fn();
		});

		frameWork.settings.initializeModal && frameWork.createModal();
		frameWork.settings.initializeBoard && frameWork.createBoard();
		frameWork.settings.initializeAccordion &&
			frameWork.toggleAccordion();

		let resizeTimerInternal;
		$(window).on('resize', (e) => {
			clearTimeout(resizeTimerInternal);

			resizeTimerInternal = setTimeout(() => {
				_.fns_on_resize.forEach((fn) => {
					fn();
				});
			}, 100);
		});

		let scrollTimerInternal;
		$(window).on('scroll','*',(e) => {
			clearTimeout(scrollTimerInternal);

			scrollTimerInternal = setTimeout(() => {
				_.fns_on_scroll.forEach((fn) => {
					fn();
				});
			}, 100);
		});

		$('body')
			.removeClass('body-loading')
			.addClass('body-loaded');
	});

	//put boi on global

	window.fw = frameWork;
	window.frameWork = frameWork;
	// window.frameWork.DEBUG = _;
}(jQuery, window));
