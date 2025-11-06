import { create } from "@open-wa/wa-automate";
import puppeteer from "puppeteer";

let clientInstance = null;

export async function initWhatsApp() {
  console.log("🚀 Initializing WhatsApp session...");

  // 👇 نستخدم executablePath من Puppeteer
  const executablePath = puppeteer.executablePath();

  const client = await create({
    sessionId: "whatsapp-auto-session",
    headless: true,
    useChrome: true,
    executablePath, // ✅ هذا المفتاح هو الأهم
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
