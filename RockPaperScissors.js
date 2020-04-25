function computerPlay(choices){
    /* Randomly returns either ‘Rock’, ‘Paper’ or ‘Scissors’ as 
    the computer selection. */
    let compPlay = choices[Math.floor(Math.random() * choices.length)];
    computerImg.innerHTML = `<img src="${compPlay}.png">`;
    return compPlay;
}

function check() {
    if (count == rounds || playerScore > rounds/2 || computerScore > rounds/2) {
        mainbody.removeChild(buttonsdiv);

        const heading3 = document.createElement('h3');
        heading3.style.color = 'blue';
        playerScore==computerScore? heading3.textContent = 'Draw!'
            : playerScore>computerScore? heading3.textContent = 'You win!'
            : heading3.textContent = 'You lost :( Better luck next time!';  
        mainbody.insertBefore(heading3, para);
        
        const playAgain = document.createElement('button');
        playAgain.textContent = 'Play Again';
        mainbody.insertBefore(playAgain, para);
        playAgain.addEventListener('click', (e) => location.reload());
    }
}

function playRound(playerSelection, computerSelection) {
    //Determines winner from one round of game.
    ++count;
    if (playerSelection == 'rock') {
        (computerSelection == 'rock'? draw(playerSelection, computerSelection)
            : computerSelection == 'paper'? computerWins(playerSelection, computerSelection)
            : playerWins(playerSelection, computerSelection));
    }
    else if (playerSelection == 'paper') {
        (computerSelection == 'rock'? playerWins(playerSelection, computerSelection)
            : computerSelection == 'paper'? draw(playerSelection, computerSelection)
            : computerWins(playerSelection, computerSelection));
    }
    else {
        (computerSelection == 'rock'? computerWins(playerSelection, computerSelection)
            : computerSelection == 'paper'? playerWins(playerSelection, computerSelection)
            : draw(playerSelection, computerSelection));
    }
}

function draw(playerSelection, computerSelection) {
    //When the round is tied, display message.
    heading.textContent = `YOU ${playerScore} : COMPUTER ${computerScore}`;
    para.innerHTML =  `<strong>ROUND ${count}</strong> <br><br>
                        <strong>You played:</strong> ${playerSelection} <br>
                        <strong>Computer played:</strong> ${computerSelection} <br><br>
                        <strong>Draw!</strong>`;
    check();
}

function playerWins(playerSelection, computerSelection) {
    //When player wins the round, display message and playerScore + 1
    heading.textContent = `YOU ${++playerScore} : COMPUTER ${computerScore}`;
    para.innerHTML =  `<strong>ROUND ${count}</strong> <br><br>
                        <strong>You played:</strong> ${playerSelection} <br>
                        <strong>Computer played:</strong> ${computerSelection} <br><br>
                        ${capitalize(playerSelection)} beats ${capitalize(computerSelection)}. <strong>You win!</strong>`;    
    check();
}

function computerWins(playerSelection, computerSelection) {
    //When computer wins the round, display message and computerScore + 1
    heading.textContent = `YOU ${playerScore} : COMPUTER ${++computerScore}`;
    para.innerHTML =  `<strong>ROUND ${count}</strong> <br><br>
                        <strong>You played:</strong> ${playerSelection} <br>
                        <strong>Computer played:</strong> ${computerSelection} <br><br>
                        ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}. <strong>You lose!</strong>`;
    check();
}

function capitalize(input) {
    //Capitalize only first letter of word.
    return (input[0].toUpperCase() + input.slice(1).toLowerCase())
} 

const choices = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let computerScore = 0;
let count = 0;
let rounds = prompt("How many rounds do you want to play?",5);

const mainbody = document.querySelector('main');
const playerImg = document.querySelector('.left');
const computerImg = document.querySelector('.right');
const heading = document.querySelector('h2');
const para = document.querySelector('p');
const buttonsdiv = document.querySelector('div');
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        playRound(button.id, computerPlay(choices));
        playerImg.innerHTML = `<img src="${button.id}.png">`;
    });
}); 