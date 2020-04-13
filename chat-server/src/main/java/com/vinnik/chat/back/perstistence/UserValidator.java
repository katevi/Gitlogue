package com.vinnik.chat.back.perstistence;


public class UserValidator {
    private final UserService userService;

    public UserValidator(UserService userService) {
        this.userService = userService;
    }

    public boolean validateNewUser(User user) throws NicknameAlreadyExistsException {
        if (!validateNickname(user.getNickname())) {
            throw new NicknameAlreadyExistsException();
        }
        return true;
    }

    private boolean validateNickname(String nickname) {
        return userService.findByNickname(nickname) == null;
    }
}
