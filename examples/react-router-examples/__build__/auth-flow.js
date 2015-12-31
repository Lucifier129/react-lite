webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(1);
	
	var _reactRouter = __webpack_require__(2);
	
	var _history = __webpack_require__(49);
	
	var _auth = __webpack_require__(61);
	
	var _auth2 = _interopRequireDefault(_auth);
	
	var history = _history.useBasename(_history.createHistory)({
	  basename: '/auth-flow'
	});
	
	var App = _react2['default'].createClass({
	  displayName: 'App',
	
	  getInitialState: function getInitialState() {
	    return {
	      loggedIn: _auth2['default'].loggedIn()
	    };
	  },
	
	  updateAuth: function updateAuth(loggedIn) {
	    this.setState({
	      loggedIn: loggedIn
	    });
	  },
	
	  componentWillMount: function componentWillMount() {
	    _auth2['default'].onChange = this.updateAuth;
	    _auth2['default'].login();
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'ul',
	        null,
	        _react2['default'].createElement(
	          'li',
	          null,
	          this.state.loggedIn ? _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/logout' },
	            'Log out'
	          ) : _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/login' },
	            'Sign in'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/about' },
	            'About'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/dashboard' },
	            'Dashboard'
	          ),
	          ' (authenticated)'
	        )
	      ),
	      this.props.children
	    );
	  }
	});
	
	var Dashboard = _react2['default'].createClass({
	  displayName: 'Dashboard',
	
	  render: function render() {
	    var token = _auth2['default'].getToken();
	
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
	      )
	    );
	  }
	});
	
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
	
	    _auth2['default'].login(email, pass, function (loggedIn) {
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
	
	var About = _react2['default'].createClass({
	  displayName: 'About',
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'h1',
	      null,
	      'About'
	    );
	  }
	});
	
	var Logout = _react2['default'].createClass({
	  displayName: 'Logout',
	
	  componentDidMount: function componentDidMount() {
	    _auth2['default'].logout();
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'p',
	      null,
	      'You are now logged out'
	    );
	  }
	});
	
	function requireAuth(nextState, replaceState) {
	  if (!_auth2['default'].loggedIn()) replaceState({ nextPathname: nextState.location.pathname }, '/login');
	}
	
	_reactDom.render(_react2['default'].createElement(
	  _reactRouter.Router,
	  { history: history },
	  _react2['default'].createElement(
	    _reactRouter.Route,
	    { path: '/', component: App },
	    _react2['default'].createElement(_reactRouter.Route, { path: 'login', component: Login }),
	    _react2['default'].createElement(_reactRouter.Route, { path: 'logout', component: Logout }),
	    _react2['default'].createElement(_reactRouter.Route, { path: 'about', component: About }),
	    _react2['default'].createElement(_reactRouter.Route, { path: 'dashboard', component: Dashboard, onEnter: requireAuth })
	  )
	), document.getElementById('example'));

/***/ },

