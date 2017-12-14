import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA} from '@angular/material';

import { BankService } from './../../../bank.service';

@Component({
  selector: 'add-item-dialog',
  templateUrl: './add-item.dialog.html',
  styleUrls: ['./add-item.dialog.scss']
})
export class AddItemDialog implements OnInit {
  itemName: string;
  accountNumber: number;
  constructor(private bankService: BankService, public snackBar: MatSnackBar, private dialogRef: MatDialogRef<AddItemDialog>, @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit() {
  }

  submit() {
      let payload = {
          "itemName": this.itemName,
          "accountId": this.accountNumber,
          "customerId": this.dialogData.customerId
      };
      this.bankService.addAccountBookItem(payload).then((results) => {
          if(results.json().code === 411) {
              this.snackBar.open('Successfully added item to the account book', '', { duration: 2000 });
              this.dialogRef.close(payload);
          } else {
              this.snackBar.open(results.json().data.message, '', { duration: 2000 });
          }
      });
  }

}
