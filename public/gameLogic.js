//Player object 
var socket
var Players =  []
function createPlayer(Name, ID) {  
    
        var Player = [];
        Player.name = Name;
        Player.ID =  ID;
        Player.Hand = [];
        Player.Points = 0;
        Player.win = [false, false, false]
        return Player;
}
function initPlayer(Player) {
    socket = io.connect('http:/localhost:3000')
   fillHand(Player.Hand)
}

function fillHand(arr){
    while(arr.length < 3){
        var Ran =  Math.floor(Math.random() * 20);
        if (arr.indexOf(Ran) === -1) arr.push(Ran) 
    }
}

function selectNum(Num, Player) {  
    Player.Hand.push(Num);
}

function Compare(arr1, arr2){
       return arr2.every(val => arr1.includes(val))
}

function checkWinner(Player1) { 
    return Player1.win.every(val => val == true)
 }

 function setBoard() {
  
    for (let i = 0; i < Players.length; i++) {
        const Current = Players[i].Hand;
        for (let j = 0; j < Players.length; j++) {
            const element = Players[j].Hand;

            var CurrentNum = (j+1) + (4*i)
            console.log("body > main > div > div:nth-child(2) > div > div:nth-child("+CurrentNum+")")
            if(!Comapare(Current, element)){
                console.log("This is a false")
                $("body > main > div > div:nth-child(2) > div > div:nth-child("+CurrentNum+")").html('<img src="http://www.clker.com/cliparts/9/1/5/2/119498475589498995button-red_benji_park_01.svg.thumb.png">')
            }
            if(Comapare(Current, element)){
                console.log("This is a truth")
                $("body > main > div > div:nth-child(2) > div > div:nth-child("+CurrentNum+")").html('<img src="http://www.clker.com/cliparts/q/j/I/0/8/d/green-circle-icon-th.png">')
            }
        }
        }

  }

var P1 =  createPlayer("P1", 1)
initPlayer(P1)
console.log(P1.Hand)
selectNum(3, P1);
console.log(P1.Hand)