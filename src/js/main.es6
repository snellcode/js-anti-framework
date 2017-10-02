import Util from './modules/util';
import ExampleComponent from './modules/example-component';

const $ = jQuery;

jQuery($ => {
	$('.example-component').each((i, el) => new ExampleComponent($(el)));
});