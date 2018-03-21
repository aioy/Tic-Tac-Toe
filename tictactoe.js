'use strict'

function game () {
  this.player = null;
  this.computer = null;
  this.playerMoves = [];
  this.computerMoves = [];
  this.squares = document.querySelector(this.id);
  this.winningCombos = [
    [1, 2, 3],[4, 5, 6],[7, 8, 9],
    [1, 4, 7],[2, 5, 8],[3, 6, 9],
    [1, 5, 9],[3, 5, 7]
  ];
}

game.prototype.chooseSymbol = (symbol) => {
    this.player = symbol;
    //choose computers symbol
    this.computer = symbol === 'x' ? 'o' : 'x';

    document.querySelector('.shade').style.display = 'none';
}

const ticTacToe = new game();

document.querySelector('#playx').addEventListener('click', () => {
    ticTacToe.chooseSymbol('x')
});

document.querySelector('#playo').addEventListener('click', () => {
    ticTacToe.chooseSymbol('o')
});

