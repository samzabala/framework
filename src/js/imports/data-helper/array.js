import FwDataHelper from '../classes/data-helper.js';

class FwArrayay extends FwDataHelper {
	
	static moveItem(arr, oi, ni){

		while (oi < 0) {
			oi += arr.length;
		}

		while (ni < 0) {
			ni += arr.length;
		}

		if (ni >= arr.length) {
			let k = ni - arr.length;
			while (k-- + 1) {
				arr.push(undefined);
			}
		}

		arr.splice(ni, 0, arr.splice(oi, 1)[0]);

		return arr;
	}

	static reverse(arr) {
		let newArray = [];
		for (let i = arr.length - 1; i >= 0; i--) {
			newArray.push(arr[i]);
		}
		return newArray;
	}
}


export default FwArrayay;