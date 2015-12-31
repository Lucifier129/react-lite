webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(1);
	
	var _reactRouter = __webpack_require__(2);
	
	var _configRoutes = __webpack_require__(62);
	
	var _configRoutes2 = _interopRequireDefault(_configRoutes);
	
	var _history = __webpack_require__(49);
	
	var history = _history.useBasename(_history.createHistory)({
	  basename: '/auth-with-shared-root'
	});
	
	_reactDom.render(_react2['default'].createElement(_reactRouter.Router, { history: history, routes: _configRoutes2['default'] }), document.getElementById('example'));

/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsAuthJs = __webpack_require__(63);
	
	var _utilsAuthJs2 = _interopRequireDefault(_utilsAuthJs);
	
	function redirectToLogin(nextState, replaceState) {
	  if (!_utilsAuthJs2['default'].loggedIn()) {
	    replaceState({
	      nextPathname: nextState.location.pathname
	    }, '/login');
	  }
	}
	
	function redirectToDashboard(nextState, replaceState) {
	  if (_utilsAuthJs2['default'].loggedIn()) {
	    replaceState(null, '/');
	  }
	}
	
	exports['default'] = {
	  component: __webpack_require__(64),
	  childRoutes: [{ path: '/logout',
	    getComponent: function getComponent(location, cb) {
	      __webpack_require__.e/* nsure */(4, function (require) {
	        cb(null, __webpack_require__(65));
	      });
	    }
	  }, { path: '/about',
	    getComponent: function getComponent(location, cb) {
	      __webpack_require__.e/* nsure */(5, function (require) {
	        cb(null, __webpack_require__(66));
	      });
	    }
	  }, { onEnter: redirectToDashboard,
	    childRoutes: [
	    // Unauthenticated routes
	    // Redirect to dashboard if user is already logged in
	    { path: '/login',
	      getComponent: function getComponent(location, cb) {
	        __webpack_require__.e/* nsure */(6, function (require) {
	          cb(null, __webpack_require__(67));
	        });
	      }
	    }
	    // ...
	    ]
	  }, { onEnter: redirectToLogin,
	    childRoutes: [
	    // Protected routes that don't share the dashboard UI
	    { path: '/user/:id',
	      getComponent: function getComponent(location, cb) {
	        __webpack_require__.e/* nsure */(7, function (require) {
	          cb(null, __webpack_require__(68));
	        });
	      }
	    }
	    // ...
	    ]
	  }, { path: '/',
	    getComponent: function getComponent(location, cb) {
	      // Share the path
	      // Dynamically load the correct component
	      if (_utilsAuthJs2['default'].loggedIn()) {
	        return __webpack_require__.e/* nsure */(8, function (require) {
	          cb(null, __webpack_require__(69));
	        });
	      }
	      return __webpack_require__.e/* nsure */(9, function (require) {
	        cb(null, __webpack_require__(70));
	      });
	    },
	    indexRoute: {
	      getComponent: function getComponent(location, cb) {
	        // Only load if we're logged in
	        if (_utilsAuthJs2['default'].loggedIn()) {
	          return __webpack_require__.e/* nsure */(10, function (require) {
	            cb(null, __webpack_require__(71));
	          });
	        }
	        return cb();
	      }
	    },
	    childRoutes: [{ onEnter: redirectToLogin,
	      childRoutes: [
	      // Protected nested routes for the dashboard
	      { path: '/page2',
	        getComponent: function getComponent(location, cb) {
	          __webpack_require__.e/* nsure */(11, function (require) {
	            cb(null, __webpack_require__(72));
	          });
	        }
	      }
	      // ...
	      ]
	    }]
	  }]
	};
	module.exports = exports['default'];

/***/ },

/***/ 63:
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

/***/ },

