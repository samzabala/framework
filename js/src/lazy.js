import FwCore from './util/core.js';
import {FwFnsQ} from './util/initiator.js';

import FwEvent from './data-helper/event.js';
import FwString from './data-helper/string.js';
import FwDom from './data-helper/dom.js';

import FwComponent from './classes/component.js';
import { UiToggled,UiTriggerer } from './util/ui.js';

const NAME = 'lazy';
const COMPONENT_CLASS = `${FwString.ToDashed(NAME)}`;
const ACTIVATED_CLASS = `${NAME}-loaded`;


const ACTIVATED_CLASS = `${NAME}-loaded`;

const NAV_ANCESTOR = `li, .nav-item`;

const DATA_KEY = `${FwCore.settings.prefix}.${NAME}`;

const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;
const EVENT_FOCUS = `focus${EVENT_KEY}`;
const EVENT_BLUR = `blur${EVENT_KEY}`;

	const EVENT_BEFORE_CLOSE = `before_close${EVENT_KEY}`;
	const EVENT_CLOSE = `close${EVENT_KEY}`;
	const EVENT_AFTER_CLOSE = `after_close${EVENT_KEY}`;

	const EVENT_BEFORE_OPEN = `before_open${EVENT_KEY}`;
	const EVENT_OPEN = `open${EVENT_KEY}`;
	const EVENT_AFTER_OPEN = `after_open${EVENT_KEY}`;

class Lazy extends FwComponent {

	dispose() {
		super.dispose();
	}

	static get DATA_KEY(){
		return DATA_KEY;
	}

	src(){
		return super.UiEl().getAttribute('data-src');
	}

	srcSet(){
		return super.UiEl().getAttribute('data-srcset');
	}

	load(element){
		const element = elem ?
			super.UiEl(elem)
			: super.UiEl();

			if(!element){
				return
			}

			if(element.classList.contains(`${COMPONENT_CLASS}`)){

		
				if (element.matches('img') || element.closest('picture')) {
					if (element.classList.contains('lazy-svg') && FwString.getFileExtension(this.src) == 'svg') {
						const imgID = element.getAttribute('id') || null;
						const imgClass = element.getAttribute('class') || null;
				
						fetch(this.src)
							.then((response) => response.text())
							.then((markup) => {
								const parser = new DOMParser();
								const markup = parser.parseFromString(markup, 'text/html');
								
								const svg = markup.querySelector('svg');
				
								if (svg) {
									if (typeof imgID !== null) {
										svg.setAttribute('id', imgID);
									}
									if (typeof imgClass !== null) {
										svg.setAttribute(
											'class',
											`${imgClass} replaced-svg`
										);
									}
				
									svg.removeAttribute('xmlns:a');
									element.replaceWith(svg);
								}
							});
					} else {
						element.src && element.setAttribute('src', this.src);
						element.srcSet && element.setAttribute('srcset', this.srcset);
					}
				} else {
					element.style.backgroundImage = `url(${this.src})`;
				}
				element.classList.add(`${COMPONENT_CLASS}-loaded`);
			}

	}

	static loadAll(){
		
	}
	


	static handleToggle() {
		
	}
	

	static initListeners(){
		
	}
}


export default Lazy;

Lazy.initListeners();



frameWork.loadAll = (images) => {

document.documentElement.
	classList.remove('lazy-completed');
document.documentElement.
	classList.add('lazy-in-progress');
//css images
// images
images = images || document.querySelectorAll('*[data-src]');

images.forEach((img) => {
	frameWork.load(img);
});

document.documentElement.
	classList.remove('lazy-in-progress');
document.documentElement.
	classList.add('lazy-completed');
};

frameWork.settings.lazyLoad && __f.fns_on_ready.push(frameWork.loadAll);