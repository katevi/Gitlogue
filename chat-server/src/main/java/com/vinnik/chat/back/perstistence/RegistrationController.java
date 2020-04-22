package com.vinnik.chat.back.perstistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
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
            System.out.println("User = " + user.getNickname() + " " + user.getAvatar() + "!!!");
            userValidator.validateNewUser(userService, user);
            userService.saveOrUpdateUser(user);
            return new ResponseEntity("User added successfully", HttpStatus.OK);
        } catch (NicknameAlreadyExistsException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Nickname already exists", HttpStatus.CONFLICT);
        }
    }

    /*@PostMapping("/{id}/avatar")
    public ResponseEntity<?> setAvatar(@PathVariable String id, @RequestParam MultipartFile file) {
        try {
            User user = userService.findByUserId(id);
            user.setAvatar(file.getBytes());
            userService.saveOrUpdateUser(user);
            System.out.println("Received avatar");
            return new ResponseEntity("User's avatar added successfully", HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("File not found", HttpStatus.NOT_FOUND);
        }
    }*/


    @DeleteMapping("/{nickname}")
    public ResponseEntity<?> deleteUser(@PathVariable("nickname") String nickname) {
        userService.deleteUser(nickname);
        return new ResponseEntity<>("User has been successfully removed", HttpStatus.NO_CONTENT);
    }

    /**
     * Allows browsers to make preflight requests.
     */
    @RequestMapping(value = "/**", method = RequestMethod.OPTIONS)
    public ResponseEntity handle() {
        return new ResponseEntity(HttpStatus.OK);
    }
}
