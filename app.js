var fs = require('fs');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const path = require('path');
var Player = [];

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
        Comapare(Player[0], Player[1], Player[2], Player[3]);
        console.log(Player[0].ID);
        //save response from compare to variable
        io.emit('P1Number', data);
    });

    socket.on('P2Number', function(data) {
        Player[1].Hand.push(data);
        console.log(Player)
        console.log(Player[1]);
        var match = Comapare(Player[1], Player[0], Player[2], Player[3]);

        // io.emit('P2Number', {data, match});
        io.emit('P2Number', data);
    });

    socket.on('P3Number', function(data) {
        Player[2].Hand.push(data);
        console.log(Player)
        console.log(Player[2]);
        Comapare(Player[2], Player[0], Player[1], Player[3]);
        io.emit('P3Number', data);

    });
    socket.on('P4Number', function(data) {
        Player[3].Hand.push(data);
        console.log(Player)
        console.log(Player[3]);
        Comapare(Player[3], Player[0], Player[1], Player[2]);
        io.emit('P4Number', data);

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

    // socket.on('Player1Wins', function(data) {
    //     data.points++
    // });
    // socket.on('Player2Wins', function(data) {
    //     data.points++
    // });
    // socket.on('Player3Wins', function(data) {
    //     data.points++
    // });
    // socket.on('Player4Wins', function(data) {
    //     data.points++
    // });

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

    var match

    var firstCompare = temp2.Hand.every(val => currentPlayer.Hand.includes(val));
    if (firstCompare == true) {
        match = "p" + currentPlayer.ID + "p" + temp2.ID + " ";
    }
    console.log(firstCompare);
    var secondCompare = temp3.Hand.every(val => currentPlayer.Hand.includes(val));
    if (secondCompare == true) {
        match += "p" + currentPlayer.ID + "p" + temp3.ID + " ";
    }
    console.log(secondCompare);
    var thirdCompare = temp4.Hand.every(val => currentPlayer.Hand.includes(val));
    if (thirdCompare == true) {
        match += "p" + currentPlayer.ID + "p" + temp4.ID + " ";
    }
    console.log(thirdCompare);
    console.log(match.value);
    return match;


}



























for (let i = 0; i < Player.length; i++) {
    const current = Player[i];
    for (let j = 0; j < Player.length; j++) {
        const element = Player[j];
        var Token = current.Name + "-" + element.Name
        if (Comapare(current.Hand, element.Hand)) {
            io.on("Change", {
                Token
            })
        }
    }
}


var playerArray = new Array;

var playerArray1 = [];
var playerArray2 = [];
var playerArray3 = [];
var playerArray4 = [];