/* eslint-env jest */
import React from 'react';
import Highlight from '../index';

test('exports default component', () => {
  expect(<Highlight>test</Highlight>).toMatchReactSnapshot();
});
