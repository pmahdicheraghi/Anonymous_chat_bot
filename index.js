import { Telegraf, Markup } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

let id_array = new Array;

bot.start((ctx) => ctx.reply("Let's start talking!"));

bot.help((ctx) => {
	if (ctx.from.id == process.env.ADMIN_ID)
	{
		ctx.reply("To answer the messages, just reply the ID!");
	}
	else
	{
		ctx.reply("Send me a message! 😈");
	}
});

bot.on("message", async (ctx) => {
	if (ctx.from.id == process.env.ADMIN_ID)
	{
		if (ctx.message.reply_to_message)
		{
			if (ctx.message.reply_to_message.reply_markup)
			{
				let replyed_message_id = ctx.message.reply_to_message.reply_markup.inline_keyboard[0][0].callback_data;
				let splited_message_id = replyed_message_id.split("/");
				bot.telegram.copyMessage(splited_message_id[0], process.env.ADMIN_ID, ctx.message.message_id,
					Markup.inlineKeyboard([Markup.button.callback("@" + ctx.from.username, ctx.from.id + "/" + ctx.message.message_id, true)]),
					).catch(err => ctx.reply(err.response.description));
			}
			else
			{
				bot.telegram.sendMessage(process.env.ADMIN_ID, "NO ID found!");
			}
		}
		else
		{
			bot.telegram.sendMessage(process.env.ADMIN_ID, "Reply some message!");
		}
	}
	else
	{
		if (ctx.message.reply_to_message && ctx.message.reply_to_message.reply_markup)
		{
			let replyed_message_id = ctx.message.reply_to_message.reply_markup.inline_keyboard[0][0].callback_data;
			let splited_message_id = replyed_message_id.split("/");
			console.log(splited_message_id[1]);
			bot.telegram.copyMessage(process.env.ADMIN_ID, ctx.from.id, ctx.message.message_id, { reply_to_message_id: splited_message_id[1],
				...Markup.inlineKeyboard([Markup.button.callback(' ', ctx.from.id + "/" + ctx.message.message_id, false)])
			}).catch(err => ctx.reply(err.response.description));
		}
		else
		{
			bot.telegram.copyMessage(process.env.ADMIN_ID, ctx.from.id, ctx.message.message_id,
				Markup.inlineKeyboard([Markup.button.callback(' ', ctx.from.id + "/" + ctx.message.message_id, false)]))
				.catch(err => ctx.reply(err.response.description));
		}
	}
});

bot.launch();