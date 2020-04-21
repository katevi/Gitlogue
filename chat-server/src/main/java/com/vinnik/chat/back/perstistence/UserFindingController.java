package com.vinnik.chat.back.perstistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("search/users")
public class UserFindingController {
    @Autowired
    private UserService userService;

    @GetMapping("/nickname/{nickname}")
    public User getUserByUserNickname(@PathVariable("nickname") String nickname) {
        return userService.findByNickname(nickname);
    }

    @GetMapping("/id/{id}")
    public User getUserById(@PathVariable("id") String id) {
        return userService.findByUserId(id);
    }

    @GetMapping("/fullName/{fullName}")
    public User getUserByFullName(@PathVariable("fullName") String fullName) {
        return userService.findByUserId(fullName);
    }

    @GetMapping("/")
    public List<User> getAllStudents() {
        return userService.findAll();
    }
}
