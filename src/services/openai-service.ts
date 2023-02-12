import { CreateEditRequest, OpenAIApi } from "openai";
import { Configuration } from "openai/dist/configuration";
import { ExtensionConfiguration } from "../models/configuration";
import { EditReturns } from "../models/edit-returns";
import { ConfigurationService } from "./configuration-service";

const DefaultAIModels = {
  codeCompletionGood: 'code-davinci-002',
  codeCompletionFast: 'code-cushman-001',
  codeEdit: 'code-davinci-edit-001',
};

export class OpenAIService {
  private static instance: OpenAIService;

  static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      const config = ConfigurationService.getInstance().getConfig();
      OpenAIService.instance = new OpenAIService(config);
    }

    return OpenAIService.instance;
  }

  private openai: OpenAIApi;

  constructor(private extConfig: ExtensionConfiguration) {
    const configuration = new Configuration({
      organization: extConfig.organisationId,
      apiKey: extConfig.apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async editCode(languageId: string, instruction: string, input: string): Promise<EditReturns> {
    // Append language id if possible
    if (languageId) {
      instruction = `Programming language: ${languageId}. ` + instruction;
    }

    const request: CreateEditRequest = {
      model: DefaultAIModels.codeEdit,
      instruction,
      input,
    };

    const { temperature, openAIModel } = this.extConfig;

    // Load user settings if not null
    if (!!temperature) {
      request.temperature = temperature;
    }
    if (!!openAIModel) {
      request.model = openAIModel;
    }

    const response = await this.openai.createEdit(request);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const { choices, usage } = response.data;
    if (choices.length === 0) {
      throw new Error('No choice in the response');
    }

    // Always get the first choices for now
    const choice = choices[0];
    const { text } = choice;
    if (!text) {
      throw new Error('No text in the response');
    }

    return {
      text,
      totalTokens: usage.total_tokens
    };
  }
}