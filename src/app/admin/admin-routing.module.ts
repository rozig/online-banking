import { RouterModule, Routes }  from '@angular/router';

import { RequestComponent } from './request/request.component';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';

export const adminRoutes: Routes = [
    { path: 'requests', component: RequestComponent },
    { path: 'exchange-rate', component: ExchangeRateComponent }
];