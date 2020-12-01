frameWork.initcomponentsEvents = () => {

	//hash events
		window.addEventListener('hashchange', () => {
			frameWork.settings.initializeModal && frameWork.createModal();
			frameWork.settings.initializeModal && frameWork.createBoard();
			frameWork.settings.initializeAccordion && frameWork.toggleAccordion();
		});
	
	//windu events
		window.addEventListener('resize', frameWork.runResize);

		window.addEventListener('scroll', frameWork.runScroll);

	//key events
		document.documentElement.addEventListener(
			'keydown',
			(e) => {
				switch (e.keyCode) {
					//shift
					case 16:
						__f.modifierKeys.shift = true;
						break;
					// control
					case 17:
						__f.modifierKeys.ctrl = true;
						break;
					//op/alt
					case 18:
						__f.modifierKeys.alt = true;
						break;
					//meta
					case 91:
						__f.modifierKeys.meta = true;
						break;
				}
			}
		);

		document.documentElement.addEventListener(
			'keyup',
			(e) => {
				setTimeout(() => {
					switch (e.keyCode) {
						//shift
						case 16:
							__f.modifierKeys.shift = false;
							break;
						// control
						case 17:
							__f.modifierKeys.ctrl = false;
							break;
						//op/alt
						case 18:
							__f.modifierKeys.alt = false;
							break;
						//meta
						case 91:
							__f.modifierKeys.meta = false;
							break;
					}
				}, 100);
			}
		);

	//component events
		frameWork.addEvent(
			document.documentElement,
			'change',
			'.input-calendar',
			(e) => {
				const triggerer = e.target;
				frameWork.updateCalendar(triggerer);
			}
		);

		frameWork.addEvent(
			document.documentElement,
			'click', 
			'a.input-calendar-ui-date',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					const inputCalendar = triggerer
						.closest('.input-calendar-ui')
						.querySelector('.input-calendar');

					if (inputCalendar) {
						frameWork.updateCalendar(
							inputCalendar,
							e.target.getAttribute('data-value'),
							null
						);
					}
				}
			}
		);

		frameWork.addEvent(
			document.documentElement,
			'click',
			'a.input-calendar-ui-navigation, .input-calendar-ui-month',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					const inputCalendar = triggerer
						.closest('.input-calendar-ui')
						.querySelector('.input-calendar');

					if (inputCalendar) {
						frameWork.updateCalendar(
							inputCalendar,
							null,
							e.target.getAttribute('data-value')
						);
					}
				}
			}
		);

		frameWork.addEvent(
			document.documentElement,
			'keyup',
			'.input-calendar-ui-input input',
			(e) => {
				const triggerer = e.target;

				if (frameWork.isDisabled(triggerer)) {
					e.preventDefault();

				} else {
					const inputCalendar = e.target
						.closest('.input-calendar-ui')
						.querySelector('.input.input-calendar');

					const v = e.target.value;
					if (v.match(/^\d{2}$/) !== null) {
						e.target.value = `${v}/`;
					} else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
						e.target.value = `${v}/`;
					}

					const pattern = new RegExp(
						__f.datetimeFormatPresets.HumanDate.pattern
					);

					const isValid = pattern.test(v);

					if (isValid) {
						const theValue = v.split('/');

						const y = theValue[2] || '';
						const m = theValue[0] || '';
						const d = theValue[1] || '';

						const preParsedVal = `${y}-${m}-${d}`;

						frameWork.updateCalendar(
							inputCalendar,
							preParsedVal
						);
					}
				}
			}
		);

		frameWork.addEvent(
			document.documentElement,
			'change',
			'.input-tags',
			(e) => {
				const triggerer = e.target;
				frameWork.updateTags(triggerer);
			}
		);

		frameWork.addEvent(
			document.documentElement,
			'paste',
			'.input-tags-ui .input-tags-ui-input',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					const pasted =
						e.clipboardData
						|| window.clipboardData
						|| e.originalEvent.clipboardData;

					triggerer.innerHTML += pasted.getData('text');

					triggerer.blur();
				}
			}
		);


		frameWork.addEvent(
			document.documentElement,
			'click',
			'.input-tags-ui .input-tags-ui-input',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					setTimeout(function() {
						triggerer.focus();
					}, 0);
				}
			}
		);

		//blur bitch blurr
		frameWork.addEvent(
			document.documentElement,
			'blur',
			'.input-tags-ui .input-tags-ui-input',
			(e) => {

				const triggerer = e.target;

				if (!frameWork.isDisabled(triggerer)) {
					const inputTags = triggerer
							.closest('.input-tags-ui')
							.querySelector('.input-tags'),
						inputUiIndex = triggerer.getAttribute('data-value'),
						currValue = __f.tagsToParse(inputTags.value);

					if(triggerer.innerText && triggerer.innerText != ''){
						currValue.splice(
							parseInt(inputUiIndex),
							0,
							triggerer.innerText.replace(',', '')
						);
					}

					triggerer.innerText = '';

					// const newValue = __f.arrMoveItem(currValue,parseInt(inputUiIndex), currValue.length -1);

					frameWork.updateTags(
						inputTags,
						true,
						__f.tagsToVal(currValue)
					);
				}
			}
		);

		//key events on focus bitch
		frameWork.addEvent(
			document.documentElement,
			'keydown',
			'.input-tags-ui .input-tags-ui-input',
			(e) => {
				const triggerer = e.target;

				if (frameWork.isDisabled(triggerer)) {
					e.preventDefault();

				} else {
					const inputTags = triggerer
							.closest('.input-tags-ui')
							.querySelector('.input-tags'),
						inputUiIndex = triggerer.getAttribute('data-value'),
						currValue = __f.tagsToParse(
							inputTags.getAttribute('data-value-ui')
						);

					let newValue,
						allowFilter = false;

					inputTags.innerText = inputTags.innerText.replace(
						/\n|\r/g,
						'\\n'
					);

					switch (e.keyCode) {
						//enter
						case 13:
							e.preventDefault();
							break;

						//comma
						case 188:
							if (!__f.modifierIsActive()) {
								allowFilter = true;
								e.preventDefault();
								currValue.splice(
									parseInt(inputUiIndex),
									0,
									triggerer.innerText.replace((',', ''))
								);

								triggerer.innerText = '';
							}
							// currValue.splice()
							break;

						//left
						case 37:
							if (!triggerer.textContent) {
								e.preventDefault();
								__f.arrMoveItem(
									currValue,
									parseInt(inputUiIndex),
									parseInt(inputUiIndex) - 1 >= 0
										? parseInt(inputUiIndex) - 1
										: 0
								);
							}

							break;

						//right
						case 39:
							if (!triggerer.textContent) {
								e.preventDefault();
								__f.arrMoveItem(
									currValue,
									parseInt(inputUiIndex),
									parseInt(inputUiIndex) + 1 <= currValue.length - 1
										? parseInt(inputUiIndex) + 1
										: currValue.length - 1
								);
							}
							break;

						//backspace
						case 8:
							if (!triggerer.textContent) {
								e.preventDefault();
								allowFilter = true;
								currValue.splice(
									parseInt(inputUiIndex) - 1,
									1
								);
							}
							break;

						//delete
						case 46:
							if (!triggerer.textContent) {
								e.preventDefault();
								allowFilter = true;
								currValue.splice(
									parseInt(inputUiIndex) + 1,
									1
								);
							}
							break;
					}

					newValue = __f.tagsToVal(currValue);

					frameWork.updateTags(
						inputTags,
						allowFilter,
						newValue
					);
				}
			}
		);

		//on click on the text, edit it via input and input should be focused and in place of the tag

		frameWork.addEvent(
			document.documentElement,
			'click',
			'.input-tags-ui .input-tags-ui-tag-close',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				const inputTags = triggerer
					.closest('.input-tags-ui')
					.querySelector('.input-tags');

				if (!frameWork.isDisabled(triggerer)) {
					const tagToRemove = triggerer.getAttribute(
							'data-value'
						),
						currValue = __f.tagsToParse(
							inputTags.getAttribute('data-value-ui')
						);
					currValue.splice(parseInt(tagToRemove), 1);

					const newValue = __f.tagsToVal(currValue);

					frameWork.updateTags(
						inputTags,
						true,
						newValue
					);
				}
			}
		);

		frameWork.addEvent(
			document.documentElement,
			'click',
			'.input-tags-ui .input-tags-ui-tag-text',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					const tagText = triggerer.innerText,
						inputTags = triggerer
							.closest('.input-tags-ui')
							.querySelector('.input-tags'),
						tagToEdit = triggerer.getAttribute('data-value'),
						currValue = __f.tagsToParse(
							inputTags.getAttribute('data-value-ui'),
							false
						);
					currValue.splice(
						parseInt(tagToEdit),
						1,
						__f.tagsInputString
					);

					const uiValue = __f.tagsToVal(currValue);

					frameWork.updateTags(
						inputTags,
						false,
						null,
						uiValue,
						tagText
					);
				}
			}
		);

		frameWork.addEvent(
			document.documentElement,
			'click',
			'*[data-toggle="accordion"]',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();
				if (!frameWork.isDisabled(triggerer)) {
					frameWork.toggleAccordion(
						triggerer,
						true
					);
				}
			}
		);

		frameWork.addEvent(
			document.documentElement,
			'click',
			'*[data-toggle="alert-close"]',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					const selector = __f.getTheToggled(triggerer,'alert-close');

					if (selector) {
						selector.parentNode.removeChild(selector);
					}
				}
			}
		);

		frameWork.addEvent(
			document.documentElement,
			'click',
			'*[data-toggle="alert-close-all"]',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					const selector = document.querySelectorAll('.alert');

					if (selector.length) {
						selector.forEach((alert) => {
							if (
								alert.querySelectorAll('[data-toggle="alert-close"]').length
							) {
								alert.parentNode.removeChild(alert);
							}
						});
					}
				}
			}
		);

		frameWork.addEvent(
			document.documentElement,
			'focus',
			`input[data-toggle="dropdown"], *[contenteditable][data-toggle="dropdown"], .${frameWork.settings.uiJsClass} [contenteditable]`,
			(e) => {
				const uiTrigger = e.target;

				if (frameWork.isDisabled(uiTrigger)) {
					uiTrigger.blur();

				} else {
					const triggerer = __f.getTheUiTriggerer(uiTrigger);
					const selector = __f.getTheToggled(
						triggerer,
						'dropdown'
					);

					if (selector) {
						frameWork.setDropdown(
							selector,
							triggerer,
							'open'
						);
					}

					triggerer.classList.add('focus');
				}
			}
		);

		frameWork.addEvent(
			document.documentElement,
			'blur',
			`input[data-toggle="dropdown"], *[contenteditable][data-toggle="dropdown"], .${frameWork.settings.uiJsClass} [contenteditable]`,
			(e) => {
				const uiTrigger = e.target;

				if (!frameWork.isDisabled(uiTrigger)) {
					const triggerer = __f.getTheUiTriggerer(uiTrigger);

					const selector = __f.getTheToggled(triggerer,'dropdown');

					setTimeout(() => {
						if (selector) {
							frameWork.setDropdown(
								selector,
								triggerer,
								'close'
							);
						}
					}, 200);
					triggerer.classList.remove('focus');
				}
			}
		);

		frameWork.addEvent(
			document.documentElement,
			'click',
			`*[data-toggle="dropdown"]:not(input):not([contenteditable]):not(.${frameWork.settings.uiJsClass})`,
			(e) => {
				const uiTrigger = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(uiTrigger)) {
					const triggerer = __f.getTheUiTriggerer(uiTrigger),
						selector = __f.getTheToggled(triggerer, 'dropdown');

					if (selector) {
						const selectorAncestor = selector.closest('li, .nav-item');

						frameWork.setDropdown(
							selector,
							triggerer
						);

						if (selector.classList.contains('open')) {
							selectorAncestor
								&& selectorAncestor.classList.remove('open');
							// frameWork.slideUp(selector);
							triggerer.classList.remove('open');

						} else {
							if (selectorAncestor) {
								const selectorUncles = frameWork
									.getSiblings(selectorAncestor)
									.filter((sibling) => {
										return sibling.matches(
											'li, .nav-item'
										);
									});
								selectorUncles.forEach((sibling) => {
									sibling.classList.remove('open');
								});
							}

							// frameWork.slideDown(selector);
							triggerer.classList.add('open');
						}
					}
				}
			}
		);

		frameWork.addEvent(
			document.documentElement,
			'click',
			'.tab, .tab > *',
			(e) => {
				const triggerer = e.target;

				if (frameWork.isDisabled(triggerer)) {
					e.preventDefault();

				} else {
					const theTab = triggerer.closest('.tab');

					if (theTab) {
						if (!theTab.classList.contains('active')) {
							const triggererSiblings = frameWork.getSiblings(
								theTab
							);
							triggererSiblings
								.filter((sibling) => {
									return (
										sibling.matches('.tab')
										|| sibling.matches('li')
									);
								})
								.forEach((sibling) => {
									sibling.classList.remove('active');
								});

							theTab.classList.add('active');
						}
					}
				}
			}
		);

		// btn group
		frameWork.addEvent(
			document.documentElement,
			'click',
			'.btn-group-toggle > .btn',
			(e) => {

				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					__f.toggleGroup(triggerer, 'btn');
				}
			}
		);

		// btn group
		frameWork.addEvent(
			document.documentElement,
			'click',
			'.list-group-toggle .list-group-item, .list-group-toggle li',
			(e) => {
				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					__f.toggleGroup(
						triggerer,
						'list',
						'li, .list-group-item',
						null,
						'list-group-toggle-allow-no-active'
					);
				}
			}
		);

		//tooltip
		frameWork.addEvent(
			document.documentElement,
			'click',
			'*[data-toggle="tooltip-click"]',
			(e) => {

				const triggerer = e.target;

				e.preventDefault();

				if (!frameWork.isDisabled(triggerer)) {
					frameWork.createToolTip(triggerer);
				}
			}
		);

		frameWork.addEvent(
			document.documentElement,
			'mouseenter',
			'*[data-toggle="tooltip-hover"]',
			(e) => {

				const triggerer = e.target;

				if (frameWork.isDisabled(triggerer)) {
					e.preventDefault();

				} else {
					frameWork.createToolTip(triggerer);
				}
			}
		);

		frameWork.addEvent(
			document.documentElement,
			'mouseleave',
			'*[data-toggle="tooltip-hover"]',
			(e) => {
				frameWork.destroyToolTip();
			}
		);

		frameWork.addEvent(
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

		frameWork.addEvent(
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

		frameWork.addEvent(
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

		frameWork.addEvent(
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

		frameWork.addEvent(
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

				if(frameWork.board.args.align == 'right'){
					newWidth = widthBasis
				}else if(frameWork.board.args.align == 'left'){
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

			frameWork.addEvent(
				document.documentElement,
				'mousedown',
				'*[data-toggle="board-resize"]',
				(e) => {
					e.preventDefault();
					initBoardResize(e);
				}
			);

				frameWork.addEvent(
					document.documentElement,
					'touchstart',
					'*[data-toggle="board-resize"]',
					initBoardResize
				);

		

		frameWork.addEvent(
			document.documentElement,
			'click',
			'*[data-toggle="switch-off"]',
			(e) => {
				const triggerer = e.target;

				if (!frameWork.isDisabled(triggerer)) {
					frameWork.initSwitch(triggerer,'off')
				}else{
					e.preventDefault();
				}
			}
		);

		frameWork.addEvent(
			document.documentElement,
			'click',
			'*[data-toggle="switch-on"]',
			(e) => {
				const triggerer = e.target;

				if (!frameWork.isDisabled(triggerer)) {
					frameWork.initSwitch(triggerer,'on')
				}else{
					e.preventDefault();
				}
			}
		);

		frameWork.addEvent(
			document.documentElement,
			'change',
			'.zone input[type="file"]',
			(e) => {
				const triggerer = e.target;
				const zone = triggerer.closest('.zone');
				const files = triggerer.files;

				const zoneDyText = zone.querySelector('.zone-has-content-text');
				zoneDyText && zoneDyText.parentNode.removeChild(zoneDyText);

				if (triggerer.value && files.length) {
					zone.classList.add('zone-has-content');

					zone.innerHTML += `<div class="zone-has-content-text">
							<span>${files.length} files selected.<br> Click or drag and drop to reselect</span>
						</div>`;

				} else {
					zone.classList.remove('zone-has-content');
				}
			}
		);

		frameWork.addEvent(
			document.documentElement,
			'click',
			'*',
			(e) => {
				const triggerer = e.target;

				if (frameWork.isDisabled(triggerer)) {
					e.preventDefault();
				} else {
					if(
						!triggerer.hasAttribute('data-value') //temp fix for ui elements not getting ancestry
					){
						
						//tooltip
						if (
							!triggerer.closest('[data-toggle="tooltip-click"]')
							&& !triggerer.closest('[data-toggle="tooltip-hover"]')
							&& !triggerer.closest('.tooltip.tooltip-allow-interaction')
						) {
							frameWork.destroyToolTip();
						}
			
						//dropdown
						if (
							!triggerer.closest('[data-toggle="dropdown"]')
							&& !triggerer.closest('.dropdown')
						) {
							frameWork.closeDropdowns(false);
						}

						//switch
						if (
							!triggerer.closest('[data-toggle="switch-off"]')
							&& !triggerer.closest('[data-toggle="switch-on"]')
							&& !triggerer.closest('.switch')
						){
							frameWork.initSwitch(false,'off')
						}
					}
				}
			}
		);
}

frameWork.runInit = () => {
	// console.warn(__f.fns_on_rightAway,'Running initiation sequence ooooOOOOoo');
	// //will run. right away. boi
	__f.fns_on_rightAway.forEach((fn) => {
		fn();
	});
};

frameWork.runReady = () => {
	// console.warn(__f.fns_on_ready,'Running ready sequence ooooOOOOoo');
	__f.fns_on_ready.forEach((fn) => {
		fn();
	});

	frameWork.setCompleteState();
};

frameWork.runLoad = () => {
	// console.warn(__f.fns_on_load,'Running load sequence ooooOOOOoo');
	__f.fns_on_load.forEach((fn) => {
		fn();
	});

	frameWork.settings.initializeModal
		&& frameWork.createModal();
	frameWork.settings.initializeBoard
		&& frameWork.createBoard();
	frameWork.settings.initializeAccordion
		&& frameWork.toggleAccordion();
};

let resizeTimerInternal;
frameWork.runResize = () => {
	clearTimeout(resizeTimerInternal);

	resizeTimerInternal = setTimeout(() => {
		__f.fns_on_resize.forEach((fn) => {
			fn();
		});
	}, 100);
};

let scrollTimerInternal;
frameWork.runScroll = () => {
	clearTimeout(scrollTimerInternal);

	scrollTimerInternal = setTimeout(() => {
		__f.fns_on_scroll.forEach((fn) => {
			fn();
		});
	}, 100);
};

frameWork.setState = (mode) => {
	mode = mode || 'complete';

	switch(mode){
		case 'loading':
			document.body
				.classList
				.remove('body-loaded');
			document.body
				.classList
				.add('body-loading');
			break;
		case 'complete':
		default:
			setTimeout(()=>{ 
				document.body
					.classList
					.remove('body-loading');
				document.body
					.classList
					.add('body-loaded');
			},100);
			break;
	}

}

frameWork.setLoadingState = () => {
	frameWork.setState('loading');
}

frameWork.setCompleteState = () => {
	frameWork.setState('complete');

}

frameWork.reInit = () => {
	frameWork.setLoadingState();
	frameWork.runInit();
	frameWork.runReady();
	frameWork.runLoad();
};

frameWork.runInit();

frameWork.docReady(frameWork.runReady);

window.addEventListener('load',frameWork.runLoad);

frameWork.initcomponentsEvents();

//put boi on global
if (typeof setUpGlobal !== "undefined") {
	window.frameWork = window.fw = frameWork;
	window.frameWork.DEBUG = __f;
}