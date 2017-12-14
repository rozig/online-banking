import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator, MatTableDataSource, MatSnackBar, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AddItemDialog } from './../dialog/add-item/add-item.dialog';

import { BankService } from './../../bank.service';

@Component({
    selector: 'accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  @Input("customerId") customerId: number;
    accountsDisplayedColumns = ['accountId', 'accountName', 'balance', 'isDefault', 'isActivated', 'maturityDate', 'interestRate'];
    accountBookDisplayedColumns = ['id', 'itemName', 'account', 'actions'];
    accounts: Account[];
    accountBook: AccountBookItem[];
    accountsSource = null;
    accountBookSource = null;
    customerInfo = null;
    accountBookId: string;
    type: string = "customer";
    childContent: string = "account-list";

    @ViewChild(MatPaginator) accountsPaginator: MatPaginator;
    @ViewChild(MatSort) accountsSort: MatSort;
    @ViewChild(MatPaginator) accountBookPaginator: MatPaginator;
    @ViewChild(MatSort) accountBookSort: MatSort;

    constructor(private bankService: BankService, public snackBar: MatSnackBar, public router: Router, public dialog: MatDialog) {}

    ngOnInit() {
      this.getAccountList(this.customerId);
      this.getAccountBook(this.customerId);
    }

    getAccountList(customerId) {
        let data = {
            "customerId": customerId
        };
        this.bankService.getAccountList(data).then((results) => {
            if(results.json().code === 614) {
              this.customerInfo = {
                "id": results.json().data.customer.id,
                "firstName": results.json().data.customer.firstname,
                "lastName": results.json().data.customer.lastname,
                "email": results.json().data.customer.email,
                "phoneNumber": results.json().data.customer.phoneNumber,
                "dateOfBirth": results.json().data.customer.dateOfBirth,
                "ssn": results.json().data.customer.ssn,
                "isActivated": results.json().data.customer.isActivated,
                "creditScore": results.json().data.customer.creditScore,
                "monthlyIncome": results.json().data.customer.monthlyIncome
              };
              this.accounts = results.json().data.customer.accountSet;
              this.accountsSource = new MatTableDataSource<Account>(this.accounts);
              this.accountsSource.paginator = this.accountsPaginator;
              this.accountsSource.sort = this.accountsSort;
            }
        });
    }

    getAccountBook(customerId) {
        let data = {
            "customerId": customerId
        };
        this.bankService.getAccountBook(data).then((results) => {
            if(results.json().items) {
              this.accountBook = results.json().items;
              this.accountBookId = results.json().id;
              this.accountBookSource = new MatTableDataSource<AccountBookItem>(this.accountBook);
              this.accountBookSource.paginator = this.accountBookPaginator;
              this.accountBookSource.sort = this.accountBookSort;
            }
        });
    }

    openAddItemDialog() {
        let dialogRef = this.dialog.open(AddItemDialog, {
            width: '350px',
            height: '280px',
            data: { "customerId": this.customerId }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.getAccountBook(this.customerId);
        });
    }

    deleteItem(itemId) {
      let payload = {
        "itemId": itemId
      };
      this.bankService.deleteAccountBookItem(payload).then((results) => {
        if(results.json().code === 422) {
          this.getAccountBook(this.customerId);
          this.snackBar.open("Item deleted successfully", "", { duration: 2000 });
        }
      });
    }
}

export interface Account {
  accountId: number;
  accountName: string;
  balance: number;
  accountOpenDate: string;
  customer: number;
  savingAccount: object;
  isDefault: string;
  isActivated: string;
}

export interface AccountBookItem {
  id: number,
  itemName: string;
  account: string;
  accountBook: number;
}