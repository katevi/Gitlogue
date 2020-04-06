package com.vinnik.chat.back;

public class TextMessage {

    private String text;

    public TextMessage() {
    }

    public TextMessage(String name) {
        this.text = name;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
