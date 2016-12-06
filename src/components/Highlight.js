/* @flow */
import React, { PureComponent, PropTypes } from 'react';
import hljs from 'highlight.js';
import cx from 'classnames';

type Props = {
  children: string,
  className?: string,
  languages?: Array<string>,
  worker?: Object,
};

type State = {
  highlightedCode: ?string,
  language: ?string,
};

export default class Highlight extends PureComponent {

  state: State = {
    highlightedCode: null,
    language: null,
  };

  props: Props;

  componentDidMount() {
    this._highlightCode();
  }

  componentDidUpdate() {
    this._highlightCode();
  }

  getInitialCode() {
    const type = typeof this.props.children;
    if (type !== 'string') {
      throw new Error(`Children of <Highlight> must be a string. '${type}' supplied`);
    }

    return this.props.children;
  }

  getHighlightCallback() {
    let callback;

    if (this.props.languages && this.props.languages.length === 1) {
      const language:string = this.props.languages[0];
      callback = (resolve: (x: *) => void) => // eslint-disable-line arrow-parens
        resolve(hljs.highlight(language, this.getInitialCode()));
    } else {
      callback = (resolve: (x: *) => void) => // eslint-disable-line arrow-parens
        resolve(hljs.highlightAuto(this.getInitialCode(), this.props.languages));
    }

    return callback;
  }

  _highlightCode() {
    const worker = this.props.worker;
    if (worker) {
      worker.onmessage = event => this.setState({
        highlightedCode: event.data.value,
        language: event.data.language,
      });
      worker.postMessage({ code: this.getInitialCode(), languages: this.props.languages });
    } else {
      const promise = new Promise(this.getHighlightCallback());

      promise.then(
        result => this.setState({ highlightedCode: result.value, language: result.language }),
      );
    }
  }

  render() {
    const code = this.state.highlightedCode;
    const classes = cx(this.props.className, 'hljs', this.state.language);

    if (code) {
      return (
        <pre>
          <code className={classes} dangerouslySetInnerHTML={{ __html: code }} />
        </pre>
      );
    }

    return <pre><code className={classes}>{this.getInitialCode()}</code></pre>;
  }
}

Highlight.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  languages: PropTypes.arrayOf(PropTypes.string),
  worker: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
