# esnext-react
React under 30k.
esnext-react is an implementation of React that optimizes for small script size.

It supports the core APIs of React, such as Virtual DOM, intended as a drop-in
replacement for React, when you don't need server-side rendering. If you want to
support IE9-, use the "jquery-react.js" version in dist directory.

React API now are supporting:
- React.createElement
- React.createClass
- React.render
- React.unmountComponentAtNode
- React.Component
- React.findDOMNode (the same as React V0.14)
- React.Children (just for ignore error)
- React.PropTypes (just for ignore error)

License: MIT (See LICENSE file for details)