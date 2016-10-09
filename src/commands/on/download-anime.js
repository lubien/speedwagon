import got from 'got';
import {QBITTORRENT_PORT, MY_TELEGRAM_ID} from '../../config';
import bot from '../../bot';
import nyaaFeed from '../../utils/nyaa-feed';

const matcherRegex = /^\/download-anime (\d+)$/;

async function downloadAnimeCommand(msg) {
	if (!matcherRegex.test(msg.data)) {
		return;
	}

	const title = msg.message.text;
	const torrentId = Number(matcherRegex.exec(msg.data).pop());

	try {
		await got.post(`http://localhost:${QBITTORRENT_PORT}/command/download`, {
			body: {urls: `http://www.nyaa.se/?page=download&tid=${torrentId}`},
		});

		await bot.editMessageText(`*Downloading* _${title}_`, {
			message_id: msg.message.message_id,
			chat_id: msg.message.chat.id,
			parse_mode: 'Markdown',
		});
	} catch (err) {
		bot.sendMessage(MY_TELEGRAM_ID, `Failed to download ${title} (${torrentId}). ${err}`);
	}
}

export default ['callback_query', downloadAnimeCommand];

