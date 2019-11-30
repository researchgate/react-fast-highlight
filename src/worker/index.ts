/* eslint-env worker */
import hjs from 'highlight.js';

onmessage = (event) => {
  const { code, languages } = event.data;
  let result;
  if (languages && languages.length === 1) {
    result = hjs.highlight(languages[0], code, true);
  } else {
    result = hjs.highlightAuto(code, languages);
  }

  postMessage(result);
};
