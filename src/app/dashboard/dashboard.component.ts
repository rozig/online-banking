import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';

import { AuthService } from './../auth.service';
import { BankService } from './../bank.service';

import { AccountsComponent } from './accounts/accounts.component';
import { StatementComponent } from './statement/statement.component';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    type: string = "customer";
    isLoaded: boolean = false;
    customerId: number;
    statements = null;
    transactions = null;

    constructor(private authService: AuthService, private bankService: BankService, public snackBar: MatSnackBar, public router: Router) {}

    ngOnInit() {
        const token = localStorage.getItem("token");
        if(token) {
            this.authService.ensureAuthenticated({"token": token, "type": this.type}).then((result) => {
                if(result.json().code === 813) {
                    if(result.json().data.isActive) {
                        this.customerId = result.json().data.userId;
                        this.isLoaded = true;
                    } else {
                        this.snackBar.open(result.json().data.message, '', {
                            duration: 2000
                        });
                        this.router.navigate(["/login"]);
                    }
                } else {
                    this.snackBar.open(result.json().data.message, '', {
                        duration: 2000
                    });
                    this.router.navigate(["/login"]);
                }
            });
        } else {
            this.snackBar.open("You're not logged in", '', {
                duration: 2000
            });
            this.router.navigate(["/login"]);
        }
    }

    logout() {
        localStorage.removeItem("token");
        this.router.navigate(['./login']);
    }

    navigateTo(route: string) {
      route = './dashboard/' + route;
      this.router.navigate([route]);
    }
}