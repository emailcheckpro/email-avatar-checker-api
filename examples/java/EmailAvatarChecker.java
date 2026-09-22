import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class EmailAvatarChecker {
    public static void main(String[] args) throws Exception {
        String apiKey = System.getenv("EMAILCHECKPRO_API_KEY");
        if (apiKey == null) throw new IllegalStateException("Set EMAILCHECKPRO_API_KEY");
        String body = "{\"service_type\":\"email_avatar\",\"identifier\":\"alex.kim@gmail.com\"}";
        HttpRequest request = HttpRequest.newBuilder(URI.create("https://emailcheckpro.com/api/v1/check"))
            .header("X-API-Key", apiKey)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(body))
            .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() >= 300) throw new IllegalStateException(response.body());
        System.out.println(response.body());
    }
}
