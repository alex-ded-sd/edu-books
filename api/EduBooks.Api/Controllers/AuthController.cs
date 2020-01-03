using System.Threading.Tasks;
using EduBooks.Api.Models;
using EduBooks.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EduBooks.Api.Models.Dto;

namespace EduBooks.Api.Controllers
{
	[ApiController]
	[AllowAnonymous]
	[Route("api/[controller]")]
	public class AuthController: ControllerBase
	{
		private readonly IUserService _userService;

		public AuthController(IUserService userService)
		{
			this._userService = userService;
		}

		[HttpPost("register")]
		public async Task<IActionResult> RegisterAsync(UserDto userForCreation) {
			if (await _userService.IsUserExistAsync(userForCreation.Email))
			{
				return BadRequest("Уже существует");
			}
			User createdUser = await _userService.RegisterAsync(userForCreation);
			return StatusCode(201);
		}

		[HttpPost("login")]
		public async Task<IActionResult> LoginAsync(UserDto userForLoginDTO)
		{
			string userToken = await _userService.LoginAsync(userForLoginDTO.Email, userForLoginDTO.Password);
			if (string.IsNullOrEmpty(userToken))
			{
				return BadRequest("Ошибка");
			}
			
			return Ok(new {
				token = userToken
			});
		}
	}
}