import {getOrderCount} from "./fetch-order-count.js";
import {Bot} from "./telegram-bot.js"
import cron from "node-cron";

async function checkOrderCount() {
    console.log("---------------------");
    console.log("Running the check every hour");
    cron.schedule("0 * * * *", async () => {
        const orderCount = await getOrderCount();
        if (orderCount !== null) {
            const telegramBot = new Bot(process.env.TELEGRAM_BOT_TOKEN, process.env.TELEGRAM_CLIENT_ID);
            if (orderCount >= 10) {
                console.log("Max order count reached!")
                telegramBot.sendMessage("Max order count reached! Go to https://miniruche.com/de-DE/" + process.env.MINI_RUCHE_NAME + "/admin/sales and pause the sale ✌️")
            }
        }
    });
}

export {checkOrderCount}