import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
    private BASE_URL: string = 'http://localhost:8080';
    private headers = new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    constructor(private http: Http) {}

    login(user, type): Promise<any> {
        let url: string;
        if(type === "Customer") {
            url = `${this.BASE_URL}/customer/login`;
        } else {
            url = `${this.BASE_URL}/admin/login`;
        }
        return this.http.post(url, user, {headers: this.headers}).toPromise();
    }
    register(user): Promise<any> {
        let url: string = `${this.BASE_URL}/requests/new_customer`;
        return this.http.post(url, user, {headers: this.headers}).toPromise();
    }
    ensureAuthenticated(data): Promise<any> {
        let url: string = `${this.BASE_URL}/token/check`;
        return this.http.post(url, data, {headers: this.headers}).toPromise();
    }
}