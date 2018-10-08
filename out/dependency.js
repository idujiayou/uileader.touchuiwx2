"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const verson_1 = require("./verson");
const exec_1 = require("./exec");
var checkSuccess;
function check() {
    if (checkSuccess) {
        return Promise.resolve();
    }
    var nodeCheck = exec_1.exec('node -v')
        .catch(stderr => {
        return Promise.reject('未安装node环境');
    })
        .then(stdout => {
        var v1 = stdout.replace('v', '');
        if (verson_1.compare(v1, '6.10.0') < 0) {
            return Promise.reject('node 版本过低');
        }
    });
    var cliCheck = exec_1.exec('tui -v')
        .catch(stderr => {
        return Promise.reject('未安装touchui-wx-cli');
    })
        .then(v1 => {
        if (verson_1.compare(v1, '1.1.6') < 0) {
            return Promise.reject('touchui-wx-cli 版本过低');
        }
    });
    return Promise.all([nodeCheck, cliCheck])
        .then(() => {
        checkSuccess = true;
        return Promise.resolve();
    })
        .catch(error => {
        vscode.window.showErrorMessage(error);
        return Promise.reject(error);
    });
}
exports.check = check;
//# sourceMappingURL=dependency.js.map