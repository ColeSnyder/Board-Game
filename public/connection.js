var playerNum;




var socket = io.connect("192.168.0.16:3001");

// Query DOM
var join = document.getElementById("joinGame");

//Emit Events
join.addEventListener('click', function() {
    socket.emit('joinRequest', {
        input: input.value
    }); 
    window.location.href = "http://192.168.0.16:3001/LoadPool.html";
});

// join.addEventListener('click', function() {
//     socket.emit('OtherObject', {
//         input: input.value
//     }); 
// });

//Listen for events 
socket.on('object', function(data) {
    var playerNum = data;
    console.log(playerNum);
    queueOutput.innerHTML += '<p>' + playerNum.value + '</p>';
});