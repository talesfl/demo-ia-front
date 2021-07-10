import { User } from "./user";

export class Email {

    id: number;
    userFrom: User;
    userTo: User;
    subject: String;
    content: String;
    createDate: String;

    constructor(obj: Partial<Email>) {
        Object.assign(this, obj);
    }
}
