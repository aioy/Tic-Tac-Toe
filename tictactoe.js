'use strict'

function game () {
  this.player = null;
  this.computer = null;
  this.playerMoves = [];
  this.computerMoves = [];
  this.squares = document.querySelectorAll('.play');
  this.spotsLeft = [1,2,3,4,5,6,7,8,9];
  this.winningCombos = [
    [1, 2, 3],[4, 5, 6],[7, 8, 9],
    [1, 4, 7],[2, 5, 8],[3, 6, 9],
    [1, 5, 9],[3, 5, 7]
  ];

  for(let i = 0; i < this.squares.length; i++){
    this.squares[i].addEventListener('click', (function() {
      this.playerMove(i);
    }).bind(this));
  }
}

game.prototype.chooseSymbol = function (symbol) {
    this.player = symbol;
    //choose computers symbol
    this.computer = symbol === 'x' ? 'o' : 'x';

    document.querySelector('.shade').style.display = 'none';
    
}

game.prototype.playerMove = function (i) {
    if(this.squares[i].classList.contains('play')){
        this.squares[i].textContent = this.player;
        console.log(this.squares[i].id);
        //remove to prevent overwriting text content on computer move
        this.squares[i].classList.remove('play');
        console.log(this.squares);
        console.log(typeof(Number(this.squares[i].id)));
        this.playerMoves.push(Number(this.squares[i].id));
        console.log(this.playerMoves);
    }
}

game.prototype.computerMove = function () {
   
}

const ticTacToe = new game();

document.querySelector('#playx').addEventListener('click', () => {
    ticTacToe.chooseSymbol('x')
});

document.querySelector('#playo').addEventListener('click', () => {
    ticTacToe.chooseSymbol('o')
});

 	