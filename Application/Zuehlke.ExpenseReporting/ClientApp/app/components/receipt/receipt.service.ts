import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Receipt } from './receipt';

@Injectable()
export class ReceiptService {
    private receiptUrl = 'api/expenses';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getReceipts(): Observable<Receipt[]> {
        return this.http.get(this.receiptUrl)
            .map(this.mapReceipts)
            .catch(this.handleError);
    }

    getReceipt(id: string): Observable<Receipt> {
        return this.getReceipts()
            .map((receipts: Receipt[]) => receipts.find(p => p.id === id));
    }

    createReceipt(receipt: Receipt): Observable<Receipt> {
        let dtoReceipt = JSON.parse(JSON.stringify(receipt));
        dtoReceipt.date = this.convertDateToString(receipt.date);

        return this.http.post(this.receiptUrl, JSON.stringify(dtoReceipt), { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    updateReceipt(receipt: Receipt): Observable<Response> {
        const url = `${this.receiptUrl}/${receipt.id}`;
  
        let dtoReceipt = JSON.parse(JSON.stringify(receipt));
        dtoReceipt.date = this.convertDateToString(receipt.date);

        return this.http.put(url, JSON.stringify(dtoReceipt), { headers: this.headers });
    }

    deleteReceipt(receipt: Receipt): Observable<Response> {
        const url = `${this.receiptUrl}/${receipt.id}`
        return this.http.delete(url, { headers: this.headers, body: "" });
    }

    private mapReceipts(response: Response) {
        let mappedReceipts = response.json() || [];
        let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        mappedReceipts.forEach((receipt: any) => {
            let dateArray = receipt.date.split(".");
            let theDate = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
            let finalDate = new Date(theDate.getTime() - tzoffset);
            receipt.date = finalDate.toISOString().slice(0, 10);
        });

        return mappedReceipts;
    }

    private convertDateToString(date: string) : string {
        let day = date.substring(8, 10);
        let month = date.substring(5, 7);
        let year = date.substring(0, 4);

        return day + '.' + month + '.' + year;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }
}
