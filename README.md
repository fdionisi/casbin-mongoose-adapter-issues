# Casbin Mongoose Adapter issues with TypeScript

## TS2309: An export assignment cannot be used in a module with other exported elements.

When building a TypeScript library on top of Casbin and its MongooseAdapter, a TS2309 error is thrown failing the building process.
This is cause by the [`export = MongooseAdapter`](https://github.com/node-casbin/mongoose-adapter/blob/ddf23a7a6fc1720b693285005da12e52fe5ab13c/src/index.ts#L7) in the `index.ts` file.

Steps to reproduce:

```sh
# Install all dependencies
yarn

# Run `tsc` to output in the `dist/` dir
yarn build
```

## TypeError: Cannot read property 'newAdapter' of undefined

The [`export = MongooseAdapter`](https://github.com/node-casbin/mongoose-adapter/blob/ddf23a7a6fc1720b693285005da12e52fe5ab13c/src/index.ts#L7) override all other named exports.

This is clear from the transpiled JavaScript code:

```js
// transpiled casbin-mongoose-adapter
// > The last `module.exports` overrides all other `exports`.
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
const adapter_1 = require("./adapter");
__exportStar(require("./model"), exports);
__exportStar(require("./errors"), exports);
__exportStar(require("./adapter"), exports);
module.exports = adapter_1.MongooseAdapter;
```

Steps to reproduce:

```sh
# Install all dependencies
yarn

# Run `tsc` to output in the `dist/` dir
yarn start
```