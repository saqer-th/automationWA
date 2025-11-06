import { create } from "@open-wa/wa-automate";

let clientInstance = null;

export async function initWhatsApp() {
  console.log("🚀 Initializing WhatsApp session...");

  const client = await create({
    sessionId: "whatsapp-auto-session",
    headless: true,
    qrTimeout: 0,
    authTimeout: 0,
    multiDevice: true,
    restartOnCrash: true,
    cacheEnabled: false,
    disableSpins: true,
  });

  clientInstance = client;
  console.log("✅ WhatsApp Client Ready!");

  client.onStateChanged((state) => console.log("📱 State changed:", state));
}

export function getClient() {
  return clientInstance;
}
