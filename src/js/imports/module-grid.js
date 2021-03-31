import Initiator from './core/initiator.js';
import Settings from './core/settings.js';

import FwEvent from './data-helper/event.js';
import FwDom from './data-helper/dom.js';
import FwString from './data-helper/string.js';
import FwArray from './data-helper/array.js';

import FwComponent from './classes/component.js';
import { BrTag, ValidateBr } from './util/breakpoint.js';

const NAME = 'moduleGrid';
const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}`;
const COMPONENT_CHILDREN_CLASS = `module`;

const DATA_KEY = `${Settings.get('prefix')}_${NAME}`;

const EVENT_KEY = `_${DATA_KEY}`;

const EVENT_BEFORE_INIT = `before_init${EVENT_KEY}`;
const EVENT_INIT = `init${EVENT_KEY}`;
const EVENT_AFTER_INIT = `after_init${EVENT_KEY}`;

const EVENT_BEFORE_RENDER = `before_render${EVENT_KEY}`;
const EVENT_RENDER = `render${EVENT_KEY}`;
const EVENT_AFTER_RENDER = `after_render${EVENT_KEY}`;

const EVENT_BEFORE_RENDER_GRID = `before_render_grid${EVENT_KEY}`;
const EVENT_RENDER_GRID = `render_grid${EVENT_KEY}`;
const EVENT_AFTER_RENDER_GRID = `after_render_grid${EVENT_KEY}`;

const EVENT_BEFORE_RENDER_BLOCK = `before_render_block${EVENT_KEY}`;
const EVENT_RENDER_BLOCK = `render_block${EVENT_KEY}`;
const EVENT_AFTER_RENDER_BLOCK = `after_render_block${EVENT_KEY}`;

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
  static get DATA_KEY() {
    return DATA_KEY;
  }

  get UIChildren() {
    return super.UIEl().querySelectorAll(`.${COMPONENT_CHILDREN_CLASS}`);
  }

  _loopProps(block, props) {
    props.forEach((prop) => {
      let propsSet = false,
        propSetBr = false,
        smallestStyledBr = false;

      //check for breakpointz first
      FwArray.reverse(BrTag).forEach((br) => {
        if (block.hasAttribute(`data-${prop}-${br}`) && !propsSet) {
          smallestStyledBr = br;
          if (ValidateBr(br, 'above')) {
            block.style[FwString.ToCamelCase(prop)] = block.getAttribute(
              `data-${prop}-${br}`
            );
            propsSet = true;
            propSetBr = true;
          }
        }
      });

      if (block.hasAttribute(`data-${prop}`) && !propsSet) {
        //check for all breakpoint
        if (!propsSet && !propSetBr) {
          block.style[FwString.ToCamelCase(prop)] = block.getAttribute(`data-${prop}`);
          propsSet = true;
        }
      } else {
        if (
          block.style[FwString.ToCamelCase(prop)] !== null &&
          smallestStyledBr &&
          !ValidateBr(smallestStyledBr, 'above')
        ) {
          block.style[FwString.ToCamelCase(prop)] = null;
        }
      }
    });
  }

  renderGrid(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    super.runCycle(
      EVENT_BEFORE_RENDER_BLOCK,
      EVENT_RENDER_BLOCK,
      EVENT_AFTER_RENDER_BLOCK,
      () => {
        this._loopProps(element, PROPERTIES_WRAPPER);
      },
      element
    );
  }

  renderBlocks() {
    this.UIChildren.forEach((child) => {
      super.runCycle(
        EVENT_BEFORE_RENDER_BLOCK,
        EVENT_RENDER_BLOCK,
        EVENT_AFTER_RENDER_BLOCK,
        () => {
          this._loopProps(child, PROPERTIES_CHILDREN);
        },
        child
      );
    });
  }

  render(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();
    super.runCycle(
      EVENT_BEFORE_RENDER,
      EVENT_RENDER,
      EVENT_AFTER_RENDER,
      () => {
        this.renderGrid(element);
        this.renderBlocks();
      },
      element
    );
  }

  static handleUniversal() {
    return () => {
      new ModuleGrid().runCycle(
        EVENT_BEFORE_INIT,
        EVENT_INIT,
        EVENT_AFTER_INIT,
        () => {
          const grids = document.querySelectorAll(`.${COMPONENT_CLASS}`);

          grids.forEach((grid) => {
            const moduleGrid = new ModuleGrid(grid);
            moduleGrid.render();
          });
        },
        document
      );
    };
  }

  static initListeners() {
    Initiator.Q.on_ready = ModuleGrid.handleUniversal();
    Initiator.Q.on_resize = ModuleGrid.handleUniversal();
  }
}

export default ModuleGrid;
ModuleGrid.initListeners();
