// Chat
const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

function appendMessage(text, sender){
    const div = document.createElement("div");
    div.classList.add("chat-msg", sender === "user" ? "user-msg" : "bot-msg");
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(){
    const msg = chatInput.value.trim();
    if(!msg) return;
    appendMessage(msg, "user");
    chatInput.value = "";
    try{
        const res = await fetch("/chat", {
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({ message: msg })
        });
        const data = await res.json();
        appendMessage(data.reply,"bot");
    }catch{
        appendMessage("Error connecting to server.","bot");
    }
}

if(sendBtn) sendBtn.onclick = sendMessage;
if(chatInput) chatInput.addEventListener("keydown", e => { if(e.key==="Enter") sendMessage(); });

// Image Generator
const promptInput = document.getElementById("prompt");
const genBtn = document.getElementById("genBtn");
const imgResult = document.getElementById("imgResult");

async function generateImage(){
    const prompt = promptInput.value.trim();
    if(!prompt) return;
    imgResult.innerHTML="<p>Generating...</p>";
    try{
        const res = await fetch("/generate-image", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({ prompt })
        });
        const data = await res.json();
        if(data.image){
            imgResult.innerHTML=`<div class="image-box"><img src="${data.image}" /></div>`;
        }else imgResult.innerHTML="<p>Failed to generate image.</p>";
    }catch{
        imgResult.innerHTML="<p>Error connecting to server.</p>";
    }
}

if(genBtn) genBtn.onclick = generateImage;
if(promptInput) promptInput.addEventListener("keydown", e => { if(e.key==="Enter") generateImage(); });