frameWork.createModal = (triggerer, subcom) => {
	frameWork.destroyToolTip();
	
	subcom = subcom || 'modal';
	frameWork[subcom] = frameWork[subcom] || {};

	const contentWrap = __f.getTheToggled(triggerer, subcom);

	if(contentWrap || !window.location.hash){
		frameWork.destroyModal(null, subcom);
	}

	if (contentWrap && subcom) {

		const arr = {
			resize:
				(triggerer && triggerer.getAttribute(`data-${subcom}-resize`))
				|| contentWrap.getAttribute(`data-${subcom}-resize`),
			changeHash:
				(triggerer && triggerer.getAttribute(`data-${subcom}-change-hash`))
				|| contentWrap.getAttribute(`data-${subcom}-change-hash`),
			header:
				(triggerer && triggerer.getAttribute(`data-${subcom}-title`))
				|| contentWrap.getAttribute(`data-${subcom}-title`),
			close:
				(triggerer && triggerer.getAttribute(`data-${subcom}-close`))
				|| contentWrap.getAttribute(`data-${subcom}-close`),
			disableOverlay:
				(triggerer && triggerer.getAttribute(`data-${subcom}-disable-overlay`))
				|| contentWrap.getAttribute(`data-${subcom}-disable-overlay`),
			width:
				contentWrap.getAttribute(`data-${subcom}-width`)
				|| (triggerer && triggerer.getAttribute(`data-${subcom}-width`)),
			callback:
				(triggerer && triggerer.getAttribute(`data-${subcom}-callback`))
				|| contentWrap.getAttribute(`data-${subcom}-callback`),
			classes:
				(triggerer && triggerer.getAttribute(`data-${subcom}-classes`))
				|| contentWrap.getAttribute(`data-${subcom}-classes`),
			closeClasses:
				(triggerer && triggerer.getAttribute(`data-${subcom}-close-classes`))
				|| contentWrap.getAttribute(`data-${subcom}-close-classes`),
			align:
				(triggerer && triggerer.getAttribute(`data-${subcom}-align`))
				|| contentWrap.getAttribute(`data-${subcom}-align`),
		};

		const defaults = {
			resize: false,
			resizeClasses: null,
			changeHash: true,
			header: '',
			close: true,
			disableOverlay: true,
			width: null,
			callback: null,
			classes: '',
			closeClasses: '',
			align: 'left',
		};

		const args = __f.parseArgs(arr, defaults);

		const actualId = `${frameWork.settings.prefix}-${subcom}`;


		// console.log(contentWrap,arr,defaults,args);

		switch (subcom) {
			case 'modal':
				args.align = false;
				args.resize = false;
				args.resizeClasses = null;
				break;
		}

		const id = contentWrap.getAttribute('id') || actualId;

		id !== `${actualId}` && args.changeHash && __f.changeHash(id);

		const modal = document.createElement('div');
		document.querySelector('body').appendChild(modal);
		modal.className = `${frameWork.settings.prefix}-modal-component
			${subcom}-wrapper
			${args.classes}
			${args.align ? `${subcom}-${args.align}` : ''}`;
		modal.setAttribute('id', actualId);

		let html = '';

			//overlay
			html += `<a href="#"
					class="
						${subcom}-close-overlay"
						${
							args.disableOverlay == false
							? `data-toggle="${subcom}-close"`
							: ''
						}
				></a>`;

				switch (subcom) {
					case 'board':
						html += `<div class="${subcom}-button-wrapper">`;
							if (args.close !== false) {
								html += `<a href="#"
									class="
										${subcom}-close ${subcom}-button
										${
											args.closeClasses
											? args.closeClasses
											: `${subcom}-button-default`}"
									data-toggle="${subcom}-close"
								>
									<i class="symbol symbol-close "></i>
								</a>`;
							}

							if (args.resize !== false && args.width) {
								html += `<a
									class="
										${subcom}-resize ${subcom}-button
										${
											args.resizeClasses
											? args.resizeClasses
											: `${subcom}-button-default`}"
									data-toggle="${subcom}-resize"
								>
									<i class="symbol symbol-arrow-tail-left "></i>
									<i class="symbol symbol-arrow-tail-right "></i>
								</a>`;
							}
						html += `</div>`;

						html += `<div class="${subcom}-popup">`;

							if (args.header) {
								html += `<div class="${subcom}-header">
										<h1 class="${subcom}-title">${decodeURIComponent(args.header)}</h1>
									</div>`;
							}

							html += `<div class="${subcom}-popup-content"></div>`;

						html += `</div>`;

						break;

					case 'modal':
						html += `<div class="${subcom}-popup">`;

						if (args.header) {
							html += `<div class="${subcom}-header">
									<h1 class="${subcom}-title">${decodeURIComponent(args.header)}</h1>
								</div>`;
						}

						if (args.close !== false) {
							html += `<a href="#"
									class="${subcom}-close ${args.closeClasses}"
									data-toggle="${subcom}-close"
								>
									<i class="symbol symbol-close "></i>
								</a>`;
						}

						html += `<div class="${subcom}-popup-content"></div>`;

						html += `</div>`;
						
						break;
				}

		modal.innerHTML = html;

		frameWork.moveContents(
			contentWrap,
			modal.querySelector(`.${subcom}-popup-content`)
		);

		if (args.width) {
			frameWork.resizeModal(subcom,args.width,modal,args);
		}
		
		if (args.callback) {
			__f.runFn(args.callback);
		}

		frameWork[subcom].current = contentWrap;
		frameWork[subcom].args = args;

		modal.classList.add('active');
		document.body.classList.add('body-no-scroll');

		frameWork.checkOnModal(subcom);
	}
};


