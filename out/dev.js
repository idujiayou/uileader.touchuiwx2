"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_1 = require("./dependency");
const terminal = require("./terminal");
function dev() {
    dependency_1.check()
        .then(() => {
        var cmd = 'tui dev';
        terminal.run(cmd);
    });
}
exports.dev = dev;
//# sourceMappingURL=dev.js.map