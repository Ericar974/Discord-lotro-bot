const Discord = require('discord.js');

const Client = new Discord.Client;

const prefix = "&" 

const idServer = "819663166720049172"

//id des roles
const roleT1 = "819898201305776158"
const roleT2 = "819898824427438090"
const roleT3 = "819899050693623858"
const roleT4 = "819899231292096512"

//id des messages pour retirer/ajouter role
const msgRemoveT1 = "820743150002765875"
const msgRemoveT2 = "820736677818925066"
const msgRemoveT3 = "820737233459871755"

function addRole(reaction, user, role) {
    var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
    member.roles.add(role).then(mbr => {
        console.log("Rôle attribué avec succès")
    }).catch(err => {
        console.log("Le rôle n'a pas pu être attribué ") + err;
    });
};

function removeRole(reaction, user, role) {
    var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
    member.roles.remove(role).then(mbr => {
        console.log("Rôle retiré avec succès")
    }).catch(err => {
        console.log("Le rôle n'a pas pu être retiré ") + err;
    });
}

function stockMsg(guildId, channelId, msgId) {
    Client.guilds.cache.find(guild => guild.id === guildId).channels.cache.find(channel => channel.id === channelId).messages.fetch(msgId).then(message => {
        console.log("message ajouté à la mémoire : " + message.content);
    }).catch(err =>{
        console.log("Impossible d'ajouté le message en mémoire : " + err);
    });
}


//Strat des boss
const phaseB1 = ["Foudre & Acide", "Foudre & Feu", "Acide & Foudre", "Acide & Feu", "Feu & Foudre", "Feu & Acide"]
let i = ''
let j = ''
function datePB1() {
   var x = Date.now() - 1615449600000
        if( x % 3628800000 <= 604800000){
            i = phaseB1[0];
            j = phaseB1[1];
        }else if( (x % 3628800000) >= 604800000 && (x % 3628800000) <= 1209600000) {
            i = phaseB1[1];
            j = phaseB1[2];
        }else if( (x % 3628800000) >= 1209600000 && (x % 3628800000) <= 1814400000) {
            i = phaseB1[2];
            j = phaseB1[3];
        }else if( (x % 3628800000) >= 1814400000 && (x % 3628800000) <= 2419200000) {
            i = phaseB1[3];
            j = phaseB1[4];
        }else if( (x % 3628800000) >= 2419200000 && (x % 3628800000) <= 3024000000) {
            i = phaseB1[4];
            j = phaseB1[5];
        }else if( (x % 3628800000) >= 3024000000 && (x % 3628800000) <= 3628800000) {
            i = phaseB1[5];
            j = phaseB1[0];
        }

}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function getRandomGif(gifs) {
    let a = getRandomInt(gifs.length)
    return gifs[a]
}
const gifAsk = ["https://tenor.com/view/gandalf-awizard-is-never-later-gif-11324448", "https://tenor.com/view/iam-looking-for-someone-to-share-in-an-adventure-gandalf-ian-mc-kellen-lord-of-the-rings-gif-15651459", "https://tenor.com/view/gandalf-decide-lord-of-the-rings-gif-12825539", "https://tenor.com/view/lord-of-the-rings-gandalf-indeed-gif-18505269", "https://tenor.com/view/gandalf-paper-reading-old-lord-of-the-rings-gif-16045045", ]


//
//
//
//
// A la connexion du bot / démarrage :

Client.on("ready", () =>{
    console.log("bot opérationnel");

    //récupère un message en mémoire :
    stockMsg(idServer, "819676341502607380", msgRemoveT1)
    stockMsg(idServer,"819677700897112164", msgRemoveT2)
    stockMsg(idServer, "819677898910203905", msgRemoveT3)
});

//A l'arrivé d'un membre dans le serveur :

Client.on("guildMemberAdd", member => {
    console.log("Un nouveau membre est arrivé");

    //Message de bienvenue
    member.guild.channels.cache.find(channel => channel.id === "819663166720049174").send("Bienvenue à toi " + member.displayName + " !\nNous sommes désormais **" + member.guild.memberCount + "** sur le serveur !");

    //Ajoute un rôle
    member.roles.add(roleT1).then(mbr => {
        console.log("Rôle attribué avec succès")
    }).catch(() => {
        console.log("Le rôle n'a pas pu être attribué");
    });
});

//Reactions au message :

Client.on("messageReactionAdd", (reaction, user) => {
    if(user.bot) return;

    console.log(user.username + ' à réagit avec' + reaction.emoji.name);

    if(reaction.message.id === msgRemoveT1){
        if(reaction.emoji.name === "1️⃣"){
            addRole(reaction, user, roleT1)
        }
    }else if(reaction.message.id === msgRemoveT2){
        if(reaction.emoji.name === "1️⃣"){
            addRole(reaction, user, roleT1)
        }else if(reaction.emoji.name === "2️⃣"){
            addRole(reaction, user, roleT2)
        }
    }else if(reaction.message.id === msgRemoveT3){
        if(reaction.emoji.name === "1️⃣"){
            addRole(reaction, user, roleT1)
        }else if(reaction.emoji.name === "2️⃣"){
            addRole(reaction, user, roleT2)
        }else if(reaction.emoji.name === "3️⃣"){
            addRole(reaction, user, roleT3)
        }
    }


    //Retire automatiquement la reaction
    /*
    reaction.users.remove(user.id).then(react => {
        console.log("reaction " + react.emoji.name + " retiré par le bot");
    }).catch(err => {
        console.log("impossible de retirer la réaction : " + err);
    });
    */
});

//Quand une réaction est enlever :

Client.on("messageReactionRemove", (reaction, user) => {
    if(user.bot) return;
    
    console.log("reaction retirer");

    if(reaction.message.id === msgRemoveT1){
        if(reaction.emoji.name === "1️⃣"){
            removeRole(reaction, user, roleT1)
        }
    }else if(reaction.message.id === msgRemoveT2){
        if(reaction.emoji.name === "1️⃣"){
            removeRole(reaction, user, roleT1)
        }else if(reaction.emoji.name === "2️⃣"){
            removeRole(reaction, user, roleT2)
        }
    }else if(reaction.message.id === msgRemoveT3){
        if(reaction.emoji.name === "1️⃣"){
            removeRole(reaction, user, roleT1)
        }else if(reaction.emoji.name === "2️⃣"){
            removeRole(reaction, user, roleT2)
        }else if(reaction.emoji.name === "3️⃣"){
            removeRole(reaction, user, roleT3)
        }
    }
});

//Action lors d'un message :

Client.on("message", content => {
    if(content.author.bot) return;
    if(content.channel.type == "dm") return;

    /*
    content.react("1️⃣");
    content.react("2️⃣"); 
    content.react("3️⃣"); 
    content.react("4️⃣");
    */


    if(content.content == prefix + '?'){
        let b = getRandomGif(gifAsk)
        content.channel.send(b)
        content.channel.send("```py\n\"Voici les commandes disponibles :\n\n    - '&PB1' Phases actuelles du boss 1 de Remmorchant\n-   - '&PB1+1' Phases de la semaine prochaine du meme boss\"```")
    }else if(content.content == prefix + 'PB1'){
        datePB1()
        content.channel.send(i)
    }else if(content.content == prefix + 'PB1+1'){
        datePB1()
        content.channel.send(j)
    }

    

});



//Connexion du bot au serveur : 

Client.login(process.env.TOKEN);