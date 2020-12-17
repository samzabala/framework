import FwCore from './../util/core.js';
import {FwFnsQ} from './../util/initiator.js';
import Modifiers from './../util/modifiers.js';

import FwEvent from './../data-helper/event.js';
import FwArray from './../data-helper/array.js';
import FwDom from './../data-helper/dom.js';

import FwComponent from './../classes/component.js';
import { UiPrefix } from '../util/ui.js';
import Form from '../form.js';

const NAME = 'formTags';
const ARG_ATTRIBUTE_NAME = 'tags';
const COMPONENT_CLASS = `input-tags`;
const FOCUS_CLASS = `focus`;

const DATA_KEY = `${FwCore.settings.prefix}.${NAME}`;

const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_CLICK = `click${EVENT_KEY}`;
const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
const EVENT_BLUR = `blur${EVENT_KEY}`;
const EVENT_PASTE = `paste${EVENT_KEY}`;
const EVENT_CHANGE = `change${EVENT_KEY}`;

	const EVENT_BEFORE_INIT = `before_init${EVENT_KEY}`;
	const EVENT_INIT = `init${EVENT_KEY}`;
	const EVENT_AFTER_INIT = `after_init${EVENT_KEY}`;

	const EVENT_BEFORE_CREATE = `before_create${EVENT_KEY}`;
	const EVENT_CREATE = `create${EVENT_KEY}`;
	const EVENT_AFTER_CREATE = `after_create${EVENT_KEY}`;

	const EVENT_BEFORE_UPDATE = `before_update${EVENT_KEY}`;
	const EVENT_UPDATE = `update${EVENT_KEY}`;
	const EVENT_AFTER_UPDATE = `after_update${EVENT_KEY}`;


const INPUT_STRING = `__fw_input__`;

class FormTags extends FwComponent {

	constructor(element,valueToRender,args){
		super(
			element,
			{
				UiValue: valueToRender
					|| false,
				_customArgs: args
					|| false
			}
		);
	}

	dispose() {
		super.dispose();
		this.UiValue = null;
		this._customArgs = null;
	}

	static get DATA_KEY(){
		return DATA_KEY;
	}

	static get __is () {
		return INPUT_STRING;
	}

	get theValue() {
		return super.UiEl().value;;
	}

	set theValue(theValue) {
		if(theValue){
			super.UiEl().setAttribute('value', FormTags.toVal(theValue,false));
			super.UiEl().value = FormTags.toVal(theValue,false);
		}
	}

	get renderValue() {
		const renderTags = this.UiValue
			? this.UiValue
		: (super.UiEl().hasAttribute('data-value-ui'))
			? super.UiEl().getAttribute('data-value-ui')
		: this.theValue;
		return renderTags;
	}

	set renderValue(renderTags) {
		this.UiValue = FormTags.toVal(renderTags);
	}

	get UiRoot () {
		return super.UiEl().closest(`.${UiPrefix(COMPONENT_CLASS, true)}`);
	}

	get UiInput(){
		return this.UiRoot && this.UiRoot.querySelector(`.${UiPrefix(COMPONENT_CLASS)}input`);
	}

	get UiInputValue() {
		return this.UiInput.innerText;
	}

	set UiInputValue(inputValue) {
		this.UiInput.innerText = inputValue.toString().replace(
			/\n|\r/g,
			'\\n'
		);
	}

	get UiInputIdx() {
		let toReturn = FormTags.toArr(this.renderValue).indexOf(FormTags.__is);


		if(toReturn < 0){
			FormTags.toArr(this.renderValue).length > 0
			? FormTags.toArr(this.renderValue).length - 1
			: 0;
		}

		return toReturn;
		
		// (
		// 	this.UiInput
		// 	&& parseInt(this.UiInput.getAttribute('data-ui-i'))
		// )
		// || FormTags.toArr(this.renderValue).indexOf(FormTags.__is)
		// || FormTags.toArr(this.theValue).length;
	}


