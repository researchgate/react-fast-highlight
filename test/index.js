import React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';
import { BareHighlight, Highlight } from '../src/index';

test('exports Highlight component', (t) => {
  t.notThrows(() => shallow(<Highlight>test</Highlight>));
});

test('exports BareHighlight component', (t) => {
  t.notThrows(() => shallow(<Highlight>test</Highlight>));
});
