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
const SVG_REPLACED_CLASS = `${COMPONENT_CLASS}-svg-replacement`;
const COMPONENT_SELECTOR = '*[data-src],*[data-srcset]';

const BODY_LOADING_CLASS = `body-${NAME}-loading`;
const BODY_LOADED_CLASS = `body-${NAME}-loaded`;

const NAV_ANCESTOR = `li, .nav-item`;

const DATA_KEY = `${FwCore.settings.prefix}.${NAME}`;

const EVENT_KEY = `.${DATA_KEY}`;

	const EVENT_BEFORE_LAZYLOAD = `before_lazyload${EVENT_KEY}`;
	const EVENT_LAZYLOAD = `lazyload${EVENT_KEY}`;
	const EVENT_AFTER_LAZYLOAD = `after_lazyload${EVENT_KEY}`;

class Lazy extends FwComponent {

	constructor(element){
		super(
			element,
			{
				_ogElement:false 
			}
		);
	}

	dispose() {
		super.dispose();
	}

	static get DATA_KEY(){
		return DATA_KEY;
	}

	get theSrc(){
		return super.UiEl().getAttribute('data-src');
	}

	get theSrcSet(){
		return super.UiEl().getAttribute('data-srcset');
	}

	get UiOriginal() {
		return this._ogElement || super.UiEl();
	}

	set UiOriginal(elem){
		this._ogElement = elem;
	}

	load(elem){
		const element = elem ?
			super.UiEl(elem)
			: super.UiEl();

			if(!element){
				return
			}

			FwEvent.trigger(element,EVENT_BEFORE_LAZYLOAD);

			if(element.classList.contains(`${COMPONENT_CLASS}`)){
				FwEvent.trigger(element,EVENT_LAZYLOAD);
				if (element.matches('img') || element.closest('picture')) {
					if (
						FwString.GetFileExtension(this.theSrc) == 'svg'
					) {
						const imgID = element.getAttribute('id') || null;
						const imgClass = element.getAttribute('class') || null;
				
						fetch(this.theSrc)
							.then((response) => response.text())
							.then((markup) => {
								const parser = new DOMParser();
								const dom = parser.parseFromString(markup, 'text/html');
								
								const svg = dom.querySelector('svg');
				
								if (svg) {
									if (typeof imgID !== null) {
										svg.setAttribute('id', imgID);
									}
									if (typeof imgClass !== null) {
										svg.setAttribute(
											'class',
											`${imgClass} ${SVG_REPLACED_CLASS} ${ACTIVATED_CLASS}`
										);
									}
				
									svg.removeAttribute('xmlns:a');
									this.UiOriginal = element;
									super._resetUiEl(svg);
								}
							});
					} else {
						this.theSrc && element.setAttribute('src', this.theSrc);
						this.theSrcSet && element.setAttribute('srcset', this.theSrcSet);
					}
				} else {
					element.style.backgroundImage = `url(${this.theSrc})`;
				}
				element.classList.add(`${ACTIVATED_CLASS}`);
			}


			FwEvent.trigger(element,EVENT_AFTER_LAZYLOAD);

	}

	static setStatus(status) {
		status = status || 'loaded';

		let addClass,removeClass;

		switch(status){
			case 'loading':
				addClass = BODY_LOADING_CLASS;
				removeClass = BODY_LOADED_CLASS;
				break;
			case 'loaded':
				addClass = BODY_LOADED_CLASS;
				removeClass = BODY_LOADING_CLASS;
				break;
		}
		
		document.body.
			classList.remove(removeClass);
		document.body.
			classList.add(addClass);
	}

	static loadAll(images){
		
		FwEvent.trigger(document,EVENT_BEFORE_LAZYLOAD);

		Lazy.setStatus('loading');
		images = images || document.querySelectorAll(COMPONENT_SELECTOR);
	

		FwEvent.trigger(document,EVENT_LAZYLOAD);
		images.forEach((img) => {
			const lazy = new Lazy(img);
			lazy.load();
		});
	
		Lazy.setStatus('loaded');


		FwEvent.trigger(document,EVENT_AFTER_LAZYLOAD);
	}
	


	static handleToggle() {
		
	}
	

	static initListeners(){
		if(FwCore.settings.lazyLoad ){
			FwFnsQ.on_ready = Lazy.loadAll;
		}
	}
}


export default Lazy;

Lazy.initListeners();