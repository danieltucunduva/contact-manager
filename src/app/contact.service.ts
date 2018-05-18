import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Identifiers } from '@angular/compiler';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { Observable } from 'rxjs';
import { IContact } from './icontact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: Http) { }

  list(): Observable<any> {
    return this.http.get('http://localhost:3000/api/contacts');
  }

  view(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/contacts/${id}`);
  }

  save(id: string, contact: IContact): Observable<any> {
    return this.http.post(`http://localhost:3000/api/contacts/${id}`, contact);
  }

  add(contact: IContact): Observable<any> {
    return this.http.post(`http://localhost:3000/api/contacts`, contact);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/contacts/${id}`);
  }
}
