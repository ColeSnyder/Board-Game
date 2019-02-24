/*********************************** Public data ****************************************/
//Public data will now be stored in 'connection.js' since we need the socket connection to send data. 
//It also makes more sense to keep it there now

/*********************************** Player 1 data ****************************************/

var Players = [];

var P1 = CreatePlayer("P1",1);
FillHand(P1, "P1");
console.log(P1.Hand);
init(P1)



/*********************************** Player 2 data ****************************************/

var P2 = CreatePlayer("P2",2 );
FillHand(P2, "P2");
console.log(P2.Hand);



/*********************************** Player 3 data ****************************************/

var P3 = CreatePlayer("P3", 3);
FillHand(P3, "P3");
console.log(P3.Hand);



/*********************************** Player 4 data ****************************************/

var P4 = CreatePlayer("P4", 4);
FillHand(P4, "P4");
console.log(P4.Hand);
 ///  Testing  area
 document.addEventListener("DOMContentLoaded", function(event) {
    join();
    join();
    join();
    join();
    join(); // throws error test
    RedOrGreen();
    setBoard();
    console.log("+++++++++++++++++++++")
    console.log(Players)

 });


/*********************************** Functions  ****************************************/
function CreatePlayer(Name, ID) {
    var Player = [];
    Player.name = Name;
    Player.ID =  ID;
    Player.Hand = [];

    return Player;
}

function Comapare(arr1, arr2) {
    console.log(arr1 + "\n" + arr2)
   console.log(arr2.every(val => arr1.includes(val)))
   return arr2.every(val => arr1.includes(val))
}
function Winner(Player) {
    return false;
 }

function AddNumber() {

}

function join(Player) {
    // Very basic and will probably change
    if(Players.length == 4){
        console.log("Player area full")
    }else if(Players.length == 0){
        Players.push(P1);
    }else if(Players.length == 1){
        Players.push(P2);
    }else if(Players.length == 2){
        Players.push(P3);
    }else if(Players.length == 3){
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
    var random =  Math.floor(Math.random() * 20) + 1
    return random
}

function FillHand(player, playerString) {
   for (let i = 0; i < 3; i++) {
        var Num =  RandomNum();
        if(player.Hand.includes(Num)){
           Num = RandomNum();
        }
        document.getElementById(playerString + "-" + Num).style.opacity = .3;
        console.log(Num);

        player.Hand.push(Num)
   }
}

function init(Player){
    var PlayerNumber =  document.getElementById('numbers').innerHTML = "{"+ Player.Hand + "}";
}

function selectNumber(playerNum, numberSelected) {
    if (playerNum == 1) {
        document.getElementById("P1-" + numberSelected).style.opacity = .3;
        P1.player.Hand.push(numberSelected);
    } else if (playerNum == 2) {
        document.getElementById(idSelected).style.opacity = .3;
        P2.player.Hand.push(numberSelected);
    } else if (playerNum == 3) {
        document.getElementById(idSelected).style.opacity = .3;
        P1.player.Hand.push(numberSelected);
    } else if (playerNum == 4) {
        document.getElementById(idSelected).style.opacity = .3;
        P1.player.Hand.push(numberSelected);
    } else {
        console.log("Player number not found");
    }
}
// function setBoard() {
//     console.log("Testing")
//     for (let i = 0; i < Players.length; i++) {
//         const Current = Players[i].Hand;
//         for (let j = 0; j < Players.length; j++) {
//             const element = Players[j].Hand;

//             var CurrentNum = (j+1) + (4*i)
//             console.log("body > main > div > div:nth-child(2) > div > div:nth-child("+CurrentNum+")")
//             if(!Comapare(Current, element)){
//                 console.log("This is a false")
//                 $("body > main > div > div:nth-child(2) > div > div:nth-child("+CurrentNum+")").html('<img src="http://www.clker.com/cliparts/9/1/5/2/119498475589498995button-red_benji_park_01.svg.thumb.png">')
//             }
//             if(Comapare(Current, element)){
//                 console.log("This is a truth")
//                 $("body > main > div > div:nth-child(2) > div > div:nth-child("+CurrentNum+")").html('<img src="http://www.clker.com/cliparts/q/j/I/0/8/d/green-circle-icon-th.png">')
//             }
//         }
//         }

//   }
