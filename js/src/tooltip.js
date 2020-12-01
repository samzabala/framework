frameWork.createToolTip = (triggerer) => {

	if (triggerer) {
		frameWork.destroyToolTip();
		frameWork.toolTip = frameWork.toolTip || {};

		const arr = {
			placement:
				triggerer.getAttribute('data-tooltip-placement'),
			badge:
				triggerer.getAttribute('data-tooltip-badge'),
			badgeBg:
				triggerer.getAttribute('data-tooltip-badge-background'),
			badgeSize:
				triggerer.getAttribute('data-tooltip-badge-size'),
			content:
				triggerer.getAttribute('data-tooltip-content'),
			classes:
				triggerer.getAttribute('data-tooltip-classes'),
			centerX:
				triggerer.getAttribute('data-tooltip-center-x'),
			centerY:
				triggerer.getAttribute('data-tooltip-center-y'),
			x:
				triggerer.getAttribute('data-tooltip-x'),
			y:
				triggerer.getAttribute('data-tooltip-y'),
			width:
				triggerer.getAttribute('data-tooltip-width'),
			allowInteraction:
				triggerer.getAttribute('data-tooltip-allow-interaction'),
		};

		const defaults = {
			placement: 'left',
			badge: false,
			badgeBg: 'primary',
			badgeSize: '',
			classes: '',
			content: '<em class="color-neutral tooltip-placeholder">No info...</em>',
			centerX: false,
			centerY: false,
			x: false,
			y: false,
			width: null,
			allowInteraction: false,
		};

		const args = __f.parseArgs(arr, defaults);

		const toolTip = document.createElement('div');
		document.querySelector('body').appendChild(toolTip);

		toolTip.className = `tooltip tooltip-${args.placement}
			${args.width ? 'tooltip-has-custom-width' : ''}
			${args.allowInteraction ? 'tooltip-allow-interaction' : ''}`;

		if (args.width) {
			toolTip.style.width = args.width;
		}

		let ttHtml = '';

		if (args.badge) {
			ttHtml += `<span class="badge tooltip-badge`;
			if (
				args.badgeSize == 'small'
				|| args.badgeSize == 'large'
			) {
				ttHtml += ` badge-${args.badgeSize}`;
			}

			if (__f.palette.includes(args.badgeBg)) {
				ttHtml += ` badge-${args.badgeBg}`;
			} else {
				ttHtml += `" style="background-color:${args.badgeBg};`;
			}

			ttHtml += `"></span>`;
		}

		ttHtml += `<div class="tooltip-content ${args.classes}">${args.content}</div></div>`;

		toolTip.innerHTML += ttHtml;

		frameWork.toolTip.current = toolTip;
		frameWork.toolTip.activeTriggerer = triggerer;
		frameWork.toolTip.args = args;

		toolTip.classList.add('active');

		frameWork.positionToolTip();
	}
};

//return origitit
frameWork.getDefCoordsToolTip = (triggerer) => {

	if(frameWork.toolTip){

		triggerer  = triggerer || frameWork.toolTip.activeTriggerer;
		const args = frameWork.toolTip.args;

		let triggererOrigin;

		if(triggerer){

			let triggererProps = {
				top:
					triggerer.getBoundingClientRect().top + window.pageYOffset,
				left:
					triggerer.getBoundingClientRect().left + window.pageXOffset,
				height:
					triggerer.getBoundingClientRect().height,
				width:
					triggerer.getBoundingClientRect().width,
			};

			triggererOrigin = {
				x: () => {
					let toReturn =
						triggererProps.left + triggererProps.width * 0.5; //top and bottom

					if (!args.x) {
						if (!args.centerX) {
							switch (args.placement) {
								case 'right':
									toReturn =
										triggererProps.left +
										triggererProps.width;
									break;
								case 'left':
									toReturn = triggererProps.left;
									break;
							}
						}

					} else {
						toReturn = parseFloat(args.x);
					}

					return toReturn;
				},

				y: () => {
					let toReturn =
						triggererProps.top + triggererProps.height * 0.5; // left and right
					if (!args.y) {
						if (!args.centerY) {
							switch (args.placement) {
								case 'bottom':
									toReturn =
										triggererProps.top +
										triggererProps.height;
									break;
								case 'top':
									toReturn = triggererProps.top;
									break;
							}
						}

					} else {
						toReturn = parseFloat(args.y);
					}

					return toReturn;
				},
			};
		}

		return triggererOrigin;
	}
}

frameWork.destroyToolTip = () => {
	if (frameWork.toolTip) {
		if (frameWork.toolTip.current) {
			frameWork.toolTip.
				current.parentNode.removeChild(frameWork.toolTip.current);
		}

		delete frameWork.toolTip;
	}
};

//only use when the tooltip is finally active
frameWork.positionToolTip = (posX, posY) => {
	
	if (frameWork.toolTip) {

		const toolTip = frameWork.toolTip.current;
		const args = frameWork.toolTip.args;
		const triggerer = frameWork.toolTip.activeTriggerer;

		let triggererOrigin;

		if(!posX || !posY) {
			triggererOrigin = frameWork.getDefCoordsToolTip(triggerer);
		}

		posX = posX || triggererOrigin && triggererOrigin.x();
		posY = posY || triggererOrigin && triggererOrigin.y();

		let toolPoint = parseFloat(
			window
				.getComputedStyle(toolTip, ':before')
				.getPropertyValue('width')
		);

		//check if we can sqrt it
		toolPoint = Math.sqrt(toolPoint * toolPoint * 2) * 0.5;
		isNaN(toolPoint) && (toolPoint = 15);

		let toolTipProps = {
			height: toolTip.getBoundingClientRect().height,
			width: toolTip.getBoundingClientRect().width,
		};

		const toolTipBadge = toolTip.querySelector('.tooltip-badge');

		let off = {
			x: () => {
				let toReturn = toolTipProps.width * -0.5; //top and bottom
				let badgeOffset = 0;

				switch (args.placement) {
					case 'right':
						toReturn = toolPoint;
						break;
					case 'left':
						toReturn = -(toolTipProps.width + toolPoint);
						break;
				}

				if (
					toolTipBadge
					&& (
						args.placement == 'left'
						|| args.placement == 'right'
					)
				) {
					badgeOffset =
						args.placement == 'left'
							? toolTipBadge.getBoundingClientRect()
									.width * -0.5
							: toolTipBadge.getBoundingClientRect()
									.width * 0.5;
				}

				toReturn += badgeOffset;

				return toReturn;
			},
			
			y: () => {
				let toReturn = toolTipProps.height * -0.5; // left and right
				let badgeOffset = 0;

				switch (args.placement) {
					case 'bottom':
						toReturn = toolPoint;
						break;
					case 'top':
						toReturn = -(toolTipProps.height + toolPoint);
						break;
				}

				if (
					toolTipBadge
					&& (
						args.placement == 'top'
						|| args.placement == 'bottom'
					)
				) {
					badgeOffset =
						args.placement == 'top'
							? toolTipBadge.getBoundingClientRect()
									.height * -0.5
							: toolTipBadge.getBoundingClientRect()
									.height * 0.5;
				}

				toReturn += badgeOffset;

				return toReturn;
			},
		};

		toolTip.style.left = posX + off.x() + 'px';
		toolTip.style.top = posY + off.y() + 'px';
		// toolTip.style.left = (posX)+'px';
		// toolTip.style.top = (posY) +'px';
	}
};
__f.fns_on_scroll.push(frameWork.positionToolTip);
__f.fns_on_resize.push(frameWork.positionToolTip);