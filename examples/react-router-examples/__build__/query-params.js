webpackJsonp([23],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(1);
	
	var _history = __webpack_require__(49);
	
	var _reactRouter = __webpack_require__(2);
	
	var history = _history.useBasename(_history.createHistory)({
	  basename: '/query-params'
	});
	
	var User = (function (_React$Component) {
	  _inherits(User, _React$Component);
	
	  function User() {
	    _classCallCheck(this, User);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  User.prototype.render = function render() {
	    var userID = this.props.params.userID;
	    var query = this.props.location.query;
	
	    var age = query && query.showAge ? '33' : '';
	
	    return _react2['default'].createElement(
	      'div',
	      { className: 'User' },
	      _react2['default'].createElement(
	        'h1',
	        null,
	        'User id: ',
	        userID
	      ),
	      age
	    );
	  };
	
	  return User;
	})(_react2['default'].Component);
	
	var App = (function (_React$Component2) {
	  _inherits(App, _React$Component2);
	
	  function App() {
	    _classCallCheck(this, App);
	
	    _React$Component2.apply(this, arguments);
	  }
	
	  App.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'ul',
	        null,
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/user/bob', activeClassName: 'active' },
	            'Bob'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/user/bob', query: { showAge: true }, activeClassName: 'active' },
	            'Bob With Query Params'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/user/sally', activeClassName: 'active' },
	            'Sally'
	          )
	        )
	      ),
	      this.props.children
	    );
	  };
	
	  return App;
	})(_react2['default'].Component);
	
	_reactDom.render(_react2['default'].createElement(
	  _reactRouter.Router,
	  { history: history },
	  _react2['default'].createElement(
	    _reactRouter.Route,
	    { path: '/', component: App },
	    _react2['default'].createElement(_reactRouter.Route, { path: 'user/:userID', component: User })
	  )
	), document.getElementById('example'));

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9xdWVyeS1wYXJhbXMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztrQ0FBa0IsQ0FBTzs7OztxQ0FDRixDQUFXOztvQ0FDUyxFQUFTOzt3Q0FDaEIsQ0FBYzs7QUFFbEQsS0FBTSxPQUFPLEdBQUcsNENBQTBCLENBQUM7QUFDekMsV0FBUSxFQUFFLGVBQWU7RUFDMUIsQ0FBQzs7S0FFSSxJQUFJO2FBQUosSUFBSTs7WUFBSixJQUFJOzJCQUFKLElBQUk7Ozs7O0FBQUosT0FBSSxXQUNSLE1BQU0scUJBQUc7U0FDRCxNQUFNLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQTVCLE1BQU07U0FDTixLQUFLLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQTdCLEtBQUs7O0FBQ1gsU0FBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUU7O0FBRTVDLFlBQ0U7O1NBQUssU0FBUyxFQUFDLE1BQU07T0FDbkI7Ozs7U0FBYyxNQUFNO1FBQU07T0FDekIsR0FBRztNQUNBLENBQ1A7SUFDRjs7VUFaRyxJQUFJO0lBQVMsbUJBQU0sU0FBUzs7S0FlNUIsR0FBRzthQUFILEdBQUc7O1lBQUgsR0FBRzsyQkFBSCxHQUFHOzs7OztBQUFILE1BQUcsV0FDUCxNQUFNLHFCQUFHO0FBQ1AsWUFDRTs7O09BQ0U7OztTQUNFOzs7V0FBSTs7ZUFBTSxFQUFFLEVBQUMsV0FBVyxFQUFDLGVBQWUsRUFBQyxRQUFROztZQUFXO1VBQUs7U0FDakU7OztXQUFJOztlQUFNLEVBQUUsRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRyxFQUFDLGVBQWUsRUFBQyxRQUFROztZQUE2QjtVQUFLO1NBQzdHOzs7V0FBSTs7ZUFBTSxFQUFFLEVBQUMsYUFBYSxFQUFDLGVBQWUsRUFBQyxRQUFROztZQUFhO1VBQUs7UUFDbEU7T0FDSixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7TUFDaEIsQ0FDUDtJQUNGOztVQVpHLEdBQUc7SUFBUyxtQkFBTSxTQUFTOztBQWVqQyxrQkFDRTs7S0FBUSxPQUFPLEVBQUUsT0FBUTtHQUN2Qjs7T0FBTyxJQUFJLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBRSxHQUFJO0tBQzdCLHVEQUFPLElBQUksRUFBQyxjQUFjLEVBQUMsU0FBUyxFQUFFLElBQUssR0FBRztJQUN4QztFQUNELEVBQ1IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDIiwiZmlsZSI6InF1ZXJ5LXBhcmFtcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCB7IGNyZWF0ZUhpc3RvcnksIHVzZUJhc2VuYW1lIH0gZnJvbSAnaGlzdG9yeSdcbmltcG9ydCB7IFJvdXRlciwgUm91dGUsIExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG5cbmNvbnN0IGhpc3RvcnkgPSB1c2VCYXNlbmFtZShjcmVhdGVIaXN0b3J5KSh7XG4gIGJhc2VuYW1lOiAnL3F1ZXJ5LXBhcmFtcydcbn0pXG5cbmNsYXNzIFVzZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgbGV0IHsgdXNlcklEIH0gPSB0aGlzLnByb3BzLnBhcmFtc1xuICAgIGxldCB7IHF1ZXJ5IH0gPSB0aGlzLnByb3BzLmxvY2F0aW9uXG4gICAgbGV0IGFnZSA9IHF1ZXJ5ICYmIHF1ZXJ5LnNob3dBZ2UgPyAnMzMnIDogJydcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIlVzZXJcIj5cbiAgICAgICAgPGgxPlVzZXIgaWQ6IHt1c2VySUR9PC9oMT5cbiAgICAgICAge2FnZX1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDx1bD5cbiAgICAgICAgICA8bGk+PExpbmsgdG89XCIvdXNlci9ib2JcIiBhY3RpdmVDbGFzc05hbWU9XCJhY3RpdmVcIj5Cb2I8L0xpbms+PC9saT5cbiAgICAgICAgICA8bGk+PExpbmsgdG89XCIvdXNlci9ib2JcIiBxdWVyeT17eyBzaG93QWdlOiB0cnVlIH19IGFjdGl2ZUNsYXNzTmFtZT1cImFjdGl2ZVwiPkJvYiBXaXRoIFF1ZXJ5IFBhcmFtczwvTGluaz48L2xpPlxuICAgICAgICAgIDxsaT48TGluayB0bz1cIi91c2VyL3NhbGx5XCIgYWN0aXZlQ2xhc3NOYW1lPVwiYWN0aXZlXCI+U2FsbHk8L0xpbms+PC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxucmVuZGVyKChcbiAgPFJvdXRlciBoaXN0b3J5PXtoaXN0b3J5fT5cbiAgICA8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0FwcH0+XG4gICAgICA8Um91dGUgcGF0aD1cInVzZXIvOnVzZXJJRFwiIGNvbXBvbmVudD17VXNlcn0gLz5cbiAgICA8L1JvdXRlPlxuICA8L1JvdXRlcj5cbiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJykpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL2V4YW1wbGVzL3F1ZXJ5LXBhcmFtcy9hcHAuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9