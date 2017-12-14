import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator, MatTableDataSource, MatSnackBar, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BankService } from './../../bank.service';

@Component({
  selector: 'request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
    @Input("adminId") adminId: number;
    requestsDisplayedColumns = ['id', 'type', 'status', 'admin', 'createdDate', 'actions'];
    requests: Request[];
    requestsSource = null;

    @ViewChild(MatPaginator) requestsPaginator: MatPaginator;
    @ViewChild(MatSort) requestsSort: MatSort;

    constructor(private bankService: BankService, public snackBar: MatSnackBar, public router: Router, public dialog: MatDialog) {}

    ngOnInit() {
        this.getRequests();
    }

    getRequests() {
        this.bankService.getAllRequests().then((results) => {
            this.requests = results.json();
            this.requestsSource = new MatTableDataSource<Request>(this.requests);
            this.requestsSource.paginator = this.requestsPaginator;
            this.requestsSource.sort = this.requestsSort;
        });
    }

    verifyRequest(requestId) {
        let payload = {
            "requestId": requestId
        };
        this.bankService.verifyRequest(payload).then((results) => {
            this.getRequests();
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
