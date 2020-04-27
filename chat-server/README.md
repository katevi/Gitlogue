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
| `/sentMessages` | **POST** | `application/json` | `message` - text of user's message, `sender` - user's nickname |  Server receives chat message from registered user |
| `/topic/publishedMessages` | **GET** | - | - | Server posts messages, received from clients |
| `/api/registered` | **GET** | - | - | Get all registered users |
| `/api/user`| **GET** | `application/json` | ```nickname``` - nickname of registered user | Get user by specialized nickname |
| `/api/user` | **DELETE** | `application/json` | ```nickname``` - nickname of registered user | Delete user by specialized nickname |
| `/api/user` | **POST** | `application/json` | `nickname` - registering user's nickname, `fullName` - registering user's full name, `password` - registering user's password, `gitHubAccount` - link to the registering user's gitHub account | Register user with given metadata |
| `api/user/avatar` | **POST** | `application/json/` | `avatarData` - file of user's avatar | Set user's avatar|
| `/api/login/` | **POST** | `application/json` | `nickname` - nickname of user want to log in, `password` - user's password | Log in user with specialized metadata |