function getComputerChoice() {
    let randomNumber = Math.random() * 100
    return (randomNumber < 34) ? "Rock" : (randomNumber < 67 && randomNumber >= 34) ? "Paper" : "Scissors"; 
}

function getHumanChoice() {
    humanChoice = prompt("What is you choice?\n\"Rock\"\n\"Paper\"\n\"Scissors\"");
    return humanChoice;
}

function playGround(humanChoice, computerChoice) {
    console.log(`Human's choice is ${humanChoice} | Computer's choice is ${computerChoice}`);
    if (humanChoice === "Rock") {
        switch (computerChoice) {
            case "Rock":
                break;
            case "Paper":
                computerScore++;
                break;
            case "Scissors":
                humanScore++;
                break;
        }
    } else if (humanChoice === "Paper") {
        switch (computerChoice) {
            case "Rock":
                humanScore++;
                break;
            case "Paper":
                break;
            case "Scissors":
                computerScore++;
                break;
        }
    } else {
        switch (computerChoice) {
            case "Rock":
                computerScore++;
                break;
            case "Paper":
                humanScore++;
                break;
            case "Scissors":
                break;
        }
    }
    console.log(`Human's score ${humanScore} | Computer's score ${computerScore}`);
};

function playGame() {
    console.log("-----Round 1-----");
    humanSelection = getHumanChoice();
    computerSelection = getComputerChoice();
    playGround(humanSelection, computerSelection);
    console.log("-----Round 2-----");
    humanSelection = getHumanChoice();
    computerSelection = getComputerChoice();
    playGround(humanSelection, computerSelection);
    console.log("-----Round 3-----");
    humanSelection = getHumanChoice();
    computerSelection = getComputerChoice();
    playGround(humanSelection, computerSelection);
    console.log("-----Round 4-----");
    humanSelection = getHumanChoice();
    computerSelection = getComputerChoice();
    playGround(humanSelection, computerSelection);
    console.log("-----Round 5-----");
    humanSelection = getHumanChoice();
    computerSelection = getComputerChoice();
    playGround(humanSelection, computerSelection);
};

let humanScore = 0;
let computerScore = 0;

let humanSelection
let computerSelection

playGame();

if (humanScore === computerScore) {
    console.log("Nice try! Tie")
} else if (humanScore > computerScore) {
    console.log("Congratulations! Human wins!")
} else {
    console.log("Bad luck! Computer wins!")
}