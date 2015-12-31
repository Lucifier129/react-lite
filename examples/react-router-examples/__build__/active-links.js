webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(1);
	
	var _reactRouter = __webpack_require__(2);
	
	var _history = __webpack_require__(49);
	
	var ACTIVE = { color: 'red' };
	
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
	        'h1',
	        null,
	        'APP!'
	      ),
	      _react2['default'].createElement(
	        'ul',
	        null,
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/', activeStyle: ACTIVE },
	            '/'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.IndexLink,
	            { to: '/', activeStyle: ACTIVE },
	            '/ IndexLink'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/users', activeStyle: ACTIVE },
	            '/users'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.IndexLink,
	            { to: '/users', activeStyle: ACTIVE },
	            '/users IndexLink'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/users/ryan', activeStyle: ACTIVE },
	            '/users/ryan'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/users/ryan', query: { foo: 'bar' }, activeStyle: ACTIVE },
	            '/users/ryan?foo=bar'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/about', activeStyle: ACTIVE },
	            '/about'
	          )
	        )
	      ),
	      this.props.children
	    );
	  };
	
	  return App;
	})(_react2['default'].Component);
	
	var Index = (function (_React$Component2) {
	  _inherits(Index, _React$Component2);
	
	  function Index() {
	    _classCallCheck(this, Index);
	
	    _React$Component2.apply(this, arguments);
	  }
	
	  Index.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'Index!'
	      )
	    );
	  };
	
	  return Index;
	})(_react2['default'].Component);
	
	var Users = (function (_React$Component3) {
	  _inherits(Users, _React$Component3);
	
	  function Users() {
	    _classCallCheck(this, Users);
	
	    _React$Component3.apply(this, arguments);
	  }
	
	  Users.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'Users'
	      )
	    );
	  };
	
	  return Users;
	})(_react2['default'].Component);
	
	var UsersIndex = (function (_React$Component4) {
	  _inherits(UsersIndex, _React$Component4);
	
	  function UsersIndex() {
	    _classCallCheck(this, UsersIndex);
	
	    _React$Component4.apply(this, arguments);
	  }
	
	  UsersIndex.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h3',
	        null,
	        'UsersIndex'
	      )
	    );
	  };
	
	  return UsersIndex;
	})(_react2['default'].Component);
	
	var User = (function (_React$Component5) {
	  _inherits(User, _React$Component5);
	
	  function User() {
	    _classCallCheck(this, User);
	
	    _React$Component5.apply(this, arguments);
	  }
	
	  User.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h3',
	        null,
	        'User ',
	        this.props.params.id
	      )
	    );
	  };
	
	  return User;
	})(_react2['default'].Component);
	
	var About = (function (_React$Component6) {
	  _inherits(About, _React$Component6);
	
	  function About() {
	    _classCallCheck(this, About);
	
	    _React$Component6.apply(this, arguments);
	  }
	
	  About.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'About'
	      )
	    );
	  };
	
	  return About;
	})(_react2['default'].Component);
	
	var history = _history.useBasename(_history.createHistory)({
	  basename: '/active-links'
	});
	
	_reactDom.render(_react2['default'].createElement(
	  _reactRouter.Router,
	  { history: history },
	  _react2['default'].createElement(
	    _reactRouter.Route,
	    { path: '/', component: App },
	    _react2['default'].createElement(_reactRouter.IndexRoute, { component: Index }),
	    _react2['default'].createElement(_reactRouter.Route, { path: '/about', component: About }),
	    _react2['default'].createElement(
	      _reactRouter.Route,
	      { path: 'users', component: Users },
	      _react2['default'].createElement(_reactRouter.IndexRoute, { component: UsersIndex }),
	      _react2['default'].createElement(_reactRouter.Route, { path: ':id', component: User })
	    )
	  )
	), document.getElementById('example'));

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9hY3RpdmUtbGlua3MvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztrQ0FBa0IsQ0FBTzs7OztxQ0FDRixDQUFXOzt3Q0FDeUIsQ0FBYzs7b0NBQzlCLEVBQVM7O0FBRXBELEtBQU0sTUFBTSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTs7S0FFekIsR0FBRzthQUFILEdBQUc7O1lBQUgsR0FBRzsyQkFBSCxHQUFHOzs7OztBQUFILE1BQUcsV0FDUCxNQUFNLHFCQUFHO0FBQ1AsWUFDRTs7O09BQ0U7Ozs7UUFBYTtPQUNiOzs7U0FDRTs7O1dBQUk7O2VBQVcsRUFBRSxFQUFDLEdBQUcsRUFBVyxXQUFXLEVBQUUsTUFBTzs7WUFBUztVQUFLO1NBQ2xFOzs7V0FBSTs7ZUFBVyxFQUFFLEVBQUMsR0FBRyxFQUFXLFdBQVcsRUFBRSxNQUFPOztZQUF3QjtVQUFLO1NBRWpGOzs7V0FBSTs7ZUFBVyxFQUFFLEVBQUMsUUFBUSxFQUFNLFdBQVcsRUFBRSxNQUFPOztZQUFjO1VBQUs7U0FDdkU7OztXQUFJOztlQUFXLEVBQUUsRUFBQyxRQUFRLEVBQU0sV0FBVyxFQUFFLE1BQU87O1lBQTZCO1VBQUs7U0FFdEY7OztXQUFJOztlQUFXLEVBQUUsRUFBQyxhQUFhLEVBQUMsV0FBVyxFQUFFLE1BQU87O1lBQW1CO1VBQUs7U0FDNUU7OztXQUFJOztlQUFXLEVBQUUsRUFBQyxhQUFhLEVBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRyxFQUFDLFdBQVcsRUFBRSxNQUFPOztZQUEyQjtVQUFLO1NBRTNHOzs7V0FBSTs7ZUFBVyxFQUFFLEVBQUMsUUFBUSxFQUFNLFdBQVcsRUFBRSxNQUFPOztZQUFjO1VBQUs7UUFDcEU7T0FFSixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7TUFDaEIsQ0FDUDtJQUNGOztVQXJCRyxHQUFHO0lBQVMsbUJBQU0sU0FBUzs7S0F3QjNCLEtBQUs7YUFBTCxLQUFLOztZQUFMLEtBQUs7MkJBQUwsS0FBSzs7Ozs7QUFBTCxRQUFLLFdBQ1QsTUFBTSxxQkFBRztBQUNQLFlBQ0U7OztPQUNFOzs7O1FBQWU7TUFDWCxDQUNQO0lBQ0Y7O1VBUEcsS0FBSztJQUFTLG1CQUFNLFNBQVM7O0tBVTdCLEtBQUs7YUFBTCxLQUFLOztZQUFMLEtBQUs7MkJBQUwsS0FBSzs7Ozs7QUFBTCxRQUFLLFdBQ1QsTUFBTSxxQkFBRztBQUNQLFlBQ0U7OztPQUNFOzs7O1FBQWM7TUFDVixDQUNQO0lBQ0Y7O1VBUEcsS0FBSztJQUFTLG1CQUFNLFNBQVM7O0tBVTdCLFVBQVU7YUFBVixVQUFVOztZQUFWLFVBQVU7MkJBQVYsVUFBVTs7Ozs7QUFBVixhQUFVLFdBQ2QsTUFBTSxxQkFBRztBQUNQLFlBQ0U7OztPQUNFOzs7O1FBQW1CO01BQ2YsQ0FDUDtJQUNGOztVQVBHLFVBQVU7SUFBUyxtQkFBTSxTQUFTOztLQVVsQyxJQUFJO2FBQUosSUFBSTs7WUFBSixJQUFJOzJCQUFKLElBQUk7Ozs7O0FBQUosT0FBSSxXQUNSLE1BQU0scUJBQUc7QUFDUCxZQUNFOzs7T0FDRTs7OztTQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFBTTtNQUNoQyxDQUNQO0lBQ0Y7O1VBUEcsSUFBSTtJQUFTLG1CQUFNLFNBQVM7O0tBVTVCLEtBQUs7YUFBTCxLQUFLOztZQUFMLEtBQUs7MkJBQUwsS0FBSzs7Ozs7QUFBTCxRQUFLLFdBQ1QsTUFBTSxxQkFBRztBQUNQLFlBQ0U7OztPQUNFOzs7O1FBQWM7TUFDVixDQUNQO0lBQ0Y7O1VBUEcsS0FBSztJQUFTLG1CQUFNLFNBQVM7O0FBVW5DLEtBQU0sT0FBTyxHQUFHLDRDQUEwQixDQUFDO0FBQ3pDLFdBQVEsRUFBRSxlQUFlO0VBQzFCLENBQUM7O0FBRUYsa0JBQ0U7O0tBQVEsT0FBTyxFQUFFLE9BQVE7R0FDdkI7O09BQU8sSUFBSSxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUUsR0FBSTtLQUM3Qiw0REFBWSxTQUFTLEVBQUUsS0FBTSxHQUFFO0tBQy9CLHVEQUFPLElBQUksRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFFLEtBQU0sR0FBRTtLQUN4Qzs7U0FBTyxJQUFJLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFNO09BQ25DLDREQUFZLFNBQVMsRUFBRSxVQUFXLEdBQUU7T0FDcEMsdURBQU8sSUFBSSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUUsSUFBSyxHQUFFO01BQzlCO0lBQ0Y7RUFDRCxFQUNSLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQyIsImZpbGUiOiJhY3RpdmUtbGlua3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1kb20nXG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBMaW5rLCBJbmRleExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG5pbXBvcnQgeyBjcmVhdGVIaXN0b3J5LCB1c2VCYXNlbmFtZSB9IGZyb20gJ2hpc3RvcnknXG5cbmNvbnN0IEFDVElWRSA9IHsgY29sb3I6ICdyZWQnIH1cblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDE+QVBQITwvaDE+XG4gICAgICAgIDx1bD5cbiAgICAgICAgICA8bGk+PExpbmsgICAgICB0bz1cIi9cIiAgICAgICAgICAgYWN0aXZlU3R5bGU9e0FDVElWRX0+LzwvTGluaz48L2xpPlxuICAgICAgICAgIDxsaT48SW5kZXhMaW5rIHRvPVwiL1wiICAgICAgICAgICBhY3RpdmVTdHlsZT17QUNUSVZFfT4vIEluZGV4TGluazwvSW5kZXhMaW5rPjwvbGk+XG5cbiAgICAgICAgICA8bGk+PExpbmsgICAgICB0bz1cIi91c2Vyc1wiICAgICAgYWN0aXZlU3R5bGU9e0FDVElWRX0+L3VzZXJzPC9MaW5rPjwvbGk+XG4gICAgICAgICAgPGxpPjxJbmRleExpbmsgdG89XCIvdXNlcnNcIiAgICAgIGFjdGl2ZVN0eWxlPXtBQ1RJVkV9Pi91c2VycyBJbmRleExpbms8L0luZGV4TGluaz48L2xpPlxuXG4gICAgICAgICAgPGxpPjxMaW5rICAgICAgdG89XCIvdXNlcnMvcnlhblwiIGFjdGl2ZVN0eWxlPXtBQ1RJVkV9Pi91c2Vycy9yeWFuPC9MaW5rPjwvbGk+XG4gICAgICAgICAgPGxpPjxMaW5rICAgICAgdG89XCIvdXNlcnMvcnlhblwiIHF1ZXJ5PXt7IGZvbzogJ2JhcicgfX0gYWN0aXZlU3R5bGU9e0FDVElWRX0+L3VzZXJzL3J5YW4/Zm9vPWJhcjwvTGluaz48L2xpPlxuXG4gICAgICAgICAgPGxpPjxMaW5rICAgICAgdG89XCIvYWJvdXRcIiAgICAgIGFjdGl2ZVN0eWxlPXtBQ1RJVkV9Pi9hYm91dDwvTGluaz48L2xpPlxuICAgICAgICA8L3VsPlxuXG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmNsYXNzIEluZGV4IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDI+SW5kZXghPC9oMj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5jbGFzcyBVc2VycyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgyPlVzZXJzPC9oMj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5jbGFzcyBVc2Vyc0luZGV4IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDM+VXNlcnNJbmRleDwvaDM+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuY2xhc3MgVXNlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgzPlVzZXIge3RoaXMucHJvcHMucGFyYW1zLmlkfTwvaDM+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuY2xhc3MgQWJvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMj5BYm91dDwvaDI+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuY29uc3QgaGlzdG9yeSA9IHVzZUJhc2VuYW1lKGNyZWF0ZUhpc3RvcnkpKHtcbiAgYmFzZW5hbWU6ICcvYWN0aXZlLWxpbmtzJ1xufSlcblxucmVuZGVyKChcbiAgPFJvdXRlciBoaXN0b3J5PXtoaXN0b3J5fT5cbiAgICA8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0FwcH0+XG4gICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0luZGV4fS8+XG4gICAgICA8Um91dGUgcGF0aD1cIi9hYm91dFwiIGNvbXBvbmVudD17QWJvdXR9Lz5cbiAgICAgIDxSb3V0ZSBwYXRoPVwidXNlcnNcIiBjb21wb25lbnQ9e1VzZXJzfT5cbiAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtVc2Vyc0luZGV4fS8+XG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiOmlkXCIgY29tcG9uZW50PXtVc2VyfS8+XG4gICAgICA8L1JvdXRlPlxuICAgIDwvUm91dGU+XG4gIDwvUm91dGVyPlxuKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4YW1wbGUnKSlcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9hY3RpdmUtbGlua3MvYXBwLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==