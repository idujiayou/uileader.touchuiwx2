"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const dependency_1 = require("./dependency");
const output_1 = require("./output");
const spawn_1 = require("./spawn");
const init_1 = require("./init");
var loading = false;
function importApp() {
    var wxPaths = {
        now: '导入到当前工程目录',
        other: '导入到其他目录'
    };
    var uiPath;
    var wxPath;
    dependency_1.check()
        .then(() => {
        if (loading) {
            return Promise.reject('转换任务进行中');
        }
        return vscode.window.showOpenDialog({
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false,
            openLabel: '选择TouchUI工程目录'
        });
    })
        .then((uris) => {
        if (!uris || !uris.length) {
            return Promise.reject('目录错误');
        }
        uiPath = uris[0].fsPath;
        return vscode.window.showQuickPick([wxPaths.now, wxPaths.other], {
            placeHolder: '请选择操作'
        });
    })
        .then((str) => {
        if (str === wxPaths.now) {
            init_1.init();
            return vscode.workspace.rootPath;
        }
        else if (str === wxPaths.other) {
            return vscode.window.showOpenDialog({
                canSelectFiles: false,
                canSelectFolders: true,
                canSelectMany: false,
                openLabel: '选择目录'
            }).then((uris) => {
                if (!uris || !uris.length) {
                    return Promise.reject('目录错误');
                }
                return uris[0].fsPath;
            });
        }
        else {
            return Promise.reject('操作取消');
        }
    })
        .then((str) => {
        wxPath = str;
        var cmd = `tui transform --type ui2wx --src ${uiPath} --dest ${wxPath}`;
        loading = true;
        return spawn_1.spawn(cmd);
    })
        .then(() => {
        loading = false;
        output_1.output('log', '导入完成');
    })
        .catch(error => {
        loading = false;
        output_1.output('error', `导入失败:${error}`);
    });
}
exports.importApp = importApp;
//# sourceMappingURL=importApp.js.map