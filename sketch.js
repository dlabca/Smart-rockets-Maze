const startbutton = document.getElementById("startButton");
const baseValuesButton = document.getElementById("baseValuesButton");
const menu = document.getElementById("menu");
const cellSize = 100;
let canvas;
let SPEED = 10;
let rocketCount;
let rockets = [];
let baseLifespan = 400;
let mutaceChance;
let mazeWidth;
let mazeHeight;
let maze = [];
let time = 0;
let aliveRockets = rocketCount;
let maxTargetDist = 0;
const newLifespan = 10;

function setup() {
    canvas = createCanvas(400, 400);
    canvas.parent("canvasContainer");
    canvas.hide();
    startbutton.addEventListener("click", startGame);
    baseValuesButton.addEventListener("click", baseValues);
    noLoop();
}

function draw() {
    background(220);
    for (let x = 0; x < maze.length; x++) {
        for (let y = 0; y < maze[0].length; y++) {
            maze[x][y].Draw();
        }
    }
    for (let rocket of rockets) {
        rocket.draw();
    }
    for (let rocket of rockets) {
        rocket.update(time);
        if (!rocket.dead) {
            if (rocket.lifespan == time) {
                rocket.lifespan += newLifespan;
                let newDna = [];
                for (let i = 0; i < newLifespan; i++) {
                    newDna[i] = p5.Vector.random2D();
                    newDna[i].setMag(0.05);
                    rocket.dna = [...rocket.dna, ...newDna]
                }
            }
        }
    }
    if (aliveRockets > 0) {
        time++;
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
    for (let x = 0; x < maze.length; x++) {
        for (let y = 0; y < maze[0].length; y++) {
            maze[x][y].visited = false;
        }
    }
    stack = []
    let target = maze[mazeWidth - 1][mazeHeight - 1]
    target.tarDist = 0
    stack.push(target)
    while (stack.length > 0) {
        let current = stack.pop()

        let neighbors = current.GetNeighbours()
        if (current.tarDist > maxTargetDist) {
            maxTargetDist = current.tarDist
        }
        if (neighbors == undefined) continue;
        for (const neighbor of neighbors) {
            neighbor.tarDist = current.tarDist + 1
            stack.push(neighbor)
        }
    }
}
function startGame() {
    rocketCount = Number(document.getElementById("rocketCount").value);
    mutaceChance = Number(document.getElementById("mutaceChance").value);
    mazeWidth = Number(document.getElementById("mazeWidth").value);
    mazeHeight = Number(document.getElementById("mazeHeight").value);
    if (!validateInput()) {
        return;
    }
    resizeCanvas(mazeWidth * cellSize, mazeHeight * cellSize);
    canvas.show();
    loop();
    menu.hidden = true;
    createMaze();
    for (let i = 0; i < rocketCount; i++) {
        rockets[i] = new Rocket([], createVector(cellSize / 2, cellSize / 2));
    }
    baseValuesButton.removeEventListener("click", baseValues);
    startbutton.removeEventListener("click", startGame);

}
function baseValues() {
    document.getElementById("rocketCount").value = 100;
    document.getElementById("mutaceChance").value = 0.005;
    document.getElementById("mazeWidth").value = 15;
    document.getElementById("mazeHeight").value = 6;
}
function validateInput() {
    if (!(Number.isInteger(rocketCount) && rocketCount > 0)) {
        alert("Rocket count must be a positive integer.");
        return false;
    }
    else if (!(mutaceChance >= 0 && mutaceChance <= 1)) {
        alert("Mutation chance must be a float between 0 and 1.");
        return false;
    }
    else if (!(Number.isInteger(mazeWidth) && mazeWidth > 0)) {
        alert("Maze width must be a positive integer.");
        return false;
    }
    else if (!(Number.isInteger(mazeHeight) && mazeHeight > 0)) {
        alert("Maze height must be a positive integer.");
        return false;
    }
    return true;
}