import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Let's start talking!"));

bot.on("message", async (ctx) => 
{
	if (ctx.from.id == process.env.CHAT_ID) 
	{
		if (ctx.message.reply_to_message)
		{
			if(ctx.message.reply_to_message.text)
			{
				let replyed_message_text = ctx.message.reply_to_message.text;
				let splited_message_text = replyed_message_text.split("\n");
				bot.telegram.sendMessage(splited_message_text[0], ctx.message.text).catch();
			}
			else
			{
				bot.telegram.sendMessage(process.env.CHAT_ID, "NO ID found!");
			}
		}
	}
	else 
	{
		if (ctx.message.sticker) 
		{
			bot.telegram.sendMessage(process.env.CHAT_ID, ctx.from.id + "\n@" + ctx.from.username);
			bot.telegram.sendSticker(process.env.CHAT_ID, ctx.message.sticker.file_id);
		}
		else if (ctx.message.animation) 
		{
			bot.telegram.sendMessage(process.env.CHAT_ID, ctx.from.id + "\n@" + ctx.from.username);
			bot.telegram.sendAnimation(process.env.CHAT_ID, ctx.message.animation.file_id);
		}
		else 
		{
			bot.telegram.sendMessage(process.env.CHAT_ID, ctx.from.id + "\n@" + ctx.from.username + "\n" + ctx.message.text);
		}
	}
});

bot.launch();