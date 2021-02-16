import FwCore from './util/core.js';
import {FwFnsQ} from './util/initiator.js';

import FwEvent from './data-helper/event.js';
import FwDom from './data-helper/dom.js';

import FwComponent from './classes/component.js';
import { UiPrefix,UiToggled,BodyClass } from './util/ui.js';

const NAME = 'modal';
const ACTIVATED_CLASS = `active`;


const BOARD_NAME = `board`;

const DATA_KEY = `${FwCore.settings.prefix}.${NAME}`;

const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;

	const EVENT_BEFORE_INIT = `before_init${EVENT_KEY}`;
	const EVENT_INIT = `init${EVENT_KEY}`;
	const EVENT_AFTER_INIT = `after_init${EVENT_KEY}`;

	const EVENT_BEFORE_CREATE = `before_create${EVENT_KEY}`;
	const EVENT_CREATE = `create${EVENT_KEY}`;
	const EVENT_AFTER_CREATE = `after_create${EVENT_KEY}`;

	const EVENT_BEFORE_DESTROY = `before_destroy${EVENT_KEY}`;
	const EVENT_DESTROY = `destroy${EVENT_KEY}`;
	const EVENT_AFTER_DESTROY = `after_destroy${EVENT_KEY}`;

	const EVENT_BEFORE_UPDATE = `before_update${EVENT_KEY}`;
	const EVENT_UPDATE = `update${EVENT_KEY}`;
	const EVENT_AFTER_UPDATE = `after_update${EVENT_KEY}`;

	const EVENT_BEFORE_RESIZE = `before_resize${EVENT_KEY}`;
	const EVENT_RESIZE = `resize${EVENT_KEY}`;
	const EVENT_AFTER_RESIZE = `after_resize${EVENT_KEY}`;


const CURRENT_MODAL_INSTANCE = {
	element: null,
	args:null
}

const VALID_MODAL_MODES = [
	NAME,
	BOARD_NAME
];

class Modal extends FwComponent {
	
	constructor(element,triggerer,args){
		let currMode;
		VALID_MODAL_MODES.forEach((mode)=>{
			if(element.classList.contains(mode) && !currMode){
				currMode = mode;
			}
		});

		element = element || UiToggled(currMode) || false;

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

		this.mode = currMode;
	}

	dispose() {
		super.dispose();
		this._triggerer = null;
		this._customArgs = null;
	}

	static get current() {
		return CURRENT_MODAL_INSTANCE;
	}

	static set current(obj){
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

		FwEvent.trigger(element,EVENT_BEFORE_CREATE);

		FwEvent.trigger(element,EVENT_CREATE);
	
		const id = this.UiElId || this.UiId;

		id !== `${this.UiId}` && this.args.changeHash && UiChangeHash(id);;

		const theUi = document.createElement('div');
		document.querySelector('body').appendChild(theUi);
		theUi.className = `${UiPrefix}-${NAME}-component
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

		Modal.current = {
			element: element,
			args: this.args,
		}

		theUi.classList.add(ACTIVATED_CLASS);
		document.body.classList.add(BodyClass.noScroll);

		Modal.update();


		FwEvent.trigger(element,EVENT_AFTER_CREATE);
	}

	destroy(removeHash){

		if(!Modal.current.element){
			return;
		}

		FwEvent.trigger(element,EVENT_BEFORE_DESTROY);
		FwEvent.trigger(element,EVENT_DESTROY);

		const element = elem ?
			super.UiEl(elem)
			: super.UiEl();

		removeHash = removeHash || false;

		let canRemoveHash = false;
	
		if (
			removeHash
			&& Modal.current.element.hasAttribute('id')
			&& Modal.current.element.getAttribute('id') == window.location.hash.replace('#','')
		) {
			canRemoveHash = true;
		}
	
		if (this.UiRoot) {
			FwDom.moveContents(
				this.UiRoot.querySelector(`.${this.mode}-popup-content`),
				Modal.current.element
			);
	
			this.UiRoot.classList.remove('active');
			this.UiRoot.parentNode.removeChild(this.UiRoot);
		}
	
		
	
		Modal.current = {
			element: false,
			args: false,
		}
	
		let removeBodClass = true;
		VALID_MODAL_MODES.forEach((mode)=> {
			if(
				document.getElementById(`${UiPrefix}-${mode}`)
				&& removeBodClass == true
			){
				removeBodClass = false;
			}
		})
	
		removeBodClass && document.body.classList.remove(BodyClass.noScroll);
	
		canRemoveHash && ChangeHash('');

		FwEvent.trigger(element,EVENT_AFTER_DESTROY);
	}

	static update(){
	
		if(this.UiRoot) {
	
			FwEvent.trigger(element,EVENT_BEFORE_UPDATE);
			FwEvent.trigger(element,EVENT_UPDATE);
	
			// buttons
				// resize
					const currentWidth = this.UiRoot
						.querySelector(`.${this.mode}-popup`).clientWidth;
						
					const resizeBtn = this.UiRoot
						.querySelectorAll(`*[data-toggle="${this.mode}-resize"]`);
	
					if(resizeBtn && currentWidth < parseInt(this.current.args.width)){
						resizeBtn.forEach((butt) => {
							butt.classList.add('disabled');
						});
					}else{
						resizeBtn.forEach((butt) => {
							butt.classList.remove('disabled');
						});
					}

			FwEvent.trigger(element,EVENT_AFTER_UPDATE);
		}
	}

	resize(width){
		if(this.mode !== BOARD_NAME){
			return;
		}

		FwEvent.trigger(element,EVENT_BEFORE_RESIZE);
		FwEvent.trigger(element,EVENT_RESIZE);

		const args = args || Modal.current.args || {};
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

		FwEvent.trigger(element,EVENT_AFTER_RESIZE);
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
										<i class="symbol symbol-close"></i>
									</a>`;
							}
	
