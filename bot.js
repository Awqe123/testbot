const Discord = require('discord.js');
const client = new Discord.Client({fetchAllMembers:true}); 
var jp = require('jsonpath');
var request = require('request');

client.on('ready', () => {
  console.log('[Bot] Включен!');
  client.user.setStatus('available')
  client.user.setPresence({ activity: { name: 'твоем ANAL пальцем' }, status: '1' });
});
function arrayRandElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}
// message.author.send("123") 
client.on('message', message => {
  if(message.content.startsWith(".ao") && message.member.hasPermission ("ADMINISTRATOR")) 
  {
    let guild = client.guilds.cache.get("809893043502055444");
    guild.members.cache.filter(member => !member.user.bot).forEach(member => member.user.send(message.content.substring(message.content.indexOf(".ao ") + 4, message.content.length)));
    message.delete();
  }
  if(message.channel.name === 'сбор-hg') {
    if(!message.author.bot && !message.content.includes('.hg')){
      message.delete()
      const embed = {"title":"[Ошибка]",
      "color": 16711680,
      "description":"Канал создан только для поиска людей\nКоманды: .hg",
      "timestamp":new Date(),
      "footer": {
          "text": "Mclore Bot | AvalonsMasters"
      }
      };
      message.channel.send({embed}).then(m => m.delete({timeout: 1000 * 30}));
    }
    if (message.content === '.hg') {
      message.delete();
      message.channel.send("Выберите тип HG 2x2 | 5x5");
    }
    if(message.content.includes('Выберите тип HG 2x2 | 5x5')) {
      message.react('2️⃣');
      message.react('5️⃣');
    }   
  }
  if (message.content === '.members') {
    message.delete();
    request('https://gameinfo.albiononline.com/api/gameinfo/guilds/hxYXdU_pQ02RHFumCemDwQ/members', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      data = JSON.parse(body);
      var names = jp.query(data, '$..Name');
      var kolvo = -3;
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          kolvo++;
        }
      }
      const exampleEmbed = {
        title: 'Список людей в гильдии ',
        timestamp: data.Timestamp,
        color: 3316565,
        description: "Всего в гильдии: " +kolvo+" человек",
        fields: [
          {
            name: 'Nick',
            value: names,
            inline: true,
          }
      ],
      footer: {
        text: `Mclore Bot  | AvalonsMasters`
        }
      };
      message.channel.send({ embed: exampleEmbed }).then(m => m.delete({timeout: 1000 * 60}));
      
      }
    })
  }
  if (message.content === '.gold') {
    message.delete();
    request('https://www.albion-online-data.com/api/v2/stats/gold?count=1', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      data = JSON.parse(body)[0];
      message.channel.send('Получаю информацию...').then (async (msg) =>{
        msg.delete()
        const embed = {"title": "Курс золота ",
        "description":"1 золотая монета за " + data.price + " серебра.",
        "timestamp": data.timestamp,
        "thumbnail": {
          "url": "https://albiononline.com/assets/images/shop/gold-21000.png",
        },
        "color": 3316565,
        "footer": {
          "text": `Mclore Bot | AvalonsMasters`
          }
        };
        message.channel.send({embed}).then(m => m.delete({timeout: 1000 * 60}));
      })
      }
    })
  }
  if (message.content === '.ping') {
    message.delete();
    message.channel.send('Получаю информацию...').then (async (msg) =>{
      msg.delete()
      const embed = {"title": "Пропинговка бота.. ",
      "color": 3316565,
      "footer": {
        "text": `Задержка  ${message.createdTimestamp - message.createdTimestamp}ms. \nAPI Задержка ${Math.round(client.ws.ping)}ms`
        }
      };
      message.channel.send({embed}).then(m => m.delete({timeout: 1000 * 10}));
    })
  }
  if(message.channel.name === '├📝┤заявки') {
    if(message.content.includes('1. Общая информация. ')) {
      var arr = ['https://media.tenor.com/images/116b7c643ca23c3814bd06aac7c5183e/tenor.gif','https://media.tenor.com/images/515890bed747d2b22798d2e9c3f8ffce/tenor.gif',"https://media.tenor.com/images/c655317acf2715b47de6454ef2a77947/tenor.gif","https://media.tenor.com/images/59b19cbf2f4ccbb3453791faf837b307/tenor.gif","https://media.tenor.com/images/c6c06054d66324182dadf822cae49a2e/tenor.gif","https://i.gifer.com/C4wf.gif","https://i.gifer.com/47tv.gif","https://media.tenor.com/images/d470f38a6ddc0c3dd32f1c94ad5f6c43/tenor.gif","https://media.tenor.com/images/4ac2ac840e2b30e86b1937a7668f7b7a/tenor.gif","https://media.tenor.com/images/06d22dd40d562a2055ae9e80d2141dec/tenor.gif","https://i.gifer.com/VAyR.gif","https://i.gifer.com/Vg5.gif","https://i.gifer.com/6mG.gif","https://i.gifer.com/Be.gif","https://i.gifer.com/tGe.gif","https://i.gifer.com/Paw.gif"];
      var rand = Math.floor(Math.random() * arr.length);
      let massiv = message.content.split('\n');
      var nick = massiv[7].substring(massiv[7].indexOf("- Имя персонажа:") + 16, massiv[7].length);
      var name = massiv[1].substring(massiv[1].indexOf("- Ваше реальное имя:") + 20, massiv[1].length);
      let chann1 = message.guild.channels.cache.find(channel => channel.name === "├📝┤проверка-заявок");
      if(massiv[0].includes('1. Общая информация.'))
      {
        if(massiv[2].substring(massiv[2].indexOf("- Ваш возраст: ") + 15, massiv[2].length) < 14) return message.delete(), message.channel.send("<@"+message.author.id+">\nУвы, но вы нам не подходите :pensive:  \nПриходите как повзрослеете").then(m => m.delete({timeout: 1000 * 30}));
        if(nick.includes('  ')||nick.includes(' ')) return message.delete(), message.channel.send("<@"+message.author.id+">\nУкажите свой ник в игре/уберите лишние пробелы из пункта 'Имя персонажа:'\nПример как должно выглядить:\n `- Имя персонажа:Vladik2008`").then(m => m.delete({timeout: 1000 * 30}));
        if(name.includes('  ')||name.includes(' ')) return message.delete(), message.channel.send("<@"+message.author.id+">\nУкажите свое реальное имя/уберите лишние пробелы из пункта 'Ваше реальное имя:'\nПример как должно выглядить:\n `- Ваше реальное имя:Владик`").then(m => m.delete({timeout: 1000 * 30}));
        const embed = {"title":
            message.member.displayName + ", ваша заявка была отправлена на проверку!\nОтвет по ваше заявки вы получите в ЛС",
            "color": 3316565,
            "thumbnail": {
              "url": arr[rand],
            },
            "footer": {
                "text": "Mclore Bot | AvalonsMasters"
            }
        };
        chann1.send(message.content + "\nАвтор анкеты: <@" + message.author.id + ">\nhttps://app.sigmacomputing.com/embed/2Fb3n6osB7MZ0psRKGqR6?name="+nick),message.delete(), message.channel.send({embed}).then(m => m.delete({timeout: 1000 * 30}));
      }
    }
    if(!message.author.bot && !message.content.includes('1. Общая информация. ')){
      message.delete()
      const embed = {"title":"[Ошибка]",
      "color": 16711680,
      "description":"Сообщение удалено, данный чат работает только для анкет\nПроверь правильность своей анкеты..",
      "timestamp":new Date(),
      "footer": {
          "text": "Mclore Bot | AvalonsMasters"
      }
      };
      message.channel.send({embed}).then(m => m.delete({timeout: 1000 * 30}));
    }
  }
  else if(message.channel.name === '├📝┤проверка-заявок')
  {
    if(message.content.includes('Общая информация.') && message.content.includes('Игровая информация.') && message.content.includes('Дополнительная информация.')){
      message.react('✅');
      message.react('❌');
      message.react('🗑️');
      let massiv = message.content.split('\n');
      var nick = massiv[7].substring(massiv[7].indexOf("- Имя персонажа:") + 16, massiv[7].length);
      var name = massiv[1].substring(massiv[1].indexOf("- Ваше реальное имя:") + 20, massiv[1].length);
      let chann2 = message.guild.channels.cache.find(channel => channel.name === "├📝┤лог-заявки");
      let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
      let filter = (reaction, user) => reaction.emoji.name == '✅' && user.id != message.author.id || reaction.emoji.name == '🗑️' && user.id != message.author.id || reaction.emoji.name == '❌' && user.id != message.author.id;
      message.awaitReactions(filter, {max: 1})
	    			.then(collected => {
	    				const reaction = collected.first();
	    				if(reaction.emoji.name === '✅')
	    				{
                dUser.send(`Доброго времени суток :wave:\nРад вам сообщить что ваша заявка на вступлению в гилью AvalonsMasters - **одобрена** :smiley: :handshake:\nПросьба в ближайшее время связаться с одним из рекрутеров из списка ниже, так - же **изучите** канал правил <#809893043712688166>.`);
                chann2.send(message.content);
                dUser.setNickname(nick +"("+name+")");
                let guild = client.guilds.cache.get("809893043502055444");
                guild.members.cache.filter(member => !member.user.bot).forEach(member => {
                  if (member.roles.cache.some(r => r.name === "Рекрутёр")){
                    dUser.send('<@' + member.user.id+'>');
                  }
                });
              }
	    				else if(reaction.emoji.name === '❌')
	    				{
                dUser.send("Доброго времени суток :wave:\nУвы, но заявка на вступление в гильдию AvalonsMasters - **отклонена** :pensive:\nВсего доброго!"),chann2.send(message.content), dUser.kick("отказ");
              }
              else if(reaction.emoji.name === '🗑️')
	    				{
                chann2.send(message.content);
              }
				});
    }
  }
});


