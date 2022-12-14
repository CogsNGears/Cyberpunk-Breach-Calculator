export class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.board = [];
        this.choiceArray = ["1C", "BD", "7A", "E9", "55"];
        for (let i = 0; i < this.height; ++i) {
            let row = [];
            for (let j = 0; j < this.width; ++j) {
                row.push({"x": j, "y": i, "value": "1C"});
            }
            this.board.push(row);
        }
    }

    getBoard() {
        return this.board;
    }

    setBoard(b) {
        this.board = b;
    }

    getCol(c) {
        let col = [];
        for (let i = 0; i < this.height; ++i) {
            col.push(this.board[i][c]);
        }

        return col;
    }

    getRow(r) {
        return this.board[r];
    }

    getNode(x, y) {
        return this.board[y][x];
    }

    setNode(v, x, y) {
        this.board[y][x] = v;
    }

    getValue(x, y) {
        return this.board[y][x].value;
    }

    setValue(v, x, y) {
        this.board[y][x].value = v;
    }

    randomize() {
        for (let i = 0; i < this.height; ++i) {
            for (let j = 0; j < this.width; ++j) {
                let r = this.choiceArray[Math.floor(Math.random() * this.choiceArray.length)];
                this.setValue(r, j, i);
            }
        }
    }

    printBoard() {
        for (let i = 0; i < this.height; ++i) {
            console.log(this.getBoard()[i].map(v => v.value));
        }
    }
}

function findPathHelper(b, seq, buffer, choices, rowbound) {
    if (seq.length === 0) {
        return [];
    }

    if (buffer < seq.length) {
        return [];
    }

    let options = choices.filter(v => v.value === seq[0]);
    if (options.length > 0) {
        for (o of options) {
            let c = [];
            if (rowbound) {
                c = b.getCol(o.x).map(x => x);
                c.splice(o.y, 1);
            } else {
                c = b.getRow(o.y).map(x => x);;
                c.splice(o.x, 1);
            }

            let p = [o].concat(findPathHelper(b, seq.slice(1), buffer - 1, c, !rowbound));
            if (p.length === seq.length) {
                return p;
            }
        }

        return [];
    }

    return [];
}

export function findPath(b, seq, buffer) {
    if (b.getRow(0).some(v => v.value === seq[0])) {
        let res = findPathHelper(b, seq, buffer, b.getRow(0), true);
        if (res.length > 0) {
            return res;
        }
    }

    for (let i = 0; i < b.width; ++i) {
        let res = [b.getNode(i, 0)].concat(findPathHelper(b, seq, buffer - 1, b.getCol(i), false));
        if (res.length > 1) {
            return res;
        }
    }

    return [];
}

export function genBoard(b, x, y) {
    let newB = new Board(x, y);
    for (let i = 0; i < x; ++i) {
        for (let j = 0; j < y; ++j) {
            newB.setValue(b[j][i], i, j);
        }
    }

    return newB;
}