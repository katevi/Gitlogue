package com.vinnik.chat.back.perstistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class UserValidator {
    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean validateNewUser(UserService userService, User user) throws NicknameAlreadyExistsException {
        if (!validateNickname(userService, user.getNickname())) {
            throw new NicknameAlreadyExistsException();
        }
        return true;
    }

    public boolean validateUser(UserService userService, User user) throws IncorrectLoginOrPasswordException {
        if (!validatePasswordAndNickname(userService, user)) {
            throw new IncorrectLoginOrPasswordException();
        }
        return true;
    }

    private boolean validatePasswordAndNickname(UserService userService, User user) {
        if (userService.findByNickname(user.getNickname()) == null) {
            return false;
        }
        User expectedUser = userService.findByNickname(user.getNickname());
        String receivedPassword = user.getPassword();
        if (!passwordEncoder.matches(receivedPassword, expectedUser.getPassword())) {
            System.out.println(expectedUser.getPassword() + "****" + receivedPassword);
            return false;
        }
        return true;
    }

    private boolean validateNickname(UserService userService, String nickname) {
        return userService.findByNickname(nickname) == null;
    }
}
