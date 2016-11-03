using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using Zuehlke.ExpenseReporting.Controllers;
using Zuehlke.ExpenseReporting.Data;

namespace Zuehlke.ExpenseReporting.Test
{
    public class ExpenseControllerTests
    {
        /// <summary>
        /// Ensures that the controllers returns a HTTP 200 result containung all
        /// instances available in the database.
        /// </summary>
        [Fact]
        public void CanDeliverAllExpenseRecords()
        {
            var testData = this.CreateTestData();
            var repositoryMock = new Mock<IExpenseRepository>();
            repositoryMock.Setup(x => x.All()).Returns(testData);
            var subject = new ExpenseController(repositoryMock.Object);

            IActionResult result = null;
            subject.Invoking(x => { result = x.Get(); }).ShouldNotThrow();
            result
                .Should()
                .BeOfType<OkObjectResult>();

            var okResult = result as OkObjectResult;
            okResult.Value
                .Should()
                .BeOfType<ExpenseRecord[]>();

            var resultValue = okResult.Value as IEnumerable<ExpenseRecord>;
            resultValue
                .Should()
                .HaveCount(5);
        }

        /// <summary>
        /// Ensures that the controller returns a HTTP 200 result containing the
        /// requested expense record.
        /// </summary>
        /// <param name="recordId">Unique id of the requested expense record.</param>
        [Theory]
        [InlineData("00000000-0000-0000-0000-000000000001")]
        [InlineData("00000000-0000-0000-0000-000000000002")]
        [InlineData("00000000-0000-0000-0000-000000000003")]
        [InlineData("00000000-0000-0000-0000-000000000004")]
        [InlineData("00000000-0000-0000-0000-000000000005")]
        public void CanDeliverASingleExpeseRecord(string recordId)
        {
            var testRecord = this.CreateTestData().FirstOrDefault(x => x.Id.Equals(Guid.Parse(recordId)));
            var repositoryMock = new Mock<IExpenseRepository>();
            repositoryMock.Setup(x => x.FindById(testRecord.Id)).Returns(testRecord);
            var subject = new ExpenseController(repositoryMock.Object);

            IActionResult result = null;
            subject
                .Invoking(x => { result = x.GetById(testRecord.Id); })
                .ShouldNotThrow();

            result
                .Should()
                .BeOfType<OkObjectResult>();

            var okResult = result as OkObjectResult;
            okResult.Value
                .Should()
                .BeOfType<ExpenseRecord>();

            var resultValue = okResult.Value as ExpenseRecord;
            resultValue
                .ShouldBeEquivalentTo(testRecord);
        }

        /// <summary>
        /// Ensures that the controller returns a HTTP 404 result if the requested
        /// expense record is not available.
        /// </summary>
        [Fact]
        public void DoesNotFailIfRecordDoesNotExist()
        {
            var repositoryMock = new Mock<IExpenseRepository>();
            repositoryMock.Setup(x => x.FindById(Guid.Empty)).Returns((ExpenseRecord)null);
            var subject = new ExpenseController(repositoryMock.Object);

            IActionResult result = null;
            subject
                .Invoking(x => { result = x.GetById(Guid.Empty); })
                .ShouldNotThrow();

            result
                .Should()
                .BeOfType<NotFoundResult>();
        }

        /// <summary>
        /// Ensures that the controller returns a HTTP 201 result containing the
        /// uri of the newly created resource.
        /// </summary>
        [Fact]
        public void CanAddRecord()
        {
            var testRecord = this.CreateTestData().First();
            var repositoryMock = new Mock<IExpenseRepository>();
            var subject = new ExpenseController(repositoryMock.Object);

            IActionResult result = null;
            subject
                .Invoking(x => result = x.Post(testRecord))
                .ShouldNotThrow();

            repositoryMock
                .Invoking(mock => mock.Verify(x => x.Create(testRecord)))
                .ShouldNotThrow();

            result
                .Should()
                .BeOfType<CreatedResult>();

            var createdResult = result as CreatedResult;
            createdResult
                .Location
                .Should()
                .Be($"api/expenses/{testRecord.Id}");
        }

