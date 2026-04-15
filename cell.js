class Cell {
    constructor(cellX, cellY, maze, cellSize) {
        this.cellX = cellX;
        this.cellY = cellY;
        this.maze = maze;
        this.cellSize = cellSize;
        this.x = cellX * cellSize;
        this.y = cellY * cellSize;
        this.visited = false;
        this.walls = [true, true, true, true];
        this.tarDist = undefined;
    }
    Draw() {
        if (this.walls[0]) {
            line(this.x, this.y, this.x + this.cellSize, this.y);
        }
        if (this.walls[1]) {
            line(this.x + this.cellSize, this.y, this.x + this.cellSize, this.y + this.cellSize);
        }
        if (this.walls[2]) {
            line(this.x + this.cellSize, this.y + this.cellSize, this.x, this.y + this.cellSize);
        }
        if (this.walls[3]) {
            line(this.x, this.y + this.cellSize, this.x, this.y);
        }
    }
    GetNeighbour() {
        let neighbours = [];
        if (this.cellY > 0 && this.maze[this.cellX][this.cellY - 1].visited == false) {
            neighbours.push(this.maze[this.cellX][this.cellY - 1]);
        }
        if (this.cellX < this.maze.length - 1 && this.maze[this.cellX + 1][this.cellY].visited == false) {
            neighbours.push(this.maze[this.cellX + 1][this.cellY]);
        }
        if (this.cellY < this.maze[0].length - 1 && this.maze[this.cellX][this.cellY + 1].visited == false) {
            neighbours.push(this.maze[this.cellX][this.cellY + 1]);
        }
        if (this.cellX > 0 && this.maze[this.cellX - 1][this.cellY].visited == false) {
            neighbours.push(this.maze[this.cellX - 1][this.cellY]);
        }
        if (neighbours.length > 0) {
            return neighbours[Math.floor(Math.random() * neighbours.length)];
        } else {
            return undefined;
        }
    }
    BreakWall(other) {
        if (this.cellY - other.cellY == 1) {
            this.walls[0] = false;
            other.walls[2] = false;
        }
        if (this.cellX - other.cellX == -1) {
            this.walls[1] = false;
            other.walls[3] = false;
        }
        if (this.cellY - other.cellY == -1) {
            this.walls[2] = false;
            other.walls[0] = false;
        }
        if (this.cellX - other.cellX == 1) {
            this.walls[3] = false;
            other.walls[1] = false;
        }
    }
}