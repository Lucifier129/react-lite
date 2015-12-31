webpackJsonp([26],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(1);
	
	var _history = __webpack_require__(49);
	
	var _reactRouter = __webpack_require__(2);
	
	var history = _history.useBasename(_history.createHistory)({
	  basename: '/transitions'
	});
	
	var App = _react2['default'].createClass({
	  displayName: 'App',
	
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
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/dashboard', activeClassName: 'active' },
	            'Dashboard'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/form', activeClassName: 'active' },
	            'Form'
	          )
	        )
	      ),
	      this.props.children
	    );
	  }
	});
	
	var Dashboard = _react2['default'].createClass({
	  displayName: 'Dashboard',
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'h1',
	      null,
	      'Dashboard'
	    );
	  }
	});
	
	var Form = _react2['default'].createClass({
	  displayName: 'Form',
	
	  mixins: [_reactRouter.Lifecycle, _reactRouter.History],
	
	  getInitialState: function getInitialState() {
	    return {
	      textValue: 'ohai'
	    };
	  },
	
	  routerWillLeave: function routerWillLeave() {
	    if (this.state.textValue) return 'You have unsaved information, are you sure you want to leave this page?';
	  },
	
	  handleChange: function handleChange(event) {
	    this.setState({
	      textValue: event.target.value
	    });
	  },
	
	  handleSubmit: function handleSubmit(event) {
	    var _this = this;
	
	    event.preventDefault();
	
	    this.setState({
	      textValue: ''
	    }, function () {
	      _this.history.pushState(null, '/');
	    });
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'form',
	        { onSubmit: this.handleSubmit },
	        _react2['default'].createElement(
	          'p',
	          null,
	          'Click the dashboard link with text in the input.'
	        ),
	        _react2['default'].createElement('input', { type: 'text', ref: 'userInput', value: this.state.textValue, onChange: this.handleChange }),
	        _react2['default'].createElement(
	          'button',
	          { type: 'submit' },
	          'Go'
	        )
	      )
	    );
	  }
	});
	
	_reactDom.render(_react2['default'].createElement(
	  _reactRouter.Router,
	  { history: history },
	  _react2['default'].createElement(
	    _reactRouter.Route,
	    { path: '/', component: App },
	    _react2['default'].createElement(_reactRouter.Route, { path: 'dashboard', component: Dashboard }),
	    _react2['default'].createElement(_reactRouter.Route, { path: 'form', component: Form })
	  )
	), document.getElementById('example'));

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy90cmFuc2l0aW9ucy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0NBQWtCLENBQU87Ozs7cUNBQ0YsQ0FBVzs7b0NBQ1MsRUFBUzs7d0NBQ0ksQ0FBYzs7QUFFdEUsS0FBTSxPQUFPLEdBQUcsNENBQTBCLENBQUM7QUFDekMsV0FBUSxFQUFFLGNBQWM7RUFDekIsQ0FBQzs7QUFFRixLQUFNLEdBQUcsR0FBRyxtQkFBTSxXQUFXLENBQUM7OztBQUM1QixTQUFNLG9CQUFHO0FBQ1AsWUFDRTs7O09BQ0U7OztTQUNFOzs7V0FBSTs7ZUFBTSxFQUFFLEVBQUMsWUFBWSxFQUFDLGVBQWUsRUFBQyxRQUFROztZQUFpQjtVQUFLO1NBQ3hFOzs7V0FBSTs7ZUFBTSxFQUFFLEVBQUMsT0FBTyxFQUFDLGVBQWUsRUFBQyxRQUFROztZQUFZO1VBQUs7UUFDM0Q7T0FDSixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7TUFDaEIsQ0FDUDtJQUNGO0VBQ0YsQ0FBQzs7QUFFRixLQUFNLFNBQVMsR0FBRyxtQkFBTSxXQUFXLENBQUM7OztBQUNsQyxTQUFNLG9CQUFHO0FBQ1AsWUFBTzs7OztNQUFrQjtJQUMxQjtFQUNGLENBQUM7O0FBRUYsS0FBTSxJQUFJLEdBQUcsbUJBQU0sV0FBVyxDQUFDOzs7QUFDN0IsU0FBTSxFQUFFLDhDQUFzQjs7QUFFOUIsa0JBQWUsNkJBQUc7QUFDaEIsWUFBTztBQUNMLGdCQUFTLEVBQUUsTUFBTTtNQUNsQjtJQUNGOztBQUVELGtCQUFlLDZCQUFHO0FBQ2hCLFNBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQ3RCLE9BQU8seUVBQXlFO0lBQ25GOztBQUVELGVBQVksd0JBQUMsS0FBSyxFQUFFO0FBQ2xCLFNBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixnQkFBUyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSztNQUM5QixDQUFDO0lBQ0g7O0FBRUQsZUFBWSx3QkFBQyxLQUFLLEVBQUU7OztBQUNsQixVQUFLLENBQUMsY0FBYyxFQUFFOztBQUV0QixTQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osZ0JBQVMsRUFBRSxFQUFFO01BQ2QsRUFBRSxZQUFNO0FBQ1AsYUFBSyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7TUFDbEMsQ0FBQztJQUNIOztBQUVELFNBQU0sb0JBQUc7QUFDUCxZQUNFOzs7T0FDRTs7V0FBTSxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQWE7U0FDaEM7Ozs7VUFBdUQ7U0FDdkQsNENBQU8sSUFBSSxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVUsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQWEsR0FBRztTQUMvRjs7YUFBUSxJQUFJLEVBQUMsUUFBUTs7VUFBWTtRQUM1QjtNQUNILENBQ1A7SUFDRjtFQUNGLENBQUM7O0FBRUYsa0JBQ0U7O0tBQVEsT0FBTyxFQUFFLE9BQVE7R0FDdkI7O09BQU8sSUFBSSxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUUsR0FBSTtLQUM3Qix1REFBTyxJQUFJLEVBQUMsV0FBVyxFQUFDLFNBQVMsRUFBRSxTQUFVLEdBQUc7S0FDaEQsdURBQU8sSUFBSSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUUsSUFBSyxHQUFHO0lBQ2hDO0VBQ0QsRUFDUixRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEMiLCJmaWxlIjoidHJhbnNpdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1kb20nXG5pbXBvcnQgeyBjcmVhdGVIaXN0b3J5LCB1c2VCYXNlbmFtZSB9IGZyb20gJ2hpc3RvcnknXG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlLCBMaW5rLCBIaXN0b3J5LCBMaWZlY3ljbGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG5cbmNvbnN0IGhpc3RvcnkgPSB1c2VCYXNlbmFtZShjcmVhdGVIaXN0b3J5KSh7XG4gIGJhc2VuYW1lOiAnL3RyYW5zaXRpb25zJ1xufSlcblxuY29uc3QgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDx1bD5cbiAgICAgICAgICA8bGk+PExpbmsgdG89XCIvZGFzaGJvYXJkXCIgYWN0aXZlQ2xhc3NOYW1lPVwiYWN0aXZlXCI+RGFzaGJvYXJkPC9MaW5rPjwvbGk+XG4gICAgICAgICAgPGxpPjxMaW5rIHRvPVwiL2Zvcm1cIiBhY3RpdmVDbGFzc05hbWU9XCJhY3RpdmVcIj5Gb3JtPC9MaW5rPjwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59KVxuXG5jb25zdCBEYXNoYm9hcmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPGgxPkRhc2hib2FyZDwvaDE+XG4gIH1cbn0pXG5cbmNvbnN0IEZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIG1peGluczogWyBMaWZlY3ljbGUsIEhpc3RvcnkgXSxcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRleHRWYWx1ZTogJ29oYWknXG4gICAgfVxuICB9LFxuXG4gIHJvdXRlcldpbGxMZWF2ZSgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS50ZXh0VmFsdWUpXG4gICAgICByZXR1cm4gJ1lvdSBoYXZlIHVuc2F2ZWQgaW5mb3JtYXRpb24sIGFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBsZWF2ZSB0aGlzIHBhZ2U/J1xuICB9LFxuXG4gIGhhbmRsZUNoYW5nZShldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdGV4dFZhbHVlOiBldmVudC50YXJnZXQudmFsdWVcbiAgICB9KVxuICB9LFxuXG4gIGhhbmRsZVN1Ym1pdChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdGV4dFZhbHVlOiAnJ1xuICAgIH0sICgpID0+IHtcbiAgICAgIHRoaXMuaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJy8nKVxuICAgIH0pXG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXR9PlxuICAgICAgICAgIDxwPkNsaWNrIHRoZSBkYXNoYm9hcmQgbGluayB3aXRoIHRleHQgaW4gdGhlIGlucHV0LjwvcD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiByZWY9XCJ1c2VySW5wdXRcIiB2YWx1ZT17dGhpcy5zdGF0ZS50ZXh0VmFsdWV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gLz5cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5HbzwvYnV0dG9uPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn0pXG5cbnJlbmRlcigoXG4gIDxSb3V0ZXIgaGlzdG9yeT17aGlzdG9yeX0+XG4gICAgPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtBcHB9PlxuICAgICAgPFJvdXRlIHBhdGg9XCJkYXNoYm9hcmRcIiBjb21wb25lbnQ9e0Rhc2hib2FyZH0gLz5cbiAgICAgIDxSb3V0ZSBwYXRoPVwiZm9ybVwiIGNvbXBvbmVudD17Rm9ybX0gLz5cbiAgICA8L1JvdXRlPlxuICA8L1JvdXRlcj5cbiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJykpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL2V4YW1wbGVzL3RyYW5zaXRpb25zL2FwcC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=