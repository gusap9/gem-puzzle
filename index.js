const body = document.querySelector("body")

const createPuzzleContainer = () => {
    body.innerHTML =
        `
    <div class="pause"></div>
    <div class=pause-container>Pause</div>
    <div class="congrats-container">
        <div class="congrats-box">
            <div class="congrats-box-title">Congratulations! <br> You can save your result</div>
            <form class="congrats-box-input">
                <input type="text" placeholder="Type your name"> 
                <input type="submit" value="Send result">
            </form>
        </div>
        <div class="congrats-box-close"></div>
    </div>
    <div class="shadow-button">
        <button class="test-result">Test Result</button>
    </div>
    <div class="buttons-container">
        <button class="shuffle">Shuffle and start</button>
        <button class="stop">Stop</button>
        <button class="save">Save</button>
        <button class="result">Result</button>
    </div>
    <div class="counter">
        <div class="counter-moves">Moves: 0</div>
        <div class="counter-time">0:00</div>
    </div>
    <div class="main-container"></div>
    <div class="size-container">
        <button class="size third">3x3</button>
        <button class="size fourth">4x4</button>
        <button class="size fifth">5x5</button>
        <button class="size sixth">6x6</button>
        <button class="size seventh">7x7</button>
        <button class="size eigth">8x8</button>
    </div>
    `
}
createPuzzleContainer()

const puzzleContainer = document.querySelector(".main-container")
let puzzle = []
let size = 3;

let movesContainer = document.querySelector(".counter-moves")
let countOfMoves = 1;
const countOfMovesUp = () => {
    movesContainer.innerHTML = "Moves: " + countOfMoves;
    countOfMoves++;
}

let time = 0;
let timer;
let isPaused = false;
const countUp = () => {
    timer = setInterval(() => {
        if (!isPaused) {
            time++
            document.querySelector(".counter-time").innerHTML = "0:" + time
            if (time < 10) {
                document.querySelector(".counter-time").innerHTML = "0:0" + time
            } else if (time % 60 < 10) {
                document.querySelector(".counter-time").innerHTML = Math.floor(time / 60) + ":0" + time % 60
            } else {
                document.querySelector(".counter-time").innerHTML = Math.floor(time / 60) + ":" + time % 60
            }
        }
    }, 1000)
}
countUp()


const getRow = (position) => {
    return Math.ceil(position / size);
}

const getColumn = (position) => {
    const column = position % size
    if (column === 0) {
        return size
    }
    return column
}



const generatePuzzle = () => {
    for (let i = 1; i <= size * size; i++) {
        if (document.documentElement.clientWidth > 600) {
            puzzle.push({
                value: i,
                position: i,
                id: i,
                x: 600 / size * (getColumn(i) - 1),
                y: 600 / size * (getRow(i) - 1),
                disabled: false,
            })
        } else {
            puzzle.push({
                value: i,
                position: i,
                id: i,
                x: 300 / size * (getColumn(i) - 1),
                y: 300 / size * (getRow(i) - 1),
                disabled: false,
            })
        }
    }

}
const renderPuzzle = () => {
    document.querySelector(".test-result").classList.add("opacity")
    puzzleContainer.innerHTML = ``
    for (let item of puzzle) {
        if (item.disabled === true) continue;
        if (document.documentElement.clientWidth > 600) {
            puzzleContainer.innerHTML +=
                `
            <div style="left: ${item.x}px; top: ${item.y}px; height: ${600 / size}px; width: ${600 / size}px;" id="${item.id}" class="puzzle-item">
                ${item.value}
            </div>
        `} else {
            puzzleContainer.innerHTML +=
                `
            <div style="left: ${item.x}px; top: ${item.y}px; height: ${300 / size}px; width: ${300 / size}px;" id="${item.id}" class="puzzle-item">
                ${item.value}
            </div>
        `
        }
    }
    if (size === 3) {
        document.querySelectorAll(".size").forEach((el) => el.classList.remove("white"))
        document.querySelector(".third").classList.add("white")
    } else if (size === 4) {
        document.querySelectorAll(".size").forEach((el) => el.classList.remove("white"))
        document.querySelector(".fourth").classList.add("white")
    } else if (size === 5) {
        document.querySelectorAll(".size").forEach((el) => el.classList.remove("white"))
        document.querySelector(".fifth").classList.add("white")
    } else if (size === 6) {
        document.querySelectorAll(".size").forEach((el) => el.classList.remove("white"))
        document.querySelector(".sixth").classList.add("white")
    } else if (size === 7) {
        document.querySelectorAll(".size").forEach((el) => el.classList.remove("white"))
        document.querySelector(".seventh").classList.add("white")
    } else if (size === 8) {
        document.querySelectorAll(".size").forEach((el) => el.classList.remove("white"))
        document.querySelector(".eigth").classList.add("white")
    }
    onClickOnPuzzle()
    let congrats = 0;
    for (item of puzzle) {
        if (item.position === item.value) {
            congrats++
        } else {
            congrats = 0
        }
    }
    let savetest = false
    if (congrats === size * size) {
        document.querySelector(".save").addEventListener("click", () => {
            document.querySelector(".save").classList.remove("shake")
        })
        document.querySelector(".save").classList.add("save-congrats_button")
        document.querySelector(".shuffle").classList.add("shuffle-congrats_button")
        document.querySelector(".pause").classList.add("background-congrats")
        document.querySelector(".background-congrats").addEventListener("click", () => {
            document.querySelector(".save").classList.add("shake-no-time")
            if (!savetest) {
                savetest = true
                setTimeout(() => {
                    document.querySelector(".save").classList.remove("shake-no-time")
                    savetest = false
                }, 1000);
            }

        })
        document.querySelector(".save").addEventListener("click", () => {
            document.querySelector(".congrats-container").classList.add("congrats-container-active")
        })
        function closePopup(el) {
            let target = el.target;
            if (target === document.querySelector(".background-congrats") || target === document.querySelector(".congrats-box-close") || target === document.querySelector(".shuffle")) {
                document.querySelector(".congrats-container").classList.remove("congrats-container-active")
            }
        }
        document.querySelector(".body").addEventListener("click", (el) => {closePopup(el)})
        startConfetti()
    } else {
        document.querySelector(".save").classList.remove("shake-no-time")
        document.querySelector(".save").addEventListener("click", () => {
            document.querySelector(".congrats-container").classList.remove("congrats-container-active")
            document.querySelector(".save").classList.add("shake")
            if (!savetest) {
                savetest = true
                setTimeout(() => {
                    document.querySelector(".save").classList.remove("shake")
                    savetest = false
                }, 1000);
            }
            
        })
        
        document.querySelector(".save").classList.remove("save-congrats_button")
        document.querySelector(".shuffle").classList.remove("shuffle-congrats_button")
        document.querySelector(".pause").classList.remove("background-congrats")
    }
    
}


