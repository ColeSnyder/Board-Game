/*********************************** Public data ****************************************/
//here we will store the data for the board(whether squares are green or red)

/*********************************** Player 1 data ****************************************/

var player1PublicData = [];


function RandomNum() {  
    var random =  Math.floor(Math.random() * 20) + 1 
    return random
}
for (i=0; i<3; i++) {
   player1PublicData.push(RandomNum());
}


/*********************************** Player 2 data ****************************************/

var player2PublicData = [];

for (i=0; i<3; i++) {
    player2PublicData.push(RandomNum());
 }


/*********************************** Player 3 data ****************************************/

var player3PublicData = [];

for (i=0; i<3; i++) {
    player3PublicData.push(RandomNum());
 }


/*********************************** Player 4 data ****************************************/

var player4PublicData = [];

for (i=0; i<3; i++) {
    player4PublicData.push(RandomNum());
 }

 

