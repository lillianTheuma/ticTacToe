function Player(mark, turn) {
  this.mark = mark,
  this.turn = turn
}

function Space(x, y) {
  this.xCoord = x,
  this.yCoord = y,
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




  this.turn++;
}

Game.prototype.winCheck = function() {
  for (var x=0; x < 3; x++){
    for (var y=0; y < 3; y++){
      if ((this.board.grid[0][y].owningPlayer.turn) == (this.board.grid[1][y].owningPlayer.turn) == (this.board.grid[2][y].owningPlayer.turn)) {
        console.log("It won, all Y are equal. "+this.board.grid[x][0].owningPlayer.mark+" is the winner!");
        return this.board.grid[x][0].owningPlayer;
      }
    }
    if ((this.board.grid[x][0].owningPlayer.turn) == (this.board.grid[x][1].owningPlayer.turn) == (this.board.grid[x][2].owningPlayer.turn)) {
      console.log("It won, all X are equal. "+this.board.grid[x][0].owningPlayer.mark+" is the winner!");
      return this.board.grid[x][0].owningPlayer;
    }
  }
}

var disboard = new Board();
var playerA = new Player("X",0);
var playerB = new Player("O",1);
var theGame = new Game(playerA, playerB, disboard);
theGame.board.populateBoard();
theGame.round(0,0);
theGame.round(0,1);
theGame.round(0,2);
