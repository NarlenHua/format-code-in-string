"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const { minify } = require("terser");
const terser_1 = require("terser");
var code = "function add(first, second) { return first + second; }";
async function testfun() {
    var result = await (0, terser_1.minify)(code, { sourceMap: true });
    console.log(result.code);
}
testfun();
//# sourceMappingURL=test.js.map