document.querySelector(".test-result").addEventListener("click", () => {
    puzzle = []
    generatePuzzle()
    let puzzle9 = puzzle.find((item) => item.value === size * size)
    puzzle9.disabled = true
    isPaused = true
    renderPuzzle()
})


const randomizePuzzle = () => {
    const randomValues = getRandomValues()
    let i = 0
    for (let item of puzzle) {
        item.value = randomValues[i]
        item.disabled = false
        i++
    }
    let puzzle9 = puzzle.find((item) => item.value === size * size)
    puzzle9.disabled = true
}
const getRandomValues = () => {
    const values = [];
    for (let i = 1; i <= size * size; i++) {
        values.push(i);
    }
    const randomValues = values.sort(() => Math.random() - 0.5)
    return randomValues
}

function shuffle() {
    randomizePuzzle()
    countOfMoves = 0
    countOfMovesUp()
    document.querySelector(".counter-time").innerHTML = "0:00"
    time = 0
    clearInterval(timer)
    countUp()
    stopConfetti()
    isPaused = false
    renderPuzzle()
}
document.querySelector(".shuffle").addEventListener("click", () => {
    shuffle()
})

const getEmptyPuzzle = () => {
    return puzzle.find((item) => item.disabled)
}

const getPuzzleByPosition = (position) => {
    return puzzle.find((item) => item.position === position)
}


const getRightPuzzle = () => {
    const emptyPuzzle = getEmptyPuzzle()
    if (getColumn(emptyPuzzle.position) === size) return null
    const rightPuzzle = getPuzzleByPosition(emptyPuzzle.position + 1)
    return rightPuzzle
}
const getLeftPuzzle = () => {
    const emptyPuzzle = getEmptyPuzzle()
    if (getColumn(emptyPuzzle.position) === 1) return null
    const leftPuzzle = getPuzzleByPosition(emptyPuzzle.position - 1)
    return leftPuzzle
}

const getAbovePuzzle = () => {
    const emptyPuzzle = getEmptyPuzzle()
    if (getRow(emptyPuzzle.position) === 1) return null
    const abovePuzzle = getPuzzleByPosition(emptyPuzzle.position - size)
    return abovePuzzle
}

const getBelowPuzzle = () => {
    const emptyPuzzle = getEmptyPuzzle()
    if (getRow(emptyPuzzle.position) === size) return null
    const belowPuzzle = getPuzzleByPosition(emptyPuzzle.position + size)
    return belowPuzzle
}

const swapPositions = (firstPuzzle, secondPuzzle, isX = false) => {
    let temp = firstPuzzle.position
    firstPuzzle.position = secondPuzzle.position
    secondPuzzle.position = temp
    if (isX) {
        temp = firstPuzzle.x
        firstPuzzle.x = secondPuzzle.x
        secondPuzzle.x = temp
    } else {
        temp = firstPuzzle.y
        firstPuzzle.y = secondPuzzle.y
        secondPuzzle.y = temp
    }
}

const moveLeft = () => {
    const rightPuzzle = getRightPuzzle()
    const emptyPuzzle = getEmptyPuzzle()
    swapPositions(emptyPuzzle, rightPuzzle, true)
}

