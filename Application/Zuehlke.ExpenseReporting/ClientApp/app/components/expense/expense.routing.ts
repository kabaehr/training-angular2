import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { ExpenseOverviewComponent } from './overview/expense-overview.component';
import { ExpenseDetailComponent } from './detail/expense-detail.component';
import { ExpenseAddComponent } from './add/expense-add.component';

export const productRoutes: Routes = [
  { path: 'overview', component: ExpenseOverviewComponent },
  { path: 'expense/add', component: ExpenseAddComponent },
  { path: 'expense/:id', component: ExpenseDetailComponent }
  
];

export const productRouting: ModuleWithProviders = RouterModule.forChild(productRoutes);
