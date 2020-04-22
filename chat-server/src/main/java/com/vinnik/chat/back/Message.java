package com.vinnik.chat.back;

public class Message {

    private String content;
    private String sender;

    public Message() {

    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }


    public Message(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

}
