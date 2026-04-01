let startbutton = document.getElementById("startButton");
let menu = document.getElementById("menu");
let cellSize = 100;
let canvas;
function setup() {
    canvas = createCanvas(400, 400);
    canvas.parent("canvasContainer");
    canvas.hide();
    startbutton.addEventListener("click", function() {
        let rocketCount = document.getElementById("rocketCount").value;
        let mutaceChance = document.getElementById("mutaceChance").value;
        let mazeWidth = document.getElementById("mazeWidth").value;
        let mazeHeight = document.getElementById("mazeHeight").value;
        resizeCanvas(mazeWidth * cellSize, mazeHeight * cellSize);
        canvas.show();
        loop();
        menu.hidden = true;
    });
    noLoop();
}

function draw() {
    background(220);
}
