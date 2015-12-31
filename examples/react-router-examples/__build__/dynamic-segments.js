webpackJsonp([13],[
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
	
	var history = _history.useBasename(_history.createHistory)({
	  basename: '/dynamic-segments'
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
	        'ul',
	        null,
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/user/123', activeClassName: 'active' },
	            'Bob'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/user/abc', activeClassName: 'active' },
	            'Sally'
	          )
	        )
	      ),
	      this.props.children
	    );
	  };
	
	  return App;
	})(_react2['default'].Component);
	
	var User = (function (_React$Component2) {
	  _inherits(User, _React$Component2);
	
	  function User() {
	    _classCallCheck(this, User);
	
	    _React$Component2.apply(this, arguments);
	  }
	
	  User.prototype.render = function render() {
	    var userID = this.props.params.userID;
	
	    return _react2['default'].createElement(
	      'div',
	      { className: 'User' },
	      _react2['default'].createElement(
	        'h1',
	        null,
	        'User id: ',
	        userID
	      ),
	      _react2['default'].createElement(
	        'ul',
	        null,
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/user/' + userID + '/tasks/foo', activeClassName: 'active' },
	            'foo task'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/user/' + userID + '/tasks/bar', activeClassName: 'active' },
	            'bar task'
	          )
	        )
	      ),
	      this.props.children
	    );
	  };
	
	  return User;
	})(_react2['default'].Component);
	
	var Task = (function (_React$Component3) {
	  _inherits(Task, _React$Component3);
	
	  function Task() {
	    _classCallCheck(this, Task);
	
	    _React$Component3.apply(this, arguments);
	  }
	
	  Task.prototype.render = function render() {
	    var _props$params = this.props.params;
	    var userID = _props$params.userID;
	    var taskID = _props$params.taskID;
	
	    return _react2['default'].createElement(
	      'div',
	      { className: 'Task' },
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'User ID: ',
	        userID
	      ),
	      _react2['default'].createElement(
	        'h3',
	        null,
	        'Task ID: ',
	        taskID
	      )
	    );
	  };
	
	  return Task;
	})(_react2['default'].Component);
	
	_reactDom.render(_react2['default'].createElement(
	  _reactRouter.Router,
	  { history: history },
	  _react2['default'].createElement(
	    _reactRouter.Route,
	    { path: '/', component: App },
	    _react2['default'].createElement(
	      _reactRouter.Route,
	      { path: 'user/:userID', component: User },
	      _react2['default'].createElement(_reactRouter.Route, { path: 'tasks/:taskID', component: Task }),
	      _react2['default'].createElement(_reactRouter.Redirect, { from: 'todos/:taskID', to: 'tasks/:taskID' })
	    )
	  )
	), document.getElementById('example'));

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9keW5hbWljLXNlZ21lbnRzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7a0NBQWtCLENBQU87Ozs7cUNBQ0YsQ0FBVzs7d0NBQ1ksQ0FBYzs7b0NBQ2pCLEVBQVM7O0FBRXBELEtBQU0sT0FBTyxHQUFHLDRDQUEwQixDQUFDO0FBQ3pDLFdBQVEsRUFBRSxtQkFBbUI7RUFDOUIsQ0FBQzs7S0FFSSxHQUFHO2FBQUgsR0FBRzs7WUFBSCxHQUFHOzJCQUFILEdBQUc7Ozs7O0FBQUgsTUFBRyxXQUNQLE1BQU0scUJBQUc7QUFDUCxZQUNFOzs7T0FDRTs7O1NBQ0U7OztXQUFJOztlQUFNLEVBQUUsRUFBQyxXQUFXLEVBQUMsZUFBZSxFQUFDLFFBQVE7O1lBQVc7VUFBSztTQUNqRTs7O1dBQUk7O2VBQU0sRUFBRSxFQUFDLFdBQVcsRUFBQyxlQUFlLEVBQUMsUUFBUTs7WUFBYTtVQUFLO1FBQ2hFO09BQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO01BQ2hCLENBQ1A7SUFDRjs7VUFYRyxHQUFHO0lBQVMsbUJBQU0sU0FBUzs7S0FjM0IsSUFBSTthQUFKLElBQUk7O1lBQUosSUFBSTsyQkFBSixJQUFJOzs7OztBQUFKLE9BQUksV0FDUixNQUFNLHFCQUFHO1NBQ0MsTUFBTSxHQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUE1QixNQUFNOztBQUVkLFlBQ0U7O1NBQUssU0FBUyxFQUFDLE1BQU07T0FDbkI7Ozs7U0FBYyxNQUFNO1FBQU07T0FDMUI7OztTQUNFOzs7V0FBSTs7ZUFBTSxFQUFFLGFBQVcsTUFBTSxlQUFhLEVBQUMsZUFBZSxFQUFDLFFBQVE7O1lBQWdCO1VBQUs7U0FDeEY7OztXQUFJOztlQUFNLEVBQUUsYUFBVyxNQUFNLGVBQWEsRUFBQyxlQUFlLEVBQUMsUUFBUTs7WUFBZ0I7VUFBSztRQUNyRjtPQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtNQUNoQixDQUNQO0lBQ0Y7O1VBZEcsSUFBSTtJQUFTLG1CQUFNLFNBQVM7O0tBaUI1QixJQUFJO2FBQUosSUFBSTs7WUFBSixJQUFJOzJCQUFKLElBQUk7Ozs7O0FBQUosT0FBSSxXQUNSLE1BQU0scUJBQUc7eUJBQ29CLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtTQUFwQyxNQUFNLGlCQUFOLE1BQU07U0FBRSxNQUFNLGlCQUFOLE1BQU07O0FBRXRCLFlBQ0U7O1NBQUssU0FBUyxFQUFDLE1BQU07T0FDbkI7Ozs7U0FBYyxNQUFNO1FBQU07T0FDMUI7Ozs7U0FBYyxNQUFNO1FBQU07TUFDdEIsQ0FDUDtJQUNGOztVQVZHLElBQUk7SUFBUyxtQkFBTSxTQUFTOztBQWFsQyxrQkFDRTs7S0FBUSxPQUFPLEVBQUUsT0FBUTtHQUN2Qjs7T0FBTyxJQUFJLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBRSxHQUFJO0tBQzdCOztTQUFPLElBQUksRUFBQyxjQUFjLEVBQUMsU0FBUyxFQUFFLElBQUs7T0FDekMsdURBQU8sSUFBSSxFQUFDLGVBQWUsRUFBQyxTQUFTLEVBQUUsSUFBSyxHQUFHO09BQy9DLDBEQUFVLElBQUksRUFBQyxlQUFlLEVBQUMsRUFBRSxFQUFDLGVBQWUsR0FBRztNQUM5QztJQUNGO0VBQ0QsRUFDUixRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEMiLCJmaWxlIjoiZHluYW1pYy1zZWdtZW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCB7IFJvdXRlciwgUm91dGUsIExpbmssIFJlZGlyZWN0IH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xuaW1wb3J0IHsgY3JlYXRlSGlzdG9yeSwgdXNlQmFzZW5hbWUgfSBmcm9tICdoaXN0b3J5J1xuXG5jb25zdCBoaXN0b3J5ID0gdXNlQmFzZW5hbWUoY3JlYXRlSGlzdG9yeSkoe1xuICBiYXNlbmFtZTogJy9keW5hbWljLXNlZ21lbnRzJ1xufSlcblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8dWw+XG4gICAgICAgICAgPGxpPjxMaW5rIHRvPVwiL3VzZXIvMTIzXCIgYWN0aXZlQ2xhc3NOYW1lPVwiYWN0aXZlXCI+Qm9iPC9MaW5rPjwvbGk+XG4gICAgICAgICAgPGxpPjxMaW5rIHRvPVwiL3VzZXIvYWJjXCIgYWN0aXZlQ2xhc3NOYW1lPVwiYWN0aXZlXCI+U2FsbHk8L0xpbms+PC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuY2xhc3MgVXNlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHVzZXJJRCB9ID0gdGhpcy5wcm9wcy5wYXJhbXNcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIlVzZXJcIj5cbiAgICAgICAgPGgxPlVzZXIgaWQ6IHt1c2VySUR9PC9oMT5cbiAgICAgICAgPHVsPlxuICAgICAgICAgIDxsaT48TGluayB0bz17YC91c2VyLyR7dXNlcklEfS90YXNrcy9mb29gfSBhY3RpdmVDbGFzc05hbWU9XCJhY3RpdmVcIj5mb28gdGFzazwvTGluaz48L2xpPlxuICAgICAgICAgIDxsaT48TGluayB0bz17YC91c2VyLyR7dXNlcklEfS90YXNrcy9iYXJgfSBhY3RpdmVDbGFzc05hbWU9XCJhY3RpdmVcIj5iYXIgdGFzazwvTGluaz48L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5jbGFzcyBUYXNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgdXNlcklELCB0YXNrSUQgfSA9IHRoaXMucHJvcHMucGFyYW1zXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJUYXNrXCI+XG4gICAgICAgIDxoMj5Vc2VyIElEOiB7dXNlcklEfTwvaDI+XG4gICAgICAgIDxoMz5UYXNrIElEOiB7dGFza0lEfTwvaDM+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxucmVuZGVyKChcbiAgPFJvdXRlciBoaXN0b3J5PXtoaXN0b3J5fT5cbiAgICA8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0FwcH0+XG4gICAgICA8Um91dGUgcGF0aD1cInVzZXIvOnVzZXJJRFwiIGNvbXBvbmVudD17VXNlcn0+XG4gICAgICAgIDxSb3V0ZSBwYXRoPVwidGFza3MvOnRhc2tJRFwiIGNvbXBvbmVudD17VGFza30gLz5cbiAgICAgICAgPFJlZGlyZWN0IGZyb209XCJ0b2Rvcy86dGFza0lEXCIgdG89XCJ0YXNrcy86dGFza0lEXCIgLz5cbiAgICAgIDwvUm91dGU+XG4gICAgPC9Sb3V0ZT5cbiAgPC9Sb3V0ZXI+XG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9keW5hbWljLXNlZ21lbnRzL2FwcC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=