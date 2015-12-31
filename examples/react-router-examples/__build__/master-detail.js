webpackJsonp([19],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(1);
	
	var _history = __webpack_require__(49);
	
	var _reactRouter = __webpack_require__(2);
	
	var _ContactStore = __webpack_require__(88);
	
	var _ContactStore2 = _interopRequireDefault(_ContactStore);
	
	__webpack_require__(89);
	
	var history = _history.useBasename(_history.createHistory)({
	  basename: '/master-detail'
	});
	
	var App = _react2['default'].createClass({
	  displayName: 'App',
	
	  getInitialState: function getInitialState() {
	    return {
	      contacts: _ContactStore2['default'].getContacts(),
	      loading: true
	    };
	  },
	
	  componentWillMount: function componentWillMount() {
	    _ContactStore2['default'].init();
	  },
	
	  componentDidMount: function componentDidMount() {
	    _ContactStore2['default'].addChangeListener(this.updateContacts);
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    _ContactStore2['default'].removeChangeListener(this.updateContacts);
	  },
	
	  updateContacts: function updateContacts() {
	    if (!this.isMounted()) return;
	
	    this.setState({
	      contacts: _ContactStore2['default'].getContacts(),
	      loading: false
	    });
	  },
	
	  render: function render() {
	    var contacts = this.state.contacts.map(function (contact) {
	      return _react2['default'].createElement(
	        'li',
	        { key: contact.id },
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/contact/' + contact.id },
	          contact.first
	        )
	      );
	    });
	
	    return _react2['default'].createElement(
	      'div',
	      { className: 'App' },
	      _react2['default'].createElement(
	        'div',
	        { className: 'ContactList' },
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/contact/new' },
	          'New Contact'
	        ),
	        _react2['default'].createElement(
	          'ul',
	          null,
	          contacts
	        )
	      ),
	      _react2['default'].createElement(
	        'div',
	        { className: 'Content' },
	        this.props.children
	      )
	    );
	  }
	});
	
	var Index = _react2['default'].createClass({
	  displayName: 'Index',
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'h1',
	      null,
	      'Address Book'
	    );
	  }
	});
	
	var Contact = _react2['default'].createClass({
	  displayName: 'Contact',
	
	  mixins: [_reactRouter.History],
	
	  getStateFromStore: function getStateFromStore(props) {
	    var _ref = props ? props.params : this.props.params;
	
	    var id = _ref.id;
	
	    return {
	      contact: _ContactStore2['default'].getContact(id)
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return this.getStateFromStore();
	  },
	
	  componentDidMount: function componentDidMount() {
	    _ContactStore2['default'].addChangeListener(this.updateContact);
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    _ContactStore2['default'].removeChangeListener(this.updateContact);
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState(this.getStateFromStore(nextProps));
	  },
	
	  updateContact: function updateContact() {
	    if (!this.isMounted()) return;
	
	    this.setState(this.getStateFromStore());
	  },
	
	  destroy: function destroy() {
	    var id = this.props.params.id;
	
	    _ContactStore2['default'].removeContact(id);
	    this.history.pushState(null, '/');
	  },
	
	  render: function render() {
	    var contact = this.state.contact || {};
	    var name = contact.first + ' ' + contact.last;
	    var avatar = contact.avatar || 'http://placecage.com/50/50';
	
	    return _react2['default'].createElement(
	      'div',
	      { className: 'Contact' },
	      _react2['default'].createElement('img', { height: '50', src: avatar, key: avatar }),
	      _react2['default'].createElement(
	        'h3',
	        null,
	        name
	      ),
	      _react2['default'].createElement(
	        'button',
	        { onClick: this.destroy },
	        'Delete'
	      )
	    );
	  }
	});
	
	var NewContact = _react2['default'].createClass({
	  displayName: 'NewContact',
	
	  mixins: [_reactRouter.History],
	
	  createContact: function createContact(event) {
	    var _this = this;
	
	    event.preventDefault();
	
	    _ContactStore2['default'].addContact({
	      first: _reactDom.findDOMNode(this.refs.first).value,
	      last: _reactDom.findDOMNode(this.refs.last).value
	    }, function (contact) {
	      _this.history.pushState(null, '/contact/' + contact.id);
	    });
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'form',
	      { onSubmit: this.createContact },
	      _react2['default'].createElement(
	        'p',
	        null,
	        _react2['default'].createElement('input', { type: 'text', ref: 'first', placeholder: 'First name' }),
	        _react2['default'].createElement('input', { type: 'text', ref: 'last', placeholder: 'Last name' })
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        _react2['default'].createElement(
	          'button',
	          { type: 'submit' },
	          'Save'
	        ),
	        ' ',
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/' },
	          'Cancel'
	        )
	      )
	    );
	  }
	});
	
	var NotFound = _react2['default'].createClass({
	  displayName: 'NotFound',
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'h2',
	      null,
	      'Not found'
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
	    _react2['default'].createElement(_reactRouter.Route, { path: 'contact/new', component: NewContact }),
	    _react2['default'].createElement(_reactRouter.Route, { path: 'contact/:id', component: Contact }),
	    _react2['default'].createElement(_reactRouter.Route, { path: '*', component: NotFound })
	  )
	), document.getElementById('example'));

