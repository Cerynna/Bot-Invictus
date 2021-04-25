const Keyv = require("keyv");
const keyv = new Keyv("sqlite://Users.sqlite", {
  serialize: JSON.stringify,
  deserialize: JSON.parse,
});
const lodash = require("lodash");

const User = {
  async get(id) {
    return await keyv.get(id);
  },
  async set(id, job) {
    return await keyv.set(id, job);
  },
  async delete(id) {
    return await keyv.delete(id);
  },
  async all() {
    let request = `SELECT * FROM keyv;`;
    let users = await keyv.opts.store.query(request);
    users = users.map((user) => {
      return JSON.parse(user.value).value;
    });
    return users;
  },
  async findJob(job = "alchimiste") {
    let request = `SELECT * FROM keyv;`;
    let users = await keyv.opts.store.query(request);
    users = users.map((user) => {
      return JSON.parse(user.value).value;
    });
    // console.log(users);
    return users
      .map((user) => {
        if (user[job]) return { name: user.name, lvl: user[job] };
        //   console.log(user[job]);
      })
      .filter((x) => x);
    // console.log(jobers);
    // console.log(lodash.groupBy(users));
  },
};

module.exports = User;
