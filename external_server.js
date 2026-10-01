require("dotenv").config();

const axios = require("axios");

const API_KEY =
    process.env.ROBLOX_API_KEY;

const UNIVERSE_ID =
    process.env.ROBLOX_UNIVERSE_ID;

const TOPIC =
    "GhostV6";

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

async function publish(data) {

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
            "[Roblox] Message envoyé",
            response.status
        );

    } catch (error) {

        console.error(
            "[Roblox] Erreur:",
            error.response ? .data ||
            error.message
        );

    }
}

// Test uniquement
publish({
    Type: "External",
    Action: "Test",
    ServerId: "External"
});