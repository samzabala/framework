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

frameWork.addEvent(
	document.documentElement,
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
	document.documentElement,
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
	document.documentElement,
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




