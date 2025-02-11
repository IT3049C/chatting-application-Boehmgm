const nameInput = document.getElementById(`my-name-input`)
const myMessage = document.getElementById(`my-message-input`)
const sendButton = document.getElementById(`send-button`)
const chatBox = document.getElementById(`chat`)

function messageFormat(message, nameInput){
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (nameInput === message.sender){
    return `<div class="mine messages">
      <div class="message">${message.text}</div>
      <div class="sender-info">${formattedTime}</div>
    </div>`;
    
  }else{
    return `<div class="yours messages">
      <div class="message">${message.text}</div>
      <div class="sender-info">${formattedTime}</div>
    </div>`;

  }

}
const serverURL = `https://it3049c-chat.fly.dev/messages`
async function fetchMessages(){
  const response = await fetch(serverURL)
  return response.json();
}

async function updateMessages() {
  const messages = await fetchMessages();
  let formattedMessages = "";
  messages.forEach(message => {
    formattedMessages += messageFormat(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;
}

setInterval(updateMessages, 2000);

function sendFunction(username, message){
  const newMessage = {
    sender: username,
    text: message,
    timestamp: new Date()
  };
  
  fetch(serverURL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newMessage)
  });
  updateMessages();
  
}
sendButton.addEventListener("click", function(event){
  event.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;
  sendFunction(sender,message);
  myMessage.value = "";
});