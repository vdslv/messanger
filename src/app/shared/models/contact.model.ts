import { MessageModel } from "./message.model";

export interface ContactModel {
  id: number;
  name: string;
  image: string;
  history: MessageModel[];
}