/***/ },

/***/ 59:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 88:
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var API = 'http://addressbook-api.herokuapp.com/contacts';
	
	var _contacts = {};
	var _initCalled = false;
	var _changeListeners = [];
	
	var ContactStore = {
	
	  init: function init() {
	    if (_initCalled) return;
	
	    _initCalled = true;
	
	    getJSON(API, function (err, res) {
	      res.contacts.forEach(function (contact) {
	        _contacts[contact.id] = contact;
	      });
	
	      ContactStore.notifyChange();
	    });
	  },
	
	  addContact: function addContact(contact, cb) {
	    postJSON(API, { contact: contact }, function (res) {
	      _contacts[res.contact.id] = res.contact;
	      ContactStore.notifyChange();
	      if (cb) cb(res.contact);
	    });
	  },
	
	  removeContact: function removeContact(id, cb) {
	    deleteJSON(API + '/' + id, cb);
	    delete _contacts[id];
	    ContactStore.notifyChange();
	  },
	
	  getContacts: function getContacts() {
	    var array = [];
	
	    for (var id in _contacts) {
	      array.push(_contacts[id]);
	    }return array;
	  },
	
	  getContact: function getContact(id) {
	    return _contacts[id];
	  },
	
	  notifyChange: function notifyChange() {
	    _changeListeners.forEach(function (listener) {
	      listener();
	    });
	  },
	
	  addChangeListener: function addChangeListener(listener) {
	    _changeListeners.push(listener);
	  },
	
	  removeChangeListener: function removeChangeListener(listener) {
	    _changeListeners = _changeListeners.filter(function (l) {
	      return listener !== l;
	    });
	  }
	
	};
	
	localStorage.token = localStorage.token || Date.now() * Math.random();
	
	function getJSON(url, cb) {
	  var req = new XMLHttpRequest();
	  req.onload = function () {
	    if (req.status === 404) {
	      cb(new Error('not found'));
	    } else {
	      cb(null, JSON.parse(req.response));
	    }
	  };
	  req.open('GET', url);
	  req.setRequestHeader('authorization', localStorage.token);
	  req.send();
	}
	
	function postJSON(url, obj, cb) {
	  var req = new XMLHttpRequest();
	  req.onload = function () {
	    cb(JSON.parse(req.response));
	  };
	  req.open('POST', url);
	  req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	  req.setRequestHeader('authorization', localStorage.token);
	  req.send(JSON.stringify(obj));
	}
	
	function deleteJSON(url, cb) {
	  var req = new XMLHttpRequest();
	  req.onload = cb;
	  req.open('DELETE', url);
	  req.setRequestHeader('authorization', localStorage.token);
	  req.send();
	}
	
	exports['default'] = ContactStore;
	module.exports = exports['default'];

