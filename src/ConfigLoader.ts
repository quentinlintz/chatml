import fs from "fs";
import path from "path";
import { parse } from "yaml";
import { Config, Message, Role } from "./promptTypes";

/**
 * A class that loads configuration files in the YAML format.
 * The configuration file should include an array of messages, where each message has a role and a content field.
 */
export class ConfigLoader {
  /**
   * Loads a YAML configuration file and validates its format.
   *
   * @throws ConfigError if the file is missing, has invalid format, or contains invalid messages.
   * @returns A configuration object that includes an array of messages, where each message has a role and a content field.
   */
  static load(): Config {
    const configFilePath = path.join(process.cwd(), ".chatml.yaml");
    if (!fs.existsSync(configFilePath)) {
      throw new Error(`Configuration file ${configFilePath} not found`);
    }
    const fileContent = fs.readFileSync(configFilePath, "utf8");
    const config = parse(fileContent);
    ConfigLoader.isValidConfig(config);
    return config;
  }

  /**
   * Validates the format of a YAML configuration object.
   *
   * @throws ConfigError if the object is missing the required fields or has invalid messages.
   * @param config The configuration object to validate.
   */
  private static isValidConfig(config: object) {
    if (!config || typeof config !== "object" || !("messages" in config)) {
      throw new ConfigError("Invalid configuration file format");
    }
    const { messages } = config as Config;
    if (!Array.isArray(messages)) {
      throw new ConfigError("Messages should be an array");
    }
    messages.forEach((message) => ConfigLoader.isValidMessage(message));
  }

  /**
   * Validates the format of a message object.
   *
   * @throws ConfigError if the message has invalid fields.
   * @param message The message object to validate.
   */
  private static isValidMessage(message: unknown) {
    const { role, content } = message as Message;
    if (!role || !Object.values(Role).includes(role as Role)) {
      throw new ConfigError(
        `Invalid message: role "${role}" is not one of ${Object.values(Role).join(", ")}`
      );
    }
    if (!content || typeof content !== "string") {
      throw new ConfigError(`Invalid message: content "${content}" is not a string`);
    }
  }
}

export class ConfigError extends Error {
  constructor(message: string) {
    super(`Invalid configuration file. ${message}`);
    this.name = "ConfigError";
  }
}
