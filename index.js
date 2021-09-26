/**********************************************CONSTS********************************************************************/

const Discord = require('discord.js');

const Client = new Discord.Client;

const prefix = "&" 

const idServer = "819663166720049172"

const  idChanGandalf = "821532392191033384"

//commandes du bot
const CPB1   = "     -   &PB1    - Remmorchant phases du boss 1 + phases de la semaine prochaine\n"
const CCAPS  = "     -   &CAPS   - Tout les caps de stats + courbe d'évolution\n"
//Commandes secrète Admin
//&Strat pour actionner les gifs raids dans le salon souhaité... A faire à l'heure souhaité

//emoji classe
const messageClass = "839811316520452097"

const Runekeepericon = "839773926422347787"
const Wardenicon = "839773923852025906"
const Loremastericon = "839773923691462656"
const Captainicon = "839773923611508736"
const Burglaricon = "839773923519627304"
const Championicon = "839773923448193025"
const Minstrelicon = "839773923415556107"
const Huntericon = "839773923293396993"
const Guardianicon = "839773923259318283"
const Beorningicon = "839773923180937236"
const Brawlericon = "891634147729215498"

const roleRK = '839804210173313046'
const roleWARD = '839804289870462978'
const roleLM = '839804293456592916'
const roleCAP = '839804305736990741'
const roleBURG = '839804308978925588'
const roleCHAMP = '839804312862326834'
const roleMINI = '839804316688580610'
const roleHUNT = '839804320392282113'
const roleGUARD = '839804331423563776'
const roleBEOR = '839804334102544394'
const roleBRAW = '891634590488330250'

//Const pour PB1
const phaseB1 = ["Acide & Foudre", "Acide & Feu", "Feu & Foudre", "Feu & Acide", "Foudre & Acide", "Foudre & Feu"]
let i = ''
let j = ''

//Tableau de messages
const usersMap = new Map();

/**********************************************FUNCTIONS********************************************************************/



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
        console.log("message ajouté à la mémoire: " + message.content);
    }).catch(err =>{
        console.log("Impossible d'ajouté le message en mémoire : " + err);
    });
}

//Commandes de Gandalf

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


/*********************************************TABLE GIF************************************************************/


const gifAsk = [
    "https://tenor.com/view/gandalf-awizard-is-never-later-gif-11324448",
    "https://tenor.com/view/iam-looking-for-someone-to-share-in-an-adventure-gandalf-ian-mc-kellen-lord-of-the-rings-gif-15651459",
    "https://tenor.com/view/gandalf-decide-lord-of-the-rings-gif-12825539", 
    "https://tenor.com/view/lord-of-the-rings-gandalf-indeed-gif-18505269", 
    "https://tenor.com/view/gandalf-paper-reading-old-lord-of-the-rings-gif-16045045",
    "https://64.media.tumblr.com/f730cd32b5830e5713495775f4c7a756/tumblr_mf8mepiFxY1qeeqito4_250.gif"

]

const gifRaid = [
    ["https://64.media.tumblr.com/tumblr_maf90va4l91ru8yv8o2_250.gif", "Wype time !\n"],//raid
    ["https://64.media.tumblr.com/tumblr_maf90va4l91ru8yv8o3_250.gif", "Bon wypes à tous\n"],//wype is ok
    ["https://media1.giphy.com/media/61tYloUgq1eOk/giphy.gif", "Allez vous préparez pour votre raid !\n"],//raid
    ["https://media3.giphy.com/media/13aEHIldkd7Ous/giphy.gif?cid=ecf05e47a90ylu1mj4hkmyjx33uxkkf3gp6n8jjav9mk8lnz&rid=giphy.gif", "Attention a celui qui vas tanker ce soir\n"], //raid
    ["https://tenor.com/view/lotr-saruman-gandalf-spin-gif-16037094", "*est en train de faire Orthanc T2*\n"],//orthanc
    ["https://tenor.com/view/gandalf-paper-reading-old-lord-of-the-rings-gif-16045045", "Chut !! Je lis la strat de ce soir\n"],//strat
    ["https://tenor.com/view/gandalf-awizard-is-never-later-gif-11324448", "C'est l'heure de raid !\n"],//retard
]
    

/*********************************************START************************************************************/



// A la connexion du bot / démarrage :

Client.on("ready", () =>{
    console.log("bot opérationnel");
    //récupère un message en mémoire :
    stockMsg(idServer, idChanGandalf, messageClass)
});





//A l'arrivé d'un membre dans le serveur :

