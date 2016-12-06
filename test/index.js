import React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';
import Highlight from '../src/index';

test('exports default component', (t) => {
  t.notThrows(() => shallow(<Highlight>test</Highlight>));
});
