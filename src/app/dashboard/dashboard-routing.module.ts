import { RouterModule, Routes }  from '@angular/router';

import { AccountsComponent } from './accounts/accounts.component';
import { StatementComponent } from './statement/statement.component';
import { TransactionComponent } from './transaction/transaction.component';
import { RequestsComponent } from './requests/requests.component';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';

export const dashboardRoutes: Routes = [
  { path: 'accounts', component: AccountsComponent },
  { path: 'statement', component: StatementComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'exchange-rate', component: ExchangeRateComponent }
];