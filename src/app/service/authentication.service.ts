import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

import { User } from "../domain/user";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private readonly _URL: string = `${environment.server.contextPath}/authentications`;
    
    // TODO: mockado
    public isAuthenticated: boolean = true;

    // TODO: mockado enquanto descubro a sessão
    public loggedUser$ = of(new User({
        id: 1,
        name: 'Admin da Silva',
        login: 'admin',
        admin: true,
        email: 'admin@admin.com.br',
        createDate: '12/07/2021 00:00:00',
        updateDate: '12/07/2021 00:00:00'
    }))

    constructor(private http: HttpClient) { }

    // TODO: quando implementar o token. será alterado
    public login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${this._URL}/login`, { email, password } as User);
    }

    // TODO: quando implementar o token. será alterado
    public logout(): Observable<void> {
        return this.http.get<void>(`${this._URL}/logout`);
    }
}
