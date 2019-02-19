var socket = io.connect("http://localhost:3001");

// Query DOM
var join = document.getElementById("joinGame");
var input = document.getElementById("inputz");
var output = document.getElementById("output");

//Emit Events
join.addEventListener('click', function() {
    socket.broadcast.emit('object', {
        input: input.value
    }); 
});

//Listen for events 
socket.on('object', function(data) {
    output.innerHTML += '<p>' + data.input + '</p>';
});