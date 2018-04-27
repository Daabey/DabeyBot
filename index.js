const Discord = require('discord.js');
const YTDL = require("ytdl-core");
const low = require('lowdb')
const FlieSync = require('lowdb/adapters/FileSync')

const adapter = new FlieSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp: []}).write()

function play(connection, message) {
    var servers = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0],{filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
});
}

var bot = new Discord.Client();
var prefix = ("+")
var servers = {};

bot.on('ready', function() {
    bot.user.setActivity("Command: +help vAlpha");
    console.log("Connected");
});

bot.login(process.env.TOKEN);


bot.on('message', message => {
 
    if (message.content === prefix + "help"){
        message.channel.send("Pour le Momement y'a que +xp c est une version d'alpha");
    }

    if (message.content === "Daabey <3"){
        message.reply("Salam les kheys :) <3");
        consol.log("Commande Daabey <3 effectué");
    }
    
    var msgauthor = message.author.is;

    if(message.author.bot)return;
    
    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
        console.log(userxpdb);
        var userxp = Object.values(userxpdb)
        console.log(userxp)  
        console.log(`Nombre d'xp: ${userxp[1]}`)

         db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();

    if (message.content === prefix + "xp"){
        var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
            .setTitle(`Stat des XP de ${message.author.username}`)
            .setColor('#F4D03F')
            .setDescription("Affichage des XP")
            .addField("XP:", `${xpfinal[1]} xp`)
            .setFooter("Enjoy :p Daabey <3")
        message.channel.send({embed: xp_embed});   
 
    }} 
})    
bot.on("guildMemberAdd", member => {

    const channel = member.guild.channels.find("name", "général");
    if (!channel) return;
    channel.send(`Bienvenue ${member}`);
    
         var role = member.guild.roles.find('name', "membres");
              member.addRole(role);
    });
           
     bot.on("guildMemberRemove", member => {
      const channel = member.guild.channels.find("name", "général");
      if (!channel) return;
      channel.send(`${member} Viens de quitter bye bye`);
            });
    
        switch (args[0].toLowerCase()) {
            case "play":
            if (!args[1]) {
                message.channel.sendMessag("veuillez fournir un lien !");
                return;
            }
           
            if (!message.member.voiceChannel) {
                message.channel.sendMessage("Tu dois etre dans un voice channel !")
                return;
            }
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
             
                    var server = servers[message.guild.id];

                    server.queue.push(args[1]);

                    if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                        play(connection, message);
                    });
                    break;
                case "skip":
                 var server = servers[message.guild.id];

                 if(server.dispatcher) server.dispatcher.end();
                 break;
                case "stop":
                var server = servers[message.guild.id];

                if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
