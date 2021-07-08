export class User {

    id: number;
    name: string;
    login: string;
    password: string;
    createDate: string;
    updateDate: string;
    email: string;
    admin: boolean;

    constructor(obj: Partial<User>) {
        Object.assign(this, obj);
    }
}
