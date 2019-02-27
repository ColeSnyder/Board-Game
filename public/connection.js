var playerNum;

var turnNumber = 1;

var CurrentIP = "10.19.80.214";

var socket = io.connect(CurrentIP + ":3001");

// ++BEGIN++ JOIN GAME CONTENT ****************************************************************
// Query DOM
var btn = document.getElementById("joinGameButton");
output = document.getElementById("output");

// Emit
if (btn) {
    btn.addEventListener('click', function () {
        socket.emit('object', {
        });
    });
}

//Listen for events
socket.on('player1', function (data) {
    window.location.href = "http://" + CurrentIP + ":3001/player" + data;
});

socket.on('player2', function (data) {
    window.location.href = "http://" + CurrentIP + ":3001/player" + data;
});

socket.on('player3', function (data) {
    window.location.href = "http://" + CurrentIP + ":3001/player" + data;
});

socket.on('player4', function (data) {
    window.location.href = "http://" + CurrentIP + ":3001/player" + data;
});
socket.on('getarray', function(data){
    console.log('received')
    var Playerarray = data
    console.log(Playerarray)
    setBoard(Playerarray)
});
// ++END++ JOIN GAME CONTENT ****************************************************************

var buttonArray1 = [];
var buttonArray2 = [];
var buttonArray3 = [];
var buttonArray4 = [];

for (i = 1; i < 20; i++) {
    var button = "P1-" + i;
    buttonArray1.push(button);
}

for (i = 1; i < 20; i++) {
    var button = "P2-" + i;
    buttonArray2.push(button);
}

for (i = 1; i < 20; i++) {
    var button = "P3-" + i;
    buttonArray3.push(button);
}
for (i = 1; i < 20; i++) {
    var button = "P4-" + i;
    buttonArray4.push(button);
}


    socket.on('P1Number', function (data) {
        if (turnNumber == 1) {
            console.log("back into client side" + data);
            if (document.getElementById("Player")) {
                document.getElementById("Player").innerHTML = 1;
            }
            if (document.getElementById("span")) {
                document.getElementById("span").innerHTML = turnNumber + 1;
            }
            document.getElementById("current-num").innerHTML = data;
            turnNumber++;
            console.log(turnNumber);
        }
    });

    socket.on('P2Number', function (data) {
        if (turnNumber == 2) {
            console.log("back into client side" + data);
            if (document.getElementById("Player")) {
                document.getElementById("Player").innerHTML = 2;
            }
            if (document.getElementById("span")) {
                document.getElementById("span").innerHTML = turnNumber + 1;
            }
            document.getElementById("current-num").innerHTML = data;
            turnNumber++;
        }
    });


    socket.on('P3Number', function (data) {
        if (turnNumber == 3) {
            console.log("back into client side" + data);
            if (document.getElementById("Player")) {
                document.getElementById("Player").innerHTML = 3;
            }
            if (document.getElementById("span")) {
                document.getElementById("span").innerHTML = turnNumber + 1;
            }
            document.getElementById("current-num").innerHTML = data;
            turnNumber++;
        }
    });

    socket.on('P4Number', function (data) {
        if (turnNumber == 4) {
            console.log("back into client side" + data);
            if (document.getElementById("Player")) {
                document.getElementById("Player").innerHTML = 4;
            }
            if (document.getElementById("span")) {
                document.getElementById("span").innerHTML = 1;
            }
            document.getElementById("current-num").innerHTML = data;
            turnNumber = 1;
        }
    });




//*************************************** DATA HANDLING FROM HERE DOWN *************************************

/*********************************** Public data ****************************************/
//Public data will now be stored in 'connection.js' since we need the socket connection to send data.
//It also makes more sense to keep it there now

/*********************************** Player 1 data ****************************************/

var Player = CreatePlayer(Name, ID);
FillHand(Player);
init(Player);

// $("P"+ID+"-"+Player.Hand[0]).css("opacity", .3);
document.getElementById("P" + ID + "-" + Player.Hand[0]).style.opacity = .3;
document.getElementById("P" + ID + "-" + Player.Hand[1]).style.opacity = .3;
document.getElementById("P" + ID + "-" + Player.Hand[2]).style.opacity = .3;

socket.emit('sendPlayer', {
    Name: Player.Name,
    ID: Player.ID,
    Points: 0,
    Hand: Player.Hand
});
console.log(Player)

/*********************************** Functions  ****************************************/
function CreatePlayer(Name, ID) {
    var Player = [];
    Player.name = Name;
    Player.ID = ID;
    Player.Hand = [];
    return Player;
}

function Comapare(arr1, arr2) {
    // console.log(arr1 + "\n" + arr2)
    //    console.log(arr2.every(val => arr1.includes(val)))
    return arr2.every(val => arr1.includes(val))
}
function Winner(Player) {
    return false;
}

function AddNumber() {

}

function join(Player) {
    // Very basic and will probably change
    if (Players.length == 4) {
        console.log("Player area full")
    } else if (Players.length == 0) {
        Players.push(P1);
    } else if (Players.length == 1) {
        Players.push(P2);
    } else if (Players.length == 2) {
        Players.push(P3);
    } else if (Players.length == 3) {
        Players.push(P4);
    }
}
function Disconnect(Player) {
    // no idea how we want to impliment this
}

function RedOrGreen() {
    // False == Green
    //true ==  Red
    for (let i = 0; i < Players.length; i++) {
        const Current = Players[i].Hand;
        for (let j = 0; j < Players.length; j++) {
            const element = Players[j].Hand;
            Comapare(Current, element)
        }
    }
}

function RandomNum() {
    var random = Math.floor(Math.random() * 20) + 1
    return random
}

function FillHand(player, playerString) {
    for (let i = 0; i < 3; i++) {
        var Num = RandomNum();
        if (player.Hand.includes(Num)) {
            Num = RandomNum();
        }
        console.log(Num);
        player.Hand.push(Num);
    }
}

function init(Player) {
}

function selectNumber(player, numberSelected) {
    if (turnNumber == player) {
        document.getElementById("P" + player + "-" + numberSelected).style.opacity = .3;
        console.log(numberSelected)
        socket.emit('P' +player+ 'Number', + numberSelected);
        console.log('P' + player + ', ' + numberSelected);
    }
}

function setBoard(Players) {
    console.log("setBoard Op")
 console.log(Players);
 console.log(Object.keys(Player).length)
    for (let i = 0; i < Object.keys(Player).length; i++) {
        const Current = Player.Hand;
        console.log("Here is the Players Hand "+ Player.Hand)
        for (let j = 0; j < Object.keys(Player).length; j++) {
            console.log(Players);
            var first = JSON.stringify(Players)
            var Playerslist = first.split("}")
            console.log(first)
            //const element = Players[j].Hand;
            console.log("Hi "+ Players[1]);
            // if (!Comapare(Current, element)) {
            //     console.log("This is a false")
            //     $("body > main > div > div:nth-child(2) > div > div:nth-child(" + CurrentNum + ")").html('<img src="http://www.clker.com/cliparts/9/1/5/2/119498475589498995button-red_benji_park_01.svg.thumb.png">')
            // }
            // if (Comapare(Current, element)) {
            //     console.log("This is a truth")
            //     $("body > main > div > div:nth-child(2) > div > div:nth-child(" + CurrentNum + ")").html('<img src="http://www.clker.com/cliparts/q/j/I/0/8/d/green-circle-icon-th.png">')
            // }

        }
        
    }
}
