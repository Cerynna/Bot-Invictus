const cron = require("node-cron");
const Help = require("./Help");
const Guilds = require("./Guilds");
const Job = require("./command/Job");
const RunTime = {
  messages: async (client) => {
    const guilds = await Guilds.all();
    guilds.forEach(async (guild) => {
      if (guild.channel) {
        let channel = client.channels.cache.get(guild.channel);
        let embed = await Job.job();
        if (!guild.message) {
          await Help.clear(channel, true);
          let message = await channel.send(embed);
          await message.pin();
          guild["message"] = message.id;
          await Guilds.set(guild.id, guild);
        } else {
          let msg = channel.messages.cache.get(guild.message);
          if (!msg) {
            await Help.clear(channel, true);
            let message = await channel.send(embed);
            await message.pin();
            guild["message"] = message.id;
            await Guilds.set(guild.id, guild);
          } else {
            await Help.clear(channel);
            msg.edit(embed);
          }
        }
      }
    });
  },
  run: async (client) => {
    await RunTime.messages(client);
    cron.schedule("*/10 * * * *", async () => {
      console.log("running a task every minute");
      await RunTime.messages(client);
    });
  },
};
module.exports = RunTime;
