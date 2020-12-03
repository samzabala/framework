

frameWork.initGrid = (moduleGrid) => {
	const availablePropertiesParent = [
		'grid-template-columns',
		'grid-template-rows',
		'grid-template-areas',
		'grid-column-start',
		'grid-template-end',
		'grid-template',
		'grid-column-gap',
		'grid-row-gap',
		'justify-items',
		'align-items',
		'justify-content',
		'align-content',
		'place-content',
		'grid-auto-columns',
		'grid-auto-rows',
		'grid-auto-flow',
		'grid',
	];

	const availablePropertiesChildren = [
		'grid-area',
		'grid-column',
		'grid-row',
		'grid-column-start',
		'grid-column-end',
		'grid-row-start',
		'grid-row-end',
		'justify-self',
		'align-self',
		'place-self',
	];

	const renderProps = (modElement, props) => {
		props.forEach((prop) => {
			// modElement.style[FwString.ToCamelCase(prop)] = '';
			let propsSet = false,
				propSetBr = false,
				smallestStyledBr = false;

			//check for breakpointz first
			__f.reverseArray(BrTag).forEach((br) => {
				if (
					modElement.hasAttribute(`data-${prop}-${br}`)
					&& !propsSet
				) {
					smallestStyledBr = br;
					if (frameWork.validateBr(br, 'above')) {
						modElement
							.style[FwString.ToCamelCase(prop)] = modElement.getAttribute(
								`data-${prop}-${br}`
							);
						propsSet = true;
						propSetBr = true;
					}
				}
			});

			if (
				modElement.hasAttribute(`data-${prop}`)
				&& !propsSet
			) {
				//check for all breakpoint
				if (
					!propsSet
					&& !propSetBr
				) {
					modElement
						.style[FwString.ToCamelCase(prop)] = modElement.getAttribute(
							`data-${prop}`
						);
					propsSet = true;
				}

			} else {
				if (
					modElement.style[FwString.ToCamelCase(prop)] !== null
					&& smallestStyledBr
					&& !frameWork.validateBr(smallestStyledBr, 'above')
				) {
					modElement.style[FwString.ToCamelCase(prop)] = null;
				}
			}
		});
	};

	renderProps(moduleGrid, availablePropertiesParent);
	const moduleChildren = Array.from(moduleGrid.children).filter(
		(child) => {
			return child.matches('.module');
		}
	);

	moduleChildren.forEach((child) => {
		renderProps(child, availablePropertiesChildren);
	});
};

frameWork.readyGrids = () => {
	const grids = document.querySelectorAll('.module-grid:not(.module-grid-custom)');
	grids.forEach((grid) => {
		frameWork.initGrid(grid);
	});
};
__f.fns_on_rightAway.push(frameWork.readyGrids);
__f.fns_on_resize.push(frameWork.readyGrids);
