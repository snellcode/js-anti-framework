const $ = jQuery;

export default class Util {

	static stopEvent(e) {
		try {
			e.preventDefault();
			e.stopPropagation();
		} catch(err) {
			// pass
		}
	}

}




