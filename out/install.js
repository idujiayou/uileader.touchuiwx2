"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_1 = require("./dependency");
const output_1 = require("./output");
const spawn_1 = require("./spawn");
function install() {
    var loading;
    if (loading) {
        return output_1.output('log', '项目依赖安装中，请稍候再试...');
    }
    dependency_1.check()
        .then(() => {
        loading = true;
        output_1.output('log', '开始安装项目依赖');
        var cmd = 'npm install';
        return spawn_1.spawn(cmd);
    })
        .then(() => {
        output_1.output('log', '项目依赖安装结束');
    })
        .catch(error => {
        output_1.output('error', `项目依赖安装失败：${error}`);
    })
        .then(() => {
        loading = false;
    });
}
exports.install = install;
//# sourceMappingURL=install.js.map