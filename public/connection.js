var playerNum;

var turnNumber = 1;

var CurrentIP = "192.168.0.16";

var socket = io.connect(CurrentIP + ":3001");

// ++BEGIN++ JOIN GAME CONTENT ****************************************************************
// Query DOM
var btn = document.getElementById("joinGameButton");
output = document.getElementById("output");

// Emit
if (btn) {
    btn.addEventListener('click', function() {
        socket.emit('object', {});
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
// socket.on('getarray', function(data){
//     console.log('received')
//     var Playerarray = data
//     console.log(Playerarray)
//     setBoard(Playerarray)
// });
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


socket.on('P1Number', function(data) {
    if (turnNumber == 1) {
        console.log("back into client side" + data.data);
        console.log(data.match);
        if (data.match != undefined) {
            console.log("into change statement");
            var idToChange = data.match;
            document.getElementById(idToChange).innerHTML = " <img src=\"http://www.clker.com/cliparts/q/j/I/0/8/d/green-circle-icon-th.png\">"
        }
        if (document.getElementById("Player")) {
            document.getElementById("Player").innerHTML = 1;
        }
        if (document.getElementById("span")) {
            document.getElementById("span").innerHTML = turnNumber + 1;
        }
        document.getElementById("current-num").innerHTML = data.data;
        turnNumber++;
    }
});

socket.on('P2Number', function(data) {
    if (turnNumber == 2) {
        console.log("back into client side" + data.data);
        console.log(data.match);
        if (data.match != undefined) {
            console.log("into change statement");
            var idToChange = data.match;
            document.getElementById(idToChange).innerHTML = " <img src=\"http://www.clker.com/cliparts/q/j/I/0/8/d/green-circle-icon-th.png\">"
        }
        if (document.getElementById("Player")) {
            document.getElementById("Player").innerHTML = 2;
        }
        if (document.getElementById("span")) {
            document.getElementById("span").innerHTML = turnNumber + 1;
        }
        document.getElementById("current-num").innerHTML = data.data;
        turnNumber++;
    }
});


socket.on('P3Number', function(data) {
    if (turnNumber == 3) {
        console.log("back into client side" + data.data);
        console.log(data.match);
        if (data.match != undefined) {
            console.log("into change statement");
            var idToChange = data.match;
            document.getElementById(idToChange).innerHTML = " <img src=\"http://www.clker.com/cliparts/q/j/I/0/8/d/green-circle-icon-th.png\">"
        }
        if (document.getElementById("Player")) {
            document.getElementById("Player").innerHTML = 3;
        }
        if (document.getElementById("span")) {
            document.getElementById("span").innerHTML = turnNumber + 1;
        }
        document.getElementById("current-num").innerHTML = data.data;
        turnNumber++;
    }
});

socket.on('P4Number', function(data) {
    if (turnNumber == 4) {
        console.log("back into client side" + data.data);
        console.log(data.match);
        if (data.match != undefined) {
            console.log("into change statement");
            var idToChange = data.match;
            document.getElementById(idToChange).innerHTML = " <img src=\"http://www.clker.com/cliparts/q/j/I/0/8/d/green-circle-icon-th.png\">"
        }
        if (document.getElementById("Player")) {
            document.getElementById("Player").innerHTML = 4;
        }
        if (document.getElementById("span")) {
            document.getElementById("span").innerHTML = 1;
        }
        document.getElementById("current-num").innerHTML = data.data;
        turnNumber = 1;
    }
});

socket.on('Change', function(data) {
    $(data).html('<img src="http://www.clker.com/cliparts/q/j/I/0/8/d/green-circle-icon-th.png">')

});


//*************************************** DATA HANDLING FROM HERE DOWN *************************************

/*********************************** Public data ****************************************/
//Public data will now be stored in 'connection.js' since we need the socket connection to send data.
//It also makes more sense to keep it there now

/*********************************** Player 1 data ****************************************/

var Player = CreatePlayer(Name, ID);
FillHand(Player);
init(Player);

document.getElementById("P" + ID + "-" + Player.Hand[0]).style.opacity = .3;
document.getElementById("P" + ID + "-" + Player.Hand[1]).style.opacity = .3;
document.getElementById("P" + ID + "-" + Player.Hand[2]).style.opacity = .3;

socket.emit('sendPlayer', {
    Name: Player.Name,
    ID: Player.ID,
    Points: 0,
    Hand: Player.Hand,
    roundPoints: Player.roundPoints
});
console.log(Player)

/*********************************** Functions  ****************************************/
function CreatePlayer(Name, ID) {
    var Player = [];
    Player.name = Name;
    Player.ID = ID;
    Player.Hand = [];
    Player.roundPoints = 0;
    return Player;
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

function init(Player) {}

function selectNumber(player, numberSelected) {
    if (turnNumber == player) {
        document.getElementById("P" + player + "-" + numberSelected).style.opacity = .3;
        console.log(numberSelected)
        socket.emit('P' + player + 'Number', +numberSelected);
        console.log('P' + player + ', ' + numberSelected);
    }
}
setboard()

function setboard() {
    // console.log("into setboard");
    // var green = document.createElement("green");

    // green.src = "http://www.clker.com/cliparts/9/1/5/2/119498475589498995button-red_benji_park_01.svg.thumb.png";
    // $("p1p1").html("http://www.clker.com/cliparts/9/1/5/2/119498475589498995button-red_benji_park_01.svg.thumb.png");

    // area.appendChild(green);

    var id = ["p1", "p2", "p3", "p4"]

    for (let i = 0; i < 4; i++) {
        var element = id[i]
        for (let j = 0; j < 4; j++) {
            const current = id[j];

            var IDedit = element + current
            console.log(IDedit)
            if (element == current) {
                console.log("Green")
                document.getElementById(IDedit).innerHTML = " <img src=\"http://www.clker.com/cliparts/q/j/I/0/8/d/green-circle-icon-th.png\">"
            } else {
                console.log("red")
                document.getElementById(IDedit).innerHTML = "<img src=\"http://www.clker.com/cliparts/9/1/5/2/119498475589498995button-red_benji_park_01.svg.thumb.png\">"

            }
        }

    }
}

function updatePoints(player1Points, player2Points, player3Points, player4Points) {
    document.getElementById(PointsPlayer1).innerHTML = player1Points;
    document.getElementById(PointsPlayer2).innerHTML = player2Points;
    document.getElementById(PointsPlayer3).innerHTML = player3Points;
    document.getElementById(PointsPlayer4).innerHTML = player4Points;
}

function resetButtons() {
    for(i=1; i<21; i++) {
        document.getElementById("P1-"+i).style.opacity = 1;
        document.getElementById("P2-"+i).style.opacity = 1;
        document.getElementById("P3-"+i).style.opacity = 1;
        document.getElementById("P4-"+i).style.opacity = 1;
    }
}

socket.on('Player1Wins', function(data) {
    var player1Points = data.P1Points;
    var player2Points = data.P2Points;
    var player3Points = data.P3Points;
    var player4Points = data.P4Points;
    console.log("player1: " + player1Points);
    console.log("player2: " + player2Points);
    console.log("player3: " + player3Points);
    console.log("player4: " + player4Points);
    setboard();
    updatePoints(player1Points, player2Points, player3Points, player4Points);
    resetButtons();
});

socket.on('Player2Wins', function(data) {
    var player1Points = data.P1Points;
    var player2Points = data.P2Points;
    var player3Points = data.P3Points;
    var player4Points = data.P4Points;
    console.log("player1: " + player1Points);
    console.log("player2: " + player2Points);
    console.log("player3: " + player3Points);
    console.log("player4: " + player4Points);
    setboard();
});

socket.on('Player3Wins', function(data) {
    var player1Points = data.P1Points;
    var player2Points = data.P2Points;
    var player3Points = data.P3Points;
    var player4Points = data.P4Points;
    console.log("player1: " + player1Points);
    console.log("player2: " + player2Points);
    console.log("player3: " + player3Points);
    console.log("player4: " + player4Points);
    setboard();
});

socket.on('Player4Wins', function(data) {
    var player1Points = data.P1Points;
    var player2Points = data.P2Points;
    var player3Points = data.P3Points;
    var player4Points = data.P4Points;
    console.log("player1: " + player1Points);
    console.log("player2: " + player2Points);
    console.log("player3: " + player3Points);
    console.log("player4: " + player4Points);
    setboard();
});


