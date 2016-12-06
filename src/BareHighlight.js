/* @flow */
import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

type Props = {
  children: string,
  className?: string,
  highlightjs: Object,
  languages?: Array<string>,
  worker?: Object,
};

type State = {
  highlightedCode: ?string,
  language: ?string,
};

export default class BareHighlight extends PureComponent {

  state: State = {
    highlightedCode: null,
    language: null,
  };

  props: Props;

  componentDidMount() {
    this._highlightCode();
  }

  componentWillReceiveProps(nextProps: Props) {
    // If the text changed make sure to reset the state
    // This way we ensure that the new text is immediately displayed.
    if (nextProps.children !== this.props.children) {
      this.setState({ highlightedCode: null, language: null });
    }
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

  getHighlightPromise() {
    const { highlightjs, languages } = this.props;

    return new Promise((resolve: (x: *) => void) => {
      if (languages && languages.length === 1) {
        resolve(highlightjs.highlight(languages[0], this.getInitialCode()));
      } else {
        resolve(highlightjs.highlightAuto(this.getInitialCode(), languages));
      }
    });
  }

  _highlightCode() {
    const { languages, worker } = this.props;

    if (worker) {
      worker.onmessage = event => this.setState({
        highlightedCode: event.data.value,
        language: event.data.language,
      });
      worker.postMessage({ code: this.getInitialCode(), languages });
    } else {
      this.getHighlightPromise()
        .then(
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

BareHighlight.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  highlightjs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  languages: PropTypes.arrayOf(PropTypes.string),
  worker: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
