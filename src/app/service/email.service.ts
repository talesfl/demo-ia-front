import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Email } from '../domain/email';
import { Page } from '../domain/page';
import { Pageable } from '../domain/pageable';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../domain/constants';


@Injectable()
export class EmailService {

    private readonly URL: string = '/api/emails';

    constructor(private http: HttpClient) { }

    public dispatchEmail(email: Email): Observable<Email> {
        return this.http.post<Email>(this.URL, email);
    }

    public findById(id: number): Observable<Email> {
        return this.http.get<Email>(`${this.URL}/${id}`);
    }

    public findByUserFromId(userId: number, pageable?: Pageable): Observable<Page<Email>> {
        const params: HttpParams = new HttpParams({
            fromObject: {
                userId,
                pageNumber: String(pageable ? pageable.pageNumber : DEFAULT_PAGE_NUMBER),
                pageSize: String(pageable ? pageable.pageSize : DEFAULT_PAGE_SIZE),
            }
        });

        return this.http.get<Page<Email>>(this.URL, { params });
    }

}
