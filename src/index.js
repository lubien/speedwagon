import {readdirSync} from 'fs';
import reqAll from 'req-all';
import camelCase from 'camel-case';
import bot from './bot';
import isMeMiddleWare from './utils/is-me-middleware';

const commandTypes = readdirSync('./src/commands');

for (const folder of commandTypes) {
	const event = camelCase(folder);

	for (const args of Object.values(
		reqAll(`./commands/${folder}`)
	)) {
		bot[event](...isMeMiddleWare(args));
	}
}

