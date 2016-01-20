# react-fast-highlight
###### A fast react component wrapper for highlight.js

[![Build Status](https://travis-ci.org/chili-labs/react-fast-highlight.svg?branch=master)](https://travis-ci.org/chili-labs/react-fast-highlight)

## Usage

`npm install --save react-fast-highlight`

```js
import React from 'react';
import Highlight from 'react-fast-highlight';

class App extends React.Component {

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

### Webworker

#### Webpack

To make web-workers working with webpack you additionally need to install `worker-loader`.

`npm install --save worker-loader react-fast-highlight`

```js
import React from 'react';
import Highlight from 'react-fast-highlight';
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
