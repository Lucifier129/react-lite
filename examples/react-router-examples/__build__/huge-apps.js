webpackJsonp([14],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/*eslint-disable no-unused-vars */
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(1);
	
	var _history = __webpack_require__(49);
	
	var _reactRouter = __webpack_require__(2);
	
	var _stubsCOURSES = __webpack_require__(75);
	
	var _stubsCOURSES2 = _interopRequireDefault(_stubsCOURSES);
	
	var history = _history.useBasename(_history.createHistory)({
	  basename: '/huge-apps'
	});
	
	var rootRoute = {
	  component: 'div',
	  childRoutes: [{
	    path: '/',
	    component: __webpack_require__(76),
	    childRoutes: [__webpack_require__(79), __webpack_require__(81), __webpack_require__(82), __webpack_require__(84), __webpack_require__(86)]
	  }]
	};
	
	_reactDom.render(_react2['default'].createElement(_reactRouter.Router, { history: history, routes: rootRoute }), document.getElementById('example'));
	
	// I've unrolled the recursive directory loop that is happening above to get a
	// better idea of just what this huge-apps Router looks like
	//
	// import { Route } from 'react-router'

	// import App from './components/App'
	// import Course from './routes/Course/components/Course'
	// import AnnouncementsSidebar from './routes/Course/routes/Announcements/components/Sidebar'
	// import Announcements from './routes/Course/routes/Announcements/components/Announcements'
	// import Announcement from './routes/Course/routes/Announcements/routes/Announcement/components/Announcement'
	// import AssignmentsSidebar from './routes/Course/routes/Assignments/components/Sidebar'
	// import Assignments from './routes/Course/routes/Assignments/components/Assignments'
	// import Assignment from './routes/Course/routes/Assignments/routes/Assignment/components/Assignment'
	// import CourseGrades from './routes/Course/routes/Grades/components/Grades'
	// import Calendar from './routes/Calendar/components/Calendar'
	// import Grades from './routes/Grades/components/Grades'
	// import Messages from './routes/Messages/components/Messages'

	// render(
	//   <Router>
	//     <Route path="/" component={App}>
	//       <Route path="calendar" component={Calendar} />
	//       <Route path="course/:courseId" component={Course}>
	//         <Route path="announcements" components={{
	//           sidebar: AnnouncementsSidebar,
	//           main: Announcements
	//         }}>
	//           <Route path=":announcementId" component={Announcement} />
	//         </Route>
	//         <Route path="assignments" components={{
	//           sidebar: AssignmentsSidebar,
	//           main: Assignments
	//         }}>
	//           <Route path=":assignmentId" component={Assignment} />
	//         </Route>
	//         <Route path="grades" component={CourseGrades} />
	//       </Route>
	//       <Route path="grades" component={Grades} />
	//       <Route path="messages" component={Messages} />
	//       <Route path="profile" component={Calendar} />
	//     </Route>
	//   </Router>,
	//   document.getElementById('example')
	// )

/***/ },

/***/ 75:
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	global.COURSES = [{
	  id: 0,
	  name: 'React Fundamentals',
	  grade: 'B',
	  announcements: [{
	    id: 0,
	    title: 'No class tomorrow',
	    body: 'There is no class tomorrow, please do not show up'
	  }],
	  assignments: [{
	    id: 0,
	    title: 'Build a router',
	    body: 'It will be easy, seriously, like 2 hours, 100 lines of code, no biggie',
	    grade: 'N/A'
	  }]
	
	}, {
	  id: 1,
	  name: 'Reusable React Components',
	  grade: 'A-',
	  announcements: [{
	    id: 0,
	    title: 'Final exam next wednesday',
	    body: 'You had better prepare'
	  }],
	  assignments: [{
	    id: 0,
	    title: 'PropTypes',
	    body: 'They aren\'t for you.',
	    grade: '80%'
	  }, {
	    id: 1,
	    title: 'Iterating and Cloning Children',
	    body: 'You can totally do it.',
	    grade: '95%'
	  }]
	}];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 76:
