import FwCore from './../util/core.js';
import {FwFnsQ} from './../util/initiator.js';

import FwEvent from './../data-helper/event.js';
import FwDom from './../data-helper/dom.js';

import FwComponent from './../classes/component.js';
import { UiPrefix,UiDynamicClass } from '../util/ui.js';
import { DateTimePreset, dayNamesShorter, monthNamesShort } from '../util/validation.js';

import Dropdown from './../dropdown.js';

const NAME = 'modal';
const TOGGLE_MODE = `${NAME}`;
const COMPONENT_CLASS = `${NAME}`;
const ACTIVATED_CLASS = `active`;


const BOARD_NAME = `board`;
const BOARD_COMPONENT_CLASS = `${NAME}`;
const BOARD_TOGGLE_MODE = `${NAME}`;

const BODY_LOADING_CLASS = `body-no-scroll`;

const DATA_KEY = `${FwCore.settings.prefix}.${NAME}`;

const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;

	const EVENT_BEFORE_INIT = `before_init${EVENT_KEY}`;
	const EVENT_INIT = `init${EVENT_KEY}`;
	const EVENT_AFTER_INIT = `after_init${EVENT_KEY}`;

	const EVENT_BEFORE_OPEN = `before_open${EVENT_KEY}`;
	const EVENT_OPEN = `open${EVENT_KEY}`;
	const EVENT_AFTER_OPEN = `after_open${EVENT_KEY}`;

	const EVENT_BEFORE_CLOSE = `before_close${EVENT_KEY}`;
	const EVENT_CLOSE = `close${EVENT_KEY}`;
	const EVENT_AFTER_CLOSE = `after_close${EVENT_KEY}`;


const CURRENT_MODAL_INSTANCE = {
	element: null,
	args:null
}

class Modal extends FwComponent {
	
	constructor(element,triggerer,args){
		element = element || UiToggled(TOGGLE_MODE) || false;
		super(
			element,
			{
				_triggerer:(
					triggerer
						? new FwDom(triggerer)
					: false
				),
				_customArgs: args
					|| false
			}
		);
	}

	dispose() {
		super.dispose();
		this._triggerer = null;
		this._customArgs = null;
	}

	static get _current() {
		return CURRENT_MODAL_INSTANCE;
	}

	static set _current(obj){
		CURRENT_MODAL_INSTANCE.element = obj.element;
		CURRENT_MODAL_INSTANCE.args = obj.args;
	}

	get UiRoot () {
		return document.getElementById(this.UiId);
	}

	get UiId (){
		return `${FwCore.settings.prefix}-${this.mode != 'default' ? this.mode : NAME}`
	}

	get UiElId (){
		return super.UiEl().getAttribute('id');
	}

	get mode(){
		let toReturn = 'default';

		if(element.classList.contains(BOARD_COMPONENT_CLASS)){
			toReturn = BOARD_COMPONENT_CLASS;
		}

		return toReturn;
	}

	static get configDefaults(){
		const mode = this.mode;
		return {
			
			changeHash: true,
			header: '',
			close: true,
			disableOverlay: true,
			width: null,
			callback: null,
			classes: '',
			closeClasses: '',
			
			
			align: {
				value:'left',
				parser: (value)=>{
					if(mode == BOARD_NAME) return value;
				}
			},
			resizeClasses: {
				value:null,
				parser: (value)=>{
					if(mode == BOARD_NAME) return value;
				}
			},
			resize: {
				value:false,
				parser: (value)=>{
					if(mode == BOARD_NAME) return value;
				}
			},
		}
	}

