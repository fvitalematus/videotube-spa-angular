import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {

    public url: string;
    public identity;
    public token;

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

    signup(user, gettoken = null): Observable<any> {

        // Comprobar si llega el gettoken
        if (gettoken != null) {
            user.gettoken = 'true';
        }

        let json = JSON.stringify(user);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'login', params, { headers: headers });
    }

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity && identity != 'undefined') {
            this.identity = identity;
        } else {
            this.identity = null;
        }
        return this.identity;
    }

    getToken() {
        let token = localStorage.getItem('token');

        if (token && token != 'undefined') {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }
}