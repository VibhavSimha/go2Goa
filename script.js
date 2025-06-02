const API_KEY = "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"
let groqchattext = {
    "messages": [
        {

            role: "system",
            content: "You are a helpful trip planning assistant created by Vibhav to help users plan trip to Goa, India. Users will be staying at Holiday Inn Goa Candolim. Users have already been guided about Sinquerim Beach, Butterfly Beach and Agonda Beach as possible beach destinations. Users have also been guided about Basilica of Bom Jesus, Museum of Goa and Yatch Casino - Deltin Royale as possible indoor tourist places. Additionally Elephant And Co. Anjuna, Joecons Beach Shack and Copperleaf Panaji are some possible resturants suggested.You will help them with by guiding about possible tourist places and other advice. Please keep all replies under 50 words, be concise, and end cleanly—do not trail off.",

        },
        {
            role: "user",
            content: "Hello",
        },
    ],
    "model": "llama-3.3-70b-versatile",
    "temperature": 0.3,
    "max_completion_tokens": 100,
    stop: ["\n\n\n"]  
}

export async function getGroqChatCompletion() {
    return groq.chat.completions.create(groqchattext);
}

const textArea = document.getElementById('chatresponse');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userinput');


async function streamChat(payload) {
    const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            // Turn OFF streaming here
            body: JSON.stringify({ ...payload, stream: false })
        }
    );

    if (!response.ok) {
        throw new Error(`API error ${response.status}`);
    }

    return response.json();
}
async function generateText() {
    let response = "";
    const chatresponse = await streamChat(groqchattext)
    textArea.innerHTML += 
    `<div class="chatOutput"><p>${(chatresponse.choices[0]?.message?.content +"\n" || "")}</p></div>`
    response += chatresponse.choices[0]?.message?.content;
    groqchattext.messages.push({
        "role": "assistant",
        "content": response
    })
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Started DOM");
    generateText();
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        textArea.innerHTML+=`<div class="userInput"><p>${userInput.value}</p></div>`
        groqchattext.messages.push({
            "role": "user",
            "content": userInput.value
        })
        generateText(userInput.value);
        userInput.value="";
    })
})