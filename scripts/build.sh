#!/bin/sh

git submodule init
git submodule update

pnpm install

npm run build
