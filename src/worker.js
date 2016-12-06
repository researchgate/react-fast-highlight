/* eslint-env worker */
/* @flow */

declare function postMessage(result: Object): void;

onmessage = (event) => {
  const { code, languages, highlightjs } = event.data;
  let result;
  if (languages && languages.length === 1) {
    result = highlightjs.highlight(languages[0], code, true);
  } else {
    result = highlightjs.highlightAuto(code, languages);
  }

  postMessage(result);
};
