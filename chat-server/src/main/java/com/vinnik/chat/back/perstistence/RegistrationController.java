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

    /**
     * Receives user's metadata and if it is valid, returns received password and nickname,
     * otherwise returns null.
     */
    @PostMapping(path="/", consumes="application/json", produces="application/json")
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
    @PostMapping("/avatar/{nickname}")
    public ResponseEntity<?> setAvatar(@PathVariable String nickname, @RequestParam("avatar") MultipartFile file) {
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


    @DeleteMapping("/{nickname}")
    public ResponseEntity<?> deleteUser(@PathVariable("nickname") String nickname) {
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
