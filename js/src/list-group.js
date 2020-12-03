
		// btn group
		frameWork.addEvent(
			document.documentElement,
			'click',
			'.list-group-toggle .list-group-item, .list-group-toggle li',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					__f.toggleGroup(
						triggerer,
						'list',
						'li, .list-group-item',
						null,
						'list-group-toggle-allow-no-active'
					);
				}
			}
		);