
// btn group
frameWork.addEvent(
	document.documentElement,
	'click',
	'.btn-group-toggle > .btn',
	(e) => {

		const triggerer = e.target;

		e.preventDefault();

		if (!frameWork.isDisabled(triggerer)) {
			__f.toggleGroup(triggerer, 'btn');
		}
	}
);