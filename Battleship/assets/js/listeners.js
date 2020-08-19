
//user clicks on the game board and then take the appropriate actions.
//restart button clicks to reset the game.

//document.querySelector("table").addEventListener('click', e => {
//        const table = e.target;
//	makeMove(table.cellIndex,table.parentNode.rowIndex);
//});
document.getElementById("reset").addEventListener('click', e => {
	reset();
});
document.getElementById("fch").addEventListener('click', e => {
	getfch();
});
