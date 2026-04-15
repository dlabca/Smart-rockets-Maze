let startbutton = document.getElementById("startButton");
let menu = document.getElementById("menu");
let cellSize = 100;
let canvas;
let rocketCount;
let mutaceChance;
let mazeWidth;
let mazeHeight;
let maze = [];
function setup() {
    canvas = createCanvas(400, 400);
    canvas.parent("canvasContainer");
    canvas.hide();
    startbutton.addEventListener("click", function () {
        rocketCount = document.getElementById("rocketCount").value;
        mutaceChance = document.getElementById("mutaceChance").value;
        mazeWidth = document.getElementById("mazeWidth").value;
        mazeHeight = document.getElementById("mazeHeight").value;
        resizeCanvas(mazeWidth * cellSize, mazeHeight * cellSize);
        canvas.show();
        loop();
        menu.hidden = true;
        createMaze();
    });
    noLoop();
}

function draw() {
    background(220);
    for (let x = 0; x < maze.length; x++) {
        for (let y = 0; y < maze[0].length; y++) {
            maze[x][y].Draw();
        }
    }
}

function createMaze() {
    for (let x = 0; x < mazeWidth; x++) {
        maze[x] = []
        for (let y = 0; y < mazeHeight; y++) {
            maze[x][y] = new Cell(x, y, maze, cellSize)
        }
    }
    let stack = [];
    let current = maze[0][0];
    current.visited = true;
    stack.push(current);
    while (stack.length > 0) {
        current = stack.pop();
        let neighbor = current.GetNeighbour();
        if (neighbor != undefined) {
            stack.push(current);
            current.BreakWall(neighbor);
            neighbor.visited = true;
            stack.push(neighbor);
        }
    }
}
