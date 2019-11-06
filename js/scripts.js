function Player(mark, turn) {
  this.mark = mark,
  this.turn = turn
}

function Space() {
  this.owningPlayer = new Player('',0)
}

Space.prototype.markSpace = function(player){
  this.owningPlayer = player;
}

function Board() {
  this.grid = [[],[],[]]
}

Board.prototype.populateBoard = function(){
  console.log("Populating board! Please wait!");
  for (var i=0; i<3; i++){
    for (var y=0; y<3; y++){
      this.grid[y].push(new Space(i,y));
    }
  }
}

function Game(player0, player1, board) {
  this.player0 = player0,
  this.player1 = player1,
  this.board = board,
  this.evenTurn = true;
  this.turn = 0
}

Game.prototype.round = function(x,y) {
  if (this.evenTurn){
    player = this.player0;
    this.evenTurn = false;
    //player 0s turn!
  } else {
    player = this.player1;
    this.evenTurn= true;
    //Player 1s turn!
  }
    this.board.grid[x][y].markSpace(player);
  console.log("turn "+(this.turn+1)+" is complete. "+player.mark+" played "+x+","+y+"!");
  this.winCheck();


  this.turn++;
}

Game.prototype.winCheck = function() {
  for(var x=0; x < 3; x++) {
    for(var y=0; y < 3; y++) {
      if ((this.board.grid[0][y].owningPlayer) == (this.board.grid[1][y].owningPlayer) && (this.board.grid[1][y].owningPlayer) == (this.board.grid[2][y].owningPlayer)) {
        console.log("It won, all Y are equal. "+this.board.grid[x][0].owningPlayer.mark+" is the winner!");
        return this.board.grid[x][0].owningPlayer;
      }
    }
    if (((this.board.grid[x][0].owningPlayer) == (this.board.grid[x][1].owningPlayer)) && ((this.board.grid[x][1].owningPlayer) == (this.board.grid[x][2].owningPlayer))) {
      console.log("It won, all X are equal. "+this.board.grid[x][0].owningPlayer.mark+" is the winner!");
      return this.board.grid[x][0].owningPlayer;
    }
  }
  if (((this.board.grid[0][0].owningPlayer) == (this.board.grid[1][1].owningPlayer)) && ((this.board.grid[1][1].owningPlayer) == ((this.board.grid[2][2].owningPlayer)))) {
    console.log("Diagonal win, victory is mine! Or yours. But I'm assuming I won this round. +1 to me.");
    return this.board.grid[1][1].owningPlayer;
  } else if(((this.board.grid[0][2].owningPlayer) == (this.board.grid[1][1].owningPlayer)) && ((this.board.grid[1][1].owningPlayer) == ((this.board.grid[2][0].owningPlayer)))){
    console.log("ITS A DIAGINAL I CAN'T SPELL, GET OFF MY BACK FUTURE ME!");
    return this.board.grid[1][1].owningPlayer;
  }
  return false;
}
Game.prototype.reset = function() {
  this.board = new Board();
  this.board.populateBoard();
  this.turn = 0;
}

var disboard = new Board();
var playerA = new Player("X",0);
var playerB = new Player("O",1);
var theGame = new Game(playerA, playerB, disboard);
theGame.board.populateBoard();

// Front End Logic Goes Here------

$(document).ready(function() {
  $(".click").click(function(event) {
    var coord = $(this).children().attr('id');
    var x = coord[0];
    var y = coord[1];
    theGame.round(x,y);
    $(this).children().text(theGame.board.grid[x][y].owningPlayer.mark);
  })
});
