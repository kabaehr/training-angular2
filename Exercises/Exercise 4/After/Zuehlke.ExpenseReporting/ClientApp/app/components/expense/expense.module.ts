import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { productRouting } from './expense.routing';
import { ExpenseOverviewComponent } from './overview/expense-overview.component';
import { ExpenseDetailComponent } from './detail/expense-detail.component';
import { ExpenseFilterPipe } from './pipes/expense-filter.pipe';
import { ExpenseService } from './services/expense.service';
import { ExpenseFormComponent } from './form/expense-form.component';

@NgModule({
  imports: [
      FormsModule, CommonModule, productRouting
  ],
  declarations: [
    ExpenseOverviewComponent,
    ExpenseDetailComponent,
    ExpenseFormComponent,
    ExpenseFilterPipe
  ],
  providers: [
    ExpenseService
  ]
})
export class ExpenseModule { }

