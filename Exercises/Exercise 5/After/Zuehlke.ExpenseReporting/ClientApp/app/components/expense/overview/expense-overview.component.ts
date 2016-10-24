import { Component, OnInit }  from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Expense } from '../model/expense';
import { ExpenseService } from '../services/expense.service';

@Component({
    template: require('./expense-overview.component.html'),
    styles: [require('./expense-overview.component.css')]
})
export class ExpenseOverviewComponent implements OnInit {

    expenses: Expense[];
    expenseFilter: string = '';
    errorMessage: string;

    constructor(private expenseService: ExpenseService) { }

    ngOnInit(): void {
        this.expenseService.getExpenses()
            .subscribe(expenses => this.expenses = expenses, error => this.errorMessage = error);
    }

    deleteExpense(expense: Expense) : void {
        this.expenseService.deleteExpense(expense)
            .subscribe(() => { this.expenses = this.expenses.filter(exp => exp.id !== expense.id) },
            error =>  { this.handleError(error, expense) });
    }

    private handleError(error, expense: Expense) : Observable<any> {
        console.error('Error deleting expense with id: ' + expense.id);
        return Observable.throw(error);
    }
}
