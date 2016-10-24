## Exercise 5 ##

In this exercise, we reuse the existing form and use it to add a new expense. For that, we also have to implement the add functionality in the backend.


### Tasks ###

1. Add a new button in the overview HTML that routes to the expense-add.component.

2. Add the already exisiting expense-form.component to the HTML of the add component.

3. Extend the expense-form.component to also handle the creation of new expenses when clicking the save button

4. Implement the createExpense method in the expense.service and perform the actual HTTP Post request

5. Implement the creation of a new expense in the ExpenseController and ExpenseRepository