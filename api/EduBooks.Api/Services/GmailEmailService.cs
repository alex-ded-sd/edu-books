using System.IO;
using System.Threading;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using Microsoft.Extensions.Configuration;

namespace EduBooks.Api.Services
{
	public class GmailEmailService : IEmailService
	{
		private readonly string _configFilePath;
		static string[] Scopes = { GmailService.Scope.GmailSend  };
		static string ApplicationName = "dreams api";

		public GmailEmailService(IConfiguration configuration)
		{
			_configFilePath = configuration.GetSection("GmailConfig").GetValue<string>("FilePath");
		}
		public void SendEmail()
		{
			// UserCredential credential;

			// using (var stream =	new FileStream(_configFilePath, FileMode.Open, FileAccess.Read))
			// {
			// 	// The file token.json stores the user's access and refresh tokens, and is created
			// 	// automatically when the authorization flow completes for the first time.
			// 	string credPath = "token.json";
			// 	credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
			// 		GoogleClientSecrets.Load(stream).Secrets,
			// 		Scopes,
			// 		"user",
			// 		CancellationToken.None,
			// 		new FileDataStore(credPath, true)).Result;
			// }

			// // Create Gmail API service.
			// var service = new GmailService(new BaseClientService.Initializer()
			// {
			// 	HttpClientInitializer = credential,
			// 	ApplicationName = ApplicationName,
			// });
			// var message = new Google.Apis.Gmail.v1.Data.Message();
			// message.
			// service.Users.Messages.Send(
			throw new System.NotImplementedException();
		}
	}
}