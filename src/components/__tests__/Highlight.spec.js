/* global describe, it */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Highlight from '../Highlight';
import { expect } from 'chai';
import hjs from 'highlight.js';
import sinon from 'sinon';
import jsdom from 'mocha-jsdom';

describe('Highlight', () => {
  jsdom();

  describe('no languages', () => {
    it('calls correct highlightCall', () => {
      const highlightAuto = sinon.spy(hjs, 'highlightAuto');
      mount(<Highlight>test</Highlight>);

      expect(highlightAuto).to.have.been.calledOnce();
      expect(highlightAuto).to.have.been.calledWith('test');

      highlightAuto.restore();
    });
  });

  describe('one language', () => {
    it('calls correct highlightCall', () => {
      const highlight = sinon.spy(hjs, 'highlight');
      mount(<Highlight languages={['js']}>test</Highlight>);

      expect(highlight).to.have.been.calledOnce();
      expect(highlight).to.have.been.calledWith('js', 'test');

      highlight.restore();
    });
  });

  describe('multiple languages', () => {
    it('calls correct highlightCall', () => {
      const highlightAuto = sinon.spy(hjs, 'highlightAuto');
      mount(<Highlight languages={['js', 'html']}>test</Highlight>);

      expect(highlightAuto).to.have.been.calledOnce();
      expect(highlightAuto).to.have.been.calledWith('test', ['js', 'html']);

      highlightAuto.restore();
    });
  });

  it('className is passed through', () => {
    const wrapper = shallow(<Highlight className="foobar">test</Highlight>);

    expect(wrapper.childAt(0).hasClass('foobar')).to.be.true();
  });
});
