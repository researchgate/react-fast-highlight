/* @flow */

import React, { Component } from 'react';
import shallowCompare from 'react/lib/shallowCompare';
import hjs from 'highlight.js';

type Props = {
  children: string,
  className?: string,
  languages?: Array<string>,
};

type State = {
  highlightedCode: ?string,
};

export default class Highlight extends Component<void, Props, State> {

  state: State = {
    highlightedCode: null,
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
      callback = () => hjs.highlight(language, this.initialCode, true);
    } else {
      callback = () => hjs.highlightAuto(this.initialCode, this.props.languages);
    }

    return callback;
  }

  _highlightCode(): void {
    const promise = new Promise(this.highlightCallback);

    promise
      .then(result => this.setState({ highlightedCode: result.value }))
      .catch(error => console.log(error));
  }

  render(): ?ReactElement {
    const code: string = this.state.highlightedCode || this.initialCode;

    return (
      <pre>
        <code className={this.props.className} dangerouslySetInnerHTML={{ __html: code }} />
      </pre>
    );
  }
}
