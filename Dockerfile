FROM node:20
# Create the bot's directory

RUN mkdir -p /usr/src/bot

WORKDIR /usr/src/bot
RUN apt update
RUN apt upgrade -y
RUN apt install -y ffmpeg

COPY package.json /usr/src/bot
COPY patches /usr/src/bot
RUN npm install



COPY . /usr/src/bot
RUN npm run postinstall


# Start the bot.

CMD ["node", "index.js"]
