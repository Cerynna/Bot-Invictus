const Quest = {
  run(message, args) {
    message.channel.send(
      `** Voila ce que j'ai trouver sur Dofus pour les Noobs**` +
        "\n" +
        `https://www.dofuspourlesnoobs.com/apps/search?q=${encodeURI(
          args.join("+")
        )}`
    );
    console.log();
  },
};

module.exports = Quest;
