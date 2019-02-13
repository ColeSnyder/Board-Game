/*********************************** Public data ****************************************/
//here we will store the data for the board(whether squares are green or red)

/*********************************** Player 1 data ****************************************/

var Players = [];


var P1 = CreatePlayer("P1");
FillHand(P1);
console.log(P1.Hand);




/*********************************** Player 2 data ****************************************/

var P2 = CreatePlayer("P2");
FillHand(P2);
console.log(P2.Hand);



/*********************************** Player 3 data ****************************************/

var P3 = CreatePlayer("P3");
FillHand(P3);
console.log(P3.Hand);



/*********************************** Player 4 data ****************************************/

var P4 = CreatePlayer("P4");
FillHand(P4);
console.log(P4.Hand);


/*********************************** Functions  ****************************************/
function CreatePlayer(Name) {  
    var Player = [];
    Player.name = Name;
    Player.Hand = [];

    return Player;
}

function Comapare(arr1, arr2) {  
    for (let i = 0; i < arr1.length; i++) {
        const Current = arr1[i]
        for(let j = 0; j < arr2.length; j++) {
            const element = arr2[j];
            
        }
    }
}

function AddNumber() {

}

function join(Player) {
    // Very basic and will probably change 
    if(Players.length == 3){
        console.log("Player area full")
    }
    if(Players.length == 0){
        Players.push(P1);
    }
    if(Players.length == 1){
        Players.push(P2);
    }
    if(Players.length == 2){
        Players.push(P3);
    }
    if(Players.length == 3){
        Players.push(P4);
    }
}
function Disconnect(Player) {
 // no idea how we want to impliment this 
}

function RedOrGreen(Compare, Hand) {  
    for (let i = 0; i < Players.length; i++) {
        const element = Players[i];
        for (let j = 0; j < Players.length; j++) {
            const element = Players[j];
            
        }
        
    }
}

function RandomNum() {  
    var random =  Math.floor(Math.random() * 20) + 1 
    return random
}

function FillHand(player) {  
   for (let i = 0; i < 3    ; i++) {
        player.Hand.push(RandomNum())    
   }
}