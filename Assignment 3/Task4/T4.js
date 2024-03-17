$(document).ready(function() {
    const choices = ['rock', 'paper', 'scissors'];
    let playerScore = 0;
    let computerScore = 0;
    let round = 0;

    // Function to get a random computer choice
    function getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    // Function to update the score
    function updateScore(winner) {
        if (winner === 'player') {
            playerScore++;
        } else if (winner === 'computer') {
            computerScore++;
        }
        $('#player-score').text(playerScore);
        $('#computer-score').text(computerScore);
    }

    // Function to display the winner message
    function displayMessage(message) {
        $('#message').text(message);
    }

    // Function to display the computer's hand image
    function displayComputerHand(choice) {
        const handImage = `images/${choice}.png`;
        $('#computer-hand').attr('src', handImage);
        
        // Add animation (optional)
        $('#computer-hand').addClass('shake');
        setTimeout(function() {
            $('#computer-hand').removeClass('shake');
        }, 1000); // Animate for 1 second
    }

    // Function to handle player's choice
    function handlePlayerChoice(playerChoice) {
  // Validate user choice
  if (!choices.includes(playerChoice)) {
    displayMessage('Invalid choice. Please choose rock, paper, or scissors.');
    return; // Exit the function if choice is invalid
  }

  const computerChoice = getComputerChoice();
  displayComputerHand(computerChoice);

  // Determine the winner
  const winner = determineWinner(playerChoice, computerChoice);
  
  // Update score and display message based on winner
  switch (winner) {
    case 'player':
      updateScore('player');
      displayMessage('You win!');
      break;
    case 'computer':
      updateScore('computer');
      displayMessage('Computer wins!');
      break;
    case 'tie':
      displayMessage('It\'s a tie!');
      break;
  }
  
  // Reset buttons for next round (optional)
  // $('button').prop('disabled', false); // Uncomment to disable buttons after each round
}

// Function to determine the winner
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'tie';
  } else if (playerChoice === 'rock') {
    return computerChoice === 'scissors' ? 'player' : 'computer';
  } else if (playerChoice === 'paper') {
    return computerChoice === 'rock' ? 'player' : 'computer';
  } else { // playerChoice === 'scissors'
    return computerChoice === 'paper' ? 'player' : 'computer';
  }
}

// Button click event listeners
$('button').click(function() {
  const playerChoice = $(this).attr('id');
  handlePlayerChoice(playerChoice);
});
});

