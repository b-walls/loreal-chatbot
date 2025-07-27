/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

const messages = [{
  role: 'system',
  content: `You are a helpful assistant for L'Oréal. Answer only questions about L'Oréal products, beauty routines, and give personalized recommendations. 
  Do not provide medical advice or comment on other brands. Politely steer unrelated topics back to L'Oréal.`
}];

async function getChatResponse(userMessages) {
  const response = await fetch('https://loreal-chatbot.walnutz2004.workers.dev', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: userMessages
    })
  });

  const data = await response.json();
  return data;
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  messages.push({ role: 'user', content: userMessage});

  chatWindow.innerHTML += `<div class="msg user"><strong>You:</strong> ${userMessage}</div>`;
  chatWindow.scrollTop = chatWindow.scrollHeight;
  userInput.value = '';

   try {
    const responseData = await getChatResponse(messages);
    const reply = responseData.choices?.[0]?.message?.content || "No reply from assistant.";

    // Append assistant response
    chatWindow.innerHTML += `<div class="msg ai">${marked.parse("**Assistant:** " + reply)}</div>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  } catch (error) {
    chatWindow.innerHTML += `<div><strong>Error:</strong> Could not reach server.</div>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
    console.error(error);
  }
});
