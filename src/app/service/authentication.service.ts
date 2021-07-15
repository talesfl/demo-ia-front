import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, concatMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

import { User } from "../domain/user";


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    
    private readonly _X_AUTH_TOKEN: string = 'x-auth-token';
    private readonly _URL: string = `${environment.server.contextPath}/authentications`;
    
    private _authToken: string;

    private _isAuthenticated: boolean = false;
    private _loggedUser: User;
    
    constructor(private http: HttpClient) { }

    public tokenHeader(): HttpHeaders {
        return new HttpHeaders({
            [this._X_AUTH_TOKEN]: this.getAuthToken(),
            'Cache-control': 'no-cache, no-store, max-age=0, must-revalidate'
        });
    }

    public login(email: string, password: string): Observable<User> {

        return this.http.options(`${this._URL}/login`, { 
            headers: { 
                'Authorization': `Basic ${btoa(`${email}:${password}`)}`,
                'WWW-Authenticate': `Basic realm=${this.getRealm()}`,
                'Cache-control': 'no-cache, no-store, max-age=0, must-revalidate'
            },
            observe: 'response' 
        }).pipe(
                concatMap(res => {
                    this._authToken = res.headers.get(this._X_AUTH_TOKEN);
                    return this.http.post<User>(
                        `${this._URL}/login`,
                        { email, password },
                        { headers: this.tokenHeader() }
                    );
                }),
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

    public logout(): Observable<void> {
        return this.http.get<void>(`${this._URL}/logout`, { headers: this.tokenHeader() })
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
        this._authToken = null;
    }

    private getAuthToken(): string { return this._authToken; }

    public getRealm(): string { return environment.server.realm; }

    public isAuthenticated(): boolean { return this._isAuthenticated; }

    public loggedUser(): User { return this._loggedUser; }

}
