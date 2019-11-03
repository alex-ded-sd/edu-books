using System;

namespace EduBooks.Api.Models
{
	public abstract class BaseEntity
	{
		public Guid Id { get; set; }
	}
}