# Context Storage

[![npm][npm-badge]][npm-url]
[![gzip size][gzip-badge]][gzip-url]
[![Build Status][travis-badge]][travis-url]
[![Code Coverage][codecov-badge]][codecov-url]
[![MIT Licensed][license-badge]][license-url]

> React [hook][react-hooks] for sharing localStorage via context.

values are automatically converted to and from JSON.

## Install

```bash
$ npm install --save context-storage
```

or

```bash
$ yarn add context-storage
```

**requires**: any version of react with hooks. (`react >= 16.8.0`)

## Usage

```javascript
import React from 'react'
import createStorage from 'context-storage'

const [Provider, useStorage] = createStorage('local-storage-key')

const Title = () => <h1>Hello {useStorage()[0]}!</h1>

const UserNameInput = () => {
  const [name, setName] = useStorage()
  const handleChange = ({ target }) => setName(target.value)
  return <input value={name || ''} onChange={handleChange} />
}

export const App = () => (
  <Provider>
    <Title />
    <UserNameInput />
  </Provider>
)
```

## Arguments

> **key** is the only required argument.

| **name**     | type              | description                            |
| ------------ | ----------------- | -------------------------------------- |
| **key**      | `string`          | which key in localStorage to use       |
| **fallback** | `any`             | fallback when localStorage is empty    |
| **replacer** | `function︱array` | [passed to `JSON.stringify`][replacer] |
| **reviver**  | `function`        | [passed to `JSON.parse`][reviver]      |
| **storage**  | `object`          | with `getItem` and `setItem` methods   |

## Implementation

the value will always be encoded as JSON when saving to `localStorage`.
and decoded when read back.

it's safe to use objects and arrays, as long as they are non-circular.

following [JSON standards][json], it's to be expected that,
without custom replacer/reviver:

- **prototypes** will be lost;
- **`Functions`** will get discarded;
- **`Dates`** will be cast into `ISO 8601` strings.

> `Map` and `Set` can be used with custom `replacer` and `reviver` arguments.

[npm-badge]: https://img.shields.io/npm/v/context-storage.svg
[npm-url]: https://npmjs.com/package/context-storage
[gzip-badge]: https://img.badgesize.io/https://unpkg.com/context-storage/dist/index.js?compression=gzip
[gzip-url]: https://unpkg.com/context-storage/dist/index.js
[travis-badge]: https://travis-ci.com/leonardodino/context-storage.svg?branch=master
[travis-url]: https://travis-ci.com/leonardodino/context-storage
[codecov-badge]: https://badgen.net/codecov/c/github/leonardodino/context-storage
[codecov-url]: https://codecov.io/gh/leonardodino/context-storage
[license-badge]: https://badgen.net/github/license/leonardodino/context-storage
[license-url]: https://github.com/leonardodino/context-storage/blob/master/LICENSE
[react-hooks]: https://reactjs.org/docs/hooks-intro.html
[json]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
[replacer]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter
[reviver]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_the_reviver_parameter
