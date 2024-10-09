// script.js

const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");
const message = document.getElementById("message");
const toggleButton = document.getElementById("toggleButton");
const rollButton = document.getElementById("rollButton");

let diceHidden = false;
let animationInterval = null;

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
    const backgroundImage = document.getElementById("backgroundImage");

    if (roll1 != roll2) {
        if (roll1 == 2 && roll2 == 1) {
            message.textContent = "Mexicali! Fill Boat and Pass to Anyone";
            backgroundImage.style.display = "block"; // Show the background image
            return;
        }
        if (roll1 == 3 && roll2 == 2) {
            message.textContent = "Reroll, order reverses.";
            backgroundImage.style.display = "none"; // Hide background image
            return;
        }
        message.textContent = "";
        backgroundImage.style.display = "none"; // Hide background image
        return;
    }

    if (roll1 == roll2) {
        if (roll1 == 1) {
            message.textContent = "Snake Eyes: Fill boat, Pass";
            backgroundImage.style.display = "none"; // Hide background image
            return;
        }
        message.textContent = "Doubles...";
        backgroundImage.style.display = "none"; // Hide background image
        return;
    }

}


// Play a quick animation before settling on the final dice roll
function playDiceAnimation() {
    let counter = 0;
    const maxRolls = 10; // Number of times to switch dice values
    const intervalTime = 100; // Speed of the animation

    clearInterval(animationInterval);

    animationInterval = setInterval(() => {
        const tempRoll1 = Math.floor(Math.random() * 6) + 1;
        const tempRoll2 = Math.floor(Math.random() * 6) + 1;
        updateDiceImages(tempRoll1, tempRoll2);

        counter++;
        if (counter >= maxRolls) {
            clearInterval(animationInterval);
            rollDice(); // Settle on the final dice roll
        }
    }, intervalTime);
}

// Handle screen click to roll dice
document.body.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON" && !diceHidden) {
        playDiceAnimation();
    }
});

// Toggle dice visibility with hide/bullshit buttons
toggleButton.addEventListener("click", () => {
    const backgroundImage = document.getElementById("backgroundImage");
    diceHidden = !diceHidden;
    if (diceHidden) {
        dice1.style.display = "none";
        dice2.style.display = "none";
        message.style.display = "none";
        toggleButton.textContent = "Bullshit";
        rollButton.style.display = "inline-block";
        backgroundImage.style.display = "none";
    } else {
        dice1.style.display = "inline-block";
        dice2.style.display = "inline-block";
        message.style.display = "block";
        toggleButton.textContent = "Hide";
        rollButton.style.display = "none";
        backgroundImage.style.display = "block";
    }
});

// Roll dice when the Roll button is clicked (while hidden)
rollButton.addEventListener("click", () => {
    playDiceAnimation();
    diceHidden = false;
    dice1.style.display = "inline-block";
    dice2.style.display = "inline-block";
    message.style.display = "block";
    toggleButton.textContent = "Hide";
    rollButton.style.display = "none";
});
