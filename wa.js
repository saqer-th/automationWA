import { create } from "@open-wa/wa-automate";
import chromium from "chromium";

let clientInstance = null;

export async function initWhatsApp() {
  console.log("🚀 Initializing WhatsApp session...");

  const executablePath = chromium.path; // ✅ أهم سطر

  const client = await create({
    sessionId: "whatsapp-auto-session",
    headless: true,
    useChrome: true,
    executablePath,
    qrTimeout: 0,
    authTimeout: 0,
    multiDevice: true,
    restartOnCrash: true,
    cacheEnabled: false,
    disableSpins: true,
  });

  clientInstance = client;
  console.log("✅ WhatsApp Client Ready!");
}

export function getClient() {
  return clientInstance;
}
