public class Order {
    private Cart cart;

    public Order(Cart cart) {
        this.cart = cart;
    }

    public void placeOrder() {
        System.out.println("Order placed!");
        System.out.println("Total amount: ₹" + cart.getTotal());
    }
}