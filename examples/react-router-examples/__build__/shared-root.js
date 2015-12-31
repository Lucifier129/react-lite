webpackJsonp([24],[
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
	  basename: '/shared-root'
	});
	
	var App = (function (_React$Component) {
	  _inherits(App, _React$Component);
	
	  function App() {
	    _classCallCheck(this, App);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  App.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'p',
	        null,
	        'This illustrates how routes can share UI w/o sharing the URL. When routes have no path, they never match themselves but their children can, allowing "/signin" and "/forgot-password" to both be render in the ',
	        _react2['default'].createElement(
	          'code',
	          null,
	          'SignedOut'
	        ),
	        ' component.'
	      ),
	      _react2['default'].createElement(
	        'ol',
	        null,
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/home', activeClassName: 'active' },
	            'Home'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/signin', activeClassName: 'active' },
	            'Sign in'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/forgot-password', activeClassName: 'active' },
	            'Forgot Password'
	          )
	        )
	      ),
	      this.props.children
	    );
	  };
	
	  return App;
	})(_react2['default'].Component);
	
	var SignedIn = (function (_React$Component2) {
	  _inherits(SignedIn, _React$Component2);
	
	  function SignedIn() {
	    _classCallCheck(this, SignedIn);
	
	    _React$Component2.apply(this, arguments);
	  }
	
	  SignedIn.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'Signed In'
	      ),
	      this.props.children
	    );
	  };
	
	  return SignedIn;
	})(_react2['default'].Component);
	
	var Home = (function (_React$Component3) {
	  _inherits(Home, _React$Component3);
	
	  function Home() {
	    _classCallCheck(this, Home);
	
	    _React$Component3.apply(this, arguments);
	  }
	
	  Home.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'h3',
	      null,
	      'Welcome home!'
	    );
	  };
	
	  return Home;
	})(_react2['default'].Component);
	
	var SignedOut = (function (_React$Component4) {
	  _inherits(SignedOut, _React$Component4);
	
	  function SignedOut() {
	    _classCallCheck(this, SignedOut);
	
	    _React$Component4.apply(this, arguments);
	  }
	
	  SignedOut.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'Signed Out'
	      ),
	      this.props.children
	    );
	  };
	
	  return SignedOut;
	})(_react2['default'].Component);
	
	var SignIn = (function (_React$Component5) {
	  _inherits(SignIn, _React$Component5);
	
	  function SignIn() {
	    _classCallCheck(this, SignIn);
	
	    _React$Component5.apply(this, arguments);
	  }
	
	  SignIn.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'h3',
	      null,
	      'Please sign in.'
	    );
	  };
	
	  return SignIn;
	})(_react2['default'].Component);
	
	var ForgotPassword = (function (_React$Component6) {
	  _inherits(ForgotPassword, _React$Component6);
	
	  function ForgotPassword() {
	    _classCallCheck(this, ForgotPassword);
	
	    _React$Component6.apply(this, arguments);
	  }
	
	  ForgotPassword.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'h3',
	      null,
	      'Forgot your password?'
	    );
	  };
	
	  return ForgotPassword;
	})(_react2['default'].Component);
	
	_reactDom.render(_react2['default'].createElement(
	  _reactRouter.Router,
	  { history: history },
	  _react2['default'].createElement(
	    _reactRouter.Route,
	    { path: '/', component: App },
	    _react2['default'].createElement(
	      _reactRouter.Route,
	      { component: SignedOut },
	      _react2['default'].createElement(_reactRouter.Route, { path: 'signin', component: SignIn }),
	      _react2['default'].createElement(_reactRouter.Route, { path: 'forgot-password', component: ForgotPassword })
	    ),
	    _react2['default'].createElement(
	      _reactRouter.Route,
	      { component: SignedIn },
	      _react2['default'].createElement(_reactRouter.Route, { path: 'home', component: Home })
	    )
	  )
	), document.getElementById('example'));

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9zaGFyZWQtcm9vdC9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O2tDQUFrQixDQUFPOzs7O3FDQUNGLENBQVc7O29DQUNTLEVBQVM7O3dDQUNoQixDQUFjOztBQUVsRCxLQUFNLE9BQU8sR0FBRyw0Q0FBMEIsQ0FBQztBQUN6QyxXQUFRLEVBQUUsY0FBYztFQUN6QixDQUFDOztLQUVJLEdBQUc7YUFBSCxHQUFHOztZQUFILEdBQUc7MkJBQUgsR0FBRzs7Ozs7QUFBSCxNQUFHLFdBQ1AsTUFBTSxxQkFBRztBQUNQLFlBQ0U7OztPQUNFOzs7O1NBSW1COzs7O1VBQXNCOztRQUNyQztPQUNKOzs7U0FDRTs7O1dBQUk7O2VBQU0sRUFBRSxFQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsUUFBUTs7WUFBWTtVQUFLO1NBQzlEOzs7V0FBSTs7ZUFBTSxFQUFFLEVBQUMsU0FBUyxFQUFDLGVBQWUsRUFBQyxRQUFROztZQUFlO1VBQUs7U0FDbkU7OztXQUFJOztlQUFNLEVBQUUsRUFBQyxrQkFBa0IsRUFBQyxlQUFlLEVBQUMsUUFBUTs7WUFBdUI7VUFBSztRQUNqRjtPQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtNQUNoQixDQUNQO0lBQ0Y7O1VBbEJHLEdBQUc7SUFBUyxtQkFBTSxTQUFTOztLQXFCM0IsUUFBUTthQUFSLFFBQVE7O1lBQVIsUUFBUTsyQkFBUixRQUFROzs7OztBQUFSLFdBQVEsV0FDWixNQUFNLHFCQUFHO0FBQ1AsWUFDRTs7O09BQ0U7Ozs7UUFBa0I7T0FDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO01BQ2hCLENBQ1A7SUFDRjs7VUFSRyxRQUFRO0lBQVMsbUJBQU0sU0FBUzs7S0FXaEMsSUFBSTthQUFKLElBQUk7O1lBQUosSUFBSTsyQkFBSixJQUFJOzs7OztBQUFKLE9BQUksV0FDUixNQUFNLHFCQUFHO0FBQ1AsWUFDRTs7OztNQUFzQixDQUN2QjtJQUNGOztVQUxHLElBQUk7SUFBUyxtQkFBTSxTQUFTOztLQVE1QixTQUFTO2FBQVQsU0FBUzs7WUFBVCxTQUFTOzJCQUFULFNBQVM7Ozs7O0FBQVQsWUFBUyxXQUNiLE1BQU0scUJBQUc7QUFDUCxZQUNFOzs7T0FDRTs7OztRQUFtQjtPQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7TUFDaEIsQ0FDUDtJQUNGOztVQVJHLFNBQVM7SUFBUyxtQkFBTSxTQUFTOztLQVdqQyxNQUFNO2FBQU4sTUFBTTs7WUFBTixNQUFNOzJCQUFOLE1BQU07Ozs7O0FBQU4sU0FBTSxXQUNWLE1BQU0scUJBQUc7QUFDUCxZQUNFOzs7O01BQXdCLENBQ3pCO0lBQ0Y7O1VBTEcsTUFBTTtJQUFTLG1CQUFNLFNBQVM7O0tBUTlCLGNBQWM7YUFBZCxjQUFjOztZQUFkLGNBQWM7MkJBQWQsY0FBYzs7Ozs7QUFBZCxpQkFBYyxXQUNsQixNQUFNLHFCQUFHO0FBQ1AsWUFDRTs7OztNQUE4QixDQUMvQjtJQUNGOztVQUxHLGNBQWM7SUFBUyxtQkFBTSxTQUFTOztBQVE1QyxrQkFDRTs7S0FBUSxPQUFPLEVBQUUsT0FBUTtHQUN2Qjs7T0FBTyxJQUFJLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBRSxHQUFJO0tBQzdCOztTQUFPLFNBQVMsRUFBRSxTQUFVO09BQzFCLHVEQUFPLElBQUksRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFFLE1BQU8sR0FBRztPQUMxQyx1REFBTyxJQUFJLEVBQUMsaUJBQWlCLEVBQUMsU0FBUyxFQUFFLGNBQWUsR0FBRztNQUNyRDtLQUNSOztTQUFPLFNBQVMsRUFBRSxRQUFTO09BQ3pCLHVEQUFPLElBQUksRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFFLElBQUssR0FBRztNQUNoQztJQUNGO0VBQ0QsRUFDUixRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEMiLCJmaWxlIjoic2hhcmVkLXJvb3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1kb20nXG5pbXBvcnQgeyBjcmVhdGVIaXN0b3J5LCB1c2VCYXNlbmFtZSB9IGZyb20gJ2hpc3RvcnknXG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlLCBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xuXG5jb25zdCBoaXN0b3J5ID0gdXNlQmFzZW5hbWUoY3JlYXRlSGlzdG9yeSkoe1xuICBiYXNlbmFtZTogJy9zaGFyZWQtcm9vdCdcbn0pXG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPHA+XG4gICAgICAgICAgVGhpcyBpbGx1c3RyYXRlcyBob3cgcm91dGVzIGNhbiBzaGFyZSBVSSB3L28gc2hhcmluZyB0aGUgVVJMLlxuICAgICAgICAgIFdoZW4gcm91dGVzIGhhdmUgbm8gcGF0aCwgdGhleSBuZXZlciBtYXRjaCB0aGVtc2VsdmVzIGJ1dCB0aGVpclxuICAgICAgICAgIGNoaWxkcmVuIGNhbiwgYWxsb3dpbmcgXCIvc2lnbmluXCIgYW5kIFwiL2ZvcmdvdC1wYXNzd29yZFwiIHRvIGJvdGhcbiAgICAgICAgICBiZSByZW5kZXIgaW4gdGhlIDxjb2RlPlNpZ25lZE91dDwvY29kZT4gY29tcG9uZW50LlxuICAgICAgICA8L3A+XG4gICAgICAgIDxvbD5cbiAgICAgICAgICA8bGk+PExpbmsgdG89XCIvaG9tZVwiIGFjdGl2ZUNsYXNzTmFtZT1cImFjdGl2ZVwiPkhvbWU8L0xpbms+PC9saT5cbiAgICAgICAgICA8bGk+PExpbmsgdG89XCIvc2lnbmluXCIgYWN0aXZlQ2xhc3NOYW1lPVwiYWN0aXZlXCI+U2lnbiBpbjwvTGluaz48L2xpPlxuICAgICAgICAgIDxsaT48TGluayB0bz1cIi9mb3Jnb3QtcGFzc3dvcmRcIiBhY3RpdmVDbGFzc05hbWU9XCJhY3RpdmVcIj5Gb3Jnb3QgUGFzc3dvcmQ8L0xpbms+PC9saT5cbiAgICAgICAgPC9vbD5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuY2xhc3MgU2lnbmVkSW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMj5TaWduZWQgSW48L2gyPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5jbGFzcyBIb21lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aDM+V2VsY29tZSBob21lITwvaDM+XG4gICAgKVxuICB9XG59XG5cbmNsYXNzIFNpZ25lZE91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgyPlNpZ25lZCBPdXQ8L2gyPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5jbGFzcyBTaWduSW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxoMz5QbGVhc2Ugc2lnbiBpbi48L2gzPlxuICAgIClcbiAgfVxufVxuXG5jbGFzcyBGb3Jnb3RQYXNzd29yZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGgzPkZvcmdvdCB5b3VyIHBhc3N3b3JkPzwvaDM+XG4gICAgKVxuICB9XG59XG5cbnJlbmRlcigoXG4gIDxSb3V0ZXIgaGlzdG9yeT17aGlzdG9yeX0+XG4gICAgPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtBcHB9PlxuICAgICAgPFJvdXRlIGNvbXBvbmVudD17U2lnbmVkT3V0fT5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJzaWduaW5cIiBjb21wb25lbnQ9e1NpZ25Jbn0gLz5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJmb3Jnb3QtcGFzc3dvcmRcIiBjb21wb25lbnQ9e0ZvcmdvdFBhc3N3b3JkfSAvPlxuICAgICAgPC9Sb3V0ZT5cbiAgICAgIDxSb3V0ZSBjb21wb25lbnQ9e1NpZ25lZElufT5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJob21lXCIgY29tcG9uZW50PXtIb21lfSAvPlxuICAgICAgPC9Sb3V0ZT5cbiAgICA8L1JvdXRlPlxuICA8L1JvdXRlcj5cbiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJykpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL2V4YW1wbGVzL3NoYXJlZC1yb290L2FwcC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=