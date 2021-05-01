import {Client} from 'discord.js';
import { token } from './conf/conf.json';
const client = new Client();
require('./loader/loader')(client);
require('./events/events')(client);
client.login(token);
