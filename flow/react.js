/* @flow */

declare module 'react/lib/shallowCompare' {
  declare var exports:
    (instance: ReactComponent, nextProps: ?Object, nextState: ?Object) => boolean;
}
