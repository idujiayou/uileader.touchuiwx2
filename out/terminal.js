"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
var terminal;
function run(cmd) {
    if (!terminal) {
        terminal = vscode.window.createTerminal('TouchWX');
        terminal.show();
    }
    terminal.sendText(cmd, true);
}
exports.run = run;
//# sourceMappingURL=terminal.js.map