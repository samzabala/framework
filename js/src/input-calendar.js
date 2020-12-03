//range only is pag kwan di sya isa isang date pangmaramihan
__f.dateIsValid = (date, args, rangeOnly) => {
	rangeOnly = rangeOnly || false; //range,spot

	const d = DateToParse(date),
		checkAgainst = args.disabledDates.split(',');

	let toReturn = true;

	if (!rangeOnly) {
		//if in disabled dates
		if (checkAgainst.indexOf(DateToVal(d)) > -1) {
			// console.warn('value is declared disabled specifically || ',DateToVal(d));
			toReturn = false;
		}

		//weekend
		if (
			checkAgainst.indexOf('weekends') > -1
			&& (d.getDay() == 0 || d.getDay() == 6)
		) {
			// console.warn('value was a weekend || ',DateToVal(d),DateToVal(date));
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
		// console.warn('value was in the past || ',DateToVal(date),'\nversus ',DateToVal(dateNow));
		toReturn = false;
	}

	if (
		checkAgainst.indexOf('future') > -1
		&& d > dateNow
	) {
		// console.warn('value was in the future || ',DateToVal(date),'\nversus ',DateToVal(dateNow));
		toReturn = false;
	}

	//if  in range of min or max
	if (
		(
			DateToParse(args.max)
			&& DateToParse(args.max) < d
		)
		|| (
			DateToParse(args.min)
			&& d < DateToParse(args.min)
		)
	) {
		// console.warn('value not in max and width || ',DateToVal(d));;
		toReturn = false;
	}

	return toReturn;
};

__f.createCalendarUi = (inputCalendar, valueForUi, args) => {
	
	if (inputCalendar) {
		valueForUi =
			valueForUi
			|| DateToVal(inputCalendar.value)
			|| DateToVal(new Date());
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

		const currYear = DateToParse(valueForUi).getFullYear(),
			currMonth = DateToParse(valueForUi).getMonth(),
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
			// console.warn(buttonClass,'hello i fucked up','\n',DateToParse(valueForUi),'\n',currentCalendarDate,'\n', new Date(currYear,currMonth));
			switch (buttonClass) {
				case 'prev-month':
					symbolClass = 'symbol-arrow-left';
					arrowDate = DateToVal(
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
					arrowDate = DateToVal(
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
					arrowDate = DateToVal(
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
					arrowDate = DateToVal(
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
				${monthNamesShort[currMonth]}
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
					data-value="${DateToVal(currentCalendarDate)}"
				>
					${monthNamesShort[currMonth]} ${currYear}
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
							data-value="${DateToVal(listItemDate)}">
								${
									monthNamesShort[
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
			return `<a href="#" data-value="${DateToVal(date)}"
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
					${dayNamesShorter[dayToRetrieve]}
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

	const theValue = newValue || DateToVal(inputCalendar.value);

	valueForUi = valueForUi || theValue || DateToVal(new Date());

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
				DateToVal(theValue)
			) {
				date.classList.add('active');
			} else {
				date.classList.remove('active');
			}
		});

		const inputField = inputCalendar.parentNode.querySelector(`.${__f.uiPrefix('calendar')}input input`);

		if (inputField) {
			inputField.setAttribute('value', DateToHuman(theValue));
			inputField.value = DateToHuman(theValue);
		}
	}
};

frameWork.readyCalendar = () => {
	const calendars = document.querySelectorAll('.input-calendar');

	calendars.forEach((calendar) => {
		frameWork.updateCalendar(calendar);
	});
};
__f.fns_on_rightAway.push(frameWork.readyCalendar);



frameWork.addEvent(
	document.documentElement,
	'change',
	'.input-calendar',
	(e) => {
		const triggerer = e.target;
		frameWork.updateCalendar(triggerer);
	}
);

frameWork.addEvent(
	document.documentElement,
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
	document.documentElement,
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
	document.documentElement,
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
				dateTime.Human.pattern
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