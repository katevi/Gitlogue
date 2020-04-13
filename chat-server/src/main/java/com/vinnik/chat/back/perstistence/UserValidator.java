package com.vinnik.chat.back.perstistence;


public class UserValidator {
    private final UserService userService;

    public UserValidator(UserService userService) {
        this.userService = userService;
    }

    public boolean validateNewUser(User user) throws NicknameAlreadyExistsException, GitHubAccountDoesNotExistException, PasswordMismatchException {
        if (!validatePassword(user.getMatchingPassword(), user.getPassword())) {
            throw new PasswordMismatchException();
        }

        if (!validateNickname(user.getNickname())) {
            throw new NicknameAlreadyExistsException();
        }
        if (!validateGitHubAccount()) {
            throw new GitHubAccountDoesNotExistException();
        }
        return true;
    }

    private boolean validatePassword(String matchingPassword, String password) {
        return matchingPassword.equals(password);
    }

    private boolean validateGitHubAccount() {
        return true;
    }

    private boolean validateNickname(String nickname) {
        return userService.findByNickname(nickname) == null;
    }
}
