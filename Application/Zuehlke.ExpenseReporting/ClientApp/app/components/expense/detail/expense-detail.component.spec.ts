import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ActivatedRouteStub, RouterStub } from '../../../../utils/testutils';

import { ExpenseDetailComponent } from './expense-detail.component';
import { ExpenseFormComponent } from '../form/expense-form.component';
import { ExpenseService } from '../services/expense.service';
import { Expense, Reason } from '../model/expense';

describe('ExpenseDetailComponent', () => {
    let expenseDetailComponent: ExpenseDetailComponent;
    let fixture: ComponentFixture<ExpenseDetailComponent>;

    const expense1 = new Expense('1', 'Anakin Skywalker', Reason.Bus, '12.01.2016', 12.22, 'Visiting Mom');
    const expense2 = new Expense('2', 'Yoda', Reason.Flight, '12.05.2016', 10, 'Flight to Coruscant');
    const testExpenses = [expense1, expense2];

    let expenseService: ExpenseService;

    const activatedRoute = new ActivatedRouteStub();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule, HttpModule],
            declarations: [ExpenseDetailComponent, ExpenseFormComponent],
            providers: [ExpenseService, { provide: ActivatedRoute, useValue: activatedRoute }, { provide: Router, useClass: RouterStub }]
        });

        fixture = TestBed.createComponent(ExpenseDetailComponent);
        expenseDetailComponent = fixture.componentInstance;

        // Expense service actually injected into the component
        expenseService = fixture.debugElement.injector.get(ExpenseService);
        spyOn(expenseService, 'getExpenses').and.returnValue(new BehaviorSubject(testExpenses).asObservable());
    });

    it('should load the correct expense', async(() => {
        activatedRoute.testParams = { id: expense1.id };
        
        fixture.detectChanges();

        fixture.whenStable().then(() => { // wait for async getExpenses
            fixture.detectChanges();        // update view with expsense

            expect(expenseDetailComponent.expense).toEqual(expense1); //check whether Anakins expense is shown

            const title = fixture.debugElement.query(By.css('.panel-heading')).nativeElement;
            expect(title.textContent).toEqual('Expense from ' + expense1.name);
        });
    }));

    it('should navigate to overview when back button is clicked', inject([Router], (router: Router) => {
        fixture.detectChanges();

        const spy = spyOn(router, 'navigate');

        const backButton = fixture.debugElement.query(By.css('.btn-default'));
        backButton.triggerEventHandler('click', null); //click back button

        const routerArguments = spy.calls.first().args[0]; //check that router was called with overview route
        expect(routerArguments).toEqual(['/overview']); 
    }));

});


