# Chat
Pet-project of participant Dell mentorship program. Made with Java. 

### Server part
### Execution

# 2. REST API 

| Method | Type | Arguments' type | Arguments | Description |
| --- | --- | --- | --- | --- |
| `/app/sentMessages` | **POST** | `application/json` | `message` - text of user's message, `sender` - user's nickname |  Receives chat message from registered user |
| `/app/chat.newUser` | **POST** | `application/json` | `sender` - user's nickname |  Registers user by specified name |
| `/topic/publishedMessages` | **GET** | - | - | Posts messages, received from clients |