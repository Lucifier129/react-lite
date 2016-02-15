# react-lite

[![Travis](https://travis-ci.org/Lucifier129/react-lite.svg?branch=master)](https://travis-ci.org/Lucifier129/react-lite)
[![npm](https://img.shields.io/npm/v/react-lite.svg)](https://www.npmjs.com/package/react-lite)
[![Join the chat at https://gitter.im/Lucifier129/react-lite](https://badges.gitter.im/Lucifier129/react-lite.svg)](https://gitter.im/Lucifier129/react-lite?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Introduction
React under 20k.
react-lite is an implementation of React that optimizes for small script size.
### Framework Size Comparison

| Framework              | Version    | Minified Size |
|------------------------|------------|---------------|
| Ember                  | 2.2.0      | 446.0kb       |
| Polymer                | 1.0.6      | 183.0kb       |
| Angular                | 1.4.8      | 148.0kb       |
| React                  | 0.14.3     | 136.0kb       |
| Web Components Polyfill| 0.7.19     | 118.0kb       |
| Riot                   | 2.3.11     | 20kb          |
| React-lite             | 0.0.18     | 17.5kb        |

It supports the core APIs of React, such as Virtual DOM, intended as a drop-in
replacement for React, when you don't need server-side rendering in browser(no React.renderToString/React.renderToStaticMarkup).

If you are using webpack, it's so easy to use react-lite, just [config alias](http://webpack.github.io/docs/configuration.html#resolve-alias) in webpack.config.js:

```javascript
// webpack.config.js
{
    resolve: {
        alias: {
            'react': 'react-lite',
            'react-dom': 'react-lite'
        }
    }
}
```

Note: feel free to try react-lite, if something happen and we can't fixed in time, then use [regular react](https://github.com/facebook/react) instead.
## Installation

you can install react-lite from npm

```shell
npm install --save react-lite
```

## Browser compatibility

supports IE9+ ／ ES5 enviroment


## Documentation

learn react-lite from [React official documentation](http://facebook.github.io/react/)

## What can react-lite do?

just the same as what react does, see some demos below(I just add the alias to webpack.config.js, no need to do anything else):

- react-lite works with react-bootstrap: [doc demo](http://react-lite-with-bootstrap.herokuapp.com/)
- react-lite works with react-router: [examples](http://react-lite-with-react-router.coding.io/)
- react-lite works with redux:
	* [async](http://lucifier129.github.io/redux-with-react-lite/async/index.html)
	* [counter](http://lucifier129.github.io/redux-with-react-lite/counter/index.html)
	* [shopping-cart](http://lucifier129.github.io/redux-with-react-lite/shopping-cart/index.html)
	* [todomvc](http://lucifier129.github.io/redux-with-react-lite/todomvc/index.html)
	* [todos-with-undo](http://lucifier129.github.io/redux-with-react-lite/todos-with-undo/index.html)
- react-lite works with react-motion: [demos](http://lucifier129.github.io/react-motion-with-react-lite/index.html)
- js-repaint-perf(which is faster?):
	* [react](http://lucifier129.github.io/react-lite-repaint-perf/react/index.html)
	* [react-lite](http://lucifier129.github.io/react-lite-repaint-perf/react/lite.html)

## React-lite vs React

via react-lite:
- virtual-dom can not render to string(no React.renderToString and React.renderToStaticMarkup)
- event system is base on delegation pattern(since v0.0.19)
- all of React.PropTypes method is noop(empty function)
- Do not support React-addons(for example ReactCSSTransitionGroup)
- use React in server side rendering, and use React-lite in browser
	* react-lite will replace the dom tree with new dom tree
	* you had better avoid `script|head|link` tag in client side
- the rule about setting props
	* if `propName in dom` is `true` then `dom[propName]=propValue`
	* else: `dom.setAttribute(propName, propValue)`
- can not use react-dev-tool inspect react-lite, should switch to regular react for debugging

## Test
react-lite reuses react's unitest(168), you can see them in `__test__`, and run the tests with:

```shell
npm test
```

License: MIT (See LICENSE file for details)
