using System;
using System.Collections.Generic;

namespace Zuehlke.ExpenseReporting.Data
{
    /// <summary>
    /// Defines the interface for the data access layer for expenses.
    /// </summary>
    public interface IExpenseRepository
    {
        #region Public Methods and Operators

        /// <summary>
        /// Gets all expense records that are stored in the database.
        /// </summary>
        /// <returns>An <see cref="IEnumerable{T}"/> holding the expense records stored in the database.</returns>
        IEnumerable<ExpenseRecord> All();

        /// <summary>
        /// Gets a specific expense record identified by its unique id.
        /// </summary>
        /// <param name="id">Unique id of the requested expense record.</param>
        /// <returns>The expense record holding the specified id or null if no such record was found.</returns>
        ExpenseRecord FindById(Guid id);

        /// <summary>
        /// Adds the provided expense record to the database.
        /// </summary>
        /// <param name="record">The record to be added.</param>
        /// <exception cref="ArgumentNullException">Thrown if no record has been provided.</exception>
        /// <exception cref="InvalidOperationException">Thrown if the record to be added already exists in the database.</exception>
        void Create(ExpenseRecord record);

        /// <summary>
        /// Updates the provided expense record in the database.
        /// </summary>
        /// <param name="record">The record to be added.</param>
        /// <exception cref="ArgumentNullException">Thrown if no record has been provided.</exception>
        /// <exception cref="InvalidOperationException">Thrown if the record to be modified does not exist in the database.</exception>
        void Update(ExpenseRecord record);

        /// <summary>
        /// Removes the expense record with the specified id from the database.
        /// </summary>
        /// <param name="id">Unique id of the record to be deleted</param>
        void Delete(Guid id);

        #endregion
    }
}