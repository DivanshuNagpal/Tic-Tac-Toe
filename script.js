let boxes = document.querySelectorAll(".boxes");
let rstBtn = document.querySelector("#rstBtn");
let newBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let scoreP1 = document.querySelector("#scoreP1");
let scoreP2 = document.querySelector("#scoreP2");

let turnX = true;
let count = 0;
let isDraw = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const resetBtn = () => {
    turnX = true;
    count = 0;
    isDraw = false;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const newGame = () => {
    turnX = true;
    count = 0;
    isDraw = false;
    enableBoxes();
    msgContainer.classList.add("hide");
    p1Score = 0;
    p2Score = 0;

    scoreP1.innerText = p1Score;
    scoreP2.innerText = p2Score;
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = "X";
            turnX = false;
        } else {
            box.innerText = "O";
            turnX = true;
        }

        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    })
})

const gameDraw = () => {
    isDraw = true;
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

let p1Score = 0;
let p2Score = 0;

const calculateScore = (winner) => {

    if (winner === "X") {
        p1Score++;
        scoreP1.innerText = p1Score;
    } else {
        p2Score++;
        scoreP2.innerText = p2Score;
    }
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;

        if (posVal1 != "" && posVal2 != "" && posVal3 != "") {
            if (posVal1 === posVal2 && posVal2 === posVal3) {
                isDraw = false;
                calculateScore(posVal1)
                showWinner(posVal1);
                return true;
            }
        }
    }
    return false;
}

rstBtn.addEventListener("click", resetBtn);
newBtn.addEventListener("click", newGame);

const showToast = (msgText) => {
    const toast = document.getElementById("toast");
    toast.innerText = msgText;
    toast.classList.remove("hide");

    setTimeout(() => {
        toast.classList.add("hide");
    }, 3000);
};

window.onload = () => {
    showToast("Player 1 starts first as X");
};
