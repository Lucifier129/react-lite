webpackJsonp([4],{

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsAuth = __webpack_require__(63);
	
	var _utilsAuth2 = _interopRequireDefault(_utilsAuth);
	
	var Logout = _react2['default'].createClass({
	  displayName: 'Logout',
	
	  componentDidMount: function componentDidMount() {
	    _utilsAuth2['default'].logout();
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'p',
	      null,
	      'You are now logged out'
	    );
	  }
	});
	
	exports['default'] = Logout;
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9hdXRoLXdpdGgtc2hhcmVkLXJvb3QvY29tcG9uZW50cy9Mb2dvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7a0NBQWtCLENBQU87Ozs7c0NBQ1IsRUFBZTs7OztBQUVoQyxLQUFNLE1BQU0sR0FBRyxtQkFBTSxXQUFXLENBQUM7OztBQUMvQixvQkFBaUIsK0JBQUc7QUFDbEIsNEJBQUssTUFBTSxFQUFFO0lBQ2Q7O0FBRUQsU0FBTSxvQkFBRztBQUNQLFlBQU87Ozs7TUFBNkI7SUFDckM7RUFDRixDQUFDOztzQkFFYSxNQUFNIiwiZmlsZSI6IjQuY2h1bmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgYXV0aCBmcm9tICcuLi91dGlscy9hdXRoJ1xuXG5jb25zdCBMb2dvdXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGF1dGgubG9nb3V0KClcbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIDxwPllvdSBhcmUgbm93IGxvZ2dlZCBvdXQ8L3A+XG4gIH1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IExvZ291dFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9hdXRoLXdpdGgtc2hhcmVkLXJvb3QvY29tcG9uZW50cy9Mb2dvdXQuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9