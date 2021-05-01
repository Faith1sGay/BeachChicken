import { Collection } from 'discord.js';
const fs = require('fs');
module.exports = client => {
    const commands = new Collection();
    const aliases = new Collection();
    fs.readdir(`${__dirname}/../commands/`, (err, files) => {
        if (err) console.log(err);

        files.forEach(folder => {
            fs.readdir(`${__dirname}/../commands/${folder}/`, (_err, command) => {
                const jsfile = command.filter(f => f.split('.').pop() === 'js');
                if (jsfile.length <= 0) {
                    console.log('Command not found.');
                    return;
                }
                jsfile.forEach((f, i) => {
                    const props = require(`${__dirname}/../commands/${folder}/${f}`);
                    console.log(`${f} loaded!`);
                    commands.set(props.info.name, props);
                    commands.set(props.info.aliases, null);
                    if (props.info.aliases) props.info.aliases.forEach(a => commands.set(a, props));
                    console.log(props);
                })
            })
        })
    })
}