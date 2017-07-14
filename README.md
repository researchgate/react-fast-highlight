# react-fast-highlight
###### A fast react component wrapper for highlight.js

[![Build Status](https://travis-ci.org/chili-labs/react-fast-highlight.svg?branch=master)](https://travis-ci.org/chili-labs/react-fast-highlight)
[![codecov](https://codecov.io/gh/chili-labs/react-fast-highlight/branch/master/graph/badge.svg)](https://codecov.io/gh/chili-labs/react-fast-highlight)

## Requirements
  
  Version 1.x works with React 0.14 and <=15.2
  
  Version >=2.0 works with React >=15.3
  
## Install

`npm install --save react-fast-highlight`

or

`yarn add react-fast-highlight`

## Usage

```js
import React, { Component } from 'react';
import Highlight from 'react-fast-highlight';

class App extends Component {

  render() {
    const code = 'let t = 0.5 * 5 * 4;';

    return (
      {/*
            `languages` is an optional property to set the languages that highlight.js should pick from.
            By default it is empty, which means highlight.js will pick from all available languages.
            If only one language is provided, this language will be used without doing checks beforehand.
            (Be aware that automatic language detection is not as fast as when specifing a language.)

            `worker` is used to take advantage of the possibility to do the highlighting work in a
            web-worker. As different module-bundlers use different ways to load web-workers, it is up
            to you to load the webworker and supply it to the highlight component. (see example)
            Currently every instance of the highlight component needs its own web-worker.

            `className` sets additional class names on the generated html markup.
       */}
      <Highlight
        languages={['js']}
        className="my-class"
      >
        {code}
      </Highlight>
    );
}
```

### Advanced Usage

#### Custom highlight.js distribution

In cases where you bundle this component with a module bundler such as webpack, rollup or browserify and you know upfront 
which languages you want to support you can supply a custom distribution of `highlight.js`. This ensures 
you are not bundling all available languages of `highlight.js` which reduces the size of your bundle.

A custom distribution might look like this

```js
import hljs from 'highlight.js/lib/highlight';

// Lets only register javascript, scss, html/xml
hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

export default hljs;
```

To actually use a custom distribution you need to use the `BareHighlight` component. With it
you can build your wrapper for highlighting code.

```js
import React, { Component } from 'react';
import BareHighlight from 'react-fast-highlight/lib/BareHighlight';
import hljs from './customhljs';

class CustomHighlight extends Component {
  render() {
    const { children, ...props } = this.props;
    return (
      <BareHighlight {...props} highlightjs={hljs}>
        {children}
      </BareHighlight>
    );
}
```

Now you can use this wrapper the same way as the default `Highlight` component with only support for
certain languages included.

> In case you also want to use a webworker you should not use the supplied worker, as it includes all
> languages. Instead you will need to copy the worker from this repo and adjust the `highlight.js` import.

#### Webworker

It wasn't tested with browserify and rollup but it should work.
If you managed to get it working please open a PR with the necessary
changes and the documentation.

##### Webpack

To make web-workers working with webpack you additionally need to install `worker-loader`.

`npm install --save worker-loader react-fast-highlight`

```js
import React from 'react';
import { Highlight } from 'react-fast-highlight';
import Worker from 'worker!react-fast-highlight/lib/worker';

class App extends React.Component {

  render() {
    const code = 'let t = 0.5 * 5 * 4;';

    return (
      <Highlight
        languages={['js']}
        worker={new Worker}
      >
        {code}
      </Highlight>
    );
}
```

## License

react-fast-highlight is licensed under the MIT license.
