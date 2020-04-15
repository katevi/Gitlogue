package com.vinnik.chat.back.perstistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("registration/users")
public class RegistrationController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @GetMapping("/{nickname}")
    public User getUserByUserNickname(@PathVariable("nickname") String nickname) {
        return userService.findByNickname(nickname);
    }

    @GetMapping(value = "/")
    public List<User> getAllStudents() {
        return userService.findAll();
    }

    @PostMapping("/")
    @SendTo("/response")
    public ResponseEntity<?> saveOrUpdateUser(@RequestBody User user) {
        try {
            userValidator.validateNewUser(userService, user);
            userService.saveOrUpdateUser(user);
            return new ResponseEntity("User added successfully", HttpStatus.OK);
        } catch (NicknameAlreadyExistsException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Nickname already exists", HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/{nickname}")
    public ResponseEntity<?> deleteUser(@PathVariable("nickname") String nickname) {
        userService.deleteUser(nickname);
        return new ResponseEntity<>("User deleted successful", HttpStatus.NO_CONTENT);
    }
}
