import { Component, OnInit }  from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Expense } from '../model/expense';
import { ExpenseService } from '../services/expense.service';

@Component({
    template: require('./expense-overview.component.html'),
    styles: [require('./expense-overview.component.css')]
})
export class ExpenseOverviewComponent implements OnInit {

    expenseFilter: string = '';
    errorMessage: string;
    expenses: Expense[];

    constructor(private expenseService: ExpenseService) { }

    ngOnInit(): void {
        this.expenseService.getExpenses()
            .subscribe(expenses => this.expenses = expenses, error => this.errorMessage = <any>error);
    }

    deleteExpense(expense: Expense) {
        this.expenseService.deleteExpense(expense)
            .subscribe(response => {
                this.expenses = this.expenses.filter(rec => rec.id !== expense.id);
            },
            error => {
                console.error("Error deleting expense with id: " + expense.id);
                return Observable.throw(error);
            });
    }

}
