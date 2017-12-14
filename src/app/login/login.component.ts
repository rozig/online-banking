import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { AuthService } from './../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    email: string;
    password: string;
    type: string = (this.router.url === "/login" ? "Customer" : "Admin");
    constructor(private authService: AuthService, private router: Router, public snackBar: MatSnackBar) {}

    login() {
        let user = {"email": this.email, "password": this.password};
        this.authService.login(user, this.type).then((data) => {
            if(this.type === "Customer") {
                if(data.json().code === 612) {
                    localStorage.setItem('token', data.json().data.token);
                    this.router.navigate(["/dashboard/accounts"]);
                } else {
                    this.snackBar.open(data.json().data.message, '', {
                        duration: 2000
                    });
                }
            } else {
                if(data.json().code === 512) {
                    localStorage.setItem('adminToken', data.json().data.token);
                    this.router.navigate(["/admin/requests"]);
                } else {
                    this.snackBar.open(data.json().data.message, '', {
                        duration: 2000
                    });
                }
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    ngOnInit() {
    }
}