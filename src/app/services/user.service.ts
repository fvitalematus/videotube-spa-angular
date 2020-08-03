import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }

    prueba() {
        return "Hola mundo desde el servicio de angular";
    }

    register(user): Observable<any> {

        // Convertir el objeto del usuario a un json string
        let json = JSON.stringify(user);
        let params = 'json=' + json;

        // Definir las cabezeras
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        // Hacer petición ajax
        return this._http.post(this.url + 'register', params, { headers: headers });
    }
}