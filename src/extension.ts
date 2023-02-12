import * as vscode from 'vscode';
import { CodeAssistantService } from './services/code-assistant-service';
import { ConfigurationService } from './services/configuration-service';
import { OpenAIService } from './services/openai-service';

export function activate(context: vscode.ExtensionContext) {
	const codeAssistant = CodeAssistantService.getInstance();

	let disposable = vscode.commands.registerCommand('openaiCodeAssistant.editSelectedCode', () => {
		codeAssistant.editSelectedCode();
	});
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
