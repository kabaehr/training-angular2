/// <reference path="../../../../typings/globals/jasmine/index.d.ts" />

import { ExpenseFilterPipe } from './expense-filter.pipe';
import { Expense, Reason } from './expense';

describe('TitleCasePipe', () => {
   let pipe = new ExpenseFilterPipe();

   it('transforms "abc" to "Abc"', () => {
        let expense1 = new Expense('1', 'Anakin Skywalker', Reason.Hotel, "12-01-2016", 12.20, "Night on Coruscant with Obi Wan");
        let expense2 = new Expense('1', 'Obi Wan', Reason.Hotel, "12-01-2016", 12.20, "Night on Coruscant with Anakin");
        let expenses = [expense1, expense2];

        expect(pipe.transform(expenses, "Ana")).toEqual([expense1]);
   });
});