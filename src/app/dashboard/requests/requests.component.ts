import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator, MatTableDataSource, MatSnackBar, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CreateRequestDialog } from './../dialog/create-request/create-request.dialog';

import { BankService } from './../../bank.service';

@Component({
  selector: 'requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
    @Input("customerId") customerId: number;
    requestsDisplayedColumns = ['id', 'type', 'status', 'admin', 'createdDate', 'actions'];
    requests: Request[];
    requestsSource = null;

    @ViewChild(MatPaginator) requestsPaginator: MatPaginator;
    @ViewChild(MatSort) requestsSort: MatSort;

    constructor(private bankService: BankService, public snackBar: MatSnackBar, public router: Router, public dialog: MatDialog) {}

    ngOnInit() {
        this.getRequests(this.customerId);
    }

    getRequests(customerId) {
        let data = {
            "customerId": this.customerId
        };
        this.bankService.getRequests(data).then((results) => {
            this.requests = results.json();
            this.requestsSource = new MatTableDataSource<Request>(this.requests);
            this.requestsSource.paginator = this.requestsPaginator;
            this.requestsSource.sort = this.requestsSort;
        });
    }

    openCreateRequestDialog() {
        let dialogRef = this.dialog.open(CreateRequestDialog, {
            width: '350px',
            data: { "customerId": this.customerId }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.getRequests(this.customerId);
        });
    }

    deleteRequest(requestId) {
      let payload = {
        "requestId": requestId
      };
      this.bankService.deleteRequest(payload).then((results) => {
        if(results.json().code === 422) {
          this.getRequests(this.customerId);
          this.snackBar.open("Item deleted successfully", "", { duration: 2000 });
        }
      });
    }
}

export interface Request {
    id: number;
    type: string;
    status: string;
    account: number;
    customer: number;
    admin: number;
    createdDate: string;
}
