
const Discord = require('discord.js');
const bot = new Discord.Client();
const low = require('lowdb')
const FlieSync = require('lowdb/adapters/FileSync')

const adapetr = new FlieSync('database.json');
const db = low(adapeter);

db.defaults({ histoires: [], xp: []}).write()

var prefix = ("+")

bot.on('ready', function() {
    bot.user.setGame("9liliwi.Bot is here bae dir +help ila b4ti lcommandes"); 
    console.log("Connected");
});

bot.login(process.env.TOKEN);


bot.on('message', message => {
 
    if (message,content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
            .setTitle(`Iwa a si ${message.author.username} les commandes homa`)
            .setColor('#F4D03F')
            .setDescription("7aliyan 7it lbot ba9i a Version Alpha kayna commande w7da o li hia ")
            .addField(prefix,"+xp:had cmd tate wrik l xp o niveau dyalk ")
            .addField(prefix,"hsdfsfsfsdf")
            .setFooter("Enjoy :p Daabey <3")
        message.channel.send({embed: help_embed});   
    
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
    
    }}})
