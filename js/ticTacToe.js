var playerImage = new Image();
playerImage.src = "../images/o.png";
var computerImage = new Image();
computerImage.src = "../images/x.png";
var board = new Array();
//var BOARD_SIZE = 9;
var UNOCCUPIED = ' ';
var HUMAN_PLAYER = 'O';
var COMPUTER_PLAYER = 'X';
var active_turn = "HUMAN";
var choice;
var searchTimes = new Array();
var showAverageTime = true;

function NewGame() {
    for (i = 0; i < BOARD_SIZE; i++)
    {
        board[i] = UNOCCUPIED;
    }
    DeleteTimes();
    showAverageTime = true;
    var alert = document.getElementById("turnInfo");
    active_turn = "HUMAN";
    alert.innerHTML = "Your turn!";
}

function MakeMove(pos) {
    if (!GameOver(board) && board[pos] === UNOCCUPIED)
    {
        board[pos] = HUMAN_PLAYER;
        var idPos = "cell_" + pos;
        document.getElementById(idPos).innerHTML="<img src='../images/o.png' />";
        if (!GameOver(board))
        {
            var alert = document.getElementById("turnInfo");
            active_turn = "COMPUTER";
            alert.innerHTML = "Computer's turn.";
            MakeComputerMove();
        }
    }
}

function MakeComputerMove()
{
    var start, end, time;
    start = new Date().getTime() / 1000;
    alphaBetaMinimax(board, 0, -Infinity, +Infinity);
    end = new Date().getTime() / 1000;
    time = end - start;
    ShowTimes(time);
    var move = choice;
    board[move] = COMPUTER_PLAYER;
    var idPos = "cell_" + move;
    document.getElementById(idPos).innerHTML="<img src='../images/x.png' />";
    choice = [];
    active_turn = "HUMAN";
    if (!GameOver(board))
    {
        var alert = document.getElementById("turnInfo");
        alert.innerHTML = "Your turn!";     
    }
}

function GameScore(game, depth) {
    var score = CheckForWinner(game);
    if (score === 1)
        return 0;
    else if (score === 2)
        return depth-10;
    else if (score === 3)
        return 10-depth;
}

function alphaBetaMinimax(node, depth, alpha, beta) {
    if (CheckForWinner(node) === 1 || CheckForWinner(node) === 2 
            || CheckForWinner(node) === 3)
        return GameScore(node, depth);
    
    depth+=1;
    var availableMoves = GetAvailableMoves(node);
    var move, result, possible_game;
    if (active_turn === "COMPUTER") {
        for (var i = 0; i < availableMoves.length; i++) {
            move = availableMoves[i];
            possible_game = GetNewState(move, node);
            result = alphaBetaMinimax(possible_game, depth, alpha, beta);
            node = UndoMove(node, move);
            if (result > alpha) {
                alpha = result;
                if (depth == 1)
                    choice = move;
            } else if (alpha >= beta) {
                return alpha;
            }
        }
        return alpha;
    } else {
        for (var i = 0; i < availableMoves.length; i++) {
            move = availableMoves[i];
            possible_game = GetNewState(move, node);
            result = alphaBetaMinimax(possible_game, depth, alpha, beta);
            node = UndoMove(node, move);
            if (result < beta) {
                beta = result;
                if (depth == 1)
                    choice = move;
            } else if (beta <= alpha) {
                return beta;
            }
        }  
        return beta;
    }
}

function UndoMove(game, move) {
    game[move] = UNOCCUPIED;
    ChangeTurn();
    return game;
}

function GetNewState(move, game) {
    var piece = ChangeTurn();
    game[move] = piece;
    return game;
}

function ChangeTurn() {
    var piece;
    if (active_turn === "COMPUTER") {
        piece = 'X';
        active_turn = "HUMAN";
    } else {
        piece = 'O';
        active_turn = "COMPUTER";
    }
    return piece;
}

