# gatsApi documentation

Welcome to gatsApi. Our documentation is designed to guide you through features of our library such as listening for events, sending chat messages, controlling your character, upgrading, and more.

## 1. Initializing GatsApi

GatsApi is a class, and to access its methods, you must first initialize it. The GatsApi constructor takes a single argument - a websocket. To get your main player's websocket, you need to first hook it. You must write your own logic that intercepts and captures all websockets when they are opened.

Once you have hooked the websocket, you can initialize GatsApi using the following syntax:

```js
const gatsApi = new GatsApi(ws);
```

---

## 2. Game events

### i) Listening for chat messages

You can listen for chat messages using the events.createChatMessagesListener() method. This method takes one argument - the callback function. When one or more chat messages are received, the chat messages will be passed into the callback function as an array of objects. Here is an example of the createChatMessagesListener() method.

```js
const gatsApi = new GatsApi(ws);

gatsApi.events.createChatMessagesListener((messages) => {
    messages.forEach((message) => {
        if (message.messageContents.toLowerCase().includes('hi')) {
            gatsApi.game.sendChatMessage(`Hello! Your ID is ${message.senderId}`); 
        }
    });
});
```

### ii) Listening for player info

To get information about nearby players, you can use events.createPlayerInfoListener(). Like createChatMessagesListener(), this method also takes a callback as the argument. When player information is received, the information of nearby players will be passed to the callback function as an array of Player objects. The first element of the array will be your player.

```js
const gatsApi = new GatsApi(ws);

gatsApi.events.createPlayerInfoListener((players) => {
    players.forEach((player) => {
        if (player.speedX !== 0 || player.speedY !== 0) {
            console.log(`Player with ID ${player.playerId} just moved.`);
        }
    });
});
```

### iii) Listening for entity updates

The events.createEntityUpdateListener() method gives you every single entity in raw format. The following code will log the raw data that the server sends to the client.

```js
const gatsApi = new GatsApi(ws);

gatsApi.events.createEntityUpdateListener((entities) => {
    console.log(entities); // outputs the raw data received from the server
});
```

---

## 3. Game

### i) Joining the game

To join the game, you can use game.joinGame(). joinGame() accepts three arguments - the ID of the weapon you want to join the game with, the level of armor you want to join with (0 for no armor, 3 for max armor), and the color of your player. Example:

```
const gatsApi = new GatsApi(ws);

gatsApi.game.joinGame(GatsApi.weapons.sniper, 1, GatsApi.colors.orange); // joins the game as an orange player with a sniper and level 1 armor.
```
> If you join with this, you'll probably get a blank screen if you're using it on your main player's ws.

### ii) Sending chat messages

To programmatically send chat messages, you can use the game.sendChatMessage() method. It accepts a single argument, which is the message you want to send in the chat. Example:

```
const gatsApi = new GatsApi(ws);

gatsApi.game.sendChatMessage('this is a chat message sent from gatsApi');
```

---

## 4. Inputs

### i) Aiming

With gatsApi, you can use the inputs.aim() method to aim towards a specific direction. aim() takes a single argument - the direction to face towards in degrees. Here is a piece of code that makes your player spin around in a circle:

```js
const gatsApi = new GatsApi(ws);

let degrees = 0;
setInterval(() => {
    degrees += 1;
    degrees = degrees % 360;

    gatsApi.inputs.aim(degrees);
});
```

> This only updates your player server-side; the updated yaw of your gun will not render client side. If you think it has not changed, it probably has.

### ii) Send ping

To send a single ping to the server, you can use the inputs.sendPing() method, which requires no arguments to be passed. Example:

```js
const gatsApi = new GatsApi(ws);

gatsApi.inputs.sendPing();
```

### iii) Start and stop shooting

To make your player start shooting, you can use the inputs.startShoot() method, and to stop shooting, use inputs.stopShoot(). The following example makes your player shoot for 10 seconds, then stop shooting.

```js
const gatsApi = new GatsApi(ws);

gatsApi.inputs.startShoot();
setTimeout(gatsApi.inputs.stopShoot.bind(gatsApi.inputs), 10 * 1000);
```

### iv) Player movement

You can use inputs.startMove() and inputs.stopMove() to start and stop moving. These both accept one argument - the ID of the direction to move in (left, right, up, down). Here's a piece of code that moves up for 2 seconds then stops:

```js
const gatsApi = new GatsApi(ws);

gatsApi.inputs.startMove(GatsApi.directions.up);
setTimeout(() => {
    gatsApi.inputs.stopMove(GatsApi.directions.up);
}, 2000);
```

---

## 5. Upgrades

gatsApi has two main features you can use to manage upgrades.

### i) Get an upgrade/item

You can buy an upgrade with upgrades.upgrade(), which accepts the ID of the item you want to buy, and well as the slot (1 for level 1 upgrades such as damage, 2 for level 2 upgrades such as grenades, and 3 for level 3 upgrades). The following code buys a grenade for slot 2:

```js
const gatsApi = new GatsApi(ws);

gatsApi.upgrades.upgrade(GatsApi.upgrades.grenade, 2);
```

> If you've bought an item using this, then it won't show up on the items menu, but it has still been bought.

### ii) Use an item

To use an item, simply just call upgrades.useItem() without any arguments, and it will use an item.

```js
const gatsApi = new GatsApi(ws);

gatsApi.upgrades.useItem();
```

