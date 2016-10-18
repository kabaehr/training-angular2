import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription }       from 'rxjs/Subscription';

import { Expense } from '../model/expense';
import { ExpenseService } from '../services/expense.service';

@Component({
    template: require('./expense-detail.component.html')
})
export class ExpenseDetailComponent implements OnInit, OnDestroy {

    expense: Expense;
    errorMessage: string;
    private sub: Subscription;

    constructor(private route: ActivatedRoute, private router: Router, private expenseService: ExpenseService) {}

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                let id = params['id'];
                this.getTravelTime(id);
            });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    getTravelTime(id: string): void {
        this.expenseService.getExpense(id)
            .subscribe(expense => this.expense = expense, error => this.errorMessage = <any>error);
    }

    goBack(): void {
        this.router.navigate(['/overview']);
    }

}