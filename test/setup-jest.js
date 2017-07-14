/* eslint-env jest */
/* global jasmine */
import { toMatchSnapshot } from 'jest-snapshot';
import renderer from 'react-test-renderer';

expect.extend({
  toMatchReactSnapshot(received, testName) {
    const tree = renderer.create(received).toJSON();

    return toMatchSnapshot.call(this, tree, testName);
  },
});

// eslint-disable-next-line no-console
const consoleError = console.error;

function logToError(error) {
  throw new Error(error);
}

jasmine.getEnv().beforeEach(() => {
  // eslint-disable-next-line no-console
  console.error = logToError;
});

jasmine.getEnv().afterEach(() => {
  // eslint-disable-next-line no-console
  console.error = consoleError;
});
