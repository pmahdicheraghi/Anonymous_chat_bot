import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Let's start talking!"));

bot.on("message", async (ctx) => 
{
	if (ctx.from.id == process.env.ADMIN_ID) 
	{
		if (ctx.message.reply_to_message)
		{
			if(ctx.message.reply_to_message.text)
			{
				let replyed_message_text = ctx.message.reply_to_message.text;
				let splited_message_text = replyed_message_text.split("\n");
				
				bot.telegram.copyMessage(splited_message_text[0], process.env.ADMIN_ID, ctx.message.message_id)
				.catch(err => ctx.reply(err.response.description));
			}
			else
			{
				bot.telegram.sendMessage(process.env.ADMIN_ID, "NO ID found!");
			}
		}
	}
	else 
	{
		if (ctx.message.sticker) 
		{
			bot.telegram.sendMessage(process.env.ADMIN_ID, ctx.from.id + "\n@" + ctx.from.username);
			bot.telegram.sendSticker(process.env.ADMIN_ID, ctx.message.sticker.file_id);
		}
		else if (ctx.message.animation) 
		{
			bot.telegram.sendMessage(process.env.ADMIN_ID, ctx.from.id + "\n@" + ctx.from.username);
			bot.telegram.sendAnimation(process.env.ADMIN_ID, ctx.message.animation.file_id);
		}
		else if (ctx.message.photo)
		{
			bot.telegram.sendMessage(process.env.ADMIN_ID, ctx.from.id + "\n@" + ctx.from.username);
			bot.telegram.sendPhoto(process.env.ADMIN_ID, ctx.message.photo.file_id);
		}
		else if (ctx.message.video)
		{
			bot.telegram.sendMessage(process.env.ADMIN_ID, ctx.from.id + "\n@" + ctx.from.username);
			bot.telegram.sendVideo(process.env.ADMIN_ID, ctx.message.video.file_id);
		}
		else if (ctx.message.audio)
		{
			bot.telegram.sendMessage(process.env.ADMIN_ID, ctx.from.id + "\n@" + ctx.from.username);
			bot.telegram.sendAudio(process.env.ADMIN_ID, ctx.message.audio.file_id);
		}
		else if (ctx.message.voice)
		{
			bot.telegram.sendMessage(process.env.ADMIN_ID, ctx.from.id + "\n@" + ctx.from.username);
			bot.telegram.sendVoice(process.env.ADMIN_ID, ctx.message.voice.file_id);
		}
		else 
		{
			bot.telegram.sendMessage(process.env.ADMIN_ID, ctx.from.id + "\n@" + ctx.from.username + "\n" + ctx.message.text);
		}
	}
});

bot.launch();