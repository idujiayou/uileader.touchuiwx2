"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const dependency_1 = require("./dependency");
const output_1 = require("./output");
const spawn_1 = require("./spawn");
const textFile = require("textfile");
const path = require("path");
const init_1 = require("./init");
var loading = false;
function createDemo() {
    var myproject;
    var projectPath;
    dependency_1.check()
        .then(() => {
        if (loading) {
            return Promise.reject('创建任务进行中');
        }
        return textFile.read(path.join(vscode.workspace.rootPath, 'package.json'), 'string');
    })
        .then(str => {
        if (str) {
            return Promise.reject('当前目录已存在项目，无法重复创建');
        }
    })
        .then(() => {
        return vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: '请输入项目名称'
        });
    })
        .then(projectName => {
        if (projectName) {
            myproject = projectName;
            projectPath = vscode.workspace.rootPath;
        }
        else {
            return Promise.reject('未输入项目名称');
        }
    })
        .then(() => {
        loading = true;
        var cmd = `tui init ${myproject} --projectPath ${projectPath} --projectType application --isContinue false`;
        return spawn_1.spawn(cmd);
    })
        .then(() => {
        loading = false;
        output_1.output('log', '创建完成');
        init_1.init();
    })
        .catch(error => {
        loading = false;
        output_1.output('error', `创建失败:${error}`);
    });
}
exports.createDemo = createDemo;
//# sourceMappingURL=createDemo.js.map