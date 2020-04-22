package com.vinnik.chat.back.perstistence;

import org.springframework.data.annotation.Id;

import javax.persistence.Column;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.Instant;

public class User {
    @Id
    @NotNull
    @NotEmpty
    private String userId;

    @NotNull
    @NotEmpty
    private String userName;

    @NotNull
    @NotEmpty
    private String fullName;

    @NotNull
    @NotEmpty
    private String password;

    @NotNull
    @NotEmpty
    private String githubAccUrl;

    @NotNull
    @Column(name="timestamp", columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private long timestamp = Instant.now().getEpochSecond();

    public byte[] getAvatar() {
        return avatar;
    }

    public void setAvatar(byte[] avatar) {
        this.avatar = avatar;
    }

    @NotNull
    @Column(name= "avatar")
    private byte[] avatar;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGithubAccUrl() {
        return this.githubAccUrl;
    }

    public void setGithubAccUrl(String gitHubAccount) {
        this.githubAccUrl = gitHubAccount;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String nickname) {
        this.userName = nickname;
    }

    public String getFullName() {
        return this.fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public long getTimestamp() {
        return this.timestamp;
    }
}
