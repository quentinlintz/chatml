import fs from "fs";
import path from "path";
import { ConfigLoader, ConfigError } from "../src/ConfigLoader";

// Mock the file system module
vi.mock("fs");

describe("ConfigLoader", () => {
  describe("load", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should return a valid config", () => {
      // Set up mock file system
      vi.spyOn(fs, "existsSync").mockReturnValue(true);
      vi.spyOn(fs, "readFileSync").mockReturnValue(`
        messages:
          - role: system
            content: You are a helpful assistant.
          - role: user
            content: Who won the world series in 2020?
          - role: assistant
            content: The Los Angeles Dodgers won the World Series in 2020.
      `);

      // Call the load method
      const config = ConfigLoader.load();

      // Check that the config is valid
      expect(config).toEqual({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Who won the world series in 2020?" },
          { role: "assistant", content: "The Los Angeles Dodgers won the World Series in 2020." },
        ],
      });
    });

    it("should throw an error if the config file is not found", () => {
      const configFilePath = path.join(__dirname, "..", ".chatml.yaml");

      // Set up mock file system
      vi.spyOn(fs, "existsSync").mockReturnValue(false);

      // Call the load method and expect an error to be thrown
      expect(() => ConfigLoader.load()).toThrowError(
        new Error(`Configuration file ${configFilePath} not found`)
      );
    });

    it("should throw an error if the config file has an invalid format", () => {
      // Set up mock file system
      vi.spyOn(fs, "existsSync").mockReturnValue(true);
      vi.spyOn(fs, "readFileSync").mockReturnValue(`
        invalid: key
      `);

      // Call the load method and expect a ConfigError to be thrown
      expect(() => ConfigLoader.load()).toThrowError(
        new ConfigError("Invalid configuration file format")
      );
    });

    it("should throw an error if the messages property is not an array", () => {
      // Set up mock file system
      vi.spyOn(fs, "existsSync").mockReturnValue(true);
      vi.spyOn(fs, "readFileSync").mockReturnValue(`
        messages: not an array
      `);

      // Call the load method and expect a ConfigError to be thrown
      expect(() => ConfigLoader.load()).toThrowError(
        new ConfigError("Messages should be an array")
      );
    });

    it("should throw an error if role is invalid", () => {
      // Set up mock file system
      vi.spyOn(fs, "existsSync").mockReturnValue(true);
      vi.spyOn(fs, "readFileSync").mockReturnValue(`
        messages:
          - role: user
            content: This message has an invalid role.
          - role: invalid
            content: This message has valid format.
      `);

      // Call the load method and expect a ConfigError to be thrown
      expect(() => ConfigLoader.load()).toThrowError(
        new ConfigError('Invalid message: role "invalid" is not one of system, user, assistant')
      );
    });

    it("should throw an error if any message has an invalid format", () => {
      // Set up mock file system
      vi.spyOn(fs, "existsSync").mockReturnValue(true);
      vi.spyOn(fs, "readFileSync").mockReturnValue(`
        messages:
          - role: user
            content: This message has an invalid role.
          - role: user
      `);

      // Call the load method and expect a ConfigError to be thrown
      expect(() => ConfigLoader.load()).toThrowError(
        new ConfigError('Invalid message: content "undefined" is not a string')
      );
    });
  });
});
