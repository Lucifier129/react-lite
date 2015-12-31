webpackJsonp([8],{

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsAuth = __webpack_require__(63);
	
	var _utilsAuth2 = _interopRequireDefault(_utilsAuth);
	
	var Dashboard = _react2['default'].createClass({
	  displayName: 'Dashboard',
	
	  render: function render() {
	    var token = _utilsAuth2['default'].getToken();
	
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h1',
	        null,
	        'Dashboard'
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        'You made it!'
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        token
	      ),
	      this.props.children
	    );
	  }
	});
	
	exports['default'] = Dashboard;
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9hdXRoLXdpdGgtc2hhcmVkLXJvb3QvY29tcG9uZW50cy9EYXNoYm9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7a0NBQWtCLENBQU87Ozs7c0NBQ1IsRUFBZTs7OztBQUVoQyxLQUFNLFNBQVMsR0FBRyxtQkFBTSxXQUFXLENBQUM7OztBQUNsQyxTQUFNLG9CQUFHO0FBQ1AsU0FBTSxLQUFLLEdBQUcsdUJBQUssUUFBUSxFQUFFOztBQUU3QixZQUNFOzs7T0FDRTs7OztRQUFrQjtPQUNsQjs7OztRQUFtQjtPQUNuQjs7O1NBQUksS0FBSztRQUFLO09BQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO01BQ2hCLENBQ1A7SUFDRjtFQUNGLENBQUM7O3NCQUVhLFNBQVMiLCJmaWxlIjoiOC5jaHVuay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBhdXRoIGZyb20gJy4uL3V0aWxzL2F1dGgnXG5cbmNvbnN0IERhc2hib2FyZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHRva2VuID0gYXV0aC5nZXRUb2tlbigpXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPkRhc2hib2FyZDwvaDE+XG4gICAgICAgIDxwPllvdSBtYWRlIGl0ITwvcD5cbiAgICAgICAgPHA+e3Rva2VufTwvcD5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9hdXRoLXdpdGgtc2hhcmVkLXJvb3QvY29tcG9uZW50cy9EYXNoYm9hcmQuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9