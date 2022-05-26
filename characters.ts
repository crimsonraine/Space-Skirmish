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


    constructor(x : number, y : number, picturel : string, picturer : string, goingLeft : boolean) {
        super(x, y)
        this.leftPic = picturel;
        this.rightPic = picturer;
        this.goingLeft = goingLeft;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.height = 100;
        this.width = 100;
        this.img = new Image();
        this.hp = 100;
        this.gravity = 5;
        this.velocity = 0;
        this.leftPress = false;
        this.rightPress = false;
    }

    draw() : void {
        // all this to get an image on there - haven't tested yet, feel free to change
        // honestly Christina and Mika if you have anything better please add it here
        // took this off stack overflow
        //oc.width = img.width * 0.75;
        //oc.height = img.height * 0.75;
        // img.onload = () => {
        //     ctx.drawImage(img, this.x, this.y, img.width, img.height);
        // }
        if (this.goingLeft) this.img.src = this.leftPic;
        else this.img.src = this.rightPic;
        ctx.drawImage(this.img, this.x, this.y, this.height, this.width);

    }


    update() : void { // for movement
        //this.x += 1 // for now
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        if (this.leftPress)
            this.moveLeft()
        if (this.rightPress)
            this.moveRight()
        // this.y += this.gravity;
        // eventually the greater the height, faster the fall
        // which isn't true but it's fun
        
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
        // this.xVelocity -= 1
        this.x -= 5
    }

    moveRight() : void {
        //this.xVelocity += 1
        this.x += 5
    }

    moveUp() : void {
        this.y -= 5
        //this.gravitySpeed += this.gravity;
        //this.x -= this.xVelocity;
        //this.y -= this.yVelocity + this.gravitySpeed;
        //this.velocity += this.gravity
        //this.y -= this.velocity
    }

    // stopMove() : void {
    //     //this.xVelocity += 5
    // }

    hit(sprite : Character) : boolean {
        if (Math.sqrt( (this.x - player.x) ** 2 + (this.y - player.y) ** 2 ) < 20 ) {
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

}

// perhaps add classes here that are children of Character with different stats