const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

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

// console.log(jobs);

const prefix = "&";
client.on("message", async (message) => {
  // console.log(message.guild.members.cache.get())
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();
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
        .setTitle(`Liste de tout les metiers du bot`)
        .addFields(fields)
        .setTimestamp();

      message.reply(embed);
      return;
    }
    if (args[0] === "-list") {
      message.channel.send(
        `${"```"}${jobs
          .map((job) => {
            return job + "\t\t";
          })
          .join("")}${"```"}`
      );
      return;
    }

    if (!args[0].match(/\d+/)) {
      if (
        !jobs
          .map((x) => x.toLocaleLowerCase())
          .includes(args[0].toLocaleLowerCase())
      ) {
        message.reply(`HUUUMMM ${args[0]} n'ai pas un metier connu`);
        return;
      }
      if (isNaN(args[1])) {
        message.reply(`HUUUMMM ${args[1]} n'ai pas un lvl`);
        return;
      }

      let user = await Users.get(message.author.id);
      if (!user) {
        let job = {
          name: message.author.username,
        };
        job[args[0].toLocaleLowerCase()] = args[1];
        user = await Users.set(message.author.id, job);
        message.channel.send(
          `${job.name} est maintenant ${args[0]} lvl : ${args[1]}`
        );
        return;
      }
      user[args[0].toLocaleLowerCase()] = args[1];

      await Users.set(message.author.id, user);

      message.channel.send(
        `${user.name} est maintenant ${args[0]} lvl : ${args[1]}`
      );
      return;
    }

    if (!jobs.map((x) => x.toLocaleLowerCase()).includes(args[1])) {
      message.reply(`HUUUMMM ${args[1]} n'ai pas un metier connu`);
      return;
    }
    if (isNaN(args[2])) {
      message.reply(`HUUUMMM ${args[2]} n'ai pas un lvl`);
      return;
    }

    const idUser = args[0].match(/\d+/)[0];
    let user = await Users.get(idUser);
    if (!user) {
      let job = {
        name: message.guild.members.cache.get(idUser).user.username,
      };
      job[args[1].toLocaleLowerCase()] = args[2];
      user = await Users.set(idUser, job);
      message.channel.send(
        `${job.name} est maintenant ${args[1]} lvl : ${args[2]}`
      );
      return;
    }
    user[args[1].toLocaleLowerCase()] = args[2];

    await Users.set(idUser, user);

    message.channel.send(
      `${user.name} est maintenant ${args[1]} lvl : ${args[2]}`
    );
    return;
  }

  if (command === "help") {
    message.reply(
      "\n" +
        `${"`"}&job${"`"} : Renvoi tout les metiers du bot.` +
        "\n" +
        `${"`"}&job -list${"`"} : Liste des metiers possible.` +
        "\n" +
        `${"`"}&job <metier> <lvl>${"`"} : Set le niveau d'un metier pour toi.` +
        "\n" +
        `${"`"}&job <@user> <metier> <lvl>${"`"} : Set le niveau d'un metier pour l'user mentionné.` +
        "\n"
    );
  }
  //   console.log(message);
});

client.login(process.env.BOT_TOKEN);
