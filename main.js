function getComputerChoice() {
    let randomNumber = Math.random()
    return (randomNumber < (1/3)) ? "Rock" : (randomNumber < (2/3) && randomNumber >= (1/3)) ? "Paper" : "Scissors"; 
}

// let rock = paper = scissors = 0;
// for (i = 0; i < 100000000; i++) {
//     let computerSelection = getComputerChoice();
//     switch (computerSelection) {
//         case "Rock":
//             rock++;
//             break;
//         case "Paper":
//             paper++;
//             break;
//         case "Scissors":
//             scissors++;
//             break;
//     }
// }
// console.log(`Rock: ${rock} | Rate: ${rock*100 / (rock+paper+scissors)}%`);
// console.log(`Paper: ${paper} | Rate: ${paper*100 / (rock+paper+scissors)}%`);
// console.log(`Scissors: ${scissors} | Rate: ${scissors*100 / (rock+paper+scissors)}%`);

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

playGame();

if (humanScore === computerScore) {
    console.log("Nice try! Tie")
} else if (humanScore > computerScore) {
    console.log("Congratulations! Human wins!")
} else {
    console.log("Bad luck! Computer wins!")
}