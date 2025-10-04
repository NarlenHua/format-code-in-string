// 引入vscode可扩展性api
import * as vscode from "vscode";
import * as prettier from "prettier";

// 当扩展被激活时被调用
export function activate(context: vscode.ExtensionContext) {
	// 这行代码只会在激活时调用一次
	vscode.window.showInformationMessage(
		`恭喜你的"format-code-in-string"插件已激活！`
	);
	// console.log("hhhhhhhhhhhhhhhhh");
    // "onCommand:format-code-in-string.format-as-html",
    // "onCommand:format-code-in-string.format-as-css",
    // "onCommand:format-code-in-string.format-cycle"
	//   这个命令已经在package.json文件中定义;
	//   使用registerCommand实现命令;
	//   命令id必须和package.json中的command匹配;
	// 注册命令
	const formatAsHtml = vscode.commands.registerCommand(
		"format-code-in-string.format-as-html",
		async () => {
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
			} catch (error) {
				vscode.window.showErrorMessage(`格式化失败: ${error}`);
			}
		}
	);
	const formatASCss = vscode.commands.registerCommand(
		"format-code-in-string.format-as-css",
		async () => {
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
			} catch (error) {
				vscode.window.showErrorMessage(`格式化失败: ${error}`);
			}
		}
	);

	let flag: boolean = false;
	const formatCycle = vscode.commands.registerCommand(
		"format-code-in-string.format-cycle",
		async () => {
			//   这里的代码将在每次执行命令时执行;
			flag = !flag;
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
					parser: flag ? "html" : "css",
				});
				
				// 替换选中的代码
				await editor.edit((editBuilder) => {
					editBuilder.replace(selection, formattedCode);
				});
				
				vscode.window.showInformationMessage("格式化成功！");
			} catch (error) {
				vscode.window.showErrorMessage(`格式化失败: ${error}`);
			}
		}
	);
	//   注入命令
	//   context.subscriptions.push(formatAsHtml, formatASCss,formatCycle);
	context.subscriptions.push(formatAsHtml);
	context.subscriptions.push(formatASCss);
	context.subscriptions.push(formatCycle);
	// context.subscriptions.push(formatCycle); 
}

// This method is called when your extension is deactivated
export function deactivate() {
	vscode.window.showErrorMessage("再见！");
}