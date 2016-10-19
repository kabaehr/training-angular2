import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from "@angular/http";

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ExpenseOverviewComponent } from './expense-overview.component';
import { ExpenseFilterPipe } from '../pipes/expense-filter.pipe';
import { ExpenseService } from '../services/expense.service';

describe('ExpenseOverviewComponent', () => {
    let expenseOverviewComponent: ExpenseOverviewComponent;
    let fixture: ComponentFixture<ExpenseOverviewComponent>;
    let debugElement: DebugElement;
    let htmlElement: HTMLElement;
    let spy: jasmine.Spy;
    let expenseService: ExpenseService;

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

        // query for the title <panel-heading> by CSS class selector
        debugElement = fixture.debugElement.query(By.css('.table-responsive'));
        htmlElement = debugElement.nativeElement;
   });

   it('should not show expenses before OnInit', () => {
       spy = spyOn(expenseService, 'getExpenses').and.returnValue(new BehaviorSubject([]).asObservable());
       expect(spy.calls.any()).toBe(false, 'getExpenses not yet called');
   });
});


