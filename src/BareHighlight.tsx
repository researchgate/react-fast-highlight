import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import type hljs from 'highlight.js';

interface Props {
  children: string;
  className?: string;
  highlightjs: typeof hljs;
  languages?: Array<string>;
  worker?: Worker;
}

interface State {
  highlightedCode?: string;
  language?: string;
}

export default class BareHighlight extends React.PureComponent<Props, State> {
  static defaultProps = {
    className: '',
    languages: [],
    worker: null,
  };

  static propTypes = {
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
    highlightjs: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    languages: PropTypes.arrayOf(PropTypes.string),
    worker: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  state: State = {};

  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate(prevProps: Props) {
    // If the text changed make sure to reset the state
    // This way we ensure that the new text is immediately displayed.
    if (prevProps.children !== this.props.children) {
      this.setState({ highlightedCode: undefined, language: undefined });
      return;
    }

    // Do not call highlight.js if we already have highlighted code
    // If the children changed highlightedCode will be null
    if (this.state.highlightedCode) return;

    this.highlightCode();
  }

  getInitialCode() {
    const type = typeof this.props.children;
    if (type !== 'string') {
      throw new Error(
        `Children of <Highlight> must be a string. '${type}' supplied`
      );
    }

    return this.props.children;
  }

  getHighlightPromise(): Promise<ReturnType<typeof hljs.highlight>> {
    const { highlightjs, languages } = this.props;
    return new Promise((resolve) => {
      if (languages && languages.length === 1) {
        resolve(highlightjs.highlight(this.getInitialCode(), {
          language: languages[0],
        }));
      } else {
        resolve(highlightjs.highlightAuto(this.getInitialCode(), languages));
      }
    });
  }

  highlightCode() {
    const { languages, worker } = this.props;

    if (worker) {
      worker.onmessage = (event) =>
        this.setState({
          highlightedCode: event.data.value,
          language: event.data.language,
        });
      worker.postMessage({ code: this.getInitialCode(), languages });
    } else {
      this.getHighlightPromise().then((result) =>
        this.setState({
          highlightedCode: result.value,
          language: result.language,
        })
      );
    }
  }

  render() {
    const code = this.state.highlightedCode;
    const classes = cx(this.props.className, 'hljs', this.state.language);

    if (code) {
      return (
        <pre>
          <code
            className={classes}
            dangerouslySetInnerHTML={{ __html: code }}
          />
        </pre>
      );
    }

    return (
      <pre>
        <code className={classes}>{this.getInitialCode()}</code>
      </pre>
    );
  }
}
