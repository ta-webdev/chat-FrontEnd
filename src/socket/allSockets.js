import openSocket from 'socket.io-client';
const endPoint = process.env.REACT_APP_API_URL;
const  socket = openSocket(endPoint);

function subscribeToMessage(cb) {
  socket.on('news', (message) => cb(message));
}

function sendMessage(message) {
  let r = socket.emit('message', message);
  return r;
}

export { subscribeToMessage, sendMessage, socket, endPoint };
