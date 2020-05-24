# Chat

## Requirements

* Angular CLI 6.2.4 or above;

## Build & Run


### Docker
```
docker build -t katevi-chat .
docker run -itd -p 8081:8081 katevi-chat
```
Please, note that port for the application serving should match `SERVER_PORT` within [.env](.env) file.

## Angular
```
ng build --prod
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


# Troubleshooting

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
3.  'entrypoint.sh problems in Windows'
```
    : not foundt.sh: line 2:
    : not foundt.sh: line 3:
    ./entrypoint.sh: line 9: syntax error: unexpected end of file (expecting "do")
```
Move to Unix line endings. Way to fix via ```Notepad++``` :
	- open ```entrypoint.sh```
	- ```"Edit"``` -> ```"EOL Conversion"``` -> ```"Unix (LF)"```
Articles: [Dealing With Windows Line Endings](https://willi.am/blog/2016/08/11/docker-for-windows-dealing-with-windows-line-endings/), [*.sh not found](https://stackoverflow.com/questions/40487747/trying-to-build-a-docker-container-start-sh-not-found)