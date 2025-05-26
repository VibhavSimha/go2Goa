import 'dotenv/config'
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main() {
    const chatCompletion = await getGroqChatCompletion();
    // Print the completion returned by the LLM.
    for await (const chunk of chatCompletion)
        console.log(chunk.choices[0]?.delta?.content || "");
}

export async function getGroqChatCompletion() {
    return groq.chat.completions.create({
        "messages": [
            {

                role: "system",
                content: "You are a helpful trip planning assistant created by Vibhav to help users plan trip to Goa, India. Users will be staying at Holiday Inn Goa Candolim. Users have already been guided about Sinquerim Beach, Butterfly Beach and Agonda Beach as possible beach destinations. Users have also been guided about Basilica of Bom Jesus, Museum of Goa and Yatch Casino - Deltin Royale as possible indoor tourist places. Additionally Elephant And Co. Anjuna, Joecons Beach Shack and Copperleaf Panaji are some possible resturants suggested.",

            },
            {
                role: "user",
                content: "Hi how are you?",
            },
        ],
        "model": "llama-3.3-70b-versatile",
        "temperature": 0.5,
        "max_completion_tokens": 511,
        "stream": true,
    });
}
document.addEventListener('DOMContentLoaded', () => {
    
})