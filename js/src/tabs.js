frameWork.addEvent(
	document.documentElement,
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