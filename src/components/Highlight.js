/* @flow */

import React, { Component } from 'react';
import shallowCompare from 'react/lib/shallowCompare';
import hljs from '../highlight.js';
import cx from 'classnames';

type Props = {
  children: string,
  className?: string,
  languages?: Array<string>,
  worker?: Object
};

type State = {
  highlightedCode: ?string,
  language: ?string,
};

export default class Highlight extends Component<void, Props, State> {

  state: State = {
    highlightedCode: null,
    language: null,
  };

  componentDidMount() {
    this._highlightCode();
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate() {
    this._highlightCode();
  }

  // $FlowIssue - get/set properties not yet supported
  get initialCode(): string {
    return this.props.children;
  }

  // $FlowIssue - get/set properties not yet supported
  get highlightCallback(): () => HighlightResult {
    let callback;

    if (this.props.languages && this.props.languages.length === 1) {
      const language:string = this.props.languages[0];
      callback = (resolve: Function) =>
        resolve(hljs.highlight(language, this.initialCode));
    } else {
      callback = (resolve: Function) =>
        resolve(hljs.highlightAuto(this.initialCode, this.props.languages));
    }

    return callback;
  }

  _highlightCode(): void {
    const worker = this.props.worker;
    if (worker) {
      worker.onmessage = event => this.setState({
        highlightedCode: event.data.value,
        language: event.data.language,
      });
      worker.postMessage({ code: this.initialCode, languages: this.props.languages });
    } else {
      const promise = new Promise(this.highlightCallback);

      promise
        .then(result => this.setState({ highlightedCode: result.value, language: result.language }))
        .catch(error => console.error(error));
    }
  }

  render(): ?ReactElement {
    const code: ?string = this.state.highlightedCode;
    const classes = cx(this.props.className, 'hljs', this.state.language);

    let result: ReactElement;
    if (code) {
      result = (
        <pre>
          <code className={classes} dangerouslySetInnerHTML={{ __html: code }} />
        </pre>
      );
    } else {
      result = <pre><code className={classes}>{this.initialCode}</code></pre>;
    }

    return result;
  }
}