/***/ function(module, exports, __webpack_require__) {

	/*globals COURSES:true */
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Dashboard = __webpack_require__(77);
	
	var _Dashboard2 = _interopRequireDefault(_Dashboard);
	
	var _GlobalNav = __webpack_require__(78);
	
	var _GlobalNav2 = _interopRequireDefault(_GlobalNav);
	
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
	      _react2['default'].createElement(_GlobalNav2['default'], null),
	      _react2['default'].createElement(
	        'div',
	        { style: { padding: 20 } },
	        this.props.children || _react2['default'].createElement(_Dashboard2['default'], { courses: COURSES })
	      )
	    );
	  };
	
	  return App;
	})(_react2['default'].Component);
	
	module.exports = App;

/***/ },

/***/ 77:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(2);
	
	var Dashboard = (function (_React$Component) {
	  _inherits(Dashboard, _React$Component);
	
	  function Dashboard() {
	    _classCallCheck(this, Dashboard);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  Dashboard.prototype.render = function render() {
	    var courses = this.props.courses;
	
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'Super Scalable Apps'
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        'Open the network tab as you navigate. Notice that only the amount of your app that is required is actually downloaded as you navigate around. Even the route configuration objects are loaded on the fly. This way, a new route added deep in your app will not affect the initial bundle of your application.'
	      ),
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'Courses'
	      ),
	      ' ',
	      _react2['default'].createElement(
	        'ul',
	        null,
	        courses.map(function (course) {
	          return _react2['default'].createElement(
	            'li',
	            { key: course.id },
	            _react2['default'].createElement(
	              _reactRouter.Link,
	              { to: '/course/' + course.id },
	              course.name
	            )
	          );
	        })
	      )
	    );
	  };
	
	  return Dashboard;
	})(_react2['default'].Component);
	
	exports['default'] = Dashboard;
	module.exports = exports['default'];

/***/ },

/***/ 78:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(2);
	
	var dark = 'hsl(200, 20%, 20%)';
	var light = '#fff';
	var styles = {};
	
	styles.wrapper = {
	  padding: '10px 20px',
	  overflow: 'hidden',
	  background: dark,
	  color: light
	};
	
	styles.link = {
	  padding: 11,
	  color: light,
	  fontWeight: 200
	};
	
	styles.activeLink = _extends({}, styles.link, {
	  background: light,
	  color: dark
	});
	
	var GlobalNav = (function (_React$Component) {
	  _inherits(GlobalNav, _React$Component);
	
	  function GlobalNav(props, context) {
	    _classCallCheck(this, GlobalNav);
	
	    _React$Component.call(this, props, context);
	    this.logOut = this.logOut.bind(this);
	  }
	
	  GlobalNav.prototype.logOut = function logOut() {
	    alert('log out');
	  };
	
	  GlobalNav.prototype.render = function render() {
	    var user = this.props.user;
	
	    return _react2['default'].createElement(
	      'div',
	      { style: styles.wrapper },
	      _react2['default'].createElement(
	        'div',
	        { style: { float: 'left' } },
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/', style: styles.link },
	          'Home'
	        ),
	        ' ',
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/calendar', style: styles.link, activeStyle: styles.activeLink },
	          'Calendar'
	        ),
	        ' ',
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/grades', style: styles.link, activeStyle: styles.activeLink },
	          'Grades'
	        ),
	        ' ',
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/messages', style: styles.link, activeStyle: styles.activeLink },
	          'Messages'
	        ),
	        ' '
	      ),
	      _react2['default'].createElement(
	        'div',
	        { style: { float: 'right' } },
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { style: styles.link, to: '/profile' },
	          user.name
	        ),
	        ' ',
	        _react2['default'].createElement(
	          'button',
	          { onClick: this.logOut },
	          'log out'
	        )
	      )
	    );
	  };
	
	  return GlobalNav;
	})(_react2['default'].Component);
	
	GlobalNav.defaultProps = {
	  user: {
	    id: 1,
	    name: 'Ryan Florence'
	  }
	};
	
	exports['default'] = GlobalNav;
	module.exports = exports['default'];

