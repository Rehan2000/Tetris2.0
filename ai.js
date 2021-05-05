function newfallingpiece() {
    console.log(fastmoveyarr, fastmovexarr)
    shape = []
    for (var i = 0; i < model.fallingPiece.shape.length; i++) {
        shape[i] = []
        for (var j = 0; j < model.fallingPiece.shape.length; j++) {
            shape[i][j] = 0
            if (model.fallingPiece.shape[i][j] > 0) {
                shape[i][j] = 1
            }
        }
    }
    for (var i = 0; i < model.grid.length; i++) {
        grid[i] = model.grid[i].slice();
    }
    for (var i = 0; i < model.grid.length; i++) {
        originalarray[i] = model.grid[i].slice();
    }
    scorearray = []
    xarray = []
    yarray = []
    rarray = []
    xfast = []
    y = model.fallingPiece.y
    x = model.fallingPiece.x;
    r = 0;
    // console.log(!collision(x, y, shape));
    goai()
}

function goai() {
    console.log(fastmoveyarr)
     for (r = 0; r < 4; r++) {
    for (var i = 0; i < COLS; i++) {
        x = model.fallingPiece.x;
        y = model.fallingPiece.y
        for (var k = 0; k < originalarray.length; k++) {
            grid[k] = originalarray[k].slice();
        }
        x = i
        xinitialization = i
        if (collision(x, y, shape) && y == 0) {
            break;
        } else {


            calculatescore(grid, shape)
            //console.log("---------------------------------------------------------------------")
        }
    }
      rotateai(shape);
     }
    y = model.fallingPiece.y
    x = model.fallingPiece.x;
    console.log(scorearray)

    chooseandputposition();
}

function chooseandputposition() {
    let i = scorearray.indexOf(Math.max(...scorearray));
    xtarget = xarray[i]
    rtarget = rarray[i]
    xftarget = xfast[i]
    ytarget = yarray[i]
    if (rtarget != 0) {
        for (ii = 0; ii < rtarget; ii++) {
            model.rotate();
        }
    }

    if (xtarget == x) {
    } else if (xtarget < x) {

        while (xtarget != x) {
            model.move(false);
            y = model.fallingPiece.y
            x = model.fallingPiece.x;
            if (collision(x - 1, y, shape)) {
                xtarget = x
            }
        }

    } else if (xtarget > x) {
        while (xtarget != x) {
            model.move(true);
            y = model.fallingPiece.y
            x = model.fallingPiece.x;
            if (collision(x + 1, y, shape)) {
                xtarget = x
            }
        }
    }
    ////
    if (xftarget != 0) {
        while (y != ytarget) {
            model.moveDown()
            y = model.fallingPiece.y
            x = model.fallingPiece.x;
        }
        if (xftarget < x) {
            while (xftarget != x) {
                model.move(false);
                y = model.fallingPiece.y
                x = model.fallingPiece.x;
                if (collision(x, y , shape)) {
                    xftarget = x
                }
            }
        } else if (xftarget > x) {
            while (xftarget != x) {
                model.move(true);
                y = model.fallingPiece.y
                x = model.fallingPiece.x;
                if (collision(x, y , shape)) {
                    xftarget = x
                }
            }
        }
    }
}

//todo
//add points if on the side is full
//better if hole on somewhere open instead of close
//move piece at the end
//check if holes on the matrix of the shape between done
//if closer to the bottom add points done


