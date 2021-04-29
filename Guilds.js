const Keyv = require("keyv");
const keyv = new Keyv("sqlite://Guilds.sqlite", {
  serialize: JSON.stringify,
  deserialize: JSON.parse,
});

const Guild = {
  async get(id) {
    return await keyv.get(id);
  },
  async set(id, data) {
    return await keyv.set(id, data);
  },
  async delete(id) {
    return await keyv.delete(id);
  },
  async all() {
    let request = `SELECT * FROM keyv;`;
    let guilds = await keyv.opts.store.query(request);
    guilds = guilds.map((guild) => {
      return JSON.parse(guild.value).value;
    });
    return guilds;
  },
};

module.exports = Guild;
