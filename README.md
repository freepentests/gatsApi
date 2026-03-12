# gatsApi
GatsApi is a free, open-source API that enables developers to programmatically interact with gats.io via websockets.

## Tutorial
To use GatsApi in your userscripts, you must do the following:
- Hook your player's websocket
- Intialize GatsApi by typing this: `const gatsApi = new GatsApi(mainPlayerWebsocket)`
- Now you can use commands such as gatsApi.game.sendChatMessage() or gatsApi.events.addEventListener()
You might also want to bundle this first to include it in your 

## ⚠️ This library is currently in development and probably has bugs. If you find any, then you can report them in the "Issues" section on GitHub.

