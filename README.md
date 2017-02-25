# autostylelint
[![npm](https://img.shields.io/npm/v/autostylelint.svg)](https://www.npmjs.com/package/autostylelint)

***Work in progress***

Requires an `npm link`ed `stylelint` with the changes from https://github.com/stylelint/stylelint/pull/2096.

## Contributing

`autostylelint` uses [Gulp](http://gulpjs.com/) to automate building, which requires [Node.js](http://node.js.org).

To build from scratch, install NodeJS and run the following commands:

```
npm install -g gulp
npm install
gulp
```

[automutate](https://github.com/automutate/automutate) manages the runtime of taking in lint complaints from `stylelint`.
These are mapped to `Suggester` classes in `src/suggesters` by name.

[automutate-tests](https://github.com/automutate/automutate-tests) manages development-time tests verifying actual file mutations.

### Adding a suggester

Add test case(s) under `test/cases` that each have an `original.css`, `expected.css`, `actual.css`, and `.stylelintrc`.
