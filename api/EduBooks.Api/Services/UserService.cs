using System.Linq;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using EduBooks.Api.Data;
using EduBooks.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace EduBooks.Api.Services
{
	public class UserService : IUserService
	{
		private readonly ApplicationContext _context;

		public UserService(ApplicationContext context)
		{
			this._context = context;
		}

		public async Task<bool> IsUserExistAsync(string email)
		{
			return await _context.Users.AnyAsync(dbUser => dbUser.Email == email);
		}

		public async Task<User> LoginAsync(string userName, string userPassword)
		{
			User user =  await _context.Users
				.Include(user => user.Role).FirstOrDefaultAsync(dbUser => dbUser.Email == userName);
			if (user != null) {
				if (IsPasswordValid(user, userPassword))
				{
					return user;
				}
			}
			return null;
		}

		private bool IsPasswordValid(User user, string userPassword)
		{
			byte[] passwordHash;
			using (var hmac = new HMACSHA512(user.PasswordSalt))
			{
				passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userPassword));
			}
			for (int i = 0; i < user.PasswordHash.Length; i++)
			{
				if (user.PasswordHash[i] != passwordHash[i])
				{
					return false;
				}
			}
			return true;
		}

		public async Task<User> RegisterAsync(UserForCreationDTO userForCreation)
		{
			byte[] passwordHash;
			byte[] passwordSalt;
			CreatePasswordHash(out passwordHash, out passwordSalt, userForCreation.Password);
			User user = new User{
				Email = userForCreation.Email,
				PasswordHash = passwordHash,
				PasswordSalt = passwordSalt
			};
			UserRole role = await GetUserRoleAsync(userForCreation.Role);
			user.Role = role;
			await _context.Users.AddAsync(user);
			await _context.SaveChangesAsync();
			return user;
		}

		private void CreatePasswordHash(out byte[] passwordHash, out byte[] passwordSalt, string password)
		{
			using (var hmac = new HMACSHA512())
			{
				passwordSalt = hmac.Key;
				passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
			}
		}

		private async Task<UserRole> GetUserRoleAsync(string role)
		{
			return await _context.UserRoles.FirstOrDefaultAsync(dbRole => dbRole.RoleName == role);
		}

		
	}
}