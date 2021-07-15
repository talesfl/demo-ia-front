import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Email } from '../domain/email';

@Injectable()
export class EmailKafkaService {
  
  private readonly _URL: string = `${environment.server.contextPathKafka}`;
  constructor(private httpClient: HttpClient) { }


  public dispatchAdminEmail(email: Email): Observable<void> {
    return this.httpClient.put<void>(`${this._URL}/publish-admin`, email);
  }

  public dispatchUserEmail(email: Email): Observable<void> {
    return this.httpClient.put<void>(`${this._URL}/publish-user`, email);
  }

}
