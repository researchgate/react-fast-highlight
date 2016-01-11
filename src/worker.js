/* global postMessage, onmessage:true */
/* @flow */

import hjs from './highlight.js';

onmessage = event => {
  const { code, languages } = event.data;
  let result;
  if (languages && languages.length === 1) {
    const language = languages[0];
    result = hjs.highlight(language, code, true);
  } else {
    result = hjs.highlightAuto(code, languages);
  }

  postMessage(result);
};
