const $ = jQuery;

export default class Util {
	
	static sample(array) {
	  return array[Math.floor(Math.random() * array.length)];
	}

}