const moveRight = () => {
    const leftPuzzle = getLeftPuzzle()
    const emptyPuzzle = getEmptyPuzzle()
    swapPositions(emptyPuzzle, leftPuzzle, true)
}

const moveUp = () => {
    const belowPuzzle = getBelowPuzzle()
    const emptyPuzzle = getEmptyPuzzle()
    swapPositions(emptyPuzzle, belowPuzzle, false)
}

const moveDown = () => {
    const abovePuzzle = getAbovePuzzle()
    const emptyPuzzle = getEmptyPuzzle()
    swapPositions(emptyPuzzle, abovePuzzle, false)
}



const onClickOnPuzzle = () => {
    const abovePuzzle = getAbovePuzzle()
    if (abovePuzzle !== null) {
        const abovePuzzleContainer = document.getElementById(`${abovePuzzle.id}`)
        abovePuzzleContainer.addEventListener("click", () => { onClickMove("above") })
        abovePuzzleContainer.classList.add('pointer')
    }

    const belowPuzzle = getBelowPuzzle()
    if (belowPuzzle !== null) {
        const belowPuzzleContainer = document.getElementById(`${belowPuzzle.id}`)
        belowPuzzleContainer.addEventListener("click", () => { onClickMove("below") })
        belowPuzzleContainer.classList.add('pointer')
    }
    const rightPuzzle = getRightPuzzle()
    if (rightPuzzle !== null) {
        const rightPuzzleContainer = document.getElementById(`${rightPuzzle.id}`)
        rightPuzzleContainer.addEventListener("click", () => { onClickMove("right") })
        rightPuzzleContainer.classList.add('pointer')
    }
    const leftPuzzle = getLeftPuzzle()

    if (leftPuzzle !== null) {
        const leftPuzzleContainer = document.getElementById(`${leftPuzzle.id}`)
        leftPuzzleContainer.addEventListener("click", () => { onClickMove("left") });
        leftPuzzleContainer.classList.add('pointer')
    }
}

const onClickMove = (item) => {
    switch (item) {
        case "above":
            moveDown()
            countOfMovesUp();
            break
        case "below":
            moveUp();
            countOfMovesUp();
            break
        case "left":
            moveRight();
            countOfMovesUp();
            break
        case "right":
            moveLeft();
            countOfMovesUp();
            break
    }
    renderPuzzle()
}


document.querySelector(".stop").addEventListener("click", () => {
    document.querySelector(".stop").classList.toggle("stop-active")
    document.querySelector(".pause").classList.toggle("background-pause")
    document.querySelector(".pause-container").classList.toggle("pause-container-active")
    isPaused = !isPaused
})
document.querySelector(".third").addEventListener("click", () => {
    document.querySelector(".counter-time").innerHTML = "0:00"
    time = 0
    clearInterval(timer)
    countUp()
    size = 3;
    puzzle = [];
    generatePuzzle()
    randomizePuzzle()
    renderPuzzle()

})
document.querySelector(".fourth").addEventListener("click", () => {
    document.querySelector(".counter-time").innerHTML = "0:00"
    time = 0
    clearInterval(timer)
    countUp()
    size = 4;
    puzzle = []
    generatePuzzle()
    randomizePuzzle()
    renderPuzzle()
})
document.querySelector(".fifth").addEventListener("click", () => {
    document.querySelector(".counter-time").innerHTML = "0:00"
    time = 0
    clearInterval(timer)
    countUp()
    size = 5;
    puzzle = []
    generatePuzzle()
    randomizePuzzle()
    renderPuzzle()
})
document.querySelector(".sixth").addEventListener("click", () => {
    document.querySelector(".counter-time").innerHTML = "0:00"
    time = 0
    clearInterval(timer)
    countUp()
    size = 6;
    puzzle = []
    generatePuzzle()
    randomizePuzzle()
    renderPuzzle()
})
document.querySelector(".seventh").addEventListener("click", () => {
    document.querySelector(".counter-time").innerHTML = "0:00"
    time = 0
    clearInterval(timer)
    countUp()
    size = 7;
    puzzle = []
    generatePuzzle()
    randomizePuzzle()
    renderPuzzle()
})
document.querySelector(".eigth").addEventListener("click", () => {
    document.querySelector(".counter-time").innerHTML = "0:00"
    time = 0
    clearInterval(timer)
    countUp()
    size = 8;
    puzzle = []
    generatePuzzle()
    randomizePuzzle()
    renderPuzzle()
})

generatePuzzle()
randomizePuzzle()
renderPuzzle()

window.addEventListener('resize', () => {
    puzzle = []
    generatePuzzle()
    randomizePuzzle()
    renderPuzzle()
    shuffle()
    stopConfetti()
    document.querySelector(".congrats-container").classList.remove("congrats-container-active")
})





// window.addEventListener("blur", () => {
//     document.querySelector(".stop").classList.add("stop-active")
//     document.querySelector(".pause").classList.add("background-pause")
//     document.querySelector(".pause-container").classList.add("pause-container-active")
//     isPaused = true
    
// })