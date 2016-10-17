using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Zuehlke.ExpenseReporting.Data
{
    /// <summary>
    /// Provides information to a single expense record.
    /// </summary>
    public class ExpenseRecord : IEquatable<ExpenseRecord>
    {
        /// <summary>
        /// Gets or sets the unique id of the expense record.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Gets or sets the date the expense was made.
        /// </summary>
        public string Date { get; set; }

        /// <summary>
        /// Gets or sets the name of the person creating the report.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the reason for the expense.
        /// </summary>
        [JsonConverter(typeof(StringEnumConverter))]
        public ExpenseReason Reason { get; set; }

        /// <summary>
        /// Gets or sets the amount of the expense.
        /// </summary>
        public decimal Amount { get; set; }

        /// <summary>
        /// Gets or sets additional information.
        /// </summary>
        public string Text { get; set; }

        /// <summary>
        /// Indicates whether the current object is equal to another object of the same type.
        /// </summary>
        /// <param name="other">An object to compare with this object.</param>
        /// <returns><c>true</c> if the current object is equal to the other parameter; otherwise, <c>false</c>.</returns>
        public bool Equals(ExpenseRecord other)
        {
            if (ReferenceEquals(null, other))
            {
                return false;
            }
            if (ReferenceEquals(this, other))
            {
                return true;
            }
            return this.Id.Equals((object)other.Id) && Equals(this.Date, other.Date) && Equals(this.Name, other.Name) && this.Reason == other.Reason && this.Amount == other.Amount && Equals(this.Text, other.Text);
        }

        /// <summary>
        /// Determines whether the specified object is equal to the current object.
        /// </summary>
        /// <param name="obj">The object to compare with the current object.</param>
        /// <returns><c>true</c> if the specified object is equal to the current object; otherwise, <c>false</c>.</returns>
        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj))
            {
                return false;
            }
            if (ReferenceEquals(this, obj))
            {
                return true;
            }
            if (obj.GetType() != this.GetType())
            {
                return false;
            }
            return this.Equals((ExpenseRecord)obj);
        }

        /// <summary>
        /// Serves as the default hash function.
        /// </summary>
        /// <returns>A hash code for the current object.</returns>
        public override int GetHashCode()
        {
            unchecked
            {
                var hashCode = this.Id.GetHashCode();
                hashCode = (hashCode * 397) ^ (this.Date?.GetHashCode() ?? 0);
                hashCode = (hashCode * 397) ^ (this.Name?.GetHashCode() ?? 0);
                hashCode = (hashCode * 397) ^ (int)this.Reason;
                hashCode = (hashCode * 397) ^ this.Amount.GetHashCode();
                hashCode = (hashCode * 397) ^ (this.Text?.GetHashCode() ?? 0);
                return hashCode;
            }
        }

        public static bool operator ==(ExpenseRecord left, ExpenseRecord right)
        {
            return Equals(left, right);
        }

        public static bool operator !=(ExpenseRecord left, ExpenseRecord right)
        {
            return !Equals(left, right);
        }
    }
}