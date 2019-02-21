var playerNum;
var ColesIPHome = "192.168.0.16";
var ColesIPWSU = "10.19.80.107";
var StevensIPHome = "192.168.0.17";

var socket = io.connect(ColesIPHome + ":3001");

// Query DOM
var btn = document.getElementById("joinGameButton");
var message = document.getElementById("message");

//Emit Events
btn.addEventListener('click', function() {
    socket.emit('joinRequest', {
        message: message.value
    });
    // window.location.href = "http://" + ColesIPHome + ":3001/LoadPool.html";
});

// join.addEventListener('click', function() {
//     socket.emit('OtherObject', {
//         input: input.value
//     });
// });

//Listen for events
socket.on('joinRequest', function(data) {
    console.log("into last socket");
    // var playerNum = data.num;
    // var a = data.asdf;
    console.log(data.message);
    queueOutput.innerHTML += '<h1>' + data.message + '</h1>';
});
