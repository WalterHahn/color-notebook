# color-notebook

A javascript application for storing color information.

**color-notebook** works with an external repository or local storage.  When the application loads, it will `GET /ping` the configured *repo-url*; If status code `200` is returned, the application will continue to use the external repo.  On error, the application will use local storage instead.

# Objective

I created [javascript-app](https://github.com/WalterHahn/javascript-app), a template to jumpstart javascript application development. This is an example application and an exploratory search for missing features.

## Build

**color-notebook** is being bundled with webpack. Run `npm run build` to compile production ready files and `npm run watch` during development to automatically compile on file change.

## Usage

Open `dist/index.html` in your browser.

## Test

**color-notebook** uses the Jest testing framework. Run `npm test` to execute all tests.

## Demo

[https://walterhahn.github.io/color-notebook/](https://walterhahn.github.io/color-notebook/)
