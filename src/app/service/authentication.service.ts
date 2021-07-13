import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

import { User } from "../domain/user";


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    
    private readonly _URL: string = `${environment.server.contextPath}/authentications`;
    private _token: string;
    private _isAuthenticated: boolean = false;
    private _loggedUser: User;
    
    private readonly _HEADER_AUTHORIZATION: string = 'Authorization';
    private readonly _HEADER_WWW_AUTHENTICATE: string = 'WWW-Authenticate';

    constructor(private http: HttpClient) { }

    public authHeaders(): HttpHeaders {
        return new HttpHeaders({
            [this._HEADER_AUTHORIZATION]: `Basic ${this.getToken()}`,
            [this._HEADER_WWW_AUTHENTICATE]: `Basic realm=${this.getRealm()}`
        });
    }

    // TODO: quando implementar o token. será alterado
    public login(email: string, password: string): Observable<User> {

        this._token = btoa(`${email}:${password}`)

        return this.http.post<User>(
            `${this._URL}/login`,
            { email, password } as User,
            { headers: this.authHeaders() }
        ).pipe(
            tap(user => {
                this._isAuthenticated = true;
                this._loggedUser = new User(user);
                return of(user);
            }),
            catchError(error => {
                this.setLogOutProperties();
                return throwError(error);
            })
        );
    }

    // TODO: quando implementar o token. será alterado
    public logout(): Observable<void> {
        return this.http.get<void>(`${this._URL}/logout`, { headers: this.authHeaders() })
        .pipe(
            tap(user => {
                this.setLogOutProperties();
                return of(user);
            }),
            catchError(error => {
                this.setLogOutProperties();
                return throwError(error);
            })
        );
    }

    private setLogOutProperties() {
        this._isAuthenticated = false;
        this._loggedUser = null;
        this._token = null;
    }

    public getToken(): string { return this._token; }

    public getRealm(): string { return environment.server.realm; }

    public isAuthenticated(): boolean { return this._isAuthenticated; }

    public loggedUser(): User { return this._loggedUser; }

}
