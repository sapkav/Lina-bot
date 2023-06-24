// const telegramApi = require('node-telegram-bot-api');
// const axios = require('axios');
import telegramApi from 'node-telegram-bot-api';
import axios from 'axios';
import obj from './token';

process.env["NTBA_FIX_350"] = 1;

const imgObj = {
    kiss: '../loveBot/img/kiss.jpg',
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const bot = new telegramApi(obj.tgToken, {polling: true});
let chatId;

setInterval(async () => {
  const date = new Date();
  // K = C + 273,15.
  if (date.getHours() === 6 && date.getMinutes() === 0) {
    await bot.sendMessage(chatId, `Доброе утро, ${obj.nameArr[getRandomInt(0, obj.nameArr.length - 1)]}`);
    await bot.sendSticker(msg.chat.id, obj.stickersArr[getRandomInt(0, obj.stickersArr.length - 1)])
    await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Zelenograd,ru&APPID=${obj.tokenWeather}`)
    .then(function (response) {
      bot.sendMessage(chatId, `Погода в Зеленограде сейчас ${Math.round(response.data.main.temp - 273.15)}°C. Чувствуется как ${Math.round(response.data.main.feels_like - 273.15)}°C. Скорость ветра ${response.data.wind.speed} м/c. Влажность ${response.data.main.humidity}%`);
    })
  }
}, 60000)

bot.setMyCommands([
    {command: '/love', description: 'Признание в любви'},
    {command: '/compliment', description: 'Комплимент для любимой'},
    {command: '/start', description: 'Старт'},
    {command: '/kiss', description: 'Поцелуй'},
])

bot.on('message', async msg => {
    const text = msg.text;
    chatId = msg.chat.id;
    if (!text) return

    if (text === '/start') {
      await bot.sendMessage(msg.chat.id, `Солнышко, этот чат для тебя, тут и будут комплименты, но пока я его разрабатываю :)`);
      return;
    }

    if (text === '/love') {
        await bot.sendMessage(msg.chat.id, `Я тебя очень сильно люблю`);
        await bot.sendSticker(msg.chat.id, obj.stickersArr[0])
        return;
    }

    if (text === '/compliment') {
        await bot.sendMessage(msg.chat.id, obj.compliments[getRandomInt(0, obj.compliments.length - 1)]);
        await bot.sendSticker(msg.chat.id, obj.stickersArr[getRandomInt(0, obj.stickersArr.length - 1)])
        return;
    }

    if (text === '/kiss') {
      await bot.sendMessage(msg.chat.id, 'Целую');
      await bot.sendPhoto(msg.chat.id, imgObj.kiss)
      return;
    }

    if (text.slice(0, 5).toLowerCase() === 'люблю') {
      await bot.sendMessage(msg.chat.id, `И я тебя очень сильно`);
      return;
    }

    return;
})


