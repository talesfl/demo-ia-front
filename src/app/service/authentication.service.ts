import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { User } from "../domain/user";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private readonly URL: string = '/api/authentications';

    constructor(private http: HttpClient) { }

    public login(email: string, password: string): Observable<User> {
        return this.http.post<User>(
            `${this.URL}/login`, 
            { email, password },
            { 
                headers: new HttpHeaders()
                .append('Authorization', `Basic ${btoa(email + ':' + password)}`) 
                .append('WWW-Authenticate', 'Basic realm="Realm"') 
            }
        );
    }

    public logout(): Observable<void> {
        return this.http.get<void>(`${this.URL}/logout`);
    }

}
