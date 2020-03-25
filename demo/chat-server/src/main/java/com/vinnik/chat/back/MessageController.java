package com.vinnik.chat.back;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class MessageController {


    @MessageMapping("/sendedMessages")
    @SendTo("/topic/publishedMessages")
    public Message greeting(TextMessage message) throws Exception {
        return new Message(HtmlUtils.htmlEscape(message.getName()));
    }

}
