/* @flow */

type HighlightResult = {
  language: string,
  relevance: number,
  value: string,
  top?: any,
  second_best?: HighlightResult
};

declare module 'highlight.js' {
  declare var exports: {
    highlight: (
      name: string,
      value: string,
      ignore_illegals?: boolean,
      continuation?: Object
    ) => HighlightResult,
    highlightAuto: (
      value: string,
      languageSubset?: Array<string>
    ) => HighlightResult
  };
}
