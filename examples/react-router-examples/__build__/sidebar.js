webpackJsonp([25],{

/***/ 0:
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
	
	var _data = __webpack_require__(95);
	
	var _data2 = _interopRequireDefault(_data);
	
	__webpack_require__(96);
	
	var history = _history.useBasename(_history.createHistory)({
	  basename: '/sidebar'
	});
	
	var Category = (function (_React$Component) {
	  _inherits(Category, _React$Component);
	
	  function Category() {
	    _classCallCheck(this, Category);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  Category.prototype.render = function render() {
	    var category = _data2['default'].lookupCategory(this.props.params.category);
	
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h1',
	        null,
	        category.name
	      ),
	      this.props.children || _react2['default'].createElement(
	        'p',
	        null,
	        category.description
	      )
	    );
	  };
	
	  return Category;
	})(_react2['default'].Component);
	
	var CategorySidebar = (function (_React$Component2) {
	  _inherits(CategorySidebar, _React$Component2);
	
	  function CategorySidebar() {
	    _classCallCheck(this, CategorySidebar);
	
	    _React$Component2.apply(this, arguments);
	  }
	
	  CategorySidebar.prototype.render = function render() {
	    var category = _data2['default'].lookupCategory(this.props.params.category);
	
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        _reactRouter.Link,
	        { to: '/' },
	        '◀︎ Back'
	      ),
	      _react2['default'].createElement(
	        'h2',
	        null,
	        category.name,
	        ' Items'
	      ),
	      _react2['default'].createElement(
	        'ul',
	        null,
	        category.items.map(function (item, index) {
	          return _react2['default'].createElement(
	            'li',
	            { key: index },
	            _react2['default'].createElement(
	              _reactRouter.Link,
	              { to: '/category/' + category.name + '/' + item.name },
	              item.name
	            )
	          );
	        })
	      )
	    );
	  };
	
	  return CategorySidebar;
	})(_react2['default'].Component);
	
	var Item = (function (_React$Component3) {
	  _inherits(Item, _React$Component3);
	
	  function Item() {
	    _classCallCheck(this, Item);
	
	    _React$Component3.apply(this, arguments);
	  }
	
	  Item.prototype.render = function render() {
	    var _props$params = this.props.params;
	    var category = _props$params.category;
	    var item = _props$params.item;
	
	    var menuItem = _data2['default'].lookupItem(category, item);
	
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h1',
	        null,
	        menuItem.name
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        '$',
	        menuItem.price
	      )
	    );
	  };
	
	  return Item;
	})(_react2['default'].Component);
	
	var Index = (function (_React$Component4) {
	  _inherits(Index, _React$Component4);
	
	  function Index() {
	    _classCallCheck(this, Index);
	
	    _React$Component4.apply(this, arguments);
	  }
	
	  Index.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h1',
	        null,
	        'Sidebar'
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        'Routes can have multiple components, so that all portions of your UI can participate in the routing.'
	      )
	    );
	  };
	
	  return Index;
	})(_react2['default'].Component);
	
	var IndexSidebar = (function (_React$Component5) {
	  _inherits(IndexSidebar, _React$Component5);
	
	  function IndexSidebar() {
	    _classCallCheck(this, IndexSidebar);
	
	    _React$Component5.apply(this, arguments);
	  }
	
	  IndexSidebar.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'Categories'
	      ),
	      _react2['default'].createElement(
	        'ul',
	        null,
	        _data2['default'].getAll().map(function (category, index) {
	          return _react2['default'].createElement(
	            'li',
	            { key: index },
	            _react2['default'].createElement(
	              _reactRouter.Link,
	              { to: '/category/' + category.name },
	              category.name
	            )
	          );
	        })
	      )
	    );
	  };
	
	  return IndexSidebar;
	})(_react2['default'].Component);
	
	var App = (function (_React$Component6) {
	  _inherits(App, _React$Component6);
	
	  function App() {
	    _classCallCheck(this, App);
	
	    _React$Component6.apply(this, arguments);
	  }
	
	  App.prototype.render = function render() {
	    var _props = this.props;
	    var content = _props.content;
	    var sidebar = _props.sidebar;
	
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'div',
	        { className: 'Sidebar' },
	        sidebar || _react2['default'].createElement(IndexSidebar, null)
	      ),
	      _react2['default'].createElement(
	        'div',
	        { className: 'Content' },
	        content || _react2['default'].createElement(Index, null)
	      )
	    );
	  };
	
	  return App;
	})(_react2['default'].Component);
	
	_reactDom.render(_react2['default'].createElement(
	  _reactRouter.Router,
	  { history: history },
	  _react2['default'].createElement(
	    _reactRouter.Route,
	    { path: '/', component: App },
	    _react2['default'].createElement(
	      _reactRouter.Route,
	      { path: 'category/:category', components: { content: Category, sidebar: CategorySidebar } },
	      _react2['default'].createElement(_reactRouter.Route, { path: ':item', component: Item })
	    )
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

/***/ 95:
/***/ function(module, exports) {

	'use strict';
	
	var data = [{
	  name: 'Tacos',
	  description: 'A taco (/ˈtækoʊ/ or /ˈtɑːkoʊ/) is a traditional Mexican dish composed of a corn or wheat tortilla folded or rolled around a filling. A taco can be made with a variety of fillings, including beef, pork, chicken, seafood, vegetables and cheese, allowing for great versatility and variety. A taco is generally eaten without utensils and is often accompanied by garnishes such as salsa, avocado or guacamole, cilantro (coriander), tomatoes, minced meat, onions and lettuce.',
	  items: [{ name: 'Carne Asada', price: 7 }, { name: 'Pollo', price: 6 }, { name: 'Carnitas', price: 6 }]
	}, {
	  name: 'Burgers',
	  description: 'A hamburger (also called a beef burger, hamburger sandwich, burger or hamburg) is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bun. Hamburgers are often served with lettuce, bacon, tomato, onion, pickles, cheese and condiments such as mustard, mayonnaise, ketchup, relish, and green chile.',
	  items: [{ name: 'Buffalo Bleu', price: 8 }, { name: 'Bacon', price: 8 }, { name: 'Mushroom and Swiss', price: 6 }]
	}, {
	  name: 'Drinks',
	  description: 'Drinks, or beverages, are liquids intended for human consumption. In addition to basic needs, beverages form part of the culture of human society. Although all beverages, including juice, soft drinks, and carbonated drinks, have some form of water in them, water itself is often not classified as a beverage, and the word beverage has been recurrently defined as not referring to water.',
	  items: [{ name: 'Lemonade', price: 3 }, { name: 'Root Beer', price: 4 }, { name: 'Iron Port', price: 5 }]
	}];
	
	var dataMap = data.reduce(function (map, category) {
	  category.itemsMap = category.items.reduce(function (itemsMap, item) {
	    itemsMap[item.name] = item;
	    return itemsMap;
	  }, {});
	  map[category.name] = category;
	  return map;
	}, {});
	
	exports.getAll = function () {
	  return data;
	};
	
	exports.lookupCategory = function (name) {
	  return dataMap[name];
	};
	
	exports.lookupItem = function (category, item) {
	  return dataMap[category].itemsMap[item];
	};

/***/ },

/***/ 96:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(97);
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

/***/ 97:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(59)();
	// imports
	
	
	// module
	exports.push([module.id, ".Sidebar {\n  float: left;\n  background: #eee;\n  padding: 20px;\n  margin: 0 20px 20px 20px;\n  width: 200px;\n  cursor: pointer;\n}\n\n.Content {\n  padding: 20px 20px 20px 300px;\n}\n\n.CategoryNav__Toggle:before {\n  display: inline-block;\n  width: 1em;\n  content: '\\25B8';\n}\n\n.CategoryNav__Toggle--is-open:before {\n  content: '\\25BE';\n}\n\na {\n  text-decoration: none;\n}\n", ""]);
	
	// exports


/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9zaWRlYmFyL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcz80MmNiKioqKiIsIndlYnBhY2s6Ly8vLi4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzP2U3OWYqKioqIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyLTEuMC4zL2V4YW1wbGVzL3NpZGViYXIvZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zaWRlYmFyL2FwcC5jc3M/MTE5YiIsIndlYnBhY2s6Ly8vLi9zaWRlYmFyL2FwcC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztrQ0FBa0IsQ0FBTzs7OztxQ0FDRixDQUFXOztvQ0FDUyxFQUFTOzt3Q0FDaEIsQ0FBYzs7aUNBQ2pDLEVBQVE7Ozs7QUFFekIsb0JBQU8sQ0FBQyxFQUFXLENBQUM7O0FBRXBCLEtBQU0sT0FBTyxHQUFHLDRDQUEwQixDQUFDO0FBQ3pDLFdBQVEsRUFBRSxVQUFVO0VBQ3JCLENBQUM7O0tBRUksUUFBUTthQUFSLFFBQVE7O1lBQVIsUUFBUTsyQkFBUixRQUFROzs7OztBQUFSLFdBQVEsV0FDWixNQUFNLHFCQUFHO0FBQ1AsU0FBTSxRQUFRLEdBQUcsa0JBQUssY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7QUFFaEUsWUFDRTs7O09BQ0U7OztTQUFLLFFBQVEsQ0FBQyxJQUFJO1FBQU07T0FDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQ2xCOzs7U0FBSSxRQUFRLENBQUMsV0FBVztRQUN6QjtNQUNHLENBQ1A7SUFDRjs7VUFaRyxRQUFRO0lBQVMsbUJBQU0sU0FBUzs7S0FlaEMsZUFBZTthQUFmLGVBQWU7O1lBQWYsZUFBZTsyQkFBZixlQUFlOzs7OztBQUFmLGtCQUFlLFdBQ25CLE1BQU0s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SUFBSSxDQUFDO0VBQ3JCOztBQUVELFFBQU8sQ0FBQyxVQUFVLEdBQUcsVUFBVSxRQUFRLEVBQUUsSUFBSSxFQUFFO0FBQzdDLFVBQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7RUFDeEMsQzs7Ozs7OztBQ2pERDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFtRjtBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLGlDQUFnQyxVQUFVLEVBQUU7QUFDNUMsRTs7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLHFDQUFvQyxnQkFBZ0IscUJBQXFCLGtCQUFrQiw2QkFBNkIsaUJBQWlCLG9CQUFvQixHQUFHLGNBQWMsa0NBQWtDLEdBQUcsaUNBQWlDLDBCQUEwQixlQUFlLHNCQUFzQixHQUFHLDBDQUEwQyxzQkFBc0IsR0FBRyxPQUFPLDBCQUEwQixHQUFHOztBQUU3WiIsImZpbGUiOiJzaWRlYmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IHsgY3JlYXRlSGlzdG9yeSwgdXNlQmFzZW5hbWUgfSBmcm9tICdoaXN0b3J5J1xuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZSwgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlcidcbmltcG9ydCBkYXRhIGZyb20gJy4vZGF0YSdcblxucmVxdWlyZSgnLi9hcHAuY3NzJylcblxuY29uc3QgaGlzdG9yeSA9IHVzZUJhc2VuYW1lKGNyZWF0ZUhpc3RvcnkpKHtcbiAgYmFzZW5hbWU6ICcvc2lkZWJhcidcbn0pXG5cbmNsYXNzIENhdGVnb3J5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNhdGVnb3J5ID0gZGF0YS5sb29rdXBDYXRlZ29yeSh0aGlzLnByb3BzLnBhcmFtcy5jYXRlZ29yeSlcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDE+e2NhdGVnb3J5Lm5hbWV9PC9oMT5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW4gfHwgKFxuICAgICAgICAgIDxwPntjYXRlZ29yeS5kZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuY2xhc3MgQ2F0ZWdvcnlTaWRlYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNhdGVnb3J5ID0gZGF0YS5sb29rdXBDYXRlZ29yeSh0aGlzLnByb3BzLnBhcmFtcy5jYXRlZ29yeSlcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8TGluayB0bz1cIi9cIj7il4DvuI4gQmFjazwvTGluaz5cbiAgICAgICAgPGgyPntjYXRlZ29yeS5uYW1lfSBJdGVtczwvaDI+XG4gICAgICAgIDx1bD5cbiAgICAgICAgICB7Y2F0ZWdvcnkuaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPGxpIGtleT17aW5kZXh9PlxuICAgICAgICAgICAgICA8TGluayB0bz17YC9jYXRlZ29yeS8ke2NhdGVnb3J5Lm5hbWV9LyR7aXRlbS5uYW1lfWB9PntpdGVtLm5hbWV9PC9MaW5rPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5jbGFzcyBJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2F0ZWdvcnksIGl0ZW0gfSA9IHRoaXMucHJvcHMucGFyYW1zXG4gICAgY29uc3QgbWVudUl0ZW0gPSBkYXRhLmxvb2t1cEl0ZW0oY2F0ZWdvcnksIGl0ZW0pXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPnttZW51SXRlbS5uYW1lfTwvaDE+XG4gICAgICAgIDxwPiR7bWVudUl0ZW0ucHJpY2V9PC9wPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmNsYXNzIEluZGV4IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDE+U2lkZWJhcjwvaDE+XG4gICAgICAgIDxwPlxuICAgICAgICAgIFJvdXRlcyBjYW4gaGF2ZSBtdWx0aXBsZSBjb21wb25lbnRzLCBzbyB0aGF0IGFsbCBwb3J0aW9ucyBvZiB5b3VyIFVJXG4gICAgICAgICAgY2FuIHBhcnRpY2lwYXRlIGluIHRoZSByb3V0aW5nLlxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuY2xhc3MgSW5kZXhTaWRlYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDI+Q2F0ZWdvcmllczwvaDI+XG4gICAgICAgIDx1bD5cbiAgICAgICAgICB7ZGF0YS5nZXRBbGwoKS5tYXAoKGNhdGVnb3J5LCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPGxpIGtleT17aW5kZXh9PlxuICAgICAgICAgICAgICA8TGluayB0bz17YC9jYXRlZ29yeS8ke2NhdGVnb3J5Lm5hbWV9YH0+e2NhdGVnb3J5Lm5hbWV9PC9MaW5rPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjb250ZW50LCBzaWRlYmFyIH0gPSB0aGlzLnByb3BzXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJTaWRlYmFyXCI+XG4gICAgICAgICAge3NpZGViYXIgfHwgPEluZGV4U2lkZWJhciAvPn1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQ29udGVudFwiPlxuICAgICAgICAgIHtjb250ZW50IHx8IDxJbmRleCAvPn1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxucmVuZGVyKChcbiAgPFJvdXRlciBoaXN0b3J5PXtoaXN0b3J5fT5cbiAgICA8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0FwcH0+XG4gICAgICA8Um91dGUgcGF0aD1cImNhdGVnb3J5LzpjYXRlZ29yeVwiIGNvbXBvbmVudHM9e3sgY29udGVudDogQ2F0ZWdvcnksIHNpZGViYXI6IENhdGVnb3J5U2lkZWJhciB9fT5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCI6aXRlbVwiIGNvbXBvbmVudD17SXRlbX0gLz5cbiAgICAgIDwvUm91dGU+XG4gICAgPC9Sb3V0ZT5cbiAgPC9Sb3V0ZXI+XG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci0xLjAuMy9leGFtcGxlcy9zaWRlYmFyL2FwcC5qc1xuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbiAqKiBtb2R1bGUgaWQgPSA1OVxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDEyIDE5IDIwIDIxIDI1XG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge30sXHJcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XHJcblx0XHR2YXIgbWVtbztcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdHJldHVybiBtZW1vO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIC9tc2llIFs2LTldXFxiLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG5cdH0pLFxyXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0fSksXHJcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXHJcblx0c2luZ2xldG9uQ291bnRlciA9IDA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XHJcblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KCkge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCgpIHtcclxuXHR2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XHJcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XHJcblx0aGVhZC5hcHBlbmRDaGlsZChsaW5rRWxlbWVudCk7XHJcblx0cmV0dXJuIGxpbmtFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2UgaWYob2JqLnNvdXJjZU1hcCAmJlxyXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVMaW5rRWxlbWVudCgpO1xyXG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXHJcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9iaik7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xyXG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xyXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XHJcblx0fTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcclxuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XHJcblxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XHJcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblxyXG5cdGlmKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTGluayhsaW5rRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXApIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XHJcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XHJcblx0fVxyXG5cclxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcclxuXHJcblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XHJcblxyXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuXHRpZihvbGRTcmMpXHJcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA2MFxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDEyIDE5IDIwIDIxIDI1XG4gKiovIiwiY29uc3QgZGF0YSA9IFtcbiAge1xuICAgIG5hbWU6ICdUYWNvcycsXG4gICAgZGVzY3JpcHRpb246ICdBIHRhY28gKC/LiHTDpmtvyoovIG9yIC/LiHTJkcuQa2/Kii8pIGlzIGEgdHJhZGl0aW9uYWwgTWV4aWNhbiBkaXNoIGNvbXBvc2VkIG9mIGEgY29ybiBvciB3aGVhdCB0b3J0aWxsYSBmb2xkZWQgb3Igcm9sbGVkIGFyb3VuZCBhIGZpbGxpbmcuIEEgdGFjbyBjYW4gYmUgbWFkZSB3aXRoIGEgdmFyaWV0eSBvZiBmaWxsaW5ncywgaW5jbHVkaW5nIGJlZWYsIHBvcmssIGNoaWNrZW4sIHNlYWZvb2QsIHZlZ2V0YWJsZXMgYW5kIGNoZWVzZSwgYWxsb3dpbmcgZm9yIGdyZWF0IHZlcnNhdGlsaXR5IGFuZCB2YXJpZXR5LiBBIHRhY28gaXMgZ2VuZXJhbGx5IGVhdGVuIHdpdGhvdXQgdXRlbnNpbHMgYW5kIGlzIG9mdGVuIGFjY29tcGFuaWVkIGJ5IGdhcm5pc2hlcyBzdWNoIGFzIHNhbHNhLCBhdm9jYWRvIG9yIGd1YWNhbW9sZSwgY2lsYW50cm8gKGNvcmlhbmRlciksIHRvbWF0b2VzLCBtaW5jZWQgbWVhdCwgb25pb25zIGFuZCBsZXR0dWNlLicsXG4gICAgaXRlbXM6IFtcbiAgICAgIHsgbmFtZTogJ0Nhcm5lIEFzYWRhJywgcHJpY2U6IDcgfSxcbiAgICAgIHsgbmFtZTogJ1BvbGxvJywgcHJpY2U6IDYgfSxcbiAgICAgIHsgbmFtZTogJ0Nhcm5pdGFzJywgcHJpY2U6IDYgfVxuICAgIF1cbiAgfSxcbiAge1xuICAgIG5hbWU6ICdCdXJnZXJzJyxcbiAgICBkZXNjcmlwdGlvbjogJ0EgaGFtYnVyZ2VyIChhbHNvIGNhbGxlZCBhIGJlZWYgYnVyZ2VyLCBoYW1idXJnZXIgc2FuZHdpY2gsIGJ1cmdlciBvciBoYW1idXJnKSBpcyBhIHNhbmR3aWNoIGNvbnNpc3Rpbmcgb2Ygb25lIG9yIG1vcmUgY29va2VkIHBhdHRpZXMgb2YgZ3JvdW5kIG1lYXQsIHVzdWFsbHkgYmVlZiwgcGxhY2VkIGluc2lkZSBhIHNsaWNlZCBidW4uIEhhbWJ1cmdlcnMgYXJlIG9mdGVuIHNlcnZlZCB3aXRoIGxldHR1Y2UsIGJhY29uLCB0b21hdG8sIG9uaW9uLCBwaWNrbGVzLCBjaGVlc2UgYW5kIGNvbmRpbWVudHMgc3VjaCBhcyBtdXN0YXJkLCBtYXlvbm5haXNlLCBrZXRjaHVwLCByZWxpc2gsIGFuZCBncmVlbiBjaGlsZS4nLFxuICAgIGl0ZW1zOiBbXG4gICAgICB7IG5hbWU6ICdCdWZmYWxvIEJsZXUnLCBwcmljZTogOCB9LFxuICAgICAgeyBuYW1lOiAnQmFjb24nLCBwcmljZTogOCB9LFxuICAgICAgeyBuYW1lOiAnTXVzaHJvb20gYW5kIFN3aXNzJywgcHJpY2U6IDYgfVxuICAgIF1cbiAgfSxcbiAge1xuICAgIG5hbWU6ICdEcmlua3MnLFxuICAgIGRlc2NyaXB0aW9uOiAnRHJpbmtzLCBvciBiZXZlcmFnZXMsIGFyZSBsaXF1aWRzIGludGVuZGVkIGZvciBodW1hbiBjb25zdW1wdGlvbi4gSW4gYWRkaXRpb24gdG8gYmFzaWMgbmVlZHMsIGJldmVyYWdlcyBmb3JtIHBhcnQgb2YgdGhlIGN1bHR1cmUgb2YgaHVtYW4gc29jaWV0eS4gQWx0aG91Z2ggYWxsIGJldmVyYWdlcywgaW5jbHVkaW5nIGp1aWNlLCBzb2Z0IGRyaW5rcywgYW5kIGNhcmJvbmF0ZWQgZHJpbmtzLCBoYXZlIHNvbWUgZm9ybSBvZiB3YXRlciBpbiB0aGVtLCB3YXRlciBpdHNlbGYgaXMgb2Z0ZW4gbm90IGNsYXNzaWZpZWQgYXMgYSBiZXZlcmFnZSwgYW5kIHRoZSB3b3JkIGJldmVyYWdlIGhhcyBiZWVuIHJlY3VycmVudGx5IGRlZmluZWQgYXMgbm90IHJlZmVycmluZyB0byB3YXRlci4nLFxuICAgIGl0ZW1zOiBbXG4gICAgICB7IG5hbWU6ICdMZW1vbmFkZScsIHByaWNlOiAzIH0sXG4gICAgICB7IG5hbWU6ICdSb290IEJlZXInLCBwcmljZTogNCB9LFxuICAgICAgeyBuYW1lOiAnSXJvbiBQb3J0JywgcHJpY2U6IDUgfVxuICAgIF1cbiAgfVxuXVxuXG5jb25zdCBkYXRhTWFwID0gZGF0YS5yZWR1Y2UoZnVuY3Rpb24gKG1hcCwgY2F0ZWdvcnkpIHtcbiAgY2F0ZWdvcnkuaXRlbXNNYXAgPSBjYXRlZ29yeS5pdGVtcy5yZWR1Y2UoZnVuY3Rpb24gKGl0ZW1zTWFwLCBpdGVtKSB7XG4gICAgaXRlbXNNYXBbaXRlbS5uYW1lXSA9IGl0ZW1cbiAgICByZXR1cm4gaXRlbXNNYXBcbiAgfSwge30pXG4gIG1hcFtjYXRlZ29yeS5uYW1lXSA9IGNhdGVnb3J5XG4gIHJldHVybiBtYXBcbn0sIHt9KVxuXG5leHBvcnRzLmdldEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGRhdGFcbn1cblxuZXhwb3J0cy5sb29rdXBDYXRlZ29yeSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBkYXRhTWFwW25hbWVdXG59XG5cbmV4cG9ydHMubG9va3VwSXRlbSA9IGZ1bmN0aW9uIChjYXRlZ29yeSwgaXRlbSkge1xuICByZXR1cm4gZGF0YU1hcFtjYXRlZ29yeV0uaXRlbXNNYXBbaXRlbV1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXItMS4wLjMvZXhhbXBsZXMvc2lkZWJhci9kYXRhLmpzXG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9hcHAuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2FwcC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9hcHAuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2lkZWJhci9hcHAuY3NzXG4gKiogbW9kdWxlIGlkID0gOTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMjVcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5TaWRlYmFyIHtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgYmFja2dyb3VuZDogI2VlZTtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBtYXJnaW46IDAgMjBweCAyMHB4IDIwcHg7XFxuICB3aWR0aDogMjAwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5Db250ZW50IHtcXG4gIHBhZGRpbmc6IDIwcHggMjBweCAyMHB4IDMwMHB4O1xcbn1cXG5cXG4uQ2F0ZWdvcnlOYXZfX1RvZ2dsZTpiZWZvcmUge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDFlbTtcXG4gIGNvbnRlbnQ6ICdcXFxcMjVCOCc7XFxufVxcblxcbi5DYXRlZ29yeU5hdl9fVG9nZ2xlLS1pcy1vcGVuOmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXDI1QkUnO1xcbn1cXG5cXG5hIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2Nzcy1sb2FkZXIhLi9zaWRlYmFyL2FwcC5jc3NcbiAqKiBtb2R1bGUgaWQgPSA5N1xuICoqIG1vZHVsZSBjaHVua3MgPSAyNVxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=