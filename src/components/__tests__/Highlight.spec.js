/* global describe, it */
/* eslint-disable no-unused-expressions */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Highlight from '../Highlight';
import { expect } from 'chai';
import hjs from 'highlight.js';
import sinon from 'sinon';

describe('Button', () => {
  it('has correct label', () => {
    const highlightAuto = sinon.spy(hjs, 'highlightAuto');
    TestUtils.renderIntoDocument(
      <Highlight>test</Highlight>
    );

    expect(highlightAuto).to.have.been.calledOnce;
    expect(highlightAuto).to.have.been.calledWith('test');

    highlightAuto.restore();
  });
});
