using System;
using System.Collections.Generic;
using System.Linq;

namespace Zuehlke.ExpenseReporting.Data
{
    /// <summary>
    /// Provides the interface to access the database holding the expense records.
    /// </summary>
    public class ExpenseRepository : IExpenseRepository
    {
        #region Fields

        private readonly List<ExpenseRecord> database = new List<ExpenseRecord>();

        #endregion

        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of <see cref="ExpenseRepository"/>.
        /// </summary>
        public ExpenseRepository()
        {
            this.database.Add(new ExpenseRecord { Id = Guid.Parse("00000000-0000-0000-0000-000000000001"), Date = "11.10.2016", Name = "Anakin Skywalker", Reason = ExpenseReason.Flight, Text = "Flight to Tatooine, visiting Mom", Amount = 122.99m });
            this.database.Add(new ExpenseRecord { Id = Guid.Parse("00000000-0000-0000-0000-000000000002"), Date = "12.10.2016", Name = "Padme Amidala", Reason = ExpenseReason.Flight, Text = "Flight to Tatooine, visiting Annie's Mom", Amount = 122.99m });
            this.database.Add(new ExpenseRecord { Id = Guid.Parse("00000000-0000-0000-0000-000000000003"), Date = "13.10.2016", Name = "Obi-Wan Kenobi", Reason = ExpenseReason.Other, Text = "New Lightsabre", Amount = 3999.99m });
            this.database.Add(new ExpenseRecord { Id = Guid.Parse("00000000-0000-0000-0000-000000000004"), Date = "14.10.2016", Name = "The Dark Lord", Reason = ExpenseReason.Restaurant, Text = "I had the Penne a L'Arrabiata", Amount = 3.90m });
            this.database.Add(new ExpenseRecord { Id = Guid.Parse("00000000-0000-0000-0000-000000000005"), Date = "15.10.2016", Name = "Jar Jar Binx", Reason = ExpenseReason.Restaurant, Text = "Apple", Amount = 0.2m });
        }

        #endregion

        #region Public Methods and Operators

        /// <summary>
        /// Gets all expense records that are stored in the database.
        /// </summary>
        /// <returns>An <see cref="IEnumerable{T}"/> holding the expense records stored in the database.</returns>
        public IEnumerable<ExpenseRecord> All()
        {
            throw new NotImplementedException();
        }

        public ExpenseRecord FindById(Guid id)
        {
            throw new NotImplementedException();
        }

        public void Create(ExpenseRecord record)
        {
            throw new NotImplementedException();
        }

        public void Update(ExpenseRecord record)
        {
            throw new NotImplementedException();
        }

        public void Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}