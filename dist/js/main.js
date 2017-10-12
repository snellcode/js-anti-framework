(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../../general/js/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = jQuery;

var UsersCarousel = function () {
	function UsersCarousel($root) {
		_classCallCheck(this, UsersCarousel);

		this.$root = $root;
		if (!this.$root.length) return;
		this.allUsers = [];
		this.users = [];
		this.groups = ['A', 'B', 'C'];
		this.activeGroup = null;
		this.template = $('#tmpl-users-carousel').html();
		this.init();
	}

	_createClass(UsersCarousel, [{
		key: 'init',
		value: function init() {
			var _this = this;

			this.$root.addClass('loading');
			this.activeGroup = null;
			this.getUsers().then(function (users) {
				_this.users = _this.allUsers = users;
				_this.update();
			}).catch(console.log.bind(console)).finally(function () {
				return setTimeout(function () {
					return _this.$root.removeClass('loading');
				}, 300);
			});
		}
	}, {
		key: 'getUsers',
		value: function getUsers() {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				$.ajax({
					url: 'https://jsonplaceholder.typicode.com/users/',
					method: 'GET'
				})
				// give them a group we can filter by, just to make it more interesting
				.then(function (users) {
					return resolve(_.map(users, function (user) {
						return _.extend(user, { group: _util2.default.sample(_this2.groups) });
					}));
				}).catch(reject);
			});
		}
	}, {
		key: 'update',
		value: function update() {
			this.reset();
			this.render();
		}
	}, {
		key: 'reset',
		value: function reset() {
			try {
				this.$root.find('.users').slick('unslick');
			} catch (err) {
				// pass
			}
			this.$root.empty();
		}
	}, {
		key: 'render',
		value: function render() {
			this.$root.html(_.template(this.template)({
				users: this.users,
				groups: this.groups,
				activeGroup: this.activeGroup
			}));
			this.$root.find('.users').not('.slick-initialized').slick();
			this.$root.find('.filter-groups button').on('click', this.filter.bind(this));
			this.$root.find('.init').on('click', this.init.bind(this));
		}
	}, {
		key: 'filter',
		value: function filter(e) {
			var group = $(e.currentTarget).data('group');
			if (this.activeGroup === group) {
				this.users = _.map(this.allUsers);
				this.activeGroup = null;
			} else {
				this.users = _.filter(this.allUsers, { group: group });
				this.activeGroup = group;
			}
			this.update();
		}
	}]);

	return UsersCarousel;
}();

