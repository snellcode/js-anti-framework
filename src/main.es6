import UsersCarousel from './components/users-carousel/users-carousel';

const $ = jQuery;

jQuery($ => {
	$('.users-carousel').each((i, el) => new UsersCarousel($(el)));
});