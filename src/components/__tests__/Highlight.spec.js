/* global describe, it */
/* eslint-disable no-unused-expressions */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Highlight from '../Highlight';
import { expect } from 'chai';
import hjs from 'highlight.js';
import sinon from 'sinon';

describe('Highlight', () => {
  describe('no languages', () => {
    it('calls correct highlightCall', () => {
      const highlightAuto = sinon.spy(hjs, 'highlightAuto');
      TestUtils.renderIntoDocument(
        <Highlight>test</Highlight>
      );

      expect(highlightAuto).to.have.been.calledOnce;
      expect(highlightAuto).to.have.been.calledWith('test');

      highlightAuto.restore();
    });
  });

  describe('one language', () => {
    it('calls correct highlightCall', () => {
      const highlight = sinon.spy(hjs, 'highlight');
      TestUtils.renderIntoDocument(
        <Highlight languages={['js']}>test</Highlight>
      );

      expect(highlight).to.have.been.calledOnce;
      expect(highlight).to.have.been.calledWith('js', 'test');

      highlight.restore();
    });
  });

  describe('multiple languages', () => {
    it('calls correct highlightCall', () => {
      const highlightAuto = sinon.spy(hjs, 'highlightAuto');
      TestUtils.renderIntoDocument(
        <Highlight languages={['js', 'html']}>test</Highlight>
      );

      expect(highlightAuto).to.have.been.calledOnce;
      expect(highlightAuto).to.have.been.calledWith('test', ['js', 'html']);

      highlightAuto.restore();
    });
  });

  it('className is passed through', () => {
    const component = TestUtils.renderIntoDocument(
      <Highlight className="foobla">test</Highlight>
    );
    const domElement = ReactDOM.findDOMNode(component);

    expect(domElement.children[0].classList.contains('foobla')).to.equal.true;
  });
});
