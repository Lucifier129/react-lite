webpackJsonp([22],[
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
	  basename: '/pinterest'
	});
	
	var PICTURES = [{ id: 0, src: 'http://placekitten.com/601/601' }, { id: 1, src: 'http://placekitten.com/610/610' }, { id: 2, src: 'http://placekitten.com/620/620' }];
	
	var Modal = _react2['default'].createClass({
	  displayName: 'Modal',
	
	  styles: {
	    position: 'fixed',
	    top: '20%',
	    right: '20%',
	    bottom: '20%',
	    left: '20%',
	    padding: 20,
	    boxShadow: '0px 0px 150px 130px rgba(0, 0, 0, 0.5)',
	    overflow: 'auto',
	    background: '#fff'
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      { style: this.styles },
	      _react2['default'].createElement(
	        'p',
	        null,
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: this.props.returnTo },
	          'Back'
	        )
	      ),
	      this.props.children
	    );
	  }
	});
	
	var App = _react2['default'].createClass({
	  displayName: 'App',
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    // if we changed routes...
	    if (nextProps.location.key !== this.props.location.key && nextProps.location.state && nextProps.location.state.modal) {
	      // save the old children (just like animation)
	      this.previousChildren = this.props.children;
	    }
	  },
	
	  render: function render() {
	    var location = this.props.location;
	
	    var isModal = location.state && location.state.modal && this.previousChildren;
	
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h1',
	        null,
	        'Pinterest Style Routes'
	      ),
	      _react2['default'].createElement(
	        'div',
	        null,
	        isModal ? this.previousChildren : this.props.children,
	        isModal && _react2['default'].createElement(
	          Modal,
	          { isOpen: true, returnTo: location.state.returnTo },
	          this.props.children
	        )
	      )
	    );
	  }
	});
	
	var Index = _react2['default'].createClass({
	  displayName: 'Index',
	
	  render: function render() {
	    var _this = this;
	
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'p',
	        null,
	        'The url `/pictures/:id` can be rendered anywhere in the app as a modal. Simply put `modal: true` in the `state` prop of links.'
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        'Click on an item and see its rendered as a modal, then copy/paste the url into a different browser window (with a different session, like Chrome -> Firefox), and see that the image does not render inside the overlay. One URL, two session dependent screens :D'
	      ),
	      _react2['default'].createElement(
	        'div',
	        null,
	        PICTURES.map(function (picture) {
	          return _react2['default'].createElement(
	            _reactRouter.Link,
	            { key: picture.id, to: '/pictures/' + picture.id, state: { modal: true, returnTo: _this.props.location.pathname } },
	            _react2['default'].createElement('img', { style: { margin: 10 }, src: picture.src, height: '100' })
	          );
	        })
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/some/123/deep/456/route' },
	          'Go to some deep route'
	        )
	      )
	    );
	  }
	});
	
	var Deep = _react2['default'].createClass({
	  displayName: 'Deep',
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'p',
	        null,
	        'You can link from anywhere really deep too'
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        'Params stick around: ',
	        this.props.params.one,
	        ' ',
	        this.props.params.two
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/pictures/0', state: { modal: true, returnTo: this.props.location.pathname } },
	          'Link to picture with Modal'
	        ),
	        _react2['default'].createElement('br', null),
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/pictures/0' },
	          'Without modal'
	        )
	      )
	    );
	  }
	});
	
	var Picture = _react2['default'].createClass({
	  displayName: 'Picture',
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement('img', { src: PICTURES[this.props.params.id].src, style: { height: '80%' } })
	    );
	  }
	});
	
	_reactDom.render(_react2['default'].createElement(
	  _reactRouter.Router,
	  { history: history },
	  _react2['default'].createElement(
	    _reactRouter.Route,
	    { path: '/', component: App },
	    _react2['default'].createElement(_reactRouter.IndexRoute, { component: Index }),
	    _react2['default'].createElement(_reactRouter.Route, { path: '/pictures/:id', component: Picture }),
	    _react2['default'].createElement(_reactRouter.Route, { path: '/some/:one/deep/:two/route', component: Deep })
	  )
	), document.getElementById('example'));

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9waW50ZXJlc3QvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2tDQUFrQixDQUFPOzs7O3FDQUNGLENBQVc7O29DQUNTLEVBQVM7O3dDQUNKLENBQWM7O0FBRTlELEtBQU0sT0FBTyxHQUFHLDRDQUEwQixDQUFDO0FBQ3pDLFdBQVEsRUFBRSxZQUFZO0VBQ3ZCLENBQUM7O0FBRUYsS0FBTSxRQUFRLEdBQUcsQ0FDZixFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLGdDQUFnQyxFQUFFLEVBQ2hELEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsZ0NBQWdDLEVBQUUsRUFDaEQsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxnQ0FBZ0MsRUFBRSxDQUNqRDs7QUFFRCxLQUFNLEtBQUssR0FBRyxtQkFBTSxXQUFXLENBQUM7OztBQUM5QixTQUFNLEVBQUU7QUFDTixhQUFRLEVBQUUsT0FBTztBQUNqQixRQUFHLEVBQUUsS0FBSztBQUNWLFVBQUssRUFBRSxLQUFLO0FBQ1osV0FBTSxFQUFFLEtBQUs7QUFDYixTQUFJLEVBQUUsS0FBSztBQUNYLFlBQU8sRUFBRSxFQUFFO0FBQ1gsY0FBUyxFQUFFLHdDQUF3QztBQUNuRCxhQUFRLEVBQUUsTUFBTTtBQUNoQixlQUFVLEVBQUUsTUFBTTtJQUNuQjs7QUFFRCxTQUFNLG9CQUFHO0FBQ1AsWUFDRTs7U0FBSyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU87T0FDdEI7OztTQUFHOzthQUFNLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVM7O1VBQVk7UUFBSTtPQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7TUFDaEIsQ0FDUDtJQUNGO0VBQ0YsQ0FBQzs7QUFFRixLQUFNLEdBQUcsR0FBRyxtQkFBTSxXQUFXLENBQUM7OztBQUU1Qiw0QkFBeUIscUNBQUMsU0FBUyxFQUFFOztBQUVuQyxTQUNFLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFDbEQsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQ3hCLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFDN0I7O0FBRUQsV0FBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtNQUM1QztJQUNGOztBQUVELFNBQU0sb0JBQUc7U0FDRCxRQUFRLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBdkIsUUFBUTs7QUFFZCxTQUFJLE9BQU8sR0FDVCxRQUFRLENBQUMsS0FBSyxJQUNkLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUNwQixJQUFJLENBQUMsZ0JBQ047O0FBRUQsWUFDRTs7O09BQ0U7Ozs7UUFBK0I7T0FFL0I7OztTQUNHLE9BQU8sR0FDTixJQUFJLENBQUMsZ0JBQWdCLEdBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtTQUdwQixPQUFPLElBQ047QUFBQyxnQkFBSzthQUFDLE1BQU0sRUFBRSxJQUFLLEVBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUztXQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7VUFFdkI7UUFDRztNQUNGLENBQ1A7SUFDRjtFQUNGLENBQUM7O0FBRUYsS0FBTSxLQUFLLEdBQUcsbUJBQU0sV0FBVyxDQUFDOzs7QUFDOUIsU0FBTSxvQkFBRzs7O0FBQ1AsWUFDRTs7O09BQ0U7Ozs7UUFHSTtPQUVKOzs7O1FBS0k7T0FFSjs7O1NBQ0csUUFBUSxDQUFDLEdBQUcsQ0FBQyxpQkFBTztrQkFDbkI7O2VBQU0sR0FBRyxFQUFFLE9BQU8sQ0FBQyxFQUFHLEVBQUMsRUFBRSxpQkFBZSxPQUFPLENBQUMsRUFBSyxFQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQUssS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUc7YUFDbkgsMENBQUssS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRyxFQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBSSxFQUFDLE1BQU0sRUFBQyxLQUFLLEdBQUc7WUFDeEQ7VUFDUixDQUFDO1FBQ0U7T0FFTjs7O1NBQUc7O2FBQU0sRUFBRSxFQUFDLDBCQUEwQjs7VUFBNkI7UUFBSTtNQUVuRSxDQUNQO0lBQ0Y7RUFDRixDQUFDOztBQUVGLEtBQU0sSUFBSSxHQUFHLG1CQUFNLFdBQVcsQ0FBQzs7O0FBQzdCLFNBQU0sb0JBQUc7QUFDUCxZQUNFOzs7T0FDRTs7OztRQUFpRDtPQUNqRDs7OztTQUF5QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHOztTQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUc7UUFBSztPQUMzRTs7O1NBQ0U7O2FBQU0sRUFBRSxlQUFnQixFQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRzs7VUFFakY7U0FBQSw0Q0FBSztTQUNaOzthQUFNLEVBQUUsZUFBZ0I7O1VBRWpCO1FBQ0w7TUFDQSxDQUNQO0lBQ0Y7RUFDRixDQUFDOztBQUVGLEtBQU0sT0FBTyxHQUFHLG1CQUFNLFdBQVcsQ0FBQzs7O0FBQ2hDLFNBQU0sb0JBQUc7QUFDUCxZQUNFOzs7T0FDRSwwQ0FBSyxHQUFHLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUksRUFBQyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFHLEdBQUc7TUFDdEUsQ0FDUDtJQUNGO0VBQ0YsQ0FBQzs7QUFFRixrQkFDRTs7S0FBUSxPQUFPLEVBQUUsT0FBUTtHQUN2Qjs7T0FBTyxJQUFJLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBRSxHQUFJO0tBQzdCLDREQUFZLFNBQVMsRUFBRSxLQUFNLEdBQUU7S0FDL0IsdURBQU8sSUFBSSxFQUFDLGVBQWUsRUFBQyxTQUFTLEVBQUUsT0FBUSxHQUFFO0tBQ2pELHVEQUFPLElBQUksRUFBQyw0QkFBNEIsRUFBQyxTQUFTLEVBQUUsSUFBSyxHQUFFO0lBQ3JEO0VBQ0QsRUFDUixRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEMiLCJmaWxlIjoicGludGVyZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IHsgY3JlYXRlSGlzdG9yeSwgdXNlQmFzZW5hbWUgfSBmcm9tICdoaXN0b3J5J1xuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZSwgSW5kZXhSb3V0ZSwgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlcidcblxuY29uc3QgaGlzdG9yeSA9IHVzZUJhc2VuYW1lKGNyZWF0ZUhpc3RvcnkpKHtcbiAgYmFzZW5hbWU6ICcvcGludGVyZXN0J1xufSlcblxuY29uc3QgUElDVFVSRVMgPSBbXG4gIHsgaWQ6IDAsIHNyYzogJ2h0dHA6Ly9wbGFjZWtpdHRlbi5jb20vNjAxLzYwMScgfSxcbiAgeyBpZDogMSwgc3JjOiAnaHR0cDovL3BsYWNla2l0dGVuLmNvbS82MTAvNjEwJyB9LFxuICB7IGlkOiAyLCBzcmM6ICdodHRwOi8vcGxhY2VraXR0ZW4uY29tLzYyMC82MjAnIH1cbl1cblxuY29uc3QgTW9kYWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHN0eWxlczoge1xuICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgIHRvcDogJzIwJScsXG4gICAgcmlnaHQ6ICcyMCUnLFxuICAgIGJvdHRvbTogJzIwJScsXG4gICAgbGVmdDogJzIwJScsXG4gICAgcGFkZGluZzogMjAsXG4gICAgYm94U2hhZG93OiAnMHB4IDBweCAxNTBweCAxMzBweCByZ2JhKDAsIDAsIDAsIDAuNSknLFxuICAgIG92ZXJmbG93OiAnYXV0bycsXG4gICAgYmFja2dyb3VuZDogJyNmZmYnXG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt0aGlzLnN0eWxlc30+XG4gICAgICAgIDxwPjxMaW5rIHRvPXt0aGlzLnByb3BzLnJldHVyblRvfT5CYWNrPC9MaW5rPjwvcD5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn0pXG5cbmNvbnN0IEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIC8vIGlmIHdlIGNoYW5nZWQgcm91dGVzLi4uXG4gICAgaWYgKChcbiAgICAgIG5leHRQcm9wcy5sb2NhdGlvbi5rZXkgIT09IHRoaXMucHJvcHMubG9jYXRpb24ua2V5ICYmXG4gICAgICBuZXh0UHJvcHMubG9jYXRpb24uc3RhdGUgJiZcbiAgICAgIG5leHRQcm9wcy5sb2NhdGlvbi5zdGF0ZS5tb2RhbFxuICAgICkpIHtcbiAgICAgIC8vIHNhdmUgdGhlIG9sZCBjaGlsZHJlbiAoanVzdCBsaWtlIGFuaW1hdGlvbilcbiAgICAgIHRoaXMucHJldmlvdXNDaGlsZHJlbiA9IHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCB7IGxvY2F0aW9uIH0gPSB0aGlzLnByb3BzXG5cbiAgICBsZXQgaXNNb2RhbCA9IChcbiAgICAgIGxvY2F0aW9uLnN0YXRlICYmXG4gICAgICBsb2NhdGlvbi5zdGF0ZS5tb2RhbCAmJlxuICAgICAgdGhpcy5wcmV2aW91c0NoaWxkcmVuXG4gICAgKVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMT5QaW50ZXJlc3QgU3R5bGUgUm91dGVzPC9oMT5cblxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHtpc01vZGFsID9cbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNDaGlsZHJlbiA6XG4gICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAge2lzTW9kYWwgJiYgKFxuICAgICAgICAgICAgPE1vZGFsIGlzT3Blbj17dHJ1ZX0gcmV0dXJuVG89e2xvY2F0aW9uLnN0YXRlLnJldHVyblRvfT5cbiAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L01vZGFsPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59KVxuXG5jb25zdCBJbmRleCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8cD5cbiAgICAgICAgICBUaGUgdXJsIGAvcGljdHVyZXMvOmlkYCBjYW4gYmUgcmVuZGVyZWQgYW55d2hlcmUgaW4gdGhlIGFwcCBhcyBhIG1vZGFsLlxuICAgICAgICAgIFNpbXBseSBwdXQgYG1vZGFsOiB0cnVlYCBpbiB0aGUgYHN0YXRlYCBwcm9wIG9mIGxpbmtzLlxuICAgICAgICA8L3A+XG5cbiAgICAgICAgPHA+XG4gICAgICAgICAgQ2xpY2sgb24gYW4gaXRlbSBhbmQgc2VlIGl0cyByZW5kZXJlZCBhcyBhIG1vZGFsLCB0aGVuIGNvcHkvcGFzdGUgdGhlXG4gICAgICAgICAgdXJsIGludG8gYSBkaWZmZXJlbnQgYnJvd3NlciB3aW5kb3cgKHdpdGggYSBkaWZmZXJlbnQgc2Vzc2lvbiwgbGlrZVxuICAgICAgICAgIENocm9tZSAtPiBGaXJlZm94KSwgYW5kIHNlZSB0aGF0IHRoZSBpbWFnZSBkb2VzIG5vdCByZW5kZXIgaW5zaWRlIHRoZVxuICAgICAgICAgIG92ZXJsYXkuIE9uZSBVUkwsIHR3byBzZXNzaW9uIGRlcGVuZGVudCBzY3JlZW5zIDpEXG4gICAgICAgIDwvcD5cblxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHtQSUNUVVJFUy5tYXAocGljdHVyZSA9PiAoXG4gICAgICAgICAgICA8TGluayBrZXk9e3BpY3R1cmUuaWR9IHRvPXtgL3BpY3R1cmVzLyR7cGljdHVyZS5pZH1gfSBzdGF0ZT17eyBtb2RhbDogdHJ1ZSwgcmV0dXJuVG86IHRoaXMucHJvcHMubG9jYXRpb24ucGF0aG5hbWUgfX0+XG4gICAgICAgICAgICAgIDxpbWcgc3R5bGU9e3sgbWFyZ2luOiAxMCB9fSBzcmM9e3BpY3R1cmUuc3JjfSBoZWlnaHQ9XCIxMDBcIiAvPlxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8cD48TGluayB0bz1cIi9zb21lLzEyMy9kZWVwLzQ1Ni9yb3V0ZVwiPkdvIHRvIHNvbWUgZGVlcCByb3V0ZTwvTGluaz48L3A+XG5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufSlcblxuY29uc3QgRGVlcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8cD5Zb3UgY2FuIGxpbmsgZnJvbSBhbnl3aGVyZSByZWFsbHkgZGVlcCB0b288L3A+XG4gICAgICAgIDxwPlBhcmFtcyBzdGljayBhcm91bmQ6IHt0aGlzLnByb3BzLnBhcmFtcy5vbmV9IHt0aGlzLnByb3BzLnBhcmFtcy50d299PC9wPlxuICAgICAgICA8cD5cbiAgICAgICAgICA8TGluayB0bz17YC9waWN0dXJlcy8wYH0gc3RhdGU9e3sgbW9kYWw6IHRydWUsIHJldHVyblRvOiB0aGlzLnByb3BzLmxvY2F0aW9uLnBhdGhuYW1lIH19PlxuICAgICAgICAgICAgTGluayB0byBwaWN0dXJlIHdpdGggTW9kYWxcbiAgICAgICAgICA8L0xpbms+PGJyLz5cbiAgICAgICAgICA8TGluayB0bz17YC9waWN0dXJlcy8wYH0+XG4gICAgICAgICAgICBXaXRob3V0IG1vZGFsXG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn0pXG5cbmNvbnN0IFBpY3R1cmUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGltZyBzcmM9e1BJQ1RVUkVTW3RoaXMucHJvcHMucGFyYW1zLmlkXS5zcmN9IHN0eWxlPXt7IGhlaWdodDogJzgwJScgfX0gLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufSlcblxucmVuZGVyKChcbiAgPFJvdXRlciBoaXN0b3J5PXtoaXN0b3J5fT5cbiAgICA8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0FwcH0+XG4gICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0luZGV4fS8+XG4gICAgICA8Um91dGUgcGF0aD1cIi9waWN0dXJlcy86aWRcIiBjb21wb25lbnQ9e1BpY3R1cmV9Lz5cbiAgICAgIDxSb3V0ZSBwYXRoPVwiL3NvbWUvOm9uZS9kZWVwLzp0d28vcm91dGVcIiBjb21wb25lbnQ9e0RlZXB9Lz5cbiAgICA8L1JvdXRlPlxuICA8L1JvdXRlcj5cbiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJykpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL2V4YW1wbGVzL3BpbnRlcmVzdC9hcHAuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9