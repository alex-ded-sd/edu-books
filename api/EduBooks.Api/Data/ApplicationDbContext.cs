using EduBooks.Api.Models;
using Microsoft.EntityFrameworkCore;
namespace EduBooks.Api.Data
{
	public class ApplicationDbContext: DbContext
	{
		public DbSet<Page> Pages { get; set; }

		public DbSet<User> Users { get; set; }

		public DbSet<UserRole> UserRoles { get; set; }

		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
			: base(options){}

		protected override void OnModelCreating(ModelBuilder modelBuilder) {
			modelBuilder.HasPostgresExtension("uuid-ossp")
				.Entity<Page>()
				.Property(p => p.Id)
				.HasDefaultValueSql("uuid_generate_v4()");
			modelBuilder.HasPostgresExtension("uuid-ossp")
				.Entity<User>()
				.Property(p => p.Id)
				.HasDefaultValueSql("uuid_generate_v4()");
				modelBuilder.HasPostgresExtension("uuid-ossp")
				.Entity<UserRole>()
				.Property(p => p.Id)
				.HasDefaultValueSql("uuid_generate_v4()");
			
		}
	}
}