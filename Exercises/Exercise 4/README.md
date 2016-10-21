## Exercise 4 ##

In this exercise, we add the possibility to edit an exisiting expense. For that matter, we have to adapt the client (i.e. the HTML, the component and the service) as well as the backend (the Controller and the Repository).


### Tasks ###

1. Extend the Routes in expense.routing.ts. Add a new Route for the expense-detail component. Furthermore, add a router link for each expense in the overview, such that a click on it loads the expense detail component.

2. Load and set the expense with the provided id from the route in the expense-detail component. Use the expense service to achieve that.

3. Add the provided expense-form into the panel body of the detail view HTML and provide the correct expense as input to the form component

4. Extend the form component HTML so that all fields of an expense (except the id) can be updated. Furthermore, add a save button to save the changes made. Use two-way binding [(ngModel)] to ensure that changes in the input fields are also passed to the property.

5. Add a save button in the HTML to save the changes and register a click handler that persists changes. For that matter, implement the save method in the form component and delegate the handling to the service. Furthermore, implement the required update functionality in the backend controller.

6. Add the implementation in the backend to update an expense (Controller and Repository)