function calculatescore(gridtest, shape) {
    fastmovebool = false
    score = 0;
    highestwidth = [];
    highestheight = [];
    gridtest = makeitgodown(shape, gridtest);
    /////////////////////Perfectly functionning//////////////////////////////
    highestwidth = sumArrays(...shape)
    highestwidth = removeElement(highestwidth, 0)
    highestheight = sumArrays(...shape)
    zx = highestwidth.length
    zy = y + Math.max(...highestheight)
    //console.log(x, zx, y, zy)
    /////////////////////Perfectly functionning//////////////////////////////
    if (zy < 20) {
        for (let w = 0; w < zx; w++) {
            if (gridtest[zy][(x + w)] != 0) {
                score = score + noholesbeneath + zy * 10
            } else {
                score = score + holesbeneath / zy
                aretheymoreholesbenath(gridtest, zy + 1, x + w)
            }
        }
    } else if (zy == 20) {
        for (let w = 0; w < zx; w++) {
            if (gridtest[19][(x + w)] != 0) {

                score = score + noholesbeneath * zy
            }
        }
    }
    ////////////////////Perfectly functionning////////////////////////////// 
    zy -= 1;
    let d = Math.max(...highestheight);
    if (zy > d) {
        for (let l = 0; l < d; l++) {
            for (let w = 0; w < zx; w++) {

                if (gridtest[zy][(x + w)] == 0) {
                    if (gridtest[zy - 1][(x + w)] != 0) {
                        score = score + holesbeneath
                    } else if (zy - y > 1) {
                        score = score + holesbeneath
                    }
                }
            } zy = zy - 1
        }
    }
    //holesin

    /////////////////////Perfectly functionning//////////////////////////////

    //jochimarea

    // add points if on the side is full

    /*for (let i = 0; i < model.fallingPiece.shape.length; i++) {
        tocontinue: for (let j = 0; j < model.fallingPiece.shape.length; j++) {
            // checks if on the left there is a square that belongs to the model.fallingPiece.shape
            // if (x+j === )
            if (j > 0 && model.fallingPiece.shape[i][j - 1] === 0) {
                if (j + x > 0 && gridtest[i][j + x - 1] === 0) {
                    score += sideblocked
                }
            }
            if (j < model.fallingPiece.shape[i].length - 1 && model.fallingPiece.shape[i][j + 1] === 0) {
                if (j + x < gridtest[i].length - 1 && gridtest[i][j + x + 1] === 0) {
                    score += sideblocked
                }
            }
            if (x + j === 0 || x + j === gridtest[i].length) {
                score += sideblocked
            }
        }
    }*/

    // better if hole on somewhere open instead of close

    //jochimarea

    //checks for full lines
    const allFilled = (row) => {
        for (let x of row) {
            if (x === 0) {
                return false
            }
        }
        return true
    }
    for (let i = 0; i < gridtest.length; i++) {
        if (allFilled(gridtest[i])) {
            gridtest.splice(i, 1)
            gridtest.unshift(new Array(COLS).fill(0))
            score += scorenewline
        }
    }
    yarray.push(y)
    scorearray.push(score)
    xarray.push(x)
    xfast.push(0)
    rarray.push(r)


    zy = y + Math.max(...highestheight) - 1
    for (let v = 0; v < fastmoveyarr.length; v++) {
        if (fastmoveyarr.includes(zy)) {
            var indexarr = fastmoveyarr.indexOf(zy)
            var xt = fastmovexarr[indexarr]

            if (xt > x) {
                while (xt != x) {
                    moveai(true, x, y)
                    if (collision(x + 1, y, shape)) {
                        xt = x
                    }
                }
                console.log("to right", x, fastmovexarr[indexarr], zy)
            }

            else if (xt < x) {
                while (xt != x) {
                    moveai(false, x, y)
                    if (collision(x - 1, y, shape)) {
                        xt = x
                    }
                }
                console.log("to left", x, fastmovexarr[indexarr], zy)
            }
            if (x == fastmovexarr[indexarr] && zy == fastmoveyarr[indexarr]) {
                console.log("in it")
                score += fiilintheblanks
                yarray.push(y)
                scorearray.push(score)
                xarray.push(xinitialization)
                xfast.push(xt)
                rarray.push(r)
                console.log(fastmoveyarr, fastmovexarr)
                fastmovexarr.splice(indexarr, 1);
                fastmoveyarr.splice(indexarr, 1);
            }


        }
    }

    /////////////////////Perfectly functionning//////////////////////////////
}


