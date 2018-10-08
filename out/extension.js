'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const init_1 = require("./init");
const createDemo_1 = require("./createDemo");
const createPage_1 = require("./createPage");
const install_1 = require("./install");
const dev_1 = require("./dev");
const exportApp_1 = require("./exportApp");
const importApp_1 = require("./importApp");
const output_1 = require("./output");
function activate(context) {
    output_1.output('log', 'TouchWX');
    let _init = vscode.commands.registerCommand('touchuiwx.init', init_1.init);
    let _createDemo = vscode.commands.registerCommand('touchuiwx.createDemo', createDemo_1.createDemo);
    let _createPage = vscode.commands.registerCommand('touchuiwx.createPage', createPage_1.createPage);
    let _install = vscode.commands.registerCommand('touchuiwx.install', install_1.install);
    let _dev = vscode.commands.registerCommand('touchuiwx.dev', dev_1.dev);
    let _exportApp = vscode.commands.registerCommand('touchuiwx.exportApp', exportApp_1.exportApp);
    let _importApp = vscode.commands.registerCommand('touchuiwx.importApp', importApp_1.importApp);
    context.subscriptions.push(_init, _createDemo, _createPage, _install, _dev, _exportApp, _importApp);
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map