import {MY_TELEGRAM_ID} from '../config';

const myId = Number(MY_TELEGRAM_ID);

export default function isMeMiddleware([event, handler]) {
	return [event, (msg, ...args) => {
		if (msg.from.id === myId) {
			return handler(msg, ...args);
		}
	}];
}

