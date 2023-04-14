import { ConfigLoader } from "../src/ConfigLoader";
import { PromptFormatter } from "../src/PromptFormatter";
import { Config } from "../src/promptTypes";

describe("PromptFormatter", () => {
  it("should prepend prompt to config", () => {
    const config: Config = {
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: "Who won the world series in 2020?",
        },
        {
          role: "assistant",
          content: "The Los Angeles Dodgers won the World Series in 2020.",
        },
      ],
    };
    const prompt = "What score did the Los Angeles Dodgers win by?";
    const expectedOutput = [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: "Who won the world series in 2020?",
      },
      {
        role: "assistant",
        content: "The Los Angeles Dodgers won the World Series in 2020.",
      },
      {
        role: "user",
        content: "What score did the Los Angeles Dodgers win by?",
      },
    ];

    vi.spyOn(ConfigLoader, "load").mockReturnValue(config);
    const prependPrompt = new PromptFormatter();
    const output = prependPrompt.prepend(prompt);

    expect(output).toEqual(expectedOutput);
  });
});