        /// <summary>
        /// Ensures that the controller returns a HTTP 400 result if the
        /// user has provided bad data to the request.
        /// </summary>
        [Fact]
        public void ThrowsArgumentNullExceptionWhenTryingToAddRecordWithoutPassingRecord()
        {
            var repositoryMock = new Mock<IExpenseRepository>();
            repositoryMock.Setup(x => x.Create(null)).Throws(new ArgumentNullException("record"));
            var subject = new ExpenseController(repositoryMock.Object);

            IActionResult result = null;
            subject
                .Invoking(x => result = x.Post(null))
                .ShouldNotThrow();

            repositoryMock
                .Invoking(mock => mock.Verify(x => x.Create(null)))
                .ShouldNotThrow();

            result
                .Should()
                .BeOfType<BadRequestResult>();
        }

        /// <summary>
        /// Ensures that the controller returns a HTTP 409 result if the user
        /// user has provided a record that already exists in the database.
        /// </summary>
        [Fact]
        public void ThrowsInvalidOperationExceptionWhenTryingToAddRecordThatAlreadyExists()
        {
            var testRecord = this.CreateTestData().First();
            var repositoryMock = new Mock<IExpenseRepository>();
            repositoryMock.Setup(x => x.Create(testRecord)).Throws(new InvalidOperationException($"An expense record with ID {testRecord.Id} already exists in the database!"));
            var subject = new ExpenseController(repositoryMock.Object);

            IActionResult result = null;
            subject
                .Invoking(x => result = x.Post(testRecord))
                .ShouldNotThrow();

            repositoryMock
                .Invoking(mock => mock.Verify(x => x.Create(testRecord)))
                .ShouldNotThrow();

            result
                .Should()
                .BeOfType<StatusCodeResult>();
            var statusCodeResult = result as StatusCodeResult;
            statusCodeResult.StatusCode
                .Should()
                .Be((int)HttpStatusCode.Conflict);
        }

        /// <summary>
        /// Ensures that the controller returns a HTTP 204 if a resource has been
        /// deleted successfully.
        /// </summary>
        [Fact]
        public void CanDeleteRecord()
        {
            var testRecord = this.CreateTestData().First();
            var repositoryMock = new Mock<IExpenseRepository>();
            repositoryMock.Setup(x => x.FindById(testRecord.Id)).Returns(testRecord);
            var subject = new ExpenseController(repositoryMock.Object);

            IActionResult result = null;
            subject
                .Invoking(x => result = x.Delete(testRecord.Id))
                .ShouldNotThrow();
            result
                .Should()
                .BeOfType<NoContentResult>();

            repositoryMock.Verify(mock => mock.Delete(testRecord.Id), Times.Exactly(1));
        }

        /// <summary>
        /// Ensures that the controller returns a HTTP 404 result if the resource to be deleted is not available.
        /// </summary>
        public void CanNotDeleteRecord()
        {
            var testRecord = this.CreateTestData().First();
            var repositoryMock = new Mock<IExpenseRepository>();
            repositoryMock.Setup(x => x.FindById(testRecord.Id)).Returns((ExpenseRecord)null);
            var subject = new ExpenseController(repositoryMock.Object);

            IActionResult result = null;
            subject
                .Invoking(x => result = x.Delete(testRecord.Id));

            result
                .Should()
                .BeOfType<NotFoundResult>();

            repositoryMock.Verify(mock => mock.Delete(testRecord.Id), Times.Exactly(1));
        }

