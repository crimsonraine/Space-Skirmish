class Character extends Actor{
    
    // x : number;
    // y : number;
    leftPic : string;
    rightPic : string;
    goingLeft : boolean;
    xVelocity : number;
    yVelocity : number;


    constructor(x : number, y : number, picturel : string, picturer : string, goingLeft : boolean) {
        super(x, y)
        this.leftPic = picturel;
        this.rightPic = picturer;
        this.goingLeft = goingLeft;
        this.xVelocity = 0
        this.yVelocity = 0
    }

    draw() : void {
        // all this to get an image on there - haven't tested yet, feel free to change
        // honestly Christina and Mika if you have anything better please add it here
        let img = new Image(); // took this off stack overflow
        //oc.width = img.width * 0.75;
        //oc.height = img.height * 0.75;
        img.height = 100
        img.width = 100
        img.onload = () => {
            ctx.drawImage(img, this.x, this.y, img.width, img.height);
        }
        ctx.drawImage(img, this.x, this.y);
        if (this.goingLeft) 
            img.src = this.leftPic
        else
            img.src = this.rightPic
    }


    update() : void { // for movement
        //this.x += 1 // for now
        this.x += this.xVelocity
        this.y += this.yVelocity
        // code for hitting another player here - figure out a way to identify enemy w/o hitting oneself
    }

    moveLeft() : void {
        this.xVelocity -= 1
    }

    moveRight() : void {
        this.xVelocity += 1
    }

    moveUp() : void {
        this.yVelocity -= 1
    }

    hit(sprite : Character) : boolean {
        if (Math.sqrt( (this.x - player.x) ** 2 + (this.y - player.y) ** 2 ) < 20 ) {
            return true // instead of 20, we need to find another way to make the hitbox
        }
        return false
    }
}