import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { AuthService } from './../auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    ssn: string;
    dateOfBirth: string;
    monthlyIncome: number;
    creditScore: number;

    constructor(private authService: AuthService, private router: Router, public snackBar: MatSnackBar) { }

    ngOnInit() {}

    register() {
        let user = {
            "firstName": this.firstName,
            "lastName": this.lastName,
            "emailId": this.email,
            "mobileNum": this.phoneNumber,
            "ssn": this.ssn,
            "dateOfBirth": this.dateOfBirth,
            "monthlyIncome": this.monthlyIncome,
            "creditScore": this.creditScore
        };
        this.authService.register(user).then((data) => {
            if(data.json().code === 224) {
                this.snackBar.open(data.json().data.message, '', {
                    duration: 2000
                });
                this.router.navigate(['/login']);
            } else {
                this.snackBar.open(data.json().data.message, '', {
                    duration: 2000
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }
}