/***/ 64:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(2);
	
	var _utilsAuth = __webpack_require__(63);
	
	var _utilsAuth2 = _interopRequireDefault(_utilsAuth);
	
	var App = _react2['default'].createClass({
	  displayName: 'App',
	
	  getInitialState: function getInitialState() {
	    return {
	      loggedIn: _utilsAuth2['default'].loggedIn()
	    };
	  },
	
	  updateAuth: function updateAuth(loggedIn) {
	    this.setState({
	      loggedIn: !!loggedIn
	    });
	  },
	
	  componentWillMount: function componentWillMount() {
	    _utilsAuth2['default'].onChange = this.updateAuth;
	    _utilsAuth2['default'].login();
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
	            { to: '/' },
	            'Home'
	          ),
	          ' (changes depending on auth status)'
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/page2' },
	            'Page Two'
	          ),
	          ' (authenticated)'
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/user/foo' },
	            'User: Foo'
	          ),
	          ' (authenticated)'
	        )
	      ),
	      this.props.children
	    );
	  }
	
	});
	
	exports['default'] = App;
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9hdXRoLXdpdGgtc2hhcmVkLXJvb3QvYXBwLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL2V4YW1wbGVzL2F1dGgtd2l0aC1zaGFyZWQtcm9vdC9jb25maWcvcm91dGVzLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL2V4YW1wbGVzL2F1dGgtd2l0aC1zaGFyZWQtcm9vdC91dGlscy9hdXRoLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL2V4YW1wbGVzL2F1dGgtd2l0aC1zaGFyZWQtcm9vdC9jb21wb25lbnRzL0FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7a0NBQWtCLENBQU87Ozs7cUNBQ0YsQ0FBVzs7d0NBQ1gsQ0FBYzs7eUNBQ2xCLEVBQWlCOzs7O29DQUNPLEVBQVM7O0FBRXBELEtBQU0sT0FBTyxHQUFHLDRDQUEwQixDQUFDO0FBQ3pDLFdBQVEsRUFBRSx3QkFBd0I7RUFDbkMsQ0FBQzs7QUFFRixrQkFBTyx3REFBUSxPQUFPLEVBQUUsT0FBUSxFQUFDLE1BQU0sMkJBQVMsR0FBRSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQzs7Ozs7Ozs7Ozs7Ozt3Q0NWdEUsRUFBa0I7Ozs7QUFFbkMsVUFBUyxlQUFlLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRTtBQUNoRCxPQUFJLENBQUMseUJBQUssUUFBUSxFQUFFLEVBQUU7QUFDcEIsaUJBQVksQ0FBQztBQUNYLG1CQUFZLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRO01BQzFDLEVBQUUsUUFBUSxDQUFDO0lBQ2I7RUFDRjs7QUFFRCxVQUFTLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUU7QUFDcEQsT0FBSSx5QkFBSyxRQUFRLEVBQUUs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Rjs7RUFFRixDQUFDOztzQkFFYSxHQUFHIiwiZmlsZSI6ImF1dGgtd2l0aC1zaGFyZWQtcm9vdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlcidcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi9jb25maWcvcm91dGVzJ1xuaW1wb3J0IHsgY3JlYXRlSGlzdG9yeSwgdXNlQmFzZW5hbWUgfSBmcm9tICdoaXN0b3J5J1xuXG5jb25zdCBoaXN0b3J5ID0gdXNlQmFzZW5hbWUoY3JlYXRlSGlzdG9yeSkoe1xuICBiYXNlbmFtZTogJy9hdXRoLXdpdGgtc2hhcmVkLXJvb3QnXG59KVxuXG5yZW5kZXIoPFJvdXRlciBoaXN0b3J5PXtoaXN0b3J5fSByb3V0ZXM9e3JvdXRlc30vPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4YW1wbGUnKSlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvZXhhbXBsZXMvYXV0aC13aXRoLXNoYXJlZC1yb290L2FwcC5qc1xuICoqLyIsImltcG9ydCBhdXRoIGZyb20gJy4uL3V0aWxzL2F1dGguanMnXG5cbmZ1bmN0aW9uIHJlZGlyZWN0VG9Mb2dpbihuZXh0U3RhdGUsIHJlcGxhY2VTdGF0ZSkge1xuICBpZiAoIWF1dGgubG9nZ2VkSW4oKSkge1xuICAgIHJlcGxhY2VTdGF0ZSh7XG4gICAgICBuZXh0UGF0aG5hbWU6IG5leHRTdGF0ZS5sb2NhdGlvbi5wYXRobmFtZVxuICAgIH0sICcvbG9naW4nKVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlZGlyZWN0VG9EYXNoYm9hcmQobmV4dFN0YXRlLCByZXBsYWNlU3RhdGUpIHtcbiAgaWYgKGF1dGgubG9nZ2VkSW4oKSkge1xuICAgIHJlcGxhY2VTdGF0ZShudWxsLCAnLycpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnQ6IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvQXBwJyksXG4gIGNoaWxkUm91dGVzOiBbXG4gICAgeyBwYXRoOiAnL2xvZ291dCcsXG4gICAgICBnZXRDb21wb25lbnQ6IChsb2NhdGlvbiwgY2IpID0+IHtcbiAgICAgICAgcmVxdWlyZS5lbnN1cmUoW10sIChyZXF1aXJlKSA9PiB7XG4gICAgICAgICAgY2IobnVsbCwgcmVxdWlyZSgnLi4vY29tcG9uZW50cy9Mb2dvdXQnKSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LFxuICAgIHsgcGF0aDogJy9hYm91dCcsXG4gICAgICBnZXRDb21wb25lbnQ6IChsb2NhdGlvbiwgY2IpID0+IHtcbiAgICAgICAgcmVxdWlyZS5lbnN1cmUoW10sIChyZXF1aXJlKSA9PiB7XG4gICAgICAgICAgY2IobnVsbCwgcmVxdWlyZSgnLi4vY29tcG9uZW50cy9BYm91dCcpKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB7IG9uRW50ZXI6IHJlZGlyZWN0VG9EYXNoYm9hcmQsXG4gICAgICBjaGlsZFJvdXRlczogW1xuICAgICAgICAvLyBVbmF1dGhlbnRpY2F0ZWQgcm91dGVzXG4gICAgICAgIC8vIFJlZGlyZWN0IHRvIGRhc2hib2FyZCBpZiB1c2VyIGlzIGFscmVhZHkgbG9nZ2VkIGluXG4gICAgICAgIHsgcGF0aDogJy9sb2dpbicsXG4gICAgICAgICAgZ2V0Q29tcG9uZW50OiAobG9jYXRpb24sIGNiKSA9PiB7XG4gICAgICAgICAgICByZXF1aXJlLmVuc3VyZShbXSwgKHJlcXVpcmUpID0+IHtcbiAgICAgICAgICAgICAgY2IobnVsbCwgcmVxdWlyZSgnLi4vY29tcG9uZW50cy9Mb2dpbicpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gLi4uXG4gICAgICBdXG4gICAgfSxcblxuICAgIHsgb25FbnRlcjogcmVkaXJlY3RUb0xvZ2luLFxuICAgICAgY2hpbGRSb3V0ZXM6IFtcbiAgICAgICAgLy8gUHJvdGVjdGVkIHJvdXRlcyB0aGF0IGRvbid0IHNoYXJlIHRoZSBkYXNoYm9hcmQgVUlcbiAgICAgICAgeyBwYXRoOiAnL3VzZXIvOmlkJyxcbiAgICAgICAgICBnZXRDb21wb25lbnQ6IChsb2NhdGlvbiwgY2IpID0+IHtcbiAgICAgICAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAocmVxdWlyZSkgPT4ge1xuICAgICAgICAgICAgICBjYihudWxsLCByZXF1aXJlKCcuLi9jb21wb25lbnRzL1VzZXInKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIC4uLlxuICAgICAgXVxuICAgIH0sXG5cbiAgICB7IHBhdGg6ICcvJyxcbiAgICAgIGdldENvbXBvbmVudDogKGxvY2F0aW9uLCBjYikgPT4ge1xuICAgICAgICAvLyBTaGFyZSB0aGUgcGF0aFxuICAgICAgICAvLyBEeW5hbWljYWxseSBsb2FkIHRoZSBjb3JyZWN0IGNvbXBvbmVudFxuICAgICAgICBpZiAoYXV0aC5sb2dnZWRJbigpKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFtdLCAocmVxdWlyZSkgPT4ge1xuICAgICAgICAgICAgY2IobnVsbCwgcmVxdWlyZSgnLi4vY29tcG9uZW50cy9EYXNoYm9hcmQnKSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbXSwgKHJlcXVpcmUpID0+IHtcbiAgICAgICAgICBjYihudWxsLCByZXF1aXJlKCcuLi9jb21wb25lbnRzL0xhbmRpbmcnKSlcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBpbmRleFJvdXRlOiB7XG4gICAgICAgIGdldENvbXBvbmVudDogKGxvY2F0aW9uLCBjYikgPT4ge1xuICAgICAgICAgIC8vIE9ubHkgbG9hZCBpZiB3ZSdyZSBsb2dnZWQgaW5cbiAgICAgICAgICBpZiAoYXV0aC5sb2dnZWRJbigpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoW10sIChyZXF1aXJlKSA9PiB7XG4gICAgICAgICAgICAgIGNiKG51bGwsIHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvUGFnZU9uZScpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGNiKClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNoaWxkUm91dGVzOiBbXG4gICAgICAgIHsgb25FbnRlcjogcmVkaXJlY3RUb0xvZ2luLFxuICAgICAgICAgIGNoaWxkUm91dGVzOiBbXG4gICAgICAgICAgICAvLyBQcm90ZWN0ZWQgbmVzdGVkIHJvdXRlcyBmb3IgdGhlIGRhc2hib2FyZFxuICAgICAgICAgICAgeyBwYXRoOiAnL3BhZ2UyJyxcbiAgICAgICAgICAgICAgZ2V0Q29tcG9uZW50OiAobG9jYXRpb24sIGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVxdWlyZS5lbnN1cmUoW10sIChyZXF1aXJlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjYihudWxsLCByZXF1aXJlKCcuLi9jb21wb25lbnRzL1BhZ2VUd28nKSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAuLi5cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG5cbiAgXVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9hdXRoLXdpdGgtc2hhcmVkLXJvb3QvY29uZmlnL3JvdXRlcy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBsb2dpbihlbWFpbCwgcGFzcywgY2IpIHtcbiAgICBjYiA9IGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV1cbiAgICBpZiAobG9jYWxTdG9yYWdlLnRva2VuKSB7XG4gICAgICBpZiAoY2IpIGNiKHRydWUpXG4gICAgICB0aGlzLm9uQ2hhbmdlKHRydWUpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgcHJldGVuZFJlcXVlc3QoZW1haWwsIHBhc3MsIChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMuYXV0aGVudGljYXRlZCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UudG9rZW4gPSByZXMudG9rZW5cbiAgICAgICAgaWYgKGNiKSBjYih0cnVlKVxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRydWUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY2IpIGNiKGZhbHNlKVxuICAgICAgICB0aGlzLm9uQ2hhbmdlKGZhbHNlKVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgZ2V0VG9rZW46IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnRva2VuXG4gIH0sXG5cbiAgbG9nb3V0OiBmdW5jdGlvbiAoY2IpIHtcbiAgICBkZWxldGUgbG9jYWxTdG9yYWdlLnRva2VuXG4gICAgaWYgKGNiKSBjYigpXG4gICAgdGhpcy5vbkNoYW5nZShmYWxzZSlcbiAgfSxcblxuICBsb2dnZWRJbjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAhIWxvY2FsU3RvcmFnZS50b2tlblxuICB9LFxuXG4gIG9uQ2hhbmdlOiBmdW5jdGlvbiAoKSB7fVxufVxuXG5mdW5jdGlvbiBwcmV0ZW5kUmVxdWVzdChlbWFpbCwgcGFzcywgY2IpIHtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYgKGVtYWlsID09PSAnam9lQGV4YW1wbGUuY29tJyAmJiBwYXNzID09PSAncGFzc3dvcmQxJykge1xuICAgICAgY2Ioe1xuICAgICAgICBhdXRoZW50aWNhdGVkOiB0cnVlLFxuICAgICAgICB0b2tlbjogTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBjYih7IGF1dGhlbnRpY2F0ZWQ6IGZhbHNlIH0pXG4gICAgfVxuICB9LCAwKVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9hdXRoLXdpdGgtc2hhcmVkLXJvb3QvdXRpbHMvYXV0aC5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG5pbXBvcnQgYXV0aCBmcm9tICcuLi91dGlscy9hdXRoJ1xuXG5jb25zdCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsb2dnZWRJbjogYXV0aC5sb2dnZWRJbigpXG4gICAgfVxuICB9LFxuXG4gIHVwZGF0ZUF1dGgobG9nZ2VkSW4pIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGxvZ2dlZEluOiAhIWxvZ2dlZEluXG4gICAgfSlcbiAgfSxcblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgYXV0aC5vbkNoYW5nZSA9IHRoaXMudXBkYXRlQXV0aFxuICAgIGF1dGgubG9naW4oKVxuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPHVsPlxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmxvZ2dlZEluID8gKFxuICAgICAgICAgICAgICA8TGluayB0bz1cIi9sb2dvdXRcIj5Mb2cgb3V0PC9MaW5rPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExpbmsgdG89XCIvbG9naW5cIj5TaWduIGluPC9MaW5rPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDxsaT48TGluayB0bz1cIi9hYm91dFwiPkFib3V0PC9MaW5rPjwvbGk+XG4gICAgICAgICAgPGxpPjxMaW5rIHRvPVwiL1wiPkhvbWU8L0xpbms+IChjaGFuZ2VzIGRlcGVuZGluZyBvbiBhdXRoIHN0YXR1cyk8L2xpPlxuICAgICAgICAgIDxsaT48TGluayB0bz1cIi9wYWdlMlwiPlBhZ2UgVHdvPC9MaW5rPiAoYXV0aGVudGljYXRlZCk8L2xpPlxuICAgICAgICAgIDxsaT48TGluayB0bz1cIi91c2VyL2Zvb1wiPlVzZXI6IEZvbzwvTGluaz4gKGF1dGhlbnRpY2F0ZWQpPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgQXBwXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL2V4YW1wbGVzL2F1dGgtd2l0aC1zaGFyZWQtcm9vdC9jb21wb25lbnRzL0FwcC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=