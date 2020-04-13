package com.vinnik.chat.back.perstistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{nickname}")
    public User geUserByUserNickname(@PathVariable("nickname") String nickname) {
        return userService.findByNickname(nickname);
    }

    @GetMapping(value = "/")
    public List<User> getAllStudents() {
        return userService.findAll();
    }

    @PostMapping("/")
    public ResponseEntity<?> saveOrUpdateUser(@RequestBody User user) {
        userService.saveOrUpdateUser(user);
        return new ResponseEntity("User added successfully", HttpStatus.OK);
    }

    @DeleteMapping("/{nickname}")
    public ResponseEntity<?> deleteUser(@PathVariable("nickname") String nickname) {
        userService.deleteUser(nickname);
        return new ResponseEntity("User added successfully", HttpStatus.OK);
    }
}
