# Chat

## Requirements

* Angular CLI 6.2.4 or above;

## Build & Run

### Docker
```
docker build -t katevi-chat .
docker run -itd -p 8081:8081 katevi-chat
```
Please, note that port for the application serving should match `SERVER_PORT` within (.env)[.env] file.

## Angular
```
ng build --prod
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Troubleshooting

1. StompJS installation
```
ERROR in ./node_modules/stompjs/lib/stomp-node.js
Module not found: Error: Can't resolve 'net' in '/Users/Andrey/Developer/mentorship/KateChat/Chat/chat-client/angular/chat/node_modules/stompjs/lib'
```
Fixed by `npm i net -S`

2. 'Global not defined'
Add the following code into `polyfills.ts`:
```
/**
 * Workaround for https://github.com/angular/angular-cli/issues/8160
 */
(window as any).global = window; 
```