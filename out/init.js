"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const output_1 = require("./output");
function init() {
    var workspaceConfig = vscode.workspace.getConfiguration();
    var extensions = workspaceConfig.get('vetur.extensions');
    if (Array.isArray(extensions)) {
        extensions.push('.wxa', '.wx', '.wxc');
        extensions = [...new Set(extensions)];
    }
    var filesAssociations = workspaceConfig.get('files.associations');
    filesAssociations['*.wxa'] = 'vue';
    filesAssociations['*.wx'] = 'vue';
    filesAssociations['*.wxc'] = 'vue';
    try {
        workspaceConfig.update('touchuiwx.enable', true, false);
        workspaceConfig.update('vetur.extensions', extensions, false);
        workspaceConfig.update('files.associations', filesAssociations, false);
        output_1.output('log', '工程初始化成功');
    }
    catch (error) {
        vscode.window.showErrorMessage(`工程初始化失败：${error}`);
    }
}
exports.init = init;
//# sourceMappingURL=init.js.map