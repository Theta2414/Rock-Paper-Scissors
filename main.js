const startBtn = document.querySelector(".start-game");
const confirmBtn = document.querySelector(".confirm-selection");
const restartBtn = document.querySelector(".restart");
const continueBtn = document.querySelector(".continue");
const pointField = document.querySelector(".rectangle-container");
const currentRoundU = document.querySelector(".notification-update");
const instructionU = document.querySelector(".instruction-update");
const humanChoiceU = document.querySelector(".human-choice-update");
const computerChoiceU = document.querySelector(".computer-choice-update");
const resultU = document.querySelector(".result-update");
const selections = document.querySelectorAll(".radio");
let roundCount = 0;
let humanScore = 0;
let computerScore = 0;
let currentRectangle;
let roundNumber = null;
let point;
//Just in case
// const  = document.querySelector("");
// const  = document.querySelector("");
// const  = document.querySelector("");
// const  = document.querySelector("");
// const  = document.querySelector("");
// const  = document.querySelector("");
// const  = document.querySelector("");

selections.forEach(item => item.addEventListener("click", (event) => {
    const humanChoice = document.querySelector('input[name="selection-radio"]:checked')?.value;
    humanChoiceU.textContent = humanChoice;
    instructionU.textContent = "Confirm your choice";
    confirmBtn.disabled = false;
}));

// Get a random choice: rock, paper or scissors for computer
function getComputerChoice() {
    let randomNumber = Math.random();
    return (randomNumber < 1/3) ? "rock" : (randomNumber < 2/3) ? "paper" : "scissors"; 
};

//Return the result (win, draw, lose) of human's and computer's choice
function checkResult(humanChoice, computerChoice) {
    let result;
    if (humanChoice === "rock") {
        switch (computerChoice) {
            case "rock":
                result = "Draw";
                break;
            case "paper":
                result = "Computer wins";
                break;
            case "scissors":
                result = "Human wins";
                break;
        }
    } else if (humanChoice === "paper") {
        switch (computerChoice) {
            case "rock":
                result = "Human wins";
                break;
            case "paper":
                result = "Draw";
                break;
            case "scissors":
                result = "Computer wins";
                break;
        }
    } else {
        switch (computerChoice) {
            case "rock":
                result = "Computer wins";
                break;
            case "paper":
                result = "Human wins";
                break;
            case "scissors":
                result = "Draw";
                break;
        }
    }
    return result;
};

// Start a new round and update UI to highlight the current round
function startNextRound () {
    if (roundCount === 0) {      
        //the first ground
        roundCount++;
        currentRoundU.textContent =  roundCount;
        instructionU.textContent = "Waiting for player's choice"; 
        currentRectangle = point[roundCount - 1];
        currentRectangle.style.border = "5px solid black";
    } else if (0 < roundCount && roundCount < roundNumber) {
        //from second round
        currentRectangle.style.border = "2px solid black"; //Delete previous round cache
        roundCount++;
        currentRoundU.textContent =  roundCount;
        instructionU.textContent = "Waiting for player's choice";
        currentRectangle = point[roundCount - 1];
        currentRectangle.style.border = "5px solid black"; //Set new style for new round
    } else {
        //the final round
        currentRectangle.style.border = "2px solid black";        
    }
    startBtn.disabled = true;
    restartBtn.disabled = false;
    continueBtn.disabled = true;
    selections.forEach(item => {
        item.disabled = false;
        item.checked = false;
    });
};

//Update labels base on human's choice and computer's choice
function confirm () {
    const humanChoice = document.querySelector('input[name="selection-radio"]:checked')?.value;
    const computerChoice = getComputerChoice()
    computerChoiceU.textContent = computerChoice;
    const result = checkResult(humanChoice, computerChoice);
    confirmBtn.disabled = true;
    selections.forEach(item => item.disabled = true);
    switch (result) {
        case "Computer wins":
            if (roundCount !== roundNumber) resultU.textContent = "Computer wins";
            currentRectangle.style.backgroundColor = "red";
            computerScore++;
            break;
        case "Human wins":
            if (roundCount !== roundNumber) resultU.textContent = "Human wins";
            currentRectangle.style.backgroundColor = "green";
            humanScore++
            break;
        case "Draw":
            if (roundCount !== roundNumber) resultU.textContent = "Draw";
            currentRectangle.style.backgroundColor = "grey";
            break;
    };
    if (roundCount === roundNumber) {
        continueBtn.disabled = true;
        if (humanScore > computerScore) {
            instructionU.textContent = "Click restart to play the game again";
            resultU.textContent = "The match is over. Overall result: Human wins";
        } else if (humanScore < computerScore) {
            instructionU.textContent = "Click restart to play the game again";
            resultU.textContent = "The match is over. Overall result: Computer wins";
        } else {
            instructionU.textContent = "Click restart to play the game again";
            resultU.textContent = "The match is over. Overall result: Draw";
        };
    } else {
        continueBtn.disabled = false;
    };
};

function restart () {
    humanScore = 0;
    computerScore = 0;
    pointField.textContent = "";
    currentRoundU.textContent = "";
    instructionU.textContent = "Click start game to play";
    humanChoiceU.textContent = "";
    computerChoiceU.textContent = "";
    resultU.textContent = "";
    roundCount = 0;
    roundNumber = null;
    currentRectangle = null;
    startBtn.disabled = false;
    confirmBtn.disabled = true;
    continueBtn.disabled = true;
    restartBtn.disabled = true;
    if (point.length !== 0) {
        point.forEach(item => {
            item.style.border = "2px solid black";
            item.style.backgroundColor = "transparent";
        });
    }
    selections.forEach(item => {
        item.checked = false;
    })
}

startBtn.addEventListener("click", () => {
    pointField.textContent = "";
    while (!(1 <= roundNumber && roundNumber <= 15)) {
        roundNumber = prompt("How many round do you want to play? (1 - 15) enter Stop to break");
        if (roundNumber === "Stop") {
            restart ();
            break;
        } else {
            roundNumber = +roundNumber;
            for (let i = 1; i <= roundNumber; i++) {
                const createRectangle = document.createElement("div");
                createRectangle.classList.add("rectangle");
                pointField.appendChild(createRectangle);
            };
            point = document.querySelectorAll(".rectangle");
            startNextRound ();
        };
    };
});

confirmBtn.addEventListener("click", confirm);

continueBtn.addEventListener("click", startNextRound);

restartBtn.addEventListener("click", restart);