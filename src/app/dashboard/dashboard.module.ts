import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

import { DashboardComponent } from './dashboard.component';

import { AccountsComponent } from './accounts/accounts.component';
import { StatementComponent } from './statement/statement.component';
import { TransactionComponent } from './transaction/transaction.component';
import { RequestsComponent } from './requests/requests.component';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';

import { AddItemDialog } from './dialog/add-item/add-item.dialog';
import { CreateRequestDialog } from './dialog/create-request/create-request.dialog';

import { AuthService } from './../auth.service';
import { BankService } from './../bank.service';

@NgModule({
  declarations: [
    DashboardComponent,
    AccountsComponent,
    StatementComponent,
    TransactionComponent,
    RequestsComponent,
    ExchangeRateComponent,
    AddItemDialog,
    CreateRequestDialog
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,

    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule
  ],
  providers: [
    AuthService,
    BankService
  ],
  bootstrap: [DashboardComponent],
  entryComponents: [
    AddItemDialog,
    CreateRequestDialog
  ]
})
export class DashboardModule { }
