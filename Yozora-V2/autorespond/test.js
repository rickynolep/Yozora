const client = require('..index.js');

client.on('messageCreate', (message) => {
	if (message.content === 'testcode') {
		message.reply('Hey!');
	}
});