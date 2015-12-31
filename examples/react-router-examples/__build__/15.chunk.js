webpackJsonp([15],{

/***/ 80:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var Calendar = (function (_React$Component) {
	  _inherits(Calendar, _React$Component);
	
	  function Calendar() {
	    _classCallCheck(this, Calendar);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  Calendar.prototype.render = function render() {
	    var events = [{ id: 0, title: 'essay due' }];
	
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'Calendar'
	      ),
	      _react2['default'].createElement(
	        'ul',
	        null,
	        events.map(function (event) {
	          return _react2['default'].createElement(
	            'li',
	            { key: event.id },
	            event.title
	          );
	        })
	      )
	    );
	  };
	
	  return Calendar;
	})(_react2['default'].Component);
	
	module.exports = Calendar;

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL0NhbGVuZGFyL2NvbXBvbmVudHMvQ2FsZW5kYXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztrQ0FBa0IsQ0FBTzs7OztLQUVuQixRQUFRO2FBQVIsUUFBUTs7WUFBUixRQUFROzJCQUFSLFFBQVE7Ozs7O0FBQVIsV0FBUSxXQUNaLE1BQU0scUJBQUc7QUFDUCxTQUFNLE1BQU0sR0FBRyxDQUNiLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLENBQzlCOztBQUVELFlBQ0U7OztPQUNFOzs7O1FBQWlCO09BQ2pCOzs7U0FDRyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQUs7a0JBQ2Y7O2VBQUksR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFHO2FBQUUsS0FBSyxDQUFDLEtBQUs7WUFBTTtVQUN0QyxDQUFDO1FBQ0M7TUFDRCxDQUNQO0lBQ0Y7O1VBaEJHLFFBQVE7SUFBUyxtQkFBTSxTQUFTOztBQW1CdEMsT0FBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLEMiLCJmaWxlIjoiMTUuY2h1bmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNsYXNzIENhbGVuZGFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGV2ZW50cyA9IFtcbiAgICAgIHsgaWQ6IDAsIHRpdGxlOiAnZXNzYXkgZHVlJyB9XG4gICAgXVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMj5DYWxlbmRhcjwvaDI+XG4gICAgICAgIDx1bD5cbiAgICAgICAgICB7ZXZlbnRzLm1hcChldmVudCA9PiAoXG4gICAgICAgICAgICA8bGkga2V5PXtldmVudC5pZH0+e2V2ZW50LnRpdGxlfTwvbGk+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDYWxlbmRhclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL0NhbGVuZGFyL2NvbXBvbmVudHMvQ2FsZW5kYXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9