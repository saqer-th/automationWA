import express from "express";
import { initWhatsApp, getClient } from "./wa.js";

const app = express();
app.use(express.json());

await initWhatsApp();

// ✅ إرسال رسالة
app.post("/send", async (req, res) => {
  const { to, message } = req.body;

  try {
    const client = getClient();
    if (!client) return res.status(500).json({ error: "❌ WhatsApp client not ready" });

    await client.sendText(to, message);
    res.json({ success: true, to, message });
  } catch (err) {
    console.error("❌ Error sending message:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ فحص الحالة
app.get("/status", (req, res) => {
  const client = getClient();
  res.json({ ready: !!client });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
