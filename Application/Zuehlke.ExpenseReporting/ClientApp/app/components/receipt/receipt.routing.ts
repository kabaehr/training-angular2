import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { ReceiptOverviewComponent } from './receipt-overview.component';
import { ReceiptDetailComponent } from './receipt-detail.component';
import { ReceiptAddComponent } from './receipt-add.component';

export const productRoutes: Routes = [
  { path: 'overview', component: ReceiptOverviewComponent },
  { path: 'receipt/add', component: ReceiptAddComponent },
  { path: 'receipt/:id', component: ReceiptDetailComponent }
  
];

export const productRouting: ModuleWithProviders = RouterModule.forChild(productRoutes);
