package com.vinnik.chat.back.perstistence;

public class UserValidator {

    public static boolean validateNewUser(UserService userService, User user) throws NicknameAlreadyExistsException {
        if (!validateNickname(userService, user.getNickname())) {
            throw new NicknameAlreadyExistsException();
        }
        return true;
    }

    public static boolean validateUser(UserService userService, User user) throws IncorrectLoginOrPasswordException {
        if (!validatePasswordAndNickname(userService, user)) {
            throw new IncorrectLoginOrPasswordException();
        }
        return true;
    }

    private static boolean validatePasswordAndNickname(UserService userService, User user) {
        if (userService.findByNickname(user.getNickname()) == null) {
            return false;
        }
        User expectedUser = userService.findByNickname(user.getNickname());
        if (!expectedUser.getPassword().equals(user.getPassword())) {
            return false;
        }
        return true;
    }

    private static boolean validateNickname(UserService userService, String nickname) {
        return userService.findByNickname(nickname) == null;
    }
}
