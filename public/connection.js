var socket = io.connect("http://localhost:3001");

// Query DOM
var btn = document.getElementById("send");
var num = document.getElementById("testNumber");

//Emit Events

btn.addEventListener('click', function() {
    socket.emit('object', {
        num: num.value
    })
});

//Listen for events 

socket.on('object', function(data) {
    output.innerHTML += '<p>' + numberDrawn + '</p>';
});