import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { productRouting } from './expense.routing';
import { ExpenseOverviewComponent } from './expense-overview.component';
import { ExpenseDetailComponent } from './expense-detail.component';
import { ExpenseAddComponent } from './expense-add.component';
import { ExpenseFilterPipe } from './expense-filter.pipe';
import { ExpenseService } from './expense.service';
import { ExpenseFormComponent } from './expense-form.component';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    productRouting
  ],
  declarations: [
    ExpenseOverviewComponent,
    ExpenseDetailComponent,
    ExpenseFormComponent,
    ExpenseAddComponent,
    ExpenseFilterPipe
  ],
  providers: [
    ExpenseService
  ]
})
export class ExpenseModule { }

