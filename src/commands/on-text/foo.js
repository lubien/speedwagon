import bot from '../../bot';

function fooCommand(msg) {
	bot.sendMessage(msg.from.id, 'Foo');
}

export default [/\/echo/, fooCommand];

