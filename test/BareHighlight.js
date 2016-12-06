import React from 'react';
import td from 'testdouble';
import test from 'ava';
import { mount, shallow } from 'enzyme';
import BareHighlight from '../src/BareHighlight';

test.cb('no language - calls correct highlightCall', (t) => {
  const hjs = td.replace('highlight.js');
  td
    .when(hjs.highlightAuto('test', undefined))
    .thenReturn({ value: 'othertest', language: 'xml' });
  const wrapper = mount(<BareHighlight highlightjs={hjs}>test</BareHighlight>);

  setTimeout(() => {
    t.is(wrapper.state('language'), 'xml');
    t.is(wrapper.state('highlightedCode'), 'othertest');
    t.end();
  }, 1);
});

test.cb('one language - calls correct highlightCall', (t) => {
  const hjs = td.replace('highlight.js');
  td
    .when(hjs.highlight('js', 'test'))
    .thenReturn({ value: 'othertest', language: 'js' });
  const wrapper = mount(<BareHighlight highlightjs={hjs} languages={['js']}>test</BareHighlight>);

  setTimeout(() => {
    t.is(wrapper.state('language'), 'js');
    t.is(wrapper.state('highlightedCode'), 'othertest');
    t.end();
  }, 1);
});

test.cb('multiple languages - calls correct highlightCall', (t) => {
  const hjs = td.replace('highlight.js');
  td
    .when(hjs.highlightAuto('test', ['js', 'html']))
    .thenReturn({ value: 'othertest', language: 'js' });
  const wrapper = mount(<BareHighlight highlightjs={hjs} languages={['js', 'html']}>test</BareHighlight>);

  setTimeout(() => {
    t.is(wrapper.state('language'), 'js');
    t.is(wrapper.state('highlightedCode'), 'othertest');
    t.end();
  }, 1);
});

test('className is passed through', (t) => {
  const hjs = require('highlight.js');
  const wrapper = shallow(<BareHighlight highlightjs={hjs} className="foobar">test</BareHighlight>);

  t.true(wrapper.childAt(0).hasClass('foobar'));
});
