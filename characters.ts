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


    constructor(x : number, y : number, picturel : string, picturer : string, goingLeft : boolean) {
        super(x, y)
        this.leftPic = picturel;
        this.rightPic = picturer;
        this.goingLeft = goingLeft;
        this.xVelocity = 0
        this.yVelocity = 0
        this.height = 100
        this.width = 100
        this.img = new Image();
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
        if (this.goingLeft) 
            this.img.src = this.leftPic
        else
            this.img.src = this.rightPic
        ctx.drawImage(this.img, this.x, this.y, this.height, this.width);

    }


    update() : void { // for movement
        //this.x += 1 // for now
        this.x += this.xVelocity
        this.y += this.yVelocity
        // code for hitting another player here - figure out a way to identify enemy w/o hitting oneself

        // this doesn't totally work because it stops them at the borders but the numbers aren't right
        // I kinda just put this here for now so the characters won't float away from the screen
        // if someone can fix this, then yay!!
        if (this.x <= 10 || this.x >= canvas.width){
            this.xVelocity = - this.xVelocity
        }
        if (this.y <= 10 || this.y >= canvas.height){
            this.yVelocity = - this.yVelocity
        }
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