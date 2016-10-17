import { Component, OnInit }  from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Receipt } from './receipt';
import { ReceiptService } from './receipt.service';

@Component({
    template: require('./receipt-overview.component.html'),
    styles: [require('./receipt-overview.component.css')]
})
export class ReceiptOverviewComponent implements OnInit {

    travelTimeFilter: string = '';
    errorMessage: string;
    receipts: Receipt[];

    constructor(private receiptService: ReceiptService) { }

    ngOnInit(): void {
        this.receiptService.getReceipts()
            .subscribe(receipts => this.receipts = receipts, error => this.errorMessage = <any>error);
    }

    deleteReceipt(receipt: Receipt) {
        this.receiptService.deleteReceipt(receipt)
            .subscribe(response => {
                this.receipts = this.receipts.filter(rec => rec.id !== receipt.id);
            },
            error => {
                console.error("Error deleting receipt with id: " + receipt.id);
                return Observable.throw(error);
            });
    }

}
