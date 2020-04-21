package com.vinnik.chat.back.perstistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImplementation implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(String nickname) {
        User expectedUser = userRepository.findByNickname(nickname);
        userRepository.delete(expectedUser);
    }

    @Override
    public User findByFullName(String fullName) {
        User user = userRepository.findByFullName(fullName);
        return user;
    }

    @Override
    public User findByUserId(String id) {
        User user = userRepository.findByUserId(id);
        return user;
    }

    @Override
    public User findByNickname(String nickname) {
        return userRepository.findByNickname(nickname);
    }

    @Override
    public void saveOrUpdateUser(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }
}
