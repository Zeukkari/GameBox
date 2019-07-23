const  w = 40;
const  widthHeight = 400;
const cols = Math.floor(widthHeight/w);
const rows = Math.floor(widthHeight/w);

export default function setupMaze() {
    const grid = createGrid();
    return createMaze(grid);
}
function createGrid() {
    let grid = [];
    for(let j = 0; j < rows; j++) {
        for(let i = 0; i < cols; i++) {
            let cell = new Cell(i,j);
            grid.push(cell);
        }
    }
    return grid;
}
function removeWalls(a, b) {
    const x = a.i - b.i;
    if(x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    }else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    const y = a.j - b.j;
    if(y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    }else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}

function createMaze(grid) {
    let building = false;
    let current = grid[0];

    do {
        current.visited = true;
        let next =  current.checkNeighbors(grid);
        if(next) {
            next.visited = true;
            removeWalls(current, next);
            current = next;



        }else {
            building = true;
        }
    }while (!building);
    //while (grid[99].visited == true)
    return grid;
}

function index(i, j) {
    if(i<0 || j < 0 || i > cols-1 || j > rows-1){
        return -1; // undefined
    }
    return i + j * cols;
}
function Cell(i,j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;

    this.checkNeighbors = function(grid) {
        let neighbors = [];
        let top = grid[index(i , j-1)];
        let right = grid[index(i+1 , j)];
        let bottom = grid[index(i, j+1)];
        let left = grid[index(i-1 , j)];

        if(top && !top.visited) {
            neighbors.push(top);
        }
        if(right && !right.visited) {
            neighbors.push(right);
        }
        if(bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if(left && !left.visited) {
            neighbors.push(left);
        }

        if(neighbors.length > 0) {
            let r = Math.floor(Math.random() * neighbors.length);
            return neighbors[r];
        }else {
            return undefined;
        }
    }

    this.draw = function(ctx) {
        let x = this.i*40;
        let y = this.j*40;
        ctx.beginPath();
        if(this.walls[0]) {
            ctx.moveTo(x,y);
            ctx.lineTo(x+w,y);
        }
        if(this.walls[1]) {
            ctx.moveTo(x+w,y);
            ctx.lineTo(x+w,y+w);
        }
        if(this.walls[2]) {
            ctx.moveTo(x+w,y+w);
            ctx.lineTo(x,y+w);
        }
        if(this.walls[3]) {
            ctx.moveTo(x,y+w);
            ctx.lineTo(x,y);
        }

        if(this.visited) {
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(x, y, w, w);
            //ctx.rect(x,y,w/2,w/2);
        }else {
            ctx.fillStyle = "#525252";
            ctx.fillRect(x, y, w, w);
        }
        
        ctx.stroke();
    }
}