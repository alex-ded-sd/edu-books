using System.Linq;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using EduBooks.Api.Data;
using EduBooks.Api.Models;
using Microsoft.EntityFrameworkCore;
using EduBooks.Api.Models.Dto;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Collections.Generic;

namespace EduBooks.Api.Services
{
	public class UserService : IUserService
	{
		private readonly ApplicationDbContext _context;

		private readonly IConfiguration _configuration;

		public UserService(ApplicationDbContext context, IConfiguration configuration)
		{
			this._context = context;
			this._configuration = configuration;
		}

		public async Task<bool> IsUserExistAsync(string email)
		{
			return await _context.Users.AnyAsync(dbUser => dbUser.Email == email);
		}

		public async Task<string> LoginAsync(string userName, string userPassword)
		{
			User user =  await _context.Users
				.Include(user => user.Role).FirstOrDefaultAsync(dbUser => dbUser.Email == userName);
			if (user != null) {
				if (IsPasswordValid(user, userPassword))
				{
					string token = GeneretaToken(user);
					return token;
				}
			}
			return null;
		}

		private string GeneretaToken(User user)
		{
			SymmetricSecurityKey symmetricKey = new SymmetricSecurityKey(
				Encoding.UTF8.GetBytes(_configuration.GetValue<string>("AppSettings:Key")));
			List<Claim> claims = new List<Claim> {
				new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
				new Claim(ClaimTypes.Email, user.Email)
			};
			if (user.Role != null) {
				claims.Add(new Claim(ClaimTypes.Role, user.Role.RoleName));
			}
			SigningCredentials creadentials = new SigningCredentials(symmetricKey,
				SecurityAlgorithms.HmacSha512Signature);
			SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(claims),
				Expires = DateTime.Now.AddMonths(1),
				SigningCredentials = creadentials
			};
			JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
			var token = tokenHandler.CreateToken(tokenDescriptor);
			return new JwtSecurityTokenHandler().WriteToken(token);
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

		public async Task<User> RegisterAsync(UserDto userForCreation)
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