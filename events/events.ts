import 'fs';
module.exports = client => {
    client.on('message', async m => {
        const { prefix } = require('../conf/conf.json');
        if (m.author.bot) return;
        if (m.author === client.user) return;
        if (!m.content.startsWith(prefix).toLowerCase()) return;
        const args = m.content.slice(prefix.length).split(/ +/g);
        const command = args.shift().toLowerCase();
        const commandFile = client.commands.get(command.toLowerCase());
        if (!commandFile) return;
        commandFile.run(client, m, args);
    })
}