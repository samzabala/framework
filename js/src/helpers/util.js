

const addEvent = (parent, evt, selector, handler) => {
	parent = parent || selector;

	parent.addEventListener(
		evt,
		(event) => {
			if (event.target.matches(selector + ', ' + selector + ' *')) {
				// try {
					handler(event);
				// } catch(e) {}
			}
		},
		true
	);

};

const triggerEvent = (el, evt) => {
	const event = document.createEvent('HTMLEvents');

	event.initEvent(evt, true, false);
	el.dispatchEvent(event);

};

const slideDown = (elem) => {
	elem && (elem.style.display = 'block');
};

const slideUp = (elem) => {
	elem && (elem.style.display = 'none');
};

const getSiblings = (elem) => {

	return Array.prototype.filter.call(
		elem.parentNode.children,
		(child) => {
			return child !== elem;
		}
	);

};

const getAncestors = (elem, selector) => {

	const parents = [];
	let firstChar;

	if (selector) {
		firstChar = selector.charAt(0);
	}

	// Get matches
	for (; elem && elem !== document; elem = elem.parentNode) {

		if (selector) {
			// If selector is a class
			if (firstChar === '.') {
				if (elem.classList.contains(selector.substr(1))) {
					parents.push(elem);
				}
			}

			// If selector is an ID
			if (firstChar === '#') {
				if (elem.id === selector.substr(1)) {
					parents.push(elem);
				}
			}

			// If selector is a data attribute
			if (firstChar === '[') {
				if (
					elem.hasAttribute(selector.substr(1, selector.length - 1))
				) {
					parents.push(elem);
				}
			}

			// If selector is a tag
			if (elem.tagName.toLowerCase() === selector) {
				parents.push(elem);
			}

		} else {
			parents.push(elem);
		}

	}
	// Return parents if any exist
	if (parents.length === 0) {
		return null;
	} else {
		return parents;
	}
};

const docReady = (fn) => {
	if (document.readyState != 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
};

const moveContents = (oldParent, newParent) => {
	if (newParent && newParent !== oldParent) {
		while (oldParent.childNodes.length > 0) {
			newParent.appendChild(oldParent.childNodes[0]);
		}
	}
};

export { 
	addEvent,
	triggerEvent,
	slideDown,
	slideUp,
	getSiblings,
	getAncestors,
	docReady,
	moveContents,
}