import TelegramBot from 'node-telegram-bot-api';
import {TOKEN} from './config';

const bot = new TelegramBot(TOKEN, {polling: true});

export default bot;

