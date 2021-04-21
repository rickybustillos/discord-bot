const api = require("./api.js");

const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log(`Bot foi iniciado, com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`);
  client.user.setActivity( `o Ricky pela janela`, { type: 'PLAYING' });
});

client.on("guildCreate", guild => {
  console.log(`O bot entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros! `);
});

client.on("guildDelete", guild => {
  console.log(`O bot foi removido do servidor ${guild.name} (id: ${guild.id})`);
})

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  const args = message.content.slice(config.prefix.length).split(/ +/g);
  const comando = args[0].toLowerCase();

  if(comando === "cep") {
    var m = await message.channel.send("Verificando CEP.");
    // Atribuindo o valor do CEP a uma variável
    var cep = args[1];

    // Removendo caracteres especiais caso tenha
    cep = cep.replace(/[^0-9]/gi, "");

    // Verificando se o CEP possui um tamanho válido
    if (cep.length == 8) {
      m.edit('Coletando dados desse CEP...');
      api.get('https://viacep.com.br/ws/'+cep+'/json/').then(dados => {
        dados = JSON.stringify(dados, null, 2);
        m.edit('```json\n'+dados+'\n```');
      });
    } else {
      await message.channel.send("O cep está incorreto.");
    }

  }

  if(comando === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! A latência é ${m.createdTimestamp - message.createdTimestamp}ms. A latência da API é ${client.ws.ping}ms.`);
  }

});

client.login(config.token);