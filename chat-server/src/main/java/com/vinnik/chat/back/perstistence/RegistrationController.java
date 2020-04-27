package com.vinnik.chat.back.perstistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/registration")
public class RegistrationController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    /**
     * Receives user's metadata and if it is valid, returns received password and nickname,
     * otherwise returns null.
     */
    @PostMapping(path="/", consumes="application/json", produces="application/json")
    @SendTo("/response")
    public ResponseEntity<User> register(@RequestBody User user) {
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
     * Allows browsers to make preflight requests.
     */
    @RequestMapping(value = "/**", method = RequestMethod.OPTIONS)
    public ResponseEntity handle() {
        return new ResponseEntity(HttpStatus.OK);
    }
}
