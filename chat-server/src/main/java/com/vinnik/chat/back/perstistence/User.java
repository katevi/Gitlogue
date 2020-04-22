package com.vinnik.chat.back.perstistence;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import javax.persistence.Column;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Date;

public class User {
    @Id
    @NotNull
    @NotEmpty
    private String userId;

    @NotNull
    @NotEmpty
    private String nickname;

    @NotNull
    @NotEmpty
    private String fullName;

    @NotNull
    @NotEmpty
    private String password;

    @NotNull
    @NotEmpty
    private String gitHubAccount;

    @NotNull
    @Column(name="timestamp", columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private long timestamp = Instant.now().getEpochSecond();

    public Avatar getAvatar() {
        return avatar;
    }

    public void setAvatar(Avatar avatar) {
        this.avatar = avatar;
    }

    @DBRef
    private Avatar avatar;

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

    public String getGitHubAccount() {
        return this.gitHubAccount;
    }

    public void setGitHubAccount(String gitHubAccount) {
        this.gitHubAccount = gitHubAccount;
    }

    public String getNickname() {
        return this.nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
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
