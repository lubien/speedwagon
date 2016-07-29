require('dotenv').config({silent: true});

const config = {
	TOKEN: process.env.TOKEN,
	MY_TELEGRAM_ID: process.env.MY_TELEGRAM_ID
};

export default config;

