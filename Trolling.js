const Trolling = {
  Troll: [
    { type: "text", msg: "**BRAVO TU AS TROUVER LA COMMANDE SECRETE !!!!**" },
    {
      type: "text",
      msg: "Imagine cette commande en faite c'est juste du troll",
    },
    {
      type: "link",
      msg:
        "https://www.getdigital.fr/web/getdigital/gfx/products/__generated__resized/1100x1100/Aufkleber_Trollface.jpg",
    },
    {
      type: "text",
      msg:
        "Et maintenant imagine je te flood comme ca pendant 24h ou 1000 messages",
    },
    { type: "link", msg: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    { type: "text", msg: "Imagine plus c'est ce qui va se passé :D" },
    {
      type: "text",
      msg: `Il est ${new Date().toLocaleTimeString(
        "fr-FR"
      )} c'est parti pour 24h ou 1000 messages.`,
    },
    { type: "text", msg: "Voila le premier message" },
    { type: "text", msg: "Voila le deuxième message" },
    { type: "text", msg: "Voila le troisième message" },
    { type: "text", msg: "Voila le quatrième message" },
    { type: "text", msg: "Voila le cinquième message" },
    { type: "text", msg: "Voila le sixième message" },
    { type: "text", msg: "Voila le septième message" },
    { type: "text", msg: "Voila le huitième message" },
    { type: "text", msg: "Voila le neuvième message" },
    { type: "text", msg: "Voila le dixième message" },
    {
      type: "text",
      msg:
        'En vrai c\'est long :D donc maintenant ca sera que des "bla bla bli blo blu"',
    },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "link", msg: "https://www.youtube.com/watch?v=sCNrK-n68CM" },
    {
      type: "text",
      msg: "Tu peu la mettre deux fois au moins tu serra ou tu en es du troll",
    },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "En vrai j'arrete ca doit etre chiant" },
    { type: "text", msg: "Ou pas !!!!" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    {
      type: "text",
      msg:
        "Ce que tu peu faire c'est supprimer ton compte discord si tu veu plus etre flood :P",
    },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "bla bla bli blo blu" },
    {
      type: "text",
      msg:
        "Aller j'arrete mais pense a dire a un de tes potes de test la command et tape toi des barres",
    },
    { type: "text", msg: "bla bla bli blo blu" },
    { type: "text", msg: "Tu as eu peur que ca recommence :P" },
    {
      type: "text",
      msg: "Au faite pour les Kamas c'est mort je joue pas a Dofus :P",
    },
  ],

  run: (message) => {
    let index = 1;
    let interval;
    message.author.send(this.Troll[0].msg);
    interval = setInterval(() => {
      if (!this.Troll[index]) return clearInterval(interval);
      message.author.send(this.Troll[index].msg);
      index++;
    }, 2000);
    message.delete();
  },
};

module.exports = Trolling;
