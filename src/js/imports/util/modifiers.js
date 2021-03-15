const Modifiers =  {
	keys: {
		ctrl: false,
		shift: false,
		alt: false,
		meta: false,
	},
	hasActive(key) {
		key = key || false;
	
		if (key && this.keys.hasOwnProperty(key)) {
			return this.keys[key];
			
		} else {
			return (
				this.keys.ctrl
				|| this.keys.shift
				|| this.keys.alt
				|| this.keys.meta
			);
		}
	},
	update(event){
		this.keys.shift = event.shiftKey;
		this.keys.ctrl = event.ctrlKey;
		this.keys.alt = event.altKey;
		this.keys.meta = event.metaKey;
	}
	
}

//key events
	document.addEventListener(
		'keydown',
		(e) => {
			Modifiers.update(e);
		}
	);

	document.addEventListener(
		'keyup',
		(e) => {
			setTimeout(() => {
				Modifiers.update(e);
			}, 100);
		}
	);

export default Modifiers