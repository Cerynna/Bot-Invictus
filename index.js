const Discord = require("discord.js");
// const config = require("./config.json");
const client = new Discord.Client();

const dotenv = require("dotenv");
dotenv.config();

const Users = require("./Users");
const Guilds = require("./Guilds");
const Trolling = require("./Trolling");
const Help = require("./Help");
const RunTime = require("./RunTime");
const Job = require("./command/Job");
const Quest = require("./command/Quest");

const jobs = [
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

const prefix = "&";
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("&help pour m'invoquer");
  await RunTime.run(client);
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();
  if (command === "alarm") {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    const idUser = args[0].match(/\d+/)[0];
    let member = message.guild.members.cache.get(idUser);
    // console.log(member);
    let mesage = [
      `Désolé du Flood c'est la faute de ${message.author}`,
      "**Allo ???**",
      "**Tu es la ???**",
      `Ces message sont envoyer par ${message.author} depuis le serveur ${message.guild.name}`,
    ];
    // await Promise.all(
    return mesage.map((msg) => {
      return member.send(msg);
    });
    // );
  }
  if (command === "config") {
    // console.log("CONFIG");
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    let guild = await Guilds.get(message.guild.id);
    // console.log(guild);
    if (!guild) {
      Guilds.set(message.guild.id, {
        owner: message.author.id,
        update: Date.now(),
        channel: false,
        id: message.guild.id,
      });
      if (args.length === 0) {
        Help.config(message);
        return;
      }
    } else {
      if (args.length === 0) {
        Help.config(message);
        return;
      } else {
        switch (args[0]) {
          case "channel":
            switch (args[1]) {
              case "set":
                message.channel
                  .send("**Okay ce canal sera le canal du BOT**")
                  .then((msg) => {
                    setTimeout(() => {
                      msg.delete();
                    }, 5000);
                  });
                guild.channel = message.channel.id;
                guild.update = Date.now();
                Guilds.set(message.guild.id, guild);
                return;
              case "info":
                Help.info(message, guild);
                return;
              default:
                Help.config(message);
                return;
            }
          default:
            Help.config(message);
            return;
        }
      }
    }
    //ICI
    Help.config(message);
    return;
  }
  if (command == "quete") {
    return Quest.run(message, args);
  }
  if (command == "secret") {
    return Trolling.run(message);
  }

  if (command === "clear") {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      await Help.clear(message.channel);

      return;
    }
  }
  if (command === "job") {
    if (args.length === 0) {
      let embed = await Job.job();
      message.reply(embed);
      message.delete();
      return;
    }
    if (args[0] === "-all") {
      Job.all(message);
      return;
    }
    if (args[0] === "-list") {
      await Job.list(message, args);
      return;
    }
    if (args[0] === "-delete") {
      if (!message.member.hasPermission("ADMINISTRATOR")) return;
      if (!args[1].match(/\d+/)) return;
      const idUser = args[1].match(/\d+/)[0];
      await Users.delete(idUser);
      message.channel
        .send(`**${args[1]}** n'as plus de métiers`)
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 5000);
        });
      message.delete();
      return;
    }
    if (args[0] === "-user") {
      await Job.user(message, args);
    }

    // Job.default();

    if (!args[0].match(/\d+/)) {
      if (
        !jobs
          .map((x) => x.toLocaleLowerCase())
          .includes(args[0].toLocaleLowerCase())
      ) {
        message.channel
          .send(`HUUUMMM ${args[0]} n'ai pas un metier connu`)
          .then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, 5000);
          });
        message.delete();
        return;
      }
      if (isNaN(args[1])) {
        message.channel
          .send(`HUUUMMM ${args[1]} n'ai pas un lvl`)
          .then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, 5000);
          });
        message.delete();
        return;
      }

      let user = await Users.get(message.author.id);
      if (!user && args[1] > 0) {
        let job = {
          name: message.author.username,
        };
        job[args[0].toLocaleLowerCase()] = args[1];
        user = await Users.set(message.author.id, job);
        message.channel
          .send(`${job.name} est maintenant ${args[0]} lvl : ${args[1]}`)
          .then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, 5000);
          });
        message.delete();
        return;
      }

      if (args[1] == 0) {
        delete user[args[0].toLocaleLowerCase()];
      } else {
        user[args[0].toLocaleLowerCase()] = args[1];
      }

      await Users.set(message.author.id, user);

      message.channel
        .send(
          `${user.name} est maintenant ${args[0]} lvl : ${args[1]} (attend 5sec)`
        )
        .then((msg) => {
          setTimeout(async () => {
            await RunTime.messages(client);
          }, 5000);
        });
      message.delete();
      return;
    }

    if (
      !jobs
        .map((x) => x.toLocaleLowerCase())
        .includes(args[1].toLocaleLowerCase())
    ) {
      message
        .reply(`HUUUMMM ${args[1]} n'ai pas un metier connu LOL`)
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 5000);
        });
      message.delete();
      return;
    }
    if (isNaN(args[2])) {
      message.reply(`HUUUMMM ${args[2]} n'ai pas un lvl`).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 5000);
      });
      message.delete();
      return;
    }

    const idUser = args[0].match(/\d+/)[0];
    if (!message.member.hasPermission("ADMINISTRATOR")) return;

    let user = await Users.get(idUser);
    if (!user && args[2] > 0) {
      let job = {
        name: message.guild.members.cache.get(idUser).user.username,
      };
      job[args[1].toLocaleLowerCase()] = args[2];
      user = await Users.set(idUser, job);
      message.channel
        .send(`${job.name} est maintenant ${args[1]} lvl : ${args[2]}`)
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 5000);
        });
      return;
    }
    if (args[2] == 0) {
      delete user[args[1].toLocaleLowerCase()];
    } else {
      user[args[1].toLocaleLowerCase()] = args[2];
    }

    await Users.set(idUser, user);

    message.channel
      .send(`${user.name} est maintenant ${args[1]} lvl : ${args[2]}`)
      .then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 5000);
      });
    message.delete();
    return;
  }

  if (command === "help") {
    message.channel
      .send(
        `**Voici tout ce que peu faire le Bot**` +
          "\n" +
          "\n" +
          `${"`"}&job${"`"} : Renvoi tout les metiers avec le niveau de tout les joueurs.` +
          "\n" +
          `${"`"}&job -all${"`"} : Liste des metiers possible.` +
          "\n" +
          `${"`"}&job <metier> <lvl>${"`"} : Set le niveau d'un metier pour toi. (Si le lvl est a 0 ca supprime le metier)` +
          "\n" +
          `${"`"}&job -user <@user>${"`"} : Liste des metier d'un user spécifique. (N'oublie pas le @)` +
          "\n" +
          `${"`"}&job -list <metier>${"`"} : Liste des joueurs avec un metier spécifique.` +
          "\n" +
          `${"`"}&helpadmin${"`"} : Si tu es Administrateur sinon ca te sert a rien :P (:star: **new** :star:)` +
          "\n" +
          `**J'offre 10k Kamas a celui qui trouve la commande secrete**`
      )
      .then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 60000);
      });
    message.delete();
    return;
  }
  if (command === "helpadmin") {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      message.channel
        .send(`**Petit malin tu as pas les droits :D**`)
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 10000);
        });
      message.delete();
      return;
    }
    message.channel
      .send(
        `**Voici tout ce que peu faire le Bot quand tu ne fait pas parti du commun des Mortels**` +
          "\n" +
          "\n" +
          `${"`"}&config${"`"} : Configuré le bot pour une meilleur utilisation :D.` +
          "\n" +
          `${"`"}&clear${"`"} : Clear les messages du canal (attention il ne peu pas clear les message antérieur a 15 jours).` +
          "\n" +
          `${"`"}&job -delete <@user>${"`"} : Suprimme le joueur de la Bibliothèque.` +
          "\n" +
          `${"`"}&job <@user> <metier> <lvl>${"`"} : Set le niveau d'un metier pour l'user mentionné. (Si le lvl est a 0 ca supprime le metier)`
      )
      .then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 60000);
      });
    message.delete();
    return;
  }
});

client.login(process.env.BOT_TOKEN);
