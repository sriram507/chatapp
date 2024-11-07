const socket = io();

const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();

  if (username && message) {
    socket.emit('chatMessage', { username, message });
    messageInput.value = '';
  }
});

socket.on('chatMessage', (data) => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerHTML = `
    <strong>${data.username}</strong> <span class="timestamp">[${data.timestamp}]</span>: ${data.message}
  `;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
});

