
import FwCore from './util/core.js';
import {FwFnsQ} from './util/initiator.js';

import FwEvent from './data-helper/event.js';
import FwDom from './data-helper/dom.js';
import FwString from './data-helper/string.js';
import FwArray from './data-helper/array.js';

import FwComponent from './classes/component.js';
import { BrTag,ValidateBr } from './util/breakpoint.js';


const NAME = 'moduleGrid';
const COMPONENT_CLASS = `module-grid`;
const COMPONENT_CHILDREN_CLASS = `module`;

const DATA_KEY = `${FwCore.settings.prefix}.${NAME}`;

const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_RESIZE = `resize${EVENT_KEY}`;

	const EVENT_BEFORE_INIT = `before_init${EVENT_KEY}`;
	const EVENT_INIT = `init${EVENT_KEY}`;
	const EVENT_AFTER_INIT = `after_init${EVENT_KEY}`;

	const EVENT_BEFORE_CREATE = `before_create${EVENT_KEY}`;
	const EVENT_CREATE = `create${EVENT_KEY}`;
	const EVENT_AFTER_CREATE = `after_create${EVENT_KEY}`;


const PROPERTIES_WRAPPER = [
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

const PROPERTIES_CHILDREN = [
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


class ModuleGrid extends FwComponent {
	constructor(element){
		super(element);
	}

	get UiChildren () {
		return super.UiEl().querySelectorAll()`.${COMPONENT_CHILDREN_CLASS}`;
	}

	render(elem){
		
		const element = elem ?
			super.UiEl(elem)
			: super.UiEl();
	}

	_loopProps(block,props){
		props.forEach((prop) => {
			let propsSet = false,
				propSetBr = false,
				smallestStyledBr = false;

			//check for breakpointz first
			FwArray.reverse(BrTag).forEach((br) => {
				if (
					block.hasAttribute(`data-${prop}-${br}`)
					&& !propsSet
				) {
					smallestStyledBr = br;
					if (ValidateBr(br, 'above')) {
						block
							.style[FwString.toCamelCase(prop)] = block.getAttribute(
								`data-${prop}-${br}`
							);
						propsSet = true;
						propSetBr = true;
					}
				}
			});

			if (
				block.hasAttribute(`data-${prop}`)
				&& !propsSet
			) {
				//check for all breakpoint
				if (
					!propsSet
					&& !propSetBr
				) {
					block
						.style[FwString.toCamelCase(prop)] = block.getAttribute(
							`data-${prop}`
						);
					propsSet = true;
				}

			} else {
				if (
					block.style[FwString.toCamelCase(prop)] !== null
					&& smallestStyledBr
					&& !ValidateBr(smallestStyledBr, 'above')
				) {
					block.style[FwString.toCamelCase(prop)] = null;
				}
			}
		});
	}

	setWrapper(elem){
		const element = elem ?
			super.UiEl(elem)
			: super.UiEl();

			this._loopProps(element,PROPERTIES_WRAPPER);
	}

	setBlocks(){

		this.UiChildren.forEach((child)=>{
			this._loopProps(child,PROPERTIES_CHILDREN);
		});
	}

	set(elem){
		const element = elem ?
			super.UiEl(elem)
			: super.UiEl();

			this.setWrapper(elem);
			this.setBlocks();
		
	}
	

	static handleUniversal() {
		return () => {

				FwEvent.trigger(element,EVENT_BEFORE_INIT);
				FwEvent.trigger(element,EVENT_INIT);



				const moduleGrids = document.querySelectorAll(`.${COMPONENT_CLASS}`);

				moduleGrids.forEach((grid)=>{
					grid.set();
				})

				FwEvent.trigger(element,EVENT_AFTER_INIT);
		}
		
	}

	static initListeners(){
		FwFnsQ.on_ready = ModuleGrid.handleUniversal();
		FwFnsQ.on_resize = ModuleGrid.handleUniversal();
	}
}


export default ModuleGrid;

ModuleGrid.initListeners();



frameWork.initGrid = (moduleGrid) => {
	

	const renderProps = (block, props) => {
		
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