	get args () {
		
		return FwComponent._parseArgs(
			(this._customArgs
				? this._customArgs
				: {
					changeHash:
						(
							this._triggerer
							&& this._triggerer.getAttribute(`data-${this.mode}-change-hash`)
						)
						|| contentWrap.getAttribute(`data-${this.mode}-change-hash`),
					header:
						(
							this._triggerer
							&& this._triggerer.getAttribute(`data-${this.mode}-title`)
						)
						|| contentWrap.getAttribute(`data-${this.mode}-title`),
					close:
						(
							this._triggerer
							&& this._triggerer.getAttribute(`data-${this.mode}-close`)
						)
						|| contentWrap.getAttribute(`data-${this.mode}-close`),
					disableOverlay:
						(
							this._triggerer
							&& this._triggerer.getAttribute(`data-${this.mode}-disable-overlay`)
						)
						|| contentWrap.getAttribute(`data-${this.mode}-disable-overlay`),
					width:
						(
							this._triggerer
							&& this._triggerer.getAttribute(`data-${this.mode}-width`)
						)
						|| contentWrap.getAttribute(`data-${this.mode}-width`),
					callback:
						(
							this._triggerer
							&& this._triggerer.getAttribute(`data-${this.mode}-callback`)
						)
						|| contentWrap.getAttribute(`data-${this.mode}-callback`),
					classes:
						(
							this._triggerer
							&& this._triggerer.getAttribute(`data-${this.mode}-classes`)
						)
						|| contentWrap.getAttribute(`data-${this.mode}-classes`),
					closeClasses:
						(
							this._triggerer
							&& this._triggerer.getAttribute(`data-${this.mode}-close-classes`)
						)
						|| contentWrap.getAttribute(`data-${this.mode}-close-classes`),

					//board specific
						align:
							(
								this._triggerer
								&& this._triggerer.getAttribute(`data-${this.mode}-align`)
							)
							|| contentWrap.getAttribute(`data-${this.mode}-align`),
						resize:
							(
								this._triggerer
								&& this._triggerer.getAttribute(`data-${this.mode}-resize`)
							)
							|| contentWrap.getAttribute(`data-${this.mode}-resize`),
						
						resizeClasses:
							(
								this._triggerer
								&& this._triggerer.getAttribute(`data-${this.mode}-resize-classes`)
							)
							|| contentWrap.getAttribute(`data-${this.mode}-resize-classes`),

					//custom specific
						// customMarkup: //halat weit
				}
			),
			Modal.configDefaults
		);
	}

	static get DATA_KEY(){
		return DATA_KEY;

	}

	create(elem){
		const element = elem ?
			super.UiEl(elem)
			: super.UiEl();

		if(!element){
			return;
		}
	
		const id = this.UiElId || this.UiId;

		id !== `${this.UiId}` && this.args.changeHash && UiChangeHash(id);;

		const theUi = document.createElement('div');
		document.querySelector('body').appendChild(theUi);
		theUi.className = `${frameWork.settings.prefix}-${NAME}-component
			${this.mode}-wrapper
			${this.args.classes}
			${this.args.align ? `${this.mode}-${this.args.align}` : ''}`;
		theUi.setAttribute('id', this.UiId);

		theUi.innerHTML = this._markup;

		FwDom.moveContents(
			element,
			theUi.querySelector(`.${this.mode}-popup-content`)
		);

		if (this.args.width) {
			frameWork.resizeModal(this.args.width,theUi,args);
		}
		
		if (this.args.callback) {
			RunFn(this.args.callback);
		}

		Modal._current = {
			element: element,
			args: this.args,
		}

		theUi.classList.add(ACTIVATED_CLASS);
		document.body.classList.add(BODY_LOADING_CLASS);

		this.update();
	}

	destroy(elem){

	}

	update(){
		const args = Modal._current.args || {};
	
		if(this.UiRoot) {
	
			// buttons
				// resize
					const currentWidth = this.UiRoot
						.querySelector(`.${this.mode}-popup`).clientWidth;
						
					const resizeBtn = this.UiRoot
						.querySelectorAll(`*[data-toggle="${this.mode}-resize"]`);
	
					if(resizeBtn && currentWidth < parseInt(this.args.width)){
						resizeBtn.forEach((butt) => {
							butt.classList.add('disabled');
						});
					}else{
						resizeBtn.forEach((butt) => {
							butt.classList.remove('disabled');
						});
					}
		}
	}

