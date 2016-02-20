/* @flow */
//import type { Component } from 'react';
// This does currently not work

declare module 'react-addons-shallow-compare' {
  declare var exports:
    (instance: Object, nextProps: ?Object, nextState: ?Object) => boolean;
}
