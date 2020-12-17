


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
