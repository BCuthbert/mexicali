// script.js

const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");
const message = document.getElementById("message");
const toggleButton = document.getElementById("toggleButton");
const rollButton = document.getElementById("rollButton");

let diceHidden = false;

// Function to roll the dice
function rollDice() {
    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;

    updateDiceImages(roll1, roll2);
    updateMessage(roll1, roll2);
}

// Update dice images based on rolls
function updateDiceImages(roll1, roll2) {
    // Ensure the greater dice is on the left
    if (roll1 >= roll2) {
        dice1.src = `${roll1}.svg`;
        dice2.src = `${roll2}.svg`;
    } else {
        dice1.src = `${roll2}.svg`;
        dice2.src = `${roll1}.svg`;
    }
}

// Update the message text based on dice rolls
function updateMessage(roll1, roll2) {
    if (roll1 == 2 && roll2 == 1) {
        message.textContent = "Mexicali! Fill Boat, Give to Any Person. Pass Phone";
    } else if (roll1 == roll2) {
        if (roll1 == 1) {
            message.textContent = "Snake Eyes: Fill boat, Pass";
        } else {
            message.textContent = "Doubles...";
        }
    } else if (roll1 == 3 && roll2 == 2) {
        message.textContent = "Reroll, order reverses.";
    } else {
        message.textContent = "";
    }
}

// Handle screen click to roll dice
document.body.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON" && !diceHidden) {
        rollDice();
    }
});

// Toggle dice visibility with hide/bullshit buttons
toggleButton.addEventListener("click", () => {
    diceHidden = !diceHidden;
    if (diceHidden) {
        dice1.style.display = "none";
        dice2.style.display = "none";
        message.style.display = "none";
        toggleButton.textContent = "Bullshit";
        rollButton.style.display = "inline-block";
    } else {
        dice1.style.display = "inline-block";
        dice2.style.display = "inline-block";
        message.style.display = "block";
        toggleButton.textContent = "Hide";
        rollButton.style.display = "none";
    }
});

// Roll dice when the Roll button is clicked (while hidden)
rollButton.addEventListener("click", () => {
    rollDice();
    diceHidden = false;
    dice1.style.display = "inline-block";
    dice2.style.display = "inline-block";
    message.style.display = "block";
    toggleButton.textContent = "Hide";
    rollButton.style.display = "none";
});
