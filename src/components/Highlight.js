/* @flow */
import React, { PropTypes } from 'react';
import hljs from 'highlight.js';
import BareHighlight from './BareHighlight';

type Props = {
  children: string,
  className?: string,
  languages?: Array<string>,
  worker?: Object,
};

const Highlight = (props: Props) => {
  const { children, ...rest } = props;

  // $FlowIssue does not support children
  return <BareHighlight {...rest} highlightjs={hljs}>{children}</BareHighlight>;
};

Highlight.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  languages: PropTypes.arrayOf(PropTypes.string),
  worker: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default Highlight;
