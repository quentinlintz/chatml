export enum Role {
  system = "system",
  user = "user",
  assistant = "assistant",
}

export type RoleString = keyof typeof Role;

export type Message = {
  role: RoleString;
  content: string;
};

export type Config = {
  messages: Array<Message>;
};
