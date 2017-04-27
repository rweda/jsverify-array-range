# JSVerify Array Range

[![NPM Package][NPM_VERSION_IMG]][NPM_LINK]
[![Build Status][TRAVIS_IMAGE]][TRAVIS_LINK]

`jsc.array()` with min/max options.

## Installation

Install `jsverify-array-range` via NPM.  You must also have `jsverify` installed in your project.

```bash
npm install --save-dev jsverify-array-range jsverify
```

## Usage

```js
const jsc = require("jsverify");
const arrayRange = require("jsverify-array-range");

jsc.property("Random Array Lengths", arrayRange(jsc.number), (arr) => {
  // arrayRange(arb) works like jsc.array(arb)
});

jsc.property("Short Arrays", arrayRange(jsc.number, 5), (arr) => {
  // `arrayRange(arb, max)` will have between 0 and `max` entries (inclusive)
  return arr.length >= 0 && arr.length <= 5;
});

jsc.property("Medium Arrays", arrayRange(jsc.number, 5, 10), (arr) => {
  // `arrayRange(arb, min, max)` will have between `min` and `max` entries (inclusive)
  return arr.length >= 5 && arr.length <= 10;
});
```

[NPM_VERSION_IMG]: https://img.shields.io/npm/v/jsverify-array-range.svg
[NPM_LINK]: https://www.npmjs.com/package/jsverify-array-range
[TRAVIS_IMAGE]: https://travis-ci.org/rweda/jsverify-array-range.svg?branch=master
[TRAVIS_LINK]: https://travis-ci.org/rweda/jsverify-array-range
