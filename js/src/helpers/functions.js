const frameWork = {};

//see if ya boi is oin that proper br
frameWork.validateBr = (breakpoint, mode) => {
	mode = mode || 'below'; //below,within,above
	const currIndex = BrTag.indexOf(breakpoint);
	switch (mode) {
		case 'below': //max-width
			return (
				document.documentElement.clientWidth
					<= BrValue[breakpoint]
			);

		case 'within':
			return (
				document.documentElement.clientWidth
					<=BrValue[breakpoint]
				&& document.documentElement.clientWidth
					> BrValue[BrTag[currIndex - 1]]
			);

		case 'above':
			return currIndex > 0
				? document.documentElement.clientWidth
					> BrValue[BrTag[currIndex - 1]]
				: document.documentElement.clientWidth
					> BrValue[BrTag[currIndex]];
	}
};

//see if 
frameWork.isDisabled = (elem) => {
	
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