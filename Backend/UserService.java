public class UserService {

    private User user = new User("user@gmail.com", "1234");

    public boolean login(String email, String password) {
        if (user.getEmail().equals(email) && user.checkPassword(password)) {
            return true;
        }
        return false;
    }
}