function GetAvailableMoves(game) {
    var possibleMoves = new Array();
    for (var i = 0; i < BOARD_SIZE; i++)
    {
        if (game[i] === UNOCCUPIED)
            possibleMoves.push(i);
    }
    return possibleMoves;
}

// Check for a winner.  Return
//   0 if no winner or tie yet
//   1 if it's a tie
//   2 if HUMAN_PLAYER won
//   3 if COMPUTER_PLAYER won
function CheckForWinner(game) {
    // Check for horizontal wins
    for (i = 0; i <= BOARD_LENGTH * 2;) {
        var boardWidth = BOARD_LENGTH - 1;
        var pointsForHuman = 0;
        var pointsForComputer = 0;
        while(boardWidth >= 0) {
            boardWidth--;
            if(game[i] === HUMAN_PLAYER) {
                pointsForHuman++;
            } else if(game[i] === COMPUTER_PLAYER) {
                pointsForComputer++;
            }
            i++;
        }

        if(pointsForHuman == BOARD_LENGTH) {
            return 2;
        } else if(pointsForComputer == BOARD_LENGTH) {
            return 3;
        }
    }

    // Check for vertical wins
    for (i = 0; i <= BOARD_LENGTH - 1; i++) {
        var boardLength = 0;
        var pointsForHuman = 0;
        var pointsForComputer = 0;
        while(boardLength < BOARD_LENGTH) {
            var index = i + (BOARD_LENGTH * boardLength)
            if(game[index] == HUMAN_PLAYER) {
                pointsForHuman++;
            } else if(game[index] === COMPUTER_PLAYER) {
                pointsForComputer++;
            }
            boardLength++;
        }

        if(pointsForHuman == BOARD_LENGTH) {
            return 2;
        } else if(pointsForComputer == BOARD_LENGTH) {
            return 3;
        }
    }

    // Check for diagonal wins
    var pointsForHuman = 0;
    var pointsForComputer = 0;
    for(i = 0; i < BOARD_LENGTH; i++) {
        var index = i + (BOARD_LENGTH * i);
        if(game[index] == HUMAN_PLAYER) {
            pointsForHuman++;
        } else if(game[index] === COMPUTER_PLAYER) {
            pointsForComputer++;
        }

    }
    if(pointsForHuman == BOARD_LENGTH) {
        return 2;
    } else if(pointsForComputer == BOARD_LENGTH) {
        return 3;
    }

    // Check for tie
    for (i = 0; i < BOARD_SIZE; i++) {
        if (game[i] !== HUMAN_PLAYER && game[i] !== COMPUTER_PLAYER)
            return 0;
    }   
    return 1;
}

function GameOver(game)
{
    if (CheckForWinner(game) === 0)
    {
        return false;
    }
    else if (CheckForWinner(game) === 1)
    {
        var alert = document.getElementById("turnInfo");
        alert.innerHTML = "It is a tie.";
    }
    else if (CheckForWinner(game) === 2)
    {
        var alert = document.getElementById("turnInfo");
        alert.innerHTML = "You have won! Congratulations!";
    }
    else
    {
        var alert = document.getElementById("turnInfo");
        alert.innerHTML = "The computer has won.";
    }
    ShowAverageTime();
    return true;
}

function ShowTimes(time) {
    searchTimes.push(time);
    document.getElementById("searchTime").innerHTML = 
            document.getElementById("searchTime").innerHTML + time + " seconds. <br />";
}

function DeleteTimes() {
    searchTimes = [];
    document.getElementById("searchTime").innerHTML = "";
}

function ShowAverageTime() {
    if (showAverageTime)
    {
        var sum = 0;
        var i = 0;
        for (i; i < searchTimes.length; i++)
            sum += searchTimes[i];
        
        document.getElementById("searchTime").innerHTML =
                document.getElementById("searchTime").innerHTML + "<br />Average search was <strong>" + sum / i + "</strong> seconds. <br />";
        showAverageTime = false;
    }
}