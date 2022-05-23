class Actor {
    
    x : number;
    y : number;
    leftPic : string;
    rightPic : string;
    goingLeft : boolean;


    constructor(x : number, y : number, picturel : string, picturer : string, goingLeft : boolean) {
        this.x = x;
        this.y = y;
        this.leftPic = picturel;
        this.rightPic = picturer;
        this.goingLeft = goingLeft;
    }

    draw() : void {
        // all this to get an image on there - haven't tested yet, feel free to change
        // honestly Christina and Mika if you have anything better please add it here
        let img = new Image(); // took this off stack overflow
        img.onload = () => {
            ctx.drawImage(img, this.x, this.y);
        }
        ctx.drawImage(img, this.x, this.y);
        if (this.goingLeft) 
            img.src = this.leftPic
        else
            img.src = this.rightPic
    }


    update() : void { // for movement
    }

}

// class FallingCircle extends Actor {

//     color : string;

//     //override Actor's constructor
//     constructor(x : number, y : number, color : string) {
//         super(x, y ); // calls the Actor's constructor
//         this.color = color;
//     }

//     draw() : void {
//         ctx.fillStyle = this.color;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, 20, 0 , Math.PI * 2);
//         ctx.closePath();
//         ctx.fill();
//     }

//     update() : void {
//         this.y += 5;

//         if (this.y > canvas.height + 50){
//             actorList.removeActor(this);
//         }
//     }
// }

// class Rock extends FallingCircle {
//     //overrides FallingCircle constructor
//     constructor(x : number, y : number){
//         super(x, y, "gray");
//     }

//     //override
//     update() {
//         super.update()
//         //check collision with player
//         if ( Math.sqrt( (this.x - player.x) ** 2 + (this.y - player.y) ** 2 ) < 20){
//             actorList.removeActor(this);
//             window.alert("You died from a rock!");
//         }
//     }
// }

// class Fruit extends FallingCircle {
//     constructor(x : number, y : number){
//         super(x, y, "red");
//     }

//     //override
//     update() {
//         super.update()
//         //check collision with player
//         if ( Math.sqrt( (this.x - player.x) ** 2 + (this.y - player.y) ** 2 ) < 20){
//             actorList.removeActor(this);
//         }
//     }
// }