import * as vscode from 'vscode';
import { Constants } from '../constants';
import { ExtensionConfiguration } from '../models/configuration';


export class ConfigurationService {
  private static instance: ConfigurationService;

  static getInstance(): ConfigurationService {
    if (!ConfigurationService.instance) {
      ConfigurationService.instance = new ConfigurationService();
    }

    return ConfigurationService.instance;
  }

  private config?: ExtensionConfiguration;

  getConfig(): ExtensionConfiguration {
    if (this.config) {
      return this.config;
    }

    const userConfig = vscode.workspace.getConfiguration(Constants.appId);
    this.config = {
      organisationId: userConfig.get('organisationId') ?? '',
      apiKey: userConfig.get('apiKey') ?? '',
      temperature: userConfig.get('temperature') ?? 0,
      openAIModel: userConfig.get('openaiModel'),
    };
    return this.config;
  }

}