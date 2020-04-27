package com.vinnik.chat.back.perstistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api")
public class UserRestController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @GetMapping("/user")
    public User getUserByUserNickname(@RequestParam String nickname) {
        return userService.findByNickname(nickname);
    }

    @GetMapping(value = "/registered")
    public List<User> getAllStudents() {
        return userService.findAll();
    }

    @PostMapping("/login")
    @SendTo("/response")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            userValidator.validateUser(userService, user);
            return new ResponseEntity<>("Authorization completed successful", HttpStatus.OK);
        } catch (IncorrectLoginOrPasswordException e) {
            return new ResponseEntity<>("Incorrect login or password", HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * Receives user's metadata and if it is valid, returns received password and nickname,
     * otherwise returns null.
     */
    @PostMapping(path="/registration", consumes="application/json", produces="application/json")
    @SendTo("/response")
    public ResponseEntity<User> saveOrUpdateUser(@RequestBody User user) {
        try {
            User responseUser = user;
            String decodedPassword = user.getPassword();

            userValidator.validateNewUser(userService, user);
            userService.saveOrUpdateUser(user);
            responseUser.setPassword(decodedPassword);

            return new ResponseEntity<>(responseUser, HttpStatus.OK);
        } catch (NicknameAlreadyExistsException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }


    /**
     * Set avatar to user.
     * @param nickname - name of user, whose avatar to set.
     * @param file - user's avatar.
     * @return - if avatar set successfully returns ok status, if file is null, returns "not acceptable" status
     */
    @PostMapping("/user/avatar")
    public ResponseEntity<?> setAvatar(@RequestParam("nickname") String nickname, @RequestParam("avatar") MultipartFile file) {
        try {
            User user = userService.findByNickname(nickname);
            user.setAvatar(file.getBytes());
            userService.saveOrUpdateUser(user);
            return new ResponseEntity(HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }


    @DeleteMapping("/user")
    public ResponseEntity<?> deleteUser(@RequestParam("nickname") String nickname) {
        userService.deleteUser(nickname);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Allows browsers to make preflight requests.
     */
    @RequestMapping(value = "/**", method = RequestMethod.OPTIONS)
    public ResponseEntity handle() {
        return new ResponseEntity(HttpStatus.OK);
    }
}
