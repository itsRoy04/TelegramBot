import dotenv from "dotenv";
dotenv.config();

import Web3 from "web3";
const web3 = new Web3("https://testapi.cicscan.com");

const token = process.env.TOKEN;
// let TelegramBot = require("node-telegram-bot-api");
import TelegramBot from "node-telegram-bot-api";
let bot = new TelegramBot(token, { polling: true });
const twitterLink = "https://twitter.com/partner_code";

bot.on("polling_error", (err) => console.log(err));

bot.onText(/\/Mukesh/, (msg) => {
  bot.sendMessage(msg.chat.id, "I am Sorry! The Goat is Busy Right Now");
});

bot.onText(/\/start/, (msg) => {
  var options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "Help", callback_data: "1" },
          { text: "Add Details", callback_data: "2" },
          { text: "Add Address", callback_data: "3" },
        ],
      ],
    }),
  };

  bot.sendMessage(msg.chat.id, "Pick action:", options);
});

// bot.sendMessage(msg.chat.id, "answer.", option);

bot.on("callback_query", function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;

  if (action === "1") {
    text =
      "What is an Airdrop Token ! \n A crypto airdrop is a marketing strategy used by blockchain-based projects that involves divvying out free tokens en masse as part of a broader promotional initiative. This is done as a direct deposit into a user's crypto wallet.";
  } else if (action === "2") {
    bot.sendMessage(
      msg.chat.id,
      "Please Provide Your Details! \n Type <Your Name> "
    ); // twitter handle // name //
    addDetails(msg);
  }
  bot.editMessageText(text, opts);
});

function addDetails(msg) {
  let arr = [];
  let name, email, ethAddress, twitter;
  bot.once("message", async (msg) => {
    name = msg.text;

    bot.sendMessage(
      msg.chat.id,
      `Hello ${name} Please Enter Your Email Address`
    );

    bot.once("message", async (msg) => {
      email = msg.text;
      bot.sendMessage(msg.chat.id, `Please Give us your Twitter Link`);

      bot.once("message", async (msg) => {
        twitter = msg.text;

        bot.sendMessage(msg.chat.id, ` Please Add Your ETH ADDRESS `);
        bot.once("message", async (msg) => {
          ethAddress = msg.text;

          bot.sendMessage(
            msg.chat.id,
            ` Please confirm your details ${name} ,${email} ,${ethAddress} \n Give Command  '/confirm' `
          );
        });
      });
    });
  });
}



