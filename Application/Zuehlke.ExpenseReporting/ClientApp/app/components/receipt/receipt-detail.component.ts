import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription }       from 'rxjs/Subscription';

import { Receipt } from './receipt';
import { ReceiptService } from './receipt.service';

@Component({
    template: require('./receipt-detail.component.html')
})
export class ReceiptDetailComponent implements OnInit, OnDestroy {

    receipt: Receipt;
    errorMessage: string;
    private sub: Subscription;

    constructor(private route: ActivatedRoute, private router: Router, private receiptService: ReceiptService) {}

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
        this.receiptService.getReceipt(id)
            .subscribe(receipt => this.receipt = receipt, error => this.errorMessage = <any>error);
    }

    goBack(): void {
        this.router.navigate(['/overview']);
    }

}