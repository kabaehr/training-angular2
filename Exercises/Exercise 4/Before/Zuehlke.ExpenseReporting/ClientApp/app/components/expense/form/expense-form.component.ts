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

    @Input() expense: Expense;

    constructor(private router: Router, private expenseService: ExpenseService) { }

    save(): void {
        // Exercise 4
        // TODO 
    }

    private navigateToOverview(): void {
        this.router.navigate(['/overview']);
    }

    private handleError(error: any): Observable<any> {
        console.error('Error with expense: ' + this.expense);
        return Observable.throw(error);
    }

}