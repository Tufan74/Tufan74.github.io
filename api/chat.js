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

    const message = typeof request.body?.message === "string"
        ? request.body.message.trim()
        : "";

    if (!message || message.length > 4000) {
        return response.status(400).json({ error: "Ungültige Nachricht" });
    }

    if (!process.env.OPENAI_API_KEY) {
        return response.status(500).json({ error: "OPENAI_API_KEY fehlt" });
    }

    try {
        const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
                max_tokens: 200
            })
        });

        const data = await openAIResponse.json();
        if (!openAIResponse.ok) {
            return response.status(openAIResponse.status).json({ error: "OpenAI-Anfrage fehlgeschlagen" });
        }

        const answer = data.choices?.[0]?.message?.content?.trim();
        return response.status(200).json({ answer: answer || "Keine Antwort erhalten." });
    } catch (error) {
        return response.status(500).json({ error: "Interner Serverfehler" });
    }
};
