import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('cursorLineContentStart.jump', _ => {
			const editor = vscode.window.activeTextEditor
			if (editor) {
				const activePosition = editor.selection.active
				const line = editor.document.lineAt(activePosition)

				const contentIndex = line.firstNonWhitespaceCharacterIndex
				const position = activePosition.character > contentIndex ? activePosition.with(undefined, contentIndex) : activePosition.with(undefined, 0)

				const sel = new vscode.Selection(position, position)
				editor.selections = [sel, ...editor.selections.slice(1)]

				editor.revealRange(new vscode.Range(position, position), vscode.TextEditorRevealType.InCenterIfOutsideViewport)
			}
		})
	)
}

export function deactivate() {}
