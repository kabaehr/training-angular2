import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Receipt } from './receipt';
import { ReceiptService } from './receipt.service';

@Component({
    selector: 'receipt-form',
    template: require('./receipt-form.component.html')
})
export class ReceiptFormComponent {

    @Input() receipt: Receipt = new Receipt(null, null, null, null, null, null); //Look for better way to handle this

  constructor(private router: Router, private receiptService: ReceiptService) { }

    save(): void {
        if (!this.receipt.id) {
            this.receiptService.createReceipt(this.receipt)
            .subscribe(response => { this.router.navigate(['/overview']) },
                error => {
                    console.error("Error creating receipt: " + this.receipt);
                    return Observable.throw(error);
                });
        } else {
            this.receiptService.updateReceipt(this.receipt)
                .subscribe(response => { this.router.navigate(['/overview']) },
                error => {
                    console.error("Error updating receipt with id: " + this.receipt.id);
                    return Observable.throw(error);
                });
        }
    }

}