"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
function exec(cmd) {
    return new Promise((resolve, reject) => {
        child_process.exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(stderr);
            }
            else {
                resolve(stdout);
            }
        });
    });
}
exports.exec = exec;
//# sourceMappingURL=exec.js.map