	resize(width){
		if(this.mode !== BOARD_NAME){
			return;
		}

		const args = args || Modal._current.args || {};
		width = width || args.width || null;

		if(this.UiRoot && parseInt(width) >= parseInt(this.args.width)){
			//all
			if(this.UiRoot.querySelector(`.${this.mode}-popup`)){
				this.UiRoot.
					querySelector(`.${this.mode}-popup`)
						.style.width = width;
			}

			//bboard
			if(this.UiRoot.querySelector(`.${this.mode}-button-wrapper`)){
				this.UiRoot.
					querySelector(`.${this.mode}-button-wrapper`)
						.style.width = width;
			}
		}
	}
	
	get _markup(){
		let html = '';
	
				//overlay
				html += `<a href="#"
						class="
							${this.mode}-close-overlay"
							${
								this.args.disableOverlay == false
								? `data-toggle="${this.mode}-close"`
								: ''
							}
					></a>`;
	
					switch (this.mode) {
						case 'board':
							html += `<div class="${this.mode}-button-wrapper">`;
								if (this.args.close !== false) {
									html += `<a href="#"
										class="
											${this.mode}-close ${this.mode}-button
											${
												this.args.closeClasses
												? this.args.closeClasses
												: `${this.mode}-button-default`}"
										data-toggle="${this.mode}-close"
									>
										<i class="symbol symbol-close "></i>
									</a>`;
								}
	
								if (this.args.resize !== false && this.args.width) {
									html += `<a
										class="
											${this.mode}-resize ${this.mode}-button
											${
												this.args.resizeClasses
												? this.args.resizeClasses
												: `${this.mode}-button-default`}"
										data-toggle="${this.mode}-resize"
									>
										<i class="symbol symbol-arrow-tail-left "></i>
										<i class="symbol symbol-arrow-tail-right "></i>
									</a>`;
								}
							html += `</div>`;
	
							html += `<div class="${this.mode}-popup">`;
	
								if (this.args.header) {
									html += `<div class="${this.mode}-header">
											<h1 class="${this.mode}-title">${decodeURIComponent(this.args.header)}</h1>
										</div>`;
								}
	
								html += `<div class="${this.mode}-popup-content"></div>`;
	
							html += `</div>`;
	
							break;
	
						case 'modal':
							html += `<div class="${this.mode}-popup">`;
	
							if (this.args.header) {
								html += `<div class="${this.mode}-header">
										<h1 class="${this.mode}-title">${decodeURIComponent(this.args.header)}</h1>
									</div>`;
							}
	
							if (this.args.close !== false) {
								html += `<a href="#"
										class="${this.mode}-close ${this.args.closeClasses}"
										data-toggle="${this.mode}-close"
									>
										<i class="symbol symbol-close "></i>
									</a>`;
							}
	
							html += `<div class="${this.mode}-popup-content"></div>`;
	
							html += `</div>`;
							
							break;
					}

		return html;

	}
	

	static handleSomethingEvent() {
		
	}
	

	static initListeners() {
		

	}
}

export default Modal;

Modal.initListeners();

/*
@TODO

events cleanup
UiElement methods and props
*/
__f.fns_on_resize.push(frameWork.checkOnModal);

frameWork.resizeModal = (width,modal,args) => {
}

frameWork.destroyModal = (removeHash) => {
	removeHash = removeHash || false;
	this.mode = this.mode || 'modal';


	let canRemoveHash = false;

	if (
		removeHash
		&& Modal._current.element.hasAttribute('id')
		&& Modal._current.element.getAttribute('id') == window.location.hash.replace('#','')
	) {
		canRemoveHash = true;
	}

	const modal = document.querySelector(`.${this.mode}-wrapper`);
	if (modal) {
		frameWork.moveContents(
			modal.querySelector(`.${this.mode}-popup-content`),
			Modal._current.element
		);

		modal.classList.remove('active');
		modal.parentNode.removeChild(modal);
	}

	

	Modal._current = {
		element: false,
		args: false,
	}


	const validSubcoms = ['modal','board']; 
	let removeBodClass = true;
	validSubcoms.forEach((sc)=> {
		if(
			document.getElementById(`${frameWork.settings.prefix}-${sc}`)
			&& removeBodClass == true
		){
			removeBodClass = false;
		}
	})

	removeBodClass && document.body.classList.remove('body-no-scroll');

	canRemoveHash && ChangeHash('');
};

