webpackJsonp([6],{

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(2);
	
	var _utilsAuthJs = __webpack_require__(63);
	
	var _utilsAuthJs2 = _interopRequireDefault(_utilsAuthJs);
	
	var Login = _react2['default'].createClass({
	  displayName: 'Login',
	
	  mixins: [_reactRouter.History],
	
	  getInitialState: function getInitialState() {
	    return {
	      error: false
	    };
	  },
	
	  handleSubmit: function handleSubmit(event) {
	    var _this = this;
	
	    event.preventDefault();
	
	    var email = this.refs.email.value;
	    var pass = this.refs.pass.value;
	
	    _utilsAuthJs2['default'].login(email, pass, function (loggedIn) {
	      if (!loggedIn) return _this.setState({ error: true });
	
	      var location = _this.props.location;
	
	      if (location.state && location.state.nextPathname) {
	        _this.history.replaceState(null, location.state.nextPathname);
	      } else {
	        _this.history.replaceState(null, '/');
	      }
	    });
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'form',
	      { onSubmit: this.handleSubmit },
	      _react2['default'].createElement(
	        'label',
	        null,
	        _react2['default'].createElement('input', { ref: 'email', placeholder: 'email', defaultValue: 'joe@example.com' })
	      ),
	      _react2['default'].createElement(
	        'label',
	        null,
	        _react2['default'].createElement('input', { ref: 'pass', placeholder: 'password' })
	      ),
	      ' (hint: password1)',
	      _react2['default'].createElement('br', null),
	      _react2['default'].createElement(
	        'button',
	        { type: 'submit' },
	        'login'
	      ),
	      this.state.error && _react2['default'].createElement(
	        'p',
	        null,
	        'Bad login information'
	      )
	    );
	  }
	
	});
	
	exports['default'] = Login;
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9hdXRoLXdpdGgtc2hhcmVkLXJvb3QvY29tcG9uZW50cy9Mb2dpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztrQ0FBa0IsQ0FBTzs7Ozt3Q0FDRCxDQUFjOzt3Q0FDckIsRUFBa0I7Ozs7QUFFbkMsS0FBTSxLQUFLLEdBQUcsbUJBQU0sV0FBVyxDQUFDOzs7QUFFOUIsU0FBTSxFQUFFLHNCQUFXOztBQUVuQixrQkFBZSw2QkFBRztBQUNoQixZQUFPO0FBQ0wsWUFBSyxFQUFFLEtBQUs7TUFDYjtJQUNGOztBQUVELGVBQVksd0JBQUMsS0FBSyxFQUFFOzs7QUFDbEIsVUFBSyxDQUFDLGNBQWMsRUFBRTs7QUFFdEIsU0FBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztBQUNuQyxTQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLOztBQUVqQyw4QkFBSyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFDLFFBQVEsRUFBSztBQUNwQyxXQUFJLENBQUMsUUFBUSxFQUNYLE9BQU8sTUFBSyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7O1dBRS9CLFFBQVEsR0FBSyxNQUFLLEtBQUssQ0FBdkIsUUFBUTs7QUFFaEIsV0FBSSxRQUFRLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFO0FBQ2pELGVBQUssT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDN0QsTUFBTTtBQUNMLGVBQUssT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO1FBQ3JDO01BQ0YsQ0FBQztJQUNIOztBQUVELFNBQU0sb0JBQUc7QUFDUCxZQUNFOztTQUFNLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBYTtPQUNoQzs7O1NBQU8sNENBQU8sR0FBRyxFQUFDLE9BQU8sRUFBQyxXQUFXLEVBQUMsT0FBTyxFQUFDLFlBQVksRUFBQyxpQkFBaUIsR0FBRztRQUFRO09BQ3ZGOzs7U0FBTyw0Q0FBTyxHQUFHLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxVQUFVLEdBQUc7UUFBUTs7T0FBa0IsNENBQU07T0FDbEY7O1dBQVEsSUFBSSxFQUFDLFFBQVE7O1FBQWU7T0FDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQ2Y7Ozs7UUFDRDtNQUNJLENBQ1I7SUFDRjs7RUFFRixDQUFDOztzQkFFYSxLQUFLIiwiZmlsZSI6IjYuY2h1bmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xuaW1wb3J0IGF1dGggZnJvbSAnLi4vdXRpbHMvYXV0aC5qcydcblxuY29uc3QgTG9naW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgbWl4aW5zOiBbIEhpc3RvcnkgXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yOiBmYWxzZVxuICAgIH1cbiAgfSxcblxuICBoYW5kbGVTdWJtaXQoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBjb25zdCBlbWFpbCA9IHRoaXMucmVmcy5lbWFpbC52YWx1ZVxuICAgIGNvbnN0IHBhc3MgPSB0aGlzLnJlZnMucGFzcy52YWx1ZVxuXG4gICAgYXV0aC5sb2dpbihlbWFpbCwgcGFzcywgKGxvZ2dlZEluKSA9PiB7XG4gICAgICBpZiAoIWxvZ2dlZEluKVxuICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7IGVycm9yOiB0cnVlIH0pXG5cbiAgICAgIGNvbnN0IHsgbG9jYXRpb24gfSA9IHRoaXMucHJvcHNcblxuICAgICAgaWYgKGxvY2F0aW9uLnN0YXRlICYmIGxvY2F0aW9uLnN0YXRlLm5leHRQYXRobmFtZSkge1xuICAgICAgICB0aGlzLmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIGxvY2F0aW9uLnN0YXRlLm5leHRQYXRobmFtZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgJy8nKVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXR9PlxuICAgICAgICA8bGFiZWw+PGlucHV0IHJlZj1cImVtYWlsXCIgcGxhY2Vob2xkZXI9XCJlbWFpbFwiIGRlZmF1bHRWYWx1ZT1cImpvZUBleGFtcGxlLmNvbVwiIC8+PC9sYWJlbD5cbiAgICAgICAgPGxhYmVsPjxpbnB1dCByZWY9XCJwYXNzXCIgcGxhY2Vob2xkZXI9XCJwYXNzd29yZFwiIC8+PC9sYWJlbD4gKGhpbnQ6IHBhc3N3b3JkMSk8YnIgLz5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+bG9naW48L2J1dHRvbj5cbiAgICAgICAge3RoaXMuc3RhdGUuZXJyb3IgJiYgKFxuICAgICAgICAgIDxwPkJhZCBsb2dpbiBpbmZvcm1hdGlvbjwvcD5cbiAgICAgICAgKX1cbiAgICAgIDwvZm9ybT5cbiAgICApXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgTG9naW5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvZXhhbXBsZXMvYXV0aC13aXRoLXNoYXJlZC1yb290L2NvbXBvbmVudHMvTG9naW4uanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9