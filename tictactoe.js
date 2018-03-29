'use strict'

function game () {
  this.player = null;
  this.computer = null;
  this.turns = 0;
  this.playerChoices = [];
  this.computerChoices = [];
  this.squares = document.querySelectorAll('.play');
  this.spotsLeft = [0,1,2,3,4,5,6,7,8];
  this.winningCombos = [
    [0, 1, 2],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],
    [0, 4, 8],[2, 4, 6], [3,4,5]
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

        this.turns++; console.log(this.turns);

        //remove to prevent overwriting text content on computer move and make player move array
        this.squares[i].classList.remove('play');
        
        //remove spot player chose to prevent computer from moving here
        let index = this.spotsLeft.indexOf(i);
        
        this.spotsLeft.splice(index, 1);
        
        //push to array to compare for win
        this.playerChoices.push(i); 

        this.checkWin(this.playerChoices, 'Player');
        
       if(this.checkWin(this.playerChoices, 'Player') === false){
           this.computerMove();
       }
       
    }
}

//chooses spot randomly
game.prototype.computerMove = function () {
    let random = this.spotsLeft[Math.floor(Math.random() * this.spotsLeft.length)]

    this.squares[random].textContent = this.computer;
    
    //remove to prevent choosing again
    let index = this.spotsLeft.indexOf(random);
    
    this.spotsLeft.splice(index, 1);
    
    this.squares[random].classList.remove('play');

    this.computerChoices.push(random);

    this.checkWin(this.computerChoices, 'Computer');

}

//compare player or computer arrays to check for win or tie
game.prototype.checkWin = function (player, name) {
    console.log(name);

    let win = this.winningCombos.some((ar) => ar.every((c) => player.includes(c)));

    if( win === true){
        document.querySelector('.result').style.visibility = 'visible';
        document.querySelector('#tie').textContent =  `${name} wins!`
    } else if (this.turns === 5){
        document.querySelector('.result').style.visibility = 'visible';
        document.querySelector('#tie').textContent =   `Tie!`
    }

    return Boolean(win);

}

game.prototype.restart = function () {

}


const ticTacToe = new game();

document.querySelector('#playx').addEventListener('click', () => {
    ticTacToe.chooseSymbol('x')
});

document.querySelector('#playo').addEventListener('click', () => {
    ticTacToe.chooseSymbol('o')
});