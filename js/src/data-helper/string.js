import FwDataHelper from './../classes/data-helper.js';

class FwString extends FwDataHelper {
	constructor(data){
		super(data);
	}
	static GetFileExtension (str) {
		return str.split('.').pop();
	}
	static ToCamelCase (str) {
	
		return str
			.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
				return index == 0
					? word.toLowerCase()
					: word.toUpperCase();
			})
			.replace(/-|\s/g, '');
	}

	static ToDashed(str) {

		return FwString.ToCamelCase(str).replace( /([a-z]|[0-9])([A-Z])/g, '$1-$2' ).toLowerCase();
	}
}

export default FwString;