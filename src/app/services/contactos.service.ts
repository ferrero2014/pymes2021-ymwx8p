import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Contacto } from '../models/contacto';
@Injectable({ providedIn: 'root' })
export class ContactosService {
  resourceurl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceurl = environment.ConexionWebApiProxy + 'Contactos/';
  }

  get(): Observable<Contacto[]> {
    return this.httpClient.get<Contacto[]>(this.resourceurl);
  }

  post(obj: Contacto) {
    return this.httpClient.post(this.resourceurl, obj);
  }

  put(id: number, obj: Contacto) {
    return this.httpClient.put(`${this.resourceurl}${id}`, obj);
  }
}
