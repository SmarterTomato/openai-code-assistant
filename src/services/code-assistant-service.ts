import * as vscode from 'vscode';
import { VSCodeUtils } from '../utils/VSCodeUtils';
import { OpenAIService } from './openai-service';


export class CodeAssistantService {
  private static instance: CodeAssistantService;

  static getInstance(): CodeAssistantService {
    if (!CodeAssistantService.instance) {

      CodeAssistantService.instance = new CodeAssistantService(
        OpenAIService.getInstance()
      );
    }

    return CodeAssistantService.instance;
  }

  constructor(private openAIService: OpenAIService) {
  }

  editSelectedCode(): void {
    // - Get current selected text
    const selectedText = VSCodeUtils.getSelectedText();
    if (selectedText === undefined) {
      return;
    }

    // - Get current language
    const languageId = VSCodeUtils.getCurrentLanguageId();
    if (languageId === undefined) {
      return;
    }

    // - Ask user to enter instruction
    const input = vscode.window.showInputBox({
      prompt: 'Please provide what you want to do with as much details as possible ',
    });
    input.then(async (instruction) => {
      if (!instruction) {
        return;
      }

      vscode.window.withProgress({
        title: 'OpenAI thinking...',
        location: vscode.ProgressLocation.Notification
      }, async () => {
        try {
          // - Make request
          const { text, totalTokens } = await this.openAIService.editCode(
            languageId, instruction, selectedText);

          // - Replace current text
          VSCodeUtils.replaceSelectedText(text);
          console.log('Edit success with total tokens: ' + totalTokens);
        } catch (error) {
          if (error instanceof Error) {
            VSCodeUtils.showError(error.message);
          }
        }
      });
    });
  }
}