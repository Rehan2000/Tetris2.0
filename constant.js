const GAME_CLOCK = 10
const BLOCK_SIDE_LENGTH = 30
const ROWS = 20
const COLS = 10

const SCORE_WORTH = 100
const SCORE_onepiece = 10
const holesbeneath = -30
const noholesbeneath = 10
const scorenewline = 10000


const endposition = -100
const SHAPES = [
    [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0]
    ], [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],/* [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0]
    ], [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]
    ], [
        [1, 1, 0],
        [1, 0, 0],
        [1, 0, 0]
    ],*/ [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ], [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ], [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ], [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ], [
        [1, 1],
        [1, 1]
    ],
]
const COLORS = [
    '#000000',
    '#F76F00',
    '#F7EB00',
    '#0DF700',
    '#00F7D7',
    '#009BF7',
    '#026EFF',
    '#FF0202',
]