							html += `<div class="${this.mode}-popup-content"></div>`;
	
							html += `</div>`;
							
							break;
					}

		return html;

	}
	

	static handleResize(mode) {
		mode = mode || NAME;
		
	}
	

	static handleUniversal(mode) {
		mode = mode || NAME;
		return () => {
			if(FwCore.settings[`initialize${mode.toUpperCase()}`]){

				FwEvent.trigger(element,EVENT_BEFORE_INIT);
				FwEvent.trigger(element,EVENT_INIT);

				const modal = new Modal();
				modal.create();

				FwEvent.trigger(element,EVENT_AFTER_INIT);
			};
		}
		
	}
	

	static handleSomethingEvent() {
		
	}
	

	static handleOpen(mode) {
		mode = mode || NAME;
		return (e) => {
			const modal = new Modal(
				UiToggled(mode,e.target),
				e.target
			);
			modal.create();
		}
	}
	

	static handleClose(mode) {
		mode = mode || NAME;
		return (e) => {
			const modal = new Modal(
				UiToggled(mode,e.target),
				e.target
			);
			modal.destroy();
		}
	}
	

	static initListeners() {
		VALID_MODAL_MODES.forEach((mode)=>{
			FwEvent.addListener(
				document,
				EVENT_CLICK,
				`*[data-toggle="${mode}"] *[data-toggle="${mode}-open"]`,
				Modal.handleOpen(mode)
			);
			
			FwEvent.addListener(
				document,
				EVENT_CLICK,
				`*[data-toggle="${mode}-close"]`,
				Modal.handleClose(mode)
			);
		

			window.addEventListener(
				'hashchange',
				Modal.handleUniversal(mode)
			);
	
			FwFnsQ.on_ready = Modal.handleUniversal(mode);
			FwFnsQ.on_resize = Modal.handleResize(mode);
		});
	}
}

export default Modal;

Modal.initListeners();







// frameWork.createBoard = (triggerer) => {
// 	frameWork.createModal(triggerer, 'board');
// };

// frameWork.resizeBoard = (width,modal,args) => {
// 	frameWork.resizeModal('board',width,modal,args);
// };

// frameWork.checkOnBoard = () => {
// 	frameWork.checkOnModal('board');
// };
// __f.fns_on_resize.push(frameWork.checkOnBoard);

// frameWork.destroyBoard = (removeHash) => {
// 	frameWork.destroyModal(removeHash, 'board');
// };

// window.addEventListener('hashchange', () => {
// 	frameWork.settings.initializeModal && frameWork.createBoard();
// });

// FwEvent.addListener(
// 	document.documentElement,
// 	'click',
// 	'*[data-toggle="board-open"], *[data-toggle="board"]',
// 	(e) => {

// 		const triggerer = e.target;

// 		e.preventDefault();

// 		if (!frameWork.isDisabled(triggerer)) {
// 			frameWork.createBoard(triggerer);
// 		}
// 	}
// );

// FwEvent.addListener(
// 	document.documentElement,
// 	'click',
// 	'*[data-toggle="board-close"]',
// 	(e) => {
// 		const triggerer = e.target;

// 		e.preventDefault();

// 		if (!frameWork.isDisabled(triggerer)) {
// 			frameWork.destroyBoard(true);
// 		}
// 	}
// );

// FwEvent.addListener(
// 	document.documentElement,
// 	'click',
// 	'*[data-toggle="board-resize"]',
// 	(e) => {
// 		e.preventDefault();
// 	}
// );

			
// 	const startBoardResize = (e)=>{


// 		document.body.classList.add('body-on-drag');

// 		const widthBasis = 
// 			e.clientX
// 			|| (e.touches && e.touches[0].clientX )
// 			|| (
// 				e.originalEvent.touches
// 				&& e.originalEvent.touches[0].clientX
// 			);
// 		let newWidth;

// 		if(frameWork.board.this.args.align == 'right'){
// 			newWidth = widthBasis
// 		}else if(frameWork.board.this.args.align == 'left'){
// 			newWidth = window.innerWidth - widthBasis;
// 		}
		
// 		frameWork.resizeModal('board',`${newWidth}px`);
// 	}

// 	const removeBoardResize = (e)=>{

// 		document.body.classList.remove('body-on-drag');
// 		window.removeEventListener(
// 			'mousemove',
// 			startBoardResize
// 		)
// 			window.removeEventListener(
// 				'touchmove',
// 				startBoardResize
// 			)
// 	}

// 	const initBoardResize = (e) => {
			
// 		const triggerer = e.target;

// 		if (
// 			!frameWork.isDisabled(triggerer)
// 			&& frameWork.board.current
// 		) {

// 			window.addEventListener(
// 				'mousemove',
// 				startBoardResize
// 			);

// 				window.addEventListener(
// 					'touchmove',
// 					startBoardResize
// 				);

// 			window.addEventListener(
// 				'mouseup',
// 				removeBoardResize
// 			);

// 				window.addEventListener(
// 					'touchend',
// 					removeBoardResize
// 				);

// 		}
			
// 	};

// 	FwEvent.addListener(
// 		document.documentElement,
// 		'mousedown',
// 		'*[data-toggle="board-resize"]',
// 		(e) => {
// 			e.preventDefault();
// 			initBoardResize(e);
// 		}
// 	);

// 		FwEvent.addListener(
// 			document.documentElement,
// 			'touchstart',
// 			'*[data-toggle="board-resize"]',
// 			initBoardResize
// 		);
