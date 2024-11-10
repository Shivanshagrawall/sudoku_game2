const gameBoard = document.querySelector('.gameBoard');
const digits = document.querySelector('.digits');
const deleteButton = document.querySelector('.deleteButton');
const mistake = document.querySelector('.count');
const resetButton=document.querySelector('.resetButton');
let count = 0;
let lastSelected = null;

// Puzzle
const puzzle = [
    "8-6-1----",
    "--3-64-9-",
    "9-----816",
    "-8-396---",
    "7-2-4-3-9",
    "---572-8-",
    "521-----4",
    "-3-75-2--",
    "----2-1-5",
];

// Solved Puzzle
const solution = [
    "856917423",
    "213864597",
    "947235816",
    "185396724",
    "762148359",
    "394572681",
    "521683974",
    "439751268",
    "678429135",
];

// Puzzle Display on screen when window Load
window.onload = (() => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const div = document.createElement('div');
            div.classList.add('tile');

            div.setAttribute("row", i);
            div.setAttribute("col", j);
            div.addEventListener("click", selectTile);
            if (puzzle[i][j] != "-") {
                div.classList.add('filled');
                div.innerHTML = puzzle[i][j];
            }

            if (i == 2 || i == 5) {
                div.classList.add('border-bottom');
            }
            if (j == 2 || j == 5) {
                div.classList.add('border-right');
            }
            gameBoard.append(div);
        }
    }

    for (let i = 0; i < 9; i++) {
        const div = document.createElement('div');
        div.addEventListener("click", addNumber);
        div.classList.add('tile');
        div.innerText = i + 1;
        div.style.height = gameBoard.querySelector(".tile").clientHeight + "px";
        digits.append(div);
    }
})

// Function to Select Tile
function selectTile() {
    if (lastSelected != null) {
        lastSelected.classList.remove('selected');
    }
    lastSelected = this;
    lastSelected.classList.add('selected');
}

// Function to add Digit(0-9) in a puzzle
function addNumber() {
    if (lastSelected.innerText == "" || lastSelected.classList.contains("danger")) {
        lastSelected.innerText = this.innerText;
    }

    let row = lastSelected.getAttribute("row");
    let col = lastSelected.getAttribute("col");

    if (solution[row][col] == lastSelected.innerText) {
        lastSelected.classList.remove("danger");
    } else {
        countErrorandDisplay();
        lastSelected.classList.add('danger');
    }

    if (count > 2) {
        alert("Sorry! You Lost the Game");
        location.reload();
    }

    if (allFilled()) {
        let allTiles = gameBoard.querySelectorAll('.tile');
        let userAnswer = [...allTiles].map((tile) => {
            return tile.innerText;
        })

        let num = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (userAnswer[num] != solution[i][j]) {
                    allTiles[num].classList.add("danger");
                }
                num++;
            }
        }

        let dangerClass = [...allTiles].some((tile) => {
            return tile.classList.contains("danger");
        })

        if (dangerClass) {
            if (count > 2) {
                alert("Sorry! You Lost the Game");
                location.reload();
            }
        } else {
            alert("Congratulations! You Won the Game");
        }
    }
}

// To delete Element in the Tile
deleteButton.onclick = () => {
    if (!lastSelected.classList.contains("filled")) {
        lastSelected.innerText = "";
    }
}

// To count Total Error and Display on Screen 
function countErrorandDisplay() {
    count++;
    mistake.innerText = count;
}

// Function to Check all Tiles are Filled or Not
function allFilled() {
    let allTiles = gameBoard.querySelectorAll('.tile');
    return [...allTiles].every((tile) => {
        return tile.innerText != "";
    })
}

// To Reset the Game
resetButton.addEventListener("click",()=>{
    let userConfirmation=confirm("Are you Sure to Reset the Game?");
    if(userConfirmation) location.reload();
})