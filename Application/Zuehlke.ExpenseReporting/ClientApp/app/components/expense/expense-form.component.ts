import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Expense } from './expense';
import { ExpenseService } from './expense.service';

@Component({
    selector: 'expense-form',
    template: require('./expense-form.component.html')
})
export class ExpenseFormComponent {

    @Input() expense: Expense = new Expense(null, null, null, null, null, null); //Look for better way to handle this

  constructor(private router: Router, private expenseService: ExpenseService) { }

    save(): void {
        if (!this.expense.id) {
            this.expenseService.createExpense(this.expense)
            .subscribe(response => { this.router.navigate(['/overview']) },
                error => {
                    console.error("Error creating expense: " + this.expense);
                    return Observable.throw(error);
                });
        } else {
            this.expenseService.updateExpense(this.expense)
                .subscribe(response => { this.router.navigate(['/overview']) },
                error => {
                    console.error("Error updating expense with id: " + this.expense.id);
                    return Observable.throw(error);
                });
        }
    }

}