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
    }
}
