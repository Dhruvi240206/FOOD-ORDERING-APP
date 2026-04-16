import com.sun.net.httpserver.*;
import java.io.*;
import java.net.InetSocketAddress;
import java.util.*;

public class Server {

    static UserService userService = new UserService();
    static Cart cart = new Cart();

    public static void main(String[] args) throws Exception {

        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        // LOGIN API
        server.createContext("/login", exchange -> {
            if (exchange.getRequestMethod().equalsIgnoreCase("POST")) {

                String body = new String(exchange.getRequestBody().readAllBytes());
                Map<String, String> data = parse(body);

                boolean success = userService.login(data.get("email"), data.get("password"));

                String response = success ? "SUCCESS" : "FAIL";
                sendResponse(exchange, response);
            }
        });

        // ORDER API
        server.createContext("/order", exchange -> {
            if (exchange.getRequestMethod().equalsIgnoreCase("POST")) {

                OrderService orderService = new OrderService();
                orderService.processOrder(cart);

                sendResponse(exchange, "Order Placed!");
            }
        });

        server.setExecutor(null);
        server.start();

        System.out.println("Server running at http://localhost:8080");
    }

    // Helper: parse form data
    static Map<String, String> parse(String body) {
        Map<String, String> map = new HashMap<>();
        String[] pairs = body.split("&");

        for (String pair : pairs) {
            String[] kv = pair.split("=");
            map.put(kv[0], kv[1]);
        }
        return map;
    }

    static void sendResponse(HttpExchange exchange, String response) throws IOException {
        exchange.sendResponseHeaders(200, response.length());
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
}