using System.Security.Claims;
using System.Collections.Generic;
using System.Threading.Tasks;
using EduBooks.Api.Models;
using EduBooks.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;

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
		public async Task<IActionResult> RegisterAsync(UserForCreationDTO userForCreation) {
			if (await _userService.IsUserExistAsync(userForCreation.Email))
			{
				return BadRequest("Уже существует");
			}
			User createdUser = await _userService.RegisterAsync(userForCreation);
			await LoginUserAsync(createdUser);
			return StatusCode(201);
		}

		[HttpPost("login")]
		public async Task<IActionResult> LoginAsync(UserForLoginDTO userForLoginDTO)
		{
			User user = await _userService.LoginAsync(userForLoginDTO.Email, userForLoginDTO.Password);
			if (user == null)
			{
				return BadRequest("Ошибка");
			}
			await LoginUserAsync(user);
			return Ok();
		}

		private async Task LoginUserAsync(User user)
		{
			List<Claim> claims = new List<Claim> {
				new Claim(ClaimTypes.Name, user.Email),
				new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
				new Claim(ClaimTypes.Role, user.Role.RoleName)
			};
			ClaimsIdentity claimsIdentity =
				new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
			AuthenticationProperties authProperties = new AuthenticationProperties
			{
				IsPersistent = true
			};
			await HttpContext.SignInAsync(
				CookieAuthenticationDefaults.AuthenticationScheme,
				new ClaimsPrincipal(claimsIdentity),
				authProperties
			);
		}
	}
}