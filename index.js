require("dotenv").config();
const axios = require("axios");

const API_KEY = process.env.ROBLOX_API_KEY;
const UNIVERSE_ID = process.env.ROBLOX_UNIVERSE_ID;
const TOPIC = "GhostSystem_V11";
const MAX_BYTES = 1000; // limite Roblox : 1 KB par message

if (!API_KEY) throw new Error("ROBLOX_API_KEY manquante");
if (!/^\d+$/.test(UNIVERSE_ID || "")) throw new Error("ROBLOX_UNIVERSE_ID invalide");

const http = axios.create({
    baseURL: "https://apis.roblox.com",
    timeout: 5000,
    maxRedirects: 0,
    headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
    },
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function sendRoblox(data, retries = 2) {
    const message = JSON.stringify(data);
    if (Buffer.byteLength(message, "utf8") > MAX_BYTES) {
        throw new Error("Message trop gros (> 1 KB)");
    }

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const res = await http.post(
                `/messaging-service/v1/universes/${UNIVERSE_ID}/topics/${TOPIC}`, { message }
            );
            console.log("[Roblox] OK", res.status);
            return true;
        } catch (error) {
            const status = error.response ? .status;
            const retryable = !status || status === 429 || status >= 500;
            console.error("[Roblox] Erreur", status ? ? error.code ? ? "reseau");
            if (!retryable || attempt === retries) return false;
            await sleep(1000 * 2 ** attempt);
        }
    }
    return false;
}

sendRoblox({
    type: "ExternalTest",
    timestamp: Date.now(),
    data: { message: "Ghost bridge OK" },
});