using System;
using System.Collections.Generic;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Zuehlke.ExpenseReporting.Data;

namespace Zuehlke.ExpenseReporting.Controllers
{
    /// <summary>
    /// Handles all request regarding the expense records.
    /// </summary>
    [Route("api/expenses")]
    public class ExpenseController : Controller
    {
        private readonly IExpenseRepository repository;

        /// <summary>
        /// Initializes a new instance of the <see cref="ExpenseController"/> class.
        /// </summary>
        /// <param name="expenseRepository">The repository used to access the database.</param>
        public ExpenseController(IExpenseRepository expenseRepository)
        {
            this.repository = expenseRepository;
        }

        /// <summary>
        /// Gets all expense records that are stored in the database.
        /// </summary>
        /// <returns>HTTP 200 with an array of <see cref="ExpenseRecord"/> entities in the body.</returns>
        [HttpGet]
        [Produces(typeof(IEnumerable<ExpenseRecord>))]
        public IActionResult Get()
        {
            throw new NotImplementedException();
        }

       

        /// <summary>
        /// Removes the expense record with the specified id from the database.
        /// </summary>
        /// <param name="id">Unique id of the record to be deleted</param>
        /// <returns>HTTP 202 to indicate that the provided record is no longer available in the database.</returns>
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            // Exercise 3
            // TODO

            throw new NotImplementedException();
        }
    }
}
