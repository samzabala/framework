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