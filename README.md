# ChatML

![Build Status](https://github.com/quentinlintz/chatml/workflows/CI/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/07281a5cc01493e33ca0/maintainability)](https://codeclimate.com/github/quentinlintz/chatml/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/07281a5cc01493e33ca0/test_coverage)](https://codeclimate.com/github/quentinlintz/chatml/test_coverage)

ChatML (Chat Markup Language) is a package that prevents prompt injection attacks by prepending your prompts with a conversation.

## Installation

```bash
pnpm add @quentinlintz/chatml
```

```bash
npm i @quentinlintz/chatml
```

```bash
yarn add @quentinlintz/chatml
```

## Setup

The .chatml.yaml file must be at the root of your project and formatted correctly. Here is an example of correct formatting:

```yaml
messages:
  - role: system
    content: You are a helpful assistant.
  - role: user
    content: Who won the world series in 2020?
  - role: assistant
    content: The Los Angeles Dodgers won the World Series in 2020.
```

The configuration file must contain a `messages` array, which is a list of messages that will be prepended to your prompt. Each message must have a `role` property, which can be one of `system`, `user`, or `assistant`, and a `content` property, which is the message text.

## Usage

Import the `prepend` function and assign it to the `messages` parameter in your payload to warmup the model.

```javascript
import { prepend } from "@quentinlintz/chatml";

const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: prepend("What kind of drinks do you have?"),
});
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
