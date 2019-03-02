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
var roundCount = 0;


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

        if (Player[0].roundPoints == 3) {
            console.log("Player 1 wins");
            //place round winning code here
            adjustPlayer1GP();
            var P1Points = Player[0].Points;
            var P2Points = Player[1].Points;
            var P3Points = Player[2].Points;
            var P4Points = Player[3].Points;
            io.emit('Player1Wins', {
              P1Points: P1Points,
              P2Points: P2Points,
              P3Points: P3Points,
              P4Points: P4Points,
            });
            console.log(Player[0].Points);
            console.log(Player[1].Points);
            console.log(Player[2].Points);
            console.log(Player[3].Points);
        }
    });

    socket.on('P2Number', function(data) {
        Player[1].Hand.push(data);
        console.log(Player);
        console.log(Player[1]);
        var match = Comapare(Player[1], Player[0], Player[2], Player[3]);
        io.emit('P2Number', {
            data: data,
            match: match
        });
        match = "";
        if (Player[1].roundPoints == 3) {
            console.log("Player 2 wins");
            adjustPlayer2GP();
            var P1Points = Player[0].Points;
            var P2Points = Player[1].Points;
            var P3Points = Player[2].Points;
            var P4Points = Player[3].Points;
            io.emit('Playe2Wins', {
              P1Points: P1Points,
              P2Points: P2Points,
              P3Points: P3Points,
              P4Points: P4Points,
            });
            console.log(Player[0].Points);
            console.log(Player[1].Points);
            console.log(Player[2].Points);
            console.log(Player[3].Points);
        }
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
        if (Player[2].roundPoints == 3) {
            console.log("Player 3 wins");
            adjustPlayer3GP();
            var P1Points = Player[0].Points;
            var P2Points = Player[1].Points;
            var P3Points = Player[2].Points;
            var P4Points = Player[3].Points;
            io.emit('Player3Wins', {
              P1Points: P1Points,
              P2Points: P2Points,
              P3Points: P3Points,
              P4Points: P4Points,
            });
            console.log(Player[0].Points);
            console.log(Player[1].Points);
            console.log(Player[2].Points);
            console.log(Player[3].Points);
        }
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
        match = "";
        if (Player[3].roundPoints == 3) {
            console.log("Player 4 wins");
            adjustPlayer4GP();
            var P1Points = Player[0].Points;
            var P2Points = Player[1].Points;
            var P3Points = Player[2].Points;
            var P4Points = Player[3].Points;
            io.emit('Player4Wins', {
              P1Points: P1Points,
              P2Points: P2Points,
              P3Points: P3Points,
              P4Points: P4Points,
            });
            console.log(Player[0].Points);
            console.log(Player[1].Points);
            console.log(Player[2].Points);
            console.log(Player[3].Points);
        }
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

    function adjustPlayer1GP() {
        for (let i = 0; i < Player[0].Hand.length; i++) {
            Player[0].Points += Player[0].Hand[i];
        }
        Player[1].Points += 10;
        Player[2].Points += 10;
        Player[3].Points += 10;
    }

    function adjustPlayer2GP() {
        for (let i = 0; i < Player[1].Hand.length; i++) {
          Player[1].Points += Player[1].Hand[i];
        }
        Player[0].Points += 10;
        Player[2].Points += 10;
        Player[3].Points += 10;
    }

    function adjustPlayer3GP() {
        for (let i = 0; i < Player[2].Hand.length; i++) {
          Player[2].Points += Player[2].Hand[i];
      }
      Player[0].Points += 10;
      Player[1].Points += 10;
      Player[3].Points += 10;
    }

    function adjustPlayer4GP() {
        for (let i = 0; i < Player[3].Hand.length; i++) {
          Player[3].Points += Player[3].Hand[i];
      }
      Player[0].Points += 10;
      Player[1].Points += 10;
      Player[2].Points += 10;
    }

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

function Winner() {
    for (let i = 0; i < Player.length; i++) {
        var winner;
        var pointsTrack = 0;
        const element = Player[i];
        if (element.points > pointsTrack) {
            pointsTrack = element.points
            winner = element
            
        }
    }
    io.emit("winner", {
        winner
    })
}

if (roundCount == 1) {
    Winner();
}

function RoundCounter() {
    if (p1p2 && p1p3 && p1p4) {
        roundCount++
    }
    if (p2p1 && p2p3 && p2p4) {
        roundCount++
    }
    if (p3p2 && p3p1 && p3p4) {
        roundCount++
    }
    if (p1p2 && p1p3 && p1p4) {
        roundCount++
    }
    if (p4p2 && p4p3 && p4p1) {
        roundCount++
    }

}

function Comapare(currentPlayer, temp2, temp3, temp4) {

    var tempMatch1;
    var tempMatch2;
    var tempMatch3;
    var match;

    var firstCompare = temp2.Hand.every(val => currentPlayer.Hand.includes(val));
    if (firstCompare == true) {

        match = "p" + currentPlayer.ID + "p" + temp2.ID;
        //currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
    }
    console.log(firstCompare);
    var secondCompare = temp3.Hand.every(val => currentPlayer.Hand.includes(val));
    if (secondCompare == true) {
        match = "p" + currentPlayer.ID + "p" + temp3.ID;
        // currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
    }
    console.log(secondCompare);
    var thirdCompare = temp4.Hand.every(val => currentPlayer.Hand.includes(val));
    if (thirdCompare == true) {
        match = "p" + currentPlayer.ID + "p" + temp4.ID;
        //currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
    }
    console.log(thirdCompare);

    if (match != undefined) {

        if (match == "p1p2" && p1p2 === false) {
            p1p2 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            // console.log(match);
            // console.log("Player 1 points:" + Player[0].roundPoints);
            // console.log("Player 2 points:" + Player[1].roundPoints);
            // console.log("Player 3 points:" + Player[2].roundPoints);
            // console.log("Player 4 points:" + Player[3].roundPoints);
            return match;
        } else if (match == "p1p3" && p1p3 === false) {
            p1p3 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            // console.log(match);
            // console.log("Player 1 points:" + Player[0].roundPoints);
            // console.log("Player 2 points:" + Player[1].roundPoints);
            // console.log("Player 3 points:" + Player[2].roundPoints);
            // console.log("Player 4 points:" + Player[3].roundPoints);
            return match;
        } else if (match == "p1p4" && p1p4 === false) {
            p1p4 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            // console.log(match);
            // console.log("Player 1 points:" + Player[0].roundPoints);
            // console.log("Player 2 points:" + Player[1].roundPoints);
            // console.log("Player 3 points:" + Player[2].roundPoints);
            // console.log("Player 4 points:" + Player[3].roundPoints);
            return match;
        } else if (match == "p2p1" && p2p1 === false) {
            p2p1 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            // console.log(match);
            // console.log("Player 1 points:" + Player[0].roundPoints);
            // console.log("Player 2 points:" + Player[1].roundPoints);
            // console.log("Player 3 points:" + Player[2].roundPoints);
            // console.log("Player 4 points:" + Player[3].roundPoints);
            return match;
        } else if (match == "p2p3" && p2p3 === false) {
            p2p3 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            // console.log(match);
            // console.log("Player 1 points:" + Player[0].roundPoints);
            // console.log("Player 2 points:" + Player[1].roundPoints);
            // console.log("Player 3 points:" + Player[2].roundPoints);
            // console.log("Player 4 points:" + Player[3].roundPoints);
            return match;
        } else if (match == "p2p4" && p2p4 === false) {
            p2p4 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            // console.log(match);
            // console.log("Player 1 points:" + Player[0].roundPoints);
            // console.log("Player 2 points:" + Player[1].roundPoints);
            // console.log("Player 3 points:" + Player[2].roundPoints);
            // console.log("Player 4 points:" + Player[3].roundPoints);
            return match;
        } else if (match == "p3p1" && p3p1 === false) {
            p3p1 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            // console.log(match);
            // console.log("Player 1 points:" + Player[0].roundPoints);
            // console.log("Player 2 points:" + Player[1].roundPoints);
            // console.log("Player 3 points:" + Player[2].roundPoints);
            // console.log("Player 4 points:" + Player[3].roundPoints);
            return match;
        } else if (match == "p3p2" && p3p2 === false) {
            p3p2 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            // console.log(match);
            // console.log("Player 1 points:" + Player[0].roundPoints);
            // console.log("Player 2 points:" + Player[1].roundPoints);
            // console.log("Player 3 points:" + Player[2].roundPoints);
            // console.log("Player 4 points:" + Player[3].roundPoints);
            return match;
        } else if (match == "p3p4" && p3p4 === false) {
            p3p4 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            // console.log(match);
            // console.log("Player 1 points:" + Player[0].roundPoints);
            // console.log("Player 2 points:" + Player[1].roundPoints);
            // console.log("Player 3 points:" + Player[2].roundPoints);
            // console.log("Player 4 points:" + Player[3].roundPoints);
            return match;
        } else if (match == "p4p1" && p4p1 === false) {
            p4p1 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            // console.log(match);
            // console.log("Player 1 points:" + Player[0].roundPoints);
            // console.log("Player 2 points:" + Player[1].roundPoints);
            // console.log("Player 3 points:" + Player[2].roundPoints);
            // console.log("Player 4 points:" + Player[3].roundPoints);
            return match;
        } else if (match == "p4p2" && p4p2 === false) {
            p4p2 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            console.log(match);
            // console.log("Player 1 points:" + Player[0].roundPoints);
            // console.log("Player 2 points:" + Player[1].roundPoints);
            // console.log("Player 3 points:" + Player[2].roundPoints);
            // console.log("Player 4 points:" + Player[3].roundPoints);
            return match;
        } else if (match == "p4p3" && p4p3 === false) {
            p4p3 = true;
            currentPlayer.roundPoints = currentPlayer.roundPoints + 1;
            // console.log(match);
            // console.log("Player 1 points:" + Player[0].roundPoints);
            // console.log("Player 2 points:" + Player[1].roundPoints);
            // console.log("Player 3 points:" + Player[2].roundPoints);
            // console.log("Player 4 points:" + Player[3].roundPoints);
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