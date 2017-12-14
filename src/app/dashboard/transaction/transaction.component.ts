import { Component, Input, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material';

import { BankService } from './../../bank.service';

@Component({
    selector: 'transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
    @Input('customerId') customerId;
    accountList = null;
    selectedAccount: string;
    selectedChannel: string;
    creditAccount: string;
    amount: number;
    selectedType: string;
    accountBook: any;
    isAccountBook: boolean;
    selectedAccountBook: any;
    constructor(private bankService: BankService, public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.getAccountList(this.customerId);
        this.getAccountBook(this.customerId);
    }

    getAccountList(customerId) {
        let payload = {
            "customerId": customerId
        };
        this.bankService.getAccountsForFilter(payload).then((results) => {
            this.accountList = results.json();
        });
    }

    getAccountBook(customerId) {
        let data = {
            "customerId": customerId
        };
        this.bankService.getAccountBook(data).then((results) => {
            if(results.json().items) {
                this.accountBook = results.json().items;
            }
        });
    }

    makeTransaction() {
        let payload = null;
        if(this.isAccountBook) {
            payload = {
                "crId": this.selectedAccountBook.account,
                "drAcct": this.selectedAccount,
                "channelId": "ByAccountId",
                "amount": this.amount
            };
        } else {
            payload = {
                "crId": this.creditAccount,
                "drAcct": this.selectedAccount,
                "channelId": this.selectedChannel,
                "amount": this.amount
            };
        }
        this.bankService.makeTransaction(payload).then((results) => {
            this.snackBar.open(results.json().data.message, '', {
                duration: 2000
            });
        });
    }
}
