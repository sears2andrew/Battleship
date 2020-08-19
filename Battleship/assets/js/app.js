var gamePlay = {
    
    
};
//parses out the url to get the username that was submited in the index webpage
function getUsername(){
        let values = new URLSearchParams(location.search);
        return values.get('uname');      
    };
function playGame(){
    
};
//check to see if all the ships have been hit
function isGameOver(a){
    var total = 0;
    for(var x =0; x<a.length;x++){
        total+=a[x];
    }
    if(total == 0){
        clearMessage();
        addMessage("Game Over");
        
    }
}

//reset everything on the page
function reset(){
    location.reload();

};