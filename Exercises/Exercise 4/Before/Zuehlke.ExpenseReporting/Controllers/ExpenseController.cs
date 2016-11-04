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
            return this.Ok(this.repository.All());
        }

        /// <summary>
        /// Gets a specific expense record identified by its unique id.
        /// </summary>
        /// <param name="id">Unique id of the requested expense record.</param>
        /// <returns>
        /// HTTP 200 with the requested <see cref="ExpenseRecord"/> entity in the body
        /// or HTTP 404 if the requested record was not found.
        /// </returns>
        [HttpGet("{id}")]
        [Produces(typeof(ExpenseRecord))]
        public IActionResult GetById(Guid id)
        {
            var expenseRecord = this.repository.FindById(id);
            if (expenseRecord != null)
            {
                return this.Ok(expenseRecord);
            }
            return this.NotFound();
        }

        /// <summary>
        /// Updates the provided expense record in the database.
        /// </summary>
        /// <param name="record">The record to be added.</param>
        /// <returns>
        /// HTTP 202 if the record was updated successfully, 
        /// HTTP 400 if no record was present in the body of the request
        /// or HTTP 404 if the record to be updated was not found in the database.
        /// </returns>
        [HttpPut("{id}")]
        public IActionResult Put([FromBody]ExpenseRecord record)
        {
            // Exercise 4
            // TODO

           throw new NotImplementedException();
        }

        /// <summary>
        /// Removes the expense record with the specified id from the database.
        /// </summary>
        /// <param name="id">Unique id of the record to be deleted</param>
        /// <returns>
        /// HTTP 202 to indicate that the provided record has been deleted 
        /// and is no longer available in the database,
        /// HTTP 404 if the requested record was not found.</returns>
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                this.repository.Delete(id);
                return this.NoContent();
            }
            catch (InvalidOperationException)
            {
                return this.NotFound();
            }
        }
    }
}
