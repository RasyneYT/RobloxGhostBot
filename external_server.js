require("dotenv").config();
const axios = require("axios");

const API_KEY = process.env.ROBLOX_API_KEY;
const UNIVERSE_ID = process.env.ROBLOX_UNIVERSE_ID;
const TOPIC = "GhostSystem_V10";

if (!API_KEY || !UNIVERSE_ID) {
    console.error("ROBLOX_API_KEY ou ROBLOX_UNIVERSE_ID manquant.");
    process.exit(1);
}

async function sendToRoblox(data) {

    try {

        const response = await axios.post(
            `https://apis.roblox.com/messaging-service/v1/universes/${UNIVERSE_ID}/topics/${TOPIC}`, {
                message: JSON.stringify(data)
            }, {
                headers: {
                    "x-api-key": API_KEY,
                    "Content-Type": "application/json"
                },
                timeout: 5000
            }
        );

        console.log(
            "Roblox OK:",
            response.status
        );

    } catch (error) {

        console.error(
            "Roblox ERROR:",
            error.response ? .data ||
            error.message
        );

    }
}

sendToRoblox({
    Type: "Test",
    Time: Date.now()
});