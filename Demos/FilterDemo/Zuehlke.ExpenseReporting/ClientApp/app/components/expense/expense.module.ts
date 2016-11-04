import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { productRouting } from './expense.routing';

import { ExpenseOverviewComponent } from './overview/expense-overview.component';

@NgModule({
    imports: [
        FormsModule, CommonModule, productRouting
    ],
    declarations: [
        ExpenseOverviewComponent 

    ],
    providers: [
    ]
})
export class ExpenseModule { }