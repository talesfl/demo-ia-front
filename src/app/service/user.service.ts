import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../domain/user';
import { Page } from '../domain/page';
import { Pageable } from '../domain/pageable';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../domain/constants';
import { environment } from 'src/environments/environment';


@Injectable()
export class UserService {

    private readonly _URL: string = `${environment.server.contextPath}/users`;

    constructor(private http: HttpClient) { }

    public save(user: User): Observable<User> {
        return this.http.post<User>(this._URL, user);
    }

    public update(user: User): Observable<User> {
        return this.http.put<User>(this._URL, user);
    }

    public findById(id: number): Observable<User> {
        return this.http.get<User>(`${this._URL}/${id}`);
    }

    public deleteById(id: number): Observable<void> {
        return this.http.delete<void>(`${this._URL}/${id}`);
    }

    public findByNameStartingWith(name?: string, pageable?: Pageable): Observable<Page<User>> {
        const params: HttpParams = new HttpParams({
            fromObject: {
                name: name ? name : '',
                pageNumber: String(pageable ? pageable.pageNumber : DEFAULT_PAGE_NUMBER),
                pageSize: String(pageable ? pageable.pageSize : DEFAULT_PAGE_SIZE),
            }
        });

        return this.http.get<Page<User>>(`${this._URL}/name`, { params });
    }

    public findByEmailStartingWith(email?: string, pageable?: Pageable): Observable<Page<User>> {
        const params: HttpParams = new HttpParams({
            fromObject: {
                email: email ? email : '',
                pageNumber: String(pageable ? pageable.pageNumber : DEFAULT_PAGE_NUMBER),
                pageSize: String(pageable ? pageable.pageSize : DEFAULT_PAGE_SIZE),
            }
        });

        return this.http.get<Page<User>>(`${this._URL}/email`, { params });
    }

    public updatePassword(user: User): Observable<User> {
        return this.http.put<User>(`${this._URL}/password`, user);
    }
}
