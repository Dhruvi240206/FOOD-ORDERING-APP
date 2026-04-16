import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        UserService userService = new UserService();

        System.out.println("Enter Email:");
        String email = sc.nextLine();

        System.out.println("Enter Password:");
        String pass = sc.nextLine();

        if (!userService.login(email, pass)) {
            System.out.println("Invalid Login");
            return;
        }

        System.out.println("Login Successful!\n");

        // CREATE 8 FOOD ITEMS
        FoodItem f1 = new FoodItem("Burger", 100);
        FoodItem f2 = new FoodItem("Pizza", 200);
        FoodItem f3 = new FoodItem("Pasta", 150);
        FoodItem f4 = new FoodItem("Sandwich", 80);
        FoodItem f5 = new FoodItem("French Fries", 70);
        FoodItem f6 = new FoodItem("Cold Drink", 50);
        FoodItem f7 = new FoodItem("Momos", 120);
        FoodItem f8 = new FoodItem("Noodles", 130);

        Cart cart = new Cart();

        while (true) {
            System.out.println("\n===== MENU =====");
            System.out.println("1. Burger - ₹100");
            System.out.println("2. Pizza - ₹200");
            System.out.println("3. Pasta - ₹150");
            System.out.println("4. Sandwich - ₹80");
            System.out.println("5. French Fries - ₹70");
            System.out.println("6. Cold Drink - ₹50");
            System.out.println("7. Momos - ₹120");
            System.out.println("8. Noodles - ₹130");
            System.out.println("9. View Cart");
            System.out.println("10. Checkout");

            int choice = sc.nextInt();

            switch (choice) {
                case 1: cart.addItem(f1); break;
                case 2: cart.addItem(f2); break;
                case 3: cart.addItem(f3); break;
                case 4: cart.addItem(f4); break;
                case 5: cart.addItem(f5); break;
                case 6: cart.addItem(f6); break;
                case 7: cart.addItem(f7); break;
                case 8: cart.addItem(f8); break;

                case 9:
                    System.out.println("\nYour Cart:");
                    cart.showCart();
                    break;

                case 10:
                    OrderService orderService = new OrderService();
                    orderService.processOrder(cart);
                    return;

                default:
                    System.out.println("Invalid choice");
            }
        }
    }
}