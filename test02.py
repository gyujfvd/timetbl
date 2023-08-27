import sqlite3
import telebot
from prettytable import from_db_cursor

token = "5410653561:AAE05vNBthNFAQElvaxwRvMXpxh0WCMBt-Y"
bot = telebot.TeleBot(token, parse_mode="HTML")


def table(day: str):
    with sqlite3.connect("base.db") as con:
        cur = con.cursor()
        cur.execute(f"SELECT Номер, Начало, {day} FROM timetable")
        x = from_db_cursor(cur).get_string()
        return x


@bot.message_handler(commands=["start", "tt"])
def hello(message):
    if message.text == "/start":
        bot.send_message(message.chat.id, text="Привет это бот для школьного расписания отправь /tt и выбери день на который хочешь узнать уроки")
    elif message.text == "/tt":
        markup = telebot.types.InlineKeyboardMarkup()
        markup.add(telebot.types.InlineKeyboardButton(text='Понедельник', callback_data='ПН'))
        markup.add(telebot.types.InlineKeyboardButton(text='Вторник', callback_data='ВТ'))
        markup.add(telebot.types.InlineKeyboardButton(text='Среда', callback_data='СР'))
        markup.add(telebot.types.InlineKeyboardButton(text='Четверг', callback_data='ЧТ'))
        markup.add(telebot.types.InlineKeyboardButton(text='Пятница', callback_data='ПТ'))
        bot.send_message(message.chat.id, text="На какой день недели вы хотите узнать расписание?", reply_markup=markup)
    print(message)

@bot.callback_query_handler(func=lambda call: True)
def query_handler(call):
    bot.answer_callback_query(callback_query_id=call.id)
    answer = ''
    weekdays = ("ПН", "ВТ", "СР", "ЧТ", "ПТ")
    for day in weekdays:
        if call.data == day:
            answer = (f"<code>{table(day)}</code>")
        elif call.data == "ALL":
            answer = f"<code>{''.join([table(i) for i in weekdays])}</code>"

    bot.send_message(call.message.chat.id, answer)

bot.infinity_polling()
