"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const dependency_1 = require("./dependency");
const output_1 = require("./output");
const spawn_1 = require("./spawn");
const fs = require("fs");
const path = require("path");
function createPage(uri) {
    var fileName;
    var title;
    var pagePath;
    dependency_1.check()
        .then(() => {
        if (uri && uri.fsPath) {
            pagePath = uri.fsPath;
        }
        else if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document) {
            pagePath = vscode.window.activeTextEditor.document.fileName;
        }
    })
        .then(() => {
        if (pagePath) {
            return new Promise((resolve, reject) => {
                fs.stat(pagePath, (err, stats) => {
                    if (!err) {
                        if (stats.isFile()) {
                            pagePath = path.dirname(pagePath);
                        }
                    }
                    else {
                        pagePath = '';
                    }
                    resolve();
                });
            });
        }
    })
        .then(() => {
        if (pagePath) {
            pagePath = path.relative(path.join(vscode.workspace.rootPath, 'pages'), pagePath);
            if (pagePath.startsWith('../')) {
                return Promise.reject('不能在pages目录外建立页面');
            }
        }
    })
        .then(() => {
        return vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: '请输入页面文件名',
            prompt: '尽量采用小驼峰式命名',
        });
    })
        .then((str) => {
        if (!str) {
            return Promise.reject('未输入页面文件名');
        }
        fileName = str;
        pagePath = path.join(pagePath, fileName);
        return vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: '请输入页面标题',
            prompt: '如无需标题栏可不输入',
        });
    })
        .then((str) => {
        if (str) {
            title = str;
        }
    })
        .then(() => {
        var cmd = `tui new ${fileName} --newType page`;
        if (title) {
            cmd += ` --title ${title}`;
        }
        if (pagePath) {
            cmd += ` --pagePath ${pagePath}`;
        }
        return spawn_1.spawn(cmd);
    })
        .then(() => {
        output_1.output('log', '创建完成');
    })
        .catch((error) => {
        output_1.output('error', `创建失败:${error}`);
    });
}
exports.createPage = createPage;
//# sourceMappingURL=createPage.js.map