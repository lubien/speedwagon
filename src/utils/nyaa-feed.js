import got from 'got';
import xml2js from 'xml2js-es6-promise';

export default function nyaaFeed() {
	return got('http://www.nyaa.se/?page=rss&cats=1_37')
		.then(res => res.body)
		.then(xml => xml2js(xml, {
			explicitRoot: false,
			explicitArray: false,
		}))
		.then(parsed => parsed.channel.item);
}
