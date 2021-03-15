import FwDataHelper from './../classes/data-helper.js';


class FwDom extends FwDataHelper {

	constructor(data){

		super(
			data,
			(dat) => {
				
				let toReturn;
			
				if(typeof dat === 'string'){
					// console.log('looks like a selector');
					const selection = document.querySelectorAll(dat);
		
					if(selection.length > 1){
						toReturn = selection;
					}else{
						toReturn = document.querySelector(dat);
					}
				}else{
					// console.log('looks like a dom obj');
					toReturn = dat;
				}
	
				return toReturn;
			}
		);
		
	}

	

	static slideDown(elem){
		elem = elem || super.getData();
		elem && (elem.style.display = 'block');

		return elem
	}

	static slideUp(elem){
		elem = elem || super.getData();
		elem && (elem.style.display = 'none');

		return elem
	}

	static getSiblings(elem){
		elem = elem || super.getData();
		return Array.prototype.filter.call(
			elem.parentNode.children,
			(child)=>{
				return child !== elem;
			}
		);
	}
	
	static isDescendant(parent, child) {
		var node = child.parentNode;
		while (node != null) {
			if (node == parent) {
				return true;
			}
			node = node.parentNode;
		}
		return false;
   }

	static getAncestors(elem,selector){
		elem = elem || super.getData();
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
	}

	static moveContents(elem,elementToMoveContentsTo){
		elem = elem || super.getData();
		const oldParent = elem;
		const newParent = new FwDom(elementToMoveContentsTo);

		if(!elem && !elementToMoveContentsTo){
			return
		}
		
		if (
			newParent
			&& newParent !== oldParent) {
			while (oldParent.childNodes.length > 0) {
				newParent.appendChild(oldParent.childNodes[0]); 
			}
		}

		return elem;
	}

	static scrollToElem(elem,ToScrollTo,direction){
		elem = elem || super.getData();
		if(!ToScrollTo){
			return;
		}

		direction = direction || 'y';

			const methods =
				direction == 'x'
					? ['scrollLeft', 'left']
					: ['scrollTop', 'top'];

			const scrollOpts = {};

			scrollOpts[methods[1]] =
				elem[methods[0]]
				- elem.getBoundingClientRect()[methods[1]]
				+ ToScrollTo.getBoundingClientRect()[methods[1]]

			elem.scrollTo(scrollOpts);

			return elem;
	}

	static RunFnForChildren(ancestorElem,selector,parentSelector,fn) { //@TODO wtf

		if(
			ancestorElem
			&& selector
			&& parentSelector
			&& fn	
		){
			let children = ancestorElem.querySelectorAll(selector);
	
			children.forEach((child) => {
	
				if(
					child.closest(parentSelector)
					&& (ancestorElem.isSameNode(child.closest(parentSelector)))
				){
					fn(child);
				}
			})

			return ancestorElem;
		}
	}
	
}

export default FwDom;