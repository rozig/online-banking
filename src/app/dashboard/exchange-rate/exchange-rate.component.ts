import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator, MatTableDataSource, MatSnackBar, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BankService } from './../../bank.service';

@Component({
  selector: 'exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss']
})
export class ExchangeRateComponent implements OnInit {
    @Input("customerId") customerId: number;
    ratesDisplayedColumns = ['id', 'currencyCode', 'saleRate', 'buyRate', 'date'];
    rates: Rate[];
    ratesSource = null;

    @ViewChild(MatPaginator) ratesPaginator: MatPaginator;
    @ViewChild(MatSort) ratesSort: MatSort;

    constructor(private bankService: BankService, public snackBar: MatSnackBar, public router: Router) {}

    ngOnInit() {
        this.getExchangeRate();
    }

    getExchangeRate() {
        this.bankService.getExchangeRate().then((results) => {
              this.rates = results.json();
              this.ratesSource = new MatTableDataSource<Rate>(this.rates);
              this.ratesSource.paginator = this.ratesPaginator;
              this.ratesSource.sort = this.ratesSort;
        });
    }
}

export interface Rate {
    id: number;
    currencyCode: string;
    saleRate: number;
    buyRate: number;
    date: string;
}
