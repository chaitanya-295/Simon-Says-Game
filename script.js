let gameseq = []; // Array to store the game sequence
let userseq = []; // Array to store the user sequence, which will be compared with the game sequence

let btns = ["yellow", "green", "purple", "red"]; // Array to store the button colors, which will be used to generate to game sequence

let started = false; // Variable to check if the game has startted on not, which will be used to start the game when user presses any key for the first time
let level = 0; // Variable to store the level of the game, which will be incremented when user completes the game sequence
let highestScore = localStorage.getItem("highestScore") || 0; // Variable to store the highest score from localStorage

let h2 = document.querySelector("h2") // Variable to store the h2 element, which will be used to display the level of the game and game over messa

// Display the highest score
function displayHighestScore() {
    let scoreDisplay = document.querySelector(".highest-score");
    if (!scoreDisplay) {
        scoreDisplay = document.createElement("div");
        scoreDisplay.className = "highest-score";
        document.body.insertBefore(scoreDisplay, document.querySelector(".btn-container"));
    }
    scoreDisplay.innerText = "Highest Score: " + highestScore;
}

// start the game when user presses any key for the first time
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game Started");
        started = true;

        levelup();
    }
});

// Display highest score on page load
displayHighestScore();

// Flash the game button when game sequence is generated
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

// Flash the user button when user clicks on it
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

// Generate the game sequence and flash the button
function levelup() {
    userseq = [];
    level++;
    h2.innerText = "Level " + level;
    
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    console.log(gameseq);
    gameFlash(randBtn);
}

// Check the user answer with the game sequence
function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        // Update highest score if current score is higher
        if (level > highestScore) {
            highestScore = level;
            localStorage.setItem("highestScore", highestScore);
            displayHighestScore();
        }
        
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Highest Score: <b>${highestScore}</b><br>Press Any Key to Restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

// Event listerner for user Button Press
function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length - 1); 
}

// Adding event listener to all the buttons
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
    btn.addEventListener("touchstart", btnPress);   // mobile
}

// Reset the game varibale to start the game again when user presses any key after game over
function reset() {
    gameseq = [];
    userseq = [];
    started = false;
    level = 0;
}