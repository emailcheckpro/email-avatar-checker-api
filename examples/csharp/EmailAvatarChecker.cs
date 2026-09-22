using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class EmailAvatarChecker
{
    static async Task Main()
    {
        var apiKey = Environment.GetEnvironmentVariable("EMAILCHECKPRO_API_KEY")
            ?? throw new Exception("Set EMAILCHECKPRO_API_KEY");
        using var client = new HttpClient();
        client.DefaultRequestHeaders.Add("X-API-Key", apiKey);
        var content = new StringContent("{\"service_type\":\"email_avatar\",\"identifier\":\"alex.kim@gmail.com\"}", Encoding.UTF8, "application/json");
        var response = await client.PostAsync("https://emailcheckpro.com/api/v1/check", content);
        var body = await response.Content.ReadAsStringAsync();
        response.EnsureSuccessStatusCode();
        Console.WriteLine(body);
    }
}