Client.on("guildMemberAdd", member => {
    console.log("Un nouveau membre est arrivé");

    var embed = new Discord.MessageEmbed()
        .setColor("#6575AC")
        .setTitle('Un nouveau membre nous à rejoints !')
        .setDescription(member.user.toString() + ", Bienvenue dans le Hall des PU !\n\n\n- Présentation du serveur -> <#819684543820464159>\n\n- Channel de discussions -> <#819676341502607380>\n\n- Outils pour raid -> [lotro.fr](https://lotro.fr/) *Pas de compte ? clique [ici](https://lotro.fr/forum/index.php?action=register)*\n"  )
        .setThumbnail(member.user.displayAvatarURL())    

    //Message de bienvenue
    member.guild.channels.cache.find(channel => channel.id === "819663166720049174").send(embed);
});

//Reactions au message :

Client.on("messageReactionAdd", (reaction, user) => {
    if(user.bot) return;

    if(reaction.message.id === messageClass){
        if(reaction.emoji.id === Runekeepericon){
            addRole(reaction, user, roleRK)
        }else if(reaction.emoji.id === Wardenicon){
            addRole(reaction, user, roleWARD)
        }else if(reaction.emoji.id === Loremastericon){
            addRole(reaction, user, roleLM)
        }else if(reaction.emoji.id === Captainicon){
            addRole(reaction, user, roleCAP)
        }else if(reaction.emoji.id === Burglaricon){
            addRole(reaction, user, roleBURG)
        }else if(reaction.emoji.id === Championicon){
            addRole(reaction, user, roleCHAMP)
        }else if(reaction.emoji.id === Minstrelicon){
            addRole(reaction, user, roleMINI)
        }else if(reaction.emoji.id === Huntericon){
            addRole(reaction, user, roleHUNT)
        }else if(reaction.emoji.id === Guardianicon){
            addRole(reaction, user, roleGUARD)
        }else if(reaction.emoji.id === Beorningicon){
            addRole(reaction, user, roleBEOR)
        }else if(reaction.emoji.id === Brawlericon){
            addRole(reaction, user, roleBRAW)
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

    if(reaction.message.id === messageClass){
        if(reaction.emoji.id === Runekeepericon){
            removeRole(reaction, user, roleRK)
        }else if(reaction.emoji.id === Wardenicon){
            removeRole(reaction, user, roleWARD)
        }else if(reaction.emoji.id === Loremastericon){
            removeRole(reaction, user, roleLM)
        }else if(reaction.emoji.id === Captainicon){
            removeRole(reaction, user, roleCAP)
        }else if(reaction.emoji.id === Burglaricon){
            removeRole(reaction, user, roleBURG)
        }else if(reaction.emoji.id === Championicon){
            removeRole(reaction, user, roleCHAMP)
        }else if(reaction.emoji.id === Minstrelicon){
            removeRole(reaction, user, roleMINI)
        }else if(reaction.emoji.id === Huntericon){
            removeRole(reaction, user, roleHUNT)
        }else if(reaction.emoji.id === Guardianicon){
            removeRole(reaction, user, roleGUARD)
        }else if(reaction.emoji.id === Beorningicon){
            removeRole(reaction, user, roleBEOR)
        }else if(reaction.emoji.id === Brawlericon){
            removeRole(reaction, user, roleBRAW)
        }
    }
});








//Action lors d'un message :

Client.on("message", content => {
    if(content.author.bot)return;
    if(content.channel.type == "dm") return;

    if(content.channel.id === idChanGandalf){
        //commandes
        if(content.content == prefix + "?" && content.member.hasPermission("ADMINISTRATOR")){
                let b = getRandomGif(gifAsk)
                content.channel.send(b)
                content.channel.send("```py\n\"Commandes disponibles : (Je ne répond pas aux messages privés)\n\n" + CPB1 + CCAPS + "\n- Gandalf le gris.\"```")
            
        }else if(content.content == prefix + 'PB1'){
                datePB1()
                content.author.send("```py\n\"Cette semaine : " + i + "\"```")
                content.author.send("```fix\nJeudi prochain : " + j + "```")
            
        }else if(content.content == prefix + 'CAPS'){
                content.author.send('```py\n"Caps du lvl 130 :"```', {files: ['./img/stat.jpg']}) 
                content.author.send('```py\n"Courbe d\'évolution des chances de critique : \n(les autres statistiques fonctionnent de la même façon)"```', {files: ['./img/courbe.png']})
            
        }
        content.delete()
    }
    /* faire le message des roles
    content.react("1️⃣");
    content.react("2️⃣"); 
    content.react("3️⃣"); 
    content.react("4️⃣");
    content.react(Runekeepericon)
        content.react(Wardenicon)
        content.react(Loremastericon)
        content.react(Captainicon)
        content.react(Burglaricon)
        content.react(Championicon)
        content.react(Minstrelicon)
        content.react(Huntericon)
        content.react(Guardianicon)
        content.react(Beorningicon)
    */

});





/****************************************CONNEXION****************************************************/


//Connexion du bot au serveur :
Client.login(process.env.TOKEN);

