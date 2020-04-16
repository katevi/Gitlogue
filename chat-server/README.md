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
| `/registration/users/` | **GET** | - | - | Gets all registered users |
| `/registration/user/{nickname}`| **GET** | - | nickname - nickname of registered user | Gets user by specialized nickname |
| `/registration/user/{nickname}` | **DELETE** | - | nickname - nickname of registered user | Deletes user by specialized nickname |
| `/registration/user/` | **POST** | `application/json` | `nickname` - registering user's nickname, `fullName` - registering user's full name, `password` - registering user's password, `gitHubAccount` - link to the registering user's gitHub account |
| `registration/user/response/` | **POST** | `message/http`| - | Sends http status code about result of registration |
| `login/user/` | **POST** | `application/json` | `nickname` - nickname of user, who want to log in, `password` - user's password | Tries to log in user with specialized metadata |
| `login/user/response` | **POST** | `message/http` | - | Sends http status code about result of login |