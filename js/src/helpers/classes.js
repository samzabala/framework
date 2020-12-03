//component
	class FwComponent {
		constructor(element) {
			if (!element) {
			return
			}
		
			this._fwElement = element
			Data.set(element, this.constructor.DATA_KEY, this)
		}

		dispose() {
			Data.delete(this._fwElement, this.constructor.DATA_KEY)
			this._fwElement = null
		}
	}
export {FwComponent};

//helpers for datatypes
	class FwTypeHelper {
		constructor(val){
			return this.init(val);
		}

		init(val){
			const self = this;
			self.data = val; 
			
			self.init.prototype = self.prototype;
		}
	}

export {FwTypeHelper};