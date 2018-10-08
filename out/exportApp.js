"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const dependency_1 = require("./dependency");
const output_1 = require("./output");
const spawn_1 = require("./spawn");
var loading = false;
function exportApp() {
    dependency_1.check()
        .then(() => {
        if (loading) {
            return Promise.reject('导出任务进行中');
        }
        return vscode.window.showOpenDialog({
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false,
            openLabel: '选择导出目录'
        });
    })
        .then((uris) => {
        if (!uris || !uris.length) {
            return Promise.reject('目录错误');
        }
        var exportPath = uris[0].fsPath;
        var src = vscode.workspace.rootPath;
        var cmd = `tui transform --type wx2ui --src ${src} --dest ${exportPath}`;
        loading = true;
        return spawn_1.spawn(cmd);
    })
        .then(() => {
        loading = false;
        output_1.output('log', '导出完成');
    })
        .catch((error) => {
        loading = false;
        output_1.output('error', `导出失败:${error}`);
    });
}
exports.exportApp = exportApp;
//# sourceMappingURL=exportApp.js.map