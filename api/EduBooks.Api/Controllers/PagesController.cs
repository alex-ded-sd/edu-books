using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EduBooks.Api.Data;
using EduBooks.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EduBooks.Api.Controllers
{
	[ApiController]
	[Authorize(Roles = "Admin")]
	[Route("api/[controller]")]
	public class PagesController : ControllerBase
	{
		private readonly ApplicationContext _context;
		public PagesController(ApplicationContext context)
		{
			_context = context;
		}

		[HttpGet]
		public IActionResult Pages() {
			List<Page> pages = _context.Pages.ToList();
			return Ok(pages);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> PageAsync(string id) {
			Guid parsedId = Guid.Parse(id);
			Page page = await _context.Pages.FirstOrDefaultAsync(p => p.Id == parsedId);
			return Ok(page);
		}
	}
}