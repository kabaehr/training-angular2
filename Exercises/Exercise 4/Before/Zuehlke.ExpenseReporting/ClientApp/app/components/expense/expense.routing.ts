import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { ExpenseOverviewComponent } from './overview/expense-overview.component';
import { ExpenseDetailComponent } from './detail/expense-detail.component';

export const productRoutes: Routes = [
    { path: 'overview', component: ExpenseOverviewComponent }
    // Exercise 4
    // TODO add a new path for the ExpenseDetailComponent. Use a variable id.
];

export const productRouting: ModuleWithProviders = RouterModule.forChild(productRoutes);
