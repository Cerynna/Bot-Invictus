const Users = require("./Users");
const Discord = require("discord.js");
const Jobs = [
  "Alchimiste",
  "Bijoutier",
  "Bricoleur",
  "Bucheron",
  "Chasseur",
  "Cordomage",
  "Cordonnier",
  "Costumage",
  "Facomage",
  "Faconneur",
  "Forgemage",
  "Forgeron",
  "Joaillomage",
  "Mineur",
  "Paysan",
  "Pecheur",
  "Sculptemage",
  "Sculpteur",
  "Tailleur",
];
const Help = {
  config: (message) => {
    message.channel
      .send(
        "**Bienvenue dans le menu de configuration**" +
          "\n" +
          "\n" +
          `${"`"}&config channel set${"`"} : Définie un channel pour le bot Il va crée un message avec tout les metier et le mettre a jour réguliererment` +
          "\n" +
          `${"`"}&config channel set <channel>${"`"} : Specifié un Canal, Click droit sur le canal que vous voulez choisir et faite copier l'identifiant` +
          "\n" +
          `${"`"}&config channel info${"`"} : Info sur le Channel`
      )
      .then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 60000);
      });
  },
  clear: async (channel, force = false) => {
    const allMessages = await channel.messages.fetch();
    let deletable;
    if (!force) {
      deletable = allMessages.filter((message) => !message.pinned);
    } else {
      deletable = allMessages;
    }
    // let count = deletable.map((msg) => {
    //   return msg.id;
    // }).length;
    // if (count >= 1) {
    await channel.bulkDelete(deletable, true);
    // }
  },
  info: (message, guild) => {
    let owner = message.guild.members.cache.get(guild.owner).user;
    let channel = message.guild.channels.cache.get(guild.channel);
    let msg = channel.messages.cache.get(guild.message);

    // console.log(msg.url);
    // ${"```"}${JSON.stringify(guild)}${"```"}
    message.channel
      .send(
        ` **Channel** : ${channel}` +
          "\n" +
          ` **Message** : ${msg.url}` +
          "\n" +
          `**Update** : ${guild.update}` +
          "\n" +
          `**Chef de guilde ** : ${owner}`
      )
      .then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 5000);
      });
  },
  job: async () => {
    let fields = await Promise.all(
      Jobs.map(async (tag) => {
        let jober = await Users.findJob(tag.toLocaleLowerCase());
        if (jober.length > 0) {
          return {
            name: `${tag}`,
            value:
              jober
                .map((user) => {
                  return `${user.name} : ${user.lvl}`;
                })
                .join("\n") + "\n\u200b",
            inline: true,
          };
        }
        return false;
      })
    );

    const embed = new Discord.MessageEmbed()
      .setColor("#fbff00")
      .setTitle(`**Liste de tout les metiers et tout les joueurs**`)
      .addFields(fields.filter((x) => x))
      .setTimestamp(Date.now());
    return embed;
  },
};

module.exports = Help;
