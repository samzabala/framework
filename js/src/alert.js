







frameWork.addEvent(
	document.documentElement,
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
	document.documentElement,
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