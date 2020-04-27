package com.vinnik.chat.back;

public class Message {

    private String content;
    private String sender;

    private String receiver;

    public Message() {

    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
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
