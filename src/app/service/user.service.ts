import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../domain/user';
import { Page } from '../domain/page';
import { Pageable } from '../domain/pageable';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../domain/constants';


@Injectable()
export class UserService {

    private readonly URL: string = '/api/users';

    constructor(private http: HttpClient) { }

    public save(user: User): Observable<User> {
        return this.http.post<User>(this.URL, user);
    }

    public update(user: User): Observable<User> {
        return this.http.put<User>(this.URL, user);
    }

    public findById(id: number): Observable<User> {
        return this.http.get<User>(`${this.URL}/${id}`);
    }

    public deleteById(id: number): Observable<void> {
        return this.http.delete<void>(`${this.URL}/${id}`);
    }

    public findByNameStartingWith(name?: string, pageable?: Pageable): Observable<Page<User>> {
        const params: HttpParams = new HttpParams({
            fromObject: {
                name: name ? name : '',
                pageNumber: String(pageable ? pageable.pageNumber : DEFAULT_PAGE_NUMBER),
                pageSize: String(pageable ? pageable.pageSize : DEFAULT_PAGE_SIZE),
            }
        });

        return this.http.get<Page<User>>(`${this.URL}/name`, { params });
    }

    public findByEmailStartingWith(email?: string, pageable?: Pageable): Observable<Page<User>> {
        const params: HttpParams = new HttpParams({
            fromObject: {
                email: email ? email : '',
                pageNumber: String(pageable ? pageable.pageNumber : DEFAULT_PAGE_NUMBER),
                pageSize: String(pageable ? pageable.pageSize : DEFAULT_PAGE_SIZE),
            }
        });

        return this.http.get<Page<User>>(`${this.URL}/email`, { params });
    }

}
