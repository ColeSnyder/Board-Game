var socket = io.connect("http://localhost:3001");

// Query DOM
var btn = document.getElementById("send");
var input = document.getElementById("inputz");
var output = document.getElementById("output");

//Emit Events
btn.addEventListener('click', function() {
    socket.emit('object', {
        input: input.value
    })
});

//Listen for events 
socket.on('object', function(data) {
    output.innerHTML += '<p>' + data.input + '</p>';
});