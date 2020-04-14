package com.vinnik.chat.back.perstistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @Autowired
    private UserService userService;

    private UserValidator userValidator;

    @GetMapping("/")
    @SendTo("/authorizationResponse")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            userValidator.validateUser(userService, user);
            return new ResponseEntity<>("Authorization completed successful", HttpStatus.OK);
        } catch (IncorrectLoginOrPasswordException e) {
            return new ResponseEntity<>("Incorrect login or password", HttpStatus.FORBIDDEN);
        }
    }
}
