package com.vinnik.chat.back.perstistence;

import org.springframework.validation.Errors;

public class UserValidator {
    private final UserService userService;

    public UserValidator(UserService userService) {
        this.userService = userService;
    }

    public boolean validateNewUser(User user) throws NicknameAlreadyExistsException, GitHubAccountDoesNotExistException {

        if (!validateNickname(user.getNickname())) {
            throw new NicknameAlreadyExistsException();
        }
        if (!validateGitHubAccount()) {
            throw new GitHubAccountDoesNotExistException();
        }
        return true;
    }

    private boolean validateGitHubAccount() {
        return true;
    }

    private boolean validateNickname(String nickname) {
        return userService.findByNickname(nickname) == null;
    }
}
