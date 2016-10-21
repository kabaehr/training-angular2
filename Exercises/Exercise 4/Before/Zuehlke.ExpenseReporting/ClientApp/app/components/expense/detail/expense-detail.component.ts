import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }       from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Expense } from '../model/expense';
import { ExpenseService } from '../services/expense.service';

@Component({
    template: require('./expense-detail.component.html')
})
export class ExpenseDetailComponent implements OnInit, OnDestroy {

    expense: Expense;
    private sub: Subscription;

    constructor(private route: ActivatedRoute, private router: Router, private expenseService: ExpenseService) {}

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                const id = params['id'];
                // Exercise 4
                // TODO load and set the expense with the provided id from the route
                // Hint: use the expense service to achieve that
            });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    goBack(): void {
        this.router.navigate(['/overview']);
    }

}