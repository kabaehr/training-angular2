import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Expense } from '../model/expense';
import { ExpenseService } from '../services/expense.service';

@Component({
    selector: 'expense-form',
    template: require('./expense-form.component.html')
})
export class ExpenseFormComponent {

    @Input() expense: Expense = new Expense(null, null, null, null, null, null); //empty (new) expense

    constructor(private router: Router, private expenseService: ExpenseService) { }

    save(): void {
        // Exercise 5
        // TODO extend the save method to also handle the creation of new expenses. Delegate the actual creation to the service.
        this.expenseService.updateExpense(this.expense)
            .subscribe(() => { this.navigateToOverview() }, error => { this.handleError(error) });

    }

    private navigateToOverview(): void {
        this.router.navigate(['/overview']);
    }

    private handleError(error: any): Observable<any> {
        console.error('Error with expense: ' + this.expense);
        return Observable.throw(error);
    }

}