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
    
    // Exercise 4

    // TODO: add method to get an expense with a specific id
    // Hint: use getExpenses() method and search for the expense with the wanted id - no changes in the backend are necessary for that


    // TODO: finish the implementation for the updateExpense method
    updateExpense(expense: Expense): Observable<Response> {
        const dtoExpense = JSON.parse(JSON.stringify(expense));
        dtoExpense.date = this.convertDateToString(expense.date);

        // make a http put request. Hint: you can use JSON.stringify(...) to get a JSON representation of the dtoExpense
        return null;
    }

    deleteExpense(expense: Expense): Observable<Response> {
        const url = `${this.expenseUrl}/${expense.id}`;

        return this.http.delete(url, { headers: this.headers, body: "" });
    }

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

    private convertDateToString(date: string) : string {
        const day = date.substring(8, 10);
        const month = date.substring(5, 7);
        const year = date.substring(0, 4);

        return day + '.' + month + '.' + year;
    }

    private handleError(error: Response) : Observable<any> {
        console.error(error);
        return Observable.throw(error);
    }

}
