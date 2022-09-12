# codemirror-lang-nix

[CodeMirror](https://codemirror.net/) extension for the [Nix](https://github.com/NixOS/nix) language

### Usage

```js
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';

import { nix } from "codemirror-lang-nix";

const nixSource = `\
{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  buildInputs = [ pkgs.nodejs ];
}
`;

new EditorView({
  state: EditorState.create({
    doc: nixSource,
    extensions: [basicSetup, nix()],
  }),
  parent: document.querySelector('#editor'),
});
```

## Related

this project is based on

* https://github.com/replit/codemirror-lang-nix
* https://github.com/milahu/lezer-parser-nix