frameWork.toggleAccordion = (triggerer, changeHash) => {
	changeHash = changeHash != false;

	const selector = __f.getTheToggled(triggerer, 'accordion');

	if (selector) {
		let accClassAns = selector.parentNode.closest('.accordion,.accordion-group');


		//has to actually be accordion-group closest before accordion
		if(
			!accClassAns
			|| (
				accClassAns
				&& !accClassAns.classList.contains('accordion-group')
			)
		) {
			accClassAns = false;
		}


		if (
			accClassAns
			&& !accClassAns.matches('.accordion-group-multiple')
		) {


			__f.funFnForTrueChildren(
				accClassAns,'[data-toggle="accordion"],.accordion',
				'.accordion-group',
				(accBbies)=>{
					if(
						(
							triggerer
							&& (accBbies !== triggerer)
							&& (accBbies !== selector)
						)
						|| (
							!triggerer
							&& (accBbies !== selector)
						)
					){
						accBbies.classList.remove('open')
					}
				}
			);
		}

		//only work on accordion-mobile on mobile breakpoints or accordion bois on everiything watwat?? english is confusing
		if (
			!(
				selector.classList.contains('accordion-mobile')
				&& !frameWork.validateBr(BrMobileMax, 'below')
			)
		) {
			if (triggerer) {
				const arr = {
					changeHash:
						(triggerer && triggerer.getAttribute('data-accordion-change-hash'))
						|| selector.getAttribute('data-accordion-change-hash'),
				};

				const defaults = {
					changeHash: changeHash,
				};

				const args = __f.parseArgs(arr, defaults);

				if (
					selector.classList.contains('open')
					&& triggerer.classList.contains('open')
				) {
					if (
						!accClassAns
						|| (
							accClassAns
							&& !accClassAns.classList.contains('accordion-group-no-close')
						)
					) {
						// frameWork.slideUp(selector);
						triggerer.classList.remove('open');
						selector.classList.remove('open');

						if (args.changeHash && selector.hasAttribute('id')) {
							__f.changeHash('');
						}
					}
				} else {

					// frameWork.slideDown(selector);
					triggerer.classList.add('open');
					selector.classList.add('open');

					if (args.changeHash && selector.hasAttribute('id')) {
						__f.changeHash(selector.getAttribute('id'));
					}
				}
			} else {

				const probablyToggle = document.querySelectorAll(
					`[data-toggle="accordion"][href="#${selector.getAttribute('id')}"],
					[data-toggle="accordion"][data-href="#${selector.getAttribute('id')}"]`
				);

				selector.classList.add('open');
				probablyToggle.forEach((toggle) => {
					toggle.classList.add('open');
				});

				window.scrollTo({
					top:
						selector.getBoundingClientRect().top +
						window.pageYOffset,
					left:
						selector.getBoundingClientRect().top +
						window.pageXOffset,
					behavior: 'smooth',
				});
			}
		}
	}
};


window.addEventListener('hashchange', () => {
	frameWork.settings.initializeAccordion && frameWork.toggleAccordion();
});

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

