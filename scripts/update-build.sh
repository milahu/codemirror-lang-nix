#! /usr/bin/env bash

set -e
set -x

files=(dist/index.cjs dist/index.js)

git add "${files[@]}"

echo "added files. to unstage files:"
echo "git restore --staged ${files[@]}"

git commit -m "update build" --edit
