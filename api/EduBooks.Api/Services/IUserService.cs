using System.Threading.Tasks;
using EduBooks.Api.Models;

namespace EduBooks.Api.Services
{
	public interface IUserService
	{
		 Task<User> LoginAsync(string email, string userPassword);

		 Task<User> RegisterAsync(UserForCreationDTO userForCreation);

		 Task<bool> IsUserExistAsync(string email);
	}
}