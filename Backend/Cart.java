import java.util.*;

public class Cart {
    private List<FoodItem> items = new ArrayList<>();

    public void addItem(FoodItem item) {
        items.add(item);
    }

    public void showCart() {
        for (FoodItem item : items) {
            System.out.println(item.getName() + " - ₹" + item.getPrice());
        }
    }

    public double getTotal() {
        double total = 0;
        for (FoodItem item : items) {
            total += item.getPrice();
        }
        return total;
    }
}