        /// <summary>
        /// Ensures that the controller returns a HTTP 204 result containing the
        /// uri of the newly created resource.
        /// </summary>
        [Fact]
        public void CanUpdateRecord()
        {
            var testRecord = this.CreateTestData().First();
            var repositoryMock = new Mock<IExpenseRepository>();
            var subject = new ExpenseController(repositoryMock.Object);

            IActionResult result = null;
            subject
                .Invoking(x => result = x.Put(testRecord))
                .ShouldNotThrow();

            repositoryMock
                .Invoking(mock => mock.Verify(x => x.Update(testRecord)))
                .ShouldNotThrow();

            result
                .Should()
                .BeOfType<NoContentResult>();
        }

        /// <summary>
        /// Ensures that the controller returns a HTTP 400 result if the
        /// user has provided bad data to the request.
        /// </summary>
        [Fact]
        public void ThrowsArgumentNullExceptionWhenTryingToUpdateRecordWithoutPassingRecord()
        {
            var repositoryMock = new Mock<IExpenseRepository>();
            repositoryMock.Setup(x => x.Update(null)).Throws(new ArgumentNullException("record"));
            var subject = new ExpenseController(repositoryMock.Object);

            IActionResult result = null;
            subject
                .Invoking(x => result = x.Put(null))
                .ShouldNotThrow();

            repositoryMock
                .Invoking(mock => mock.Verify(x => x.Update(null)))
                .ShouldNotThrow();

            result
                .Should()
                .BeOfType<BadRequestResult>();
        }

        /// <summary>
        /// Ensures that the controller returns a HTTP 404 result if the user
        /// user has provided a record that does not exist in the database.
        /// </summary>
        [Fact]
        public void ThrowsInvalidOperationExceptionWhenTryingToUpdateARecordThatDoesNotExist()
        {
            var testRecord = this.CreateTestData().First();
            var repositoryMock = new Mock<IExpenseRepository>();
            repositoryMock.Setup(x => x.Update(testRecord)).Throws(new InvalidOperationException($"An expense record with ID {testRecord.Id} does not exist in the database!"));
            var subject = new ExpenseController(repositoryMock.Object);

            IActionResult result = null;
            subject
                .Invoking(x => result = x.Put(testRecord))
                .ShouldNotThrow();

            repositoryMock
                .Invoking(mock => mock.Verify(x => x.Update(testRecord)))
                .ShouldNotThrow();

            result
                .Should()
                .BeOfType<NotFoundResult>();
        }

        /// <summary>
        /// Creates a set of test records.
        /// </summary>
        /// <returns>An array of expense records.</returns>
        private ExpenseRecord[] CreateTestData()
        {
            return new[] {
                new ExpenseRecord { Id = Guid.Parse("00000000-0000-0000-0000-000000000001"), Date = "11.10.2016", Name = "Anakin Skywalker", Reason = ExpenseReason.Flight, Text = "Flight to Tatooine, visiting Mom", Amount = 122.99m },
                new ExpenseRecord { Id = Guid.Parse("00000000-0000-0000-0000-000000000002"), Date = "12.10.2016", Name = "Padme Amidala", Reason = ExpenseReason.Flight, Text = "Flight to Tatooine, visiting Annie's Mom", Amount = 122.99m },
                new ExpenseRecord { Id = Guid.Parse("00000000-0000-0000-0000-000000000003"), Date = "13.10.2016", Name = "Obi-Wan Kenobi", Reason = ExpenseReason.Other, Text = "New Lightsabre", Amount = 3999.99m },
                new ExpenseRecord { Id = Guid.Parse("00000000-0000-0000-0000-000000000004"), Date = "14.10.2016", Name = "The Dark Lord", Reason = ExpenseReason.Restaurant, Text = "I had the Penne a L'Arrabiata", Amount = 3.90m },
                new ExpenseRecord { Id = Guid.Parse("00000000-0000-0000-0000-000000000005"), Date = "15.10.2016", Name = "Jar Jar Binx", Reason = ExpenseReason.Restaurant, Text = "Apple", Amount = 0.2m }
            };
        }
    }
}
