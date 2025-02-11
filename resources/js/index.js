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
async function updateMessages() {
  const messages = await fetchMessages();
  let formattedMessages = "";
  messages.forEach(message => {
    formattedMessages += messageFormat(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;
}

function sendFunction(username, message){
  const newMessage = {
    sender: username,
    text: message,
    timestamp: new Date()
  };
  
sendButton.addEventListener("click", function(event){
  event.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;
  sendFunction(sender,message);
  myMessage.value = "";
});