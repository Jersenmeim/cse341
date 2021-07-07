const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const chatBox = document.getElementById('chatBox')
const messageEl = document.getElementById('message')
const user = document.getElementById('user').value
const date = new Date() // Date implementation


const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

socket.on('newMessage', data => {
    addMessage(data, false)
})

// Post message to board
const postMessage = () => {
    const message = document.getElementById('message').value;
    const color = document.getElementById('color').value;
    const data = {
        message,
        type: "uMessage",
        color: color,
        username: user
    }

    addMessage(data, true);
    socket.emit('message', data);
    document.getElementById('message').value = "";




}

const posLogout = async () => {
    const user = document.getElementById('user').value;
    const res = await postData("/prove12/logout", {
        username: user
    });
    if (res.message.includes('Success')) {
        socket.emit('newUser', {
            message: user + " has logged out.",
            color: 'gray'
        });
        window.location.href = "/prove12/";
    }
}

// Add message from any user to chatbox, determine if added
// by current user.



const addMessage = (data = {}, self = true) => {


    //let user = link.getAttribute('value');



    const time = (date.getHours() + 24) % 12 + ":" + date.getMinutes() + " : ";
    const chatList = document.getElementById('chatBox');
    const newLi = document.createElement("li");

    if (data.username === undefined) {
        newLi.innerText = time + data.message;
    } else
        newLi.innerText = data.username + " " + time + data.message;

    newLi.setAttribute('class', data.type);
    if (!self) {
        newLi.setAttribute('class', data.type + ' ' + data.color);
    }
    chatList.appendChild(newLi);
}