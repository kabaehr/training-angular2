import { PipeTransform, Pipe } from '@angular/core';
import { Expense } from '../model/expense';

@Pipe({
    name: 'expenseFilter'
})
export class ExpenseFilterPipe implements PipeTransform {

    transform(value: Expense[], filter: string): Expense[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((expense: Expense) =>
            expense.name.toLocaleLowerCase().indexOf(filter) !== -1) : value;
    }
}
