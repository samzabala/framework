import Initiator from './core/initiator.js';
import Settings from './core/settings.js';

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

// const CSS_VAR_PREFIX_WRAPPER = `--fw-${COMPONENT_CLASS}`;
// const CSS_VAR_PREFIX_CHILDREN = `--fw-${COMPONENT_CLASS}-item`;

const GRID_PROPERTIES = {
  wrapper: [
    'grid-template-columns',
    'grid-template-rows',
    'grid-template-areas',
    'grid-template-start',
    'grid-template-end',
    'grid-template',
    'grid-auto-columns',
    'grid-auto-rows',
    'grid-auto-flow',
    'grid-column-gap',
    'grid-row-gap',
    'grid-gap',
    'justify-items',
    'justify-content',
    'align-items',
    'align-content',
    'place-content',
  ],
  children: [
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
  ],
};

// const PROPERTIES_WRAPPER = [
//   'grid-template-columns',
//   'grid-template-rows',
//   'grid-template-areas',
//   'grid-template-start',
//   'grid-template-end',
//   'grid-template',
//   'grid-auto-columns',
//   'grid-auto-rows',
//   'grid-auto-flow',
//   'grid-column-gap',
//   'grid-row-gap',
//   'grid-gap',
//   'justify-items',
//   'justify-content',
//   'align-items',
//   'align-content',
//   'place-content',
// ];

// const PROPERTIES_CHILDREN = [
//   'grid-area',
//   'grid-column',
//   'grid-row',
//   'grid-column-start',
//   'grid-column-end',
//   'grid-row-start',
//   'grid-row-end',
//   'justify-self',
//   'align-self',
//   'place-self',
// ];

class ModuleGrid extends FwComponent {
  static get DATA_KEY() {
    return DATA_KEY;
  }

  get UIChildren() {
    return super.UIEl().querySelectorAll(`.${COMPONENT_CHILDREN_CLASS}`);
  }

  _loopProps(block, elType) {
    GRID_PROPERTIES[elType].forEach((prop) => {
      let propsSet = false,
        propSetBr = false,
        smallestStyledBr = false;

      // const varPrefix =
      //   elType == 'wrapper' ? CSS_VAR_PREFIX_WRAPPER : CSS_VAR_PREFIX_CHILDREN;

      //check for breakpointz first
      FwArray.reverse(BrTag).forEach((br) => {
        if (block.hasAttribute(`data-${prop}-${br}`) && !propsSet) {
          smallestStyledBr = br;
          if (ValidateBr(br, 'above')) {
            block.style.setProperty(
              FwString.ToDashed(prop),
              block.getAttribute(`data-${prop}-${br}`)
            );

            // block.style.setProperty(
            //   `${varPrefix}-${FwString.ToDashed(prop)}`,
            //   block.getAttribute(`data-${prop}-${br}`)
            // );
            propsSet = true;
            propSetBr = true;
          }
        }
      });

      if (block.hasAttribute(`data-${prop}`) && !propsSet) {
        //check for all breakpoint
        if (!propsSet && !propSetBr) {
          block.style.setProperty(
            FwString.ToDashed(prop),
            block.getAttribute(`data-${prop}`)
          );

          // block.style.setProperty(
          //   `${varPrefix}-${FwString.ToDashed(prop)}`,
          //   block.getAttribute(`data-${prop}`)
          // );
          propsSet = true;
        }
      } else {
        if (
          block.style[FwString.ToDashed(prop)] !== null &&
          smallestStyledBr &&
          !ValidateBr(smallestStyledBr, 'above')
        ) {
          block.style.setProperty(FwString.ToDashed(prop), null);
        }
      }
    });
  }

  renderGrid(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    super.runCycle(
      EVENT_BEFORE_RENDER_GRID,
      EVENT_RENDER_GRID,
      EVENT_AFTER_RENDER_GRID,
      () => {
        this._loopProps(element, 'wrapper');
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
          this._loopProps(child, 'children');
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
