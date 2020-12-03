//valid shits
export const disableClasses = [
	'table-row-disabled',
	'tab-disabled',
	'btn-disabled',
	'input-disabled',
	'disabled',
];

export const dateTime = {
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

export const dayNames = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

export const dayNamesShort = [
	'Sun',
	'Mon',
	'Tue',
	'Wed',
	'Thu',
	'Fri',
	'Sat',
];

export const dayNamesShorter = [
	'Su',
	'Mo',
	'Tu',
	'We',
	'Th',
	'Fr',
	'Sa'
];

export const monthNames = [
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

export const monthNamesShort = [
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


	const BrValue = {
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

	const BrTag = Object.keys(BrValue);
// Br_to_loop =  ['xs','sm','md','lg'];

	const BrMobileMax =
	parseFloat(
		getComputedStyle(
			document.documentElement
		).getPropertyValue('--fw-br-mobile-max')
	)
	|| 'sm';

export {BrValue, BrTag, BrMobileMax};


export const Palette = [
	'base',
	'primary',
	'secondary',
	'accent',
	'neutral',
	'error',
	'caution',
	'success',
];



export const DateToParse = (date) => {

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
				dateTime.Value.pattern
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


export const DateToHuman = (date, format) => {
	date = DateToParse(date);
	format = format || dateTime.Human.template;

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
								dayNamesShort,
								dayNames
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
								monthNamesShort,
								monthNames
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
export const DateToVal = (date) => {
	const d = DateToParse(date);

	if (d) {
		return DateToHuman(
			d,
			dateTime.Value.template
		);
	}
};