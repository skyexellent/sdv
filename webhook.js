export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(200).send("ok");

  // Проверка, что запрос пришёл именно от Telegram
  if (req.headers["x-telegram-bot-api-secret-token"] !== process.env.WEBHOOK_SECRET) {
    return res.status(401).end();
  }

  const msg = req.body?.message;
  if (!msg?.text) return res.status(200).end();

  const chatId = msg.chat.id;

  if (msg.text === "/start") {
    await sendMessage(chatId, "Привет! Напиши мне что-нибудь, и я отвечу.");
    return res.status(200).end();
  }

  let answer = "Произошла ошибка, попробуйте позже.";

  try {
    const r = await fetch(`${process.env.AI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL,
        messages: [{ role: "user", content: msg.text }],
      }),
    });
    const data = await r.json();
    answer = data.choices?.[0]?.message?.content || answer;
  } catch (e) {
    console.error(e);
  }

  await sendMessage(chatId, answer);
  res.status(200).end();
}

async function sendMessage(chatId, text) {
  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: String(text).slice(0, 4096) }),
  });
}
