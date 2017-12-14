import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';

import { AuthService } from './../auth.service';
import { BankService } from './../bank.service';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    type: string = "admin";
    isLoaded: boolean = false;
    customerId: number;
    statements = null;
    transactions = null;
    constructor(private authService: AuthService, private bankService: BankService, public snackBar: MatSnackBar, public router: Router) {}

    ngOnInit() {
        const token = localStorage.getItem("adminToken");
        if(token) {
            this.authService.ensureAuthenticated({"token": token, "type": this.type}).then((result) => {
                if(result.json().code === 811) {
                    if(result.json().data.isActive) {
                        this.customerId = result.json().data.userId;
                        this.isLoaded = true;
                    } else {
                        this.snackBar.open(result.json().data.message, '', {
                            duration: 2000
                        });
                        this.router.navigate(["/admin/login"]);
                    }
                } else {
                    this.snackBar.open(result.json().data.message, '', {
                        duration: 2000
                    });
                    this.router.navigate(["/admin/login"]);
                }
            });
        } else {
            this.snackBar.open("You're not logged in", '', {
                duration: 2000
            });
            this.router.navigate(["/admin/login"]);
        }
    }

    logout() {
        localStorage.removeItem("adminToken");
        this.router.navigate(['./admin/login']);
    }

    navigateTo(route: string) {
      route = './admin/' + route;
      this.router.navigate([route]);
    }

}
