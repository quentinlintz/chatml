import { ConfigLoader } from "./ConfigLoader";
import { Config } from "./promptTypes";

/**
 * A class for formatting prompt messages by prepending a user prompt to an array of messages loaded from a configuration file.
 * @constructor
 */
export class PromptFormatter {
  private config: Config;

  /**
   * Constructs a new PromptFormatter object and loads configuration settings.
   */
  constructor() {
    this.config = ConfigLoader.load();
    this.prepend = this.prepend.bind(this);
  }

  /**
   * Prepends a user prompt to an array of messages loaded from a configuration file and returns a JSON array representing the formatted message.
   * @param {string} prompt - The user prompt to prepend to the message array.
   * @returns {string} A JSON array representing the formatted message.
   */
  public prepend(prompt: string): Array<{ role: string; content: string }> {
    const messages = this.config.messages.map((message) => {
      return {
        role: message.role,
        content: message.content.replace("\n", "\\n"),
      };
    });

    messages.push({
      role: "user",
      content: prompt,
    });

    return messages;
  }
}
