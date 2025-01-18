# Gamer's Helper
Our little Discord bot, helping us on [GameVibe](https://gamevibe.xyz) server.

## Features:
- Plays music in voice
- Sends newest game deals - games currently for free
- Controls my personal PC
- Controls hosted Minecraft servers
- Can send group messages

## Informational:
This bot is very proprietary for our server, so it may not work out of the box and you will need to dig a little. I suggest you start in `config.json`, where you change some IDs based on your Discord environment.

### Required ENVs:
These can be set in `.env` that will be passed to Docker

```bash
# Mongo URL with credentials
MONGO_SRV=mongodb+srv://user:password@mongohost.local

# NGROK token for accessing NGROK tunnels - Minecraft
NGROK_AUTH="dasdasd789sd7987d89asdsda7sdaysd5a6d456asd7"

# Non interactive command prefix
PREFIX=!

# Pushbullet token to push notifications to controll the computer (Legacy)
PUSHBULLET_ACCESS_TOKEN="q.fzf534q2426v"

# Discord API token
TOKEN="wernmGHJHIKGd89as89.dasd3232n.Udas0dbkaHGVBY78"
```

### Run:
```bash
docker compose up --build -d
```

### Run (dockerless):
```bash
npm i
node index.js
```
