using System;
using System.Linq;
using FluentAssertions;
using Xunit;
using Zuehlke.ExpenseReporting.Data;

namespace Zuehlke.ExpenseReporting.Test
{
    public class ExpenseRepositoryTests
    {
        /// <summary>
        /// Ensures that the repository is able to deliver all records from the database.
        /// </summary>
        [Fact]
        public void CanDeliverAllExpenseRecords()
        {
            var subject = new ExpenseRepository();

            ExpenseRecord[] allExpenseReports = null;
            subject
                .Invoking(x => { allExpenseReports = x.All().ToArray(); })
                .ShouldNotThrow();

            allExpenseReports.Should().HaveCount(5, "there are five elements in the database after initialization");
            allExpenseReports[0].Name.Should().Be("Anakin Skywalker");
            allExpenseReports[1].Name.Should().Be("Padme Amidala");
            allExpenseReports[2].Name.Should().Be("Obi-Wan Kenobi");
            allExpenseReports[3].Name.Should().Be("The Dark Lord");
            allExpenseReports[4].Name.Should().Be("Jar Jar Binx");
        }

        /// <summary>
        /// Ensures that the repository can fetch on record that is identified by its unique id from the database.
        /// </summary>
        /// <param name="recordId">Id of the record to be fetched</param>
        [Theory]
        [InlineData("00000000-0000-0000-0000-000000000001")]
        [InlineData("00000000-0000-0000-0000-000000000002")]
        [InlineData("00000000-0000-0000-0000-000000000003")]
        [InlineData("00000000-0000-0000-0000-000000000004")]
        [InlineData("00000000-0000-0000-0000-000000000005")]
        public void CanDeliverASingleExpeseRecord(string recordId)
        {
            var subject = new ExpenseRepository();
            subject
                .FindById(Guid.Parse(recordId))
                .Should().NotBeNull();
        }

        /// <summary>
        /// Ensures that that the <see cref="ExpenseRepository.FindById"/> method does not fail if
        /// the requested record was not found.
        /// </summary>
        [Fact]
        public void DoesNotFailIfRecordDoesNotExist()
        {
            var subject = new ExpenseRepository();
            subject
                .Invoking(x => x.FindById(Guid.Parse("00000000-0000-0000-0000-000000000000")))
                .ShouldNotThrow();
        }

        /// <summary>
        /// Ensures that a record can be added to the database.
        /// </summary>
        [Fact]
        public void CanAddRecord()
        {
            var subject = new ExpenseRepository();
            var newRecord = new ExpenseRecord
            {
                Id = Guid.Parse("00000000-0000-0000-0000-000000000006"),
                Name = "Anakin Skywalker",
                Reason = ExpenseReason.Hotel,
                Amount = 20m,
                Text = "Cheap hotel in Mom's guest room.",
                Date = "06.10.2016",
            };
            subject
                .Invoking(x => x.Create(newRecord))
                .ShouldNotThrow();
            subject
                .FindById(newRecord.Id)
                .ShouldBeEquivalentTo(newRecord);
        }

        /// <summary>
        /// Ensures that the <see cref="ExpenseRepository.Create"/> method throws an appropriate
        /// exception should the user fail to provide a record to be added.
        /// </summary>
        [Fact]
        public void ThrowsArgumentNullExceptionWhenTryingToAddRecordWithoutPassingRecord()
        {
            var subject = new ExpenseRepository();
            subject
                .Invoking(x => x.Create(null))
                .ShouldThrow<ArgumentNullException>()
                .Where(x => x.ParamName == "record");
        }

        /// <summary>
        /// Ensures that the <see cref="ExpenseRepository.Create"/> method throws an appropriate
        /// exception should the user try to add a record that is already available in the database.
        /// </summary>
        [Fact]
        public void ThrowsInvalidOperationExceptionWhenTryingToAddRecordThatAlreadyExists()
        {
            var subject = new ExpenseRepository();
            var newRecord = new ExpenseRecord
            {
                Id = Guid.Parse("00000000-0000-0000-0000-000000000005"),
                Name = "Anakin Skywalker",
                Reason = ExpenseReason.Hotel,
                Amount = 20m,
                Text = "Cheap hotel in Mom's guest room.",
                Date = "06.10.2016",
            };
            subject
                .Invoking(x => x.Create(newRecord))
                .ShouldThrow<InvalidOperationException>()
                .WithMessage($"An expense record with ID {newRecord.Id} already exists in the database!");
        }

        /// <summary>
        /// Ensures that a record can be removed from the database.
        /// </summary>
        [Fact]
        public void CanDeleteRecord()
        {
            // Exercise 6
            // TODO
        }

        /// <summary>
        /// Ensures that a record can be updated in the database.
        /// </summary>
        [Fact]
        public void CanUpdateRecord()
        {
            var subject = new ExpenseRepository();
            var updatedRecord = new ExpenseRecord
            {
                Id = Guid.Parse("00000000-0000-0000-0000-000000000001"),
                Date = "12.10.2016",
                Name = "Anakin Skywalker",
                Reason = ExpenseReason.Taxi,
                Text = "Taxi to Tatooine, visiting Mom",
                Amount = 12.5m
            };

            subject
                .Invoking(x => x.Update(updatedRecord))
                .ShouldNotThrow();
            subject
                .FindById(updatedRecord.Id)
                .ShouldBeEquivalentTo(updatedRecord);
        }

        /// <summary>
        /// Ensures that the <see cref="ExpenseRepository.Update"/> method throws an appropriate
        /// exception should the user fail to provide a record to be update.
        /// </summary>
        [Fact]
        public void ThrowsArgumentNullExceptionWhenTryingToUpdateRecordWithoutPassingRecord()
        {
            var subject = new ExpenseRepository();
            subject
                .Invoking(x => x.Update(null))
                .ShouldThrow<ArgumentNullException>()
                .Where(x => x.ParamName == "record");
        }

        /// <summary>
        /// Ensures that the <see cref="ExpenseRepository.Update"/> method throws an appropriate
        /// exception should the user try to update a record that does not exist in the database.
        /// </summary>
        [Fact]
        public void ThrowsInvalidOperationExceptionWhenTryingToUpdateRecordThatDoesNotExist()
        {
            var subject = new ExpenseRepository();
            var updatedRecord = new ExpenseRecord
            {
                Id = Guid.Parse("00000000-0000-0000-0000-000000000006"),
                Date = "12.10.2016",
                Name = "Anakin Skywalker",
                Reason = ExpenseReason.Taxi,
                Text = "Taxi to Tatooine, visiting Mom",
                Amount = 12.5m
            };
            subject
                .Invoking(x => x.Update(updatedRecord))
                .ShouldThrow<InvalidOperationException>()
                .WithMessage($"An expense record with ID {updatedRecord.Id} does not exist in the database!");
        }
    }
}
