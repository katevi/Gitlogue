package com.vinnik.chat.back.perstistence;

public class UserValidator {

    public boolean validateNewUser(UserService userService, User user) throws NicknameAlreadyExistsException {
        if (!validateNickname(userService, user.getNickname())) {
            throw new NicknameAlreadyExistsException();
        }
        return true;
    }

    private boolean validateNickname(UserService userService, String nickname) {
        return userService.findByNickname(nickname) == null;
    }
}
