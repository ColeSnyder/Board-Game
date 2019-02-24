var playerNum;

var CurrentIP = "192.168.0.16";

var socket = io.connect(CurrentIP + ":3001");

// ++BEGIN++ JOIN GAME CONTENT **************************************************************** 
// Query DOM
var btn = document.getElementById("joinGameButton");
    output = document.getElementById("output");

// Emit
if (btn) {
btn.addEventListener('click', function() {
    socket.emit('object', {
    });
});
}

//Listen for events
socket.on('player1', function(data) {
    window.location.href = "http://" + CurrentIP + ":3001/player" + data;
});

socket.on('player2', function(data) {
    window.location.href = "http://" + CurrentIP + ":3001/player" + data;
});

socket.on('player3', function(data) {
    window.location.href = "http://" + CurrentIP + ":3001/player" + data;
});

socket.on('player4', function(data) {
    window.location.href = "http://" + CurrentIP + ":3001/player" + data;
});
// ++END++ JOIN GAME CONTENT **************************************************************** 

var buttonArray1 = [];
var buttonArray2 = [];
var buttonArray3 = [];
var buttonArray3 = [];

for(i=1; i<20; i++){
    var button = "P1-" + i;
    buttonArray1.push(button);
}

for(i=1; i<20; i++){
    var button = "P2-" + i;
    buttonArray2.push(button);
}

for (i=0; i<buttonArray1.length; i++) {
    document.getElementById(buttonArray1[i]).addEventListener('click', function() {
        var numberChosen = this.innerHTML;
        socket.emit('P1Number', numberChosen);
    });
}

for (i=0; i<buttonArray2.length; i++) {
    document.getElementById(buttonArray2[i]).addEventListener('click', function() {
        var numberChosen = this.innerHTML;
        socket.emit('P2Number', numberChosen);
    });
}


socket.on('P1Number', function(data) {
    console.log("back into client side" + data);
    document.getElementById("current-num").innerHTML = data;
});

// socket.on('P2Number', function(data) {
//     console.log("back into client side" + data);
//     document.getElementById("current-num").innerHTML = data;
// });
