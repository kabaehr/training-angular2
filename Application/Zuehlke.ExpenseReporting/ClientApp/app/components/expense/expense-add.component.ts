import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: require('./expense-add.component.html')
})
export class ExpenseAddComponent {

    constructor(private router: Router) {}

    goBack(): void {
        this.router.navigate(['/overview']);
    }

}