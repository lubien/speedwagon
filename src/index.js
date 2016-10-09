import {readdirSync} from 'fs';
import reqAll from 'req-all';
import camelCase from 'camel-case';
import {CronJob} from 'cron';
import bot from './bot';
import db from './db';
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

const cronEvents = readdirSync('./src/cron');

for (const {tab, callback, after = null} of Object.values(
	reqAll('./cron')
)) {
	new CronJob(tab, callback, after, true);
}

require('./cron/refresh-nyaa-feed').callback();

