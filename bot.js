const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
  console.log('[Bot] Включен!');
  client.user.setStatus('available')
  client.user.setPresence({ activity: { name: 'твоем ANAL пальцем' }, status: '1' })
});
function arrayRandElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}
// message.author.send("123") 
client.on('message', message => {
  if(message.content === ".пинг") message.delete(),message.channel.send("<@"+message.author.id+'> я не сплю!').then(m => m.delete({timeout: 1000 * 30}));
  if(message.channel.name === '├📝┤заявки') {
    if(message.content.includes('Общая информация.') && message.content.includes('Игровая информация.') && message.content.includes('Откуда вы о нас узнали? (Ник рекрута/видео/чат):') && message.content.includes('Дополнительная информация.')){
      var arr = ['https://media.tenor.com/images/116b7c643ca23c3814bd06aac7c5183e/tenor.gif','https://media.tenor.com/images/515890bed747d2b22798d2e9c3f8ffce/tenor.gif',"https://media.tenor.com/images/c655317acf2715b47de6454ef2a77947/tenor.gif","https://media.tenor.com/images/59b19cbf2f4ccbb3453791faf837b307/tenor.gif","https://media.tenor.com/images/c6c06054d66324182dadf822cae49a2e/tenor.gif","https://i.gifer.com/C4wf.gif","https://i.gifer.com/47tv.gif","https://media.tenor.com/images/d470f38a6ddc0c3dd32f1c94ad5f6c43/tenor.gif","https://media.tenor.com/images/4ac2ac840e2b30e86b1937a7668f7b7a/tenor.gif","https://media.tenor.com/images/06d22dd40d562a2055ae9e80d2141dec/tenor.gif","https://i.gifer.com/VAyR.gif","https://i.gifer.com/Vg5.gif","https://i.gifer.com/6mG.gif","https://i.gifer.com/Be.gif","https://i.gifer.com/tGe.gif","https://i.gifer.com/Paw.gif"];
      var rand = Math.floor(Math.random() * arr.length);
      let massiv = message.content.split('\n');
      var nick = massiv[7].substring(massiv[7].indexOf("- Имя персонажа: ") + 16, massiv[7].length);
      let chann1 = message.guild.channels.cache.find(channel => channel.name === "├📝┤проверка-заявок");
      if(massiv[0].includes('1. Общая информация.'))
      {
        if(massiv[2].substring(massiv[2].indexOf("- Ваш возраст: ") + 15, massiv[2].length) < 14) return message.delete(), message.channel.send("<@"+message.author.id+">\nУвы, но вы нам не подходите :pensive:  \nПриходите как повзрослеете").then(m => m.delete({timeout: 1000 * 30}));
        if(nick.includes('  ')||nick.includes(' ')) return message.delete(), message.channel.send("<@"+message.author.id+">\nУкажите свой ник в игре/уберите лишние пробелы из пункта игровой ник").then(m => m.delete({timeout: 1000 * 30}));
        const embed = {"title":
            message.member.displayName + ", ваша заявка была отправлена на проверку!\nОтвет по ваше заявки вы получите в ЛС",
            "color": 3316565,
            "thumbnail": {
              "url": arr[rand],
            },
            "footer": {
                "text": "Заявки | AvalonsMasters"
            }
        };
        chann1.send(message.content + "\nАвтор анкеты: <@" + message.author.id + ">\nhttps://app.sigmacomputing.com/embed/2Fb3n6osB7MZ0psRKGqR6?name="+nick),message.delete(), message.channel.send({embed}).then(m => m.delete({timeout: 1000 * 30}));
      }
    }
  }
  else if(message.channel.name === '├📝┤проверка-заявок')
  {
    if(message.content.includes('Общая информация.') && message.content.includes('Игровая информация.') && message.content.includes('Дополнительная информация.')){
      message.react('✅');
      message.react('❌');
      message.react('🗑️');
      let massiv = message.content.split('\n');
      var nick = massiv[7].substring(massiv[7].indexOf("- Имя персонажа ") + 16, massiv[7].length);
      let chann2 = message.guild.channels.cache.find(channel => channel.name === "├📝┤лог-заявки");
      let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
      let filter = (reaction, user) => reaction.emoji.name == '✅' && user.id != message.author.id || reaction.emoji.name == '🗑️' && user.id != message.author.id || reaction.emoji.name == '❌' && user.id != message.author.id;
      message.awaitReactions(filter, {max: 1})
	    			.then(collected => {
	    				const reaction = collected.first();
	    				if(reaction.emoji.name === '✅')
	    				{
                dUser.send(`Доброго времени суток :wave:\nРад вам сообщить что ваша заявка на вступлению в гилью AvalonsMasters - **одобрена** :smiley: :handshake:\nПросьба в ближайшее время связаться с одним из рекрутеров из списка ниже, так - же **изучите** канал правил <#792496674941173771>.\n<@529963505407754244>\n<@404348692515127297>\n<@428090031639363595>\n<@424272265945808917>\n<@330708859394064395>\n<@411508439752245249>`);
                chann2.send(message.content);
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
});
client.login(process.env.token);
