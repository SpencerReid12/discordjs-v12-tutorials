const { Client } = require("discord.js");

module.exports = class CleverClient extends Client {

    constructor(options = {}) {
        super({
            disableMentions: 'everyone'
        });
        this.validate(options);

        this.once('ready', () => {
            console.log(`${this.user.username} adı ile giriş yaptım!`)
        });

        this.on('message', async (message) => {
            const mentionRegex = RegExp(`^<@!${this.user.id}>!`);
            const mentionRegexPrefix = RegExp(`^<@!${this.user.id}> `);

            if (!message.guild || message.author.bot) return;

            if (message.content.match(mentionRegex)) message.channel.send(`${message.guild.name} Sunucusundaki prefixim: \`${this.prefix}\``);


            const prefiz = message.content.match(mentionRegexPrefix) ?
            message.content.match(mentionRegexPrefix)[0] : this.prefix;

            if (!message.content.startsWith(this.prefix)) return;

            //eslint-disable-next-line no unused-vars
            const [cmd, ...args] = message.content.slice(this.prefix.length).trim().split(/ +/g);

            if (cmd.toLowerCase() === 'sa') {
                message.channel.send('Aleyküm Selam!');
            }
        });
    }

    validate(options) {
        if (typeof options !== 'object') throw new TypeError('Seçenekler bir Object(Nesne) türü olmalıdır.')

        if (!options.token) throw new Error('Botun tokenini girmelisin!');
        this.token = options.token;

        if (!options.prefix) throw new Error('Botun prefixini girmelisin!');
        if (typeof options.prefix !== 'string') throw new TypeError('Prefix bir String(Dize) türü olmalıdır.')
        this.prefix = options.prefix;
    }

    async login(token = this.token) {
        super.login(token);
    }
}
