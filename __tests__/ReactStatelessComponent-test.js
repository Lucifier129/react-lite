/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails react-core
 */

'use strict';
 jest.dontMock('../src');
var React;
var ReactDOM;
var ReactTestUtils;

function StatelessComponent(props) {
  return <div>{props.name}</div>;
}

describe('ReactStatelessComponent', function() {

  beforeEach(function() {
    React = require('../src');
    ReactDOM = require('../src');
    ReactTestUtils = {
      renderIntoDocument: function(instance) {
        var div = document.createElement('div');
        // None of our tests actually require attaching the container to the
        // DOM, and doing so creates a mess that we rely on test isolation to
        // clean up, so we're going to stop honoring the name of this method
        // (and probably rename it eventually) if no problems arise.
        // document.documentElement.appendChild(div);
        return ReactDOM.render(instance, div);
      }
    };
  });

  it('should render stateless component', function() {
    var el = document.createElement('div');
    ReactDOM.render(<StatelessComponent name="A" />, el);

    expect(el.textContent).toBe('A');
  });

  it('should update stateless component', function() {
    var Parent = React.createClass({
      render() {
        return <StatelessComponent {...this.props} />;
      },
    });

    var el = document.createElement('div');
    ReactDOM.render(<Parent name="A" />, el);
    expect(el.textContent).toBe('A');

    ReactDOM.render(<Parent name="B" />, el);
    expect(el.textContent).toBe('B');
  });

  it('should unmount stateless component', function() {
    var container = document.createElement('div');

    ReactDOM.render(<StatelessComponent name="A" />, container);
    expect(container.textContent).toBe('A');

    ReactDOM.unmountComponentAtNode(container);
    expect(container.textContent).toBe('');
  });

  // it('should pass context thru stateless component', function() {
  //   var Child = React.createClass({
  //     contextTypes: {
  //       test: React.PropTypes.string.isRequired,
  //     },

  //     render: function() {
  //       return <div>{this.context.test}</div>;
  //     },
  //   });

  //   function Parent() {
  //     return <Child />;
  //   }

  //   var GrandParent = React.createClass({
  //     childContextTypes: {
  //       test: React.PropTypes.string.isRequired,
  //     },

  //     getChildContext() {
  //       return {test: this.props.test};
  //     },

  //     render: function() {
  //       return <Parent />;
  //     },
  //   });

  //   var el = document.createElement('div');
  //   ReactDOM.render(<GrandParent test="test" />, el);

  //   expect(el.textContent).toBe('test');

  //   ReactDOM.render(<GrandParent test="mest" />, el);

  //   expect(el.textContent).toBe('mest');
  // });

  it('should support module pattern components', function() {
    function Child({test}) {
      return {
        render() {
          return <div>{test}</div>;
        },
      };
    }

    var el = document.createElement('div');
    ReactDOM.render(<Child test="test" />, el);

    expect(el.textContent).toBe('test');
  });

  // it('should throw on string refs in pure functions', function() {
  //   function Child() {
  //     return <div ref="me" />;
  //   }

  //   expect(function() {
  //     ReactTestUtils.renderIntoDocument(<Child test="test" />);
  //   }).toThrow(
  //     'Invariant Violation: Stateless function components cannot have refs.'
  //   );
  // });

  // it('should warn when given a ref', function() {
  //   spyOn(console, 'error');

  //   var Parent = React.createClass({
  //     displayName: 'Parent',
  //     render: function() {
  //       return <StatelessComponent name="A" ref="stateless"/>;
  //     },
  //   });
  //   ReactTestUtils.renderIntoDocument(<Parent/>);

  //   expect(console.error.argsForCall.length).toBe(1);
  //   expect(console.error.argsForCall[0][0]).toContain(
  //     'Stateless function components cannot be given refs ' +
  //     '(See ref "stateless" in StatelessComponent created by Parent). ' +
  //     'Attempts to access this ref will fail.'
  //   );
  // });

  it('should provide a null ref', function() {
    function Child() {
      return <div />;
    }

    var comp = ReactTestUtils.renderIntoDocument(<Child />);
    expect(comp).toBe(null);
  });

  // it('should use correct name in key warning', function() {
  //   function Child() {
  //     return <div>{[<span />]}</div>;
  //   }

  //   spyOn(console, 'error');
  //   ReactTestUtils.renderIntoDocument(<Child />);
  //   expect(console.error.argsForCall.length).toBe(1);
  //   expect(console.error.argsForCall[0][0]).toContain('a unique "key" prop');
  //   expect(console.error.argsForCall[0][0]).toContain('Child');
  // });

  it('should support default props', function() {
    function Child(props) {
      expect(props.test).toBe(2)
      return <div>{props.test}</div>;
    }
    Child.defaultProps = {test: 2};
    ReactTestUtils.renderIntoDocument(<Child />);
  });

  // it('should receive context', function() {
  //   var Parent = React.createClass({
  //     childContextTypes: {
  //       lang: React.PropTypes.string,
  //     },
  //     getChildContext: function() {
  //       return {lang: 'en'};
  //     },
  //     render: function() {
  //       return <Child />;
  //     },
  //   });
  //   function Child(props, context) {
  //     return <div>{context.lang}</div>;
  //   }
  //   Child.contextTypes = {lang: React.PropTypes.string};

  //   var el = document.createElement('div');
  //   ReactDOM.render(<Parent />, el);
  //   expect(el.textContent).toBe('en');
  // });

  it('should work with arrow functions', function() {
    // TODO: actually use arrow functions, probably need node v4 and maybe
    // a separate file that we blacklist from the arrow function transform.
    // We can't actually test this without native arrow functions since the
    // issues (non-newable) don't apply to any other functions.
    var Child = function() {
      return <div />;
    };
    // Will create a new bound function without a prototype, much like a native
    // arrow function.
    Child = Child.bind(this);

    expect(() => ReactTestUtils.renderIntoDocument(<Child />)).not.toThrow();
  });
});
