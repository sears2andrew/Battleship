//create ship objects for each type of ship
var battleship = {
    length:4,
    orientation:"",
    name:"battleship"
};
var Destroyer = {
    length:3,
    orientation:"",
    name:"Destroyer"
};
var Submarine = {
    length:2,
    orientation:"",
    name:"Submarine"
    
};
var Cruiser = {
    length:1,
    orientation:"",
    name:"Cruiser"

};
//declair setters and getter for each element in the ships
function setbori(x){
    battleship.orientation = x;
};
function setblen(x){
    battleship.lengh = x;
};
function setdori(x){
    Destroyer.orientation = x;
};
function setdlen(x){
    Destroyer.lengh = x;
};
function setsori(x){
    Submarine.orientation = x;
};
function setslen(x){
    Submarine.lengh = x;
};
function setcori(x){
    Cruiser.orientation = x;
};
function setclen(x){
    Cruiser.lengh = x;
};
function getbori(){
    return battleship.orientation;
};
function getblen(){
    return battleship.lengh;
};
function getdori(){
    return Destroyer.orientation;
};
function getdlen(){
    return Destroyer.lengh;
};
function getsori(){
    return Submarine.orientation;
};
function getslen(){
    return Submarine.lengh;
};
function getcori(){
    return Cruiser.orientation;
};
function getclen(){
    return Cruiser.lengh;
};

//create the board and labels for the rows and coloms
//for each label set it to header to make sure it is not altered
//for each label cell, create the element and switch out the head cell with the current empty cell
function initialize(){
    var table = document.getElementById("board");
    var lables = ["#","A ","B ","C ","D ","E ","F ","G ","H ","I ","J "];
    for(var i = 0; i < 11; i++){
        var row = table.insertRow(i);
        for(var k = 0; k < 11; k++){
            var cell = row.insertCell(k);
            if(i==0){
                var swch = document.createElement("th");
                swch.innerHTML = lables[k];
                cell.parentNode.replaceChild(swch,cell);
                
            }
            if(i>0 && k==0){
                var swch = document.createElement("th");
                swch.innerHTML = i-1;
                cell.parentNode.replaceChild(swch,cell);
               
            }
        }
    }
};
initialize();
//randomly generate an x and y cordnate and figure out if it can be place forward or backwords
//based on orientation. if it can be placed iterate through the board and place a char based on
// what ship is being placed. the strings size is set to 0, so it can be checked for later on, but
//is not impeeding on the users experiance.
function putShip(ships){
    var types = ["B","D","S","C"];
    var table = document.getElementById("board");
    for(var j = 0; j < ships.length; j++){
        var tx = Math.round(Math.random()*9)+1;
        var ty = Math.round(Math.random()*9)+1;
        if(ships[j].orientation == "x"){
            if(ships[j].length.valueOf()+ty < 12){
                for(var p = 0; p < ships[j].length; p++){
                    table.rows[tx].cells[ty+p].innerHTML = types[j];
                }
            }
            else{
                for(var o = 0; o < ships[j].length; o++){
                    table.rows[tx].cells[ty-o].innerHTML = types[j];
                }
            }
            
        }
        else{
            if(ships[j].length.valueOf()+tx < 12){
                for(var p = 0; p < ships[j].length; p++){
                    table.rows[tx+p].cells[ty].innerHTML = types[j];
                }
            }
            else{
                for(var o = 0; o < ships[j].length; o++){
                    table.rows[tx-o].cells[ty].innerHTML = types[j];
                }
            }
        }
    }
    
    
    
};
//create one of each of the ship objects and place it onto an arry for easy access later on
//at this point orientation is randomly generated and set to each ship.
//after setting up all the ships, it calls the putship function to place them on the board


function createShips(){
    var ships = [];
    ships.push(Object.assign({},battleship));
    ships.push(Object.assign({},Destroyer));
    ships.push(Object.assign({},Submarine));
    ships.push(Object.assign({},Cruiser));
    for(var i=0; i<ships.length;i++){
        var x = Math.random()*10;
        if(x < 5)
            ships[i].orientation = "x";
        else
            ships[i].orientation = "y";
    }
    putShip(ships);
};
createShips();
function getMove(){
    document.getElementById("board").addEventListener('click', e => {
            var element = e.target;
            var col = ["#","A","B","C","D","E","F","G","H","I","J"];
            
	console.log("col: ",col[element.cellIndex] ," row: " ,element.parentNode.rowIndex-1 , " was clicked");
});
    
};
getMove();
//set an array of ship length values to keep track hit counts for each ship
//to track if a ship has sunk. when called get the position that the user clicked on 
//and determine if it hit a ship or not. once that is figured out, set the image into the
//cell if needed or mark it. also set the apropriate messages to display to the user and 
//make calls to display them. after each board click, check to see if that caused the game
// to end and display the apropriate message.
var hits = [4,3,2,1];
function makeMove(x,y){
    let data = new URLSearchParams(location.search);
    var board = document.getElementById("board");
    var holder = board.rows[y].cells[x].innerHTML;
    var cell = board.rows[y].cells[x];
    var img = document.createElement('img');
	if (holder === "B") {
            img.src = "assets/images/battleship.jpg";
	}
        else if(holder === "D"){
            img.src = "assets/images/destroyer.jpg";
        }
        else if(holder === "C"){
            img.src = "assets/images/cruiser.jpg";
        }
        else if(holder === "S"){
            img.src = "assets/images/submarine.jpg";
        }
        
        if(holder == ""){
            var swap = document.createElement('th');

            swap.style.backgroundColor = 'red';
            swap.innerHTML = "M";
            cell.parentNode.replaceChild(swap,cell);
            clearMessage();
            addMessage("Missed");
            data.set('last','m');
            data.set('ship','none');
        }
        else{
            clearMessage();
            if (holder.indexOf("B")!==-1 && cell.getElementsByTagName('img').length == 0) {
                addMessage("hit");
                hits[0]--;
                if(hits[0] == 0){
                    addMessage(", you sunk my");
                    data.set('last',"k");
                }
                else
                    data.set('last','h');
                data.set('ship','b');
                addMessage(" battleship!!!");
            }
            else if(holder.indexOf("D")!==-1 && cell.getElementsByTagName('img').length == 0){
                addMessage("hit");
                hits[1]--;
                if(hits[1] == 0){
                    addMessage(", you sunk my");
                    data.set('last',"k");
                }
                else
                    data.set('last','h');
                data.set('ship','d');
                addMessage(" destroyer!!!");
            }
            else if(holder.indexOf("C")!==-1 && cell.getElementsByTagName('img').length == 0){
                addMessage("hit");
                hits[3]--;
                if(hits[3] == 0){
                    addMessage(", you sunk my");
                    data.set('last',"k");
                }
                else
                    data.set('last','h');
                data.set('ship','c');
                addMessage(" cruiser!!!");
            }
            else if(holder.indexOf("S")!==-1 && cell.getElementsByTagName('img').length == 0){
                addMessage("hit");
                hits[2]--;
                if(hits[2] == 0){
                    addMessage(", you sunk my");
                    data.set('last',"k");
                }
                else
                    data.set('last','h');
                data.set('ship','s');
                addMessage(" submarine!!!");
            }
            else if(holder.length > 0){
                console.log("repeat");
                return false;
            }
              
            
        }
        data.set('x',x-1);
        data.set('y',y-1);
    let url = location.protocol + "//" + location.host + location.pathname + '?' + data.toString();
    history.replaceState({path: url}, '', url); 
    cell.appendChild(img);
    isGameOver(hits);
};