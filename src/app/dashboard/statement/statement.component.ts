import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator, MatTableDataSource, MatSnackBar, MatSort } from '@angular/material';

import { BankService } from './../../bank.service';

@Component({
  selector: 'statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit {
    @Input('customerId') customerId: number;
    statementDisplayedColumns = ['transactionId', 'channelId', 'amount', 'creditAccount', 'debitAccount', 'transactionDate'];
    selectedAccount: string;
    startDate: string;
    endDate: string;
    accountList = null;
    statement: Statement[];
    statementSource = null;
    fetchComplete: boolean = false;

    @ViewChild(MatPaginator) statementPaginator: MatPaginator;
    @ViewChild(MatSort) statementSort: MatSort;

  constructor(private bankService: BankService, public snackBar: MatSnackBar, public router: Router) { }

  ngOnInit() {
      this.getAccountList(this.customerId);
  }

  getAccountList(customerId) {
      let payload = {
          "customerId": customerId
      };
      this.bankService.getAccountsForFilter(payload).then((results) => {
          this.accountList = results.json();
      });
  }

  getStatement() {
      let payload = {
          "accountId": this.selectedAccount,
          "fromDate": this.startDate,
          "toDate": this.endDate
      };
      this.bankService.getStatements(payload).then((results) => {
          this.statement = results.json();
          this.fetchComplete = true;
          this.statementSource = new MatTableDataSource<Statement>(this.statement);
          this.statementSource.paginator = this.statementPaginator;
          this.statementSource.sort = this.statementSort;
      });
  }
}

export interface Statement {
    amount: number;
    channelId: string;
    creditAccount: number;
    debitAccount: number;
    transactionDate: string;
    transactionId: number;
}