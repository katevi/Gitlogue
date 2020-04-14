package com.vinnik.chat.back;

import com.vinnik.chat.back.perstistence.User;

import org.junit.jupiter.api.Test;


public class UserValidatorTest {
    private final User user;

    public UserValidatorTest() {
        this.user = new User("Ivan Ivanov", "ivan", "github/ivan", "12345");
    }

    @Test
    public void validateNewUser() {
    }

    @Test
    public void validateUser() {
    }
}
