import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Expense } from '../model/expense';

@Injectable()
export class ExpenseService {

    private expenseUrl = 'api/expenses';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getExpenses(): Observable<Expense[]> {
        return this.http.get(this.expenseUrl)
            .map(this.mapExpenses)
            .catch(this.handleError);
    }

    // Exercise 3
    // TODO add a service method that deletes an expense
    // Hint: use this.http.delete(url, headers) 


    private mapExpenses(response: Response) : any {
        const mappedExpenses = response.json() || [];
        const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        mappedExpenses.forEach((expense: any) => {
            const dateArray = expense.date.split(".");
            const theDate = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
            const finalDate = new Date(theDate.getTime() - tzoffset);
            expense.date = finalDate.toISOString().slice(0, 10);
        });

        return mappedExpenses;
    }

    private handleError(error: Response) : Observable<any> {
        console.error(error);
        return Observable.throw(error);
    }

}
