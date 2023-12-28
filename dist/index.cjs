'use strict';

var lezerParserNix = require('lezer-parser-nix');
var language = require('@codemirror/language');

const nixLanguage = language.LRLanguage.define({
  parser: lezerParserNix.parser.configure({
    props: [
      language.indentNodeProp.add({
        Parens: language.delimitedIndent({ closing: ")" }),
        AttrSet: language.delimitedIndent({ closing: "}" }),
        List: language.delimitedIndent({ closing: "]" }),
        Let: language.continuedIndent({ except: /^\s*in\b/ }),
      }),
      language.foldNodeProp.add({
        AttrSet: language.foldInside,
        List: language.foldInside,
        Let(node) {
          let first = node.getChild("let"),
            last = node.getChild("in");
          if (!first || !last) return null;
          return { from: first.to, to: last.from };
        },
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: "#", block: { open: "/*", close: "*/" } },
    closeBrackets: { brackets: ["(", "[", "{", "''", '"'] },
    indentOnInput: /^\s*(in|\}|\)|\])$/,
  },
});

function nix(options) {
  if (!options) options = {};
  if (!options.data) options.data = {};
  return new language.LanguageSupport(
    nixLanguage,
    nixLanguage.data.of(options.data),
  );
}

exports.nix = nix;
exports.nixLanguage = nixLanguage;
