/* eslint-env jest */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import highlightjs from 'highlight.js';
import BareHighlight from '../BareHighlight';

Enzyme.configure({ adapter: new Adapter() });

test('no language - calls correct highlightCall', done => {
  const hljs = {
    highlightAuto: jest.fn(() => ({ value: 'othertest', language: 'xml' })),
  };

  const wrapper = mount(<BareHighlight highlightjs={hljs}>test</BareHighlight>);

  setTimeout(() => {
    expect(wrapper.state('language')).toBe('xml');
    expect(wrapper.state('highlightedCode')).toBe('othertest');
    expect(hljs.highlightAuto).toHaveBeenCalledWith('test', []);
    expect(hljs.highlightAuto).toHaveBeenCalledTimes(1);

    done();
  }, 1);
});

test('can correctly rerender code', done => {
  let value = 'initalresult';
  const hljs = {
    highlightAuto: jest.fn(() => ({ value, language: 'xml' })),
  };

  const wrapper = mount(<BareHighlight highlightjs={hljs}>test</BareHighlight>);

  setTimeout(() => {
    value = 'changed';
    wrapper.setProps({ children: 'newtest' });
    setTimeout(() => {
      expect(wrapper.state('language')).toBe('xml');
      expect(wrapper.state('highlightedCode')).toBe('changed');
      expect(hljs.highlightAuto).toHaveBeenCalledWith('newtest', []);
      expect(hljs.highlightAuto).toHaveBeenCalledTimes(2);

      done();
    }, 1);
  }, 1);
});

test('one language - calls correct highlightCall', done => {
  const hljs = {
    highlight: jest.fn(() => ({ value: 'othertest', language: 'js' })),
  };

  const wrapper = mount(
    <BareHighlight highlightjs={hljs} languages={['js']}>
      test
    </BareHighlight>,
  );

  setTimeout(() => {
    expect(wrapper.state('language')).toBe('js');
    expect(wrapper.state('highlightedCode')).toBe('othertest');
    expect(hljs.highlight).toHaveBeenCalledWith('js', 'test');
    expect(hljs.highlight).toHaveBeenCalledTimes(1);

    done();
  }, 1);
});

test('multiple languages - calls correct highlightCall', done => {
  const hljs = {
    highlightAuto: jest.fn(() => ({ value: 'othertest', language: 'js' })),
  };

  const wrapper = mount(
    <BareHighlight highlightjs={hljs} languages={['js', 'html']}>
      test
    </BareHighlight>,
  );

  setTimeout(() => {
    expect(wrapper.state('language')).toBe('js');
    expect(wrapper.state('highlightedCode')).toBe('othertest');
    expect(hljs.highlightAuto).toHaveBeenCalledWith('test', ['js', 'html']);
    expect(hljs.highlightAuto).toHaveBeenCalledTimes(1);

    done();
  }, 1);
});

test('className is passed through', () => {
  expect(
    <BareHighlight highlightjs={highlightjs} className="foobar">
      test
    </BareHighlight>,
  ).toMatchReactSnapshot();
});
