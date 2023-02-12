import * as vscode from 'vscode';

export class VSCodeUtils {
  static getSelectedText(): string | undefined {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return undefined;
    }

    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);
    return selectedText;
  }

  static getCurrentLanguageId(): string | undefined {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return undefined;
    }

    return editor.document.languageId;
  }

  static replaceSelectedText(text: string): void {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const selection = editor.selection;
    editor.edit(editBuilder => {
      editBuilder.replace(selection, text);
    });
  }

  static showInfo(message: string): void {
    vscode.window.showInformationMessage(message);
  }

  static showError(message: string): void {
    vscode.window.showErrorMessage(message);
  }
}
