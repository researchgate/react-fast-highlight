/* global beforeEach */
import jsdom from 'jsdom';
import chai from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

beforeEach(() => {
  global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
  global.self = global.window = document.defaultView;
});
