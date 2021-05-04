canvas = document.getElementById("game-canvas")
scoreboard = document.getElementById("scoreboard")
ctx = canvas.getContext("2d")
ctx.scale(BLOCK_SIDE_LENGTH, BLOCK_SIDE_LENGTH)
model = new gamemodel(ctx)
scoree = 0
ctx.lineWidth = 0.015;
ctx.strokeStyle = '#FFFFFF'
console.log("start")



newGameState = () => {
    fullSend()
    if (model.fallingPiece === null) {
        rand = Math.floor(Math.random() * 7)
        //rand = 2
        const newPiece = new piece(SHAPES[rand], ctx)
        model.fallingPiece = newPiece
        newfallingpiece();
        model.moveDown()
        scoree += SCORE_onepiece
        scoreboard.innerHTML = "Score: " + String(scoree)
    } else {
        model.moveDown()
     }
}
const fullSend = () => {
    const allFilled = (row) => {
        for (let x of row) {
            if (x === 0) {
                return false
            }
        }
        return true
    }

    for (let i = 0; i < model.grid.length; i++) {
        if (allFilled(model.grid[i])) {
            scoree += SCORE_WORTH
            model.grid.splice(i, 1)
            model.grid.unshift(new Array(COLS).fill(0))
        }
    }

    scoreboard.innerHTML = "Score: " + String(scoree)

}
document.addEventListener("keydown", (e) => {
    e.preventDefault()
    switch (e.key) {
        case "z":
            model.rotate()
            break
        case "d":
            model.move(true)
            break
        case "s":
            model.moveDown()
            break
        case "q":
            model.move(false)
            break
    }
})
function start() {
    setInterval(() => {
        newGameState()
    }, GAME_CLOCK);

}


/*for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j <COLS ; j++) {
        ctx.strokeRect(j, i, 1, 1)
    }
}*/