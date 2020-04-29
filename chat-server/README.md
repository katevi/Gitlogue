# Chat
Pet-project of participant Dell mentorship program. Made with Java. 


## Server part


### 1. Execution
1. docker build . -t gitlogue-server
2. docker run -p 8080:8080 gitlogue-server

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