import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA} from '@angular/material';

import { BankService } from './../../../bank.service';


@Component({
    selector: 'update-rate',
    templateUrl: './update-rate.dialog.html',
    styleUrls: ['./update-rate.dialog.scss']
})
export class UpdateRateDialog implements OnInit {
    currencyList: any = ["GBP", "CAD", "EUR", "AUD", "CNY", "MNT", "JPY", "RUB", "INR"];
    isLoaded: boolean = false;
    selectedCurrency: string = "MNT";
    buyRate: number;
    sellRate: number;

    constructor(private bankService: BankService, public snackBar: MatSnackBar, private dialogRef: MatDialogRef<UpdateRateDialog>, @Inject(MAT_DIALOG_DATA) public dialogData: any) {}

    ngOnInit() {}

    submit() {
        let payload = {
            "currencyCode": this.selectedCurrency,
            "buyRate": this.buyRate,
            "sellRate": this.sellRate
        };
        this.bankService.updateCurrencyRate(payload).then((results) => {
            if(results.json().code === 511) {
                this.snackBar.open('Successfully updated "' + this.selectedCurrency + '" rate.', '', {duration: 2000});
                this.dialogRef.close();
            } else {
                this.snackBar.open(results.json().data.message, '', { duration: 2000 });
            }
        });
    }

}
