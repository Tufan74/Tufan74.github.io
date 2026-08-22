module.exports = async function handler(request, response) {
    response.setHeader("Access-Control-Allow-Origin", "https://tufan74.github.io");
    response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (request.method === "OPTIONS") {
        return response.status(204).end();
    }

    if (request.method !== "POST") {
        return response.status(405).json({ error: "Methode nicht erlaubt" });
    }

    let requestBody = request.body;
    if (typeof requestBody === "string") {
        try {
            requestBody = JSON.parse(requestBody);
        } catch (error) {
            requestBody = {};
        }
    }

    const message = typeof requestBody?.message === "string"
        ? requestBody.message.trim()
        : "";

    if (!message || message.length > 4000) {
        return response.status(400).json({ error: "Ungültige Nachricht" });
    }

    if (!process.env.GEMINI_API_KEY) {
        return response.status(500).json({ error: "GEMINI_API_KEY fehlt" });
    }

    try {
        const geminiResponse = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=" +
            encodeURIComponent(process.env.GEMINI_API_KEY),
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                systemInstruction: {
                    parts: [{
                        text: "Du bist ein hilfreicher Chatbot. Antworte standardmäßig auf Deutsch, auch wenn die Frage teilweise auf Englisch gestellt wurde. Beantworte die Frage direkt, klar und vollständig. Wechsle nur auf Wunsch des Nutzers die Sprache."
                    }]
                },
                contents: [{
                    parts: [{ text: message }]
                }],
                generationConfig: {
                    maxOutputTokens: 500
                }
            })
        });

        const data = await geminiResponse.json();
        if (!geminiResponse.ok) {
            const errorMessage = geminiResponse.status === 429
                ? "Gemini-Kontingent aufgebraucht"
                : data.error?.message || `Gemini-Fehler (${geminiResponse.status})`;
            return response.status(geminiResponse.status).json({ error: errorMessage });
        }

        const answer = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        return response.status(200).json({ answer: answer || "Keine Antwort erhalten." });
    } catch (error) {
        return response.status(500).json({ error: "Interner Serverfehler" });
    }
};
