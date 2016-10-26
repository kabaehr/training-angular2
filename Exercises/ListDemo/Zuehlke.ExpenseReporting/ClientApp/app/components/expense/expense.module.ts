import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { productRouting } from './expense.routing';
import { ExpenseService } from './services/expense.service';

@NgModule({
  imports: [
      FormsModule, CommonModule, productRouting
  ],
  declarations: [


  ],
  providers: [
    ExpenseService
  ]
})
export class ExpenseModule { }

