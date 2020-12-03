frameWork.initcomponentsEvents = () => {

	//hash events
	
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