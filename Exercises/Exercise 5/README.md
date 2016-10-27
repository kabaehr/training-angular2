## Exercise 5 ##

In this exercise, we reuse the existing form and use it to add a new expense. For that, we also have to implement the add functionality in the backend.


### Tasks ###

1. Add a new button in the overview HTML that routes to the `ExpenseAddComponent`.

2. Add the already exisiting `ExpenseFormComponent` to the `ExpenseAddComponent`.

3. Extend the `ExpenseFormComponent` and the service to also handle the creation of new expenses when clicking the save button.

5. Implement the creation of a new expense in the backend.

### Implementation Hints ###

1. Add a new button/link (`<a class="btn">`) in the `expense-overview.component.html` that routes to the `ExpenseAddComponent`. Check out the already provided route for the component in `expense.routing.ts`.

2. Add the selector of the `expense-form.component.ts` to  `expense-add.component.html`.

3. Extend the `expense-form.component.ts` to also handle the creation of new expenses when clicking the save button. For that, use the `createExpense(expense: Expense)` method in the `expense.service.ts`

4. Implement the `createExpense(expense: Expense)` method in the `ExpenseService` and perform the actual HTTP Post request. Use `JSON.stringify(expense)` to get an JSON representation of the expense.

5. Implement the creation of a new expense in the `ExpenseController` (`Post(ExpenseRecord record)`) and `ExpenseRepository` (`Update(ExpenseRecord record)`).