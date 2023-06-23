const telegramApi = require('node-telegram-bot-api');
const axios = require('axios');

process.env["NTBA_FIX_350"] = 1

const token = '6080535377:AAEjS9BpyEHCNISq-D-r2wPY3aWSkesR4IE';

const stickersObj = {
  favor: 'CAACAgIAAxkBAAEJa6ZkktNzA7zMVxZ55yU_-cc2agy0MgACEyQAAtn6YUjRlmdm6LR15C8E'
}

const imgObj = {
    kiss: '../loveBot/img/kiss.jpg',
}

const bot = new telegramApi(token, {polling: true});
let chatId = 937439730;

setInterval(async () => {
  const date = new Date();
  // K = C + 273,15.
  if (date.getHours() === 12 && date.getMinutes() === 22) {
    await bot.sendMessage(chatId, `Доброе утро`);
    await axios.get('http://api.openweathermap.org/data/2.5/weather?q=Zelenograd,ru&APPID=eb38728c789610266c28269ce27507b5')
    .then(function (response) {
      bot.sendMessage(msg.chat.id, `Погода в Зеленограде сейчас ${Math.round(response.data.main.temp - 273.15)}°C. Чувствуется как ${Math.round(response.data.main.feels_like - 273.15)}°C. Скорость ветра ${response.data.wind.speed} м/c. Влажность ${response.data.main.humidity}%`);
    })
  }
}, 60000)

bot.setMyCommands([
    {command: '/love', description: 'Признание в любви'},
    {command: '/compliment', description: 'Комплимент для любимой'},
    {command: '/start', description: 'Старт'},
])

bot.on('message', async msg => {
    const text = msg.text;
    if (!text) return
    if (text === '/start') {
      chatId = msg.chat.id;
      await bot.sendMessage(msg.chat.id, `Солнышко, этот чат для тебя, тут и будут комплименты, но пока я его разрабатываю :)`);
      return;
    }
    if (text === '/love') {
        chatId = msg.chat.id;
        await bot.sendMessage(msg.chat.id, `Я тебя очень сильно люблю`);
        await bot.sendSticker(msg.chat.id, stickersObj.favor)
        return;
    }
    if (text === '/compliment') {
        chatId = msg.chat.id;
        await bot.sendMessage(msg.chat.id, `Ты очень красивая`);
        return;
    }

    if (text.slice(0, 5).toLowerCase() === 'люблю') {
      await bot.sendMessage(msg.chat.id, `И я тебя очень сильно`);
      return;
    }
    // await bot.sendPhoto(msg.chat.id, imgObj.kiss)
    // await bot.sendMessage(msg.chat.id, arr);
    // await bot.sendSticker(msg.chat.id, stickersObj.favor)
    await axios.get('http://api.openweathermap.org/data/2.5/weather?q=Zelenograd,ru&APPID=eb38728c789610266c28269ce27507b5')
    .then(function (response) {
      bot.sendMessage(msg.chat.id, `Погода в Зеленограде сейчас ${Math.round(response.data.main.temp - 273.15)}°C. Чувствуется как ${Math.round(response.data.main.feels_like - 273.15)}°C. Скорость ветра ${response.data.wind.speed} м/c. Влажность ${response.data.main.humidity}%`);
    })
    return;
})

