/* global describe, it */
import React from 'react';
import { shallow } from 'enzyme';
import Highlight from '../index';
import { expect } from 'chai';

describe('index.js', () => {
  it('exports default component', () => {
    expect(() => shallow(<Highlight>test</Highlight>)).to.not.throw(Error);
  });
});
