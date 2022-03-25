import Initiator from './core/initiator.js';
import Settings from './core/settings.js';

import FwString from './data-helper/string.js';

import FwComponent from './classes/component.js';

const NAME = 'lazy';
const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}`;
const COMPONENT_CLASS_SVG = `${COMPONENT_CLASS}-svg`;
const ACTIVATED_CLASS = `${NAME}-loaded`;
const SVG_REPLACED_CLASS = `${COMPONENT_CLASS}-svg-replacement`;
const COMPONENT_SELECTOR = `*[data-src],*[data-srcset],.${COMPONENT_CLASS}`;

const BODY_LOADING_CLASS = `body-${NAME}-loading`;
const BODY_LOADED_CLASS = `body-${NAME}-loaded`;

const DATA_KEY = `${Settings.get('prefix')}_${NAME}`;

const EVENT_KEY = `_${DATA_KEY}`;

const EVENT_BEFORE_INIT = `before_init${EVENT_KEY}`;
const EVENT_INIT = `init${EVENT_KEY}`;
const EVENT_AFTER_INIT = `after_init${EVENT_KEY}`;

const EVENT_BEFORE_SVGCONVERSION = `before_svgconversion${EVENT_KEY}`;
const EVENT_SVGCONVERSION = `svgconversion${EVENT_KEY}`;
const EVENT_AFTER_SVGCONVERSION = `after_svgconversion${EVENT_KEY}`;

const EVENT_BEFORE_LOAD = `before_load${EVENT_KEY}`;
const EVENT_LOAD = `load${EVENT_KEY}`;
const EVENT_AFTER_LOAD = `after_load${EVENT_KEY}`;

class Lazy extends FwComponent {
  constructor(element) {
    super(element, {
      _ogElement: element && element.__ogElement ? element.__ogElement : false,
    });
  }

  dispose() {
    super.setProp('_ogElement', '__dispose');
    super.dispose();
  }

  static get DATA_KEY() {
    return DATA_KEY;
  }

  get theSrc() {
    return super.UIEl().getAttribute('data-src');
  }

  get theSrcSet() {
    return super.UIEl().getAttribute('data-srcset');
  }

  get UIOriginal() {
    return this._ogElement || super.UIEl();
  }

  set UIOriginal(elem) {
    this._ogElement = elem;
  }

  readyLoaded(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    //so it dont run agen when it's already loaded
    this.theSrc && element.removeAttribute('data-src');
    this.theSrcSet && element.removeAttribute('data-srcset');

    element.classList.remove(`${COMPONENT_CLASS}`);
    element.classList.add(`${ACTIVATED_CLASS}`);
  }

  loadSVG(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    const imgID = element.getAttribute('id');
    const imgClass = element.getAttribute('class');

    super.runCycle(
      EVENT_BEFORE_SVGCONVERSION,
      EVENT_SVGCONVERSION,
      EVENT_AFTER_SVGCONVERSION,
      () => {
        fetch(this.theSrc)
          .then((response) => response.text())
          .then((markup) => {
            const parser = new DOMParser();
            const dom = parser.parseFromString(markup, 'text/html');

            const svg = dom.querySelector('svg');

            if (svg) {
              if (element.hasAttribute('id')) {
                svg.setAttribute('id', imgID);
              }
              if (element.hasAttribute('class')) {
                svg.setAttribute('class', `${imgClass} ${SVG_REPLACED_CLASS}`);
              }

              svg.removeAttribute('xmlns:a');
              this.UIOriginal = element;
              super._resetUIEl(svg);
              element.replaceWith(svg);
            }
            this.readyLoaded();
          });
      },
      element
    );
  }

  load(elem) {
    const element = elem ? super.UIEl(elem) : super.UIEl();

    if (!element) {
      return;
    }

    if (element.classList.contains(`${COMPONENT_CLASS}`)) {
      super.runCycle(
        EVENT_BEFORE_LOAD,
        EVENT_LOAD,
        EVENT_AFTER_LOAD,
        () => {
          if (element.matches('img') || element.closest('picture')) {
            this.theSrc && element.setAttribute('src', this.theSrc);
            this.theSrcSet && element.setAttribute('srcset', this.theSrcSet);

            if (
              (this.theSrc || this.theSrcSet) &&
              FwString.GetFileExtension(this.theSrc) == 'svg' &&
              element.classList.contains(COMPONENT_CLASS_SVG)
            ) {
              this.loadSVG();
            } else {
              this.readyLoaded();
            }
          } else {
            this.theSrc && (element.style.backgroundImage = `url(${this.theSrc})`);
            this.readyLoaded();
          }
        },
        element
      );
    }
  }

  static setStatus(status) {
    status = status || 'loaded';

    let addClass, removeClass;

    switch (status) {
      case 'loading':
        addClass = BODY_LOADING_CLASS;
        removeClass = BODY_LOADED_CLASS;
        break;
      case 'loaded':
        addClass = BODY_LOADED_CLASS;
        removeClass = BODY_LOADING_CLASS;
        break;
    }

    document.body.classList.remove(removeClass);
    document.body.classList.add(addClass);
  }

  static loadAll(images) {
    new Lazy().runCycle(
      EVENT_BEFORE_INIT,
      EVENT_INIT,
      EVENT_AFTER_INIT,
      () => {
        Lazy.setStatus('loading');
        images = images || document.querySelectorAll(COMPONENT_SELECTOR);

        images.forEach((img) => {
          const lazy = new Lazy(img);
          lazy.load();
        });

        Lazy.setStatus('loaded');
      },
      document
    );
  }

  static initListeners() {
    if (Settings.get('lazyLoad')) {
      Initiator.Q.on_ready = Lazy.loadAll;
    }
  }
}

export default Lazy;

Lazy.initListeners();
