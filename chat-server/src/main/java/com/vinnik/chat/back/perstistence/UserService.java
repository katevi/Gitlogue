package com.vinnik.chat.back.perstistence;

import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserService {
    User findByNickname(String nickname);
    void saveOrUpdateUser(User user);
    List<User> findAll();
    void deleteUser(String nickname);
    User findByFullName(@Param("fullName") String fullName);
    User findByUserId(@Param("id") String id);
}
