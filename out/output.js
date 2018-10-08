"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
var outputChannel = vscode.window.createOutputChannel('TouchWX');
outputChannel.show(true);
function output(type, ...others) {
    var log = `[${type}]`;
    var __str = '';
    others.forEach(str => {
        if (typeof str === 'object') {
            try {
                __str = JSON.stringify(str);
            }
            catch (error) {
                __str = String(str);
            }
        }
        else {
            __str = str;
        }
    });
    if (__str.replace(/\s/g, '').length === 0) {
        return;
    }
    log += __str;
    log = log.replace(/\u001b\[\d+m/g, '');
    outputChannel.appendLine(log);
}
exports.output = output;
//# sourceMappingURL=output.js.map