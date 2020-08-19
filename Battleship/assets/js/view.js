//addClass(element, className) – adds a given class to an element if it does not have the class. Does nothing otherwise.
//removeClass(element, className) – removes a given class from an element if the class has it. Does nothing otherwise.
//addMessage(msg) – adds a given text (msg) to the message div.
//clearMessages – Removes all messages from the message div.
//markBox(mark) – Adds a mark message to a given game board box



//did not really use this
function addClass(element, className) {
	if (element.classList)
		element.classList.add(className)
	else if (!hasClass(element, className)) element.className += " " + className
}
//or this
function changeText(element, msg) {
	if (element !== null)
		element.innerHTML = msg;
}
//display the username to the user by appending text to the body
function setUsername(){
    document.body.appendChild(document.createTextNode("Username: "+ getUsername()));
}
setUsername();

//adds the message the current message display
function addMessage(m){
    var holder = document.createTextNode(m);
    document.getElementById("textbox").appendChild(holder);
}
//clears the message feild as needed
function clearMessage(){
    document.getElementById("textbox").innerHTML = "Last acton : ";
}

function change(holder){
    if (holder == "A") {
                    holder = 1;
                }
                else if (holder == "B") {
                    holder = 2;
                }
                else if (holder == "C") {
                    holder = 3;
                }
                else if (holder == "D") {
                    holder = 4;
                }
                else if (holder == "E") {
                    holder = 5;
                }
                else if (holder == "F") {
                    holder = 6;
                }
                else if (holder == "G") {
                    holder = 7;
                }
                else if (holder == "H") {
                    holder = 8;
                }
                else if (holder == "I") {
                    holder = 9;
                }
                else if (holder == "J") {
                    holder = 10;
                }
                return holder;
}

//function getfch(){
//    let url = new URLSearchParams(location.search);
//    var data = {"status":"success","content":{"last":url.get('last'),"ship":url.get('ship')}};
//    fetch('http://127.0.0.1:3000/', {
//        method: 'POST',
//        headers: {'Content-Type': 'application/json'},
//        body: JSON.stringify(data)
//        })
//        .then(data => {
//            if(!data.ok){
//                clearMessage();
//                addMessage("error: " + data.content);
//            }
//            var temp = makeMove(change(data.content.xcoordinate), data.content.ycoordinate+1);
//            addMessage(" xcord: " + data.content.xcoordinate + " ycord: " + data.content.ycoordinate + " ");
//            if (temp == false)
//                getfch();
//        
//        }).catch(data =>{
//            
//        });
//}


function getfch(){
    let values = new URLSearchParams(location.search);     
    url = 'http://127.0.0.1:3000/'+'?last=' + values.get('last')+"&ship="+values.get('ship')+"&x="+values.get('x')+"&y="+values.get('y');
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(!data.ok){
                clearMessage();
                addMessage("error: " + data.content);
            }
            var temp = makeMove(change(data.content.xcoordinate), data.content.ycoordinate+1);
            addMessage(" xcord: " + data.content.xcoordinate + " ycord: " + data.content.ycoordinate + " ");
//            if (temp == false)
//                getfch();
        
        }).catch(data =>{
            
        });
}