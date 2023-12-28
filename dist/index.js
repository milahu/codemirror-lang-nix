import { parser } from 'lezer-parser-nix';
import { LRLanguage, indentNodeProp, delimitedIndent, continuedIndent, foldNodeProp, foldInside, LanguageSupport } from '@codemirror/language';

const nixLanguage = /*@__PURE__*/LRLanguage.define({
  parser: /*@__PURE__*/parser.configure({
    props: [
      /*@__PURE__*/indentNodeProp.add({
        Parens: /*@__PURE__*/delimitedIndent({ closing: ")" }),
        AttrSet: /*@__PURE__*/delimitedIndent({ closing: "}" }),
        List: /*@__PURE__*/delimitedIndent({ closing: "]" }),
        Let: /*@__PURE__*/continuedIndent({ except: /^\s*in\b/ }),
      }),
      /*@__PURE__*/foldNodeProp.add({
        AttrSet: foldInside,
        List: foldInside,
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
  return new LanguageSupport(
    nixLanguage,
    nixLanguage.data.of(options.data),
  );
}

export { nix, nixLanguage };
