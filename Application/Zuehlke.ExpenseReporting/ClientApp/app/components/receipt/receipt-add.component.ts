import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: require('./receipt-add.component.html')
})
export class ReceiptAddComponent {

    constructor(private router: Router) {}

    goBack(): void {
        this.router.navigate(['/overview']);
    }

}