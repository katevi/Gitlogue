# Chat
Pet-project of participant Dell mentorship program. Made with Java. 


## Server part


### 1. Docker
1. ```docker-compose up```

### 2. Development server
1. ```gradle bootJar```
2. Navigate to ```build/libs/```
3. ```java -jar chat-server-0.0.1-SNAPSHOT.jar```

### 2. REST API 
| Method | Type | Arguments' type | Arguments | Description |
| --- | --- | --- | --- | --- |
| `/sentMessages` | **POST** | `application/json` | `message` - text of user's message, `sender` - user's nickname |  Server receives chat message from registered user |
| `/topic/publishedMessages` | **GET** | - | - | Server posts messages, received from clients |
| `/chat.private.{receiver}` | **POST** | `application/json` | - | Post private message |
| `/users/` | **GET** | - | - | Get all registered users |
| `/users/` | **DELETE** | `application/json` | ```nickname``` - nickname of registered user | Delete user by specified nickname |
| `/users/user/avatar` | **POST** | `application/json/` | `avatarData` - file of user's avatar | Set user's avatar|
| `/users/user/fullName/` | **GET** | `application/json/` | `fullName` - user's full name | Find user by specified full name |
| `/users/user/nickname/` | **GET** | `application/json/` | `nickname` - user's nickname | Find user by specified nickname |
| `/users/user/id/` | **GET** | `application/json/` | `avatarData` - file of user's avatar | Find user by specified id |
| `/registration/` | **POST** | `application/json` | `nickname` - registering user's nickname, `fullName` - registering user's full name, `password` - registering user's password, `gitHubAccount` - link to the registering user's gitHub account | Register user with given metadata |
| `/login/` | **POST** | `application/json` | `nickname` - nickname of user want to log in, `password` - user's password | Log in user with specialized metadata |