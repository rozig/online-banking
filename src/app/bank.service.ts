import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BankService {
    private BASE_URL: string = 'http://localhost:8080';
    private headers = new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    constructor(private http: Http) {}

    getAccountList(payload): Promise<any> {
        let url: string = `${this.BASE_URL}/customer/details`;
        return this.http.post(url, payload, {headers: this.headers}).toPromise();
    }

    getAccountsForFilter(payload): Promise<any> {
        let url: string = `${this.BASE_URL}/account/list`;
        return this.http.post(url, payload, {headers: this.headers}).toPromise();
    }

    getStatements(payload): Promise<any> {
        let url: string = `${this.BASE_URL}/statement`;
        return this.http.post(url, payload, {headers: this.headers}).toPromise();
    }

    makeTransaction(payload): Promise<any> {
        let url: string = `${this.BASE_URL}/transaction`;
        return this.http.post(url, payload, {headers: this.headers}).toPromise();
    }

    getAccountBook(payload): Promise<any> {
        let url: string = `${this.BASE_URL}/account_book/fetch_by_customer`;
        return this.http.post(url, payload, {headers: this.headers}).toPromise();
    }

    addAccountBookItem(payload): Promise<any> {
        let url: string = `${this.BASE_URL}/account_book/add_to_account_book`;
        return this.http.post(url, payload, {headers: this.headers}).toPromise();
    }

    getRequests(payload): Promise<any> {
        let url: string = `${this.BASE_URL}/requests/list`;
        return this.http.post(url, payload, {headers: this.headers}).toPromise();
    }

    getExchangeRate(): Promise<any> {
        let url: string = `${this.BASE_URL}/currency/fetch_latest`;
        return this.http.post(url, null, {headers: this.headers}).toPromise();
    }

    createRequest(payload): Promise<any> {
        let url: string = `${this.BASE_URL}/requests/account`;
        return this.http.post(url, payload, {headers: this.headers}).toPromise();
    }

    deleteAccountBookItem(payload): Promise<any> {
        let url: string = `${this.BASE_URL}/account_book/deleteItem`;
        return this.http.post(url, payload, {headers: this.headers}).toPromise();
    }

    deleteRequest(payload): Promise<any> {
        let url: string = `${this.BASE_URL}/requests/deleteRequest`;
        return this.http.post(url, payload, {headers: this.headers}).toPromise();
    }

    getAllRequests(): Promise<any> {
        let url: string = `${this.BASE_URL}/requests/all_list`;
        return this.http.post(url, {}, {headers: this.headers}).toPromise();
    }

    verifyRequest(payload): Promise<any> {
        let url: string = `${this.BASE_URL}/requests/verify`;
        return this.http.post(url, payload, {headers: this.headers}).toPromise();
    }

    updateCurrencyRate(payload): Promise<any> {
        let url: string = `${this.BASE_URL}/currency/update_currency_rate`;
        return this.http.post(url, payload, {headers: this.headers}).toPromise();
    }
}