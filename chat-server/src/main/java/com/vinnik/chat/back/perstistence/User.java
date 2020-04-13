package com.vinnik.chat.back.perstistence;

import org.springframework.data.annotation.Id;

public class User {

    @Id private String id;
    private String nickname;
    private String fullName;
    private String password;

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
}
