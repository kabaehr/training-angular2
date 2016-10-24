## Exercise 4 ##

In this exercise, we add the possibility to edit an exisiting expense. For that matter, we have to adapt the client (i.e. the HTML, the component and the service) as well as the backend (the Controller and the Repository).


### Tasks ###

1. Extend the Routes for the `ExpenseDetailComponent`. Furthermore, add a router link for each expense in the overview that routes to the `ExpenseDetailComponent`.

2. Load and set the expense with the provided id from the route in the `ExpenseDetailComponent`. Use the expense service to achieve that.

3. Add the provided expense-form into the panel body of the detail view and provide the correct expense as input to the form component

4. Extend the form component HTML so that all fields of an expense (except the id) can be updated. Furthermore, add a save button to save the changes made. 

5. Add a save button in the HTML to save the changes and register a click handler that persists changes. 

6. Add the implementation in the backend to update an expense.

### Implementation Hints ###

1. Extend the Routes in `expense.routing.ts`. Add a new Route for the `ExpenseDetailComponent`. Use a variable id. Furthermore, add a router link for each expense in `expense-overview.component.html`, such that a click on it loads the `ExpenseDetailComponent`.

2. Load and set the expense with the provided id from the route in the `ngOnInit()` method in `expense-detail.component.ts`. Use `expense.service.ts` to achieve that.

3. Use the selector from `expense-form.component.ts` to add the HTML of the form into the panel body of the `expense-detail.component.html`. Provide the correct expense as input for the form component.

4. Extend the `expense-form.component.html` so that all fields of an expense (except the id) can be updated. Furthermore, add a save button to save the changes made. Use two-way binding `[(ngModel)]` to ensure that changes in the input fields are also passed to the property. For orientation, use the `input` fields for the already provided fields of an exspense.

5. Add a save button in the `expense-form.component.html` to save the changes and register a click handler that persists changes. For that matter, implement the save method in the `expense-form.component.ts` and delegate the handling to the `expense.services.ts`. Perform a HTTP PUT request. You can use `JSON.stringify(...)` to get a JSON representation of the `expense` object.

6. Implement the `Put(Expense Record record)` method in the `ExpenseController` as well as the `Update(ExpenseRecord record)` method in the `ExpenseRepository`.