/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(90);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(60)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./app.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./app.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 90:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(59)();
	// imports
	
	
	// module
	exports.push([module.id, "body {\n  font-family: \"Helvetica Neue\", Arial;\n  font-weight: 200;\n}\n\na {\n  color: hsl(200, 50%, 50%);\n}\n\na.active {\n  color: hsl(20, 50%, 50%);\n}\n\n#example {\n  position: absolute;\n}\n\n.App {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 500px;\n  height: 500px;\n}\n\n.ContactList {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 300px;\n  overflow: auto;\n  padding: 20px;\n}\n\n.Content {\n  position: absolute;\n  left: 300px;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  border-left: 1px solid #ccc;\n  overflow: auto;\n  padding: 40px;\n}\n\n", ""]);
	
	// exports


/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9tYXN0ZXItZGV0YWlsL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcz80MmNiKiIsIndlYnBhY2s6Ly8vLi4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzP2U3OWYqIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL2V4YW1wbGVzL21hc3Rlci1kZXRhaWwvQ29udGFjdFN0b3JlLmpzIiwid2VicGFjazovLy8uL21hc3Rlci1kZXRhaWwvYXBwLmNzcz9lMTgyIiwid2VicGFjazovLy8uL21hc3Rlci1kZXRhaWwvYXBwLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7a0NBQWtCLENBQU87Ozs7cUNBQ1csQ0FBVzs7b0NBQ0osRUFBUzs7d0NBQ0ssQ0FBYzs7eUNBQzlDLEVBQWdCOzs7O0FBRXpDLG9CQUFPLENBQUMsRUFBVyxDQUFDOztBQUVwQixLQUFNLE9BQU8sR0FBRyw0Q0FBMEIsQ0FBQztBQUN6QyxXQUFRLEVBQUUsZ0JBQWdCO0VBQzNCLENBQUM7O0FBRUYsS0FBTSxHQUFHLEdBQUcsbUJBQU0sV0FBVyxDQUFDOzs7QUFDNUIsa0JBQWUsNkJBQUc7QUFDaEIsWUFBTztBQUNMLGVBQVEsRUFBRSwwQkFBYSxXQUFXLEVBQUU7QUFDcEMsY0FBTyxFQUFFLElBQUk7TUFDZDtJQUNGOztBQUVELHFCQUFrQixnQ0FBRztBQUNuQiwrQkFBYSxJQUFJLEVBQUU7SUFDcEI7O0FBRUQsb0JBQWlCLCtCQUFHO0FBQ2xCLCtCQUFhLGlCQUFpQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDcEQ7O0FBRUQsdUJBQW9CLGtDQUFHO0FBQ3JCLCtCQUFhLG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDdkQ7O0FBRUQsaUJBQWMsNEJBQUc7QUFDZixTQUFJLENBQUMs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OztBQUdBO0FBQ0EsaUNBQWdDLDJDQUEyQyxxQkFBcUIsR0FBRyxPQUFPLDhCQUE4QixHQUFHLGNBQWMsNkJBQTZCLEdBQUcsY0FBYyx1QkFBdUIsR0FBRyxVQUFVLHVCQUF1QixXQUFXLFlBQVksYUFBYSxjQUFjLGlCQUFpQixrQkFBa0IsR0FBRyxrQkFBa0IsdUJBQXVCLFlBQVksV0FBVyxjQUFjLGlCQUFpQixtQkFBbUIsa0JBQWtCLEdBQUcsY0FBYyx1QkFBdUIsZ0JBQWdCLFdBQVcsY0FBYyxhQUFhLGdDQUFnQyxtQkFBbUIsa0JBQWtCLEdBQUc7O0FBRXBvQiIsImZpbGUiOiJtYXN0ZXItZGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgcmVuZGVyLCBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCB7IGNyZWF0ZUhpc3RvcnksIHVzZUJhc2VuYW1lIH0gZnJvbSAnaGlzdG9yeSdcbmltcG9ydCB7IFJvdXRlciwgSGlzdG9yeSwgUm91dGUsIEluZGV4Um91dGUsIExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG5pbXBvcnQgQ29udGFjdFN0b3JlIGZyb20gJy4vQ29udGFjdFN0b3JlJ1xuXG5yZXF1aXJlKCcuL2FwcC5jc3MnKVxuXG5jb25zdCBoaXN0b3J5ID0gdXNlQmFzZW5hbWUoY3JlYXRlSGlzdG9yeSkoe1xuICBiYXNlbmFtZTogJy9tYXN0ZXItZGV0YWlsJ1xufSlcblxuY29uc3QgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbnRhY3RzOiBDb250YWN0U3RvcmUuZ2V0Q29udGFjdHMoKSxcbiAgICAgIGxvYWRpbmc6IHRydWVcbiAgICB9XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIENvbnRhY3RTdG9yZS5pbml0KClcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBDb250YWN0U3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy51cGRhdGVDb250YWN0cylcbiAgfSxcblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBDb250YWN0U3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy51cGRhdGVDb250YWN0cylcbiAgfSxcblxuICB1cGRhdGVDb250YWN0cygpIHtcbiAgICBpZiAoIXRoaXMuaXNNb3VudGVkKCkpXG4gICAgICByZXR1cm5cblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY29udGFjdHM6IENvbnRhY3RTdG9yZS5nZXRDb250YWN0cygpLFxuICAgICAgbG9hZGluZzogZmFsc2VcbiAgICB9KVxuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjb250YWN0cyA9IHRoaXMuc3RhdGUuY29udGFjdHMubWFwKGZ1bmN0aW9uIChjb250YWN0KSB7XG4gICAgICByZXR1cm4gPGxpIGtleT17Y29udGFjdC5pZH0+PExpbmsgdG89e2AvY29udGFjdC8ke2NvbnRhY3QuaWR9YH0+e2NvbnRhY3QuZmlyc3R9PC9MaW5rPjwvbGk+XG4gICAgfSlcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIkFwcFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkNvbnRhY3RMaXN0XCI+XG4gICAgICAgICAgPExpbmsgdG89XCIvY29udGFjdC9uZXdcIj5OZXcgQ29udGFjdDwvTGluaz5cbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICB7Y29udGFjdHN9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQ29udGVudFwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufSlcblxuY29uc3QgSW5kZXggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPGgxPkFkZHJlc3MgQm9vazwvaDE+XG4gIH1cbn0pXG5cbmNvbnN0IENvbnRhY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIG1peGluczogWyBIaXN0b3J5IF0sXG5cbiAgZ2V0U3RhdGVGcm9tU3RvcmUocHJvcHMpIHtcbiAgICBjb25zdCB7IGlkIH0gPSBwcm9wcyA/IHByb3BzLnBhcmFtcyA6IHRoaXMucHJvcHMucGFyYW1zXG5cbiAgICByZXR1cm4ge1xuICAgICAgY29udGFjdDogQ29udGFjdFN0b3JlLmdldENvbnRhY3QoaWQpXG4gICAgfVxuICB9LFxuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRTdGF0ZUZyb21TdG9yZSgpXG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgQ29udGFjdFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMudXBkYXRlQ29udGFjdClcbiAgfSxcblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBDb250YWN0U3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy51cGRhdGVDb250YWN0KVxuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh0aGlzLmdldFN0YXRlRnJvbVN0b3JlKG5leHRQcm9wcykpXG4gIH0sXG5cbiAgdXBkYXRlQ29udGFjdCgpIHtcbiAgICBpZiAoIXRoaXMuaXNNb3VudGVkKCkpXG4gICAgICByZXR1cm5cblxuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5nZXRTdGF0ZUZyb21TdG9yZSgpKVxuICB9LFxuXG4gIGRlc3Ryb3koKSB7XG4gICAgY29uc3QgeyBpZCB9ID0gdGhpcy5wcm9wcy5wYXJhbXNcbiAgICBDb250YWN0U3RvcmUucmVtb3ZlQ29udGFjdChpZClcbiAgICB0aGlzLmhpc3RvcnkucHVzaFN0YXRlKG51bGwsICcvJylcbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY29udGFjdCA9IHRoaXMuc3RhdGUuY29udGFjdCB8fCB7fVxuICAgIGNvbnN0IG5hbWUgPSBjb250YWN0LmZpcnN0ICsgJyAnICsgY29udGFjdC5sYXN0XG4gICAgY29uc3QgYXZhdGFyID0gY29udGFjdC5hdmF0YXIgfHwgJ2h0dHA6Ly9wbGFjZWNhZ2UuY29tLzUwLzUwJ1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQ29udGFjdFwiPlxuICAgICAgICA8aW1nIGhlaWdodD1cIjUwXCIgc3JjPXthdmF0YXJ9IGtleT17YXZhdGFyfSAvPlxuICAgICAgICA8aDM+e25hbWV9PC9oMz5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmRlc3Ryb3l9PkRlbGV0ZTwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59KVxuXG5jb25zdCBOZXdDb250YWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBtaXhpbnM6IFsgSGlzdG9yeSBdLFxuXG4gIGNyZWF0ZUNvbnRhY3QoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBDb250YWN0U3RvcmUuYWRkQ29udGFjdCh7XG4gICAgICBmaXJzdDogZmluZERPTU5vZGUodGhpcy5yZWZzLmZpcnN0KS52YWx1ZSxcbiAgICAgIGxhc3Q6IGZpbmRET01Ob2RlKHRoaXMucmVmcy5sYXN0KS52YWx1ZVxuICAgIH0sIChjb250YWN0KSA9PiB7XG4gICAgICB0aGlzLmhpc3RvcnkucHVzaFN0YXRlKG51bGwsIGAvY29udGFjdC8ke2NvbnRhY3QuaWR9YClcbiAgICB9KVxuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMuY3JlYXRlQ29udGFjdH0+XG4gICAgICAgIDxwPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj1cImZpcnN0XCIgcGxhY2Vob2xkZXI9XCJGaXJzdCBuYW1lXCIgLz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiByZWY9XCJsYXN0XCIgcGxhY2Vob2xkZXI9XCJMYXN0IG5hbWVcIiAvPlxuICAgICAgICA8L3A+XG4gICAgICAgIDxwPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlNhdmU8L2J1dHRvbj4gPExpbmsgdG89XCIvXCI+Q2FuY2VsPC9MaW5rPlxuICAgICAgICA8L3A+XG4gICAgICA8L2Zvcm0+XG4gICAgKVxuICB9XG59KVxuXG5jb25zdCBOb3RGb3VuZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8aDI+Tm90IGZvdW5kPC9oMj5cbiAgfVxufSlcblxucmVuZGVyKChcbiAgPFJvdXRlciBoaXN0b3J5PXtoaXN0b3J5fT5cbiAgICA8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0FwcH0+XG4gICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0luZGV4fSAvPlxuICAgICAgPFJvdXRlIHBhdGg9XCJjb250YWN0L25ld1wiIGNvbXBvbmVudD17TmV3Q29udGFjdH0gLz5cbiAgICAgIDxSb3V0ZSBwYXRoPVwiY29udGFjdC86aWRcIiBjb21wb25lbnQ9e0NvbnRhY3R9IC8+XG4gICAgICA8Um91dGUgcGF0aD1cIipcIiBjb21wb25lbnQ9e05vdEZvdW5kfSAvPlxuICAgIDwvUm91dGU+XG4gIDwvUm91dGVyPlxuKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4YW1wbGUnKSlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvZXhhbXBsZXMvbWFzdGVyLWRldGFpbC9hcHAuanNcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblxyXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cclxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxyXG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcclxuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XHJcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcclxuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxyXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xyXG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXHJcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXHJcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXHJcblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXHJcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XHJcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XHJcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gNTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSAxMiAxOSAyMCAyMSAyNVxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxyXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0dmFyIG1lbW87XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gbWVtbztcclxuXHRcdH07XHJcblx0fSxcclxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSBbNi05XVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuXHR9KSxcclxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdH0pLFxyXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxyXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcclxuXHJcblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcclxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcclxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxyXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCgpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQoKSB7XHJcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG5cdGhlYWQuYXBwZW5kQ2hpbGQobGlua0VsZW1lbnQpO1xyXG5cdHJldHVybiBsaW5rRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCwgdXBkYXRlLCByZW1vdmU7XHJcblxyXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xyXG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KCkpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XHJcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcclxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQoKTtcclxuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHRcdGlmKHN0eWxlRWxlbWVudC5ocmVmKVxyXG5cdFx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGVFbGVtZW50LmhyZWYpO1xyXG5cdFx0fTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KCk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcclxuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcclxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xyXG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxpbmsobGlua0VsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwKSB7XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxyXG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XHJcblxyXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xyXG5cclxuXHRsaW5rRWxlbWVudC5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcblx0aWYob2xkU3JjKVxyXG5cdFx0VVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gNjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSAxMiAxOSAyMCAyMSAyNVxuICoqLyIsImNvbnN0IEFQSSA9ICdodHRwOi8vYWRkcmVzc2Jvb2stYXBpLmhlcm9rdWFwcC5jb20vY29udGFjdHMnXG5cbmxldCBfY29udGFjdHMgPSB7fVxubGV0IF9pbml0Q2FsbGVkID0gZmFsc2VcbmxldCBfY2hhbmdlTGlzdGVuZXJzID0gW11cblxuY29uc3QgQ29udGFjdFN0b3JlID0ge1xuXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoX2luaXRDYWxsZWQpXG4gICAgICByZXR1cm5cblxuICAgIF9pbml0Q2FsbGVkID0gdHJ1ZVxuXG4gICAgZ2V0SlNPTihBUEksIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgcmVzLmNvbnRhY3RzLmZvckVhY2goZnVuY3Rpb24gKGNvbnRhY3QpIHtcbiAgICAgICAgX2NvbnRhY3RzW2NvbnRhY3QuaWRdID0gY29udGFjdFxuICAgICAgfSlcblxuICAgICAgQ29udGFjdFN0b3JlLm5vdGlmeUNoYW5nZSgpXG4gICAgfSlcbiAgfSxcblxuICBhZGRDb250YWN0OiBmdW5jdGlvbiAoY29udGFjdCwgY2IpIHtcbiAgICBwb3N0SlNPTihBUEksIHsgY29udGFjdDogY29udGFjdCB9LCBmdW5jdGlvbiAocmVzKSB7XG4gICAgICBfY29udGFjdHNbcmVzLmNvbnRhY3QuaWRdID0gcmVzLmNvbnRhY3RcbiAgICAgIENvbnRhY3RTdG9yZS5ub3RpZnlDaGFuZ2UoKVxuICAgICAgaWYgKGNiKSBjYihyZXMuY29udGFjdClcbiAgICB9KVxuICB9LFxuXG4gIHJlbW92ZUNvbnRhY3Q6IGZ1bmN0aW9uIChpZCwgY2IpIHtcbiAgICBkZWxldGVKU09OKEFQSSArICcvJyArIGlkLCBjYilcbiAgICBkZWxldGUgX2NvbnRhY3RzW2lkXVxuICAgIENvbnRhY3RTdG9yZS5ub3RpZnlDaGFuZ2UoKVxuICB9LFxuXG4gIGdldENvbnRhY3RzOiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYXJyYXkgPSBbXVxuXG4gICAgZm9yIChjb25zdCBpZCBpbiBfY29udGFjdHMpXG4gICAgICBhcnJheS5wdXNoKF9jb250YWN0c1tpZF0pXG5cbiAgICByZXR1cm4gYXJyYXlcbiAgfSxcblxuICBnZXRDb250YWN0OiBmdW5jdGlvbiAoaWQpIHtcbiAgICByZXR1cm4gX2NvbnRhY3RzW2lkXVxuICB9LFxuXG4gIG5vdGlmeUNoYW5nZTogZnVuY3Rpb24gKCkge1xuICAgIF9jaGFuZ2VMaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgIGxpc3RlbmVyKClcbiAgICB9KVxuICB9LFxuXG4gIGFkZENoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICBfY2hhbmdlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpXG4gIH0sXG5cbiAgcmVtb3ZlQ2hhbmdlTGlzdGVuZXI6IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgIF9jaGFuZ2VMaXN0ZW5lcnMgPSBfY2hhbmdlTGlzdGVuZXJzLmZpbHRlcihmdW5jdGlvbiAobCkge1xuICAgICAgcmV0dXJuIGxpc3RlbmVyICE9PSBsXG4gICAgfSlcbiAgfVxuXG59XG5cbmxvY2FsU3RvcmFnZS50b2tlbiA9IGxvY2FsU3RvcmFnZS50b2tlbiB8fCAoRGF0ZS5ub3coKSpNYXRoLnJhbmRvbSgpKVxuXG5mdW5jdGlvbiBnZXRKU09OKHVybCwgY2IpIHtcbiAgY29uc3QgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgcmVxLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAocmVxLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICBjYihuZXcgRXJyb3IoJ25vdCBmb3VuZCcpKVxuICAgIH0gZWxzZSB7XG4gICAgICBjYihudWxsLCBKU09OLnBhcnNlKHJlcS5yZXNwb25zZSkpXG4gICAgfVxuICB9XG4gIHJlcS5vcGVuKCdHRVQnLCB1cmwpXG4gIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdhdXRob3JpemF0aW9uJywgbG9jYWxTdG9yYWdlLnRva2VuKVxuICByZXEuc2VuZCgpXG59XG5cbmZ1bmN0aW9uIHBvc3RKU09OKHVybCwgb2JqLCBjYikge1xuICBjb25zdCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICByZXEub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIGNiKEpTT04ucGFyc2UocmVxLnJlc3BvbnNlKSlcbiAgfVxuICByZXEub3BlbignUE9TVCcsIHVybClcbiAgcmVxLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnKVxuICByZXEuc2V0UmVxdWVzdEhlYWRlcignYXV0aG9yaXphdGlvbicsIGxvY2FsU3RvcmFnZS50b2tlbilcbiAgcmVxLnNlbmQoSlNPTi5zdHJpbmdpZnkob2JqKSlcbn1cblxuZnVuY3Rpb24gZGVsZXRlSlNPTih1cmwsIGNiKSB7XG4gIGNvbnN0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gIHJlcS5vbmxvYWQgPSBjYlxuICByZXEub3BlbignREVMRVRFJywgdXJsKVxuICByZXEuc2V0UmVxdWVzdEhlYWRlcignYXV0aG9yaXphdGlvbicsIGxvY2FsU3RvcmFnZS50b2tlbilcbiAgcmVxLnNlbmQoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250YWN0U3RvcmVcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvZXhhbXBsZXMvbWFzdGVyLWRldGFpbC9Db250YWN0U3RvcmUuanNcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2FwcC5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vYXBwLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2FwcC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9tYXN0ZXItZGV0YWlsL2FwcC5jc3NcbiAqKiBtb2R1bGUgaWQgPSA4OVxuICoqIG1vZHVsZSBjaHVua3MgPSAxOVxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICBmb250LWZhbWlseTogXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgQXJpYWw7XFxuICBmb250LXdlaWdodDogMjAwO1xcbn1cXG5cXG5hIHtcXG4gIGNvbG9yOiBoc2woMjAwLCA1MCUsIDUwJSk7XFxufVxcblxcbmEuYWN0aXZlIHtcXG4gIGNvbG9yOiBoc2woMjAsIDUwJSwgNTAlKTtcXG59XFxuXFxuI2V4YW1wbGUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbn1cXG5cXG4uQXBwIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIHdpZHRoOiA1MDBweDtcXG4gIGhlaWdodDogNTAwcHg7XFxufVxcblxcbi5Db250YWN0TGlzdCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBwYWRkaW5nOiAyMHB4O1xcbn1cXG5cXG4uQ29udGVudCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAzMDBweDtcXG4gIHRvcDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjY2NjO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBwYWRkaW5nOiA0MHB4O1xcbn1cXG5cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vY3NzLWxvYWRlciEuL21hc3Rlci1kZXRhaWwvYXBwLmNzc1xuICoqIG1vZHVsZSBpZCA9IDkwXG4gKiogbW9kdWxlIGNodW5rcyA9IDE5XG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==