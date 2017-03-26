var BOARD_SIZE = 0;
var BOARD_LENGTH = 0;

function buildGameBoard(boardSize) {
    BOARD_SIZE = boardSize * boardSize;
    BOARD_LENGTH = boardSize;
    var board = document.getElementById("boardID")
    board.style.width= 140 * boardSize + "px";
    board.style.height= 140 * boardSize + "px";

 // <div id="cell_0" class='cell' data-indx = "0" onclick="MakeMove(0)"></div>
 var htmlElements = "";
    for(i = 0; i < BOARD_SIZE; i++) {
        var cellId = "cell_" + i;
        var onClickIdx = "MakeMove(" + i + ")";
        var divValue = '<div id=' + cellId + ' class="cell" data-indx = ' + i + ' onclick=' + onClickIdx + '></div>';
        htmlElements += divValue;
    }
    board.innerHTML = htmlElements;
}