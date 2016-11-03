import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';

import { RouterStub } from '../../../../utils/testutils';

import { ExpenseAddComponent } from './expense-add.component';
import { ExpenseFormComponent } from '../form/expense-form.component';
import { ExpenseService } from '../services/expense.service';

describe('ExpenseDetailComponent', () => {

    let expenseAddComponent: ExpenseAddComponent;
    let fixture: ComponentFixture<ExpenseAddComponent>;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule, HttpModule],
            declarations: [ExpenseAddComponent, ExpenseFormComponent],
            providers: [ExpenseService, { provide: Router, useClass: RouterStub }]
        });

        fixture = TestBed.createComponent(ExpenseAddComponent);
        expenseAddComponent = fixture.componentInstance;
    });

    it('should navigate to overview when back button is clicked', inject([Router], (router: Router) => {
        fixture.detectChanges();

        const spy = spyOn(router, 'navigate');

        const backButton = fixture.debugElement.query(By.css('.btn-default'));
        backButton.triggerEventHandler('click', null); //click back button

        const routerArguments = spy.calls.first().args[0]; //check that router was called with overview route
        expect(routerArguments).toEqual(['/overview']); 
    }));

});


