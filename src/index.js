import { parser as nixParser } from "./lezer-parser-nix/src/nix.grammar";

import {
  LRLanguage,
  LanguageSupport,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  delimitedIndent,
  continuedIndent,
} from "@codemirror/language";

import { styleTags, tags as t } from "@lezer/highlight";

import {
  completeFromList,
  ifNotIn,
  snippetCompletion as snip,
} from "@codemirror/autocomplete";

export const parser = nixParser;

export const nixLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Parens: delimitedIndent({ closing: ")" }),
        AttrSet: delimitedIndent({ closing: "}" }),
        List: delimitedIndent({ closing: "]" }),
        Let: continuedIndent({ except: /^\s*in\b/ }),
      }),
      foldNodeProp.add({
        AttrSet: foldInside,
        List: foldInside,
        Let(node) {
          let first = node.getChild("let"),
            last = node.getChild("in");
          if (!first || !last) return null;
          return { from: first.to, to: last.from };
        },
      }),
      styleTags({
        Identifier: t.propertyName,
        TRUE: t.bool,
        FALSE: t.bool,
        String: t.string,
        IndentedString: t.string,
        Comment: t.lineComment,
        CommentBlock: t.blockComment,
        Float: t.float,
        Integer: t.integer,
        NULL: t.null,
        URI: t.url,
        //SPath: t.literal, // TODO what is stringpath?
        Path: t.literal,
        "( )": t.paren,
        "{ }": t.brace,
        "[ ]": t.squareBracket,
        "if then else": t.controlKeyword,
        "import with let in rec builtins inherit assert or": t.keyword,
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: "#", block: { open: "/*", close: "*/" } },
    closeBrackets: { brackets: ["(", "[", "{", "''", '"'] },
    indentOnInput: /^\s*(in|\}|\)|\])$/,
  },
});

const snippets = [
  snip("let ${binds} in ${expression}", {
    label: "let",
    detail: "Let ... in statement",
    type: "keyword",
  }),
  snip("with ${expression}; ${expression}", {
    label: "with",
    detail: "With statement",
    type: "keyword",
  }),
];

export function nix() {
  return new LanguageSupport(
    nixLanguage,
    nixLanguage.data.of({
      autocomplete: ifNotIn(
        ["Comment", "CommentBlock", "String", "IndentedString"],
        completeFromList(snippets)
      ),
    })
  );
}
