using System.Threading.Tasks;
using EduBooks.Api.Models;
using EduBooks.Api.Models.Dto;

namespace EduBooks.Api.Services
{
	public interface IUserService
	{
		 Task<string> LoginAsync(string email, string userPassword);

		 Task<User> RegisterAsync(UserDto userForCreation);

		 Task<bool> IsUserExistAsync(string email);
	}
}