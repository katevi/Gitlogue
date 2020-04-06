package com.vinnik.chat.back;

public class TextMessage {

    private String name;

    public TextMessage() {
    }

    public TextMessage(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
