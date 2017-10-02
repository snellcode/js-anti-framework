import Util from './util';
const $ = jQuery;

export default class ExampleComponent {

	constructor($root) {
		this.$root = $root;
		if (!this.$root.length) return;	
		this.users = [];
		this.template = $('#tmpl-example-component-users').html();
		this.update();
	}

	update() {
		this.reset();
		this.initData()
			.then(this.render.bind(this))
			.catch(console.log.bind(console));
	}

	reset() {
		this.users = [];
		try {
			this.$root.find('ul.users').slick('unslick');
		} catch(err) {
			// pass
		}
	}

	initData() {
		return new Promise((resolve, reject) => {
			this.getUsers()
				.fail(reject)
				.done(users => {
					this.users = users;
					resolve();
				});
		});
	}

	render() {
		const users = this.users;
		const html = _.template(this.template)({users});
		this.$root.html(html);
		this.$root.find('ul.users').not('.slick-initialized').slick();
		this.$root.find('a.update').on('click', this.update.bind(this));
	}

	getUsers() {
		return $.ajax({
		  url: 'https://jsonplaceholder.typicode.com/users/',
		  method: 'GET'
		});
	}

}