/***/ },

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  path: 'calendar',
	  getComponent: function getComponent(location, cb) {
	    __webpack_require__.e/* nsure */(15, function (require) {
	      cb(null, __webpack_require__(80));
	    });
	  }
	};

/***/ },

/***/ 81:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  path: 'assignments',
	
	  getChildRoutes: function getChildRoutes(location, cb) {
	    !/* require.ensure */(function (require) {
	      cb(null, [__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./routes/Assignment\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))]);
	    }(__webpack_require__));
	  },
	
	  getComponents: function getComponents(location, cb) {
	    !/* require.ensure */(function (require) {
	      cb(null, {
	        sidebar: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./components/Sidebar\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	        main: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./components/Assignments\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	      });
	    }(__webpack_require__));
	  }
	};

/***/ },

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  path: 'grades',
	  getComponent: function getComponent(location, cb) {
	    __webpack_require__.e/* nsure */(16, function (require) {
	      cb(null, __webpack_require__(83));
	    });
	  }
	};

/***/ },

/***/ 84:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  path: 'messages',
	  getComponent: function getComponent(location, cb) {
	    __webpack_require__.e/* nsure */(17, function (require) {
	      cb(null, __webpack_require__(85));
	    });
	  }
	};

/***/ },

/***/ 86:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  path: 'profile',
	  getComponent: function getComponent(location, cb) {
	    __webpack_require__.e/* nsure */(18, function (require) {
	      cb(null, __webpack_require__(87));
	    });
	  }
	};

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9odWdlLWFwcHMvYXBwLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL2V4YW1wbGVzL2h1Z2UtYXBwcy9zdHVicy9DT1VSU0VTLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL2V4YW1wbGVzL2h1Z2UtYXBwcy9jb21wb25lbnRzL0FwcC5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9odWdlLWFwcHMvY29tcG9uZW50cy9EYXNoYm9hcmQuanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvZXhhbXBsZXMvaHVnZS1hcHBzL2NvbXBvbmVudHMvR2xvYmFsTmF2LmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL2V4YW1wbGVzL2h1Z2UtYXBwcy9yb3V0ZXMvQ2FsZW5kYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvZXhhbXBsZXMvaHVnZS1hcHBzL3JvdXRlcy9Db3Vyc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvZXhhbXBsZXMvaHVnZS1hcHBzL3JvdXRlcy9HcmFkZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvZXhhbXBsZXMvaHVnZS1hcHBzL3JvdXRlcy9NZXNzYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL1Byb2ZpbGUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztrQ0FDa0IsQ0FBTzs7OztxQ0FDRixD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QUUsQ0FBQyxJQUFJLEVBQUUsbUJBQU8sQ0FBQyxFQUF1QixDQUFDLENBQUM7TUFDM0MsQ0FBQztJQUNIO0VBQ0YsQzs7Ozs7Ozs7O0FDUEQsT0FBTSxDQUFDLE9BQU8sR0FBRztBQUNmLE9BQUksRUFBRSxTQUFTO0FBQ2YsZUFBWSx3QkFBQyxRQUFRLEVBQUUsRUFBRSxFQUFFO0FBQ3pCLDBDQUFtQixVQUFDLE9BQU8sRUFBSztBQUM5QixTQUFFLENBQUMsSUFBSSxFQUFFLG1CQUFPLENBQUMsRUFBc0IsQ0FBQyxDQUFDO01BQzFDLENBQUM7SUFDSDtFQUNGLEMiLCJmaWxlIjoiaHVnZS1hcHBzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IHsgY3JlYXRlSGlzdG9yeSwgdXNlQmFzZW5hbWUgfSBmcm9tICdoaXN0b3J5J1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xuaW1wb3J0IHN0dWJiZWRDb3Vyc2VzIGZyb20gJy4vc3R1YnMvQ09VUlNFUydcblxuY29uc3QgaGlzdG9yeSA9IHVzZUJhc2VuYW1lKGNyZWF0ZUhpc3RvcnkpKHtcbiAgYmFzZW5hbWU6ICcvaHVnZS1hcHBzJ1xufSlcblxuY29uc3Qgcm9vdFJvdXRlID0ge1xuICBjb21wb25lbnQ6ICdkaXYnLFxuICBjaGlsZFJvdXRlczogWyB7XG4gICAgcGF0aDogJy8nLFxuICAgIGNvbXBvbmVudDogcmVxdWlyZSgnLi9jb21wb25lbnRzL0FwcCcpLFxuICAgIGNoaWxkUm91dGVzOiBbXG4gICAgICByZXF1aXJlKCcuL3JvdXRlcy9DYWxlbmRhcicpLFxuICAgICAgcmVxdWlyZSgnLi9yb3V0ZXMvQ291cnNlJyksXG4gICAgICByZXF1aXJlKCcuL3JvdXRlcy9HcmFkZXMnKSxcbiAgICAgIHJlcXVpcmUoJy4vcm91dGVzL01lc3NhZ2VzJyksXG4gICAgICByZXF1aXJlKCcuL3JvdXRlcy9Qcm9maWxlJylcbiAgICBdXG4gIH0gXVxufVxuXG5yZW5kZXIoXG4gIDxSb3V0ZXIgaGlzdG9yeT17aGlzdG9yeX0gcm91dGVzPXtyb290Um91dGV9IC8+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpXG4pXG5cbi8vIEkndmUgdW5yb2xsZWQgdGhlIHJlY3Vyc2l2ZSBkaXJlY3RvcnkgbG9vcCB0aGF0IGlzIGhhcHBlbmluZyBhYm92ZSB0byBnZXQgYVxuLy8gYmV0dGVyIGlkZWEgb2YganVzdCB3aGF0IHRoaXMgaHVnZS1hcHBzIFJvdXRlciBsb29rcyBsaWtlXG4vL1xuLy8gaW1wb3J0IHsgUm91dGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG5cbi8vIGltcG9ydCBBcHAgZnJvbSAnLi9jb21wb25lbnRzL0FwcCdcbi8vIGltcG9ydCBDb3Vyc2UgZnJvbSAnLi9yb3V0ZXMvQ291cnNlL2NvbXBvbmVudHMvQ291cnNlJ1xuLy8gaW1wb3J0IEFubm91bmNlbWVudHNTaWRlYmFyIGZyb20gJy4vcm91dGVzL0NvdXJzZS9yb3V0ZXMvQW5ub3VuY2VtZW50cy9jb21wb25lbnRzL1NpZGViYXInXG4vLyBpbXBvcnQgQW5ub3VuY2VtZW50cyBmcm9tICcuL3JvdXRlcy9Db3Vyc2Uvcm91dGVzL0Fubm91bmNlbWVudHMvY29tcG9uZW50cy9Bbm5vdW5jZW1lbnRzJ1xuLy8gaW1wb3J0IEFubm91bmNlbWVudCBmcm9tICcuL3JvdXRlcy9Db3Vyc2Uvcm91dGVzL0Fubm91bmNlbWVudHMvcm91dGVzL0Fubm91bmNlbWVudC9jb21wb25lbnRzL0Fubm91bmNlbWVudCdcbi8vIGltcG9ydCBBc3NpZ25tZW50c1NpZGViYXIgZnJvbSAnLi9yb3V0ZXMvQ291cnNlL3JvdXRlcy9Bc3NpZ25tZW50cy9jb21wb25lbnRzL1NpZGViYXInXG4vLyBpbXBvcnQgQXNzaWdubWVudHMgZnJvbSAnLi9yb3V0ZXMvQ291cnNlL3JvdXRlcy9Bc3NpZ25tZW50cy9jb21wb25lbnRzL0Fzc2lnbm1lbnRzJ1xuLy8gaW1wb3J0IEFzc2lnbm1lbnQgZnJvbSAnLi9yb3V0ZXMvQ291cnNlL3JvdXRlcy9Bc3NpZ25tZW50cy9yb3V0ZXMvQXNzaWdubWVudC9jb21wb25lbnRzL0Fzc2lnbm1lbnQnXG4vLyBpbXBvcnQgQ291cnNlR3JhZGVzIGZyb20gJy4vcm91dGVzL0NvdXJzZS9yb3V0ZXMvR3JhZGVzL2NvbXBvbmVudHMvR3JhZGVzJ1xuLy8gaW1wb3J0IENhbGVuZGFyIGZyb20gJy4vcm91dGVzL0NhbGVuZGFyL2NvbXBvbmVudHMvQ2FsZW5kYXInXG4vLyBpbXBvcnQgR3JhZGVzIGZyb20gJy4vcm91dGVzL0dyYWRlcy9jb21wb25lbnRzL0dyYWRlcydcbi8vIGltcG9ydCBNZXNzYWdlcyBmcm9tICcuL3JvdXRlcy9NZXNzYWdlcy9jb21wb25lbnRzL01lc3NhZ2VzJ1xuXG4vLyByZW5kZXIoXG4vLyAgIDxSb3V0ZXI+XG4vLyAgICAgPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtBcHB9PlxuLy8gICAgICAgPFJvdXRlIHBhdGg9XCJjYWxlbmRhclwiIGNvbXBvbmVudD17Q2FsZW5kYXJ9IC8+XG4vLyAgICAgICA8Um91dGUgcGF0aD1cImNvdXJzZS86Y291cnNlSWRcIiBjb21wb25lbnQ9e0NvdXJzZX0+XG4vLyAgICAgICAgIDxSb3V0ZSBwYXRoPVwiYW5ub3VuY2VtZW50c1wiIGNvbXBvbmVudHM9e3tcbi8vICAgICAgICAgICBzaWRlYmFyOiBBbm5vdW5jZW1lbnRzU2lkZWJhcixcbi8vICAgICAgICAgICBtYWluOiBBbm5vdW5jZW1lbnRzXG4vLyAgICAgICAgIH19PlxuLy8gICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOmFubm91bmNlbWVudElkXCIgY29tcG9uZW50PXtBbm5vdW5jZW1lbnR9IC8+XG4vLyAgICAgICAgIDwvUm91dGU+XG4vLyAgICAgICAgIDxSb3V0ZSBwYXRoPVwiYXNzaWdubWVudHNcIiBjb21wb25lbnRzPXt7XG4vLyAgICAgICAgICAgc2lkZWJhcjogQXNzaWdubWVudHNTaWRlYmFyLFxuLy8gICAgICAgICAgIG1haW46IEFzc2lnbm1lbnRzXG4vLyAgICAgICAgIH19PlxuLy8gICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOmFzc2lnbm1lbnRJZFwiIGNvbXBvbmVudD17QXNzaWdubWVudH0gLz5cbi8vICAgICAgICAgPC9Sb3V0ZT5cbi8vICAgICAgICAgPFJvdXRlIHBhdGg9XCJncmFkZXNcIiBjb21wb25lbnQ9e0NvdXJzZUdyYWRlc30gLz5cbi8vICAgICAgIDwvUm91dGU+XG4vLyAgICAgICA8Um91dGUgcGF0aD1cImdyYWRlc1wiIGNvbXBvbmVudD17R3JhZGVzfSAvPlxuLy8gICAgICAgPFJvdXRlIHBhdGg9XCJtZXNzYWdlc1wiIGNvbXBvbmVudD17TWVzc2FnZXN9IC8+XG4vLyAgICAgICA8Um91dGUgcGF0aD1cInByb2ZpbGVcIiBjb21wb25lbnQ9e0NhbGVuZGFyfSAvPlxuLy8gICAgIDwvUm91dGU+XG4vLyAgIDwvUm91dGVyPixcbi8vICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4YW1wbGUnKVxuLy8gKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9odWdlLWFwcHMvYXBwLmpzXG4gKiovIiwiZ2xvYmFsLkNPVVJTRVMgPSBbXG4gIHtcbiAgICBpZDogMCxcbiAgICBuYW1lOiAnUmVhY3QgRnVuZGFtZW50YWxzJyxcbiAgICBncmFkZTogJ0InLFxuICAgIGFubm91bmNlbWVudHM6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIHRpdGxlOiAnTm8gY2xhc3MgdG9tb3Jyb3cnLFxuICAgICAgICBib2R5OiAnVGhlcmUgaXMgbm8gY2xhc3MgdG9tb3Jyb3csIHBsZWFzZSBkbyBub3Qgc2hvdyB1cCdcbiAgICAgIH1cbiAgICBdLFxuICAgIGFzc2lnbm1lbnRzOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICB0aXRsZTogJ0J1aWxkIGEgcm91dGVyJyxcbiAgICAgICAgYm9keTogJ0l0IHdpbGwgYmUgZWFzeSwgc2VyaW91c2x5LCBsaWtlIDIgaG91cnMsIDEwMCBsaW5lcyBvZiBjb2RlLCBubyBiaWdnaWUnLFxuICAgICAgICBncmFkZTogJ04vQSdcbiAgICAgIH1cbiAgICBdXG5cbiAgfSxcblxuICB7XG4gICAgaWQ6IDEsXG4gICAgbmFtZTogJ1JldXNhYmxlIFJlYWN0IENvbXBvbmVudHMnLFxuICAgIGdyYWRlOiAnQS0nLFxuICAgIGFubm91bmNlbWVudHM6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIHRpdGxlOiAnRmluYWwgZXhhbSBuZXh0IHdlZG5lc2RheScsXG4gICAgICAgIGJvZHk6ICdZb3UgaGFkIGJldHRlciBwcmVwYXJlJ1xuICAgICAgfVxuICAgIF0sXG4gICAgYXNzaWdubWVudHM6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIHRpdGxlOiAnUHJvcFR5cGVzJyxcbiAgICAgICAgYm9keTogJ1RoZXkgYXJlblxcJ3QgZm9yIHlvdS4nLFxuICAgICAgICBncmFkZTogJzgwJSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICB0aXRsZTogJ0l0ZXJhdGluZyBhbmQgQ2xvbmluZyBDaGlsZHJlbicsXG4gICAgICAgIGJvZHk6ICdZb3UgY2FuIHRvdGFsbHkgZG8gaXQuJyxcbiAgICAgICAgZ3JhZGU6ICc5NSUnXG4gICAgICB9XG4gICAgXVxuICB9XG5dXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL2V4YW1wbGVzL2h1Z2UtYXBwcy9zdHVicy9DT1VSU0VTLmpzXG4gKiovIiwiLypnbG9iYWxzIENPVVJTRVM6dHJ1ZSAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuL0Rhc2hib2FyZCdcbmltcG9ydCBHbG9iYWxOYXYgZnJvbSAnLi9HbG9iYWxOYXYnXG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEdsb2JhbE5hdiAvPlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6IDIwIH19PlxuICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVuIHx8IDxEYXNoYm9hcmQgY291cnNlcz17Q09VUlNFU30gLz59XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL2V4YW1wbGVzL2h1Z2UtYXBwcy9jb21wb25lbnRzL0FwcC5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG5cbmNsYXNzIERhc2hib2FyZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNvdXJzZXMgfSA9IHRoaXMucHJvcHNcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDI+U3VwZXIgU2NhbGFibGUgQXBwczwvaDI+XG4gICAgICAgIDxwPlxuICAgICAgICAgIE9wZW4gdGhlIG5ldHdvcmsgdGFiIGFzIHlvdSBuYXZpZ2F0ZS4gTm90aWNlIHRoYXQgb25seSB0aGUgYW1vdW50IG9mXG4gICAgICAgICAgeW91ciBhcHAgdGhhdCBpcyByZXF1aXJlZCBpcyBhY3R1YWxseSBkb3dubG9hZGVkIGFzIHlvdSBuYXZpZ2F0ZVxuICAgICAgICAgIGFyb3VuZC4gRXZlbiB0aGUgcm91dGUgY29uZmlndXJhdGlvbiBvYmplY3RzIGFyZSBsb2FkZWQgb24gdGhlIGZseS5cbiAgICAgICAgICBUaGlzIHdheSwgYSBuZXcgcm91dGUgYWRkZWQgZGVlcCBpbiB5b3VyIGFwcCB3aWxsIG5vdCBhZmZlY3QgdGhlXG4gICAgICAgICAgaW5pdGlhbCBidW5kbGUgb2YgeW91ciBhcHBsaWNhdGlvbi5cbiAgICAgICAgPC9wPlxuICAgICAgICA8aDI+Q291cnNlczwvaDI+eycgJ31cbiAgICAgICAgPHVsPlxuICAgICAgICAgIHtjb3Vyc2VzLm1hcChjb3Vyc2UgPT4gKFxuICAgICAgICAgICAgPGxpIGtleT17Y291cnNlLmlkfT5cbiAgICAgICAgICAgICAgPExpbmsgdG89e2AvY291cnNlLyR7Y291cnNlLmlkfWB9Pntjb3Vyc2UubmFtZX08L0xpbms+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9odWdlLWFwcHMvY29tcG9uZW50cy9EYXNoYm9hcmQuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xuXG5jb25zdCBkYXJrID0gJ2hzbCgyMDAsIDIwJSwgMjAlKSdcbmNvbnN0IGxpZ2h0ID0gJyNmZmYnXG5jb25zdCBzdHlsZXMgPSB7fVxuXG5zdHlsZXMud3JhcHBlciA9IHtcbiAgcGFkZGluZzogJzEwcHggMjBweCcsXG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgYmFja2dyb3VuZDogZGFyayxcbiAgY29sb3I6IGxpZ2h0XG59XG5cbnN0eWxlcy5saW5rID0ge1xuICBwYWRkaW5nOiAxMSxcbiAgY29sb3I6IGxpZ2h0LFxuICBmb250V2VpZ2h0OiAyMDBcbn1cblxuc3R5bGVzLmFjdGl2ZUxpbmsgPSB7XG4gIC4uLnN0eWxlcy5saW5rLFxuICBiYWNrZ3JvdW5kOiBsaWdodCxcbiAgY29sb3I6IGRhcmtcbn1cblxuY2xhc3MgR2xvYmFsTmF2IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xuICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KVxuICAgIHRoaXMubG9nT3V0ID0gdGhpcy5sb2dPdXQuYmluZCh0aGlzKVxuICB9XG5cbiAgbG9nT3V0KCkge1xuICAgIGFsZXJ0KCdsb2cgb3V0JylcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHVzZXIgfSA9IHRoaXMucHJvcHNcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMud3JhcHBlcn0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZmxvYXQ6ICdsZWZ0JyB9fT5cbiAgICAgICAgICA8TGluayB0bz1cIi9cIiBzdHlsZT17c3R5bGVzLmxpbmt9PkhvbWU8L0xpbms+eycgJ31cbiAgICAgICAgICA8TGluayB0bz1cIi9jYWxlbmRhclwiIHN0eWxlPXtzdHlsZXMubGlua30gYWN0aXZlU3R5bGU9e3N0eWxlcy5hY3RpdmVMaW5rfT5DYWxlbmRhcjwvTGluaz57JyAnfVxuICAgICAgICAgIDxMaW5rIHRvPVwiL2dyYWRlc1wiIHN0eWxlPXtzdHlsZXMubGlua30gYWN0aXZlU3R5bGU9e3N0eWxlcy5hY3RpdmVMaW5rfT5HcmFkZXM8L0xpbms+eycgJ31cbiAgICAgICAgICA8TGluayB0bz1cIi9tZXNzYWdlc1wiIHN0eWxlPXtzdHlsZXMubGlua30gYWN0aXZlU3R5bGU9e3N0eWxlcy5hY3RpdmVMaW5rfT5NZXNzYWdlczwvTGluaz57JyAnfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBmbG9hdDogJ3JpZ2h0JyB9fT5cbiAgICAgICAgICA8TGluayBzdHlsZT17c3R5bGVzLmxpbmt9IHRvPVwiL3Byb2ZpbGVcIj57dXNlci5uYW1lfTwvTGluaz4gPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmxvZ091dH0+bG9nIG91dDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5HbG9iYWxOYXYuZGVmYXVsdFByb3BzID0ge1xuICB1c2VyOiB7XG4gICAgaWQ6IDEsXG4gICAgbmFtZTogJ1J5YW4gRmxvcmVuY2UnXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2xvYmFsTmF2XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL2V4YW1wbGVzL2h1Z2UtYXBwcy9jb21wb25lbnRzL0dsb2JhbE5hdi5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBwYXRoOiAnY2FsZW5kYXInLFxuICBnZXRDb21wb25lbnQobG9jYXRpb24sIGNiKSB7XG4gICAgcmVxdWlyZS5lbnN1cmUoW10sIChyZXF1aXJlKSA9PiB7XG4gICAgICBjYihudWxsLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvQ2FsZW5kYXInKSlcbiAgICB9KVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL2V4YW1wbGVzL2h1Z2UtYXBwcy9yb3V0ZXMvQ2FsZW5kYXIvaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGF0aDogJ2Fzc2lnbm1lbnRzJyxcblxuICBnZXRDaGlsZFJvdXRlcyhsb2NhdGlvbiwgY2IpIHtcbiAgICByZXF1aXJlLmVuc3VyZShbXSwgKHJlcXVpcmUpID0+IHtcbiAgICAgIGNiKG51bGwsIFtcbiAgICAgICAgcmVxdWlyZSgnLi9yb3V0ZXMvQXNzaWdubWVudCcpXG4gICAgICBdKVxuICAgIH0pXG4gIH0sXG5cbiAgZ2V0Q29tcG9uZW50cyhsb2NhdGlvbiwgY2IpIHtcbiAgICByZXF1aXJlLmVuc3VyZShbXSwgKHJlcXVpcmUpID0+IHtcbiAgICAgIGNiKG51bGwsIHtcbiAgICAgICAgc2lkZWJhcjogcmVxdWlyZSgnLi9jb21wb25lbnRzL1NpZGViYXInKSxcbiAgICAgICAgbWFpbjogcmVxdWlyZSgnLi9jb21wb25lbnRzL0Fzc2lnbm1lbnRzJylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL0NvdXJzZS9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBwYXRoOiAnZ3JhZGVzJyxcbiAgZ2V0Q29tcG9uZW50KGxvY2F0aW9uLCBjYikge1xuICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAocmVxdWlyZSkgPT4ge1xuICAgICAgY2IobnVsbCwgcmVxdWlyZSgnLi9jb21wb25lbnRzL0dyYWRlcycpKVxuICAgIH0pXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvZXhhbXBsZXMvaHVnZS1hcHBzL3JvdXRlcy9HcmFkZXMvaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGF0aDogJ21lc3NhZ2VzJyxcbiAgZ2V0Q29tcG9uZW50KGxvY2F0aW9uLCBjYikge1xuICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAocmVxdWlyZSkgPT4ge1xuICAgICAgY2IobnVsbCwgcmVxdWlyZSgnLi9jb21wb25lbnRzL01lc3NhZ2VzJykpXG4gICAgfSlcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL01lc3NhZ2VzL2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHBhdGg6ICdwcm9maWxlJyxcbiAgZ2V0Q29tcG9uZW50KGxvY2F0aW9uLCBjYikge1xuICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAocmVxdWlyZSkgPT4ge1xuICAgICAgY2IobnVsbCwgcmVxdWlyZSgnLi9jb21wb25lbnRzL1Byb2ZpbGUnKSlcbiAgICB9KVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL2V4YW1wbGVzL2h1Z2UtYXBwcy9yb3V0ZXMvUHJvZmlsZS9pbmRleC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=