const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "weather",
    alias: ["climate", "කාලගුණය"],
    desc: "ඕනෑම නගරයක වත්මන් කාලගුණ තොරතුරු ලබා ගැනීම.",
    category: "main",
    filename: __filename
},
async (conn, mek, from, options) => {
    try {
        const targetJid = typeof from === 'string' ? from : (mek.key.remoteJid || String(from));
        const args = options.args;
        if (!args || args.length === 0) {
            return await conn.sendMessage(targetJid, { text: "⚠️ කරුණාකර නගරයක නමක් ඇතුළත් කරන්න!\n\n*උදාහරණ:* `.weather Colombo` හෝ `.weather Galle`" }, { quoted: mek });
        }

        const city = args.join(" ");
        const response = await axios.get(`https://wttr.in{encodeURIComponent(city)}?format=j1`);
        const weatherData = response.data;

        // Array Index [0] නිවැරදිව ඇතුළත් කරන ලදී
        const currentCondition = weatherData.current_condition[0];
        const tempC = currentCondition.temp_C;
        const tempF = currentCondition.temp_F;
        const humidity = currentCondition.humidity;
        const windSpeed = currentCondition.windspeedKmph;
        const weatherDesc = currentCondition.weatherDesc[0].value;
        const observationTime = currentCondition.observation_time;

        const nearestArea = weatherData.nearest_area[0];
        const areaName = nearestArea.areaName[0].value;
        const country = nearestArea.country[0].value;

        let weatherMessage = `🌤️ *CYBER THENUVA WEATHER REPORT* 🌤️\n\n`;
        weatherMessage += `✅CYBER THENULA X MD✅\n`;
        weatherMessage += `╭───────────────────.★*\n`;
        weatherMessage += `│  ◦ 📍 *Location :* ${areaName}, ${country}\n`;
        weatherMessage += `│  ◦ 🌡️ *Temperature :* ${tempC}°C (${tempF}°F)\n`;
        weatherMessage += `│  ◦ ☁️ *Condition :* ${weatherDesc}\n`;
        weatherMessage += `│  ◦ 💧 *Humidity :* ${humidity}%\n`;
        weatherMessage += `│  ◦ 💨 *Wind Speed :* ${windSpeed} Km/h\n`;
        weatherMessage += `│  ◦ 🕒 *Updated :* ${observationTime}\n`;
        weatherMessage += `╰───────────────────.★*\n\n`;
        weatherMessage += `╭───────────────╼\n`;
        weatherMessage += `│👨‍💻 CYBER-TEAM 🥷\n`;
        weatherMessage += `╰───────────────╼\n\n`;
        weatherMessage += `📢 *Join Our Channel:* https://whatsapp.com\n\n`;
        weatherMessage += `> *©⚡ POWERED by CYBER THENUVA* 🚀\n\n\n`;

        await conn.sendMessage(targetJid, { 
            text: weatherMessage,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363403804248705@newsletter',
                    newsletterName: 'THENUWA XMD',
                    serverMessageId: -1
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.log("Weather Command Error: ", e);
        const targetJid = typeof from === 'string' ? from : (mek.key.remoteJid || String(from));
        await conn.sendMessage(targetJid, { text: "❌ එම නගරය සොයා ගැනීමට නොහැකි වුණා. කරුණාකර ඉංග්‍රීසි අකුරින් නම නිවැරදිව ඇතුළත් කරන්න. (උදා: Galle, Jaffna, Kandy)" }, { quoted: mek });
    }
});
