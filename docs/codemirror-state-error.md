make separate package for demo in dev/
to avoid multiple installs of @codemirror/state
as workaround for the error
Uncaught Error: Unrecognized extension value in extension set ([object Object]).
This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.