	_scrollToUiInput(){
		if(this.args.multipleLines || !this.UiInput){
			return
		}

		if(
			(this.UiRoot.scrollLeft > (this.UiInput.offsetLeft + this.UiInput.offsetWidth))
			|| ((this.UiRoot.scrollLeft + this.UiRoot.clientWidth) < (this.UiInput.offsetLeft + this.UiInput.offsetWidth))
		){
			FwDom.scrollToElem(this.UiRoot,this.UiInput,'x');
			FwDom.scrollToElem(this.UiRoot,this.UiInput,'y');
		}
	}

	static get configDefaults(){
		return {
			width: null,
			callback: null,
			filter: null,
			onKeyUp: null,
			multipleLines: false,
		}
	}

	get args () {
		return FwComponent._parseArgs(
			(this._customArgs
				? this._customArgs
				: {
					width:
						super.UiEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-width`),
					callback:
						super.UiEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-callback`),
					onKeyUp:
						super.UiEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-on-keyup`),
					filter:
						super.UiEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-filter`),
					multipleLines:
						super.UiEl().getAttribute(`data-${ARG_ATTRIBUTE_NAME}-multiple-lines`),
				}
			),
			FormTags.configDefaults
		);
	}

	static toArr (value,returnsWithInput) {
		
		returnsWithInput =
			returnsWithInput !== false || returnsWithInput == true;
	
		let toReturn = Array.isArray(value)
				? value
			: typeof value == 'string'
				? value.split(',')
			: [];
	
		//remove duplicates
		toReturn = toReturn.reduce((acc, tag) => {
			if (!acc.includes(tag)  && tag !== '') {
				acc.push(tag);
			}
	
			return acc;
		}, []);
	
	
		//check for ya boi
		toReturn.forEach((tag, i) => {
			if (
				(!tag || tag == '')
				|| (tag === FormTags.__is && !returnsWithInput)
			) {
				toReturn.splice(i, 1);
			}
		});
	
		if (returnsWithInput && toReturn.indexOf(FormTags.__is) < 0) {
			toReturn.push(FormTags.__is);
		}

		return toReturn;
	};

	static toVal (value,returnsWithInput){
		return FormTags.toArr(value, returnsWithInput).join(',');
	}

	filterValue(custFn){
		let fnToFilter,applyFilter;

		try {
			fnToFilter = custFn || eval(this.args.filter);
		} catch (err) {}

		if (typeof fnToFilter === 'function') {
			applyFilter = (valueToFilter, filterFnName) => {
				const noInputValueToFilter = (() => {
							return FormTags.toVal(valueToFilter, false);
						})();

				// turn to array ya bopi without the input tag string
				let toReturn = FormTags.toArr(
					eval(`${filterFnName}("${noInputValueToFilter}")`),
					false
				);

				// console.log(
				// 	'index of input\n',inputIndex,
				// 	'\n\n\nfiltered and ready for splice\n',toReturn,
				// 	'\n\n\npassed to the fil;ter\n'FormTags.toVal(valueToFilter,false),
				// 	'\n\n\nrar array\n'FormTags.toArr(valueToFilter),
				// 	'\n\n\n no input field\n',noInputValueToFilter,FormTags.toVal(valueToFilter,false),
				// 	'\n\n\n no input fieldas array\n'FormTags.toArr(valueToFilter,false),
				// 	'\n\n\n string for eval\n', ( filterFnName +'("'+ noInputValueToFilter +'")'),
				// 	'\n\n\neval\n',  eval(filterFnName +'("'+ noInputValueToFilter +'")'),
				// 	'whAT ETHE FUCK'
				// );

				if (this.UiInputIdx > -1) {
					toReturn.splice(
						this.UiInputIdx <
							FormTags.toArr(valueToFilter).length - 1
							? this.UiInputIdx
							: toReturn.length,
						0,
						FormTags.__is
					);
				}

				return FormTags.toVal(toReturn);
			};

			this.theValue = applyFilter(
				this.theValue,
				this.args.filter
			);
			this.renderValue = applyFilter(
				this.renderValue,
				this.args.filter
			);
		}
	}

	update(newValue,allowFilter,valueToRender,inputText) {
		FwEvent.trigger(super.UiEl(),EVENT_BEFORE_UPDATE);

		let theValue = newValue
			|| this.theValue
			|| '';
		
		let uiValue = valueToRender
			|| theValue
			|| this.renderValue
			|| '';

		allowFilter = allowFilter != false || allowFilter == true;

		inputText = inputText || false;


		FwEvent.trigger(super.UiEl(),EVENT_UPDATE);

		this.theValue = theValue;
		this.renderValue = uiValue;

		
		if (this.args.filter && allowFilter) {
			this.filterValue();
		}

		this._createUi();

		if(inputText){
			this.UiInputValue = inputText;
			this.focus();
		}
		
		FwEvent.trigger(super.UiEl(),EVENT_AFTER_UPDATE);
	}

	_createUi(elem) {

		const element = elem ?
			super.UiEl(elem)
			: super.UiEl();

			if(!element){
				return
			}

		FwEvent.trigger(element,EVENT_BEFORE_CREATE);

		const theUi = {};


		FwEvent.trigger(element,EVENT_CREATE);
		
		theUi.container = this.UiRoot;
		if (!theUi.container) {
			theUi.container = document.createElement('div');
			element.parentNode.insertBefore(
				theUi.container,
				element
			);
			theUi.container.appendChild(element);
			theUi.container.classList.add('input');
			theUi.container.setAttribute(
				'class',
				`${FwCore.settings.uiClass}
				${FwCore.settings.uiJsClass}
				${
					element
					.getAttribute('class')
					.toString()
					.replace(
						COMPONENT_CLASS,
						UiPrefix(COMPONENT_CLASS, true)
					)
				}`
			);

			theUi.container.classList.add(
				this.args.multipleLines
					? `${UiPrefix(COMPONENT_CLASS)}multiple`
					: `${UiPrefix(COMPONENT_CLASS)}single`
			);
		}

		if (this.args.width) {
			theUi.container.style = this.args.width;
		}
		//idk it never exists on initial so we dont have to do weird div wraping catches here

		theUi.wrapper = theUi.container.querySelector(`.${UiPrefix(COMPONENT_CLASS)}wrapper`);

		if (!theUi.wrapper) {
			theUi.wrapper = document.createElement('div');
			theUi.container.appendChild(theUi.wrapper);
			theUi.wrapper.setAttribute(
				'class',
				`${UiPrefix(COMPONENT_CLASS)}wrapper`
			);
			theUi.wrapper = theUi.container.querySelector(`.${UiPrefix(COMPONENT_CLASS)}wrapper`);
		}

		theUi.input = this.UiInput;


		if (!theUi.input) {
			theUi.input = document.createElement('span');
			theUi.wrapper.appendChild(theUi.input);
			theUi.input.setAttribute(
				'class',
				`${UiPrefix(COMPONENT_CLASS)}input`
			);
			theUi.input.contentEditable = true;
			theUi.input = theUi.wrapper.querySelector(`.${UiPrefix(COMPONENT_CLASS)}input`);

			if(element.hasAttribute('placeholder')){
				theUi.input.setAttribute(
					'data-placeholder',
					element.getAttribute('placeholder')
				);
			}

			//nearest fw-ui parent will actually do tgoggl for bby because baby cant stand up on its own
			if (element.hasAttribute('data-toggle')) {
				theUi.input.setAttribute(
					'data-toggle',
					element.getAttribute('data-toggle')
				);
			}

			if (FwComponent.isDisabled(element)) {
				theUi.input.classList.add('disabled');
			}

			//bitch
			if (this.args.onKeyUp) {
				theUi.input.addEventListener('keyup', (event)=>{
					const keyUpScript = eval(this.args.onKeyUp);
					if(keyUpScript){
						keyUpScript();
					};
				});
			}
		}

		//updoot tags
		const oldTags = theUi.wrapper.querySelectorAll(`.${UiPrefix(COMPONENT_CLASS)}tag`);

		oldTags.forEach((tag) => {
			tag.parentNode.removeChild(tag);
		});


		let valArr = FormTags.toArr(this.renderValue, true);

		theUi.input.setAttribute(
			'data-ui-i',
			this.UiInputIdx
		);

		//validate tags
		// valArr = valArr.reduce((acc, tag) => {
		// 	if (!acc.includes(tag)) {
		// 		acc.push(tag);
		// 	}
		// 	return acc;
		// }, []);

		valArr.forEach((tag, i) => {
			//get index of input
			if (tag !== FormTags.__is) {
				const tagHtml = document.createElement('span');

				if(i < this.UiInputIdx){
					theUi.input.insertAdjacentElement(
						'beforebegin',
						tagHtml
					);
				}else{
					theUi.wrapper.appendChild(tagHtml);
				}
				

				tagHtml.setAttribute(
					'class',
					`${UiPrefix(COMPONENT_CLASS)}tag`
				);

				tagHtml.innerHTML = `<button
						data-ui-i="${i}"
						class="${UiPrefix(COMPONENT_CLASS)}tag-text ${UiPrefix(COMPONENT_CLASS)}tag-button"
						type="button"
					>
						${tag}
					</button>
					<button data-ui-i="${i}" class="${UiPrefix(COMPONENT_CLASS)}tag-close ${UiPrefix(COMPONENT_CLASS)}tag-button" type="button">
						<i class="symbol symbol-close"></i>
					</button>`;
			}
		});

		//attribues
		for (let i = 0; i < element.attributes.length; i++) {
			let attr = element.attributes[i];

			if (attr.specified) {
				if (
					attr.name.includes('data')
					&& !attr.name.includes('data-tags')
					&& !attr.name.includes('data-toggle')
					&& !attr.name.includes('data-value-ui')
				) {
					theUi.container.setAttribute(attr.name, attr.value);
				}
			}
		}

		element.setAttribute('data-value-ui', this.renderValue);

		//keep that shoit bisibol
		this._scrollToUiInput();
		FwEvent.trigger(element,EVENT_AFTER_CREATE);
	}

	focus(disableNative){
		disableNative = disableNative || false;
		const self = this;
		!disableNative && setTimeout(function() {
			// console.log('poku','naAAANDATAAAOOOO');
			self.UiInput.focus();
		}, 0);
		self.UiRoot.classList.add(FOCUS_CLASS);
		self._scrollToUiInput();
	}

	blur(disableNative){
		disableNative = disableNative || false;
		const self = this;
		!disableNative && setTimeout(function() {
			// console.log('bru','naAAANDATAAAOOOO');
			self.UiInput.blur();
		}, 0);
		self.UiRoot.classList.remove(FOCUS_CLASS);
	}

	_render(){
		this.update();
	}

	static renderAll(){
		FwEvent.trigger(document,EVENT_BEFORE_INIT);

		const tagsInputs = document.querySelectorAll(`.${COMPONENT_CLASS}`);
		FwEvent.trigger(document,EVENT_INIT);
		
		tagsInputs.forEach((poot) => {
			const tagsInput = new FormTags(poot);
			
			tagsInput._render();
		});
		FwEvent.trigger(document,EVENT_AFTER_INIT);
	}

	static handleChange() {
		return (e) => {
			const tagsInput = new FormTags(e.target);
			tagsInput.update();
		}
	}

	static handleEditablePaste() {
		return (e) => {
			e.preventDefault();
			
			if (!FwComponent.isDisabled(e.target)) {
				const tagsInput = new FormTags(e.target
					.closest(`.${UiPrefix(COMPONENT_CLASS, true)}`)
					.querySelector(`.${COMPONENT_CLASS}`));

				const pasted =
					e.clipboardData
					|| window.clipboardData
					|| e.originalEvent.clipboardData;
				
				tagsInput.UiInputValue += pasted.getData('text');

				tagsInput.blur();
			}
		}
	}

	static handleEditableFocus() {
		return (e) => {
			e.preventDefault();
			if (!FwComponent.isDisabled(e.target)) {
				const tagsInput = new FormTags(e.target);
				tagsInput.focus();
			}
		}
	}

	static handleEditableBlur() {
		return (e) => {
	
			if (!FwComponent.isDisabled(e.target)) {
				const tagsInput = new FormTags(e.target
					.closest(`.${UiPrefix(COMPONENT_CLASS, true)}`)
					.querySelector(`.${COMPONENT_CLASS}`));
					//value para mareset ta kung hain si buloy
					let currValue = FormTags.toArr(tagsInput.theValue);
	
				if(
					tagsInput.UiInputValue
				){
					currValue.splice(
						tagsInput.UiInputIdx,
						0,
						tagsInput.UiInputValue.replace(',', '')
					);
				}
	
	
				tagsInput.UiInputValue = '';
	
				tagsInput.update(
					FormTags.toVal(currValue,false),
					true,
				);

				tagsInput.blur(true);
			}
		}
	}

	static handleEditableKeydown() {
		return (e) => {
			if (FwComponent.isDisabled(e.target)) {
				e.preventDefault();
	
			} else {
				const tagsInput = new FormTags(e.target
					.closest(`.${UiPrefix(COMPONENT_CLASS, true)}`)
					.querySelector(`.${COMPONENT_CLASS}`));
				let currUiValue = FormTags.toArr(tagsInput.renderValue),
					newValue,
					allowFilter = false;

				switch (e.key) {
					//enter
					case 'Enter':
						e.preventDefault();
						tagsInput.blur();
						break;
	
					//comma
					case ',':
						if (!Modifiers.hasActive()) {
							allowFilter = true;
							e.preventDefault();
							currUiValue.splice(
								tagsInput.UiInputIdx,
								0,
								tagsInput.UiInputValue.replace(',', '')
							);
	
							tagsInput.UiInputValue = '';
							

						}
						// currUiValue.splice()
						break;
	
					//left
					case 'ArrowLeft':
						if (!tagsInput.UiInputValue) {
							e.preventDefault();
							currUiValue = FwArray.moveItem(
								currUiValue,
								tagsInput.UiInputIdx,
								tagsInput.UiInputIdx > 0
								? tagsInput.UiInputIdx - 1
								: 0
							);
						}
	
						break;
	
					//right
					case 'ArrowRight':
						if (!tagsInput.UiInputValue) {
							e.preventDefault();
							currUiValue = FwArray.moveItem(
								currUiValue,
								tagsInput.UiInputIdx,
								tagsInput.UiInputIdx < currUiValue.length
									? tagsInput.UiInputIdx + 1
									: currUiValue.length - 1
							);
							// tagsInput._scrollToUiInput();
						}
						break;
	
					//up
					case 'ArrowUp':
						if (!tagsInput.UiInputValue) {
							e.preventDefault();
							currUiValue = FwArray.moveItem(
								currUiValue,
								tagsInput.UiInputIdx,
								0
							);
						}
	
						break;
	
					//down
					case 'ArrowDown':
						if (!tagsInput.UiInputValue) {
							e.preventDefault();
							currUiValue = FwArray.moveItem(
								currUiValue,
								tagsInput.UiInputIdx,
								currUiValue.length - 1
							);
							// tagsInput._scrollToUiInput();
						}
						break;
	
					//backspace
					case 'Backspace':
						if (!tagsInput.UiInputValue) {
							e.preventDefault();
							allowFilter = true;
							currUiValue.splice(
								tagsInput.UiInputIdx - 1,
								1
							);
						}
						break;
	
					//delete
					case 'Delete':
						if (!tagsInput.UiInputValue) {
							e.preventDefault();
							allowFilter = true;
							currUiValue.splice(
								tagsInput.UiInputIdx + 1,
								1
							);
						}
						break;
				}

	
				newValue = FormTags.toVal(currUiValue);
				// tagsInput._scrollToUiInput();
	
				tagsInput.update(
					newValue,
					allowFilter,
				);
			}
		}
	}
	

	static handleDelete() {
		return (e) => {
	
			e.preventDefault();
	
			if (!FwComponent.isDisabled(e.target)) {
	
				const tagsInput = new FormTags(e.target
					.closest(`.${UiPrefix(COMPONENT_CLASS, true)}`)
					.querySelector(`.${COMPONENT_CLASS}`));

				const tagToRemove = parseInt(e.target.getAttribute(
						'data-ui-i'
					));

				let currValue = FormTags.toArr(tagsInput.theValue);

				currValue.splice(
					parseInt(tagToRemove),
					1
				);
	
				const newValue = FormTags.toVal(currValue);
	
				tagsInput.update(
					newValue,
					true,
				);
			}
		}
	}
	

	static handleEdit() {
		return (e) => {
			const triggerer = e.target;
	
			e.preventDefault();
	
			if (!FwComponent.isDisabled(triggerer)) {

				const tagsInput = new FormTags(e.target
					.closest(`.${UiPrefix(COMPONENT_CLASS, true)}`)
					.querySelector(`.${COMPONENT_CLASS}`));

				const tagToEdit = parseInt(e.target.getAttribute(
					'data-ui-i'
				));

				let currValue = FormTags.toArr(tagsInput.theValue,false);

				currValue.splice(
					tagToEdit,
					1,
					FormTags.__is
				);
	
				const newUiValue = FormTags.toVal(currValue);
	
				tagsInput.update(
					null,
					false,
					newUiValue,
					e.target.innerText
				);
			}
		}
	}
	

	static initListeners() {

		FwEvent.addListener(
			document,
			EVENT_CHANGE,
			COMPONENT_CLASS,
			FormTags.handleChange()
		);

		FwEvent.addListener(
			document,
			EVENT_PASTE,
			`.${UiPrefix(COMPONENT_CLASS,true)} .${UiPrefix(COMPONENT_CLASS)}input`,
			FormTags.handleEditablePaste()
		);

		FwEvent.addListener(
			document,
			EVENT_CLICK,
			`.${UiPrefix(COMPONENT_CLASS,true)} .${UiPrefix(COMPONENT_CLASS)}input`,
			FormTags.handleEditableFocus()
		);

		FwEvent.addListener(
			document,
			EVENT_BLUR,
			`.${UiPrefix(COMPONENT_CLASS,true)} .${UiPrefix(COMPONENT_CLASS)}input`,
			FormTags.handleEditableBlur()
		);

		FwEvent.addListener(
			document,
			EVENT_KEYDOWN,
			`.${UiPrefix(COMPONENT_CLASS,true)} .${UiPrefix(COMPONENT_CLASS)}input`,
			FormTags.handleEditableKeydown()
		);

		FwEvent.addListener(
			document,
			EVENT_CLICK,
			`.${UiPrefix(COMPONENT_CLASS,true)} .${UiPrefix(COMPONENT_CLASS)}tag-close`,
			FormTags.handleDelete()
		);

		FwEvent.addListener(
			document,
			EVENT_CLICK,
			`.${UiPrefix(COMPONENT_CLASS,true)} .${UiPrefix(COMPONENT_CLASS)}tag-text`,
			FormTags.handleEdit()
		);

		FwFnsQ.on_ready = FormTags.renderAll;
		FwFnsQ.on_resize = FormTags.renderAll;

	}
}

export default FormTags;

FormTags.initListeners();