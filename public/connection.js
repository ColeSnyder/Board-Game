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
    });
});


//Listen for events
socket.on('player1', function(data) {
    alert("into");
    console.log("into");
    // output.innerHTML += '<p>' + data + '</p>';
    window.location.href = "http://" + ColesIPHome + ":3001/player" + data;
});

socket.on('player2', function(data) {
    // output.innerHTML += '<p>' + data + '</p>';
    window.location.href = "http://" + ColesIPHome + ":3001/player" + data;
});

socket.on('player3', function(data) {
    // output.innerHTML += '<p>' + data + '</p>';
    window.location.href = "http://" + ColesIPHome + ":3001/player" + data;
});

socket.on('player4', function(data) {
    // output.innerHTML += '<p>' + data + '</p>';
    window.location.href = "http://" + ColesIPHome + ":3001/player" + data;
});