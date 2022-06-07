class Character extends Actor{
    
    // x : number;
    // y : number;
    leftPic : string;
    rightPic : string;
    goingLeft : boolean;
    xVelocity : number;
    yVelocity : number;
    height : number;
    width : number;
    img : HTMLImageElement;
    hp : number;
    gravity : number;
    velocity : number;
    leftPress : boolean;
    rightPress : boolean;
    upPress : boolean;
    hitbox : number[];


    constructor(x : number, y : number, picturel : string, picturer : string, goingLeft : boolean) {
        super(x, y)
        this.leftPic = picturel;
        this.rightPic = picturer;
        this.goingLeft = goingLeft;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.height = 150;
        this.width = 150;
        this.img = new Image();
        this.hp = 100;
        this.gravity = 5;
        this.velocity = 0;
        this.leftPress = false;
        this.rightPress = false;
        this.upPress = false;
        this.hitbox = [150,150]
    }

    draw() : void {
        if (this.goingLeft) this.img.src = this.leftPic;
        else this.img.src = this.rightPic;
        ctx.drawImage(this.img, this.x, this.y, this.height, this.width);

    }


    update() : void { // for movemen5
        this.gravity += 0.1

        this.x += this.xVelocity;
        this.y += this.gravity + this.yVelocity;

        // hit the floor
        if (this.y >= 7/8 * canvas.height - this.height)
            this.y = 7/8 * canvas.height - this.height;
            this.stopMove();

        if (this.y <= -this.height) this.y = -this.height;

        // screenwrap so we don't lose the sprite
        if (this.x + this.width < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = -this.width;
        
        if (this.leftPress)
            this.moveLeft()
        if (this.rightPress)
            this.moveRight()
        if (this.upPress)
            this.moveUp()
        
        // code for hitting another player here - figure out a way to identify enemy w/o hitting oneself

        // this code no longer works since I fixed the movement issue
        // if someone can fix this, then yay!!
        if (this.x <= 10 || this.x >= canvas.width){
            this.xVelocity = - this.xVelocity
        }
        if (this.y <= 10 || this.y >= canvas.height){
            this.yVelocity = - this.yVelocity
        }
        // if (this.x + this.width < 0) this.x = this.width;
        // if (this.x > this.width) this.x = -this.width;
        //if (this.velocity < -9) this.velocity = -9;
    }

    moveLeft() : void {
        this.xVelocity -= 2
        this.x -= 5
    }

    moveRight() : void {
        this.xVelocity += 2
        this.x += 5
    }

    moveUp() : void {
        this.yVelocity -= 5
        this.gravity = 0;
    }

    stopMove() : void {
        this.xVelocity = 0;
    }

    hit(sprite : Character) : boolean {
        if (Math.sqrt( (this.x - player.x) ** 2 + (this.y - player.y) ** 2 ) < 75 ) {
            sprite.hp -= 20; // probably going to depend on the move type; call this when ever a key is pressed
            return true // instead of 20, we need to find another way to make the hitbox
        }
        return false
    }

    atk(sprite: Character) : void {
        // pass for now
    }

    damaged(sprite : Character) : void {
        this.hp -= 10
        if (this.hp <= 0) {
            pauseDrawing()
            // winning/losing screen
        }
    }

    //health = document.querySelector("enemyHealth") as 
}

// perhaps add classes here that are children of Character with different stats

// ctx.fillStyle = 'red';
// ctx.fillRect(5, 5 * canvas.height, canvas.width, 5 * canvas.height); // we can change this later to an image

