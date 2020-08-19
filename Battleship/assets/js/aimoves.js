//take in cords that the server wants to make and return whether they should make the move

function trymov(x,y){
    var check = x.toString() + "," + y.toString();
    var fs = require('fs');
    fs.readFile("playdata.txt", function (err, data) {
        if (err) throw err;
        if(data.includes(check)){
            return false;
        }
    });
    return true;
}

//add the move to be made into the made moves file

function makemov(x,y){
    var check = x.toString() + "," + y.toString()+'\n';
    var fs = require('fs');
    fs.appendFile("playdata.txt", check, (err) => { 
        if (err) throw err; 
    }); 
}
//change the cord values into data that the cliet will be able to interperate
//then format the data to be sent back to the client in the near future
function setstring(x,y){
    if(x==0)
        x='A';
    else if(x==1)
        x='B';
    else if(x==2)
        x='C';
    else if(x==3)
        x='D';
    else if(x==4)
        x='E';
    else if(x==5)
        x='F';
    else if(x==6)
        x='G';
    else if(x==7)
        x='H';
    else if(x==8)
        x='I';
    else if(x==9)
        x='J';
    else
        x='you tryed';
    var holder ={"status":"success","content":{"xcoordinate":x,"ycoordinate":y,"coordinates":[x,y]}}

    return holder;
}


//get the url


const url = require('url');

exports.aimov = function (callbackFn,req) {
    
    //parse out the clients url and set variables
    
    var dir = 0;
    var done = false;
    let data = url.parse(req.url, true);        
    var last = data.query['last'];
    var x = data.query['x'];
    var y = data.query['y'];
    
    //hit tracking is not working. monkey bananas plz
    
//    if(last == 'h'){
//        dir = 1;
//    }

    //check if a direction is needed and loop checking each direction
    //from the base node to find the next valid move/hit
    
    while(done == false){

        if(dir == 0){
            var x = Math.floor(Math.random() * 10);
            var y = Math.floor(Math.random() * 10);

            while(!trymov(x,y)){
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
            }
            done = true;
            makemov(x,y);
        }
        else if(dir == 1){
            dir++;
            if(trymov(x+1,y)){
                x++;
                makemov(x,y);
                done = true;
            }
        }
        else if(dir == 2){
            dir++
            if(trymov(x,y+1)){
                y++;
                makemov(x,y);
                done = true;
            }
        }
        else if(dir == 3){
            dir++;
            if(trymov(x-1,y)){
                x--;
                makemov(x,y);
                done = true;
            }
        }
        else if(dir == 4){
            y--;
            makemov(x,y);
            done = true;
        }
    }
    //return the formated data to be sent from the server
    callbackFn(setstring(x,y));
};
