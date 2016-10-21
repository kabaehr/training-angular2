## Exercise 3 ##

In this exercise, we add the possibility to delete an exisiting expense in the overview. For that matter, we have to adapt the client (i.e. the HTML, the component and the service) as well as the backend (the Controller and the Repository).


### Tasks ###

1. add a new <th> and <td> element in the HTML and an appropriate event click handler to delete an expense

2. add a method in the overview componente that deletes an expense and can respond to the click event in the browser

3. extend the expense-service so it can send e HTTP delete request to the backend in order to effectively delete an expense

4. implement the delete method in the ExpenseController and the ExpenseRepository