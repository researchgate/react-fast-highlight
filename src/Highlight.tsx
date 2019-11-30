import * as React from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js';
import BareHighlight from './BareHighlight';

interface Props {
  children: string;
  className?: string;
  languages?: Array<string>;
  worker?: Worker;
}

const Highlight = (props: Props) => {
  const { children, ...rest } = props;

  return (
    <BareHighlight {...rest} highlightjs={hljs}>
      {children}
    </BareHighlight>
  );
};

Highlight.defaultProps = {
  className: '',
  languages: [],
  worker: null,
};

Highlight.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  languages: PropTypes.arrayOf(PropTypes.string),
  worker: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default Highlight;
