import nodemailer from "nodemailer";
import { env } from "../config/env.js";

interface LeadData {
  id: number;
  name: string;
  phone: string;
  service: string | null;
  industry: string | null;
  message: string | null;
  source: string;
}

function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );
}

function escapeTelegramMd(str: string): string {
  return str.replace(/[_*`\[\]()~>#+\-=|{}.!\\]/g, "\\$&");
}

export async function notifyNewLead(lead: LeadData) {
  await Promise.allSettled([
    sendEmailNotification(lead),
    sendTelegramNotification(lead),
  ]);
}

async function sendEmailNotification(lead: LeadData) {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.ADMIN_EMAIL) return;

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"HL Media" <${env.SMTP_USER}>`,
    to: env.ADMIN_EMAIL,
    subject: `🔔 Lead mới: ${escapeHtml(lead.name)} — ${escapeHtml(lead.service || "Chưa chọn dịch vụ")}`,
    html: `
      <h2>Lead mới từ website HL Media</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Họ tên</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(lead.name)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">SĐT</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(lead.phone)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Dịch vụ</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(lead.service || "—")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Ngành hàng</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(lead.industry || "—")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Tin nhắn</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(lead.message || "—")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nguồn</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(lead.source)}</td></tr>
      </table>
      <p style="margin-top:16px"><a href="https://hlmedia.vn/quan-ly/leads">Xem trong admin panel →</a></p>
    `,
  });
  console.log("📧 Email notification sent");
}

async function sendTelegramNotification(lead: LeadData) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;

  const text = [
    "🔔 *Lead mới từ HL Media*",
    "",
    `👤 *Họ tên:* ${escapeTelegramMd(lead.name)}`,
    `📞 *SĐT:* ${escapeTelegramMd(lead.phone)}`,
    `🎯 *Dịch vụ:* ${escapeTelegramMd(lead.service || "—")}`,
    `🏭 *Ngành hàng:* ${escapeTelegramMd(lead.industry || "—")}`,
    `💬 *Tin nhắn:* ${escapeTelegramMd(lead.message || "—")}`,
    `📍 *Nguồn:* ${escapeTelegramMd(lead.source)}`,
  ].join("\n");

  const tgRes = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: "Markdown",
    }),
  });
  if (!tgRes.ok) console.error(`Telegram API error: ${tgRes.status}`);
  console.log("📱 Telegram notification sent");
}
