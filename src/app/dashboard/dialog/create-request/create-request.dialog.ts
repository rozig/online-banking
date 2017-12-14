import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA} from '@angular/material';

import { BankService } from './../../../bank.service';

@Component({
  selector: 'create-request-dialog',
  templateUrl: './create-request.dialog.html',
  styleUrls: ['./create-request.dialog.scss']
})
export class CreateRequestDialog implements OnInit {
    isLoaded: boolean = false;
    requestType: string = "CloseAccount";
    selectedAccount: string;
    accountList: any;
  constructor(private bankService: BankService, public snackBar: MatSnackBar, private dialogRef: MatDialogRef<CreateRequestDialog>, @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit() {
      this.getAccountList(this.dialogData.customerId);
  }

  getAccountList(customerId) {
      let payload = {
          "customerId": customerId
      };
      this.bankService.getAccountsForFilter(payload).then((results) => {
          this.accountList = results.json();
          this.isLoaded = true;
      });
  }

  submit() {
      let payload;
      if(this.requestType === "CloseAccount") {
        payload = {
            "customerId": this.dialogData.customerId,
            "requestType": this.requestType,
            "accountId": this.selectedAccount
        };
      } else {
        payload = {
          "customerId": this.dialogData.customerId,
          "requestType": this.requestType
        }
      }
      this.bankService.createRequest(payload).then((results) => {
          if(results.json().code === 215) {
              this.snackBar.open('Successfully created "' + this.requestType + '" request.', '', { duration: 2000 });
              this.dialogRef.close(payload);
          } else {
              this.snackBar.open(results.json().data.message, '', { duration: 2000 });
          }
      });
  }
}
