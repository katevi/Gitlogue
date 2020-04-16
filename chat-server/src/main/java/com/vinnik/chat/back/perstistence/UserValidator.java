package com.vinnik.chat.back.perstistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserValidator {
    @Autowired
    private PasswordEncoder passwordEncoder;


    public boolean validateNewUser(final UserService userService, final User user) throws NicknameAlreadyExistsException {
        if (!validateNickname(userService, user.getNickname())) {
            throw new NicknameAlreadyExistsException();
        }
        return true;
    }

    public boolean validateUser(final UserService userService, final User user) throws IncorrectLoginOrPasswordException {
        if (!validatePasswordAndNickname(userService, user)) {
            throw new IncorrectLoginOrPasswordException();
        }
        return true;
    }

    private boolean validatePasswordAndNickname(final UserService userService, final User user) {
        final User expectedUser = userService.findByNickname(user.getNickname());
        if (expectedUser == null) {
            return false;
        }
        final String receivedPassword = user.getPassword();
        if (!passwordEncoder.matches(receivedPassword, expectedUser.getPassword())) {
            return false;
        }
        return true;
    }

    private boolean validateNickname(final UserService userService, final String nickname) {
        return (userService.findByNickname(nickname) == null);
    }
}
