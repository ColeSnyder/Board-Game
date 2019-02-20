var playerNum;
var ColesIPHome = "192.168.0.16";
// var ColesIPWSU = ;

var socket = io.connect("ColesIPHome" + ":3001");

// Query DOM
var join = document.getElementById("joinGame");
var input = document.getElementById("input");

//Emit Events
join.addEventListener('click', function() {
    socket.emit('joinRequest', {
        input: input.value
    }); 
    window.location.href = "http://" + ColesIPHome+ ":3001/LoadPool.html";
});

// join.addEventListener('click', function() {
//     socket.emit('OtherObject', {
//         input: input.value
//     }); 
// });

//Listen for events 
socket.on('Request', function(data) {
    console.log("into last socket");
    var playerNum = data.num;
    var a = data.asdf;
    console.log(playerNum);
    queueOutput.innerHTML += '<h1>' + playerNum.value + a + '</h1>';
});
