import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Email } from '../domain/email';
import { Page } from '../domain/page';
import { Pageable } from '../domain/pageable';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../domain/constants';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class EmailService {

    private readonly _URL: string = `${environment.server.contextPath}/emails`;

    constructor(private http: HttpClient) { }

    public dispatchEmail(email: Email): Observable<Email> {
        return this.http.post<Email>(this._URL, email);
    }

    public findById(id: number): Observable<Email> {
        return this.http.get<Email>(`${this._URL}/${id}`);
    }

    public findByUserId(userId: number, pageable?: Pageable): Observable<Page<Email>> {
        const params: HttpParams = new HttpParams({
            fromObject: {
                id: userId,
                pageNumber: String(pageable ? pageable.pageNumber : DEFAULT_PAGE_NUMBER),
                pageSize: String(pageable ? pageable.pageSize : DEFAULT_PAGE_SIZE),
            }
        });

        return this.http.get<Page<Email>>(this._URL, { params });
    }

}
