import lowdb from 'lowdb';

const db = lowdb('./storage/db.json');
db.defaults({
	latestNyaaTorrent: new Date(0).getTime(),
}).value();

export default db;
