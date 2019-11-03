using System;

namespace EduBooks.Api.Models
{
	public class User: BaseEntity
	{
		public string Email { get; set; }

		public byte[] PasswordHash { get; set; }

		public byte[] PasswordSalt { get; set; }

		public virtual UserRole	Role { get; set; }

	}
}