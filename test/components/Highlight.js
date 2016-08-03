import React from 'react';
import td from 'testdouble';
import test from 'ava';
import { mount, shallow } from 'enzyme';

const hjs = td.replace('highlight.js');
const Highlight = require('../../src/components/Highlight').default;

test.cb('no language - calls correct highlightCall', t => {
  td
    .when(hjs.highlightAuto('test', undefined))
    .thenReturn({ value: 'othertest', language: 'xml' });
  const wrapper = mount(<Highlight>test</Highlight>);

  setTimeout(() => {
    t.is(wrapper.state('language'), 'xml');
    t.is(wrapper.state('highlightedCode'), 'othertest');
    t.end();
  }, 1);
});

test.cb('one language - calls correct highlightCall', t => {
  td
    .when(hjs.highlight('js', 'test'))
    .thenReturn({ value: 'othertest', language: 'js' });
  const wrapper = mount(<Highlight languages={['js']}>test</Highlight>);

  setTimeout(() => {
    t.is(wrapper.state('language'), 'js');
    t.is(wrapper.state('highlightedCode'), 'othertest');
    t.end();
  }, 1);
});

test.cb('multiple languages - calls correct highlightCall', t => {
  td
    .when(hjs.highlightAuto('test', ['js', 'html']))
    .thenReturn({ value: 'othertest', language: 'js' });
  const wrapper = mount(<Highlight languages={['js', 'html']}>test</Highlight>);

  setTimeout(() => {
    t.is(wrapper.state('language'), 'js');
    t.is(wrapper.state('highlightedCode'), 'othertest');
    t.end();
  }, 1);
});

test('className is passed through', t => {
  const wrapper = shallow(<Highlight className="foobar">test</Highlight>);

  t.true(wrapper.childAt(0).hasClass('foobar'));
});
