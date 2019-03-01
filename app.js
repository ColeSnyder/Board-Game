var fs = require('fs');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const path = require('path');
var Player = [];
var p1p2 = false;
var p1p3 = false;
var p1p4 = false;
var p2p1 = false;
var p2p3 = false;
var p2p4 = false;
var p3p1 = false;
var p3p2 = false;
var p3p4 = false;
var p4p1 = false;
var p4p2 = false;
var p4p3 = false;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/player1', function(req, res) {
    console.log('Routing to index1.ejs')
    res.render('player1');
});
app.get('/player2', function(req, res) {
    console.log('Routing to index2.ejs')
    res.render('player2');
});
app.get('/player3', function(req, res) {
    console.log('Routing to index3.ejs')
    res.render('player3');
});
app.get('/player4', function(req, res) {
    console.log('Routing to index4.ejs')
    res.render('player4');
});

app.get('*', function(req, res) {
    res.render('error');
});

server.listen(3001, '0.0.0.0', function() {
    console.log('listening on *:3001');
});


// Everything below this line will have to do with Socket.io *********************************************

io.on('connection', function(socket) {
    console.log("Made socket connection " + socket.id)

    socket.on('object', function(data) {
        playerArray.push("player" + playerArray.length);
        console.log(playerArray.length);
        var num = playerArray.length;
        io.to(socket.id).emit("player" + num, num);
    });

    socket.on('P1Number', function(data) {
        Player[0].Hand.push(data);
        console.log(Player)
        console.log(Player[0]);
        //call compare function
        var match = Comapare(Player[0], Player[1], Player[2], Player[3]);
        // console.log(Player[0].ID);
        //save response from compare to variable
        io.emit('P1Number', {
            data: data,
            match: match
        });
        match = "";
    });

    socket.on('P2Number', function(data) {
        Player[1].Hand.push(data);
        console.log(Player)
        console.log(Player[1]);
        var match = Comapare(Player[1], Player[0], Player[2], Player[3]);
        io.emit('P2Number', {
            data: data,
            match: match
        });
        match = "";
    });

    socket.on('P3Number', function(data) {
        Player[2].Hand.push(data);
        console.log(Player)
        console.log(Player[2]);
        var match = Comapare(Player[2], Player[0], Player[1], Player[3]);
        io.emit('P3Number', {
            data: data,
            match: match
        });
        match = "";
    });
    socket.on('P4Number', function(data) {
        Player[3].Hand.push(data);
        console.log(Player);
        console.log(Player[3]);
        var match = Comapare(Player[3], Player[0], Player[1], Player[2]);
        io.emit('P4Number', {
            data: data,
            match: match
        });
    });

    socket.on('sendPlayer', function(data) {
        Player.push(data);
        console.log(Player);
    });

    // if (Player.length == 3) {
    //     console.log("sending traffic....")
    //     io.emit("getarray", {
    //         Player
    //     });
    // }

    socket.on('Player1Wins', function(data) {
        for (let i = 0; i < Player[0].Hand.length - 3; i++) {
            var sum = 0;
            sum += Player[0].Hand[i]
        }
        Player[0].points += sum;
        Player[1].points += 10;
        Player[2].points += 10;
        Player[3].points += 10;
    });
    socket.on('Player2Wins', function(data) {
        for (let i = 0; i < Player[1].Hand.length - 3; i++) {
            var sum = 0;
            sum += Player[1].Hand[i]
        }
        Player[1].points += sum;
        Player[0].points += 10;
        Player[2].points += 10;
        Player[3].points += 10;
    });
    socket.on('Player3Wins', function(data) {
        for (let i = 0; i < Player[2].Hand.length - 3; i++) {
            var sum = 0;
            sum += Player[2].Hand[i]
        }
        Player[2].points += sum;
        Player[1].points += 10;
        Player[0].points += 10;
        Player[3].points += 10;
    });
    socket.on('Player4Wins', function(data) {
        for (let i = 0; i < Player[3].Hand.length - 3; i++) {
            var sum = 0;
            sum += Player[3].Hand[i]
        }
        Player[3].points += sum;
        Player[1].points += 10;
        Player[2].points += 10;
        Player[0].points += 10;
    });

});
// Player position array ********************************************************************************
// if(Player[0].points == 10){
//   io.emit("GameoverP1", {
//       Winner: Player[0]
//   })
// }
// if(Player[1].points == 10){
//   io.emit("GameoverP1", {
//       Winner: Player[1]
//   })
// }
// if(Player[2].points == 10){
//   io.emit("GameoverP1", {
//       Winner: Player[2]
//   })
// }
// if(Player[3].points == 10){
//   io.emit("GameoverP1", {
//       Winner: Player[3]
//   })
// }
function Comapare(currentPlayer, temp2, temp3, temp4) {

    var match;

    var firstCompare = temp2.Hand.every(val => currentPlayer.Hand.includes(val));
    if (firstCompare == true) {
        match = "p" + currentPlayer.ID + "p" + temp2.ID;
        //currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
        if (currentPlayer.roundPoints == 4) {
            //end round
        }
    }
    console.log(firstCompare);
    var secondCompare = temp3.Hand.every(val => currentPlayer.Hand.includes(val));
    if (secondCompare == true) {
        match = "p" + currentPlayer.ID + "p" + temp3.ID;
        // currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
        if (currentPlayer.roundPoints == 4) {
            //end round
        }

    }
    console.log(secondCompare);
    var thirdCompare = temp4.Hand.every(val => currentPlayer.Hand.includes(val));
    if (thirdCompare == true) {
        match = "p" + currentPlayer.ID + "p" + temp4.ID;
        //currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
        if (currentPlayer.roundPoints == 4) {
            //end round
        }
    }
    console.log(thirdCompare);

    if (match != undefined) {
        console.log(match);
        console.log("Player 1 points:" + Player[0].roundPoints);
        console.log("Player 2 points:" + Player[1].roundPoints);
        console.log("Player 3 points:" + Player[2].roundPoints);
        console.log("Player 4 points:" + Player[3].roundPoints);

        if (match == "p1p2" && p1p2 === false) {
            p1p2 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            return match;
        } else if (match == "p1p3" && p1p3 === false) {
            p1p3 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            return match;
        } else if (match == "p1p4" && p1p4 === false) {
            p1p4 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            return match;
        } else if (match == "p2p1" && p2p1 === false) {
            p2p1 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            return match;
        } else if (match == "p2p3" && p2p3 === false) {
            p2p3 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            return match;
        } else if (match == "p2p4" && p2p4 === false) {
            p2p4 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            return match;
        } else if (match == "p3p1" && p3p1 === false) {
            p3p1 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            return match;
        } else if (match == "p3p2" && p3p2 === false) {
            p3p2 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            return match;
        } else if (match == "p3p4" && p3p4 === false) {
            p3p4 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            return match;
        } else if (match == "p4p1" && p4p1 === false) {
            p4p1 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            return match;
        } else if (match == "p4p2" && p4p2 === false) {
            p4p2 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            return match;
        } else if (match == "p4p3" && p4p3 === false) {
            p4p3 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            return match;
        }

    }
    // return match;
    // if (match != null) {
    //     return match;
    // }
}





// for (let i = 0; i < Player.length; i++) {
//     const current = Player[i];
//     for (let j = 0; j < Player.length; j++) {
//         const element = Player[j];
//         var Token = current.Name + "-" + element.Name
//         if (Comapare(current.Hand, element.Hand)) {
//             io.on("Change", {
//                 Token
//             })
//         }
//     }
// }


var playerArray = new Array;

var playerArray1 = [];
var playerArray2 = [];
var playerArray3 = [];
var playerArray4 = [];