# Chat
Pet-project of participant Dell mentorship program. Made with Java. 


## Server part


### 1. Execution
1. ```gradle bootJar```
2. Navigate to ```build/libs/```
3. ```java -jar chat-server-0.0.1-SNAPSHOT.jar```

### 2. REST API 
| Method | Type | Arguments' type | Arguments | Description |
| --- | --- | --- | --- | --- |
| `/app/sentMessages` | **POST** | `application/json` | `message` - text of user's message, `sender` - user's nickname |  Server receives chat message from registered user |
| `/app/chat.newUser` | **POST** | `application/json` | `sender` - user's nickname |  Server registers user by specified name |
| `/topic/publishedMessages` | **GET** | - | - | Server posts messages, received from clients |
| `/registration/users/` | **GET** | - | - | Get all registered users |
| `/registration/users/{nickname}`| **GET** | - | nickname - nickname of registered user | Get user by specialized nickname |
| `/registration/users/{nickname}` | **DELETE** | - | nickname - nickname of registered user | Delete user by specialized nickname |
| `/registration/users/` | **POST** | `application/json` | `nickname` - registering user's nickname, `fullName` - registering user's full name, `password` - registering user's password, `gitHubAccount` - link to the registering user's gitHub account | Register user with given metadata |
| `/login/user/` | **POST** | `application/json` | `nickname` - nickname of user want to log in, `password` - user's password | Log in user with specialized metadata |