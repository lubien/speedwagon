import xml2js from 'xml2js-es6-promise';
import cloudscraper from 'cloudscraper';

function scrap() {
	return new Promise((fulfill, reject) => {
		cloudscraper.get('http://www.nyaa.se/?page=rss&cats=1_37', (err, _res, body) => {
			if (err) {
				return reject(err);
			}

			fulfill(body);
		});
	});
}

export default function nyaaFeed() {
	return scrap()
		.then(xml => xml2js(xml, {
			explicitRoot: false,
			explicitArray: false,
		}))
		.then(parsed => parsed.channel.item);
}
