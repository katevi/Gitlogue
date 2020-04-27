package com.vinnik.chat.back.perstistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/user/nickname/")
    public User getUserByUserNickname(@RequestParam("nickname") String nickname) {
        return userService.findByNickname(nickname);
    }

    @GetMapping("/user/id/}")
    public User getUserById(@RequestParam("id") String id) {
        return userService.findByUserId(id);
    }

    @GetMapping("/user/fullName/")
    public User getUserByFullName(@RequestParam("fullName") String fullName) {
        return userService.findByFullName(fullName);
    }

    @GetMapping("/")
    public List<User> getAllUsers() {
        return userService.findAll();
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

    @DeleteMapping("/")
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