exports.default = UsersCarousel;

},{"../../general/js/util":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = jQuery;

var Util = function () {
	function Util() {
		_classCallCheck(this, Util);
	}

	_createClass(Util, null, [{
		key: "sample",
		value: function sample(array) {
			return array[Math.floor(Math.random() * array.length)];
		}
	}]);

	return Util;
}();

exports.default = Util;

},{}],3:[function(require,module,exports){
'use strict';

var _usersCarousel = require('./components/users-carousel/users-carousel');

var _usersCarousel2 = _interopRequireDefault(_usersCarousel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = jQuery;

jQuery(function ($) {
	$('.users-carousel').each(function (i, el) {
		return new _usersCarousel2.default($(el));
	});
});

},{"./components/users-carousel/users-carousel":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy91c2Vycy1jYXJvdXNlbC91c2Vycy1jYXJvdXNlbC5lczYiLCJzcmMvZ2VuZXJhbC9qcy91dGlsLmVzNiIsInNyYy9tYWluLmVzNiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7O0FBQ0EsSUFBTSxJQUFJLE1BQVY7O0lBRXFCLGE7QUFFcEIsd0JBQVksS0FBWixFQUFtQjtBQUFBOztBQUNsQixPQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsTUFBSSxDQUFDLEtBQUssS0FBTCxDQUFXLE1BQWhCLEVBQXdCO0FBQ3hCLE9BQUssUUFBTCxHQUFnQixFQUFoQjtBQUNBLE9BQUssS0FBTCxHQUFhLEVBQWI7QUFDQSxPQUFLLE1BQUwsR0FBYyxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxDQUFkO0FBQ0EsT0FBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsT0FBSyxRQUFMLEdBQWdCLEVBQUUsc0JBQUYsRUFBMEIsSUFBMUIsRUFBaEI7QUFDQSxPQUFLLElBQUw7QUFDQTs7Ozt5QkFFTTtBQUFBOztBQUNOLFFBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsU0FBcEI7QUFDQSxRQUFLLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxRQUFLLFFBQUwsR0FDRSxJQURGLENBQ08saUJBQVM7QUFDZCxVQUFLLEtBQUwsR0FBYSxNQUFLLFFBQUwsR0FBZ0IsS0FBN0I7QUFDQSxVQUFLLE1BQUw7QUFDQSxJQUpGLEVBS0UsS0FMRixDQUtRLFFBQVEsR0FBUixDQUFZLElBQVosQ0FBaUIsT0FBakIsQ0FMUixFQU1FLE9BTkYsQ0FNVTtBQUFBLFdBQU0sV0FBVztBQUFBLFlBQU0sTUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixTQUF2QixDQUFOO0FBQUEsS0FBWCxFQUFvRCxHQUFwRCxDQUFOO0FBQUEsSUFOVjtBQU9BOzs7NkJBRVU7QUFBQTs7QUFDVixVQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdkMsTUFBRSxJQUFGLENBQU87QUFDTCxVQUFLLDZDQURBO0FBRUwsYUFBUTtBQUZILEtBQVA7QUFJQTtBQUpBLEtBS0MsSUFMRCxDQUtNO0FBQUEsWUFBUyxRQUFRLEVBQUUsR0FBRixDQUFNLEtBQU4sRUFBYTtBQUFBLGFBQVEsRUFBRSxNQUFGLENBQVMsSUFBVCxFQUFlLEVBQUMsT0FBTyxlQUFLLE1BQUwsQ0FBWSxPQUFLLE1BQWpCLENBQVIsRUFBZixDQUFSO0FBQUEsTUFBYixDQUFSLENBQVQ7QUFBQSxLQUxOLEVBTUMsS0FORCxDQU1PLE1BTlA7QUFPQSxJQVJNLENBQVA7QUFTQTs7OzJCQUVRO0FBQ1IsUUFBSyxLQUFMO0FBQ0EsUUFBSyxNQUFMO0FBQ0E7OzswQkFFTztBQUNQLE9BQUk7QUFDSCxTQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLFFBQWhCLEVBQTBCLEtBQTFCLENBQWdDLFNBQWhDO0FBQ0EsSUFGRCxDQUVFLE9BQU0sR0FBTixFQUFXO0FBQ1o7QUFDQTtBQUNELFFBQUssS0FBTCxDQUFXLEtBQVg7QUFDQTs7OzJCQUVRO0FBQ1IsUUFBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixFQUFFLFFBQUYsQ0FBVyxLQUFLLFFBQWhCLEVBQTBCO0FBQ3pDLFdBQU8sS0FBSyxLQUQ2QjtBQUV6QyxZQUFRLEtBQUssTUFGNEI7QUFHekMsaUJBQWEsS0FBSztBQUh1QixJQUExQixDQUFoQjtBQUtBLFFBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsUUFBaEIsRUFBMEIsR0FBMUIsQ0FBOEIsb0JBQTlCLEVBQW9ELEtBQXBEO0FBQ0EsUUFBSyxLQUFMLENBQVcsSUFBWCxDQUFnQix1QkFBaEIsRUFBeUMsRUFBekMsQ0FBNEMsT0FBNUMsRUFBcUQsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFqQixDQUFyRDtBQUNBLFFBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsT0FBaEIsRUFBeUIsRUFBekIsQ0FBNEIsT0FBNUIsRUFBcUMsS0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLElBQWYsQ0FBckM7QUFDQTs7O3lCQUVNLEMsRUFBRztBQUNULE9BQU0sUUFBUSxFQUFFLEVBQUUsYUFBSixFQUFtQixJQUFuQixDQUF3QixPQUF4QixDQUFkO0FBQ0EsT0FBSSxLQUFLLFdBQUwsS0FBcUIsS0FBekIsRUFBZ0M7QUFDL0IsU0FBSyxLQUFMLEdBQWEsRUFBRSxHQUFGLENBQU0sS0FBSyxRQUFYLENBQWI7QUFDQSxTQUFLLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxJQUhELE1BR087QUFDTixTQUFLLEtBQUwsR0FBYSxFQUFFLE1BQUYsQ0FBUyxLQUFLLFFBQWQsRUFBd0IsRUFBQyxZQUFELEVBQXhCLENBQWI7QUFDQSxTQUFLLFdBQUwsR0FBbUIsS0FBbkI7QUFDQTtBQUNELFFBQUssTUFBTDtBQUNBOzs7Ozs7a0JBeEVtQixhOzs7Ozs7Ozs7Ozs7O0FDSHJCLElBQU0sSUFBSSxNQUFWOztJQUVxQixJOzs7Ozs7O3lCQUVOLEssRUFBTztBQUNuQixVQUFPLE1BQU0sS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLE1BQU0sTUFBakMsQ0FBTixDQUFQO0FBQ0Q7Ozs7OztrQkFKbUIsSTs7Ozs7QUNGckI7Ozs7OztBQUVBLElBQU0sSUFBSSxNQUFWOztBQUVBLE9BQU8sYUFBSztBQUNYLEdBQUUsaUJBQUYsRUFBcUIsSUFBckIsQ0FBMEIsVUFBQyxDQUFELEVBQUksRUFBSjtBQUFBLFNBQVcsNEJBQWtCLEVBQUUsRUFBRixDQUFsQixDQUFYO0FBQUEsRUFBMUI7QUFDQSxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBVdGlsIGZyb20gJy4uLy4uL2dlbmVyYWwvanMvdXRpbCc7XG5jb25zdCAkID0galF1ZXJ5O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2Vyc0Nhcm91c2VsIHtcblxuXHRjb25zdHJ1Y3Rvcigkcm9vdCkge1xuXHRcdHRoaXMuJHJvb3QgPSAkcm9vdDtcblx0XHRpZiAoIXRoaXMuJHJvb3QubGVuZ3RoKSByZXR1cm47XHRcblx0XHR0aGlzLmFsbFVzZXJzID0gW107XG5cdFx0dGhpcy51c2VycyA9IFtdO1xuXHRcdHRoaXMuZ3JvdXBzID0gWydBJywgJ0InLCAnQyddO1xuXHRcdHRoaXMuYWN0aXZlR3JvdXAgPSBudWxsO1xuXHRcdHRoaXMudGVtcGxhdGUgPSAkKCcjdG1wbC11c2Vycy1jYXJvdXNlbCcpLmh0bWwoKTtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0dGhpcy4kcm9vdC5hZGRDbGFzcygnbG9hZGluZycpO1xuXHRcdHRoaXMuYWN0aXZlR3JvdXAgPSBudWxsO1xuXHRcdHRoaXMuZ2V0VXNlcnMoKVxuXHRcdFx0LnRoZW4odXNlcnMgPT4ge1xuXHRcdFx0XHR0aGlzLnVzZXJzID0gdGhpcy5hbGxVc2VycyA9IHVzZXJzO1xuXHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpKVxuXHRcdFx0LmZpbmFsbHkoKCkgPT4gc2V0VGltZW91dCgoKSA9PiB0aGlzLiRyb290LnJlbW92ZUNsYXNzKCdsb2FkaW5nJyksIDMwMCkpO1xuXHR9XG5cblx0Z2V0VXNlcnMoKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHQgIHVybDogJ2h0dHBzOi8vanNvbnBsYWNlaG9sZGVyLnR5cGljb2RlLmNvbS91c2Vycy8nLFxuXHRcdFx0ICBtZXRob2Q6ICdHRVQnXG5cdFx0XHR9KVxuXHRcdFx0Ly8gZ2l2ZSB0aGVtIGEgZ3JvdXAgd2UgY2FuIGZpbHRlciBieSwganVzdCB0byBtYWtlIGl0IG1vcmUgaW50ZXJlc3Rpbmdcblx0XHRcdC50aGVuKHVzZXJzID0+IHJlc29sdmUoXy5tYXAodXNlcnMsIHVzZXIgPT4gXy5leHRlbmQodXNlciwge2dyb3VwOiBVdGlsLnNhbXBsZSh0aGlzLmdyb3Vwcyl9KSkpKVxuXHRcdFx0LmNhdGNoKHJlamVjdCk7XG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cdFx0dGhpcy5yZXNldCgpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdH1cblxuXHRyZXNldCgpIHtcblx0XHR0cnkge1xuXHRcdFx0dGhpcy4kcm9vdC5maW5kKCcudXNlcnMnKS5zbGljaygndW5zbGljaycpO1xuXHRcdH0gY2F0Y2goZXJyKSB7XG5cdFx0XHQvLyBwYXNzXG5cdFx0fVxuXHRcdHRoaXMuJHJvb3QuZW1wdHkoKTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLiRyb290Lmh0bWwoXy50ZW1wbGF0ZSh0aGlzLnRlbXBsYXRlKSh7XG5cdFx0XHR1c2VyczogdGhpcy51c2Vycyxcblx0XHRcdGdyb3VwczogdGhpcy5ncm91cHMsXG5cdFx0XHRhY3RpdmVHcm91cDogdGhpcy5hY3RpdmVHcm91cFxuXHRcdH0pKTtcblx0XHR0aGlzLiRyb290LmZpbmQoJy51c2VycycpLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soKTtcblx0XHR0aGlzLiRyb290LmZpbmQoJy5maWx0ZXItZ3JvdXBzIGJ1dHRvbicpLm9uKCdjbGljaycsIHRoaXMuZmlsdGVyLmJpbmQodGhpcykpO1xuXHRcdHRoaXMuJHJvb3QuZmluZCgnLmluaXQnKS5vbignY2xpY2snLCB0aGlzLmluaXQuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRmaWx0ZXIoZSkge1xuXHRcdGNvbnN0IGdyb3VwID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2dyb3VwJyk7XG5cdFx0aWYgKHRoaXMuYWN0aXZlR3JvdXAgPT09IGdyb3VwKSB7XG5cdFx0XHR0aGlzLnVzZXJzID0gXy5tYXAodGhpcy5hbGxVc2Vycyk7XG5cdFx0XHR0aGlzLmFjdGl2ZUdyb3VwID0gbnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy51c2VycyA9IF8uZmlsdGVyKHRoaXMuYWxsVXNlcnMsIHtncm91cH0pO1x0XG5cdFx0XHR0aGlzLmFjdGl2ZUdyb3VwID0gZ3JvdXA7XG5cdFx0fVxuXHRcdHRoaXMudXBkYXRlKCk7XG5cdH1cblxufSIsImNvbnN0ICQgPSBqUXVlcnk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFV0aWwge1xuXHRcblx0c3RhdGljIHNhbXBsZShhcnJheSkge1xuXHQgIHJldHVybiBhcnJheVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnJheS5sZW5ndGgpXTtcblx0fVxuXG59IiwiaW1wb3J0IFVzZXJzQ2Fyb3VzZWwgZnJvbSAnLi9jb21wb25lbnRzL3VzZXJzLWNhcm91c2VsL3VzZXJzLWNhcm91c2VsJztcblxuY29uc3QgJCA9IGpRdWVyeTtcblxualF1ZXJ5KCQgPT4ge1xuXHQkKCcudXNlcnMtY2Fyb3VzZWwnKS5lYWNoKChpLCBlbCkgPT4gbmV3IFVzZXJzQ2Fyb3VzZWwoJChlbCkpKTtcbn0pOyJdfQ==
