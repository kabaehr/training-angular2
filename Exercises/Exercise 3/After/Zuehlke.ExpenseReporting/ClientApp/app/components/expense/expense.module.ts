import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { productRouting } from './expense.routing';
import { ExpenseOverviewComponent } from './overview/expense-overview.component';
import { ExpenseFilterPipe } from './pipes/expense-filter.pipe';
import { ExpenseService } from './services/expense.service';

@NgModule({
  imports: [
      FormsModule, CommonModule, productRouting
  ],
  declarations: [
    ExpenseOverviewComponent,
    ExpenseFilterPipe
  ],
  providers: [
    ExpenseService
  ]
})
export class ExpenseModule { }

