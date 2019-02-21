var playerNum;
var ColesIPHome = "192.168.0.16";
var ColesIPWSU = "10.19.80.107";
var StevensIPHome = "192.168.0.17";

var socket = io.connect(ColesIPHome + ":3001");

// Query DOM
var btn = document.getElementById("joinGameButton");
    // message = document.getElementById("message");
    output = document.getElementById("output");

// Emit

btn.addEventListener('click', function() {
    socket.emit('object', {
        // message: message.value
    });
});


//Listen for events
socket.on('object', function(data) {
    // output.innerHTML += '<p>' + data + '</p>';
    window.location.href = "http://" + ColesIPHome + ":3001/player" + data;
})
