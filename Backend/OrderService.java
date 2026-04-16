public class OrderService {

    public void processOrder(Cart cart) {
        Order order = new Order(cart);
        order.placeOrder();
    }
}