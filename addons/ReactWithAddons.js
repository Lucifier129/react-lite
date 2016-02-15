/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactWithAddons
 */

/**
 * This module exists purely in the open source project, and is meant as a way
 * to create a separate standalone build of React. This build has "addons", or
 * functionality we've built and think might be useful but doesn't have a good
 * place to live inside React core.
 */
import React from '../src/index'
import LinkedStateMixin from './LinkedStateMixin'
import ReactComponentWithPureRenderMixin from './ReactComponentWithPureRenderMixin'
import ReactCSSTransitionGroup from './ReactCSSTransitionGroup'
import ReactFragment from './ReactFragment'
import ReactTransitionGroup from './ReactTransitionGroup'
import ReactUpdates from '../src/Component'
import shallowCompare from './shallowCompare'
import update from './update'

let warning = function() {}

var cloneWithProps = React.cloneElement

var warnedAboutBatchedUpdates = false;

React.addons = {
  CSSTransitionGroup: ReactCSSTransitionGroup,
  LinkedStateMixin: LinkedStateMixin,
  PureRenderMixin: ReactComponentWithPureRenderMixin,
  TransitionGroup: ReactTransitionGroup,
  batchedUpdates: function() {
    return ReactUpdates.batchedUpdates.apply(this, arguments);
  },
  cloneWithProps: cloneWithProps,
  createFragment: ReactFragment.create,
  shallowCompare: shallowCompare,
  update: update,
};

export default React;
