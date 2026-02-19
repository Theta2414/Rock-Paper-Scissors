const startBtn = document.querySelector(".start-game");
let isStartable = true;
const confirmBtn = document.querySelector(".confirm-selection");
let isConfirmable = false;
const restartBtn = document.querySelector(".restart");
let isRestart = false;
const continueBtn = document.querySelector(".continue");
let isContinued = false;
const selections = document.querySelectorAll(".radio");
let isRadioOn = false;
const label = document.querySelectorAll("label");
const pointField = document.querySelector(".rectangle-container");
const currentRoundU = document.querySelector(".notification-update");
const instructionU = document.querySelector(".instruction-update");
const humanChoiceU = document.querySelector(".human-choice-update");
const computerChoiceU = document.querySelector(".computer-choice-update");
const resultU = document.querySelector(".result-update");
const cardContainer = document.querySelector(".card-container");
const announcement = document.createElement("p");
const delHistoryBtn = document.querySelector(".del-history");
let isDeletable = false;
announcement.textContent = "You have not played any matches.";
let roundCount = 0;
let humanScore = 0;
let computerScore = 0;
let currentRectangle = null;
let isFinished = false;
let roundNumber = null;
let point = null;
let humanChoiceLabel = null;
let computerChoiceLabel = null;
let match = 0;
//Just in case
// const  = document.querySelector("");
// const  = document.querySelector("");
// const  = document.querySelector("");
// const  = document.querySelector("");
// const  = document.querySelector("");
// const  = document.querySelector("");
// const  = document.querySelector("");

selections.forEach(item => item.addEventListener("click", (event) => {
    if (isRadioOn) {
        const humanChoice = document.querySelector('input[name="selection-radio"]:checked')?.value;
        humanChoiceU.textContent = humanChoice.at(0).toUpperCase() + humanChoice.slice(1);
        instructionU.textContent = "Confirm your choice";
        confirmBtn.disabled = false;
        isConfirmable = true;
        humanChoiceLabel = document.querySelector(`label[for="${humanChoice}"]`);
        label.forEach(item => {
            item.removeAttribute("style"); //Remove current style     
        });
        humanChoiceLabel.style.border = "3px solid white"; //Add new style
        humanChoiceLabel.style.backgroundColor = "#1a2f43";
    } else {
        selections.forEach(item => item.disabled = true);
        isRadioOn = false;
    }
}));

// Get a random choice: rock, paper or scissors for computer
function getComputerChoice() {
    let randomNumber = Math.random();
    return (randomNumber < 1/3) ? "rock" : (randomNumber < 2/3) ? "paper" : "scissors"; 
}

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
}

// Start a new round and update UI to highlight the current round
function startNextRound() {
    if (roundCount === 0) {      
        //the first ground
        roundCount++;
        currentRoundU.textContent =  roundCount;
        instructionU.textContent = "Waiting for player's choice"; 
        currentRectangle = point[roundCount - 1];
        currentRectangle.style.border = "5px solid #111820ff";
    } else {
        //from second round
        currentRectangle.style.border = "2px solid #111820ff"; //Delete previous round cache
        roundCount++;
        currentRoundU.textContent =  roundCount;
        instructionU.textContent = "Waiting for player's choice";
        currentRectangle = point[roundCount - 1];
        currentRectangle.style.border = "5px solid #111820ff"; //Highlight current round
        humanChoiceU.textContent = "";
        computerChoiceU.textContent = "";
        resultU.textContent = "";
        humanChoiceLabel = null;
        computerChoiceLabel = null;
    }
    startBtn.disabled = true;
    isStartable = false;
    restartBtn.disabled = false;
    isRestart = true;
    continueBtn.disabled = true;
    isContinued = false;
    selections.forEach(item => {
        item.disabled = false;
        item.checked = false;
    });
    isRadioOn = true;;
    label.forEach(item => item.removeAttribute("style"));
}

//Update labels base on human's choice and computer's choice
function confirm() {
    if (roundCount === roundNumber) {
        isFinished = true;
    }
    const humanChoice = document.querySelector('input[name="selection-radio"]:checked')?.value;
    const computerChoice = getComputerChoice ();
    computerChoiceU.textContent = computerChoice.at(0).toUpperCase() + computerChoice.slice(1);
    const result = checkResult(humanChoice, computerChoice);
    confirmBtn.disabled = true;
    isConfirmable = false;
    selections.forEach(item => item.disabled = true);
    isRadioOn = false;
    instructionU.textContent = "Click next round";
    computerChoiceLabel = document.querySelector(`label[for="${computerChoice}"]`);
    if (humanChoiceLabel === computerChoiceLabel) {
        computerChoiceLabel.style.border = "3px solid #C65353";
    } else {
        computerChoiceLabel.style.border = "3px solid #901414";
    }
    switch (result) {
        case "Computer wins":
            if (roundCount !== roundNumber) resultU.textContent = "Computer wins";
            currentRectangle.style.backgroundColor = "#ff595e";
            computerScore++;
            break;
        case "Human wins":
            if (roundCount !== roundNumber) resultU.textContent = "Human wins";
            currentRectangle.style.backgroundColor = "#80dd6d";
            humanScore++;
            break;
        case "Draw":
            if (roundCount !== roundNumber) resultU.textContent = "Draw";
            currentRectangle.style.backgroundColor = "#808080";
            break;
    }
    if (roundCount === roundNumber) {
        continueBtn.disabled = true;
        isContinued = false;
        point.forEach(item => item.style.border = "5px solid #111820ff");
        if (humanScore > computerScore) {
            instructionU.textContent = "Click restart to play the game again";
            resultU.textContent = "The match is over. Overall result: Human wins";
        } else if (humanScore < computerScore) {
            instructionU.textContent = "Click restart to play the game again";
            resultU.textContent = "The match is over. Overall result: Computer wins";
        } else {
            instructionU.textContent = "Click restart to play the game again";
            resultU.textContent = "The match is over. Overall result: Draw";
        }
    } else {
        continueBtn.disabled = false;
        isContinued = true;
    }
}