/***/ 61:
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  login: function login(email, pass, cb) {
	    var _this = this;
	
	    cb = arguments[arguments.length - 1];
	    if (localStorage.token) {
	      if (cb) cb(true);
	      this.onChange(true);
	      return;
	    }
	    pretendRequest(email, pass, function (res) {
	      if (res.authenticated) {
	        localStorage.token = res.token;
	        if (cb) cb(true);
	        _this.onChange(true);
	      } else {
	        if (cb) cb(false);
	        _this.onChange(false);
	      }
	    });
	  },
	
	  getToken: function getToken() {
	    return localStorage.token;
	  },
	
	  logout: function logout(cb) {
	    delete localStorage.token;
	    if (cb) cb();
	    this.onChange(false);
	  },
	
	  loggedIn: function loggedIn() {
	    return !!localStorage.token;
	  },
	
	  onChange: function onChange() {}
	};
	
	function pretendRequest(email, pass, cb) {
	  setTimeout(function () {
	    if (email === 'joe@example.com' && pass === 'password1') {
	      cb({
	        authenticated: true,
	        token: Math.random().toString(36).substring(7)
	      });
	    } else {
	      cb({ authenticated: false });
	    }
	  }, 0);
	}

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9hdXRoLWZsb3cvYXBwLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL2V4YW1wbGVzL2F1dGgtZmxvdy9hdXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztrQ0FBa0IsQ0FBTzs7OztxQ0FDRixDQUFXOzt3Q0FDVyxDQUFjOztvQ0FDaEIsRUFBUzs7aUNBQ25DLEVBQVE7Ozs7QUFFekIsS0FBTSxPQUFPLEdBQUcsNENBQTBCLENBQUM7QUFDekMsV0FBUSxFQUFFLFlBQVk7RUFDdkIsQ0FBQzs7QUFFRixLQUFNLEdBQUcsR0FBRyxtQkFBTSxXQUFXLENBQUM7OztBQUM1QixrQkFBZSw2QkFBRztBQUNoQixZQUFPO0FBQ0wsZUFBUSxFQUFFLGtCQUFLLFFBQVEsRUFBRTtNQUMxQjtJQUNGOztBQUVELGFBQVUsc0JBQUMsUUFBUSxFQUFFO0FBQ25CLFNBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixlQUFRLEVBQUUsUUFBUTtNQUNuQixDQUFDO0lBQ0g7O0FBRUQscUJBQWtCLGdDQUFHO0FBQ25CLHVCQUFLLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVTtBQUMvQix1QkFBSyxLQUFLLEVBQUU7SUFDYjs7QUFFRCxTQUFNLG9CQUFHO0FBQ1AsWUFDRTs7O09BQ0U7OztTQUNFOzs7V0FDRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FDbEI7O2VBQU0sRUFBRSxFQUFDLFNBQVM7O1lBQWUsR0FFakM7O2VBQU0sRUFBRSxFQUFDLFFBQVE7O1lBQ2xCO1VBQ0U7U0FDTDs7O1dBQUk7O2VBQU0sRUFBRSxFQUFDLFFBQVE7O1lBQWE7VUFBSztTQUN2Qzs7O1dBQUk7O2VBQU0sRUFBRSxFQUFDLFlBQVk7O1lBQWlCOztVQUFxQjtRQUM1RDtPQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtNQUNoQixDQUNQO0lBQ0Y7RUFD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QUMsWUFBWSxDQUFDLEtBQUs7SUFDNUI7O0FBRUQsV0FBUSxzQkFBRyxFQUFFO0VBQ2Q7O0FBRUQsVUFBUyxjQUFjLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7QUFDdkMsYUFBVSxDQUFDLFlBQU07QUFDZixTQUFJLEtBQUssS0FBSyxpQkFBaUIsSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFFO0FBQ3ZELFNBQUUsQ0FBQztBQUNELHNCQUFhLEVBQUUsSUFBSTtBQUNuQixjQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQy9DLENBQUM7TUFDSCxNQUFNO0FBQ0wsU0FBRSxDQUFDLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxDQUFDO01BQzdCO0lBQ0YsRUFBRSxDQUFDLENBQUMiLCJmaWxlIjoiYXV0aC1mbG93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZSwgTGluaywgSGlzdG9yeSB9IGZyb20gJ3JlYWN0LXJvdXRlcidcbmltcG9ydCB7IGNyZWF0ZUhpc3RvcnksIHVzZUJhc2VuYW1lIH0gZnJvbSAnaGlzdG9yeSdcbmltcG9ydCBhdXRoIGZyb20gJy4vYXV0aCdcblxuY29uc3QgaGlzdG9yeSA9IHVzZUJhc2VuYW1lKGNyZWF0ZUhpc3RvcnkpKHtcbiAgYmFzZW5hbWU6ICcvYXV0aC1mbG93J1xufSlcblxuY29uc3QgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxvZ2dlZEluOiBhdXRoLmxvZ2dlZEluKClcbiAgICB9XG4gIH0sXG5cbiAgdXBkYXRlQXV0aChsb2dnZWRJbikge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbG9nZ2VkSW46IGxvZ2dlZEluXG4gICAgfSlcbiAgfSxcblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgYXV0aC5vbkNoYW5nZSA9IHRoaXMudXBkYXRlQXV0aFxuICAgIGF1dGgubG9naW4oKVxuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPHVsPlxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmxvZ2dlZEluID8gKFxuICAgICAgICAgICAgICA8TGluayB0bz1cIi9sb2dvdXRcIj5Mb2cgb3V0PC9MaW5rPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpbmsgdG89XCIvbG9naW5cIj5TaWduIGluPC9MaW5rPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDxsaT48TGluayB0bz1cIi9hYm91dFwiPkFib3V0PC9MaW5rPjwvbGk+XG4gICAgICAgICAgPGxpPjxMaW5rIHRvPVwiL2Rhc2hib2FyZFwiPkRhc2hib2FyZDwvTGluaz4gKGF1dGhlbnRpY2F0ZWQpPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn0pXG5cbmNvbnN0IERhc2hib2FyZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHRva2VuID0gYXV0aC5nZXRUb2tlbigpXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPkRhc2hib2FyZDwvaDE+XG4gICAgICAgIDxwPllvdSBtYWRlIGl0ITwvcD5cbiAgICAgICAgPHA+e3Rva2VufTwvcD5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufSlcblxuY29uc3QgTG9naW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIG1peGluczogWyBIaXN0b3J5IF0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvcjogZmFsc2VcbiAgICB9XG4gIH0sXG5cbiAgaGFuZGxlU3VibWl0KGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgY29uc3QgZW1haWwgPSB0aGlzLnJlZnMuZW1haWwudmFsdWVcbiAgICBjb25zdCBwYXNzID0gdGhpcy5yZWZzLnBhc3MudmFsdWVcblxuICAgIGF1dGgubG9naW4oZW1haWwsIHBhc3MsIChsb2dnZWRJbikgPT4ge1xuICAgICAgaWYgKCFsb2dnZWRJbilcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoeyBlcnJvcjogdHJ1ZSB9KVxuXG4gICAgICBjb25zdCB7IGxvY2F0aW9uIH0gPSB0aGlzLnByb3BzXG5cbiAgICAgIGlmIChsb2NhdGlvbi5zdGF0ZSAmJiBsb2NhdGlvbi5zdGF0ZS5uZXh0UGF0aG5hbWUpIHtcbiAgICAgICAgdGhpcy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBsb2NhdGlvbi5zdGF0ZS5uZXh0UGF0aG5hbWUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsICcvJylcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0fT5cbiAgICAgICAgPGxhYmVsPjxpbnB1dCByZWY9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiZW1haWxcIiBkZWZhdWx0VmFsdWU9XCJqb2VAZXhhbXBsZS5jb21cIiAvPjwvbGFiZWw+XG4gICAgICAgIDxsYWJlbD48aW5wdXQgcmVmPVwicGFzc1wiIHBsYWNlaG9sZGVyPVwicGFzc3dvcmRcIiAvPjwvbGFiZWw+IChoaW50OiBwYXNzd29yZDEpPGJyIC8+XG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPmxvZ2luPC9idXR0b24+XG4gICAgICAgIHt0aGlzLnN0YXRlLmVycm9yICYmIChcbiAgICAgICAgICA8cD5CYWQgbG9naW4gaW5mb3JtYXRpb248L3A+XG4gICAgICAgICl9XG4gICAgICA8L2Zvcm0+XG4gICAgKVxuICB9XG59KVxuXG5jb25zdCBBYm91dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8aDE+QWJvdXQ8L2gxPlxuICB9XG59KVxuXG5jb25zdCBMb2dvdXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGF1dGgubG9nb3V0KClcbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIDxwPllvdSBhcmUgbm93IGxvZ2dlZCBvdXQ8L3A+XG4gIH1cbn0pXG5cbmZ1bmN0aW9uIHJlcXVpcmVBdXRoKG5leHRTdGF0ZSwgcmVwbGFjZVN0YXRlKSB7XG4gIGlmICghYXV0aC5sb2dnZWRJbigpKVxuICAgIHJlcGxhY2VTdGF0ZSh7IG5leHRQYXRobmFtZTogbmV4dFN0YXRlLmxvY2F0aW9uLnBhdGhuYW1lIH0sICcvbG9naW4nKVxufVxuXG5yZW5kZXIoKFxuICA8Um91dGVyIGhpc3Rvcnk9e2hpc3Rvcnl9PlxuICAgIDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17QXBwfT5cbiAgICAgIDxSb3V0ZSBwYXRoPVwibG9naW5cIiBjb21wb25lbnQ9e0xvZ2lufSAvPlxuICAgICAgPFJvdXRlIHBhdGg9XCJsb2dvdXRcIiBjb21wb25lbnQ9e0xvZ291dH0gLz5cbiAgICAgIDxSb3V0ZSBwYXRoPVwiYWJvdXRcIiBjb21wb25lbnQ9e0Fib3V0fSAvPlxuICAgICAgPFJvdXRlIHBhdGg9XCJkYXNoYm9hcmRcIiBjb21wb25lbnQ9e0Rhc2hib2FyZH0gb25FbnRlcj17cmVxdWlyZUF1dGh9IC8+XG4gICAgPC9Sb3V0ZT5cbiAgPC9Sb3V0ZXI+XG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9hdXRoLWZsb3cvYXBwLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGxvZ2luKGVtYWlsLCBwYXNzLCBjYikge1xuICAgIGNiID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXVxuICAgIGlmIChsb2NhbFN0b3JhZ2UudG9rZW4pIHtcbiAgICAgIGlmIChjYikgY2IodHJ1ZSlcbiAgICAgIHRoaXMub25DaGFuZ2UodHJ1ZSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBwcmV0ZW5kUmVxdWVzdChlbWFpbCwgcGFzcywgKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5hdXRoZW50aWNhdGVkKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS50b2tlbiA9IHJlcy50b2tlblxuICAgICAgICBpZiAoY2IpIGNiKHRydWUpXG4gICAgICAgIHRoaXMub25DaGFuZ2UodHJ1ZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjYikgY2IoZmFsc2UpXG4gICAgICAgIHRoaXMub25DaGFuZ2UoZmFsc2UpXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICBnZXRUb2tlbigpIHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnRva2VuXG4gIH0sXG5cbiAgbG9nb3V0KGNiKSB7XG4gICAgZGVsZXRlIGxvY2FsU3RvcmFnZS50b2tlblxuICAgIGlmIChjYikgY2IoKVxuICAgIHRoaXMub25DaGFuZ2UoZmFsc2UpXG4gIH0sXG5cbiAgbG9nZ2VkSW4oKSB7XG4gICAgcmV0dXJuICEhbG9jYWxTdG9yYWdlLnRva2VuXG4gIH0sXG5cbiAgb25DaGFuZ2UoKSB7fVxufVxuXG5mdW5jdGlvbiBwcmV0ZW5kUmVxdWVzdChlbWFpbCwgcGFzcywgY2IpIHtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYgKGVtYWlsID09PSAnam9lQGV4YW1wbGUuY29tJyAmJiBwYXNzID09PSAncGFzc3dvcmQxJykge1xuICAgICAgY2Ioe1xuICAgICAgICBhdXRoZW50aWNhdGVkOiB0cnVlLFxuICAgICAgICB0b2tlbjogTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBjYih7IGF1dGhlbnRpY2F0ZWQ6IGZhbHNlIH0pXG4gICAgfVxuICB9LCAwKVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9hdXRoLWZsb3cvYXV0aC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=