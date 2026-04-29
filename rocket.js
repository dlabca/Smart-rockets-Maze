class Rocket {
    constructor(dna, position) {
        this.position = position.copy();
        this.velocity = createVector(0, 0);
        this.dead = false;
        this.score = 0;
        this.cellX = constrain(floor(this.position.x / cellSize), 0, maze.length - 1);
        this.cellY = constrain(floor(this.position.y / cellSize), 0, maze[0].length - 1);
        this.prevCellX = this.cellX;
        this.prevCellY = this.cellY;
        this.lifespan = baseLifespan;

        if (dna) {
            this.dna = dna;
        } else {
            this.dna = [];
        }
        if (this.dna.length == 0) {
            for (let i = 0; i < this.lifespan; i++) {
                this.dna[i] = p5.Vector.random2D();
                this.dna[i].setMag(0.05);
            }
        }
    }

    update(time) {
        if (this.dead) {
            return;
        }

        this.prevCellX = this.cellX;
        this.prevCellY = this.cellY;
        this.cellX = constrain(floor(this.position.x / cellSize), 0, maze.length - 1);
        this.cellY = constrain(floor(this.position.y / cellSize), 0, maze[0].length - 1);

        this.velocity.add(this.dna[time]);
        this.velocity.limit(cellSize / 4);

        this.position.add(this.velocity);

        if (maze[this.prevCellX][this.prevCellY].walls[0] && this.cellY - this.prevCellY == -1) {
            this.kill();
        }
        else if (maze[this.prevCellX][this.prevCellY].walls[1] && this.cellX - this.prevCellX == 1) {
            this.kill();
        }
        else if (maze[this.prevCellX][this.prevCellY].walls[2] && this.cellY - this.prevCellY == 1) {
            this.kill();
        }
        else if (maze[this.prevCellX][this.prevCellY].walls[3] && this.cellX - this.prevCellX == -1) {
            this.kill();
        }

        if (this.position.x < 0 || this.position.x > windowWidth || this.position.y < 0 || this.position.y > windowHeight) {
            this.kill();
        }

        let dirsum = Math.abs(this.cellX - this.prevCellX) + Math.abs(this.cellY - this.prevCellY);
        if (dirsum > 1) this.kill();
    }


    draw() {
        fill(0, 0, 255);
        rect(this.position.x - 10, this.position.y - 10, 20, 20);
    }

    calculateScore() {
        let score = 1 / (maze[this.cellX][this.cellY].tarDist + 1);
        this.score = score;
    }

    kill() {
        if (!this.dead)
            aliveRockets--;
        this.dead = true;
        return;
    }
}