function restart() {
    if (isRestart) {
        pointField.textContent = "";
        currentRoundU.textContent = "";
        instructionU.textContent = "Click start game to play";
        humanChoiceU.textContent = "";
        computerChoiceU.textContent = "";
        resultU.textContent = "";
        currentRectangle = null;
        humanChoiceLabel = null;
        computerChoiceLabel = null;
        point = null;
        startBtn.disabled = false;
        isStartable = true;
        confirmBtn.disabled = true;
        isConfirmable = false;
        continueBtn.disabled = true;
        isContinued = false;
        restartBtn.disabled = true;
        isRestart = false;
        label.forEach(item => item.removeAttribute("style"));
        selections.forEach(item => {
            item.checked = false;
            item.disabled = true;
        });
        isRadioOn = false;
        //Final stage after clicked "confirmBtn"
        if (isFinished) {
            match++;
            const card = document.createElement("li");
            const headerContainer = document.createElement("div");
            const header = document.createElement("h3");
            const delBtn = document.createElement("button");
            const totalRound = document.createElement("div");
            const human = document.createElement("p");
            const computer = document.createElement("p");
            const overall = document.createElement("p");
            header.textContent = `Match ${match}`;
            totalRound.textContent = `Total round(s): ${roundNumber}`;
            human.textContent = `Human score: ${humanScore}`;
            computer.textContent = `Computer score: ${computerScore}`;
            delBtn.textContent = "X";
            if (humanScore > computerScore) overall.textContent = "Result: Human wins";
            if (humanScore < computerScore) overall.textContent = "Result: Computer wins";
            if (humanScore === computerScore) overall.textContent = "Result: Draw";
            card.classList.add("card");
            headerContainer.classList.add("card-header-container");
            delBtn.classList.add("delBtn");
            headerContainer.appendChild(header);
            headerContainer.appendChild(delBtn);
            card.appendChild(headerContainer);
            card.appendChild(totalRound);
            card.appendChild(human);
            card.appendChild(computer);
            card.appendChild(overall);
            card.index = (match === 1) ? 0 : cardContainer.children.length;
            cardContainer.appendChild(card);
            delBtn.addEventListener("click", () => {
                for (let idx = card.index + 1; idx < cardContainer.children.length; idx++) {
                    cardContainer.children[idx].firstElementChild.firstElementChild.textContent = `Match ${idx}`;
                    --cardContainer.children[idx].index;
                }
                cardContainer.removeChild(card);
                match--;
                noRecordAnnouncement();
            });
            toggleStateOfDelHistoryBtn();
            noRecordAnnouncement();
        }
        roundCount = 0;
        roundNumber = null;
        humanScore = 0;
        computerScore = 0;
        isFinished = false;
    }
}

//Announce if cardContainer does not have anything
function noRecordAnnouncement() {
    if (cardContainer.children.length === 1 && announcement.isConnected || cardContainer.children.length === 0) {
        cardContainer.appendChild(announcement);
    } else {
        try {
            cardContainer.removeChild(announcement);
        } catch {
        
        }
    }
}

//Disable the delHistoryBtn if cardContainer does contain any data
function toggleStateOfDelHistoryBtn() {
    if (cardContainer.children.length === 0 || cardContainer.children.length === 1 && announcement.isConnected) {
        delHistoryBtn.disabled = true;
        isDeletable = false;
    } else {
        delHistoryBtn.disabled = false;
        isDeletable = true;
    }
}

startBtn.addEventListener("click", () => {
    if (isStartable) {
        pointField.textContent = "";
        while (!(1 <= roundNumber && roundNumber <= 15)) {
            roundNumber = prompt("How many rounds do you want to play? (1 - 15) enter 'stop' to cancel");
            if (roundNumber === "stop") {
                break;
            }
        }
        if (1 <= roundNumber && roundNumber <= 15) {
            roundNumber = +roundNumber;
            for (let i = 1; i <= roundNumber; i++) {
                const createdRectangle = document.createElement("div");
                createdRectangle.classList.add("rectangle");
                pointField.appendChild(createdRectangle);
            };
            point = document.querySelectorAll(".rectangle");
            startNextRound();
        } else {
            instructionU.textContent = "Click start game to play";
        }
    } else {
        startBtn.disabled = true;
    }
})

confirmBtn.addEventListener("click", () => {
    if (isConfirmable) {
        confirm();
    } else {
        confirmBtn.disabled = true;
    }
});

continueBtn.addEventListener("click", () => {
    if (isContinued) {
        startNextRound();
    } else {
        continueBtn.disabled = true;
    }
});

restartBtn.addEventListener("click", () => {
    if (isRestart) {
        restart();
    } else {
        restartBtn.disabled = true;
    }
});

delHistoryBtn.addEventListener("click", () => {
    if (isDeletable) { 
        cardContainer.textContent = "";
        noRecordAnnouncement();
        toggleStateOfDelHistoryBtn();
        match = 0;
    } else {
        delHistoryBtn.disabled = true;
    }
    historyCardList.splice(0, historyCardList.length);
});

noRecordAnnouncement();
toggleStateOfDelHistoryBtn();