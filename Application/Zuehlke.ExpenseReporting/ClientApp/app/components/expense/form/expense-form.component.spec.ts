import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { RouterStub } from '../../../../utils/testutils';

import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ExpenseFormComponent } from './expense-form.component';
import { ExpenseService } from '../services/expense.service';
import { Expense, Reason } from '../model/expense';

describe('ExpenseFormComponent', () => {
    let expenseFormComponent: ExpenseFormComponent;
    let fixture: ComponentFixture<ExpenseFormComponent>;

    const testExpense = new Expense('1', 'Anakin Skywalker', Reason.Bus, '12.01.2016', 12.22, 'Visiting Mom');
    const newExpense = new Expense(null, 'Palpatine', Reason.Hotel, '12.01.1999', 54.00, 'Reasoning about the dark side of the force');

    let expenseService: ExpenseService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpModule],
            declarations: [ExpenseFormComponent],
            providers: [ExpenseService,
                { provide: Router, useClass: RouterStub }]
        });

        fixture = TestBed.createComponent(ExpenseFormComponent);
        expenseFormComponent = fixture.componentInstance;

        // Expense service actually injected into the component
        expenseService = fixture.debugElement.injector.get(ExpenseService);
        spyOn(expenseService, 'updateExpense').and.returnValue(new BehaviorSubject({}).asObservable());
        spyOn(expenseService, 'createExpense').and.returnValue(new BehaviorSubject({}).asObservable());
    });

    it('should update an expense if it is not a new one', async(inject([Router], (router: Router) => {
        const spy = spyOn(router, 'navigate');
        expenseFormComponent.expense = testExpense;
        fixture.detectChanges();

        const saveButton = fixture.debugElement.query(By.css('.btn-primary'));
        saveButton.triggerEventHandler('click', null); //trigger a save

        fixture.whenStable().then(() => {
            expect(expenseService.updateExpense).toHaveBeenCalledTimes(1);
            expect(expenseService.updateExpense).toHaveBeenCalledWith(testExpense);
            expect(expenseService.createExpense).not.toHaveBeenCalled();

            const routerArguments = spy.calls.first().args[0]; //check that router was called with overview route
            expect(routerArguments).toEqual(['/overview']); 
        });
    })));

    it('should create a new expense if it is a new one', async(inject([Router], (router: Router) => {
        const spy = spyOn(router, 'navigate');
        expenseFormComponent.expense = newExpense;
        fixture.detectChanges();

        const saveButton = fixture.debugElement.query(By.css('.btn-primary'));
        saveButton.triggerEventHandler('click', null); //trigger a save

        fixture.whenStable().then(() => {
            expect(expenseService.createExpense).toHaveBeenCalledTimes(1);
            expect(expenseService.createExpense).toHaveBeenCalledWith(newExpense);
            expect(expenseService.updateExpense).not.toHaveBeenCalled();

            const routerArguments = spy.calls.first().args[0]; //check that router was called with overview route
            expect(routerArguments).toEqual(['/overview']);
        });
    })));

});


