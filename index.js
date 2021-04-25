const Discord = require("discord.js");
// const config = require("./config.json");
const client = new Discord.Client();
const dotenv = require("dotenv");
dotenv.config();

const Users = require("./Users");
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
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("&help pour m'invoquer");
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();
  if (command === "clear") {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      await message.channel.messages.fetch().then(
        function (list) {
          message.channel.bulkDelete(list);
        },
        function (err) {
          message.channel.send("ERROR: ERROR CLEARING CHANNEL.");
        }
      );

      return;
    }
  }
  if (command === "job") {
    if (args.length === 0) {
      let fields = await Promise.all(
        jobs.map(async (tag) => {
          let jober = await Users.findJob(tag.toLocaleLowerCase());

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
        })
      );
      const embed = new Discord.MessageEmbed()
        .setColor("#fbff00")
        .setTitle(`Liste de tout les metiers`)
        .addFields(fields)
        .setTimestamp();

      message.reply(embed);
      message.delete();
      return;
    }
    if (args[0] === "-list") {
      message.channel
        .send(
          `${"```"}${jobs
            .map((job) => {
              return job + "\t\t";
            })
            .join("")}${"```"}`
        )
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 5000);
        });
      message.delete();
      return;
    }
    if (args[0] === "-delete") {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        // message.channel.send(`Tu n'es pas Admin`);
        return;
      }
      if (!args[1].match(/\d+/)) {
        // message.channel.send(`Pas d'user`);
        return;
      }
      const idUser = args[1].match(/\d+/)[0];

      await Users.delete(idUser);

      message.channel.send(`${args[1]} n'as plus de métiers`).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 5000);
      });
      message.delete();
      return;
    }
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
      if (!user) {
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
      user[args[0].toLocaleLowerCase()] = args[1];

      await Users.set(message.author.id, user);

      message.channel
        .send(`${user.name} est maintenant ${args[0]} lvl : ${args[1]}`)
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 5000);
        });
      message.delete();
      return;
    }

    if (!jobs.map((x) => x.toLocaleLowerCase()).includes(args[1])) {
      message
        .reply(`HUUUMMM ${args[1]} n'ai pas un metier connu`)
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
    // const memberPermissions = message.member.hasPermission('ADMINISTRATOR');
    // if()
    // console.log(memberPermissions);
    if (!message.member.hasPermission("ADMINISTRATOR")) return;

    let user = await Users.get(idUser);
    if (!user) {
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
    user[args[1].toLocaleLowerCase()] = args[2];

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
        "\n" +
          `${"`"}&job${"`"} : Renvoi tout les metiers du bot.` +
          "\n" +
          `${"`"}&job -list${"`"} : Liste des metiers possible.` +
          "\n" +
          `${"`"}&job -delete <@user>${"`"} : Suprimme les metiers d'un joueurs. (Admin)` +
          "\n" +
          `${"`"}&job <metier> <lvl>${"`"} : Set le niveau d'un metier pour toi.` +
          "\n" +
          `${"`"}&job <@user> <metier> <lvl>${"`"} : Set le niveau d'un metier pour l'user mentionné. (Admin)` +
          "\n"
      )
      .then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 60000);
      });
    message.delete();
  }

  //   console.log(message);
});

client.login(process.env.BOT_TOKEN);
