function Player(mark, turn) {
  this.mark = mark,
  this.turn = turn
}

function Space(x, y) {
  this.xCoord = x,
  this.yCoord = y,
  this.owningPlayer
}

Space.prototype.markSpace = function(player){
  this.owningPlayer = player;
}

function Board() {
  this.row0 = [new Space(0,0),new Space(1,0),new Space(2,0)],
  this.row1 =[new Space(0,1),new Space(1,1),new Space(2,1)],
  this.row2 =[new Space(0,2),new Space(1,2),new Space(2,2)]
}


function Game(player0, player1, board) {
  this.player0 = player0,
  this.player1 = player1,
  this.board = board,
  this.turn = 0
}

Game.prototype.round = function(x,y){
  if (this.turn % 2 == 1){
    var player = this.player0;
    // Player 1s turn!
  } else if (this.turn % 2 == 0){
    var player = this.player1;
    // Player 2s turn!
  }
  if (y == 0) {
    this.board.row0[x].markSpace(player);
  } else if (y == 1) {
    this.board.row1[x].markSpace(player);
  } else if (y == 2) {
    this.board.row2[x].markSpace(player);
  }


  this.turn++;
}

var disboard = new Board();
var playerA = new Player("X",0);
var playerB = new Player("O",1);
var theGame = new Game(playerA, playerB, disboard);
