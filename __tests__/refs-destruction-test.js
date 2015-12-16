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
 jest.dontMock('../dist/react-lite');
var React;
var ReactDOM;
var ReactTestUtils;

var TestComponent;

describe('refs-destruction', function() {
  beforeEach(function() {
    React = require('../dist/react-lite');
    ReactDOM = require('../dist/react-lite');
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

    TestComponent = React.createClass({
      render: function() {
        return (
          <div>
            {this.props.destroy ? null :
              <div ref="theInnerDiv">
                Lets try to destroy this.
              </div>
            }
          </div>
        );
      },
    });
  });

  it('should remove refs when destroying the parent', function() {
    var container = document.createElement('div');
    var testInstance = ReactDOM.render(<TestComponent />, container);
    expect(testInstance.refs.theInnerDiv.tagName === 'DIV')
      .toBe(true);
    expect(testInstance.refs.theInnerDiv.getDOMNode().tagName === 'DIV')
      .toBe(true);
    expect(Object.keys(testInstance.refs || {}).length).toEqual(1);
    ReactDOM.unmountComponentAtNode(container);
    expect(Object.keys(testInstance.refs || {}).length).toEqual(0);
  });

  it('should remove refs when destroying the child', function() {
    var container = document.createElement('div');
    var testInstance = ReactDOM.render(<TestComponent />, container);
    expect(testInstance.refs.theInnerDiv.tagName === 'DIV')
      .toBe(true);
    expect(testInstance.refs.theInnerDiv.getDOMNode().tagName === 'DIV')
      .toBe(true);
    expect(Object.keys(testInstance.refs || {}).length).toEqual(1);
    ReactDOM.render(<TestComponent destroy={true} />, container);
    expect(Object.keys(testInstance.refs || {}).length).toEqual(0);
  });
});
