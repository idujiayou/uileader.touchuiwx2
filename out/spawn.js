"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const vscode = require("vscode");
const output_1 = require("./output");
function spawn(cmd, args = [], option = {}) {
    var stdout = '';
    var stderr = '';
    var errorStr;
    var option_ = {
        cwd: vscode.workspace.rootPath,
        shell: process.platform === 'win32',
    };
    if (args.length === 0) {
        args = cmd.split(/\s+/);
        cmd = args[0];
        args.shift();
    }
    return new Promise((resolve, reject) => {
        var ls = child_process.spawn(cmd, args, Object.assign(option_, option));
        ls.stdout.on('data', (data) => {
            data = data.toString();
            output_1.output('log', data);
            stdout += data;
        });
        ls.stderr.on('data', (data) => {
            data = data.toString();
            output_1.output('log', data);
            stderr += data;
        });
        ls.on('error', error => {
            errorStr = errorStr.toString();
            output_1.output('error', errorStr);
        });
        ls.on('close', (code) => {
            console.log(`子进程退出码：${code}`);
            if (code === 0) {
                resolve(stdout);
            }
            else {
                reject(stderr || errorStr);
            }
        });
    });
}
exports.spawn = spawn;
//# sourceMappingURL=spawn.js.map