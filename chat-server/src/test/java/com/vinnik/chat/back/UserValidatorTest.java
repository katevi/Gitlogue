package com.vinnik.chat.back;

import com.vinnik.chat.back.perstistence.User;
import com.vinnik.chat.back.perstistence.UserController;
import com.vinnik.chat.back.perstistence.UserService;
import static org.junit.Assert.*;

import com.vinnik.chat.back.perstistence.UserValidator;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;


public class UserValidatorTest {
    private final User user;

    public UserValidatorTest() {
        user = new User();
        user.setFullName("Ivan Ivanov");
        user.setNickname("ivan");
        user.setGitHubAccount("github/ivan");
        user.setPassword("12345");
    }

    @Test
    public void validateNewUser() {
        UserController controller = new UserController();
        assertEquals(HttpStatus.OK, controller.saveOrUpdateUser(user));
        assertEquals(HttpStatus.FORBIDDEN, controller.saveOrUpdateUser(user));
        controller.deleteUser(user.getNickname());
    }

    @Test
    public void validateUser() {
        UserController controller = new UserController();
        assertEquals(HttpStatus.OK, controller.saveOrUpdateUser(user));
        UserValidator userValidator = new UserValidator();

    }
}
