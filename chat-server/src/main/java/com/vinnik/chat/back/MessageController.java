package com.vinnik.chat.back;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class MessageController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/sendedMessages")
    @SendTo("/topic/publishedMessages")
    public Message greeting(@Payload Message message) throws Exception {
        return message;
    }

    @MessageMapping("/chat.private.{receiver}")
    public Message sendToSpecificUser(@PathVariable String receiver, @Payload Message message) throws Exception {
        simpMessagingTemplate.convertAndSend("/user/" + receiver +"/", message);
        return message;
    }
}