frameWork.checkOnModal = (subcom)=>{

	subcom = subcom || 'modal';

	const args = frameWork[subcom].args || {};
	const modal = document.getElementById(`${frameWork.settings.prefix}-${subcom}`);

	if(modal) {

		// buttons
			// resize
				const currentWidth = modal
					.querySelector(`.${subcom}-popup`).clientWidth;
					
				const resizeBtn = modal
					.querySelectorAll(`*[data-toggle="${subcom}-resize"]`);

				if(resizeBtn && currentWidth < parseInt(args.width)){
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
__f.fns_on_resize.push(frameWork.checkOnModal);

frameWork.resizeModal = (subcom,width,modal,args) => {
	subcom = subcom || 'modal';
	modal = modal ||  document.getElementById(`${frameWork.settings.prefix}-${subcom}`);
	args = args || frameWork[subcom].args || {};
	width = width || args.width || null;

	if(modal && parseInt(width) >= parseInt(args.width)){
		//all
		if(modal.querySelector(`.${subcom}-popup`)){
			modal.
				querySelector(`.${subcom}-popup`)
					.style.width = width;
		}

		//bboard
		if(modal.querySelector(`.${subcom}-button-wrapper`)){
			modal.
				querySelector(`.${subcom}-button-wrapper`)
					.style.width = width;
		}
	}
}

frameWork.destroyModal = (removeHash, subcom) => {
	removeHash = removeHash || false;
	subcom = subcom || 'modal';


	let canRemoveHash = false;

	if (
		removeHash
		&& frameWork[subcom].current.hasAttribute('id')
		&& frameWork[subcom].current.getAttribute('id') == window.location.hash.replace('#','')
	) {
		canRemoveHash = true;
	}

	const modal = document.querySelector(`.${subcom}-wrapper`);
	if (modal) {
		frameWork.moveContents(
			modal.querySelector(`.${subcom}-popup-content`),
			frameWork[subcom].current
		);

		modal.classList.remove('active');
		modal.parentNode.removeChild(modal);
	}

	frameWork[subcom].current = false;
	frameWork[subcom].args = false;


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

	canRemoveHash && __f.changeHash('');
};

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