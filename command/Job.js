const Discord = require("discord.js");
const Users = require("../Users");
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

const Job = {
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
  all: (message) => {
    message.channel
      .send(
        `${"```"}${Jobs.map((job) => {
          return job + "\t\t";
        }).join("")}${"```"}`
      )
      .then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 5000);
      });
    message.delete();
  },
  list: async (message, args) => {
    if (args[1]) {
      if (
        !Jobs.map((x) => x.toLocaleLowerCase()).includes(
          args[1].toLocaleLowerCase()
        )
      ) {
        message.channel
          .send(`HUUUMMM **${args[1]}** n'ai pas un metier connu !!!`)
          .then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, 5000);
          });
        message.delete();
        return;
      }
      let jober = await Users.findJob(args[1].toLocaleLowerCase());
      if (jober.length > 0) {
        message.channel.send(
          `**Liste de tout les ${args[1]}**\n${jober
            .map((user) => {
              return `${user.name} : ${user.lvl}`;
            })
            .join("\n")}`
        );
        message.delete();

        return;
      }
      message.channel.send(`**Il n'y a pas de ${args[1]}**`).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 5000);
      });
      message.delete();

      return;
    }
    message.channel.send(`Il faut spécifier un **métier**`).then((msg) => {
      setTimeout(() => {
        msg.delete();
      }, 5000);
    });
    message.delete();
  },
  user : async(message, args)=>{
    if (args[1].match(/\d+/)) {
        const idUser = args[1].match(/\d+/)[0];
        let user = await Users.get(idUser);
        delete user.name;
        message.channel.send(
          `Liste des métiers de **${
            message.guild.members.cache.get(idUser).user.username
          }**.\n${Object.keys(user)
            .map((job) => {
              return `${job} : ${user[job]}`;
            })
            .join("\n")}`
        );
        message.delete();

        return;
      }
      message.channel
        .send(`**${args[1]}** n'est pas enregistré.`)
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 5000);
        });
      message.delete();
      return;
  }
};
module.exports = Job;
