import bot from '../bot';
import db from '../db';
import {MY_TELEGRAM_ID} from '../config';
import nyaaFeed from '../utils/nyaa-feed';

function getId(guid) {
	return Number(/(\d+)$/.exec(guid).pop());
}

async function refreshNyaaFeed() {
	const latestNyaaTorrent = db.get('latestNyaaTorrent').value();
	console.log('Current latest:', latestNyaaTorrent);

	const feed = await nyaaFeed()
		.then(feed => feed
			.map(item => ({
				title: item.title,
				date: (new Date(item.pubDate)).getTime(),
				id: getId(item.guid),
			}))
			.filter(item => item.date > latestNyaaTorrent)
			.reverse()
		);

	feed.forEach(anime =>
		bot.sendMessage(MY_TELEGRAM_ID, anime.title, {
			reply_markup: {
				inline_keyboard: [
					[{
						text: 'Download',
						callback_data: `/download-anime ${anime.id}`,
					}],
				]
			}
		})
	);

	const lastItem = feed.pop();

	db.set('latestNyaaTorrent', lastItem ? lastItem.date : latestNyaaTorrent).value();
}

export default {
	tab: '*/15 * * * *',
	callback: refreshNyaaFeed,
};

