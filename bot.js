const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log(`Bot foi iniciado, com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`);
  client.user.setActivity( `o Ricky pela janela`, { type: 'PLAYING' });
});

client.on("guildCreate", guild => {
  console.log(`O bot entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros! `);
  client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores`);
});

client.on("guildDelete", guild => {
  console.log(`O bot foi removido do servidor ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Servindo ${client.guilds.cache.size} servidor.`)
})

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();
});

client.login(config.token);