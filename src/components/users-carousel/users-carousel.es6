import Util from '../../general/js/util';
const $ = jQuery;

export default class UsersCarousel {

	constructor($root) {
		this.$root = $root;
		if (!this.$root.length) return;	
		this.allUsers = [];
		this.users = [];
		this.groups = ['A', 'B', 'C'];
		this.activeGroup = null;
		this.template = $('#tmpl-users-carousel').html();
		this.init();
	}

	init() {
		this.$root.addClass('loading');
		this.activeGroup = null;
		this.getUsers()
			.then(users => {
				this.users = this.allUsers = users;
				this.update();
			})
			.catch(console.log.bind(console))
			.finally(() => setTimeout(() => this.$root.removeClass('loading'), 300));
	}

	getUsers() {
		return new Promise((resolve, reject) => {
			$.ajax({
			  url: 'https://jsonplaceholder.typicode.com/users/',
			  method: 'GET'
			})
			// give them a group we can filter by, just to make it more interesting
			.then(users => resolve(_.map(users, user => _.extend(user, {group: Util.sample(this.groups)}))))
			.catch(reject);
		});
	}

	update() {
		this.reset();
		this.render();
	}

	reset() {
		try {
			this.$root.find('.users').slick('unslick');
		} catch(err) {
			// pass
		}
		this.$root.empty();
	}

	render() {
		this.$root.html(_.template(this.template)({
			users: this.users,
			groups: this.groups,
			activeGroup: this.activeGroup
		}));
		this.$root.find('.users').not('.slick-initialized').slick();
		this.$root.find('.filter-groups button').on('click', this.filter.bind(this));
		this.$root.find('.init').on('click', this.init.bind(this));
	}

	filter(e) {
		const group = $(e.currentTarget).data('group');
		if (this.activeGroup === group) {
			this.users = _.map(this.allUsers);
			this.activeGroup = null;
		} else {
			this.users = _.filter(this.allUsers, {group});	
			this.activeGroup = group;
		}
		this.update();
	}

}