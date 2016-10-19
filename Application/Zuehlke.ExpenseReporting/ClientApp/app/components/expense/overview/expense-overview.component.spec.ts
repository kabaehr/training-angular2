import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ExpenseOverviewComponent } from './expense-overview.component';
import { ExpenseFilterPipe } from '../pipes/expense-filter.pipe';
import { ExpenseService } from '../services/expense.service';
import { Expense, Reason } from '../model/expense';

describe('ExpenseOverviewComponent', () => {
    let expenseOverviewComponent: ExpenseOverviewComponent;
    let fixture: ComponentFixture<ExpenseOverviewComponent>;

    const expense1 = new Expense('1', 'Anakin Skywalker', Reason.Bus, '12.01.2016', 12.22, 'Visiting Mom');
    const expense2 = new Expense('2', 'Yoda', Reason.Flight, '12.05.2016', 10, 'Flight to Coruscant');
    const testExpenses = [expense1, expense2];

    let expenseService: ExpenseService;
    let expenseServiceSpy: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule, HttpModule],
            declarations: [ExpenseOverviewComponent, ExpenseFilterPipe],
            providers: [ExpenseService]
        });

        fixture = TestBed.createComponent(ExpenseOverviewComponent);
        expenseOverviewComponent = fixture.componentInstance;

        // Expense service actually injected into the component
        expenseService = fixture.debugElement.injector.get(ExpenseService);
        expenseServiceSpy = spyOn(expenseService, 'getExpenses').and.returnValue(new BehaviorSubject(testExpenses).asObservable());
        expenseServiceSpy = spyOn(expenseService, 'deleteExpense').and.returnValue(new BehaviorSubject({}).asObservable());
    });

    it('should not show expenses before OnInit', () => {
        expect(expenseServiceSpy.calls.any()).toBe(false, 'getExpenses not yet called');
    });

    it('should show two expenses after OnOnit', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => { // wait for async getExpenses
            fixture.detectChanges();        // update view with expsenses

            const tableBody = fixture.debugElement.query(By.css('tbody')); //check for table to contain the two expenses
            expect(tableBody.nativeElement.children.length).toEqual(2);
            expect(tableBody.nativeElement.children[0].children[0].textContent).toContain('Anakin Skywalker');
            expect(tableBody.nativeElement.children[1].children[0].textContent).toContain('Yoda');
        });
    }));

    it('should remove one entry when it is deleted', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => { // wait for async getExpenses
            fixture.detectChanges();        // update view with expsenses

            const firstExpenseDeleteIcon = fixture.debugElement.query(By.css('tbody > tr  span')); //query delete icon
            firstExpenseDeleteIcon.triggerEventHandler('click', new Event('dummyEvent')); //trigger a delete

            fixture.detectChanges(); //update view

            const tableBody = fixture.debugElement.query(By.css('tbody')); //check for table to not contain Anakin Skywalker anymore
            expect(tableBody.nativeElement.children.length).toEqual(1);
            expect(tableBody.nativeElement.children[0].children[0].textContent).toContain('Yoda');
        });
    }));
});