window.addEventListener('hashchange', () => {
	frameWork.settings.initializeModal && frameWork.createModal();
});

FwEvent.addListener(
	document.documentElement,
	'click',
	'*[data-toggle="modal-open"], *[data-toggle="modal"]',
	(e) => {
		const triggerer = e.target;

		e.preventDefault();

		if (!frameWork.isDisabled(triggerer)) {
			frameWork.createModal(triggerer);
		}
	}
);

FwEvent.addListener(
	document.documentElement,
	'click',
	'*[data-toggle="modal-close"]',
	(e) => {

		const triggerer = e.target;

		e.preventDefault();

		if (!frameWork.isDisabled(triggerer)) {
			frameWork.destroyModal(true);
		}
	}
);







frameWork.createBoard = (triggerer) => {
	frameWork.createModal(triggerer, 'board');
};

frameWork.resizeBoard = (width,modal,args) => {
	frameWork.resizeModal('board',width,modal,args);
};

frameWork.checkOnBoard = () => {
	frameWork.checkOnModal('board');
};
__f.fns_on_resize.push(frameWork.checkOnBoard);

frameWork.destroyBoard = (removeHash) => {
	frameWork.destroyModal(removeHash, 'board');
};

window.addEventListener('hashchange', () => {
	frameWork.settings.initializeModal && frameWork.createBoard();
});

FwEvent.addListener(
	document.documentElement,
	'click',
	'*[data-toggle="board-open"], *[data-toggle="board"]',
	(e) => {

		const triggerer = e.target;

		e.preventDefault();

		if (!frameWork.isDisabled(triggerer)) {
			frameWork.createBoard(triggerer);
		}
	}
);

FwEvent.addListener(
	document.documentElement,
	'click',
	'*[data-toggle="board-close"]',
	(e) => {
		const triggerer = e.target;

		e.preventDefault();

		if (!frameWork.isDisabled(triggerer)) {
			frameWork.destroyBoard(true);
		}
	}
);

FwEvent.addListener(
	document.documentElement,
	'click',
	'*[data-toggle="board-resize"]',
	(e) => {
		e.preventDefault();
	}
);

			
	const startBoardResize = (e)=>{


		document.body.classList.add('body-on-drag');

		const widthBasis = 
			e.clientX
			|| (e.touches && e.touches[0].clientX )
			|| (
				e.originalEvent.touches
				&& e.originalEvent.touches[0].clientX
			);
		let newWidth;

		if(frameWork.board.this.args.align == 'right'){
			newWidth = widthBasis
		}else if(frameWork.board.this.args.align == 'left'){
			newWidth = window.innerWidth - widthBasis;
		}
		
		frameWork.resizeModal('board',`${newWidth}px`);
	}

	const removeBoardResize = (e)=>{

		document.body.classList.remove('body-on-drag');
		window.removeEventListener(
			'mousemove',
			startBoardResize
		)
			window.removeEventListener(
				'touchmove',
				startBoardResize
			)
	}

	const initBoardResize = (e) => {
			
		const triggerer = e.target;

		if (
			!frameWork.isDisabled(triggerer)
			&& frameWork.board.current
		) {

			window.addEventListener(
				'mousemove',
				startBoardResize
			);

				window.addEventListener(
					'touchmove',
					startBoardResize
				);

			window.addEventListener(
				'mouseup',
				removeBoardResize
			);

				window.addEventListener(
					'touchend',
					removeBoardResize
				);

		}
			
	};

	FwEvent.addListener(
		document.documentElement,
		'mousedown',
		'*[data-toggle="board-resize"]',
		(e) => {
			e.preventDefault();
			initBoardResize(e);
		}
	);

		FwEvent.addListener(
			document.documentElement,
			'touchstart',
			'*[data-toggle="board-resize"]',
			initBoardResize
		);