function moveai(right) {
    if (this.fallingPiece === null) {
        return
    }

    if (right) {
        // move right
        if (!collision(x + 1, y, shape)) {
            x += 1

        }
    } else {
        // move left
        if (!collision(x - 1, y, shape)) {
            x -= 1
        }
    }
}


function aretheymoreholesbenath(gridtest, zy, w) {
    if (gridtest[zy] != null) {
        if (gridtest[zy][(w)] < 1) {
            score = score + holesbeneath;
            //console.log("moreholesbeneath")
            aretheymoreholesbenath(gridtest, zy + 1, w);
        }
    }
}/////////////////////Perfectly functionning//////////////////////////////

function makeitgodown(shape, gridtest) {
    if (collision(x, y + 1, shape)) {
        if (y === 0) {
            score = score + endposition;
            // console.log("gone by death")
            return gridtest
        } else {
            //collision true change cordinates
            shape.map((row, i) => {
                row.map((cell, j) => {
                    let p = x + j
                    let q = y + i
                    if (p >= 0 && p < COLS && q < ROWS && cell > 0) {
                        gridtest[q][p] = shape[i][j]
                    }
                })
            })
            //collisiontrue 
            return gridtest;
        }
    } else {
        y += 1
        gridtest = makeitgodown(shape, gridtest, x, y)
    }
    return gridtest;
}/////////////////////Perfectly functionning//////////////////////////////

function collision(x, y, shape) {
    const n = shape.length
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (shape[i][j] > 0) {
                let p = x + j//0 a 10
                let q = y + i//0 a 20
                if (-1 < p && p < COLS && -1 < q && q < ROWS) {
                    // in bounds
                    if (originalarray[q][p] > 0) {
                        return true
                    }
                } else {
                    return true
                }
            }
        }
    }
    return false
}/////////////////////Perfectly functionning//////////////////////////////

function rotateai() {

    let shapetoreurn = [...shape.map((row) => [...row])]
    // transpose of matrix 
    for (let y = 0; y < shapetoreurn.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [shapetoreurn[x][y], shapetoreurn[y][x]] =
                [shapetoreurn[y][x], shapetoreurn[x][y]]
        }
    }
    // reverse order of rows 
    shapetoreurn.forEach((row => row.reverse()))
    yi = model.fallingPiece.y
    xi = model.fallingPiece.x;
    cheleftcol(shapetoreurn)

    if (!collision(xi, yi, shapetoreurn)) {
        shape = shapetoreurn;
    }
}/////////////////////Perfectly functionning//////////////////////////////

function cheleftcol(shapetoreurn) {
    colmostleft = false;
    for (let y = 0; y < shapetoreurn.length; ++y) {
        if (shapetoreurn[y][0] == 0) {
            colmostleft = true;
        } else {
            colmostleft = false;
            break;
        }
    }
    if (colmostleft) {
        for (let y = 0; y < shapetoreurn.length; ++y) {
            for (let z = 0; z < (shapetoreurn.length - 1); ++z) {
                shapetoreurn[y][z] = shapetoreurn[y][z + 1]
            }
            shapetoreurn[y][shapetoreurn.length - 1] = 0

        }
    }
    colmostleft = false;
    for (let y = 0; y < shapetoreurn.length; ++y) {
        if (shapetoreurn[y][0] == 0) {
            colmostleft = true;
        } else {
            colmostleft = false;
            break;
        }
    }
    if (colmostleft) {
        cheleftcol(shapetoreurn)
    }

}/////////////////////Perfectly functionning//////////////////////////////


function sumArrays(...arrays) {
    const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
    const result = Array.from({ length: n });
    return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
}

function removeElement(arrayName, arrayElement) {
    for (var i = 0; i < arrayName.length; i++) {
        if (arrayName[i] == arrayElement) {
            arrayName.splice(i, 1);
        }
    }
    for (var i = 0; i < arrayName.length; i++) {
        if (arrayName[i] == arrayElement) {
            arrayName.splice(i, 1);
        }
    }
    return arrayName;
}/////////////////////Perfectly functionning//////////////////////////////
