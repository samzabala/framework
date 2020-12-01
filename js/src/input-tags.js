__f.tagsInputString = '__fw_input__';

//because input field is gonna go in between for backspacing capabilities
__f.tagsToParse = (value, returnWithInput) => {
	returnWithInput =
		returnWithInput !== false || returnWithInput == true;

	let toReturn = Array.isArray(value)
		? value
		: value.split(',') || [];

	//check for ya boi
	toReturn.forEach((tag, i) => {
		if (
			(!tag || tag == '')
			|| (tag === __f.tagsInputString && !returnWithInput)
		) {
			toReturn.splice(i, 1);
		}
	});

	if (returnWithInput && toReturn.indexOf(__f.tagsInputString) < 0) {
		toReturn.push(__f.tagsInputString);
	}

	//remove duplicates
	toReturn = toReturn.reduce((acc, tag) => {
		if (!acc.includes(tag)) {
			acc.push(tag);
		}

		return acc;
	}, []);

	return toReturn;
};

//because input field is gonna go in between for backspacing capabilities
__f.tagsToVal = (value, returnWithInput) => {
	value = value || '';
	return __f.tagsToParse(value, returnWithInput).join(',');
};

__f.createTagsUi = (inputTags, valueForUi, inputText, args) => {

	if (inputTags) {
		valueForUi = valueForUi || __f.tagsToVal(inputTags.value) || '';
		inputText = inputText || false;

		const theUi = {};

		theUi.container = inputTags.closest(`.${__f.uiPrefix('tags', true)}`);

		if (!theUi.container) {
			theUi.container = document.createElement('div');
			inputTags.parentNode.insertBefore(
				theUi.container,
				inputTags
			);
			theUi.container.appendChild(inputTags);
			theUi.container.classList.add('input');
			theUi.container.setAttribute(
				'class',
				`${frameWork.settings.uiClass}
				${frameWork.settings.uiJsClass}
				${
					inputTags
					.getAttribute('class').replace('input-tags', __f.uiPrefix('tags', true))
				}`
			);
		}

		theUi.container.classList.add(
			args.multipleLines
				? `${__f.uiPrefix('tags')}multiple`
				: `${__f.uiPrefix('tags')}single`
		);

		if (args.width) {
			theUi.container.style = args.width;
		}
		//idk it never exists on initial so we dont have to do weird div wraping catches here

		theUi.wrapper = theUi.container.querySelector(`.${__f.uiPrefix('tags')}wrapper`);

		if (!theUi.wrapper) {
			theUi.wrapper = document.createElement('div');
			theUi.container.appendChild(theUi.wrapper);
			theUi.wrapper.setAttribute(
				'class',
				`${__f.uiPrefix('tags')}wrapper`
			);
			theUi.wrapper = theUi.container.querySelector(`.${__f.uiPrefix('tags')}wrapper`);
		}

		theUi.input = theUi.wrapper.querySelector(`.${__f.uiPrefix('tags')}input`);

		if (!theUi.input) {
			theUi.input = document.createElement('span');
			theUi.wrapper.appendChild(theUi.input);
			theUi.input.setAttribute(
				'class',
				`${__f.uiPrefix('tags')}input`
			);
			theUi.input.contentEditable = true;
			theUi.input = theUi.wrapper.querySelector(`.${__f.uiPrefix('tags')}input`);

			if (args.callbackOnKeyup) {
				theUi.input.addEventListener('keyup', (event)=>{
					const keyUpScript = eval(args.callbackOnKeyup);
					if(keyUpScript){
						keyUpScript();
					};
				});
			}
		}


		if(inputTags.hasAttribute('placeholder')){
			theUi.input.setAttribute(
				'data-placeholder',
				inputTags.getAttribute('placeholder')
			);
		}

		//nearest fw-ui parent will actually do tgoggl for bby because baby cant stand up on its own
		if (inputTags.hasAttribute('data-toggle')) {
			theUi.input.setAttribute(
				'data-toggle',
				inputTags.getAttribute('data-toggle')
			);
		}

		if (frameWork.isDisabled(inputTags)) {
			theUi.input.classList.add('disabled');
		}

		const oldTags = theUi.wrapper.querySelectorAll(`.${__f.uiPrefix('tags')}tag`);

		oldTags.forEach((tag) => {
			tag.parentNode.removeChild(tag);
		});

		let valArr = __f.tagsToParse(valueForUi, true);
		const inputIn = valArr.indexOf(__f.tagsInputString);

		theUi.input.setAttribute('data-value', inputIn);

		//validate tags
		valArr = valArr.reduce((acc, tag) => {
			if (!acc.includes(tag)) {
				acc.push(tag);
			}
			return acc;
		}, []);

		valArr.forEach((tag, i) => {
			//get index of input
			if (tag !== __f.tagsInputString) {
				const tagHtml = document.createElement('span');

				if (i < inputIn) {
					theUi.input.insertAdjacentElement(
						'beforebegin',
						tagHtml
					);
				} else {
					theUi.wrapper.appendChild(tagHtml);
				}
				tagHtml.setAttribute(
					'class',
					`${__f.uiPrefix('tags')}tag`
				);

				tagHtml.innerHTML = `<span
						data-value="${i}"
						class="${__f.uiPrefix('tags')}tag-text"
					>
						${tag}
					</span>
					<a data-value="${i}" class="${__f.uiPrefix('tags')}tag-close" href="#">
					<i class="symbol symbol-close"></i></a>`;
			}
		});

		//attribues
		for (let i = 0; i < inputTags.attributes.length; i++) {
			let attr = inputTags.attributes[i];

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

		inputTags.setAttribute('data-value-ui', valueForUi);

		//keep that shoit to the right
		theUi.container.scrollTo(theUi.input, 'x');

		//jquery u duuumb
		if (inputText) {
			theUi.input.innerText = inputText;
			theUi.input.focus();
		}
	}
};

frameWork.updateTags = (inputTags, allowFilter, newValue, valueForUi, inputText) => {
	let theValue = newValue
	|| ((inputTags.value !== '') && inputTags.value)
	|| '';

	inputText = inputText || false;
	valueForUi = valueForUi || theValue || '';
	allowFilter = allowFilter != false;

	const arr = {
		width:
			inputTags.getAttribute('data-tags-width'),
		callback:
			inputTags.getAttribute('data-tags-callback'),
		callbackOnKeyup:
			inputTags.getAttribute('data-tags-callback-on-keyup'),
		callbackNameFilter:
			inputTags.getAttribute('data-tags-callback-name-filter'),
		multipleLines:
			inputTags.getAttribute('data-tags-multiple-lines'),
	};

	const defaults = {
		width: null,
		callback: null,
		callbackNameFilter: null,
		callbackOnKeyup: null,
		multipleLines: false,
	};

	const args = __f.parseArgs(arr, defaults);

	if (inputTags) {
		if (args.callbackNameFilter && allowFilter) {
			let fnToFilter;

			try {
				fnToFilter = eval(args.callbackNameFilter);
			} catch (err) {}

			if (typeof fnToFilter === 'function') {
				const applyFilter = (valueToFilter, filterFnName) => {
					const inputIndex = __f.tagsToParse(valueToFilter)
							.indexOf(__f.tagsInputString),
						noInputValueToFilter = (() => {
								return __f.tagsToVal(valueToFilter, false);
							})();

					// turn to array ya bopi without the input tag string
					let toReturn = __f.tagsToParse(
						eval(`${filterFnName}("${noInputValueToFilter}")`),
						false
					);

					// console.log(
					// 	'index of input\n',inputIndex,
					// 	'\n\n\nfiltered and ready for splice\n',toReturn,
					// 	'\n\n\npassed to the fil;ter\n',__f.tagsToVal(valueToFilter,false),
					// 	'\n\n\nrar array\n',__f.tagsToParse(valueToFilter),
					// 	'\n\n\n no input field\n',noInputValueToFilter,__f.tagsToVal(valueToFilter,false),
					// 	'\n\n\n no input fieldas array\n',__f.tagsToParse(valueToFilter,false),
					// 	'\n\n\n string for eval\n', ( filterFnName +'("'+ noInputValueToFilter +'")'),
					// 	'\n\n\neval\n',  eval(filterFnName +'("'+ noInputValueToFilter +'")'),
					// 	'whAT ETHE FUCK'
					// );

					if (inputIndex > -1) {
						toReturn.splice(
							inputIndex <
								__f.tagsToParse(valueToFilter).length - 1
								? inputIndex
								: toReturn.length,
							0,
							__f.tagsInputString
						);
					}

					return __f.tagsToVal(toReturn);
				};

				theValue = applyFilter(
					theValue,
					args.callbackNameFilter
				);
				valueForUi = applyFilter(
					valueForUi,
					args.callbackNameFilter
				);
			}
		}

		__f.createTagsUi(
			inputTags,
			__f.tagsToVal(valueForUi),
			inputText,
			args
		);

		//update the actual butt
		inputTags.setAttribute('value', __f.tagsToVal(theValue, false));
		inputTags.value = __f.tagsToVal(theValue, false);

		//ATODO UPDATE SETUP HERE
		//update fake hoes
		if (args.callback) {
			__f.runFn(args.callback);
		}
	}
};



frameWork.readyTags = () => {
	const inputTags = document.querySelectorAll('.input-tags');

	inputTags.forEach((input) => {
		frameWork.updateTags(input);
	});
};
__f.fns_on_load.push(frameWork.readyTags);
__f.fns_on_resize.push(frameWork.readyTags);


frameWork.readyTags = () => {
	const inputTags = document.querySelectorAll('.input-tags');

	inputTags.forEach((input) => {
		frameWork.updateTags(input);
	});
};
__f.fns_on_load.push(frameWork.readyTags);
__f.fns_on_resize.push(frameWork.readyTags);
