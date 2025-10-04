"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// 引入vscode可扩展性api
const vscode = __importStar(require("vscode"));
const prettier = __importStar(require("prettier"));
const html_minifier_1 = require("html-minifier");
// prettier 可以格式化解析的列表
// https://prettier.node.org.cn/docs/en/options#parser
// 当扩展被激活时被调用
function activate(context) {
    // 这行代码只会在激活时调用一次
    vscode.window.showInformationMessage(`恭喜你的"format-code-in-string"插件已激活！`);
    // console.log("hhhhhhhhhhhhhhhhh");
    // "onCommand:format-code-in-string.format-as-html",
    // "onCommand:format-code-in-string.format-as-css",
    // "onCommand:format-code-in-string.format-cycle"
    //   这个命令已经在package.json文件中定义;
    //   使用registerCommand实现命令;
    //   命令id必须和package.json中的command匹配;
    // 注册命令
    const formatAsHtml = vscode.commands.registerCommand("format-code-in-string.format-as-html", async () => {
        //   这里的代码将在每次执行命令时执行;
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            //   向用户发送消息框;
            vscode.window.showInformationMessage("没有找到活动的文本编辑器。");
            return;
        }
        // 获取选择的文本
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        //   selectedText.trim() 删除选中文本前后的空白字符
        if (!selectedText.trim()) {
            // 没有选中
            vscode.window.showInformationMessage("没有选中文本");
            return;
        }
        try {
            // 使用 Prettier 格式化代码
            const formattedCode = await prettier.format(selectedText, {
                parser: "html",
            });
            // 替换选中的代码
            await editor.edit((editBuilder) => {
                editBuilder.replace(selection, formattedCode);
            });
            vscode.window.showInformationMessage("格式化成功！");
        }
        catch (error) {
            vscode.window.showErrorMessage(`格式化失败: ${error}`);
        }
    });
    const formatASCss = vscode.commands.registerCommand("format-code-in-string.format-as-css", async () => {
        //   这里的代码将在每次执行命令时执行;
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            //   向用户发送消息框;
            vscode.window.showInformationMessage("没有找到活动的文本编辑器。");
            return;
        }
        // 获取选择的文本
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        //   selectedText.trim() 删除选中文本前后的空白字符
        if (!selectedText.trim()) {
            // 没有选中
            vscode.window.showInformationMessage("没有选中文本");
            return;
        }
        try {
            // 使用 Prettier 格式化代码
            const formattedCode = await prettier.format(selectedText, {
                parser: "css",
            });
            // 替换选中的代码
            await editor.edit((editBuilder) => {
                editBuilder.replace(selection, formattedCode);
            });
            vscode.window.showInformationMessage("格式化成功！");
        }
        catch (error) {
            vscode.window.showErrorMessage(`格式化失败: ${error}`);
        }
    });
    const formatASTs = vscode.commands.registerCommand("format-code-in-string.format-as-ts", async () => {
        //   这里的代码将在每次执行命令时执行;
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            //   向用户发送消息框;
            vscode.window.showInformationMessage("没有找到活动的文本编辑器。");
            return;
        }
        // 获取选择的文本
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        //   selectedText.trim() 删除选中文本前后的空白字符
        if (!selectedText.trim()) {
            // 没有选中
            vscode.window.showInformationMessage("没有选中文本");
            return;
        }
        try {
            // 使用 Prettier 格式化代码
            const formattedCode = await prettier.format(selectedText, {
                parser: "babel-ts",
            });
            // 替换选中的代码
            await editor.edit((editBuilder) => {
                editBuilder.replace(selection, formattedCode);
            });
            vscode.window.showInformationMessage("格式化成功！");
        }
        catch (error) {
            vscode.window.showErrorMessage(`格式化失败: ${error}`);
        }
    });
    const minifyString = vscode.commands.registerCommand("format-code-in-string.minify-string", async () => {
        //   这里的代码将在每次执行命令时执行;
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            //   向用户发送消息框;
            vscode.window.showInformationMessage("没有找到活动的文本编辑器。");
            return;
        }
        // 获取选择的文本
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        //   selectedText.trim() 删除选中文本前后的空白字符
        if (!selectedText.trim()) {
            // 没有选中
            vscode.window.showInformationMessage("没有选中文本");
            return;
        }
        try {
            // 使用 html-minifer 压缩代码
            const minifedCode = (0, html_minifier_1.minify)(selectedText, {
                // 折叠空格
                collapseWhitespace: true,
                // 始终折叠为1个空格
                conservativeCollapse: true,
                processConditionalComments: true,
                // 都压缩
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true
            });
            // 替换选中的代码
            await editor.edit((editBuilder) => {
                editBuilder.replace(selection, minifedCode);
            });
            vscode.window.showInformationMessage("压缩成功！");
        }
        catch (error) {
            vscode.window.showErrorMessage(`压缩失败: ${error}`);
        }
    });
    //   注入命令
    context.subscriptions.push(formatAsHtml);
    context.subscriptions.push(formatASCss);
    context.subscriptions.push(formatASTs);
    context.subscriptions.push(minifyString);
}
// This method is called when your extension is deactivated
function deactivate() {
    vscode.window.showErrorMessage("再见！");
}
//# sourceMappingURL=extension.js.map