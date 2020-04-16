package com.vinnik.chat.back.perstistence;

import java.util.List;

public interface UserService {
    User findByNickname(String nickname);
    void saveOrUpdateUser(User user);
    List<User> findAll();
    void deleteUser(String nickname);
}
