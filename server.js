// server.js
import express from "express";
import { initWhatsApp, getClient } from "./wa.js";

const app = express();
app.use(express.json());

// simple health check
app.get("/status", (_, res) => {
  res.json({ ready: !!getClient() });
});

// send endpoint
app.post("/send", async (req, res) => {
  const { to, message } = req.body;
  try {
    const client = getClient();
    if (!client) return res.status(500).json({ error: "WhatsApp client not ready" });
    await client.sendText(to, message);
    res.json({ success: true, to, message });
  } catch (err) {
    console.error("❌ Error sending message:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8081;

// 1) Start listening immediately so Render detects the open port
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  // 2) Then initialize WhatsApp in background (non-blocking)
  initWhatsApp()
    .then(() => console.log("WhatsApp init finished"))
    .catch((err) => {
      console.error("❌ WhatsApp init error:", err);
      // you can decide to process.exit(1) if this should be fatal
    });
});
