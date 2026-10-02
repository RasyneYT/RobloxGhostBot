require("dotenv").config();

const axios = require("axios");

const API_KEY =
    process.env.ROBLOX_API_KEY;

const UNIVERSE_ID =
    process.env.ROBLOX_UNIVERSE_ID;

const TOPIC =
    "GhostSystem_V11";

if (!API_KEY) {
    throw new Error(
        "ROBLOX_API_KEY manquante"
    );
}

if (!UNIVERSE_ID) {
    throw new Error(
        "ROBLOX_UNIVERSE_ID manquant"
    );
}

async function sendRoblox(data) {

    try {

        const response =
            await axios.post(

                `https://apis.roblox.com/messaging-service/v1/universes/${UNIVERSE_ID}/topics/${TOPIC}`,

                {
                    message: JSON.stringify(data)
                },

                {
                    headers: {
                        "x-api-key": API_KEY,

                        "Content-Type": "application/json"
                    },

                    timeout: 5000
                }
            );

        console.log(
            "[Roblox]",
            response.status
        );

    } catch (error) {

        console.error(
            "[Roblox]",
            error.response ? .data ||
            error.message
        );

    }
}

sendRoblox({
    type: "ExternalTest",
    timestamp: Date.now(),

    data: {
        message: "Ghost bridge OK"
    }
});