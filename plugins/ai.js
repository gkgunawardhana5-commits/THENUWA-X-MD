const config = require('../config')
const { cmd , commands } = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "ai",
    alias: ["gpt","bot"], 
    react: "📑",
    desc: "ai chat.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!q) return reply("⚠️ *කරුණාකර AI වෙතින් විමසීමට අවශ්‍ය ගැටලුව ඇතුළත් කරන්න!*");

    const targetJid = typeof from === 'string' ? from : (mek.key.remoteJid || String(from));

    // API එකෙන් දත්ත ලබා ගැනීම
    let data = await fetchJson(`https://chatgptforprabath-md.vercel.app/api/gptv1?q=${encodeURIComponent(q)}`);
    
    // undefined වීම වැළැක්වීම සඳහා දත්ත පරීක්ෂා කිරීම
    if (!data || !data.data) {
        return reply("❌ *AI සර්වර් එකෙන් පිළිතුරක් ලබා ගැනීමට නොහැකි විය. පසුව නැවත උත්සාහ කරන්න.*");
    }

    // CYBER X THENULA ස්ටයිල් එකට සකස් කළ විස්තර පත්‍රිකාව
    let aiResponse = `🤖 *CYBER THENUVA AI CHAT* 🤖\n\n`;
    aiResponse += `👋 HELLOW ${pushname || "User"} ❤️ Welcome to\n`;
    aiResponse += `CYBER X THENULA\n\n`;
    aiResponse += `✅CYBER THENULA X MD✅\n`;
    aiResponse += `╭───────────────────.★*\n`;
    aiResponse += `│ 💬 *Query:* ${q}\n`;
    aiResponse += `│ ✨ *Response:* ${data.data}\n`;
    aiResponse += `╰───────────────────.★*\n\n`;
    aiResponse += `📢 *Join Our Channel:* https://whatsapp.com\n\n`;
    aiResponse += `> *©⚡ POWERED by CYBER THENUVA* 🚀\n\n\n`; // යට කැපීම වැළැක්වීමේ Padding

    // ප්‍රතිඵලය වට්සැප් මැසේජ් එකක් ලෙස යැවීම (Context Info සහිතව)
    await conn.sendMessage(targetJid, { 
        text: aiResponse,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363XXXXXXXXX@newsletter', // ඔයාගේ Channel ID එක මෙතනට දාන්න
                newsletterName: 'THENUWA X MD NEWSLETTER', // ඔයාගේ Channel එකේ නම මෙතනට දාන්න
                serverMessageId: -1
            }
        }
    }, { quoted: mek });

}catch(e){
    console.log(e)
    reply(`❌ *Error:* ${e.message || e} 😞`)
}
})
