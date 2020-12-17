
		// btn group
		FwEvent.addListener(
			document.documentElement,
			'click',
			'.list-group-toggle .list-group-item, .list-group-toggle li',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					ToggleGroup(
						triggerer,
						'list',
						'li, .list-group-item',
						null,
						'list-group-toggle-allow-no-active'
					);
				}
			}
		);