client.on("messageReactionAdd", (reaction, user) => {
  if(user == client.user) return;
  let cont = reaction.message.content;
  const ussr = reaction.message.guild.members.cache.get(user.id);
  let chann2 = reaction.message.guild.channels.cache.find(channel => channel.name === "├📝┤лог-заявки");
  let chann3 = reaction.message.guild.channels.cache.find(channel => channel.name === "сбор-hg");
  if(cont.includes('Общая информация.') && cont.includes('Игровая информация.') && cont.includes('Дополнительная информация.')){
    if(reaction.emoji.name === "✅"){
      chann2.send("<@"+user.id+"> **Одобрил** заявку");
      reaction.message.delete()
    }
    else if(reaction.emoji.name === "❌"){
      chann2.send("<@"+user.id+"> **Отклонил** заявку");
      reaction.message.delete()
    }
    else if(reaction.emoji.name === "🗑️"){
      chann2.send("<@"+user.id+"> **Удалил** заявку");
      reaction.message.delete()
    }
  }
  if(cont.includes('Выберите тип HG 2x2 | 5x5')) {
    if(reaction.emoji.name === "2️⃣"){
      reaction.message.delete();
      const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setAuthor('Сбор HellGate 2x2 🔥')
      .setDescription('Инициировал сбор <@'+ ussr +'>\nПодключить к каналу => https://discord.gg/ypfRUkBT\nНе забудь ознакомится с каналом <#809424002430926879>\nВсе о HellGate <#809413416560623726>')
      .setThumbnail('https://cdn.discordapp.com/attachments/799141654560243722/809433095342129152/29423-dbf0946f860f8951c01f15a497ef75f06814988c.png')
      .setTimestamp()
      .setFooter('Mclore Bot | AvalonsMasters');
      chann3.send("<@&809407074190098451>").then(m => m.delete({timeout: 1000 * 60 * 10}));;
      chann3.send(exampleEmbed).then(m => m.delete({timeout: 1000 * 60 * 10}));;
      };
      if(reaction.emoji.name === "5️⃣"){
        reaction.message.delete();
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setAuthor('Сбор HellGate 5x5 🔥')
        .setDescription('Инициировал сбор <@'+ ussr +'>\nПодключить к каналу => https://discord.gg/5bgsQpK8\nНе забудь ознакомится с каналом <#809412946240733244>\nВсе о HellGate <#809413416560623726>')
        .setThumbnail('https://cdn.discordapp.com/attachments/799141654560243722/809433095342129152/29423-dbf0946f860f8951c01f15a497ef75f06814988c.png')
        .setTimestamp()
        .setFooter('Mclore Bot | AvalonsMasters');
        chann3.send("<@&809407074190098451>").then(m => m.delete({timeout: 1000 * 60 * 10}));
        chann3.send(exampleEmbed).then(m => m.delete({timeout: 1000 * 60 * 10}));
      }
    }
  }
);
client.login(process.env.token);
