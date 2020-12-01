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