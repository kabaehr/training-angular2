import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { ExpenseOverviewComponent } from './expense-overview.component';
import { ExpenseDetailComponent } from './expense-detail.component';
import { ExpenseAddComponent } from './expense-add.component';

export const productRoutes: Routes = [
  { path: 'overview', component: ExpenseOverviewComponent },
  { path: 'expense/add', component: ExpenseAddComponent },
  { path: 'expense/:id', component: ExpenseDetailComponent }
  
];

export const productRouting: ModuleWithProviders = RouterModule.forChild(productRoutes);
