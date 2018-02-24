var BOARD_SIZE = 0;
var BOARD_LENGTH = 0;

function buildGameBoard(boardSize) {
    BOARD_SIZE = boardSize * boardSize;
    BOARD_LENGTH = boardSize;
    var board = document.getElementById("boardID")
    board.style.width= 180 * boardSize + "px";
    board.style.height= 180 * boardSize + "px";

 var htmlElements = "";
    for(i = 0; i < BOARD_SIZE; i++) {
        var cellId = "cell_" + i;
        var onClickIdx = "MakeMove(" + i + ")";
        var onMouseOverIdx = "onMouseOver(" + i + ")";
        var onMouseLeaveIdx = "onMouseLeave(" + i + ")";
        var divValue = '<div id=' + cellId + ' class="cell" data-indx = ' + i + ' onclick=' + onClickIdx + ' onmouseover=' + onMouseOverIdx + ' onmouseleave=' + onMouseLeaveIdx + '></div>';
        htmlElements += divValue;
    }
    board.innerHTML = htmlElements;
}

function onMouseOver(cellId) {
    var idPos = "cell_" + cellId;
    if (board[cellId] === UNOCCUPIED) {
        document.getElementById(idPos).style.backgroundColor="lightgray"
    }
}

function onMouseLeave(cellId) {
    var idPos = "cell_" + cellId;
    document.getElementById(idPos).style.backgroundColor="white"
}
