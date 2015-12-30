# react-lite

## Introduction
React under 20k.
react-lite is an implementation of React that optimizes for small script size.

It supports the core APIs of React, such as Virtual DOM, intended as a drop-in
replacement for React, when you don't need server-side rendering in browser.

If you are using webpack, it's so easy to use react-lite, just config alias in webpack.config.js:

```javascript
// webpack.config.js
{
	alias: {
		react: 'react-lite'
	}
}
```

## test and install
react-lite reuse react's unitest(155), you can see them in `__test__`, an run the test with:

```shell
npm test
```

you can install react-lite from npm

```shell
npm install --save react-lite
```

License: MIT (See LICENSE file for details)