# Open AI Code Assistant

---

## How to use

You will need to create account by yourself and passing the organisation id and API key to the VSCode extension. The organisation id and API key only stored on your local machine.
The OpenAI code edit API currently **FREE** to use in the beta.

1. Create your OpenAI account here: <https://openai.com/api/>
2. Login to your account:
   - Go to your organisation `Settings`, copy `Organisation ID`
   - Go to `User` -> `API Keys`, `Create new secret key` and copy
3. After installed the extension. Open VSCode settings and change the following
   - `openaiCodeAssistant.organisationId`: Put your organisation id here. Should start with `org-`
   - `openaiCodeAssistant.apiKey`: Put your secret key here. The secret key only appear once when you create them.
4. Select a piece of code, hit `Ctrl + F1` and enjoy!!!

## Features

- Uses OpenAI `code-davinci-edit-001` model to generate and edit code
- Auto detect the programming language even with an empty file.
- Multiple language support
- Auto generate code by a list of descriptions
- Edit code by instructions

### Edit code by instruction
![Edit code example 1](https://raw.githubusercontent.com/SmarterTomato/openai-code-assistant/main/resources/images/10.gif)
![Edit code example 2](https://raw.githubusercontent.com/SmarterTomato/openai-code-assistant/main/resources/images/20.gif)
![Edit code example 3](https://raw.githubusercontent.com/SmarterTomato/openai-code-assistant/main/resources/images/30.gif)

### Code generate by list of description
![Code generate example](https://raw.githubusercontent.com/SmarterTomato/openai-code-assistant/main/resources/images/40.gif)

## Key bindings

- `openaiCodeAssistant.editSelectedCode`: `Ctrl + F1`

## Extension settings

- `openaiCodeAssistant.organisationId`: Organisation ID in the settings from your OpenAI account. E.g. `org-...`

- `openaiCodeAssistant.apiKey`: API keys used for authentication
- `openaiCodeAssistant.temperature`: Not in use currently
- `openaiCodeAssistant.openaiModel`: Not in use currently

## Future plans

Suggestions are welcome. Please send to `tommywkzhao@hotmail.com`

## Known issues

Please report bug in GitHub or send to `tommywkzhao@hotmail.com`

- None

## Release notes

### 1.0.0

Initial release

- Add edit code by instruction
- Add user configurations
- Add key bindings
